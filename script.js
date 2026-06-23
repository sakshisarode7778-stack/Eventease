function toggleForm() {
  const form = document.getElementById("customForm");
  form.classList.toggle("active");
}

if (document.querySelector(".events-section")) {
  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }
}

// ======================
// Page Load Fade
// ========================
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// ========================
// Debounce Utility
// ========================
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// ========================
// Event Search
// ========================
const searchBox = document.getElementById("searchBox");
const cards = document.querySelectorAll(".event-banner");
const noResults = document.getElementById("noResults");

if (searchBox) {
  searchBox.addEventListener("keyup", debounce(() => {
    const filter = searchBox.value.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(card => {
      const titleElement = card.querySelector(".title-text");
      const title = titleElement ? titleElement.textContent.toLowerCase() : "";
      const match = title.includes(filter);
      card.style.display = match || filter === "" ? "" : "none";
      if (match) visibleCount++;
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 && filter !== "" ? "block" : "none";
    }
  }, 200));
}

// ========================
// Navbar Scroll Effect
// ========================
const navbar = document.querySelector(".navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ========================
// Scroll Progress Bar
// ========================
const progressBar = document.getElementById("progress-bar");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const scrollableHeight = document.body.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;
    progressBar.style.width = progress + "%";
  });
}

// ========================
// Auto-Scroll Gallery
const gallery = document.querySelector(".gallery-scroll");
let scrollAmount = 0;

// Clone gallery children for seamless looping
if (gallery && gallery.children.length > 0) {
  Array.from(gallery.children).forEach(child => {
    const clone = child.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    gallery.appendChild(clone);
  });
}

function autoScrollGallery() {
  if (!gallery) return;
  scrollAmount += 1;
  gallery.scrollLeft = scrollAmount;
  // When scrolled past the original content, reset seamlessly
  if (scrollAmount >= gallery.scrollWidth / 2) {
    scrollAmount = 0;
    gallery.scrollLeft = 0;
  }
}

let galleryInterval;
if (gallery) {
  galleryInterval = setInterval(autoScrollGallery, 30);
  gallery.addEventListener("mouseenter", () => clearInterval(galleryInterval));
  gallery.addEventListener("mouseleave", () => galleryInterval = setInterval(autoScrollGallery, 30));
}

// ========================
// Lightbox
// ========================
const galleryImages = document.querySelectorAll(".gallery-scroll img");
if (galleryImages.length > 0) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  const lightboxImg = document.createElement("img");
  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  galleryImages.forEach(img => img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("visible");
  }));

  lightbox.addEventListener("click", () => lightbox.classList.remove("visible"));
}

// ========================
// Back to Top Button
// ========================
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ========================
// Section Reveal Animation
// ========================
const revealElements = document.querySelectorAll(".event-banner, .about-left, .about-right, .why-title, .why-subtitle, .benefit-card, .step, .contact-footer");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.2 });
revealElements.forEach(el => observer.observe(el));

// ========================
// Steps & Slides
// ========================
const steps = document.querySelectorAll(".step");
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    steps.forEach(s => s.classList.remove("active-step"));
    step.classList.add("active-step");

    if (slides[currentIndex]) {
      slides[currentIndex].classList.replace("active-slide", "exit-left");
    }
    if (slides[index]) {
      slides[index].classList.add("active-slide");
    }

    setTimeout(() => {
      if (slides[currentIndex]) {
        slides[currentIndex].classList.remove("exit-left");
      }
    }, 600);
    currentIndex = index;
  });
});

// ========================
// GSAP Animations
// ========================
const gsapAnimations = [
  { selector: ".home-content h1", y: -80, opacity: 0, duration: 1.2 },
  { selector: ".home-content p", y: 40, opacity: 0, duration: 1, delay: 0.5 },
  { selector: ".why-title", y: -50, opacity: 0, duration: 1, scrollTrigger: { trigger: ".why-us", start: "top 80%" } },
  { selector: ".why-subtitle", y: 20, opacity: 0, duration: 1, delay: 0.3, scrollTrigger: { trigger: ".why-us", start: "top 75%" } },
  { selector: ".benefit-card", y: 50, scale: 0.8, opacity: 0, duration: 1, stagger: 0.3, scrollTrigger: { trigger: ".why-us", start: "top 80%" }, ease: "back.out(1.7)" },
  { selector: ".step", x: -80, opacity: 0, duration: 1, stagger: 0.3, scrollTrigger: { trigger: ".how-container", start: "top 80%" } },
  { selector: ".steps-right img", x: 80, opacity: 0, duration: 1.2, scrollTrigger: { trigger: ".how-container", start: "top 80%" } }];

if (typeof gsap !== "undefined") {
  gsapAnimations.forEach(anim => gsap.from(anim.selector, anim));
}

