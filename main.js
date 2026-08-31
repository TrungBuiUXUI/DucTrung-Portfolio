/* Bùi Đức Trung® — Portfolio ’26
   GSAP choreography + Three.js particle-wave hero.
   Classic script (no type=module) so the page also works when opened
   directly from the filesystem (file://), where Chrome blocks local
   ES-module loads. Three.js is pulled in via dynamic import() below. */

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, Flip);

// `?motion=full` / `?motion=reduced` overrides the OS setting (useful for demos & testing)
const motionParam = new URLSearchParams(location.search).get("motion");
const reduced = motionParam === "full" ? false :
                motionParam === "reduced" ? true :
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none)").matches;
const isMobile = window.matchMedia("(max-width: 767px)").matches;

document.body.classList.add("js");

/* Read a design token so colours live only in styles.css */
const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* ============================================================
   i18n — every string comes from CONTENT in content.js.
   Nodes carrying ScrollTriggers or SplitText are updated in
   place rather than re-created, so animations survive a switch.
   ============================================================ */
const LANGS = ["en", "vi"];
let lang = (() => {
  try { const s = localStorage.getItem("lang"); if (LANGS.includes(s)) return s; } catch (e) {}
  return (navigator.language || "en").toLowerCase().startsWith("vi") ? "vi" : "en";
})();

/* Accepts a plain string (same in both languages) or { en, vi }. */
const t = (v) => (v && typeof v === "object" && !Array.isArray(v)) ? (v[lang] ?? v.en) : v;

function applyStatic() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t(CONTENT[el.dataset.i18n]);
    if (v == null) return;
    const attr = el.dataset.i18nAttr;
    if (attr) el.setAttribute(attr, v); else el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = t(CONTENT[el.dataset.i18nHtml]);
    if (v != null) el.innerHTML = v;
  });
}

/* Marquee + About lists carry no triggers on their children, so they
   can be rebuilt wholesale. */
function buildLoseNodes() {
  const items = t(CONTENT.marquee);
  const group = `<span class="marquee__group">${
    items.map((s) => `<span>${s}</span><i>\u2726</i>`).join("")}</span>`;
  document.getElementById("marqueeTrack").innerHTML = group + group;

  const fill = (id, key) => {
    document.getElementById(id).innerHTML = t(CONTENT[key]).map((s) => `<li>${s}</li>`).join("");
  };
  fill("aboutCol1", "aboutCol1");
  fill("aboutCol2", "aboutCol2");
}

/* Services rows own data-reveal="row" triggers — build once, then only
   ever swap their text. */
function buildServices() {
  document.getElementById("servicesList").innerHTML = t(CONTENT.services)
    .map((s, i) => `
      <li class="service" data-reveal="row">
        <span class="service__num">0${i + 1}</span>
        <h3 class="service__name"></h3>
        <p class="service__desc"></p>
      </li>`).join("");
}
function fillServices() {
  const rows = document.querySelectorAll("#servicesList .service");
  t(CONTENT.services).forEach((s, i) => {
    if (!rows[i]) return;
    rows[i].querySelector(".service__name").textContent = s.name;
    rows[i].querySelector(".service__desc").textContent = s.desc;
  });
}

function updateLangUI() {
  document.querySelectorAll("#langToggle .nav__lang-opt").forEach((o) => {
    o.classList.toggle("is-active", o.dataset.lang === lang);
  });
  document.documentElement.lang = lang;
}

function applyLang(next) {
  if (!LANGS.includes(next) || next === lang) return;
  lang = next;
  try { localStorage.setItem("lang", lang); } catch (e) {}

  teardownTextReveals();
  applyStatic();
  buildLoseNodes();
  fillServices();
  fillWorkGrid();
  buildTextReveals();
  updateLangUI();
  if (caseIsOpen) renderCase(PROJECTS[caseIndex]);
  ScrollTrigger.refresh();
}



/* ---------------- Build the work grid ---------------- */
const workGrid = document.getElementById("workGrid");

/* An <img> that deletes itself if the file is missing, leaving the gradient.
   `lazy` should stay true only for images that sit in the page's normal
   scroll flow. The case overlay has its own scroll container
   (.case__scroll) rather than the document's, so native loading="lazy"
   can misjudge distance-to-viewport there and stall forever — and since
   that markup is only built once the overlay is actually opened, the
   images are about to be seen anyway, so lazy-loading buys nothing. */
