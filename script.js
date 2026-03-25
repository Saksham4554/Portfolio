document.addEventListener("DOMContentLoaded", () => {

  /* ================= LOADER ================= */
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderFill");
  const pct = document.getElementById("loaderPct");

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 15;

    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);

      setTimeout(() => {
        loader.classList.add("hidden");
      }, 500);
    }

    fill.style.width = progress + "%";
    pct.innerText = Math.floor(progress) + "%";
  }, 200);

const modeToggle = document.getElementById("modeToggle");

let isLight = localStorage.getItem("mode") === "light";

function applyMode() {

  if (isLight) {
    document.body.classList.add("light");
    document.documentElement.style.setProperty("--bg", "#f8fafc");
    document.documentElement.style.setProperty("--bg2", "#ffffff");

    document.documentElement.style.setProperty("--text", "#0f172a");
    document.documentElement.style.setProperty("--muted", "#475569");

    document.documentElement.style.setProperty("--border", "rgba(0,0,0,0.08)");
    document.documentElement.style.setProperty("--glass", "rgba(255,255,255,0.7)");
    document.documentElement.style.setProperty("--glass-b", "rgba(0,0,0,0.08)");

    document.documentElement.style.setProperty("--card-glow-c", "rgba(0,0,0,0.04)");
    document.documentElement.style.setProperty("--card-glow-v", "rgba(0,0,0,0.06)");

    modeToggle.innerText = "☀️";
  } else {
    document.body.classList.remove("light");
    document.documentElement.style.setProperty("--bg", "#030014");
    document.documentElement.style.setProperty("--bg2", "#070620");

    document.documentElement.style.setProperty("--text", "#e2e8f0");
    document.documentElement.style.setProperty("--muted", "#64748b");

    document.documentElement.style.setProperty("--border", "rgba(255,255,255,0.07)");
    document.documentElement.style.setProperty("--glass", "rgba(255,255,255,0.04)");
    document.documentElement.style.setProperty("--glass-b", "rgba(255,255,255,0.08)");

    document.documentElement.style.setProperty("--card-glow-c", "rgba(0,245,212,0.12)");
    document.documentElement.style.setProperty("--card-glow-v", "rgba(124,58,237,0.15)");

    modeToggle.innerText = "🌙";
  }
}

applyMode();

modeToggle.addEventListener("click", () => {
  isLight = !isLight;
  localStorage.setItem("mode", isLight ? "light" : "dark");
  applyMode();
});
  /* ================= CUSTOM CURSOR ================= */
  const dot = document.getElementById("curDot");
  const ring = document.getElementById("curRing");

  document.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    ring.style.left = e.clientX + "px";
    ring.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => ring.classList.add("expand"));
    el.addEventListener("mouseleave", () => ring.classList.remove("expand"));
  });


  /* ================= MOBILE MENU ================= */
  const burger = document.getElementById("navBurger");
  const drawer = document.getElementById("mobileDrawer");

  burger.addEventListener("click", () => {
    drawer.classList.toggle("open");
  });

  window.closeDrawer = () => {
    drawer.classList.remove("open");
  };


  /* ================= TYPING EFFECT ================= */
  const roles = [
    "CSE Student",
    "Data Analyst",
    "ML Enthusiast",
    "Python Developer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  const typingEl = document.getElementById("heroTyping");

  function typeEffect() {
    if (charIndex < roles[roleIndex].length) {
      typingEl.innerHTML += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 80);
    } else {
      setTimeout(eraseEffect, 1200);
    }
  }

  function eraseEffect() {
    if (charIndex > 0) {
      typingEl.innerHTML = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseEffect, 40);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 200);
    }
  }

  typeEffect();


  /* ================= SCROLL REVEAL ================= */
  const reveals = document.querySelectorAll(".rs");

  function revealOnScroll() {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;

      if (top < window.innerHeight - 80) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();


  /* ================= COUNTER ================= */
  const counters = document.querySelectorAll(".stat-num[data-count]");

  function runCounter() {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-count");
    let count = 0;
    const step = target / 50;

    function update() {
      count += step;

      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    }

    update();
  });
}

setTimeout(runCounter, 1000);


  /* ================= SKILL FILTER ================= */
  const filterBtns = document.querySelectorAll(".sf-btn");
  const skills = document.querySelectorAll(".skill-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".sf-btn.active").classList.remove("active");
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      skills.forEach(card => {
        if (filter === "all" || card.dataset.cat === filter) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });


  /* ================= PROJECT EXPAND ================= */
  window.toggleExpand = function(btn) {
    const detail = btn.nextElementSibling;
    detail.classList.toggle("open");
    btn.classList.toggle("open");
  };


  /* ================= 3D TILT ================= */
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -10;
      const rotateY = (x / rect.width - 0.5) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    });
  });


  /* ================= BACK TO TOP ================= */
  const backTop = document.getElementById("backTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /* ================= CANVAS ================= */
  const canvas = document.getElementById("neuralCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  let particles = [];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5),
      vy: (Math.random() - 0.5)
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#00f5d4";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();


  /* ================= THEME SWITCH ================= */
  const themeSelected = document.getElementById("themeSelected");
  const themeOptions = document.getElementById("themeOptions");

  const themes = {
    default: {"--bg":"#030014","--cyan":"#00f5d4","--violet":"#7c3aed","--blue":"#2563eb","--text":"#e2e8f0"},
    neon: {"--bg":"#020403","--cyan":"#00ff9f","--violet":"#00c853","--blue":"#00ff9f","--text":"#eafff6"},
    purple: {"--bg":"#0a0014","--cyan":"#ff4ecd","--violet":"#7c3aed","--blue":"#a855f7","--text":"#f3e8ff"},
    gold: {"--bg":"#0b0b0b","--cyan":"#ffb703","--violet":"#fb8500","--blue":"#ffb703","--text":"#fff6e0"},
    red: {"--bg":"#050000","--cyan":"#ff3b3b","--violet":"#ff0000","--blue":"#ff4d4d","--text":"#ffe5e5"},
    teal: {"--bg":"#020617","--cyan":"#14b8a6","--violet":"#0ea5e9","--blue":"#22d3ee","--text":"#e0f2fe"}
  };

  function applyTheme(themeName) {
    const selectedTheme = themes[themeName];
    if (!selectedTheme) return;

    for (let key in selectedTheme) {
      document.documentElement.style.setProperty(key, selectedTheme[key]);
    }
  }

  if (themeSelected && themeOptions) {

    themeSelected.addEventListener("click", () => {
      themeOptions.style.display =
        themeOptions.style.display === "block" ? "none" : "block";
    });

    document.querySelectorAll("#themeOptions div").forEach(option => {
      option.addEventListener("click", () => {
        const value = option.getAttribute("data-value");
        const text = option.innerText;

        themeSelected.innerText =text;
        themeOptions.style.display = "none";

        applyTheme(value);
        localStorage.setItem("theme", value);
      });
    });

    const savedTheme = localStorage.getItem("theme");

    const labelMap = {
      default:"Default Blue",
      neon:"Neon Green",
      purple:"Purple Pink",
      gold:"Gold Luxury",
      red:"Red Dark",
      teal:"Teal Clean"
    };

    if (savedTheme && themes[savedTheme]) {
      applyTheme(savedTheme);
      themeSelected.innerText =labelMap[savedTheme];
    }

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".theme-dropdown")) {
        themeOptions.style.display = "none";
      }
    });
  }


  /* ================= NAV ACTIVE ================= */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });


  /* ================= RESIZE ================= */
  window.addEventListener("resize", resizeCanvas);
});