// ========================
// Active Navbar Link
// ========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
  if (section.getBoundingClientRect().top <= 150) current = section.id;
});
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
});

// ========================
// Mobile Menu Toggle
// ========================
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => menu.classList.toggle("active"));
}

// ========================
// GSAP SAFE ANIMATIONS
// ========================

// Only run GSAP if available
if (typeof gsap !== "undefined") {

  // HOME PAGE ANIMATIONS
  if (document.querySelector(".home-content")) {
    gsap.from(".home-content h1", { y: -80, opacity: 0, duration: 1.2 });
    gsap.from(".home-content p", { y: 40, opacity: 0, duration: 1, delay: 0.5 });
  }

  // WHY US SECTION
  if (document.querySelector(".why-us") && typeof ScrollTrigger !== "undefined") {

    gsap.from(".why-title", {
      y: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: ".why-us", start: "top 80%" }
    });

    gsap.from(".why-subtitle", {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      scrollTrigger: { trigger: ".why-us", start: "top 75%" }
    });

    gsap.from(".benefit-card", {
      y: 50,
      opacity: 0,
      scale: 0.8,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: { trigger: ".why-us", start: "top 80%" },
      ease: "back.out(1.7)"
    });
  }

  // ABOUT SECTION
  if (document.querySelector(".about-section") && typeof ScrollTrigger !== "undefined") {

    gsap.from(".about-left", {
      x: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: ".about-left", start: "top 80%" }
    });

    gsap.from(".about-right", {
      x: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: ".about-right", start: "top 80%" }
    });
  }

  // EVENTS PAGE ONLY
  if (document.querySelector(".events-section") && typeof gsap !== "undefined") {

    gsap.from(".events-title", {
      y: -50,
      opacity: 0,
      duration: 1
    });

    gsap.from(".events-subtitle", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3
    });

    if (typeof ScrollTrigger !== "undefined") {
      gsap.from(".event-banner", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".events-container",
          start: "top 80%"
        }
      });
    }
  }
}
if (typeof gsap !== "undefined") {
  gsap.from(".event-banner", {
    opacity: 0,
    y: 80,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".events-container",
      start: "top 85%"
    }
  });
}

const submitBtn = document.querySelector("#eventForm button[type='submit']");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const msg = document.getElementById("successMsg");
  msg.style.display = "block";
  msg.style.opacity = 1;
  setTimeout(() => msg.style.display = "none", 10000);
});

const eventForm = document.getElementById("eventForm");
const customFormContainer = document.getElementById("customForm");
const successMsg = document.getElementById("successMsg");

eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Slide/hide the form smoothly
  customFormContainer.classList.add("hide");

  // Show the success message
  successMsg.classList.add("show");

  // Keep message visible for 10 seconds
  setTimeout(() => {
    successMsg.classList.remove("show");
    // Optional: Show form again
    customFormContainer.classList.remove("hide");
    eventForm.reset();
  }, 10000);
});

document.addEventListener("DOMContentLoaded", () => {
  // Lightbox
  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("visible");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("visible");
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll("section, .package-card, .organizer-card, .gallery img");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // initial check
});

const counters = document.querySelectorAll(".event-stats h3");

counters.forEach(counter => {
  const target = parseInt(counter.innerText); // final number
  let count = 0;

  const updateCount = () => {
    const speed = 90; // jitna kam, utna fast
    const increment = target / speed;

    if (count < target) {
      count += increment;
      counter.innerText = Math.floor(count) + "+";
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCount();
});
function openModal() {
  document.getElementById("verifyModal").style.display = "block";
}
function closeModal() {
  document.getElementById("verifyModal").style.display = "none";
}
document.getElementById("verifyForm").addEventListener("submit", function(e){
  e.preventDefault();
  document.getElementById("verifySuccess").style.display = "block";
});

document.getElementById("verifyForm").addEventListener("submit", function(e){
  e.preventDefault();

  // Get values by name
  const location = document.querySelector("input[name='location']").value;
  const phone = document.querySelector("input[name='phone']").value;

  // Show them separately
  console.log("Location:", location);
  console.log("Phone:", phone);

  document.getElementById("verifySuccess").style.display = "block";
  document.getElementById("verifySuccess").innerText = 
    `✅ Saved! Location: ${location}, Phone: ${phone}`;
});
// Run this after DOM loads
document.getElementById("eventCategory").addEventListener("change", function() {
  const otherWrapper = document.getElementById("otherCategoryWrapper");
  
  if (this.value === "other") {
    otherWrapper.style.display = "block";   // show input
  } else {
    otherWrapper.style.display = "none";    // hide input
    document.getElementById("otherCategory").value = ""; // clear value
  }
});

