/* Mai Vũ® — Portfolio ’26
   GSAP choreography + Three.js particle-wave hero.
   Classic script (no type=module) so the page also works when opened
   directly from the filesystem (file://), where Chrome blocks local
   ES-module loads. Three.js is pulled in via dynamic import() below. */

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

// `?motion=full` / `?motion=reduced` overrides the OS setting (useful for demos & testing)
const motionParam = new URLSearchParams(location.search).get("motion");
const reduced = motionParam === "full" ? false :
                motionParam === "reduced" ? true :
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none)").matches;
const isMobile = window.matchMedia("(max-width: 767px)").matches;

document.body.classList.add("js");

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
      uColorA: { value: new THREE.Color("#d8ff3d") },
      uColorB: { value: new THREE.Color("#2b45ff") },
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

/* ---------------- Generic reveals ---------------- */
if (!reduced) {
  document.querySelectorAll("[data-reveal='fade']").forEach((el) => {
    if (el.closest(".hero")) return; // hero handles its own intro
    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  document.querySelectorAll("[data-reveal='chars']").forEach((el) => {
    const split = new SplitText(el, { type: "chars, lines", linesClass: "split-line" });
    gsap.set(el, { opacity: 1 });
    gsap.from(split.chars, {
      yPercent: 110,
      duration: 0.8,
      stagger: 0.02,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
    el.querySelectorAll(".split-line").forEach((l) => (l.style.overflow = "hidden"));
  });

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

  // About statement — word-by-word scrub
  const aboutSplit = new SplitText("#aboutStatement", { type: "words", wordsClass: "word" });
  gsap.to(aboutSplit.words, {
    opacity: 1,
    stagger: 0.06,
    ease: "none",
    scrollTrigger: {
      trigger: "#aboutStatement",
      start: "top 80%",
      end: "bottom 45%",
      scrub: 0.5,
    },
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
  document.querySelectorAll(".about__statement .word").forEach((w) => (w.style.opacity = 1));
  document.getElementById("aboutStatement").style.opacity = 1;
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
    gsap.to(lines[0], { rotate: 45, y: 4, background: "#0a0a0b", duration: 0.3 });
    gsap.to(lines[1], { rotate: -45, y: -4, background: "#0a0a0b", duration: 0.3 });
    if (smoother) smoother.paused(true);
  } else {
    menuTl.timeScale(1.4).reverse().eventCallback("onReverseComplete", () => {
      gsap.set(menuEl, { visibility: "hidden" });
      if (onDone) onDone();
      menuTl.eventCallback("onReverseComplete", null);
    });
    gsap.to(lines, { rotate: 0, y: 0, background: "#edede6", duration: 0.3 });
    if (smoother) smoother.paused(false);
  }
}
menuToggle.addEventListener("click", () => toggleMenu(!menuOpen));
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuOpen) toggleMenu(false);
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
window.__mv = { intro, menuTl, toggleMenu, smoother: () => smoother };
