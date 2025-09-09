// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
navToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Active link highlight on scroll
const sections = [
  "home",
  "about",
  "goals",
  "experience",
  "projects",
  "skills",
  "resume",
  "contact",
].map((id) => document.getElementById(id));
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const mobLinks = Array.from(document.querySelectorAll("#mobileMenu a"));

function setActive() {
  let current = sections[0];
  const navHeight = document.querySelector(".nav").offsetHeight;

  // 🔹 tweakable offsets for each group
  const defaultOffsetExtra = 0; // baseline (just nav height)
  const offsetForGoalsAndResume = 30; // extra offset for goals/resume
  const offsetForProjects = -65; // extra offset for projects

  const fromTop = window.scrollY;

  for (const section of sections) {
    if (!section) continue;

    // decide offset per section
    let offsetExtra = defaultOffsetExtra;
    if (section.id === "projects") offsetExtra = offsetForProjects;
    else if (section.id === "goals" || section.id === "resume")
      offsetExtra = offsetForGoalsAndResume;

    const offset = navHeight + offsetExtra;

    if (section.offsetTop <= fromTop + offset) current = section;
  }

  const href = `#${current.id}`;
  [...navLinks, ...mobLinks].forEach((a) => {
    if (a.getAttribute("href") === href) a.classList.add("active");
    else a.classList.remove("active");
  });
}

document.addEventListener("scroll", setActive);
setActive();

// Smooth scroll for in-page links
[...document.querySelectorAll('a[href^="#"]')].forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();

    // 🔹 tweakable offsets for each group
    const defaultOffsetExtra = 0;
    const offsetForGoalsAndResume = 30;
    const offsetForProjects = -65;

    const navHeight = document.querySelector(".nav").offsetHeight;
    const windowHeight = window.innerHeight;
    const elementHeight = el.offsetHeight;
    const elementTop = el.offsetTop;

    // pick offsetExtra based on id
    let offsetExtra = defaultOffsetExtra;
    if (id === "#projects") offsetExtra = offsetForProjects;
    else if (id === "#goals" || id === "#resume")
      offsetExtra = offsetForGoalsAndResume;

    // 🔹 Decide which behaviour to use based on id
    if (id === "#goals" || id === "#resume" || id === "#projects") {
      // For Goals, Resume, Projects use top-of-section minus nav height and padding
      const scrollPosition = el.offsetTop - navHeight - offsetExtra;
      window.scrollTo({
        top: scrollPosition < 0 ? 0 : scrollPosition,
        behavior: "smooth",
      });
    } else {
      // All other sections keep the old “center” behaviour
      const centerPosition =
        elementTop - windowHeight / 2 + elementHeight / 2 - navHeight;
      window.scrollTo({
        top: Math.max(0, centerPosition),
        behavior: "smooth",
      });
    }

    // Close mobile menu
    mobileMenu.classList.add("hidden");
  });
});

// Initialize EmailJS (must match your public key)
emailjs.init({
  publicKey: "UWbbcZhkGr03f9jnD",
});

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const bot = document.getElementById("website");

  if (bot.value) return; // honeypot

  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !subject.value.trim() ||
    !message.value.trim()
  ) {
    window.alert("Please fill all the details in the form");
    return;
  }
  if (
    email.value === "" ||
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)
  ) {
    window.alert("Enter a valid Email Address");
    return;
  }

  // send via EmailJS
  emailjs
    .sendForm("service_03eqkmv", "template_xdul4uf", form)
    .then(() => {
      statusEl.textContent = "Message sent! I will get back to you soon.";
      statusEl.style.display = "block";
      form.reset();
      setTimeout(() => (statusEl.style.display = "none"), 5000);
    })
    .catch((err) => {
      statusEl.textContent = "Failed to send message. Please try again.";
      statusEl.style.display = "block";
      console.error(err);
    });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Add skill-icon class to skill icons
document.querySelectorAll(".skill-card svg").forEach((icon) => {
  icon.classList.add("skill-icon");
});

// Parallax effect for background elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".gradient-orb");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Mouse movement effect for particles
document.addEventListener("mousemove", (e) => {
  const particles = document.querySelectorAll(".particle");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  particles.forEach((particle, index) => {
    const speed = (index + 1) * 0.5;
    const xOffset = (x - 0.5) * speed * 20;
    const yOffset = (y - 0.5) * speed * 20;

    particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  });
});

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.href && this.href.includes("#")) return;

    const originalText = this.textContent;
    this.innerHTML = `<span class="loading-dots">Loading</span>`;

    setTimeout(() => {
      this.textContent = originalText;
    }, 2000);
  });
});

//Code to take the user to top with button click
document.addEventListener("DOMContentLoaded", () => {
  // Select your scroll-to-top button by its aria-label or add an id to it
  const scrollBtn = document.querySelector(
    'button[aria-label="Scroll to top"]'
  );

  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

const viewResumeBtn = document.getElementById("viewResumeBtn");
const resumeModal = document.getElementById("resumeModal");
const closeResumeBtn = document.getElementById("closeResumeBtn");

viewResumeBtn.addEventListener("click", (e) => {
  e.preventDefault(); // stop link
  resumeModal.classList.remove("hidden");
});

closeResumeBtn.addEventListener("click", () => {
  resumeModal.classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") resumeModal.classList.add("hidden");
});
