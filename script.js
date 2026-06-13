/* ===== LOADER ===== */
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader").classList.add("hide"), 1400);
});

/* ===== AOS ===== */
AOS.init({ duration: 800, once: true, offset: 80 });

/* ===== NAV ===== */
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

/* ===== SCROLL PROGRESS ===== */
const progress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = pct + "%";
});

/* ===== BACK TO TOP ===== */
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 600));
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ===== MUTE / UNMUTE ===== */
const video = document.getElementById("heroVideo"); // ID ko match kiya
const muteBtn = document.getElementById("muteBtn");
const icon = muteBtn.querySelector("i");
muteBtn.addEventListener("click", () => {
  if(video) {
    video.muted = !video.muted;
    // Play if unmuted
    if (!video.muted) video.play().catch(()=>{});
    icon.className = video.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
  }
});

/* ===== TYPING ANIMATION ===== */
const phrases = [
  "Software Developer",
  "Full-Stack Web Developer",
  "C# & .NET Developer",
  "Graphic Designer"
];
const typed = document.getElementById("typed");
let pi = 0, ci = 0, deleting = false;
(function type(){
  if(!typed) return;
  const word = phrases[pi];
  typed.textContent = word.substring(0, ci);
  if (!deleting && ci < word.length) ci++;
  else if (deleting && ci > 0) ci--;
  else if (!deleting && ci === word.length){ deleting = true; setTimeout(type, 1400); return; }
  else { deleting = false; pi = (pi+1)%phrases.length; }
  setTimeout(type, deleting ? 45 : 90);
})();

/* ===== HERO GSAP ===== */
gsap.registerPlugin(ScrollTrigger);
gsap.from(".hero-title .line", { yPercent: 110, duration: 1, ease: "power4.out", stagger: .12, delay: 1.4 });

/* ===== SKILLS ===== */
const skills = [
  {
    t:"Frontend",
    i:"fa-code",
    items:["HTML","CSS","JavaScript","Responsive Design"]
  },

  {
    t:"Backend",
    i:"fa-server",
    items:["Node.js","Express.js"]
  },

  {
    t:"Database",
    i:"fa-database",
    items:["PostgreSQL","MySQL","SQL"]
  },

  {
    t:"Desktop Development",
    i:"fa-desktop",
    items:["C#",".NET WinForms","CRUD Operations","DataGridView","File Handling"]
  },

  {
    t:"Tools",
    i:"fa-screwdriver-wrench",
    items:["Git","GitHub","VS Code","Visual Studio"]
  },

  {
    t:"Design",
    i:"fa-pen-nib",
    items:["Canva","UI/UX Research","Graphic Design"]
  },

  {
    t:"Soft Skills",
    i:"fa-users",
    items:["Communication","Leadership","Teamwork","Problem Solving"]
  }
];

document.getElementById("skillsGrid").innerHTML = skills.map((s,n)=>`
  <div class="glass skill-cat" data-aos="fade-up" data-aos-delay="${n*60}">
    <h3><i class="fa-solid ${s.i}"></i>${s.t}</h3>
    ${s.items.map(x=>`<span class="chip">${x}</span>`).join("")}
  </div>`).join("");

/* ===== PROJECT SLIDER LOGIC ===== */
const slideIndexes = {};

function changeSlide(projectId, direction) {
  const projectContainer = document.querySelector(`#${projectId}-img`).closest('.project-media');
  const sources = Array.from(projectContainer.querySelectorAll('.slide-src')).map(span => span.textContent);
  
  if (typeof slideIndexes[projectId] === 'undefined') {
    slideIndexes[projectId] = 0;
  }

  slideIndexes[projectId] += direction;

  if (slideIndexes[projectId] >= sources.length) {
    slideIndexes[projectId] = 0;
  } else if (slideIndexes[projectId] < 0) {
    slideIndexes[projectId] = sources.length - 1;
  }

  const imgElement = document.getElementById(`${projectId}-img`);
  imgElement.style.opacity = 0;
  setTimeout(() => {
    imgElement.src = sources[slideIndexes[projectId]];
    imgElement.onload = () => { imgElement.style.opacity = 1; };
  }, 200);
}

/* ===== CASE STUDIES ===== */
document.querySelectorAll(".case-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.case).classList.toggle("open");
  });
});

/* ===== ANIMATED COUNTERS ===== */
const counters = document.querySelectorAll("[data-count]");
const cObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count; let n = 0;
    const step = () => { n += Math.ceil(target/30); if (n >= target) n = target;
      el.textContent = n + "+"; if (n < target) requestAnimationFrame(step); };
    step(); cObs.unobserve(el);
  });
}, { threshold: .6 });
counters.forEach(c => cObs.observe(c));

/* ===== LIGHTBOX ===== */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImage");
const lbClose = document.getElementById("lbClose");

function openLightbox(src) {
  lbImg.src = src;
  lb.classList.add("open");
}

// Attach to Masonry images (Designs)
document.querySelectorAll(".masonry figure img").forEach(img => {
  img.addEventListener("click", () => openLightbox(img.src));
});

// Attach to Project Slider images
document.querySelectorAll(".slider-img").forEach(img => {
  img.addEventListener("click", () => openLightbox(img.src));
});

// === ADDED: Attach to Certificate Images ===
document.querySelectorAll(".cert-img img").forEach(img => {
  img.addEventListener("click", () => openLightbox(img.src));
});

lbClose.addEventListener("click", () => lb.classList.remove("open"));
lb.addEventListener("click", (e) => {
  if(e.target === lb) lb.classList.remove("open");
});

/* ===== PARTICLES ===== */
const canvas = document.getElementById("particles");
if(canvas) {
  const ctx = canvas.getContext("2d");
  let W, H, parts;
  function resize(){ W = canvas.width = innerWidth; H = canvas.height = innerHeight;
    parts = Array.from({length: Math.min(70, Math.floor(W/22))}, () => ({
      x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.8+.4,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, a: Math.random()*.5+.1 })); }
  resize(); addEventListener("resize", resize);
  (function draw(){ ctx.clearRect(0,0,W,H);
    parts.forEach(p=>{ p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fillStyle=`rgba(212,175,55,${p.a})`; ctx.fill(); });
    requestAnimationFrame(draw); })();
}

/* ===== CONTACT FORM ===== */
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
if(form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(data.get("subject") || "Portfolio Contact");
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
    window.location.href = `mailto:faizasohail477@gmail.com?subject=${subject}&body=${body}`;
    note.textContent = "Opening your email app… thank you!";
    form.reset();
  });
}