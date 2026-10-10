/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORÍAS DE TRABAJO — expansión automática
   ═══════════════════════════════════════════════════════════════════════════ */
const JOB_CATEGORIES = {
  construccion: {
    label: 'Construcción',
    description: 'Empresas de obra civil y edificación que pueden necesitar: albañiles, encofrador, peones, gruistas, ferrallistas, soladores, yeseros e impermeabilizadores.',
    terms: ['peón de construcción', 'albañil', 'maquinista de obra', 'tabiquero', 'encofrador',
            'ferrallista', 'solador', 'azulejero', 'yesero', 'enlucidor', 'gruista',
            'oficial de primera construcción', 'oficial de segunda construcción',
            'impermeabilizador', 'montador de andamios', 'demolición'],
  },
  electricidad: {
    label: 'Electricidad',
    description: 'Empresas de instalaciones eléctricas que pueden buscar: electricistas industriales, instaladores, técnicos de mantenimiento eléctrico y automatistas.',
    terms: ['electricista', 'técnico electricista', 'instalador eléctrico', 'electricista industrial',
            'electricista de mantenimiento', 'montador eléctrico', 'automatista'],
  },
  fontaneria: {
    label: 'Fontanería / Instalaciones',
    description: 'Empresas de fontanería, calefacción y gas que pueden necesitar: fontaneros, técnicos sanitarios, calefactores e instaladores de climatización (HVAC).',
    terms: ['fontanero', 'instalador de fontanería', 'técnico sanitario', 'instalador de gas',
            'calefactor', 'instalador HVAC', 'soldador de tuberías'],
  },
  soldadura: {
    label: 'Soldadura / Metal',
    description: 'Talleres y empresas metalúrgicas que pueden buscar: soldadores TIG/MIG/MAG, caldereros, chapistas y montadores de estructuras metálicas.',
    terms: ['soldador', 'soldador TIG', 'soldador MIG', 'soldador MAG', 'calderero', 'chapista',
            'montador metálico', 'estructurista metálico'],
  },
  hosteleria: {
    label: 'Hostelería / Restauración',
    description: 'Restaurantes, hoteles y caterings que pueden necesitar: cocineros, ayudantes de cocina, camareros, barmans, recepcionistas y personal de limpieza hotelera.',
    terms: ['cocinero', 'ayudante de cocina', 'jefe de cocina', 'camarero', 'barman',
            'recepcionista de hotel', 'gobernanta', 'limpieza hotelera', 'sommelier', 'pastelero'],
  },
  logistica: {
    label: 'Logística / Transporte',
    description: 'Empresas de transporte y almacén que pueden buscar: conductores de camión, carretilleros, mozos de almacén, repartidores y preparadores de pedidos.',
    terms: ['conductor de camión', 'chófer', 'repartidor', 'carretillero', 'mozo de almacén',
            'operario de almacén', 'preparador de pedidos', 'conductor carnet C', 'transportista'],
  },
  informatica: {
    label: 'Informática / IT',
    description: 'Empresas tecnológicas que pueden necesitar: desarrolladores backend/frontend/fullstack, DevOps, ingenieros de datos, administradores de sistemas y analistas de ciberseguridad.',
    terms: ['software developer', 'backend developer', 'frontend developer', 'devops engineer',
            'data engineer', 'systems administrator', 'network engineer', 'cybersecurity analyst',
            'fullstack developer', 'cloud engineer'],
  },
  agricultura: {
    label: 'Agricultura / Campo',
    description: 'Explotaciones agrícolas y viveros que pueden necesitar: temporeros, recolectores, tractoristas, jardineros, viñadores y operarios agrícolas.',
    terms: ['temporero agrícola', 'recolector', 'operario agrícola', 'tractorista',
            'peón agrícola', 'jardinero', 'paisajista', 'viñador', 'granjero'],
  },
  limpieza: {
    label: 'Limpieza / Mantenimiento',
    description: 'Empresas de limpieza y mantenimiento de edificios que pueden buscar: operarios de limpieza, técnicos de mantenimiento, conserjes y auxiliares.',
    terms: ['limpiador', 'operario de limpieza', 'técnico de mantenimiento', 'mantenedor de edificios',
            'conserje', 'auxiliar de mantenimiento'],
  },
  mecanica: {
    label: 'Mecánica / Automoción',
    description: 'Talleres mecánicos y concesionarios que pueden necesitar: mecánicos de coches, técnicos de automoción, chapistas pintores y electricistas de vehículos.',
    terms: ['mecánico', 'mecánico de coches', 'técnico de automoción', 'chapista pintor',
            'electricista de vehículos', 'mecánico industrial', 'técnico de maquinaria'],
  },
  sanidad: {
    label: 'Sanidad / Cuidados',
    description: 'Residencias, clínicas y servicios de atención domiciliaria que pueden buscar: enfermeros, auxiliares de enfermería, cuidadores de ancianos, fisioterapeutas y técnicos sanitarios.',
    terms: ['enfermero', 'auxiliar de enfermería', 'cuidador de ancianos', 'asistente sanitario',
            'fisioterapeuta', 'técnico de emergencias', 'auxiliar de clínica'],
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   SALARY REFERENCE DATA — por categoría (CHF / mes bruto)
   ═══════════════════════════════════════════════════════════════════════════ */
const SALARY_DATA = {
  'Electricidad'               : { min: 5200, max: 6800 },
  'Construcción'               : { min: 4800, max: 6500 },
  'Fontanería / Instalaciones' : { min: 5200, max: 6800 },
  'Soldadura / Metal'          : { min: 5000, max: 6500 },
  'Hostelería / Restauración'  : { min: 4200, max: 5800 },
  'Logística / Transporte'     : { min: 4800, max: 6200 },
  'Informática / IT'           : { min: 7000, max: 10000 },
  'Agricultura / Campo'        : { min: 3800, max: 4800 },
  'Limpieza / Mantenimiento'   : { min: 3800, max: 4800 },
  'Mecánica / Automoción'      : { min: 5000, max: 6500 },
  'Sanidad / Cuidados'         : { min: 5800, max: 8000 },
};

function formatCHF(n) {
  return n.toLocaleString('de-CH').replace(',', '.');
}

function salaryBadgeHtml(category) {
  const s = SALARY_DATA[category];
  if (!s) return '';
  return `<span class="salary-ref-badge" title="Rango salarial de referencia para ${esc(category)} en Suiza">💰 ${formatCHF(s.min)} – ${formatCHF(s.max)} CHF/mes</span>`;
}

/* Idiomas — etiquetas y banderas en español */
const LANG_DISPLAY = {
  de: { label: 'Alemán',   flag: '🇩🇪' },
  fr: { label: 'Francés',  flag: '🇫🇷' },
  en: { label: 'Inglés',   flag: '🇬🇧' },
  es: { label: 'Español',  flag: '🇪🇸' },
  it: { label: 'Italiano', flag: '🇮🇹' },
};

/* Reverse mapping: término alemán de búsqueda → puesto en español */
const LC_TO_SPANISH = {
  'Bauunternehmen'     : 'Empresa de construcción',
  'Hochbau'            : 'Edificación',
  'Tiefbau'            : 'Obra civil',
  'Maurerarbeiten'     : 'Albañil',
  'Maurer'             : 'Albañil',
  'Renovation'         : 'Reforma / Renovación',
  'Maschinenbau'       : 'Maquinaria de obra',
  'Baukran'            : 'Gruista',
  'Baumaschinen'       : 'Maquinista de obra',
  'Trockenbau'         : 'Tabiquero / Pladur',
  'Gipserei'           : 'Yesero',
  'Verputzarbeiten'    : 'Enlucidor / Revocador',
  'Schalungsarbeiten'  : 'Encofrador',
  'Betonbau'           : 'Trabajos de hormigón',
  'Armierung'          : 'Ferrallista',
  'Stahlbau'           : 'Estructura metálica',
  'Kran'               : 'Gruista',
  'Hebearbeiten'       : 'Trabajos de elevación',
  'Erdarbeiten'        : 'Movimiento de tierras',
  'Bodenbeläge'        : 'Solador',
  'Parkett'            : 'Parqué',
  'Plattenbeläge'      : 'Azulejero',
  'Fliesenleger'       : 'Colocador de azulejos',
  'Malerei'            : 'Pintor',
  'Malerarbeiten'      : 'Pintor',
  'Abdichtungsarbeiten': 'Impermeabilizador',
  'Isolierung'         : 'Aislamiento',
  'Elektriker'         : 'Electricista',
  'Elektroinstallation': 'Instalador eléctrico',
  'Elektrotechnik'     : 'Técnico electricista',
  'Sanitärinstallation': 'Fontanero / Instalador sanitario',
  'Installateur'       : 'Instalador',
  'Klempner'           : 'Fontanero',
  'Schlosserei'        : 'Cerrajería / Soldadura',
  'Metallbau'          : 'Construcción metálica',
  'Schweissarbeiten'   : 'Soldador',
  'Restaurant'         : 'Hostelería / Restaurante',
  'Catering'           : 'Catering',
  'Gastronomie'        : 'Gastronomía',
  'Hotel'              : 'Hotel / Alojamiento',
  'Transport'          : 'Transporte',
  'Spedition'          : 'Logística / Mensajería',
  'Transportunternehmen': 'Empresa de transporte',
  'Chauffeur'          : 'Conductor / Chófer',
  'Informatik'         : 'Informática / IT',
  'IT-Dienstleistungen': 'Servicios IT',
  'Software'           : 'Software',
  'Softwareentwicklung': 'Desarrollo de software',
  'Landwirtschaft'     : 'Agricultura',
  'Gartenbau'          : 'Jardinería',
  'Gartengestaltung'   : 'Paisajismo',
  'Gemüsebau'          : 'Cultivo de hortalizas',
  'Reinigung'          : 'Limpieza',
  'Gebäudereinigung'   : 'Limpieza de edificios',
  'Hauswartung'        : 'Mantenimiento de edificios',
  'Garage'             : 'Taller mecánico',
  'Autowerkstatt'      : 'Taller de coches',
  'Carrosserie'        : 'Chapa y pintura',
  'Fahrzeugservice'    : 'Servicio de vehículos',
  'Pflegeheim'         : 'Residencia / Cuidados',
  'Spitex'             : 'Atención domiciliaria',
  'Krankenhaus'        : 'Hospital',
  'Pflegepersonal'     : 'Personal de enfermería',
};

/* Normaliza texto para comparar */
function normalize(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '').trim();
}

function detectCategory(input) {
  const n = normalize(input);
  for (const [key, cat] of Object.entries(JOB_CATEGORIES)) {
    if (n.includes(key) || n.includes(normalize(cat.label))) return cat;
  }
  return null;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TAB SYSTEM
   ═══════════════════════════════════════════════════════════════════════════ */
let activeTab = 'search';

function switchTab(tab) {
  activeTab = tab;

  // Update buttons
  ['search','housing','insurance','tracker'].forEach(t => {
    const btn = document.getElementById('tabBtn' + t.charAt(0).toUpperCase() + t.slice(1));
    if (btn) { btn.classList.toggle('active', t === tab); btn.setAttribute('aria-selected', t === tab); }
    const panel = document.getElementById('panel' + t.charAt(0).toUpperCase() + t.slice(1));
    if (panel) panel.classList.toggle('hidden', t !== tab);
  });

  if (tab === 'tracker')   renderTracker();
  if (tab === 'insurance') renderInsurance();
}

/* ═══════════════════════════════════════════════════════════════════════════
   COLLAPSIBLE PANELS
   ═══════════════════════════════════════════════════════════════════════════ */
function toggleCollapsible(panelId, btn) {
  const panel   = document.getElementById(panelId);
  const isOpen  = !panel.classList.contains('hidden');
  panel.classList.toggle('hidden', isOpen);
  btn.setAttribute('aria-expanded', !isOpen);
  btn.querySelector('.collapsible-chevron').textContent = isOpen ? '▼' : '▲';
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHIP SYSTEM (zonas)
   ═══════════════════════════════════════════════════════════════════════════ */
const MAX_ZONES = 5;
let zones = [];

function initZoneChips() {
  const input = document.getElementById('zoneInput');

  input.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) {
      e.preventDefault();
      addZone(input.value.replace(',', '').trim());
      input.value = '';
    }
    if (e.key === 'Backspace' && input.value === '' && zones.length) {
      removeZone(zones.length - 1);
    }
  });

  input.addEventListener('blur', () => {
    if (input.value.trim()) {
      addZone(input.value.trim());
      input.value = '';
    }
  });
}

function addZone(text) {
  if (!text || zones.length >= MAX_ZONES) return;
  if (zones.map(z => z.toLowerCase()).includes(text.toLowerCase())) return;
  zones.push(text);
  renderChips();
}

function removeZone(idx) {
  zones.splice(idx, 1);
  renderChips();
}

function renderChips() {
  const box     = document.getElementById('zoneBox');
  const input   = document.getElementById('zoneInput');
  const counter = document.getElementById('zoneCounter');

  box.querySelectorAll('.chip').forEach(c => c.remove());

  zones.forEach((z, i) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.innerHTML = `${esc(z)} <button class="chip-remove" title="Quitar">×</button>`;
    chip.querySelector('.chip-remove').addEventListener('click', e => {
      e.stopPropagation();
      removeZone(i);
    });
    box.insertBefore(chip, input);
  });

  input.placeholder = zones.length === 0 ? 'Zurich, Geneva, Basel…' : 'Añadir zona…';
  input.disabled    = zones.length >= MAX_ZONES;

  counter.textContent = `${zones.length} / ${MAX_ZONES} zonas`;
  counter.classList.toggle('full', zones.length >= MAX_ZONES);
}

/* ═══════════════════════════════════════════════════════════════════════════
   JOB EXPANSION PREVIEW
   ═══════════════════════════════════════════════════════════════════════════ */
