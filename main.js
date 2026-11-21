// Blob field (WebGL, smooth shading) + section navigation state.

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
  const own = under ? getComputedStyle(under).backgroundColor : 'rgba(0, 0, 0, 0)';
  const clear = own === 'rgba(0, 0, 0, 0)' || own === 'transparent';
  // over the blob field: transparent at the very top, frosted slate once scrolling starts
  const glass = clear && scrollY > 8;
  bar.style.backgroundColor = glass ? 'rgba(47, 68, 84, 0.72)' : own;
  bar.classList.toggle('glass', glass);
  bar.classList.toggle('solid', !clear || glass);
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
  document.querySelectorAll('a[href^="cv/"]').forEach(a => { a.href = `cv/Nicola-Antonio-Buzzo-CV-${it ? 'IT' : 'EN'}.pdf`; });
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
const vec3 ROSE  = vec3(0.878, 0.478, 0.584);       // #E07A95, lit side
const vec3 TEAL  = vec3(0.310, 0.702, 0.663);       // #4FB3A9, lit side
const vec3 WINE_DEEP = vec3(0.290, 0.100, 0.230);   // rose shadow: bordeaux into violet, never black
const vec3 PINE_DEEP = vec3(0.070, 0.220, 0.270);   // teal shadow: deep blue-green
const float GRAIN = 0.0;                            // film grain strength; 0 = off (the user chose smooth)

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// last step for every pixel: optional grain on the native pixel grid, strongest in the midtones; GRAIN = 0 adds nothing
vec3 finish(vec3 c) {
  float mid = 1.0 - abs(dot(c, vec3(0.333)) * 2.0 - 1.0);
  return c + (hash(gl_FragCoord.xy) - 0.5) * GRAIN * mid;
}

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
  float pix = 2.0 / uRes.y;                 // one device pixel, in world units
  // background: a faint lift behind the spheres, so the field has atmosphere without changing the slate
  vec2 hc = uv - vec2(0.35 * aspect, 0.0);
  vec3 bg = SLATE + vec3(0.016, 0.024, 0.028) * exp(-1.2 * dot(hc, hc));
  vec3 ro = vec3(uv, 2.0), rd = vec3(0.0, 0.0, -1.0);
  float t = 0.0, w = 0.0, minD = 10.0; bool hit = false;
  for (int s = 0; s < 40; s++) {
    float d = map(ro + rd * t, aspect, w);
    minD = min(minD, d);
    if (d < 0.002) { hit = true; break; }
    t += d;
    if (t > 4.0) break;
  }
  // antialiased silhouette: a one-pixel ramp from the closest approach along the ray
  float cover = hit ? 1.0 : clamp(1.0 - minD / pix, 0.0, 1.0);
  if (cover <= 0.0) { gl_FragColor = vec4(finish(bg), 1.0); return; }

  vec3 p = ro + rd * t; float tmp;
  vec2 e = vec2(0.003, 0.0);
  vec3 n = normalize(vec3(
    map(p + e.xyy, aspect, tmp) - map(p - e.xyy, aspect, tmp),
    map(p + e.yxy, aspect, tmp) - map(p - e.yxy, aspect, tmp),
    map(p + e.yyx, aspect, tmp) - map(p - e.yyx, aspect, tmp)));
  float roseW;
  map(p, aspect, roseW);

  // wrapped diffuse: light spills past the terminator, so the falloff is softer
  vec3 L = normalize(vec3(-0.6, 0.55, 0.6));
  const float WRAP = 0.35;
  float diff = clamp((dot(n, L) + WRAP) / (1.0 + WRAP), 0.0, 1.0);
  float rim = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.5);
  vec3 lit  = mix(TEAL, ROSE, smoothstep(0.35, 0.65, roseW));
  // coloured shadow: the shade shifts hue (rose to bordeaux, teal to blue-green) instead of darkening
  vec3 dark = mix(PINE_DEEP, WINE_DEEP, smoothstep(0.35, 0.65, roseW));
  // highlights stay below pure pastel so the ink headline keeps contrast over the spheres
  vec3 col = mix(dark, lit, smoothstep(0.0, 1.0, diff * 0.85 + 0.05)) * 0.84;

  // ambient occlusion: darken where the surface is close to another sphere (merged joints, overlaps)
  float occ = 0.0, sc = 1.0;
  for (int i = 1; i <= 3; i++) {
    float h = 0.035 * float(i);
    occ += (h - map(p + n * h, aspect, tmp)) * sc;
    sc *= 0.7;
  }
  col *= mix(0.72, 1.0, clamp(1.0 - 2.2 * occ, 0.0, 1.0));

  // specular: a broad, low-intensity sheen, not a glossy dot
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float spec = pow(max(dot(n, H), 0.0), 8.0) * 0.07;

  // soft rim light on the side away from the key: a pale slate-blue tone, low intensity
  col += vec3(0.62, 0.76, 0.84) * rim * 0.16;
  col += vec3(0.95, 0.90, 0.92) * spec;

  // depth: spheres further from the viewer lose some colour and sink toward the background; near ones stay vivid
  float far = 1.0 - smoothstep(-0.4, 0.4, p.z);
  col = mix(col, vec3(dot(col, vec3(0.333))), far * 0.22);
  col = mix(col, SLATE, far * 0.16);

  gl_FragColor = vec4(finish(mix(bg, col, cover)), 1.0);
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

  // Render at device pixels (dpr capped at 2). Quality q starts at full and only steps down while frames run slow.
  let q = 1;
  const resize = () => {
    const k = Math.min(devicePixelRatio || 1, 2) * q;
    const w = Math.round(canvas.clientWidth * k), h = Math.round(canvas.clientHeight * k);
    if (w === canvas.width && h === canvas.height) return false; // URL-bar scroll: nothing to do
    canvas.width = w; canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
    return true;
  };

  const mouse = { x: 9, y: 9, tx: 9, ty: 9 };
  addEventListener('pointermove', e => {
    const a = innerWidth / innerHeight;
    mouse.tx = (e.clientX / innerWidth * 2 - 1) * a;
    mouse.ty = -(e.clientY / innerHeight * 2 - 1);
  }, { passive: true });

  let visible = true, raf = 0, last = 0, sum = 0, frames = 0;
  const t0 = performance.now();
  const frame = now => {
    // every 30 frames: average slow (>24 ms) steps quality down; comfortably fast (<14 ms) steps it back up
    if (last) {
      sum += now - last; frames++;
      if (frames === 30) {
        const avg = sum / frames; sum = 0; frames = 0;
        if (avg > 24 && q > 0.5) { q = Math.max(0.5, q * 0.8); resize(); }
        else if (avg < 14 && q < 1) { q = Math.min(1, q * 1.15); resize(); }
      }
    }
    last = now;
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    gl.uniform1f(uTime, (now - t0) / 1000 + 20);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    // pause when the tab is hidden, the field is off screen, or the user prefers reduced motion
    raf = visible && !reduceMotion && !document.hidden ? requestAnimationFrame(frame) : 0;
    if (!raf) last = 0;
  };
  const draw = () => { if (!raf) raf = requestAnimationFrame(frame); };

  resize();
  addEventListener('resize', () => { if (resize()) draw(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible) draw(); });
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
