export const config = { runtime: 'edge' };

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8',
};

// ── Local.ch scraper ──────────────────────────────────────────────────────────
async function searchLocalCh(job, zone) {
  try {
    const q = encodeURIComponent(job);
    const z = encodeURIComponent(zone);
    const url = `https://www.local.ch/en/q?what=${q}&where=${z}&language=de`;
    const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const html = await res.text();

    const results = [];
    // Extract company cards from local.ch HTML
    const cardRe = /<article[^>]*class="[^"]*listing-item[^"]*"[^>]*>([\s\S]*?)<\/article>/gi;
    let cardMatch;
    while ((cardMatch = cardRe.exec(html)) !== null && results.length < 8) {
      const card = cardMatch[1];

      const nameMatch   = card.match(/class="[^"]*listing-item__name[^"]*"[^>]*>([^<]+)</i)
                       || card.match(/<h2[^>]*>([^<]+)<\/h2>/i);
      const phoneMatch  = card.match(/href="tel:([^"]+)"/i);
      const emailMatch  = card.match(/href="mailto:([^"]+)"/i);
      const addrMatch   = card.match(/class="[^"]*address[^"]*"[^>]*>([\s\S]*?)<\/(?:span|div|p)>/i);
      const websiteMatch= card.match(/href="(https?:\/\/(?!www\.local\.ch)[^"]+)"/i);

      if (!nameMatch) continue;

      const name    = nameMatch[1].replace(/&amp;/g,'&').replace(/&#\d+;/g,'').trim();
      const emails  = emailMatch  ? [emailMatch[1].trim()]  : [];
      const phones  = phoneMatch  ? [phoneMatch[1].trim()]  : [];
      const website = websiteMatch ? websiteMatch[1].trim() : '';
      const address = addrMatch
        ? addrMatch[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()
        : zone;

      results.push({
        name,
        source:   'local.ch',
        location: address || zone,
        emails,
        phones,
        website,
        addresses: address ? [address] : [],
        jobTerm:  job,
        zone,
        isJobPosting: false,
      });
    }
    return results;
  } catch {
    return [];
  }
}

// ── Zefix.ch (registro mercantil oficial) ────────────────────────────────────
async function searchZefix(job, zone) {
  try {
    const url = `https://www.zefix.ch/ZefixREST/api/v1/firm/search.json`;
    const body = JSON.stringify({ name: `${job} ${zone}`, languageKey: 'de', maxEntries: 10 });
    const res = await fetch(url, {
      method: 'POST',
      headers: { ...HEADERS, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body,
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data) ? data : (data.list || []);

    return list.slice(0, 6).map(f => ({
      name:       f.name || f.legalName || '—',
      source:     'Zefix',
      location:   [f.town, f.canton].filter(Boolean).join(', ') || zone,
      emails:     [],
      phones:     [],
      website:    '',
      addresses:  f.address ? [`${f.address.street || ''} ${f.address.houseNum || ''}, ${f.address.swissZipCode || ''} ${f.address.town || ''}`.trim()] : [],
      jobTerm:    job,
      zone,
      isJobPosting: false,
    }));
  } catch {
    return [];
  }
}

// ── Jobs.ch (ofertas de empleo) ───────────────────────────────────────────────
async function searchJobsCh(job, zone) {
  try {
    const q = encodeURIComponent(job);
    const z = encodeURIComponent(zone);
    const url = `https://www.jobs.ch/en/vacancies/?term=${q}&location=${z}`;
    const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const html = await res.text();

    const results = [];
    const scriptMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (scriptMatch) {
      try {
        const json = JSON.parse(scriptMatch[1]);
        const vacancies = json?.props?.pageProps?.initialSearchResult?.vacancies
                       || json?.props?.pageProps?.vacancies
                       || [];
        for (const v of vacancies.slice(0, 8)) {
          results.push({
            isJobPosting: true,
            title:    v.title || v.jobTitle || job,
            name:     v.company?.name || v.companyName || '—',
            source:   'jobs.ch',
            location: v.place?.name || zone,
            salary:   v.salary?.display || '',
            applyUrl: v.slug ? `https://www.jobs.ch/en/vacancies/${v.slug}/` : '',
            jobTerm:  job,
            zone,
            category: job,
          });
        }
      } catch { /* ignore parse errors */ }
    }

    if (results.length === 0) {
      // fallback: regex scrape
      const titleRe = /<h2[^>]*class="[^"]*job-title[^"]*"[^>]*>([\s\S]*?)<\/h2>/gi;
      let m;
      while ((m = titleRe.exec(html)) !== null && results.length < 5) {
        const title = m[1].replace(/<[^>]+>/g,'').trim();
        if (title) results.push({
          isJobPosting: true,
          title,
          name:     '—',
          source:   'jobs.ch',
          location: zone,
          salary:   '',
          applyUrl: '',
          jobTerm:  job,
          zone,
          category: job,
        });
      }
    }

    return results;
  } catch {
    return [];
  }
}

// ── Main handler ─────────────────────────────────────────────────────────────
export default async function handler(req) {
  const url      = new URL(req.url);
  const zonesRaw = url.searchParams.get('zones') || '';
  const jobsRaw  = url.searchParams.get('jobs')  || '';

  const zones = zonesRaw.split(',').map(z => z.trim()).filter(Boolean).slice(0, 4);
  const jobs  = jobsRaw .split(',').map(j => j.trim()).filter(Boolean).slice(0, 6);

  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (type, payload) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type, ...payload })}\n\n`));
        } catch { closed = true; }
      };

      try {
        for (const zone of zones) {
          for (const job of jobs) {
            send('status', { msg: `Buscando "${job}" en ${zone}…` });

            const [localResults, zefixResults, jobResults] = await Promise.allSettled([
              searchLocalCh(job, zone),
              searchZefix(job, zone),
              searchJobsCh(job, zone),
            ]);

            for (const r of (localResults.value || [])) send('result', { data: r });
            for (const r of (zefixResults.value || [])) send('result', { data: r });
            for (const r of (jobResults.value  || [])) send('result', { data: r });
          }
        }
        send('done', { msg: 'Búsqueda completada.' });
      } catch (err) {
        send('error', { msg: err.message || 'Error en la búsqueda.' });
      } finally {
        closed = true;
        try { controller.close(); } catch { /* already closed */ }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type':                'text/event-stream; charset=utf-8',
      'Cache-Control':               'no-cache, no-transform',
      'X-Accel-Buffering':           'no',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
