// Grainy blob field (WebGL) + section navigation state.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- navigation ---------- */
const bar = document.querySelector('.top');
const dots = [...document.querySelectorAll('.dots a')];
const sections = dots.map(a => document.querySelector(a.getAttribute('href')));

const navObserver = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    dots.forEach(d => d.setAttribute('aria-current', String(d.getAttribute('href') === '#' + e.target.id)));
  }
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(s => navObserver.observe(s));

// Header takes the background of whatever section sits under it.
const boxes = [...document.querySelectorAll('main > section, footer')];
const onScroll = () => {
  const y = bar.offsetHeight / 2;
  const under = boxes.find(b => { const r = b.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
  const bg = under ? getComputedStyle(under).backgroundColor : 'rgba(0, 0, 0, 0)';
  bar.style.backgroundColor = bg;
  bar.classList.toggle('solid', bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent');
};
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

/* ---------- language ---------- */
// English lives in the HTML; this holds Italian. Originals are captured once so switching back is lossless.
const IT = {
  title: 'Nicola Antonio Buzzo · AI Engineer',
  home: 'Home',
  'nav.intro': 'Intro', 'nav.work': 'Progetti', 'nav.career': 'Carriera', 'nav.credentials': 'Competenze', 'nav.contact': 'Contatti',
  'hero.title': 'Costruisco AI che legge codice legacy.',
  'hero.where': 'Indra / Minsait, Napoli',
  'cta.email': 'Scrivimi', 'cta.cv': 'Scarica CV',
  'work.title': 'Progetti scelti',
  'doc.meta': 'INAIL · Indra / Minsait · 07/2025 a oggi',
  'doc.lede': "Gli dai un codebase legacy e ti restituisce l'analisi tecnica che nessuno aveva il tempo di scrivere.",
  'doc.result': '<strong>50+</strong> progetti INAIL privati in produzione analizzati. Mesi di analisi manuale risparmiati.',
  'doc.body': "Il sistema recupera i sorgenti direttamente da GitLab, mette in coda i job di analisi ed esegue pipeline LangChain sull'API OpenAI per produrre analisi tecniche. Si integra con CAST per generare report sui collegamenti tra i moduli di ogni progetto.",
  'doc.fig': "I sorgenti GitLab passano da una coda di job ai worker di analisi LangChain, insieme ai report CAST sui moduli, e diventano analisi tecniche.",
  'doc.n1': 'Sorgenti GitLab', 'doc.n2': 'Coda job', 'doc.n3': 'Analisi LLM', 'doc.n4': 'Analisi tecnica', 'doc.n5': '+ report sui moduli',
  'magid.meta': 'R&amp;D interno · Indra / Minsait · 11/2023 – 03/2025',
  'magid.lede': 'Il sistema R&amp;D da cui è nato Docmanagement: AI che scrive e revisiona documentazione per grandi codebase.',
  'magid.body': "L'ho progettato e sviluppato per automatizzare tre attività sui codebase interni dell'azienda: generare analisi tecniche, produrre suite di test case assistite e revisionare la documentazione funzionale dal punto di vista semantico e strutturale.",
  'magid.fig': 'Un codebase alimenta catene LangChain che producono tre output: analisi tecniche, suite di test case e revisione della documentazione.',
  'magid.n1': 'Codebase esteso', 'magid.n2': 'Catene LLM',
  'magid.o1a': 'Analisi', 'magid.o1b': 'tecniche', 'magid.o2b': 'case', 'magid.o3a': 'Revisione', 'magid.o3b': 'doc',
  'career.title': 'Carriera',
  'career.intro': 'Metà ingegnere, metà analista funzionale. Raccolgo i requisiti con clienti internazionali in inglese, scrivo le specifiche funzionali e poi costruisco la soluzione.',
  'career.d1': '03/2025 a oggi', 'career.d2': '05/2022 – 11/2023', 'career.d3': '03/2022 – 05/2022',
  'career.bacups': 'Migrazione in cloud della suite HR di Eni. Analisi funzionale e documentazione FUD con il cliente internazionale, supporto AMS, correttive in Angular e aggiornamenti di progetto presentati al cliente in inglese.',
  'career.eniba': 'Suite HR per le consociate multi-country di Eni: assenze, trasferte, rimborsi spese e formazione, per dipendenti e HR. ASP.NET Web Forms, C#, SQL Server.',
  'career.almaviva': 'Normalizzazione dei dati dei centri ACER della Campania; progettazione di stored procedure SQL Server.',
  'career.note': 'Software Engineer &amp; Functional Analyst in Indra / Minsait dal 05/2022, su tutti i progetti qui sopra e su MAGID / Docmanagement.',
  'cred.title': 'Competenze',
  'cred.agentic': 'Sviluppo agentico',
  'cred.agenticDd': 'Orchestrazione AI con Claude Code e GitHub Copilot: gestione di agenti, skills, spec-driven development (SDD)',
  'cred.lang': 'Linguaggi', 'cred.langDd': 'Python, C#, SQL. Basi di JavaScript.',
  'cred.infra': 'Infrastruttura', 'cred.data': 'Dati',
  'cred.spoken': 'Lingue', 'cred.spokenDd': 'Italiano (madrelingua), inglese (professionale), francese (base)',
  'cred.edu': 'Formazione', 'cred.eduDd': 'Informatica, Università degli Studi di Salerno, 2017–2021 (117 CFU su 180, percorso sospeso)',
  'contact.title': 'Parliamone.',
};
const textEls = [...document.querySelectorAll('[data-i18n]')];
const ariaEls = [...document.querySelectorAll('[data-i18n-aria]')];
textEls.forEach(el => el.dataset.en = el.innerHTML);
ariaEls.forEach(el => el.dataset.enAria = el.getAttribute('aria-label'));
const langBtns = [...document.querySelectorAll('.lang button')];

function setLang(lang) {
  const it = lang === 'it';
  document.documentElement.lang = lang;
  textEls.forEach(el => { el.innerHTML = it ? IT[el.dataset.i18n] ?? el.dataset.en : el.dataset.en; });
  ariaEls.forEach(el => el.setAttribute('aria-label', it ? IT[el.dataset.i18nAria] ?? el.dataset.enAria : el.dataset.enAria));
  langBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  try { localStorage.setItem('lang', lang); } catch {}
}
langBtns.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

let saved = null;
try { saved = localStorage.getItem('lang'); } catch {}
const urlLang = new URLSearchParams(location.search).get('lang');
setLang(urlLang === 'it' || urlLang === 'en' ? urlLang : saved || (navigator.language.startsWith('it') ? 'it' : 'en'));

/* ---------- blob field ---------- */
const canvas = document.getElementById('field');
const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
const int N = 13;
const vec3 SLATE = vec3(0.184, 0.267, 0.329);
const vec3 ROSE  = vec3(0.855, 0.482, 0.576);
const vec3 TEAL  = vec3(0.369, 0.710, 0.690);
const vec3 WINE  = vec3(0.180, 0.082, 0.106);
const vec3 PINE  = vec3(0.110, 0.200, 0.204);

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

vec4 ball(int i, float aspect) {
  float f = float(i);
  float a = hash(vec2(f, 1.7)), b = hash(vec2(f, 9.1)), c = hash(vec2(f, 4.3));
  // spread across the screen, biased to the right so the headline sits on calmer ground
  vec2 base = vec2(mix(-0.15, 1.0, a) * aspect, mix(-0.95, 0.95, b));
  float t = uTime * (0.05 + 0.05 * c);
  vec2 p = base + 0.22 * vec2(sin(t + f * 2.1), cos(t * 1.3 + f));
  vec2 toM = uMouse - p;
  p += toM * 0.10 * exp(-dot(toM, toM) * 1.5);
  float r = mix(0.10, 0.30, hash(vec2(f, 2.9)));
  return vec4(p, sin(t * 0.7 + f) * 0.3, r);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 q, float aspect, out float roseW) {
  float d = 10.0; float wr = 0.0; float wt = 0.0;
  for (int i = 0; i < N; i++) {
    vec4 b = ball(i, aspect);
    float di = length(q - b.xyz) - b.w;
    d = smin(d, di, 0.12);
    float w = exp(-24.0 * max(di, 0.0));
    if (mod(float(i), 2.0) < 1.0) wr += w; else wt += w;
  }
  roseW = wr / max(wr + wt, 1e-4);
  return d;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 uv = (gl_FragCoord.xy / uRes) * 2.0 - 1.0;
  uv.x *= aspect;
  vec3 ro = vec3(uv, 2.0), rd = vec3(0.0, 0.0, -1.0);
  float t = 0.0, w = 0.0; bool hit = false;
  for (int s = 0; s < 40; s++) {
    float d = map(ro + rd * t, aspect, w);
    if (d < 0.002) { hit = true; break; }
    t += d;
    if (t > 4.0) break;
  }
  float g = hash(gl_FragCoord.xy);
  if (!hit) { gl_FragColor = vec4(SLATE + (g - 0.5) * 0.025, 1.0); return; }

  vec3 p = ro + rd * t; float tmp;
  vec2 e = vec2(0.003, 0.0);
  vec3 n = normalize(vec3(
    map(p + e.xyy, aspect, tmp) - map(p - e.xyy, aspect, tmp),
    map(p + e.yxy, aspect, tmp) - map(p - e.yxy, aspect, tmp),
    map(p + e.yyx, aspect, tmp) - map(p - e.yyx, aspect, tmp)));
  float roseW;
  map(p, aspect, roseW);

  vec3 L = normalize(vec3(-0.6, 0.55, 0.6));
  float lum = clamp(dot(n, L), 0.0, 1.0);
  lum = lum * 0.95 + pow(1.0 - n.z, 3.0) * 0.25;   // rim catches light like the sprayed edges
  vec3 lit = mix(TEAL, ROSE, smoothstep(0.35, 0.65, roseW));
  vec3 dark = mix(PINE, WINE, smoothstep(0.35, 0.65, roseW)) * 0.55;
  // stipple: luminance decides the probability a grain is lit
  float k = smoothstep(0.0, 1.0, lum + (g - 0.5) * 0.7);
  vec3 col = mix(dark, lit, k);
  col += step(0.965, g) * lum * 0.18;
  gl_FragColor = vec4(col, 1.0);
}`;

const VERT = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }';

function startField() {
  if (!gl) return;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return; // CSS slate background stays
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uMouse = gl.getUniformLocation(prog, 'uMouse');

  // ponytail: fixed 0.6 render scale; drop to 0.45 if low-end phones stutter.
  const SCALE = 0.6;
  const resize = () => {
    canvas.width = Math.round(innerWidth * SCALE);
    canvas.height = Math.round(innerHeight * SCALE);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  };

  const mouse = { x: 9, y: 9, tx: 9, ty: 9 };
  addEventListener('pointermove', e => {
    const a = innerWidth / innerHeight;
    mouse.tx = (e.clientX / innerWidth * 2 - 1) * a;
    mouse.ty = -(e.clientY / innerHeight * 2 - 1);
  }, { passive: true });

  let visible = true, raf = 0;
  const t0 = performance.now();
  const frame = now => {
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    gl.uniform1f(uTime, (now - t0) / 1000 + 20);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = visible && !reduceMotion ? requestAnimationFrame(frame) : 0;
  };
  const draw = () => { if (!raf) raf = requestAnimationFrame(frame); };

  resize();
  addEventListener('resize', () => { resize(); draw(); });
  draw();

  // render only while the field is actually showing (hero or contact on screen)
  const shown = new Set();
  const fieldObserver = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting ? shown.add(e.target) : shown.delete(e.target));
    visible = shown.size > 0;
    if (visible) draw();
  });
  ['.hero', '.contact'].forEach(sel => fieldObserver.observe(document.querySelector(sel)));
}

startField();
