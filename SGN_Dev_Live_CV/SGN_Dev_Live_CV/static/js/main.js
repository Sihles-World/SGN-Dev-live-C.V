
// Typing effect
const phrases = [
  "practical tools for real people.",
  "neon-flavoured digital experiences.",
  "live, interactive Apps,Web-sites and Softwares.",
  "apps inspired by everyday problems."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const typingEl = document.getElementById("typing-text");

function typeLoop() {
  if (!typingEl) return;
  const current = phrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  const delay = deleting ? 45 : 80;
  setTimeout(typeLoop, delay);
}

// Scroll progress bar
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + "%";
});

// Scroll reveal
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Skill bars animation
let skillsAnimated = false;
const skillsSection = document.getElementById("skills");

if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillsAnimated = true;
          document.querySelectorAll(".skill-bar").forEach(bar => {
            const level = bar.dataset.level || 0;
            const fill = bar.querySelector(".skill-fill");
            if (fill) {
              setTimeout(() => {
                fill.style.width = level + "%";
              }, 80);
            }
          });
          skillsObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  skillsObserver.observe(skillsSection);
}

// Toast
const toastEl = document.getElementById("toast");
let toastTimeout;

function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.style.display = "block";
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.style.display = "none";
  }, 2600);
}

// Demo contact submit
function handleFakeSubmit(e) {
  e.preventDefault();
  showToast("Demo form only — please email me for real opportunities.");
}
window.handleFakeSubmit = handleFakeSubmit;

// Project modal
const modalOverlay = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalTag = document.getElementById("modalTag");
const modalStack = document.getElementById("modalStack");
const modalDescription = document.getElementById("modalDescription");
const modalRole = document.getElementById("modalRole");
const modalCloseBtn = document.getElementById("modalCloseBtn");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    if (!modalOverlay) return;

    const title = card.dataset.title || "";
    const tag = card.dataset.tag || "";
    const stack = card.dataset.stack || "";
    const description = card.dataset.description || "";
    const role = card.dataset.role || "";

    if (modalTitle) modalTitle.textContent = title;
    if (modalTag) modalTag.textContent = tag;
    if (modalStack) modalStack.textContent = stack;
    if (modalDescription) modalDescription.textContent = description;
    if (modalRole) modalRole.textContent = role;

    modalOverlay.classList.add("active");
  });
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", e => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("active");
    }
  });
}

// Dev mode easter egg on logo
const logo = document.getElementById("logo");
let logoClicks = 0;
let devMode = false;

if (logo) {
  logo.addEventListener("click", () => {
    logoClicks++;
    if (!devMode && logoClicks >= 5) {
      devMode = true;
      document.body.classList.add("dev-mode");
      showToast("Dev mode activated 🔓");
    } else if (devMode && logoClicks >= 10) {
      devMode = false;
      logoClicks = 0;
      document.body.classList.remove("dev-mode");
      showToast("Dev mode deactivated 🔒");
    }
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  const scrollPos = window.scrollY + window.innerHeight * 0.25;
  let currentId = "";

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = top + sec.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      currentId = sec.id;
    }
  });

  navLinks.forEach(link => {
    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Start typing when page loads
window.addEventListener("load", () => {
  typeLoop();
  updateActiveNav();
});