function initJobExpansion() {
  const input   = document.getElementById('jobInput');
  const preview = document.getElementById('jobExpansion');

  input.addEventListener('input', () => {
    const cat = detectCategory(input.value);
    if (cat && input.value.trim()) {
      const tags = cat.terms.map(t => `<span class="expansion-tag">${esc(t)}</span>`).join('');
      preview.innerHTML = `<strong>🔍 Se buscará todo lo relacionado con "${cat.label}":</strong>${tags}`;
      preview.classList.remove('hidden');
    } else {
      preview.classList.add('hidden');
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════════════════════════════════ */
let allResults    = [];
let evtSource     = null;

// Filters
let activeFilters = { email: false, phone: false, zone: '', source: '' };

// Favourites — persisted in localStorage
let favorites     = JSON.parse(localStorage.getItem('suiza-favs') || '[]');
let favView       = false;

/* ═══════════════════════════════════════════════════════════════════════════
   APPLICATION TRACKER
   ═══════════════════════════════════════════════════════════════════════════ */
const TRACKER_KEY = 'suiza-tracker';

const STATUS_LABELS = {
  enviado    : { label: 'Enviado',     color: '#2563eb', bg: '#dbeafe' },
  respondido : { label: 'Respondido',  color: '#059669', bg: '#d1fae5' },
  entrevista : { label: 'Entrevista',  color: '#7c3aed', bg: '#ede9fe' },
  oferta     : { label: '¡Oferta!',    color: '#065f46', bg: '#a7f3d0' },
  rechazado  : { label: 'Rechazado',   color: '#9f1239', bg: '#fce7f3' },
};

function loadTracker() {
  try { return JSON.parse(localStorage.getItem(TRACKER_KEY) || '[]'); } catch { return []; }
}

function saveTracker(data) {
  localStorage.setItem(TRACKER_KEY, JSON.stringify(data));
  updateTrackerBadge();
}

function updateTrackerBadge() {
  const data  = loadTracker();
  const badge = document.getElementById('trackerBadge');
  if (!badge) return;
  badge.textContent = data.length;
  badge.classList.toggle('hidden', data.length === 0);
}

function addToTracker(company, email, role, location) {
  const data = loadTracker();
  const today      = new Date();
  const followUp   = new Date(today); followUp.setDate(today.getDate() + 7);
  const fmt = d => d.toISOString().slice(0, 10);

  // Avoid duplicate for same company + email
  if (data.some(e => e.company === company && e.email === email)) return;

  const entry = {
    id         : `${Date.now()}-${company.replace(/\s+/g, '')}`,
    company,
    email      : email || '',
    role       : role  || '',
    location   : location || '',
    dateSent   : fmt(today),
    status     : 'enviado',
    notes      : '',
    followUpDate: fmt(followUp),
  };

  data.unshift(entry);
  saveTracker(data);
  showTrackerToast(company);
}

function showTrackerToast(company) {
  const toast = document.createElement('div');
  toast.className = 'tracker-toast';
  toast.textContent = `📋 "${company}" añadida a Mis candidaturas`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function updateTrackerEntry(id, field, value) {
  const data = loadTracker();
  const entry = data.find(e => e.id === id);
  if (entry) { entry[field] = value; saveTracker(data); }
}

function deleteTrackerEntry(id) {
  const data = loadTracker().filter(e => e.id !== id);
  saveTracker(data);
  renderTracker();
}

function clearAllTracker() {
  if (!confirm('¿Borrar todas las candidaturas? Esta acción no se puede deshacer.')) return;
  localStorage.removeItem(TRACKER_KEY);
  updateTrackerBadge();
  renderTracker();
}

function isOverdue(entry) {
  if (entry.status !== 'enviado') return false;
  if (!entry.followUpDate) return false;
  return new Date(entry.followUpDate) < new Date();
}

function renderTracker() {
  const data   = loadTracker();
  const body   = document.getElementById('trackerBody');
  const empty  = document.getElementById('trackerEmpty');
  const table  = document.getElementById('trackerTable');

  if (!body) return;

  if (data.length === 0) {
    empty.classList.remove('hidden');
    table.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  table.classList.remove('hidden');

  body.innerHTML = data.map(entry => {
    const st      = STATUS_LABELS[entry.status] || STATUS_LABELS.enviado;
    const overdue = isOverdue(entry);
    const rowCls  = overdue ? ' tracker-row--overdue' : '';
    const statusOptions = Object.entries(STATUS_LABELS).map(([val, info]) =>
      `<option value="${val}"${entry.status === val ? ' selected' : ''}>${info.label}</option>`
    ).join('');

    return `
      <tr class="tracker-row${rowCls}" data-id="${esc(entry.id)}">
        <td class="tracker-company">
          <strong>${esc(entry.company)}</strong>
          ${entry.email ? `<br><span class="tracker-email">${esc(entry.email)}</span>` : ''}
          ${overdue ? '<br><span class="overdue-label">⚠️ Seguimiento pendiente</span>' : ''}
        </td>
        <td>${esc(entry.role || '—')}</td>
        <td>${esc(entry.location || '—')}</td>
        <td class="tracker-date">${esc(entry.dateSent)}</td>
        <td>
          <select class="tracker-status-select" onchange="updateTrackerEntry('${esc(entry.id)}','status',this.value);renderTracker()"
            style="color:${st.color};background:${st.bg}">
            ${statusOptions}
          </select>
        </td>
        <td>
          <input type="date" class="tracker-date-input" value="${esc(entry.followUpDate || '')}"
            onchange="updateTrackerEntry('${esc(entry.id)}','followUpDate',this.value);renderTracker()">
        </td>
        <td>
          <input type="text" class="tracker-notes-input" placeholder="Notas…" value="${esc(entry.notes || '')}"
            onblur="updateTrackerEntry('${esc(entry.id)}','notes',this.value)">
        </td>
        <td>
          <button class="tracker-delete-btn" onclick="deleteTrackerEntry('${esc(entry.id)}')" title="Eliminar">🗑</button>
        </td>
      </tr>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════════════════
   SEARCH
   ═══════════════════════════════════════════════════════════════════════════ */
function startSearch() {
  const zoneInput = document.getElementById('zoneInput');
  if (zoneInput.value.trim()) {
    addZone(zoneInput.value.trim());
    zoneInput.value = '';
  }

  const jobRaw = document.getElementById('jobInput').value.trim();

  if (zones.length === 0) { shake(document.getElementById('zoneBox'));  return; }
  if (!jobRaw)            { shake(document.getElementById('jobInput')); return; }

  const cat      = detectCategory(jobRaw);
  const jobTerms = cat ? cat.terms : [jobRaw];
  const catLabel = cat ? cat.label : jobRaw;

  const zonesParam = zones.join(',');
  const jobsParam  = jobTerms.join(',');

  // Guardar para los enlaces de agencias y empleo público
  _lastSearchTerm = cat ? cat.terms[0] : jobRaw;
  _lastSearchCity = zones[0] || '';

  // Limpiar secciones extra anteriores
  document.getElementById('extraSections')?.remove();

  // Reset state
  if (evtSource) { evtSource.close(); evtSource = null; }
  allResults    = [];
  activeFilters = { email: false, phone: false, zone: '', source: '' };
  favView       = false;

  // Reset UI
  document.getElementById('results')     .innerHTML = '';
  document.getElementById('results')     .className = 'results-grid';
  document.getElementById('emptyState')  .classList.add('hidden');
  document.getElementById('statsRow')    .classList.add('hidden');
  document.getElementById('filterBar')   .classList.add('hidden');
  document.getElementById('statusArea')  .classList.remove('hidden');
  document.getElementById('progressFill').classList.remove('done');
  document.getElementById('progressFill').style.width = '5%';
  document.getElementById('favBtn')      .classList.remove('active');
  document.getElementById('pillEmail')   .classList.remove('active');
  document.getElementById('pillPhone')   .classList.remove('active');
  document.getElementById('filterZone')  .innerHTML = '<option value="">📍 Todas las zonas</option>';
  document.getElementById('filterSource').value = '';
  document.getElementById('filterCount') .textContent = '';

  setBtn(true);

  evtSource = new EventSource(`/api/search?zones=${enc(zonesParam)}&jobs=${enc(jobsParam)}&category=${enc(catLabel)}`);

  evtSource.onmessage = e => {
    const msg = JSON.parse(e.data);
    if      (msg.type === 'status') { document.getElementById('statusMsg').textContent = msg.msg; }
    else if (msg.type === 'result') { allResults.push(msg.data); updateStats(); appendCard(msg.data, allResults.length - 1); }
    else if (msg.type === 'done' || msg.type === 'error') { finish(msg); }
  };

  evtSource.onerror = () => finish({ type: 'error', msg: 'Conexión interrumpida.' });
}

function richness(r) {
  if (r.isJobPosting) {
    return 10
      + (r.fullDesc && r.fullDesc.length > 200 ? 5 : 0)
      + (r.salary   ? 2 : 0)
      + (r.snippet  ? 1 : 0);
  }
  return (r.emails.length    > 0 ? 4 : 0)
       + (r.phones.length    > 0 ? 3 : 0)
       + (r.addresses.length > 0 ? 2 : 0)
       + (r.companyDesc         ? 2 : 0)
       + (r.website             ? 1 : 0)
       + ((r.languages || []).length > 0 ? 1 : 0);
}

/* ═══════════════════════════════════════════════════════════════════════════
   AGENCIAS TEMPORALES + EMPLEO PÚBLICO
   ═══════════════════════════════════════════════════════════════════════════ */

// Agencias ETT principales de Suiza
const TEMP_AGENCIES = [
  { name: 'Adecco',         url: 'https://www.adecco.ch/de-ch/jobs/?q={term}&l={city}',                  logo: '🔵' },
  { name: 'Randstad',       url: 'https://www.randstad.ch/jobs/?q={term}&location={city}',               logo: '🔴' },
  { name: 'Manpower',       url: 'https://www.manpower.ch/de/jobsuche?q={term}&location={city}',         logo: '🟠' },
  { name: 'Gi Group',       url: 'https://www.gigroup.ch/stellenangebote/?q={term}&location={city}',     logo: '🟣' },
  { name: 'Kelly Services', url: 'https://www.kellyservices.ch/jobs?keywords={term}&location={city}',    logo: '🟢' },
  { name: 'Tempservice',    url: 'https://www.tempservice.ch/de/jobs?q={term}&location={city}',          logo: '⚪' },
  { name: 'Imbau (Baar)',   url: 'https://www.imbau.ch',                                                 logo: '🟡' },
];

// Portales de empleo público suizo
const PUBLIC_PORTALS = [
  { name: 'Confederación Helvética (admin.ch)', url: 'https://www.stelle.admin.ch/stelle/de/home/findstelle.html?q={term}',            desc: 'Empleos federales — gobierno, ministerios, agencias' },
  { name: 'SBB / Ferrocarriles Suizos',         url: 'https://jobs.sbb.ch/de/jobs?q={term}',                                          desc: 'Empleos en la red ferroviaria nacional' },
  { name: 'Correos Suizos (Post)',               url: 'https://career.post.ch/de/offene-stellen',                                      desc: 'Empleos en correos, logística y finanzas' },
  { name: 'RAV — Oficina de Empleo',             url: 'https://www.job-room.ch/#/jobsearch?term={term}&location={city}&radius=30',      desc: 'Ofertas oficiales de todos los cantones' },
  { name: 'Kanton Zürich',                       url: 'https://jobs.zh.ch/de/Stellen?Suchbegriff={term}',                              desc: 'Empleos del cantón de Zurich' },
  { name: 'Kanton Bern',                         url: 'https://www.be.ch/de/start/verwaltung/jobs-und-karriere.html',                  desc: 'Empleos del cantón de Berna' },
  { name: 'Canton de Genève',                    url: 'https://www.ge.ch/travailler-dans-administration-cantonale',                    desc: 'Empleos en la administración de Ginebra' },
];

function buildAgencyUrl(template, term, city) {
  return template
    .replace('{term}', encodeURIComponent(term))
    .replace('{city}', encodeURIComponent(city || ''));
}

let _lastSearchTerm = '';
let _lastSearchCity = '';

function renderExtraSections() {
  // Eliminar secciones previas si existen
  document.getElementById('extraSections')?.remove();

  const term = _lastSearchTerm;
  const city = _lastSearchCity;

  const section = document.createElement('div');
  section.id = 'extraSections';
  section.innerHTML = `
    <!-- Agencias de trabajo temporal -->
    <div class="extra-section">
      <div class="extra-section-header">
        <span class="extra-section-icon">🏢</span>
        <div>
          <h3 class="extra-section-title">Agencias de trabajo temporal (ETT)</h3>
          <p class="extra-section-sub">Las ETT contratan miles de trabajadores en Suiza. Regístrate en varias — consigues trabajo más rápido.</p>
        </div>
      </div>
      <div class="agency-grid">
        ${TEMP_AGENCIES.map(a => `
          <a class="agency-card" href="${esc(buildAgencyUrl(a.url, term, city))}" target="_blank" rel="noopener">
            <span class="agency-logo">${a.logo}</span>
            <span class="agency-name">${esc(a.name)}</span>
            <span class="agency-arrow">→</span>
          </a>`).join('')}
      </div>
    </div>

    <!-- Empleo público -->
    <div class="extra-section">
      <div class="extra-section-header">
        <span class="extra-section-icon">🏛️</span>
        <div>
          <h3 class="extra-section-title">Empleo público — Estado y administración</h3>
          <p class="extra-section-sub">El sector público suizo ofrece contratos estables, buen salario y excelentes condiciones laborales.</p>
        </div>
      </div>
      <div class="public-grid">
        ${PUBLIC_PORTALS.map(p => `
          <a class="public-card" href="${esc(buildAgencyUrl(p.url, term, city))}" target="_blank" rel="noopener">
            <div class="public-card-name">${esc(p.name)}</div>
            <div class="public-card-desc">${esc(p.desc)}</div>
            <span class="public-card-arrow">Ver ofertas →</span>
          </a>`).join('')}
      </div>
    </div>
  `;

  // Insertar después del grid de resultados
  const results = document.getElementById('results');
  results.insertAdjacentElement('afterend', section);
}

function finish(msg) {
  if (evtSource) { evtSource.close(); evtSource = null; }
  setBtn(false);
  document.getElementById('progressFill').classList.add('done');
  document.querySelector('.spinner').style.visibility = 'hidden';

  if (allResults.length > 0) {
    allResults.sort((a, b) => richness(b) - richness(a));
    renderFiltered();
    document.getElementById('filterBar').classList.remove('hidden');
    document.getElementById('statusMsg').textContent =
      `✅ Completado — ${allResults.length} empresa${allResults.length !== 1 ? 's' : ''} ordenadas por información disponible`;
  } else {
    document.getElementById('statusMsg').textContent =
      msg.type === 'done' ? '✅ Completado — sin resultados' : (msg.msg || 'Error durante la búsqueda.');
    document.getElementById('emptyState').classList.remove('hidden');
  }

}

function setBtn(loading) {
  const btn = document.getElementById('searchBtn');
  btn.disabled = loading;
  document.getElementById('btnLabel').textContent = loading ? 'Buscando…' : 'Buscar contactos';
}

function updateStats() {
  document.getElementById('statsRow').classList.remove('hidden');
  const nPrivate = allResults.filter(r => !r.isETT).length;
  const nEtt     = allResults.filter(r => r.isETT).length;
  document.getElementById('statsText').textContent =
    `${nPrivate} empresa${nPrivate !== 1 ? 's' : ''} privada${nPrivate !== 1 ? 's' : ''} · ${nEtt} ETT`;

  // Update zone filter options dynamically as results arrive
  const sel     = document.getElementById('filterZone');
  const current = sel.value;
  const zoneSet = [...new Set(allResults.map(r => r.location).filter(Boolean))].sort();
  sel.innerHTML = '<option value="">📍 Todas las zonas</option>' +
    zoneSet.map(z => `<option value="${esc(z)}"${z === current ? ' selected' : ''}>${esc(z)}</option>`).join('');

  updateFavCount();
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARD BUILDER
   ═══════════════════════════════════════════════════════════════════════════ */
function buildCardEl(data, idx) {
  const card = document.createElement('div');
  card.className = 'result-card' + (data.isJobPosting ? ' card-job' : '');
  card.style.animationDelay = `${Math.min(idx * 0.04, 0.4)}s`;
  if (data.isJobPosting) {
    buildJobPostingCard(card, data);
  } else {
    buildContactCard(card, data);
  }
  card.querySelectorAll('[data-copy]').forEach(btn =>
    btn.addEventListener('click', () => copyValue(btn.dataset.copy, btn)));
  card.querySelector('.fav-btn')?.addEventListener('click', e =>
    toggleFav(data.isJobPosting ? (data.title + '|' + data.name) : data.name, e.currentTarget));
  return card;
}

function appendCard(data, idx) {
  const container = document.getElementById('results');
  // During streaming, ensure container is in flat-grid mode
  if (!container.classList.contains('results-grid')) container.className = 'results-grid';
  container.appendChild(buildCardEl(data, idx));
}

/* ── Tarjeta de oferta real (jobs.ch / jobup.ch) ─────────────────────────── */
function buildJobPostingCard(card, data) {
  const srcClass   = { 'jobs.ch': 'src-jobs', 'jobup.ch': 'src-jobup' }[data.source] || 'src-web';
  const favKey     = data.title + '|' + data.name;
  const isFav      = favorites.includes(favKey);
  const spanishTitle = LC_TO_SPANISH[data.jobTerm] || data.category || data.title;
  const catDesc    = getCategoryDescription(data.category);
  const desc       = data.fullDesc || data.snippet || '';

  card.innerHTML = `
    <div class="card-header">
      <div class="card-header-top">
        <span class="company-name">${esc(data.title)}</span>
        <div class="card-top-actions">
          <button class="fav-btn${isFav ? ' starred' : ''}" title="${isFav ? 'Quitar de guardados' : 'Guardar oferta'}">★</button>
          <span class="source-badge ${srcClass}">${esc(data.source)}</span>
        </div>
      </div>
      <p class="job-company">🏢 ${esc(data.name || '—')}</p>
      ${spanishTitle !== data.title ? `<p class="spanish-role">💼 ${esc(spanishTitle)}</p>` : ''}
      <div class="job-meta">
        <span class="location">📍 ${esc(data.location || '—')}</span>
        ${data.salary ? `<span class="salary-badge">💰 ${esc(data.salary)}</span>` : ''}
      </div>
    </div>

    <div class="info-block">
      <div class="info-section">
        <h4 class="info-title">📋 Descripción de la oferta</h4>
        ${desc
          ? `<p class="info-text info-text--job">${esc(desc)}</p>`
          : `<p class="info-empty">Sin descripción disponible.</p>`}
      </div>
      ${catDesc ? `
      <div class="info-section">
        <h4 class="info-title">💡 Perfil habitual para este puesto</h4>
        <p class="info-text">${esc(catDesc)}</p>
      </div>` : ''}
    </div>

    <div class="card-footer job-footer">
      ${data.applyUrl
        ? `<a class="apply-btn" href="${esc(data.applyUrl)}" target="_blank" rel="noopener">Ver oferta completa →</a>`
        : ''}
    </div>`;
}

/* ── Tarjeta de empresa-contacto (local.ch / Zefix) ─────────────────────── */
function buildContactCard(card, data) {
  const srcClass    = { 'local.ch': 'src-local', 'Zefix': 'src-zefix' }[data.source] || 'src-web';
  const isFav       = favorites.includes(data.name);
  const spanishRole = LC_TO_SPANISH[data.jobTerm] || data.category || '';
  const catDesc     = getCategoryDescription(data.category);
  const langsHtml   = langBadgesHtml(data.languages || []);
  const [companyText, companyTags] = (data.companyDesc || '').split('\n');
  const salaryHtml  = salaryBadgeHtml(data.category);
  const ettBadge    = data.isETT ? '<span class="source-badge src-ett">🏢 Agencia ETT</span>' : '';

  card.innerHTML = `
    <div class="card-header">
      <div class="card-header-top">
        <span class="company-name">${esc(data.name)}</span>
        <div class="card-top-actions">
          <button class="fav-btn${isFav ? ' starred' : ''}" title="${isFav ? 'Quitar de guardados' : 'Guardar empresa'}">★</button>
          ${ettBadge}
          <span class="source-badge ${srcClass}">${esc(data.source)}</span>
        </div>
      </div>
      ${spanishRole ? `<p class="spanish-role">💼 ${esc(spanishRole)}</p>` : ''}
      <p class="location">📍 ${esc(data.location || '—')}</p>
      ${salaryHtml ? `<div class="salary-ref-row">${salaryHtml}</div>` : ''}
      ${langsHtml ? `<div class="lang-row">${langsHtml}</div>` : ''}
    </div>

    <div class="info-block">
      <div class="info-section">
        <h4 class="info-title">🏢 Sobre la empresa</h4>
        ${companyText
          ? `<p class="info-text">${esc(companyText)}</p>
             ${companyTags ? `<p class="info-tags">${esc(companyTags)}</p>` : ''}`
          : `<p class="info-empty">Sin descripción disponible en el directorio.</p>`}
      </div>
      ${catDesc ? `
      <div class="info-section">
        <h4 class="info-title">💡 Perfil habitual para este puesto</h4>
        <p class="info-text">${esc(catDesc)}</p>
      </div>` : ''}
    </div>

    <div class="card-body">
      <div class="contact-section">
        <h4>✉️ Correo electrónico</h4>
        <div class="contact-list">${emailsHtml(data.emails)}</div>
      </div>
      <div class="contact-section">
        <h4>📞 Teléfono / WhatsApp</h4>
        <div class="contact-list">${phonesHtml(data.phones)}</div>
      </div>
      <div class="contact-section">
        <h4>🏢 Dirección</h4>
        <div class="contact-list">${addressesHtml(data.addresses)}</div>
      </div>
      ${(data.jobPortalLinks || []).length ? `
      <div class="contact-section">
        <h4>🔎 Ver si tienen ofertas activas</h4>
        <div class="portal-links">
          ${(data.jobPortalLinks).map(l =>
            `<a class="portal-link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} →</a>`
          ).join('')}
        </div>
      </div>` : ''}
      ${candidaturaHtml(data.emails, data.name, spanishRole || data.category, data.location, data.languages || [])}
    </div>
    <div class="card-footer">
      ${data.website
        ? `<a class="website-link" href="${esc(data.website)}" target="_blank" rel="noopener">🔗 ${esc(data.website.replace(/^https?:\/\//, '').slice(0, 55))}</a>`
        : '<span class="no-contact" style="font-size:.78rem;color:var(--muted)">Sitio web no disponible</span>'}
      ${data.profileUrl
        ? `<a class="website-link" href="${esc(data.profileUrl)}" target="_blank" rel="noopener" style="color:var(--muted);margin-top:4px">📄 Ver perfil en local.ch</a>`
        : ''}
    </div>`;
}

function emailsHtml(emails) {
  if (!emails.length) return '<span class="no-contact">No encontrado</span>';
  return emails.map(e => `
    <div class="contact-row">
      <a href="mailto:${esc(e)}">${esc(e)}</a>
      <button class="btn-sm" data-copy="${esc(e)}">Copiar</button>
    </div>`).join('');
}

/* ── Cover letter — multi-language ──────────────────────────────────────── */
/* ── Configuración del emisor y CV ───────────────────────────────────────── */
function getSenderSettings() {
  return {
    email   : localStorage.getItem('suiza-sender-email')    || '',
    password: localStorage.getItem('suiza-sender-password') || '',
    name    : localStorage.getItem('suiza-sender-name')     || '',
    provider: localStorage.getItem('suiza-sender-provider') || 'gmail',
  };
}
function saveSenderSettings(s) {
  localStorage.setItem('suiza-sender-email',    s.email    || '');
  localStorage.setItem('suiza-sender-password', s.password || '');
  localStorage.setItem('suiza-sender-name',     s.name     || '');
  localStorage.setItem('suiza-sender-provider', s.provider || 'gmail');
}
function getCvData() {
  const b64  = localStorage.getItem('suiza-cv-b64')  || sessionStorage.getItem('suiza-cv-b64')  || '';
  const name = localStorage.getItem('suiza-cv-name') || sessionStorage.getItem('suiza-cv-name') || '';
  return { b64, name };
}
function saveCvData(b64, name) {
  try {
    localStorage.setItem('suiza-cv-b64',  b64);
    localStorage.setItem('suiza-cv-name', name);
  } catch {
    sessionStorage.setItem('suiza-cv-b64',  b64);
    sessionStorage.setItem('suiza-cv-name', name);
  }
}
function updateCvSettingsBtn() {
  const btn = document.getElementById('cvSettingsBtn');
  if (!btn) return;
  const cv = getCvData();
  const s  = getSenderSettings();
  if (cv.b64 && s.email) {
    btn.textContent = `⚙️ ${s.name || s.email.split('@')[0]} · CV ✅`;
    btn.classList.add('configured');
  } else {
    btn.textContent = '⚙️ Configurar envío + CV';
    btn.classList.remove('configured');
  }
}

/* ── Modal de configuración ──────────────────────────────────────────────── */
let _afterSettingsSave = null;
function openSettingsModal(opts = {}) {
  _afterSettingsSave = opts.afterSave || null;
  const s  = getSenderSettings();
  const cv = getCvData();
  document.getElementById('modalProvider').value = s.provider;
  document.getElementById('modalName').value     = s.name;
  document.getElementById('modalEmail').value    = s.email;
  document.getElementById('modalPassword').value = s.password;
  document.getElementById('cvStatus').textContent = cv.b64 ? `✅ ${cv.name}` : 'Sin CV cargado';
  document.getElementById('settingsModal').classList.remove('hidden');
}
function closeSettingsModal(e) {
  if (e && e.target !== document.getElementById('settingsModal')) return;
  document.getElementById('settingsModal').classList.add('hidden');
  _afterSettingsSave = null;
}
function saveSettingsModal() {
  const missing = [];
  const email    = document.getElementById('modalEmail').value.trim();
  const password = document.getElementById('modalPassword').value.trim();
  if (!email)    missing.push('email');
  if (!password) missing.push('contraseña de aplicación');
  if (missing.length) { alert('Faltan: ' + missing.join(', ')); return; }
  saveSenderSettings({
    provider: document.getElementById('modalProvider').value,
    name    : document.getElementById('modalName').value.trim(),
    email,
    password,
  });
  updateCvSettingsBtn();
  document.getElementById('settingsModal').classList.add('hidden');
  if (_afterSettingsSave) { const fn = _afterSettingsSave; _afterSettingsSave = null; fn(); }
}
function handleCvUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) { alert('El CV no puede superar 8 MB'); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    const b64 = ev.target.result.split(',')[1];
    saveCvData(b64, file.name);
    document.getElementById('cvStatus').textContent = `✅ ${file.name}`;
    updateCvSettingsBtn();
  };
  reader.readAsDataURL(file);
}

/* ── Cover letter builder ────────────────────────────────────────────────── */
function buildCoverLetter(companyName, role, languages) {
  const langs = languages || [];
  const primaryLang = langs.includes('de') ? 'de' : langs.includes('fr') ? 'fr' : 'es';
  const s = getSenderSettings();
  const senderName  = s.name  || '[Tu nombre]';
  const senderEmail = s.email || '[Tu email]';

  let subject, body;

  if (primaryLang === 'de') {
    subject = `Spontanbewerbung – ${role || 'verfügbare Stelle'}`;
    body =
`Sehr geehrte Damen und Herren,

hiermit möchte ich mich bei Ihnen für eine Stelle als ${role || 'Mitarbeiter'} in Ihrem Unternehmen bewerben.

Ich bin ein erfahrener Fachmann im Bereich ${role || 'meiner Branche'} und bin sehr daran interessiert, in einem renommierten Unternehmen wie ${companyName} in der Schweiz zu arbeiten. Ihr Unternehmensprofil hat mich sehr angesprochen und ich bin überzeugt, dass ich mit meinen Kenntnissen und Fähigkeiten einen wertvollen Beitrag zu Ihrem Team leisten kann.

Anbei finden Sie meinen Lebenslauf. Ich stehe Ihnen gerne für ein Vorstellungsgespräch zur Verfügung und freue mich über Ihre Rückmeldung.

Mit freundlichen Grüssen,
${senderName}
${senderEmail}`;

  } else if (primaryLang === 'fr') {
    subject = `Candidature spontanée – ${role || 'poste disponible'}`;
    body =
`Madame, Monsieur,

Je me permets de vous adresser ma candidature spontanée pour un poste de ${role || 'collaborateur(trice)'} au sein de votre entreprise.

Professionnel expérimenté dans le domaine de ${role || 'mon secteur'}, je suis très intéressé(e) à rejoindre une entreprise de renom telle que ${companyName} en Suisse. Votre profil m'a particulièrement attiré et je suis convaincu(e) de pouvoir apporter mes compétences à votre équipe.

Vous trouverez ci-joint mon curriculum vitae. Je reste à votre entière disposition pour un entretien et vous remercie de l'attention portée à ma candidature.

Dans l'attente de votre réponse, veuillez agréer, Madame, Monsieur, mes salutations distinguées.

${senderName}
${senderEmail}`;

  } else {
    subject = `Candidatura espontánea – ${role || 'puesto disponible'}`;
    body =
`Estimado equipo de ${companyName},

Me pongo en contacto con ustedes para presentar mi candidatura espontánea para el puesto de ${role || 'trabajador'} en su empresa.

Soy un profesional con experiencia en el sector y estoy muy interesado en incorporarme a una empresa como la suya en Suiza. He consultado su perfil en el directorio empresarial y me ha parecido una excelente oportunidad para aportar mis conocimientos y habilidades.

Adjunto mi currículum vitae para su consideración. Quedo a su entera disposición para concertar una entrevista o ampliar información en el momento que estimen oportuno.

Muchas gracias por su tiempo y atención.

Un cordial saludo,
${senderName}
${senderEmail}`;
  }

  return { subject, body, primaryLang };
}

function buildMailtoUrl(email, companyName, role, languages) {
  const { subject, body } = buildCoverLetter(companyName, role, languages);
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ── Envío de candidatura ─────────────────────────────────────────────────── */
function sendCandidaturaBtn(btn) {
  let parsed;
  try { parsed = JSON.parse(btn.dataset.args); } catch (err) {
    // Si el JSON falla (carácter raro en el nombre), abrir correo directamente
    const email = btn.closest('.candidatura-row')?.querySelector('.btn-apply-mailto')?.href;
    if (email) window.open(email);
    return;
  }
  const [email, companyName, role, location, languages] = parsed;
  sendCandidatura(btn, email, companyName, role, location, languages);
}

function openMailtoFallback(email, subject, body, cv) {
  // Abre el correo del usuario con la carta ya escrita
  const mailtoUrl = 'mailto:' + encodeURIComponent(email)
    + '?subject=' + encodeURIComponent(subject)
    + '&body='    + encodeURIComponent(body);
  const a = document.createElement('a');
  a.href = mailtoUrl;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Si hay CV cargado, descargarlo para que el usuario lo adjunte
  if (cv && cv.b64) {
    setTimeout(() => {
      const dl = document.createElement('a');
      dl.href     = 'data:application/octet-stream;base64,' + cv.b64;
      dl.download = cv.name || 'curriculum.pdf';
      document.body.appendChild(dl);
      dl.click();
      document.body.removeChild(dl);
      showTrackerToast('📎 Se descargó tu CV — adjúntalo al correo que se abrió');
    }, 600);
  }
}

function showBtnError(btn, origText, msg) {
  btn.disabled = false;
  btn.textContent = origText;
  // Mostrar error inline (no alert — no funciona bien en móvil)
  const existing = btn.parentNode.querySelector('.send-error');
  if (existing) existing.remove();
  const p = document.createElement('p');
  p.className = 'send-error';
  p.textContent = msg;
  btn.parentNode.appendChild(p);
  setTimeout(() => p.remove(), 10000);
}

async function sendCandidatura(btn, email, companyName, role, location, languages) {
  const settings = getSenderSettings();
  const { subject, body } = buildCoverLetter(companyName, role, languages);
  const cv = getCvData();

  // Sin configuración completa → abrir modal; después del modal reintenta
  if (!settings.email || !settings.password) {
    openSettingsModal({ afterSave: () => sendCandidatura(btn, email, companyName, role, location, languages) });
    return;
  }

  const origText = btn.textContent;
  btn.disabled = true;
  btn.textContent = '⏳ Enviando…';

  try {
    const r = await fetch('/api/send-candidatura', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        fromEmail   : settings.email,
        fromPassword: settings.password,
        fromName    : settings.name,
        provider    : settings.provider,
        toEmail     : email,
        subject,
        body,
        cvBase64    : cv.b64  || '',
        cvName      : cv.name || 'curriculum.pdf',
      }),
    });
    const data = await r.json();

    if (data.ok) {
      btn.textContent    = '✅ Enviado con CV';
      btn.style.cssText  = 'background:#16a34a;color:white;cursor:default';
      addToTracker(companyName, email, role, location);
      showTrackerToast('✅ Candidatura enviada con CV adjunto');
    } else {
      // API falló → abrir correo como fallback garantizado
      showBtnError(btn, origText, '⚠️ ' + data.error + ' — abriendo tu correo…');
      openMailtoFallback(email, subject, body, cv);
      addToTracker(companyName, email, role, location);
    }
  } catch (e) {
    // Error de red → fallback al correo
    showBtnError(btn, origText, '⚠️ Sin conexión al servidor — abriendo tu correo…');
    openMailtoFallback(email, subject, body, cv);
    addToTracker(companyName, email, role, location);
  }
}

function candidaturaHtml(emails, companyName, role, location, languages) {
  if (!emails || !emails.length) return '';

  const langs      = languages || [];
  const primaryLang = langs.includes('de') ? 'de' : langs.includes('fr') ? 'fr' : 'es';
  const langLabel  = { de: 'Alemán 🇩🇪', fr: 'Francés 🇫🇷', es: 'Español 🇪🇸' }[primaryLang];
  const cv         = getCvData();
  const settings   = getSenderSettings();
  const apiReady   = !!(settings.email && settings.password);

  const cvBadge = cv.b64
    ? `<span class="cv-ready">📎 ${esc(cv.name)}</span>`
    : `<button class="cv-reminder-btn" onclick="openSettingsModal()">📎 Subir CV</button>`;

  return `
    <div class="candidatura-block">
      <div class="candidatura-header">
        <span class="candidatura-title">📩 Enviar candidatura</span>
        <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
          <span class="lang-letter-badge">Carta en: ${langLabel}</span>
          ${cvBadge}
        </div>
      </div>
      <div class="candidatura-btns">
        ${emails.map(e => {
          const args = esc(JSON.stringify([e, companyName, role||'', location||'', langs]));
          const { subject, body } = buildCoverLetter(companyName, role, langs);
          const mailtoHref = 'mailto:' + encodeURIComponent(e)
            + '?subject=' + encodeURIComponent(subject)
            + '&body='    + encodeURIComponent(body);
          const btnLabel = apiReady
            ? (cv.b64 ? '✉️ Enviar con CV a ' + esc(e) : '✉️ Enviar a ' + esc(e))
            : '⚙️ Configurar y enviar a ' + esc(e);
          return `
            <div class="candidatura-row">
              <button class="btn-apply${apiReady ? '' : ' btn-apply--setup'}"
                data-args="${args}"
                onclick="sendCandidaturaBtn(this)">
                ${btnLabel}
              </button>
              <a class="btn-apply-mailto" href="${esc(mailtoHref)}"
                data-company="${esc(companyName)}" data-email="${esc(e)}"
                data-role="${esc(role||'')}" data-location="${esc(location||'')}"
                onclick="addToTracker(this.dataset.company,this.dataset.email,this.dataset.role,this.dataset.location)">
                📧 Abrir en correo
              </a>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

function phonesHtml(phones) {
  if (!phones.length) return '<span class="no-contact">No encontrado</span>';
  return phones.map(p => {
    const clean = p.replace(/[\s.\-()]/g, '').replace(/^0(\d{9})$/, '+41$1');
    const wanum = clean.replace(/^\+/, '');
    return `
      <div class="contact-row">
        <a href="tel:${esc(clean)}">${esc(p)}</a>
        <a class="btn-sm wa-btn" href="https://wa.me/${wanum}" target="_blank" rel="noopener">WhatsApp</a>
        <button class="btn-sm" data-copy="${esc(p)}">Copiar</button>
      </div>`;
  }).join('');
}

function addressesHtml(addresses) {
  if (!addresses.length) return '<span class="no-contact">No encontrada</span>';
  return addresses.map(a => `
    <div class="contact-row">
      <a href="https://www.google.com/maps/search/${enc(a)}" target="_blank" rel="noopener">${esc(a)}</a>
      <button class="btn-sm" data-copy="${esc(a)}">Copiar</button>
    </div>`).join('');
}

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS — categoría e idiomas
   ═══════════════════════════════════════════════════════════════════════════ */
function getCategoryDescription(label) {
  for (const cat of Object.values(JOB_CATEGORIES)) {
    if (cat.label === label) return cat.description;
  }
  return '';
}

function langBadgesHtml(langs) {
  if (!langs || !langs.length) return '';
  return langs
    .filter(l => LANG_DISPLAY[l])
    .map(l => `<span class="lang-badge lang-${l}">${LANG_DISPLAY[l].flag} ${esc(LANG_DISPLAY[l].label)}</span>`)
    .join('');
}

/* ═══════════════════════════════════════════════════════════════════════════
   FILTERS
   ═══════════════════════════════════════════════════════════════════════════ */
function toggleFilter(type) {
  activeFilters[type] = !activeFilters[type];
  const pill = type === 'email' ? 'pillEmail' : 'pillPhone';
  document.getElementById(pill).classList.toggle('active', activeFilters[type]);
  renderFiltered();
}

function applyFilters() {
  activeFilters.zone   = document.getElementById('filterZone').value;
  activeFilters.source = document.getElementById('filterSource').value;
  renderFiltered();
}

function getDisplayed() {
  const base = favView
    ? allResults.filter(r => favorites.includes(r.name))
    : allResults;
  return base.filter(r => {
    if (activeFilters.email  && !r.emails.length)                     return false;
    if (activeFilters.phone  && !r.phones.length)                     return false;
    if (activeFilters.zone   && r.location  !== activeFilters.zone)   return false;
    if (activeFilters.source && r.source    !== activeFilters.source) return false;
    return true;
  });
}

function renderFiltered() {
  const filtered   = getDisplayed();
  const privateRes = filtered.filter(r => !r.isETT);
  const ettRes     = filtered.filter(r => r.isETT);

  const container = document.getElementById('results');
  container.className = 'results-sections';
  container.innerHTML = '';
  document.getElementById('extraSections')?.remove();

  const term = _lastSearchTerm;
  const city = _lastSearchCity;

  // ── Sección 1: Empresas privadas ──────────────────────────────────────
  const sec1 = document.createElement('div');
  sec1.className = 'results-section';
  sec1.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">🏭 Empresas privadas</h2>
      <span class="section-count">${privateRes.length} empresa${privateRes.length !== 1 ? 's' : ''}</span>
    </div>`;
  if (privateRes.length > 0) {
    const grid = document.createElement('div');
    grid.className = 'results-grid';
    privateRes.forEach((r, i) => grid.appendChild(buildCardEl(r, i)));
    sec1.appendChild(grid);
  } else {
    sec1.insertAdjacentHTML('beforeend', '<p class="section-empty">Sin empresas privadas para este criterio de búsqueda.</p>');
  }
  container.appendChild(sec1);

  // ── Sección 2: Agencias ETT ───────────────────────────────────────────
  const sec2 = document.createElement('div');
  sec2.className = 'results-section';
  sec2.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">🏢 Agencias de trabajo temporal (ETT)</h2>
      <span class="section-count">${ettRes.length} local${ettRes.length !== 1 ? 'es' : ''} · ${TEMP_AGENCIES.length} nacionales</span>
    </div>`;

  if (ettRes.length > 0) {
    sec2.insertAdjacentHTML('beforeend', `<p class="section-sublabel">📍 ETT locales encontradas en tu zona — con teléfono, email y carta lista:</p>`);
    const grid2 = document.createElement('div');
    grid2.className = 'results-grid';
    ettRes.forEach((r, i) => grid2.appendChild(buildCardEl(r, i)));
    sec2.appendChild(grid2);
  } else {
    sec2.insertAdjacentHTML('beforeend', '<p class="section-empty">No se encontraron agencias ETT locales para esta zona. Usa las nacionales de abajo.</p>');
  }

  sec2.insertAdjacentHTML('beforeend', `<p class="section-sublabel" style="margin-top:18px">🌐 Grandes agencias nacionales — ofertas de <strong>"${esc(term)}"</strong> en <strong>${esc(city || 'Suiza')}</strong>:</p>`);
  const ettGrid = document.createElement('div');
  ettGrid.className = 'agency-grid';
  TEMP_AGENCIES.forEach(a => {
    const url = buildAgencyUrl(a.url, term, city);
    ettGrid.insertAdjacentHTML('beforeend', `
      <a class="agency-card" href="${esc(url)}" target="_blank" rel="noopener">
        <span class="agency-logo">${a.logo}</span>
        <div class="agency-info">
          <span class="agency-name">${esc(a.name)}</span>
          <span class="agency-search-label">Ver ofertas de "${esc(term)}" en ${esc(city || 'Suiza')} →</span>
        </div>
      </a>`);
  });
  sec2.appendChild(ettGrid);
  container.appendChild(sec2);

  // ── Sección 3: Empleo público ─────────────────────────────────────────
  const sec3 = document.createElement('div');
  sec3.className = 'results-section';
  sec3.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">🏛️ Empleo público — Estado y administración</h2>
      <span class="section-count">${PUBLIC_PORTALS.length} portales oficiales</span>
    </div>
    <p class="section-sublabel">Sector público suizo: contratos estables y buenas condiciones. Ofertas de <strong>"${esc(term)}"</strong> en <strong>${esc(city || 'Suiza')}</strong>:</p>
    <div class="public-grid">
      ${PUBLIC_PORTALS.map(p => `
        <a class="public-card" href="${esc(buildAgencyUrl(p.url, term, city))}" target="_blank" rel="noopener">
          <div class="public-card-name">${esc(p.name)}</div>
          <div class="public-card-search">🔍 "${esc(term)}" en ${esc(city || 'Suiza')}</div>
          <div class="public-card-desc">${esc(p.desc)}</div>
          <span class="public-card-arrow">Ver ofertas →</span>
        </a>`).join('')}
    </div>`;
  container.appendChild(sec3);

  // Update filter count
  const baseCount = favView
    ? allResults.filter(r => favorites.includes(r.isJobPosting ? (r.title + '|' + r.name) : r.name)).length
    : allResults.length;
  const lbl = document.getElementById('filterCount');
  lbl.textContent = filtered.length < baseCount ? `${filtered.length} de ${baseCount} mostradas` : '';

  document.getElementById('emptyState').classList.toggle(
    'hidden', filtered.length > 0 || allResults.length === 0
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAVOURITES
   ═══════════════════════════════════════════════════════════════════════════ */
function toggleFav(name, btn) {
  const idx = favorites.indexOf(name);
  if (idx === -1) {
    favorites.push(name);
    btn.classList.add('starred');
    btn.title = 'Quitar de guardados';
  } else {
    favorites.splice(idx, 1);
    btn.classList.remove('starred');
    btn.title = 'Guardar empresa';
  }
  localStorage.setItem('suiza-favs', JSON.stringify(favorites));
  updateFavCount();
  if (favView) renderFiltered();
}

function toggleFavView() {
  favView = !favView;
  document.getElementById('favBtn').classList.toggle('active', favView);
  renderFiltered();
}

function updateFavCount() {
  const cnt = document.getElementById('favCount');
  cnt.textContent = favorites.length;
  cnt.classList.toggle('hidden', favorites.length === 0);
}

/* ═══════════════════════════════════════════════════════════════════════════
   CSV EXPORT — exporta lo que se está viendo (filtrado)
   ═══════════════════════════════════════════════════════════════════════════ */
function exportCSV() {
  const data = getDisplayed();
  if (!data.length) return;
  const headers = ['Empresa','Puesto','Zona buscada','Término','Fuente','Emails','Teléfonos','Direcciones','Web'];
  const rows = data.map(r => [
    r.name, r.title, r.location, r.jobTerm, r.source,
    r.emails.join(' | '), r.phones.join(' | '), r.addresses.join(' | '), r.website,
  ].map(v => `"${String(v || '').replace(/"/g, '""')}"`));

  const csv  = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const a    = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(blob),
    download: `contactos-suiza-${Date.now()}.csv`,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ═══════════════════════════════════════════════════════════════════════════
   UTILS
   ═══════════════════════════════════════════════════════════════════════════ */
const enc = encodeURIComponent;
const esc = str => { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; };

function copyValue(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copiado';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 2000);
  });
}

function shake(el) {
  el.style.animation = 'none'; el.offsetHeight;
  el.style.animation = 'shake .4s ease';
  setTimeout(() => el.style.animation = '', 400);
}

/* ═══════════════════════════════════════════════════════════════════════════
   URL PÚBLICA — muestra el enlace del túnel en el header
   ═══════════════════════════════════════════════════════════════════════════ */
let _publicUrl = null;

function copyShareUrl() {
  if (!_publicUrl) return;
  navigator.clipboard.writeText(_publicUrl).then(() => {
    const btn = document.getElementById('shareCopyBtn');
    btn.textContent = '✓ Copiado';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 2500);
  });
}

function initPublicUrl() {
  const bar        = document.getElementById('shareBar');
  const barLoading = document.getElementById('shareBarLoading');
  const urlSpan    = document.getElementById('shareUrl');

  let attempts = 0;
  const MAX    = 20; // intentar durante ~60 segundos

  function poll() {
    fetch('/api/public-url')
      .then(r => r.json())
      .then(({ url }) => {
        if (url) {
          _publicUrl = url;
          urlSpan.textContent = url;
          bar.classList.remove('hidden');
          barLoading.classList.add('hidden');
        } else if (++attempts < MAX) {
          setTimeout(poll, 3000);
        } else {
          // Sin túnel activo — ocultar ambas barras
          barLoading.classList.add('hidden');
        }
      })
      .catch(() => { if (++attempts < MAX) setTimeout(poll, 3000); });
  }

  poll();
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOUSING SEARCH
   ═══════════════════════════════════════════════════════════════════════════ */

const HOUSING_PORTALS = [
  {
    name  : 'Flatfox',
    logo  : '🦊',
    desc  : 'Plataforma suiza moderna, buena selección en Zúrich y Berna',
    url   : 'https://flatfox.ch/en/search/?query={city}&offer_type=RENT{typeParam}{priceParam}{roomsParam}',
    color : '#ff6b2b',
  },
  {
    name  : 'Homegate',
    logo  : '🏡',
    desc  : 'El mayor portal de inmuebles de Suiza. Cubre todos los cantones',
    url   : 'https://www.homegate.ch/mieten/{homegateType}/ort-{city}/trefferliste{homegateQuery}',
    color : '#0077b6',
  },
  {
    name  : 'ImmoScout24',
    logo  : '🔵',
    desc  : 'Gran selección nacional, muchos pisos directamente de propietario',
    url   : 'https://www.immoscout24.ch/de/immobilien/mieten/ort-{city}{immoscoutQuery}',
    color : '#00a699',
  },
  {
    name  : 'Comparis',
    logo  : '📊',
    desc  : 'Comparador de seguros y pisos — agrega varias plataformas a la vez',
    url   : 'https://en.comparis.ch/immobilien/marktplatz?address={city}&type=10{comparisQuery}',
    color : '#e63946',
  },
  {
    name  : 'wgzimmer.ch',
    logo  : '🤝',
    desc  : 'Especializado en pisos compartidos (WG). Ideal para recién llegados',
    url   : 'https://www.wgzimmer.ch/wgzimmer/find.html?search=true&region=all&city={city}{wgQuery}',
    color : '#2a9d8f',
  },
  {
    name  : 'Anibis',
    logo  : '📋',
    desc  : 'Clasificados suizos, muchos particulares sin comisión de agencia',
    url   : 'https://www.anibis.ch/de/c/immobilien-mieten?q={city}',
    color : '#457b9d',
  },
  {
    name  : 'Tutti.ch',
    logo  : '🟡',
    desc  : 'Otra plataforma de clasificados con pisos en toda Suiza',
    url   : 'https://www.tutti.ch/de/immobilien/mietwohnungen?q={city}',
    color : '#f4a261',
  },
  {
    name  : 'Ronorp',
    logo  : '🌐',
    desc  : 'Comunidad online suiza — popular para pisos y WG en Zúrich',
    url   : 'https://www.ronorp.net/immobilien.html',
    color : '#6d6875',
  },
];

const HOMEGATE_TYPE_SLUG = {
  apartment: 'wohnung',
  house    : 'haus',
  room     : 'zimmer',
  studio   : 'wohnung',
  any      : 'wohnung',
};

function buildHousingPortalUrl(portal, city, type, maxPrice, minRooms) {
  const hgType  = HOMEGATE_TYPE_SLUG[type] || 'wohnung';
  const cityEnc = encodeURIComponent(city);
  const cityLow = city.toLowerCase().replace(/\s+/g, '-');

  // Build optional query parts
  const flatfoxType  = type && type !== 'any'
    ? '&object_category=' + ({ apartment:'APARTMENT', house:'HOUSE', room:'ROOM', studio:'STUDIO' }[type] || '')
    : '';
  const flatfoxPrice = maxPrice ? '&maxPrice=' + maxPrice : '';
  const flatfoxRooms = minRooms ? '&rooms_min=' + minRooms : '';

  const hgParts = [];
  if (maxPrice) hgParts.push('pt=' + maxPrice);
  if (minRooms) hgParts.push('nrf=' + minRooms);
  const hgQuery = hgParts.length ? '?' + hgParts.join('&') : '';

  const isoParts = [];
  if (maxPrice) isoParts.push('pt=' + maxPrice);
  if (minRooms) isoParts.push('nrf=' + minRooms);
  const isoQuery = isoParts.length ? '?' + isoParts.join('&') : '';

  const compParts = [];
  if (maxPrice) compParts.push('priceTo=' + maxPrice);
  if (minRooms) compParts.push('rooms=' + minRooms);
  const comparisQuery = compParts.length ? '&' + compParts.join('&') : '';

  const wgParts = [];
  if (maxPrice) wgParts.push('price-to=' + maxPrice);
  const wgQuery = wgParts.length ? '&' + wgParts.join('&') : '';

  return portal.url
    .replace('{city}',          cityEnc)
    .replace('{city-slug}',     cityLow)
    .replace('{homegateType}',  hgType)
    .replace('{homegateQuery}', hgQuery)
    .replace('{immoscoutQuery}',isoQuery)
    .replace('{comparisQuery}', comparisQuery)
    .replace('{wgQuery}',       wgQuery)
    .replace('{typeParam}',     flatfoxType)
    .replace('{priceParam}',    flatfoxPrice)
    .replace('{roomsParam}',    flatfoxRooms);
}

// ── Housing zone chip system ─────────────────────────────────────────────────
const MAX_HOUSING_ZONES = 5;
let housingZones = [];

function initHousingChips() {
  const input = document.getElementById('housingZoneInput');
  if (!input) return;

  input.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) {
      e.preventDefault();
      addHousingZone(input.value.replace(',', '').trim());
      input.value = '';
    }
    if (e.key === 'Backspace' && input.value === '' && housingZones.length) {
      removeHousingZone(housingZones.length - 1);
    }
  });

  input.addEventListener('blur', () => {
    if (input.value.trim()) { addHousingZone(input.value.trim()); input.value = ''; }
  });
}

function addHousingZone(text) {
  if (!text || housingZones.length >= MAX_HOUSING_ZONES) return;
  if (housingZones.map(z => z.toLowerCase()).includes(text.toLowerCase())) return;
  housingZones.push(text);
  renderHousingChips();
}

function removeHousingZone(idx) {
  housingZones.splice(idx, 1);
  renderHousingChips();
}

function renderHousingChips() {
  const box     = document.getElementById('housingZoneBox');
  const input   = document.getElementById('housingZoneInput');
  const counter = document.getElementById('housingZoneCounter');
  if (!box) return;

  box.querySelectorAll('.chip').forEach(c => c.remove());
  housingZones.forEach((z, i) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.innerHTML = `${esc(z)} <button class="chip-remove" title="Quitar">×</button>`;
    chip.querySelector('.chip-remove').addEventListener('click', e => {
      e.stopPropagation();
      removeHousingZone(i);
    });
    box.insertBefore(chip, input);
  });

  input.placeholder = housingZones.length === 0 ? 'Zurich, Geneva, Basel…' : 'Añadir zona…';
  input.disabled    = housingZones.length >= MAX_HOUSING_ZONES;
  counter.textContent = `${housingZones.length} / ${MAX_HOUSING_ZONES} zonas`;
  counter.classList.toggle('full', housingZones.length >= MAX_HOUSING_ZONES);
}

// ── Housing search ───────────────────────────────────────────────────────────
let allHousingResults = [];
let housingAbortCtrl  = null;

function startHousingSearch() {
  const input = document.getElementById('housingZoneInput');
  const typed = input.value.trim();
  if (typed) { addHousingZone(typed); input.value = ''; renderHousingChips(); }

  if (housingZones.length === 0) {
    shake(document.getElementById('housingZoneBox'));
    document.getElementById('housingZoneInput').placeholder = '⚠ Escribe una ciudad y pulsa Buscar';
    return;
  }

  const type            = document.getElementById('housingType').value;
  const maxPrice        = document.getElementById('housingMaxPrice').value.trim();
  const minRooms        = document.getElementById('housingMinRooms').value.trim();
  const directContactOnly = document.getElementById('housingDirectContact')?.checked || false;
  const sortBy          = document.getElementById('housingSort')?.value || 'price';

  if (housingAbortCtrl) housingAbortCtrl.abort();
  housingAbortCtrl  = new AbortController();
  allHousingResults = [];

  // Reset UI
  document.getElementById('housingResults')    .innerHTML = '';
  document.getElementById('housingPortals')    .classList.add('hidden');
  document.getElementById('housingEmptyState') .classList.add('hidden');
  document.getElementById('housingStatsRow')   .classList.add('hidden');
  document.getElementById('housingStatusArea') .classList.remove('hidden');
  document.getElementById('housingProgressFill').classList.remove('done');
  document.getElementById('housingProgressFill').style.width = '15%';
  document.getElementById('housingStatusMsg')  .textContent = 'Buscando alojamientos…';
  document.querySelector('#housingStatusArea .spinner').style.visibility = 'visible';

  const btn = document.getElementById('housingSearchBtn');
  btn.disabled = true;
  document.getElementById('housingBtnLabel').textContent = 'Buscando…';

  // Animar barra de progreso mientras espera la respuesta
  let pct = 15;
  const progTimer = setInterval(() => {
    pct = Math.min(pct + 3, 85);
    document.getElementById('housingProgressFill').style.width = pct + '%';
  }, 1200);

  const params = new URLSearchParams({ zones: housingZones.join(','), type });
  if (maxPrice) params.set('maxPrice', maxPrice);
  if (minRooms) params.set('minRooms', minRooms);

  document.getElementById('housingStatusMsg').textContent =
    '🔍 Buscando en comparis.ch, flatfox.ch, ronorp.net, reddit.com y más…';

  fetch(`/api/housing?${params}`, { signal: housingAbortCtrl.signal })
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(data => {
      clearInterval(progTimer);
      allHousingResults = data.results || [];

      let sorted = [...allHousingResults];
      if (sortBy === 'contact') {
        sorted.sort((a, b) => {
          const aHas = (a.emails?.length || 0) + (a.phones?.length || 0);
          const bHas = (b.emails?.length || 0) + (b.phones?.length || 0);
          if (bHas !== aHas) return bHas - aHas;
          return (a.priceNum || 99999) - (b.priceNum || 99999);
        });
      } else if (sortBy === 'source') {
        sorted.sort((a, b) => (a.source || '').localeCompare(b.source || ''));
      } else {
        sorted.sort((a, b) => (a.priceNum || 99999) - (b.priceNum || 99999));
      }
      if (directContactOnly) {
        sorted = sorted.filter(r => (r.emails?.length || 0) + (r.phones?.length || 0) > 0);
      }

      sorted.forEach(appendHousingCard);
      finishHousingSearch(sorted.length, data.bySource || {});
    })
    .catch(err => {
      clearInterval(progTimer);
      if (err.name === 'AbortError') return;
      document.getElementById('housingStatusMsg').textContent =
        '⚠️ Error de conexión — recarga la página e inténtalo de nuevo';
      finishHousingSearch(0, {});
    });
}

function finishHousingSearch(count, bySource) {
  housingAbortCtrl = null;
  const btn = document.getElementById('housingSearchBtn');
  btn.disabled = false;
  document.getElementById('housingBtnLabel').textContent = 'Buscar alojamientos';
  document.getElementById('housingProgressFill').style.width = '100%';
  document.getElementById('housingProgressFill').classList.add('done');
  document.querySelector('#housingStatusArea .spinner').style.visibility = 'hidden';

  if (count > 0) {
    // Build source breakdown string
    const srcParts = Object.entries(bySource)
      .sort((a, b) => b[1] - a[1])
      .map(([src, n]) => `${n} de ${src}`)
      .join(' · ');
    document.getElementById('housingStatusMsg').textContent =
      `✅ ${count} anuncio${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''} — ordenados por precio`;
    document.getElementById('housingStatsRow').classList.remove('hidden');
    document.getElementById('housingStatsText').textContent =
      `${count} anuncios · ${srcParts}`;
    // Show portal links as supplementary discovery section
    const type     = document.getElementById('housingType').value;
    const maxPrice = document.getElementById('housingMaxPrice').value.trim();
    const minRooms = document.getElementById('housingMinRooms').value.trim();
    renderHousingPortals(type, maxPrice, minRooms);
  } else {
    document.getElementById('housingStatusMsg').textContent =
      '⚠️ No se encontraron anuncios. Prueba otra ciudad o amplía el precio máximo.';
    document.getElementById('housingEmptyState').classList.remove('hidden');
    // Show portals even when no results
    const type     = document.getElementById('housingType').value;
    const maxPrice = document.getElementById('housingMaxPrice').value.trim();
    const minRooms = document.getElementById('housingMinRooms').value.trim();
    renderHousingPortals(type, maxPrice, minRooms);
  }
}

/* ── Housing inquiry letter ─────────────────────────────────────────────── */
function buildHousingInquiryLetter(contactName, housingType, zone, languages) {
  const langs = languages || [];
  const primaryLang = langs.includes('de') ? 'de' : langs.includes('fr') ? 'fr' : 'es';
  const s = getSenderSettings();
  const senderName  = s.name  || '[Tu nombre]';
  const senderEmail = s.email || '[Tu email]';
  const type = housingType || 'alojamiento';

  let subject, body;

  if (primaryLang === 'de') {
    subject = `Anfrage Mietwohnung / WG-Zimmer in ${zone || 'Ihrer Region'}`;
    body =
`Sehr geehrte Damen und Herren,

ich bin auf der Suche nach einem ${type === 'Habitación / WG' ? 'WG-Zimmer' : type === 'Casa / Chalet' ? 'Haus zur Miete' : type === 'Estudio' ? 'Studio' : 'Mietobjekt'} in ${zone || 'Ihrer Region'} und habe Ihre Kontaktdaten im Branchenverzeichnis gefunden.

Ich bin ein seriöser Mieter aus Spanien, arbeite in der Schweiz und verfüge über ein geregeltes Einkommen. Gerne stelle ich alle notwendigen Unterlagen zur Verfügung (Lohnausweise, Betreibungsauszug, Referenzen).

Könnten Sie mir bitte mitteilen, ob Sie aktuell etwas Passendes vermieten oder ob Sie mir dabei helfen können, ein geeignetes Objekt zu finden?

Für Ihre Rückmeldung danke ich Ihnen im Voraus.

Mit freundlichen Grüssen,
${senderName}
${senderEmail}`;

  } else if (primaryLang === 'fr') {
    subject = `Recherche de logement à ${zone || 'votre région'}`;
    body =
`Madame, Monsieur,

Je suis à la recherche d'un logement (${type === 'Habitación / WG' ? 'chambre en colocation' : type === 'Casa / Chalet' ? 'maison' : type === 'Estudio' ? 'studio' : 'appartement'}) à ${zone || 'votre région'} et j'ai trouvé vos coordonnées dans l'annuaire professionnel.

Locataire sérieux d'origine espagnole, je travaille en Suisse et dispose de revenus réguliers. Je suis en mesure de fournir tous les documents nécessaires (fiches de salaire, extrait du registre des poursuites, références).

Pourriez-vous me faire savoir si vous avez actuellement quelque chose de disponible à louer ou si vous pouvez m'aider dans ma recherche?

Dans l'attente de votre réponse, je vous adresse mes cordiales salutations.

${senderName}
${senderEmail}`;

  } else {
    subject = `Consulta sobre alojamiento en ${zone || 'Suiza'}`;
    body =
`Estimado/a ${contactName || 'equipo'},

Me pongo en contacto con ustedes porque busco un ${type === 'Habitación / WG' ? 'habitación en piso compartido (WG)' : type === 'Casa / Chalet' ? 'casa o chalet' : type === 'Estudio' ? 'estudio' : 'piso'} en ${zone || 'Suiza'} y he encontrado sus datos de contacto en el directorio profesional.

Soy una persona responsable, vengo de España y trabajo en Suiza con ingresos estables. Puedo aportar toda la documentación necesaria (nóminas, extracto del Registro de Deudas, referencias laborales y personales).

¿Podría indicarme si tienen disponible algún alojamiento actualmente o si pueden orientarme en mi búsqueda?

Muchas gracias por su tiempo y atención.

Un cordial saludo,
${senderName}
${senderEmail}`;
  }

  return { subject, body, primaryLang };
}

function housingInquiryHtml(emails, phones, contactName, housingType, location, languages) {
  if ((!emails || !emails.length) && (!phones || !phones.length)) return '';

  const langs       = languages || [];
  const primaryLang = langs.includes('de') ? 'de' : langs.includes('fr') ? 'fr' : 'es';
  const langLabel   = { de: 'Alemán 🇩🇪', fr: 'Francés 🇫🇷', es: 'Español 🇪🇸' }[primaryLang];
  const settings    = getSenderSettings();
  const apiReady    = !!(settings.email && settings.password);

  const emailsSection = emails.length ? `
    <div class="housing-inquiry-section">
      <h4 class="housing-inquiry-title">📩 Enviar consulta de disponibilidad</h4>
      <div class="lang-letter-row">
        <span class="lang-letter-badge">Carta en: ${langLabel}</span>
      </div>
      <div class="candidatura-btns" style="margin-top:8px">
        ${emails.map(e => {
          const { subject, body } = buildHousingInquiryLetter(contactName, housingType, location, langs);
          const args = esc(JSON.stringify([e, contactName, housingType, location, langs]));
          const mailtoHref = 'mailto:' + encodeURIComponent(e)
            + '?subject=' + encodeURIComponent(subject)
            + '&body='    + encodeURIComponent(body);
          const btnLabel = apiReady ? '📩 Enviar consulta a ' + esc(e) : '⚙️ Configurar y enviar a ' + esc(e);
          return `
            <div class="candidatura-row">
              <button class="btn-apply${apiReady ? '' : ' btn-apply--setup'}"
                data-args="${args}"
                onclick="sendHousingInquiryBtn(this)">${btnLabel}</button>
              <a class="btn-apply-mailto" href="${esc(mailtoHref)}">📧 Abrir en correo</a>
            </div>`;
        }).join('')}
      </div>
    </div>` : '';

  return `<div class="candidatura-block">${emailsSection}</div>`;
}

function sendHousingInquiryBtn(btn) {
  let parsed;
  try { parsed = JSON.parse(btn.dataset.args); } catch {
    const email = btn.closest('.candidatura-row')?.querySelector('.btn-apply-mailto')?.href;
    if (email) window.open(email);
    return;
  }
  const [email, contactName, housingType, location, languages] = parsed;
  const { subject, body } = buildHousingInquiryLetter(contactName, housingType, location, languages);
  const settings = getSenderSettings();
  if (!settings.email || !settings.password) {
    openSettingsModal({ afterSave: () => sendHousingInquiryBtn(btn) });
    return;
  }
  sendCandidatura(btn, email, contactName, housingType, location, languages);
}

function toggleDesc(btn) {
  const p = btn.previousElementSibling;
  const expanded = btn.dataset.expanded === '1';
  const full = btn.dataset.full;
  if (expanded) {
    p.textContent = full.slice(0, 400) + '…';
    btn.textContent = 'Leer más ▼';
    btn.dataset.expanded = '0';
  } else {
    p.textContent = full;
    btn.textContent = 'Leer menos ▲';
    btn.dataset.expanded = '1';
  }
}

function appendHousingCard(data) {
  const container = document.getElementById('housingResults');
  const card = document.createElement('div');
  card.className = 'housing-listing-card';
  card.style.animationDelay = `${Math.min(allHousingResults.length * 0.04, 0.4)}s`;

  const srcColors = {
    'ronorp.net'      : { bg: '#fdf2f8', color: '#9d174d', border: '#f9a8d4' },
    'comparis.ch'     : { bg: '#eff6ff', color: '#1e40af', border: '#93c5fd' },
    'hostelworld.com' : { bg: '#fff7ed', color: '#c2410c', border: '#fdba74' },
    'wgzimmer.ch'     : { bg: '#f0fdf4', color: '#166534', border: '#86efac' },
    'anibis.ch'       : { bg: '#f5f3ff', color: '#6d28d9', border: '#c4b5fd' },
    'tutti.ch'        : { bg: '#fefce8', color: '#854d0e', border: '#fde047' },
    'flatfox.ch'      : { bg: '#ecfdf5', color: '#065f46', border: '#6ee7b7' },
    'reddit.com'      : { bg: '#fff1f0', color: '#b91c1c', border: '#fca5a5' },
  };
  const sc = srcColors[data.source] || { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' };

  // Badges meta row
  const metaBadges = [];
  if (data.rooms) metaBadges.push(`🛏 ${data.rooms} hab.`);
  if (data.size)  metaBadges.push(`📐 ${data.size}`);
  if (data.floor) metaBadges.push(`🏢 ${data.floor}`);
  if (data.housingType) metaBadges.push(`🏷 ${data.housingType}`);
  const hasContact = (data.emails && data.emails.length) || (data.phones && data.phones.length);
  if (hasContact) metaBadges.push(`📞 Contacto directo`);

  // Owner/agency badge
  const ownerBadge = data.agency
    ? `<span class="hlc-agency-badge">🏢 ${esc(data.agency)}</span>`
    : data.isPrivate
      ? `<span class="hlc-private-badge">👤 Particular</span>`
      : '';

  // Amenities row (ronorp)
  const amenitiesHtml = (data.amenities && data.amenities.length)
    ? `<div class="hlc-amenities">${data.amenities.map(a => `<span class="hlc-amenity">✓ ${esc(a)}</span>`).join('')}</div>`
    : '';

  // Contact info
  const contactNameHtml = data.contact
    ? `<div class="hlc-contact-name">👤 Propietario: <strong>${esc(data.contact)}</strong></div>`
    : '';

  // Image (ronorp provides them)
  const imageHtml = data.image
    ? `<div class="hlc-img-wrap"><img class="hlc-img" src="${esc(data.image)}" alt="${esc(data.titleRaw || data.title || '')}" loading="lazy"></div>`
    : '';

  card.innerHTML = `
    ${imageHtml}
    <div class="hlc-header">
      <div class="hlc-price-row">
        ${data.price
          ? `<span class="hlc-price">${esc(data.price)}${data.priceNote ? `<small class="hlc-price-note"> ${esc(data.priceNote)}</small>` : ''}</span>`
          : '<span class="hlc-price hlc-price--unknown">Precio a consultar</span>'}
        <span class="hlc-source-badge" style="background:${sc.bg};color:${sc.color};border:1.5px solid ${sc.border}">${esc(data.source)}</span>
      </div>
      <h3 class="hlc-title">${esc(data.title || 'Anuncio de alquiler')}</h3>
      ${data.titleRaw && data.titleRaw !== data.title
        ? `<p class="hlc-original">Original: <em>${esc(data.titleRaw)}</em></p>` : ''}
      <div class="hlc-location">📍 ${esc(data.location || data.zone || '—')}</div>
      ${data.address ? `<div class="hlc-address">🗺️ <a href="https://maps.google.com/?q=${encodeURIComponent(data.address)}" target="_blank" rel="noopener">${esc(data.address)}</a></div>` : ''}
      ${ownerBadge}
      ${metaBadges.length ? `<div class="hlc-meta">${metaBadges.map(b => `<span>${esc(b)}</span>`).join('')}</div>` : ''}
      ${data.available ? `<div class="hlc-available">📅 Disponible: ${esc(data.available)}</div>` : ''}
      ${amenitiesHtml}
    </div>

    ${data.description ? `
    <div class="hlc-desc">
      <h4 class="hlc-desc-label">📝 Descripción (traducida al español)</h4>
      <p class="hlc-desc-text">${esc(data.description.slice(0, 400))}${data.description.length > 400 ? '…' : ''}</p>
      ${data.description.length > 400 ? `<button class="hlc-desc-toggle" data-full="${esc(data.description)}" data-expanded="0" onclick="toggleDesc(this)">Leer más ▼</button>` : ''}
    </div>` : ''}

    ${(hasContact || data.contact) ? `
    <div class="hlc-contact hlc-contact--found">
      <div class="hlc-contact-header">✅ Contacto directo encontrado</div>
      ${contactNameHtml}
      ${(data.emails || []).map(e => `
        <div class="contact-row">
          <a href="mailto:${esc(e)}">${esc(e)}</a>
          <button class="btn-sm" data-copy="${esc(e)}">Copiar</button>
        </div>`).join('')}
      ${(data.phones || []).map(p => {
        const clean = p.replace(/[\s.\-()]/g, '');
        const wa = clean.replace(/^\+/, '');
        return `
          <div class="contact-row">
            <a href="tel:${esc(clean)}">${esc(p)}</a>
            <a class="btn-sm wa-btn" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>
            <button class="btn-sm" data-copy="${esc(p)}">Copiar</button>
          </div>`;
      }).join('')}
    </div>` : ''}

    <div class="hlc-footer">
      ${(data.emails && data.emails.length) ? (() => {
        const subj = encodeURIComponent('Consulta: ' + (data.titleRaw || data.title || '').slice(0,60));
        const body = encodeURIComponent('Estimado/a propietario/a,\n\nMe interesa el anuncio "' + (data.titleRaw||data.title||'') + '" publicado en ' + data.source + '.\n\n¿Sigue disponible? ¿Podría concertar una visita?\n\nMuchas gracias,\n');
        return `<a class="hlc-inquiry-btn" href="mailto:${esc(data.emails[0])}?subject=${subj}&body=${body}">✉️ Enviar consulta</a>`;
      })() : ''}
      <a class="hlc-view-btn" href="${esc(data.url)}" target="_blank" rel="noopener">
        ${hasContact ? 'Ver anuncio en ' + esc(data.source) + ' →' : 'Ver anuncio y contactar en ' + esc(data.source) + ' →'}
      </a>
    </div>`;

  card.querySelectorAll('[data-copy]').forEach(btn =>
    btn.addEventListener('click', () => copyValue(btn.dataset.copy, btn)));

  container.appendChild(card);
}

function renderHousingPortals(type, maxPrice, minRooms) {
  const portalsEl = document.getElementById('housingPortals');
  portalsEl.classList.remove('hidden');

  const zonesForPortals = housingZones.length ? housingZones : ['Suiza'];

  portalsEl.innerHTML = `
    <div class="housing-portals-header">
      <h3 class="housing-portals-title">🌐 Portales de alojamiento en Suiza</h3>
      <p class="housing-portals-sub">Haz clic para ver todos los anuncios con tu búsqueda ya aplicada. Regístrate en varios — cada plataforma tiene anuncios distintos.</p>
    </div>
    <div class="housing-portals-zones">
      ${zonesForPortals.map(zone => `
        <div class="housing-zone-group">
          <div class="housing-zone-label">📍 ${esc(zone)}</div>
          <div class="housing-portals-grid">
            ${HOUSING_PORTALS.map(p => {
              const url = buildHousingPortalUrl(p, zone, type, maxPrice, minRooms);
              return `
                <a class="housing-portal-card" href="${esc(url)}" target="_blank" rel="noopener" style="--portal-color:${p.color}">
                  <span class="housing-portal-logo">${p.logo}</span>
                  <div class="housing-portal-info">
                    <span class="housing-portal-name">${esc(p.name)}</span>
                    <span class="housing-portal-desc">${esc(p.desc)}</span>
                  </div>
                  <span class="housing-portal-arrow">→</span>
                </a>`;
            }).join('')}
          </div>
        </div>`).join('')}
    </div>`;
}

function exportHousingCSV() {
  if (!allHousingResults.length) return;
  const headers = ['Título','Precio','Habitaciones','Tamaño','Dirección','Zona','Descripción','URL'];
  const rows = allHousingResults.map(r => [
    r.title, r.price, r.rooms, r.size, r.address, r.zone, r.description, r.url,
  ].map(v => `"${String(v || '').replace(/"/g, '""')}"`));
  const csv  = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const a    = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(blob),
    download: `alojamiento-suiza-${Date.now()}.csv`,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ─── Pestaña: Seguro médico suizo ─────────────────────────────────────── */
let insuranceRendered = false;

const INSURANCE_DATA = {
  alert: {
    icon: '⚠️',
    title: 'Obligatorio en Suiza — plazo 3 meses',
    body: 'Todo residente debe tener seguro médico básico (Grundversicherung / LAMal). Tienes <strong>3 meses desde tu llegada</strong> para contratar uno. Si no lo haces, la autoridad cantonal te asigna uno (suele ser más caro). La cobertura es retroactiva desde tu fecha de llegada.',
  },
  steps: [
    { n: '1', icon: '🏛️', title: 'Regístrate en la comuna', body: 'Primero empadrórate (Anmeldung) en el Einwohnerkontrolle de tu ciudad. Necesitas: pasaporte, contrato de alquiler, y en algunos cantones el permiso de residencia.' },
    { n: '2', icon: '📊', title: 'Compara seguros', body: 'Usa la herramienta oficial del gobierno: <a href="https://www.priminfo.admin.ch/de/praemien" target="_blank" rel="noopener">priminfo.admin.ch</a>. También puedes usar <a href="https://www.comparis.ch/krankenkasse" target="_blank" rel="noopener">comparis.ch/krankenkasse</a>. Filtra por tu cantón, edad y franquicia para ver las primas exactas.' },
    { n: '3', icon: '✅', title: 'Contrata online', body: 'Ve directamente a la web de la aseguradora elegida. Necesitarás: pasaporte o permiso de residencia, dirección suiza, fecha de llegada y número AHV (seguridad social suizo — te lo dan al empadronarte). Recibirás la tarjeta de seguro por correo en 1-2 semanas.' },
    { n: '4', icon: '💼', title: 'Si estás empleado', body: 'Si trabajas <strong>8+ horas/semana</strong> para el mismo empleador, los accidentes laborales están cubiertos por el seguro del trabajo. Puedes <strong>desactivar la cobertura de accidentes</strong> (Unfalldeckung) en tu seguro médico y ahorrar ~15-30 CHF/mes.' },
  ],
  concepts: [
    { icon: '🛡️', term: 'Grundversicherung', sub: 'Seguro básico obligatorio', desc: 'Cubre visitas al médico, hospital (sala general), medicamentos con receta y urgencias. Es idéntico para todas las aseguradoras — solo cambia el precio y el modelo de acceso.' },
    { icon: '➕', term: 'Zusatzversicherung', sub: 'Seguro complementario (opcional)', desc: 'Habitación individual en hospital, medicina alternativa, dental, gafas. No es obligatorio pero popular. Contrata después del básico si lo deseas.' },
    { icon: '💰', term: 'Franchise', sub: 'Franquicia (deducible anual)', desc: 'Opciones: 300 / 500 / 1.000 / 1.500 / 2.000 / 2.500 CHF/año. A mayor franquicia, menor prima mensual. Funcionamiento: pagas tú los primeros X CHF (franquicia); después el 10% de los gastos siguientes hasta un máximo de CHF 700 (Selbstbehalt / participación en costes). <strong>Máximo que pagas al año de tu bolsillo = franquicia + 700 CHF.</strong>' },
    { icon: '🧑‍🎓', term: 'Descuento jóvenes (19–25 años)', sub: '~50% de rebaja en la prima', desc: 'Si tienes entre 19 y 25 años, la prima básica es aproximadamente la mitad que la de un adulto mayor de 26. Este descuento es automático — solo indícalo al contratar. Menores de 19 años tienen primas aún más bajas.' },
    { icon: '🏥', term: 'Modelos de seguro', sub: 'Afectan al precio', desc: '<strong>Estándar:</strong> libre elección de médico (más caro). <strong>Hausarzt:</strong> debes ir siempre al mismo médico de cabecera primero (más barato). <strong>HMO:</strong> centro médico fijo (~20% más barato). <strong>Telmed:</strong> llamada previa obligatoria (~25% más barato).' },
    { icon: '🎁', term: 'Prämienverbilligung', sub: 'Subvención de prima para rentas bajas', desc: 'Aproximadamente el <strong>35% de los residentes en Suiza la reciben</strong>. Aplica para rentas imponibles de hasta ~55.000–70.000 CHF/año (varía por cantón). El cantón puede cubrir entre 50 y 400+ CHF/mes de tu prima. En algunos cantones es automática; en otros la debes solicitar. Más info: <a href="https://www.bag.admin.ch" target="_blank">bag.admin.ch</a> → "Prämienverbilligung".' },
  ],
  franchises: [
    { chf: 300,   saving: '—',          note: 'Máxima cobertura desde el primer CHF' },
    { chf: 500,   saving: '~25 CHF/mes', note: 'Buen equilibrio si vas pocas veces al médico' },
    { chf: 1000,  saving: '~55 CHF/mes', note: 'Popular entre jóvenes sanos' },
    { chf: 1500,  saving: '~75 CHF/mes', note: '' },
    { chf: 2000,  saving: '~90 CHF/mes', note: '' },
    { chf: 2500,  saving: '~110 CHF/mes', note: 'Máximo ahorro — solo si raramente vas al médico' },
  ],
  insurers: [
    { name: 'Assura',        web: 'https://www.assura.ch',           price: 'Más barata', color: '#dc2626', note: 'Sin atención telefónica premium — ideal para sanos' },
    { name: 'Sympany',       web: 'https://www.sympany.ch',          price: 'Muy barata', color: '#7c3aed', note: 'Digital, buena app' },
    { name: 'Atupri',        web: 'https://www.atupri.ch',           price: 'Barata',     color: '#0891b2', note: 'Digital-first, moderna' },
    { name: 'KPT',           web: 'https://www.kpt.ch',              price: 'Barata',     color: '#059669', note: 'Fuerte en Berna y alrededores' },
    { name: 'CSS',           web: 'https://www.css.ch',              price: 'Media',      color: '#d97706', note: 'Gran red, buena app, buena relación calidad-precio' },
    { name: 'Concordia',     web: 'https://www.concordia.ch',        price: 'Media',      color: '#0284c7', note: 'Buena valoración en servicio' },
    { name: 'Visana',        web: 'https://www.visana.ch',           price: 'Media',      color: '#be123c', note: 'Fuerte en Berna y Suiza central' },
    { name: 'Sanitas',       web: 'https://www.sanitas.com',         price: 'Media-alta', color: '#6d28d9', note: 'App excelente, buena atención' },
    { name: 'Helsana',       web: 'https://www.helsana.ch',          price: 'Media-alta', color: '#1d4ed8', note: 'La más grande de Suiza, muy fiable' },
    { name: 'SWICA',         web: 'https://www.swica.ch',            price: 'Alta',       color: '#065f46', note: 'Premium — mejor valorada en satisfacción' },
    { name: 'Groupe Mutuel', web: 'https://www.groupemutuel.ch',     price: 'Variable',   color: '#92400e', note: 'Dominante en Suiza romanda (Ginebra, Vaud)' },
  ],
  premiumByCity: [
    { city: 'Zürich',     range: '350 – 500 CHF/mes', franchise: 'CHF 300, modelo estándar, adulto 26+' },
    { city: 'Bern',       range: '320 – 460 CHF/mes', franchise: 'CHF 300, modelo estándar, adulto 26+' },
    { city: 'Basel',      range: '370 – 510 CHF/mes', franchise: 'CHF 300, modelo estándar, adulto 26+' },
    { city: 'Geneva',     range: '430 – 590 CHF/mes', franchise: 'CHF 300, modelo estándar, adulto 26+' },
    { city: 'Lausanne',   range: '400 – 550 CHF/mes', franchise: 'CHF 300, modelo estándar, adulto 26+' },
    { city: 'Lugano',     range: '280 – 390 CHF/mes', franchise: 'CHF 300, modelo estándar, adulto 26+' },
    { city: 'Lucerne',    range: '300 – 420 CHF/mes', franchise: 'CHF 300, modelo estándar, adulto 26+' },
    { city: 'Winterthur', range: '340 – 470 CHF/mes', franchise: 'CHF 300, modelo estándar, adulto 26+' },
  ],
  comparators: [
    { name: 'priminfo.admin.ch', url: 'https://www.priminfo.admin.ch/de/praemien', icon: '🏛️', desc: 'Comparador oficial del gobierno federal — el más fiable y actualizado' },
    { name: 'comparis.ch', url: 'https://www.comparis.ch/krankenkasse', icon: '📊', desc: 'Popular comparador privado — también muestra valoraciones de clientes' },
  ],
};

function renderInsurance() {
  if (insuranceRendered) return;
  insuranceRendered = true;

  const el = document.getElementById('insuranceContent');
  const d  = INSURANCE_DATA;

  el.innerHTML = `
    <div class="insurance-wrap">
      <div class="insurance-header">
        <h2 class="insurance-title">🏥 Seguro médico en Suiza (KVG / LAMal)</h2>
        <p class="insurance-subtitle">Todo lo que necesitas saber para contratar tu seguro al llegar</p>
      </div>

      <!-- Alerta obligatoriedad -->
      <div class="ins-alert">
        <span class="ins-alert-icon">${d.alert.icon}</span>
        <div><strong>${d.alert.title}</strong><br><span>${d.alert.body}</span></div>
      </div>

      <!-- Pasos -->
      <section class="ins-section">
        <h3 class="ins-section-title">📋 Pasos para contratar</h3>
        <div class="ins-steps">
          ${d.steps.map(s => `
            <div class="ins-step">
              <div class="ins-step-num">${s.n}</div>
              <div class="ins-step-body">
                <div class="ins-step-title">${s.icon} ${s.title}</div>
                <div class="ins-step-desc">${s.body}</div>
              </div>
            </div>`).join('')}
        </div>
      </section>

      <!-- Comparadores oficiales -->
      <section class="ins-section">
        <h3 class="ins-section-title">🔍 Herramientas de comparación</h3>
        <div class="ins-comparators">
          ${d.comparators.map(c => `
            <a class="ins-comparator-card" href="${esc(c.url)}" target="_blank" rel="noopener">
              <span class="ins-comp-icon">${c.icon}</span>
              <div>
                <div class="ins-comp-name">${esc(c.name)}</div>
                <div class="ins-comp-desc">${esc(c.desc)}</div>
              </div>
              <span class="ins-comp-arrow">→</span>
            </a>`).join('')}
        </div>
      </section>

      <!-- Franquicias -->
      <section class="ins-section">
        <h3 class="ins-section-title">💰 Franquicias (Franchise) — elige según tu salud</h3>
        <div class="ins-franchise-grid">
          ${d.franchises.map((f, i) => `
            <div class="ins-franchise-card${i === 0 ? ' ins-franchise--max' : i === d.franchises.length-1 ? ' ins-franchise--min' : ''}">
              <div class="ins-franchise-chf">CHF ${f.chf.toLocaleString()}</div>
              <div class="ins-franchise-saving">${f.saving || ''}</div>
              ${f.note ? `<div class="ins-franchise-note">${f.note}</div>` : ''}
            </div>`).join('')}
        </div>
        <p class="ins-franchise-tip">💡 Regla práctica: si visitas al médico <strong>menos de 3 veces al año</strong>, elige franquicia alta y ahorra la diferencia.</p>
      </section>

      <!-- Primas estimadas por ciudad -->
      <section class="ins-section">
        <h3 class="ins-section-title">🗺️ Prima estimada por ciudad (adulto 26+, CHF 300 de franquicia)</h3>
        <div class="ins-city-grid">
          ${d.premiumByCity.map(c => `
            <div class="ins-city-card">
              <div class="ins-city-name">📍 ${esc(c.city)}</div>
              <div class="ins-city-range">${esc(c.range)}</div>
              <div class="ins-city-note">${esc(c.franchise)}</div>
            </div>`).join('')}
        </div>
        <p class="ins-note">⚠️ Las primas varían cada año y son distintas por región de prima (la ciudad puede ser más barata que el suburbio). Usa <a href="https://www.priminfo.admin.ch/de/praemien" target="_blank">priminfo.admin.ch</a> para precios exactos.</p>
      </section>

      <!-- Conceptos clave -->
      <section class="ins-section">
        <h3 class="ins-section-title">📚 Conceptos clave</h3>
        <div class="ins-concepts">
          ${d.concepts.map(c => `
            <div class="ins-concept-card">
              <div class="ins-concept-header">
                <span class="ins-concept-icon">${c.icon}</span>
                <div>
                  <div class="ins-concept-term">${esc(c.term)}</div>
                  <div class="ins-concept-sub">${esc(c.sub)}</div>
                </div>
              </div>
              <div class="ins-concept-desc">${c.desc}</div>
            </div>`).join('')}
        </div>
      </section>

      <!-- Aseguradoras -->
      <section class="ins-section">
        <h3 class="ins-section-title">🏢 Aseguradoras principales</h3>
        <div class="ins-insurers-grid">
          ${d.insurers.map(ins => `
            <a class="ins-insurer-card" href="${esc(ins.web)}" target="_blank" rel="noopener">
              <div class="ins-insurer-top">
                <div class="ins-insurer-name" style="color:${ins.color}">${esc(ins.name)}</div>
                <span class="ins-insurer-price">${esc(ins.price)}</span>
              </div>
              <div class="ins-insurer-note">${esc(ins.note)}</div>
            </a>`).join('')}
        </div>
      </section>

      <div class="ins-footer">
        <p>Las primas se actualizan cada año (1 de enero). Puedes cambiar de aseguradora <strong>dos veces al año</strong>: antes del <strong>30 de noviembre</strong> (efectivo el 1 de enero) o antes del <strong>30 de junio</strong> (efectivo el 1 de julio). Hay que avisar con carta certificada (Einschreiben).</p>
        <a class="ins-priminfo-btn" href="https://www.priminfo.admin.ch/de/praemien" target="_blank" rel="noopener">🏛️ Calcular tu prima en priminfo.admin.ch →</a>
      </div>
    </div>
  `;
}

/* ─── Init ──────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initZoneChips();
  initJobExpansion();
  initHousingChips();
  updateFavCount();
  updateTrackerBadge();
  initPublicUrl();
  updateCvSettingsBtn();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.id === 'jobInput') startSearch();
});

/* Shake animation + inline overrides */
const sty = document.createElement('style');
sty.textContent = `
  @keyframes shake {
    0%,100%{ transform:translateX(0) } 20%{ transform:translateX(-8px) }
    40%{ transform:translateX(8px) }   60%{ transform:translateX(-5px) }
    80%{ transform:translateX(5px) }
  }
  .job-term-tag {
    font-size:.75rem; color:#6b7280; margin-top:3px;
    display:flex; align-items:center; gap:4px;
  }
  .wa-btn { color:#25d366 !important; border-color:#bbf7d0 !important; }
  .wa-btn:hover { background:#f0fdf4 !important; border-color:#25d366 !important; }

  /* ── Insurance tab ──────────────────────────────────────────────── */
  .insurance-wrap { max-width:860px; margin:0 auto; padding:16px 12px 40px; }
  .insurance-header { margin-bottom:24px; }
  .insurance-title { font-size:1.4rem; font-weight:700; color:#111827; margin:0 0 4px; }
  .insurance-subtitle { color:#6b7280; margin:0; font-size:.95rem; }
  .ins-alert { display:flex; gap:14px; align-items:flex-start; background:#fef3c7; border:1.5px solid #fcd34d; border-radius:10px; padding:14px 16px; margin-bottom:24px; font-size:.93rem; line-height:1.55; }
  .ins-alert-icon { font-size:1.5rem; flex-shrink:0; margin-top:1px; }
  .ins-section { margin-bottom:30px; }
  .ins-section-title { font-size:1.05rem; font-weight:700; color:#1e293b; margin:0 0 14px; }
  .ins-steps { display:flex; flex-direction:column; gap:12px; }
  .ins-step { display:flex; gap:14px; align-items:flex-start; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px 16px; }
  .ins-step-num { width:28px; height:28px; border-radius:50%; background:#1e40af; color:#fff; font-weight:700; font-size:.9rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ins-step-title { font-weight:600; font-size:.95rem; margin-bottom:4px; color:#1e293b; }
  .ins-step-desc { font-size:.88rem; color:#475569; line-height:1.55; }
  .ins-step-desc a { color:#1d4ed8; }
  .ins-comparators { display:flex; flex-direction:column; gap:10px; }
  .ins-comparator-card { display:flex; align-items:center; gap:14px; background:#eff6ff; border:1.5px solid #93c5fd; border-radius:10px; padding:14px 16px; text-decoration:none; color:inherit; transition:box-shadow .15s; }
  .ins-comparator-card:hover { box-shadow:0 2px 10px rgba(37,99,235,.18); }
  .ins-comp-icon { font-size:1.4rem; flex-shrink:0; }
  .ins-comp-name { font-weight:700; font-size:.95rem; color:#1e40af; }
  .ins-comp-desc { font-size:.83rem; color:#475569; }
  .ins-comp-arrow { margin-left:auto; font-size:1.2rem; color:#93c5fd; flex-shrink:0; }
  .ins-franchise-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:10px; }
  @media(max-width:540px){ .ins-franchise-grid { grid-template-columns:repeat(2,1fr); } }
  .ins-franchise-card { background:#f0fdf4; border:1.5px solid #86efac; border-radius:10px; padding:12px; text-align:center; }
  .ins-franchise--max { background:#fef2f2; border-color:#fca5a5; }
  .ins-franchise--min { background:#ecfdf5; border-color:#6ee7b7; }
  .ins-franchise-chf { font-size:1.15rem; font-weight:700; color:#065f46; }
  .ins-franchise-saving { font-size:.82rem; color:#16a34a; font-weight:600; margin-top:2px; }
  .ins-franchise-note { font-size:.78rem; color:#6b7280; margin-top:4px; }
  .ins-franchise-tip { font-size:.87rem; color:#374151; background:#fefce8; border:1px solid #fde047; border-radius:8px; padding:10px 14px; margin-top:4px; }
  .ins-city-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
  @media(max-width:540px){ .ins-city-grid { grid-template-columns:1fr; } }
  .ins-city-card { background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px 14px; }
  .ins-city-name { font-size:.85rem; color:#64748b; margin-bottom:2px; }
  .ins-city-range { font-size:1rem; font-weight:700; color:#1e293b; }
  .ins-city-note { font-size:.75rem; color:#94a3b8; margin-top:3px; }
  .ins-note { font-size:.83rem; color:#64748b; margin-top:8px; }
  .ins-note a { color:#1d4ed8; }
  .ins-concepts { display:flex; flex-direction:column; gap:10px; }
  .ins-concept-card { background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px 16px; }
  .ins-concept-header { display:flex; gap:12px; align-items:flex-start; margin-bottom:8px; }
  .ins-concept-icon { font-size:1.3rem; flex-shrink:0; }
  .ins-concept-term { font-weight:700; color:#1e293b; font-size:.97rem; }
  .ins-concept-sub { font-size:.82rem; color:#64748b; }
  .ins-concept-desc { font-size:.87rem; color:#374151; line-height:1.6; padding-left:42px; }
  .ins-insurers-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
  @media(max-width:540px){ .ins-insurers-grid { grid-template-columns:1fr; } }
  .ins-insurer-card { background:#fff; border:1.5px solid #e5e7eb; border-radius:10px; padding:12px 14px; text-decoration:none; color:inherit; transition:box-shadow .15s; display:block; }
  .ins-insurer-card:hover { box-shadow:0 2px 8px rgba(0,0,0,.1); }
  .ins-insurer-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; }
  .ins-insurer-name { font-weight:700; font-size:.97rem; }
  .ins-insurer-price { font-size:.78rem; background:#f0f9ff; color:#0369a1; border:1px solid #bae6fd; border-radius:12px; padding:2px 8px; white-space:nowrap; }
  .ins-insurer-note { font-size:.82rem; color:#6b7280; }
  .ins-footer { background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px 18px; font-size:.87rem; color:#475569; line-height:1.6; }
  .ins-footer p { margin:0 0 12px; }
  .ins-priminfo-btn { display:inline-block; background:#1e40af; color:#fff; border-radius:8px; padding:10px 18px; font-size:.9rem; font-weight:600; text-decoration:none; }
  .ins-priminfo-btn:hover { background:#1d4ed8; }

  .hlc-agency-badge { font-size:.78rem; background:#eff6ff; color:#1e40af; border:1px solid #93c5fd; border-radius:10px; padding:2px 8px; display:inline-block; margin:4px 0 2px; }
  .hlc-private-badge { font-size:.78rem; background:#f0fdf4; color:#166534; border:1px solid #86efac; border-radius:10px; padding:2px 8px; display:inline-block; margin:4px 0 2px; }
  .hlc-address { font-size:.82rem; color:#475569; margin-top:4px; }
  .hlc-address a { color:#1d4ed8; text-decoration:none; }
  .hlc-address a:hover { text-decoration:underline; }
  .hlc-desc-toggle { background:none; border:none; color:#1d4ed8; cursor:pointer; font-size:.83rem; padding:2px 0; margin-top:2px; display:block; }
  .hlc-contact--found { border:1.5px solid #86efac; border-radius:8px; padding:10px 12px; background:#f0fdf4; margin-top:10px; }
  .hlc-contact-header { font-weight:600; color:#166534; font-size:.87rem; margin-bottom:8px; }
  .hlc-inquiry-btn { display:inline-block; background:#059669; color:#fff !important; border-radius:7px; padding:8px 14px; font-size:.85rem; font-weight:600; text-decoration:none; margin-bottom:6px; }
  .hlc-inquiry-btn:hover { background:#047857; }
  .field-checkbox { align-items:center; }
  .checkbox-label { display:flex; align-items:center; gap:8px; cursor:pointer; font-size:.9rem; font-weight:500; color:#374151; }
  .checkbox-label input[type=checkbox] { width:18px; height:18px; cursor:pointer; accent-color:#1e40af; }
`;
document.head.appendChild(sty);