function imgTag(src, alt, lazy = true) {
  if (!src) return "";
  const loadingAttr = lazy ? ' loading="lazy"' : "";
  return `<img src="${src}" alt="${alt}"${loadingAttr} onerror="this.remove()">`;
}

/* Wraps a flat UI screenshot in a generic "browser chrome" frame (dark
   bezel + traffic-light bar) for projects whose images aren't already a
   3D device mockup. Set `frame: true` on a project in content.js to opt in. */
function frameWrap(innerHtml, framed) {
  if (!framed) return innerHtml;
  return `<div class="device-frame"><div class="device-frame__bar"><span></span><span></span><span></span></div><div class="device-frame__screen">${innerHtml}</div></div>`;
}

function buildWorkGrid() {
  workGrid.innerHTML = PROJECTS.map((p, i) => `
    <button type="button" class="project" data-project="${p.id}" aria-haspopup="dialog">
      <figure class="project__media">
        <div class="project__art tone-${p.tone}" data-speed="${i % 2 ? 0.94 : 0.92}">
          <span class="project__num">${p.num}</span>
          ${frameWrap(imgTag(p.cover, p.title, false), p.frame)}
        </div>
      </figure>
      <div class="project__info">
        <h3 class="project__title"></h3>
        <p class="project__desc"></p>
        <div class="project__tags"></div>
      </div>
    </button>`).join("");
}

function fillWorkGrid() {
  const cards = workGrid.querySelectorAll(".project");
  PROJECTS.forEach((p, i) => {
    const c = cards[i];
    if (!c) return;
    c.setAttribute("data-hover-label", t(CONTENT.viewCase));
    c.querySelector(".project__title").textContent = t(p.title);
    c.querySelector(".project__desc").textContent = t(p.blurb);
    c.querySelector(".project__tags").innerHTML = t(p.tags).map((x) => `<span>${x}</span>`).join("");
  });
}

/* Sizes a media box to its image's own ratio, so a cover never sits in a fixed
   frame with tone-* gradient showing above and below it. The CSS aspect-ratio
   stays as the fallback: a project whose cover file is missing keeps its box
   and shows the gradient placeholder instead. Framed images are skipped - the
   bezel owns the box in that case. */
function hugImage(img, box, refresh = true) {
  if (!img || !box || img.closest(".device-frame")) return;
  const apply = () => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    box.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
    if (refresh) ScrollTrigger.refresh();
  };
  if (img.complete) apply();
  else img.addEventListener("load", apply, { once: true });
}

function hugCovers() {
  workGrid.querySelectorAll(".project__media").forEach((box) => hugImage(box.querySelector("img"), box));
}

buildWorkGrid();
hugCovers();
buildServices();
applyStatic();
buildLoseNodes();
fillServices();
fillWorkGrid();
updateLangUI();

/* ---------------- Smooth scroll ---------------- */
let smoother = null;
if (!reduced && !isTouch) {
  smoother = ScrollSmoother.create({
    smooth: 1.1,
    effects: true,
    normalizeScroll: true,
  });
}

/* ---------------- Clock (GMT+7) ---------------- */
const clockEl = document.getElementById("clock");
function tickClock() {
  const now = new Date();
  const saigon = new Date(now.getTime() + (now.getTimezoneOffset() + 420) * 60000);
  clockEl.textContent =
    String(saigon.getHours()).padStart(2, "0") + ":" +
    String(saigon.getMinutes()).padStart(2, "0") + ":" +
    String(saigon.getSeconds()).padStart(2, "0") + " GMT+7";
}
tickClock();
setInterval(tickClock, 1000);

/* ---------------- Three.js particle wave ---------------- */
async function initThree() {
  const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js");
  const canvas = document.getElementById("webgl");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 2.4, 7.5);
  camera.lookAt(0, 0, 0);

  const seg = isMobile ? 90 : 150;
  const geo = new THREE.PlaneGeometry(26, 18, seg, Math.round(seg * 0.7));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#ffc08a") },
      uColorB: { value: new THREE.Color("#b92818") },
    },
    vertexShader: `
      uniform float uTime;
      varying float vH;
      varying float vDist;
      void main() {
        vec3 p = position;
        float t = uTime * 0.55;
        float wave =
          sin(p.x * 0.55 + t) * 0.45 +
          sin(p.y * 0.7 + t * 1.3) * 0.35 +
          sin((p.x + p.y) * 0.32 + t * 0.7) * 0.5;
        p.z += wave;
        vH = wave;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vDist = -mv.z;
        gl_PointSize = ${isMobile ? "2.6" : "2.2"} * (9.0 / vDist);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying float vH;
      varying float vDist;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.1, d) * 0.75;
        alpha *= smoothstep(16.0, 7.0, vDist);
        vec3 col = mix(uColorB, uColorA, smoothstep(-0.9, 1.1, vH));
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });

  const points = new THREE.Points(geo, mat);
  points.rotation.x = -Math.PI / 2.35;
  points.position.y = -1.4;
  scene.add(points);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  if (!isTouch) {
    window.addEventListener("pointermove", (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let visible = true;
  let running = true;

  function frame() {
    if (running && visible) {
      mat.uniforms.uTime.value = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      camera.position.x = mouse.x * 0.9;
      camera.position.y = 2.4 - mouse.y * 0.5;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  }
  frame();

  // Pause when the hero is off-screen or the tab is hidden
  ScrollTrigger.create({
    trigger: "#hero",
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => { visible = self.isActive; },
  });
  document.addEventListener("visibilitychange", () => {
    running = document.visibilityState === "visible";
  });

  if (reduced) {
    renderer.render(scene, camera);
    running = false;
  }
}
initThree().catch((err) => {
  console.warn("WebGL unavailable, skipping hero background.", err);
});

/* ---------------- Preloader + hero intro ---------------- */
const heroSplit1 = new SplitText("#heroLine1", { type: "chars" });
const heroSplit2 = new SplitText("#heroLine2", { type: "chars" });
gsap.set([...heroSplit1.chars, ...heroSplit2.chars], { yPercent: 115 });

const preCount = document.getElementById("preCount");
const counter = { v: 0 };

const intro = gsap.timeline({ paused: true });
intro
  .to(counter, {
    v: 100,
    duration: reduced ? 0.01 : 1.4,
    ease: "power2.inOut",
    onUpdate: () => (preCount.textContent = Math.round(counter.v)),
  })
  .to("#preloader", {
    yPercent: -100,
    duration: reduced ? 0.01 : 0.9,
    ease: "power4.inOut",
  }, "+=0.15")
  .set("#preloader", { display: "none" })
  .to("#webgl", { opacity: 1, duration: 1.6, ease: "power2.out" }, "<-0.3")
  .to(heroSplit1.chars, {
    yPercent: 0,
    duration: reduced ? 0.01 : 1,
    stagger: 0.035,
    ease: "power4.out",
  }, "<")
  .to(heroSplit2.chars, {
    yPercent: 0,
    duration: reduced ? 0.01 : 1,
    stagger: 0.03,
    ease: "power4.out",
  }, "<0.12")
  .to(".hero__topline [data-reveal], .hero__bottom [data-reveal]", {
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    onComplete: () => ScrollTrigger.refresh(),
  }, "<0.3");

window.addEventListener("load", () => {
  document.fonts.ready.then(() => intro.play());
});
// Fallback in case `load` already fired or hangs on a slow asset
setTimeout(() => { if (!intro.isActive() && intro.progress() === 0) intro.play(); }, 3500);

/* ---------------- Hero parallax out ---------------- */
if (!reduced) {
  gsap.to(".hero__frame", {
    yPercent: -12,
    opacity: 0.25,
    ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
  });
}

/* ---------------- Marquee ---------------- */
if (!reduced) {
  const track = document.getElementById("marqueeTrack");
  const tween = gsap.to(track, { xPercent: -50, ease: "none", duration: 22, repeat: -1 });
  ScrollTrigger.create({
    trigger: ".marquee",
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
  });
  // Subtle scroll-velocity influence
  let proxy = 0;
  ScrollTrigger.create({
    onUpdate: (self) => {
      const v = gsap.utils.clamp(-2, 2, self.getVelocity() / 900);
      if (Math.abs(v) > Math.abs(proxy)) {
        proxy = v;
        gsap.to(tween, {
          timeScale: 1 + proxy,
          duration: 0.4,
          onComplete: () => gsap.to(tween, { timeScale: 1, duration: 0.8 }),
        });
      }
    },
  });
}


/* ---------------- Rebuildable text reveals ----------------
   SplitText shreds an element into per-character spans, so a language
   switch has to revert the split, swap the text, then re-split. These
   two functions are the only place that happens. */
let textSplits = [];
let textTweens = [];

function buildTextReveals() {
  if (reduced) {
    document.querySelectorAll("[data-reveal='chars']").forEach((el) => (el.style.opacity = 1));
    const st = document.getElementById("aboutStatement");
    if (st) st.style.opacity = 1;
    return;
  }

  document.querySelectorAll("[data-reveal='chars']").forEach((el) => {
    const split = new SplitText(el, { type: "chars, lines", linesClass: "split-line" });
    textSplits.push(split);
    gsap.set(el, { opacity: 1 });
    textTweens.push(gsap.from(split.chars, {
      yPercent: 110, duration: 0.8, stagger: 0.02, ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    }));
    el.querySelectorAll(".split-line").forEach((l) => (l.style.overflow = "hidden"));
  });

  const aboutSplit = new SplitText("#aboutStatement", { type: "words", wordsClass: "word" });
  textSplits.push(aboutSplit);
  textTweens.push(gsap.to(aboutSplit.words, {
    opacity: 1, stagger: 0.06, ease: "none",
    scrollTrigger: { trigger: "#aboutStatement", start: "top 80%", end: "bottom 45%", scrub: 0.5 },
  }));
}

function teardownTextReveals() {
  textTweens.forEach((tw) => { if (tw.scrollTrigger) tw.scrollTrigger.kill(); tw.kill(); });
  textTweens = [];
  textSplits.forEach((s) => s.revert());
  textSplits = [];
}

/* ---------------- Generic reveals ---------------- */
if (!reduced) {
  document.querySelectorAll("[data-reveal='fade']").forEach((el) => {
    if (el.closest(".hero")) return; // hero handles its own intro
    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  buildTextReveals();

  document.querySelectorAll("[data-reveal='lines']").forEach((el) => {
    if (el.closest(".hero")) return;
    const split = new SplitText(el, { type: "lines" });
    gsap.set(el, { opacity: 1 });
    gsap.from(split.lines, {
      opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  document.querySelectorAll("[data-reveal='row']").forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // Project cards
  document.querySelectorAll(".project").forEach((card) => {
    gsap.fromTo(card, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: card, start: "top 88%" },
    });
  });


  // Contact CTA lines
  const cta1 = document.getElementById("ctaLine1");
  const cta2 = document.getElementById("ctaLine2");
  gsap.set([cta1, cta2], { yPercent: 110 });
  gsap.to([cta1, cta2], {
    yPercent: 0,
    duration: 1.1,
    stagger: 0.12,
    ease: "power4.out",
    scrollTrigger: { trigger: ".contact__cta", start: "top 85%" },
  });
} else {
  buildTextReveals();
}

/* ---------------- Nav links / anchors ---------------- */
function scrollToTarget(target) {
  if (smoother) smoother.scrollTo(target, true, "top top");
  else gsap.to(window, { scrollTo: { y: target }, duration: reduced ? 0 : 1, ease: "power3.inOut" });
}
document.querySelectorAll("a[href^='#']").forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (menuOpen) toggleMenu(false, () => scrollToTarget(target));
    else scrollToTarget(target);
  });
});
document.getElementById("toTop").addEventListener("click", () => scrollToTarget("#top"));

/* ---------------- Fullscreen menu ---------------- */
const menuEl = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");
let menuOpen = false;

gsap.set(".menu__bg", { yPercent: -101 });
const menuTl = gsap.timeline({ paused: true });
menuTl
  .set(menuEl, { visibility: "visible" })
  .to(".menu__bg", { yPercent: 0, duration: 0.6, ease: "power4.inOut" })
  .fromTo(".menu__link", { yPercent: 60, opacity: 0 }, {
    yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out",
  }, "-=0.2")
  .fromTo(".menu__footer", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.3");

function toggleMenu(open, onDone) {
  menuOpen = open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuEl.setAttribute("aria-hidden", String(!open));
  document.getElementById("nav").classList.toggle("nav--menu-open", open);
  const lines = menuToggle.querySelectorAll(".nav__burger-line");
  if (open) {
    menuTl.timeScale(1).play();
    gsap.to(lines[0], { rotate: 45, y: 4, background: cssVar("--on-accent"), duration: 0.3 });
    gsap.to(lines[1], { rotate: -45, y: -4, background: cssVar("--on-accent"), duration: 0.3 });
    if (smoother) smoother.paused(true);
  } else {
    menuTl.timeScale(1.4).reverse().eventCallback("onReverseComplete", () => {
      gsap.set(menuEl, { visibility: "hidden" });
      if (onDone) onDone();
      menuTl.eventCallback("onReverseComplete", null);
    });
    gsap.to(lines, { rotate: 0, y: 0, background: cssVar("--ink"), duration: 0.3 });
    if (smoother) smoother.paused(false);
  }
}
menuToggle.addEventListener("click", () => toggleMenu(!menuOpen));
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuOpen) toggleMenu(false);
});

/* ---------------- Case study overlay ---------------- */
const caseEl = document.getElementById("case");
const caseScroll = document.getElementById("caseScroll");
const caseHero = document.getElementById("caseHero");
const caseNextBtn = document.getElementById("caseNext");
let caseIsOpen = false;
let caseIndex = -1;
let caseOpener = null; // the card that launched it, so focus can return there

function lockPage(on) {
  document.documentElement.classList.toggle("is-locked", on);
  if (smoother) smoother.paused(on);
  else document.documentElement.style.overflow = on ? "hidden" : "";
}

function renderCase(p) {
  document.getElementById("caseNum").textContent = p.num;
  document.getElementById("caseTitle").textContent = t(p.title);
  document.getElementById("caseDesc").textContent = t(p.desc);

  caseHero.innerHTML = `<div class="case__fill tone-${p.tone}">${frameWrap(imgTag(p.cover, t(p.title), false), p.frame)}</div>`;
  caseHero.style.aspectRatio = "";
  hugImage(caseHero.querySelector("img"), caseHero, false);

  document.getElementById("caseMeta").innerHTML = Object.entries(p.meta)
    .map(([k, v]) => `<div><dt>${t(CONTENT.metaLabels[k]) || k}</dt><dd>${t(v)}</dd></div>`)
    .join("");

  // Optional blocks - hidden outright when a project omits them.
  const links = document.getElementById("caseLinks");
  const hasLinks = !!(p.links && p.links.length);
  links.innerHTML = hasLinks
    ? p.links.map((l) => `<a class="case__link" href="${l.href}" target="_blank" rel="noopener">${t(l.label)}<span aria-hidden="true">\u2197</span></a>`).join("")
    : "";
  links.hidden = !hasLinks;

  const outcome = document.getElementById("caseOutcome");
  const items = t(p.outcome) || [];
  const hasOutcome = items.length > 0;
  outcome.innerHTML = hasOutcome
    ? `<h3 class="case__outcome-title">${t(CONTENT.caseOutcomeTitle)}</h3><ul class="case__outcome-list">${items.map((o) => `<li>${o}</li>`).join("")}</ul>`
    : "";
  outcome.hidden = !hasOutcome;

  document.getElementById("caseGallery").innerHTML = p.gallery
    .map((g) => `
      <figure class="case__shot tone-${p.tone}${g.wide ? " case__shot--wide" : ""}">
        ${frameWrap(imgTag(g.src, `${t(p.title)} \u2014 ${t(g.caption)}`, false), g.frame ?? p.frame)}
        <figcaption>${t(g.caption)}</figcaption>
      </figure>`)
    .join("");

  const next = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length];
  document.getElementById("caseNextTitle").textContent = t(next.title);
  caseNextBtn.dataset.next = next.id;
}

function openCase(id, opener) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p || caseIsOpen) return;
  caseIsOpen = true;
  caseIndex = PROJECTS.indexOf(p);
  caseOpener = opener;

  renderCase(p);
  caseEl.classList.add("is-open");
  caseEl.setAttribute("aria-hidden", "false");
  caseScroll.scrollTop = 0;
  lockPage(true);

  const content = caseEl.querySelectorAll(".case__head, .case__body, .case__gallery, .case__outcome, .case__next");

  if (reduced) {
    gsap.set(caseEl, { opacity: 1 });
    gsap.set([caseHero, ...content], { opacity: 1, y: 0 });
    // Deferred so the click's own default focus handling, which runs after
    // this listener, cannot steal focus back. setTimeout rather than rAF so
    // it still fires when the page is opened in a background tab.
    void caseEl.offsetHeight; // flush styles — focus() is rejected while hidden
    setTimeout(() => document.getElementById("caseClose").focus(), 0);
    return;
  }

  // Fly the card artwork up into the hero slot.
  const cardMedia = opener.querySelector(".project__media");
  const r = cardMedia.getBoundingClientRect();
  const clone = cardMedia.cloneNode(true);
  clone.classList.add("flip-clone");
  gsap.set(clone, { position: "fixed", left: r.left, top: r.top, width: r.width, height: r.height });
  document.body.appendChild(clone);

  gsap.set(caseHero, { opacity: 0 });
  gsap.set(content, { opacity: 0, y: 28 });

  gsap.timeline()
    .to(caseEl, { opacity: 1, duration: 0.35, ease: "power2.out" })
    .add(
      Flip.fit(clone, caseHero, {
        duration: 0.85,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(caseHero, { opacity: 1 });
          clone.remove();
        },
      }),
      0.05
    )
    .to(content, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" }, 0.45)
    .add(() => document.getElementById("caseClose").focus());
}

function closeCase() {
  if (!caseIsOpen) return;
  caseIsOpen = false;
  caseEl.setAttribute("aria-hidden", "true");

  const finish = () => {
    caseEl.classList.remove("is-open");
    gsap.set(caseEl, { opacity: 0 });
    gsap.set(caseHero, { opacity: 1 }); // leave it ready for the next open
    lockPage(false);
    if (caseOpener) caseOpener.focus();
    caseOpener = null;
  };

  if (reduced) return finish();

  // Fly back to whichever card is now showing this project.
  const opener = caseOpener;
  const cardMedia = opener && opener.querySelector(".project__media");
  const heroRect = caseHero.getBoundingClientRect();
  const content = caseEl.querySelectorAll(".case__head, .case__body, .case__gallery, .case__outcome, .case__next");
  const tl = gsap.timeline({ onComplete: finish });

  tl.to(content, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });

  if (cardMedia && heroRect.height > 0) {
    const clone = caseHero.firstElementChild.cloneNode(true);
    const wrap = document.createElement("figure");
    wrap.className = "project__media flip-clone";
    wrap.appendChild(clone);
    gsap.set(wrap, {
      position: "fixed",
      left: heroRect.left, top: heroRect.top,
      width: heroRect.width, height: heroRect.height,
    });
    document.body.appendChild(wrap);
    gsap.set(caseHero, { opacity: 0 });

    tl.add(
      Flip.fit(wrap, cardMedia, {
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => wrap.remove(),
      }),
      0.1
    ).to(caseEl, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.25");
  } else {
    tl.to(caseEl, { opacity: 0, duration: 0.4, ease: "power2.in" });
  }
}

/* Swap to the next project without leaving the overlay */
function gotoCase(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  caseIndex = PROJECTS.indexOf(p);
  caseOpener = workGrid.querySelector(`[data-project="${id}"]`);
  const inner = caseEl.querySelector(".case__inner");
  gsap.to(inner, {
    opacity: 0,
    duration: reduced ? 0 : 0.3,
    ease: "power2.in",
    onComplete: () => {
      renderCase(p);
      caseScroll.scrollTop = 0;
      gsap.to(inner, { opacity: 1, duration: reduced ? 0 : 0.5, ease: "power2.out" });
    },
  });
}

workGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".project");
  if (card) openCase(card.dataset.project, card);
});
document.getElementById("caseClose").addEventListener("click", closeCase);
caseNextBtn.addEventListener("click", () => gotoCase(caseNextBtn.dataset.next));

// Esc closes the overlay first, then the menu. Tab stays inside the overlay.
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && caseIsOpen) { closeCase(); return; }
  if (e.key !== "Tab" || !caseIsOpen) return;
  const focusable = caseEl.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])");
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});


/* ---------------- Language toggle ---------------- */
document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(lang === "en" ? "vi" : "en");
});

/* ---------------- Custom cursor ---------------- */
if (!isTouch) {
  const cursor = document.getElementById("cursor");
  const dot = cursor.querySelector(".cursor__dot");
  const ring = cursor.querySelector(".cursor__ring");
  const setDot = { x: gsap.quickSetter(dot, "x", "px"), y: gsap.quickSetter(dot, "y", "px") };
  const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
  const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

  window.addEventListener("pointermove", (e) => {
    setDot.x(e.clientX); setDot.y(e.clientY);
    ringX(e.clientX); ringY(e.clientY);
  });

  document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const label = el.getAttribute("data-hover-label");
      if (label) {
        ring.setAttribute("data-label", label);
        cursor.classList.add("cursor--label");
      } else {
        cursor.classList.add("cursor--hover");
      }
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor--hover", "cursor--label");
    });
  });
}

/* ---------------- Magnetic elements ---------------- */
if (!isTouch && !reduced) {
  document.querySelectorAll(".nav__link, .nav__logo, .contact__top").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.35);
      yTo((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
  });
}

/* Dev handle for driving timelines from the console */
window.__mv = { intro, menuTl, toggleMenu, openCase, closeCase, gotoCase, applyLang, getLang: () => lang, PROJECTS, CONTENT, smoother: () => smoother };
