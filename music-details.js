// ===== Countdown Timer =====
const countdownDate = new Date("2026-04-15T19:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (distance < 0) {
    if (daysEl) daysEl.textContent = "00";
    if (hoursEl) hoursEl.textContent = "00";
    if (minutesEl) minutesEl.textContent = "00";
    if (secondsEl) secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
  if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
  if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
  if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

window.addEventListener("beforeunload", () => {
  clearInterval(countdownInterval);
});


// ===== Lightbox =====
const images = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

images.forEach(img => {
  img.addEventListener("click", () => {
    if (lightbox && lightboxImg) {
      lightboxImg.src = img.src;
      lightbox.classList.add("visible");
    }
  });
});

if (lightbox) {
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("visible");
  });
}


// ===== Scroll Animation =====

// Debounce function (performance boost)
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function showOnScroll() {

  // About Section
  const aboutSection = document.querySelector(".about-section");
  if (aboutSection) {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight * 0.9) {
      aboutSection.classList.add("show");
    }
  }

  // Gallery
  images.forEach((img, index) => {
    if (img.classList.contains("show")) return;

    const imgTop = img.getBoundingClientRect().top;

    if (imgTop < window.innerHeight * 0.9) {
      setTimeout(() => {
        img.classList.add("show");
      }, index * 200);
    }
  });

  // 🔥 ADD THESE HERE
  animateSection(".budget-section", ".budget-row", 150);
  animateSection(".included-section", ".included-card", 150);
  animateSection(".organizer-section", ".organizer-card", 200);
}

// Show on scroll logic using the utility function
// Increase debounce delay for better performance on low-end devices
window.addEventListener("scroll", debounce(showOnScroll, 100));

// ✅ THIS LINE FIXES YOUR REFRESH ISSUE
window.addEventListener("load", showOnScroll);

// Run once on page load (IMPORTANT 🔥)
function animateSection(sectionSelector, itemSelector, stagger = 150) {
  const section = document.querySelector(sectionSelector);
  const items = document.querySelectorAll(itemSelector);

  if (!section) return;

  // ✅ Prevent repeat animation
  if (section.classList.contains("show")) return;

  const sectionTop = section.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight * 0.9) {
    section.classList.add("show");

    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("show");
      }, index * stagger);
    });
  }
}

// ===== COVERFLOW GALLERY =====

// Select only coverflow items
const coverItems = document.querySelectorAll(".cover-item");

let coverIndex = 0;

function updateCoverflow() {
  const total = coverItems.length;

  coverItems.forEach((item, i) => {
    
    let offset = i - coverIndex;

    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const abs = Math.abs(offset);

    let translateX = offset * 140;
    let scale = 1 - abs * 0.2;
    let rotateY = offset * -25;
    let zIndex = 100 - abs;

    // center highlight
    if (offset === 0) {
      scale = 1.2;
    }

    // 🔥 HOVER EFFECT (JS BASED)
    item.onmouseenter = () => {
      item.style.transform = `
        translateX(${translateX}px)
        scale(${scale + 0.2})
        rotateY(${rotateY}deg)
      `;
    };

    item.onmouseleave = () => {
      item.style.transform = `
        translateX(${translateX}px)
        scale(${scale})
        rotateY(${rotateY}deg)
      `;
    };

    item.style.transform = `
      translateX(${translateX}px)
      scale(${scale})
      rotateY(${rotateY}deg)
    `;

    item.style.zIndex = zIndex;
  });
}

// auto move
function moveCoverflow() {
  coverIndex = (coverIndex + 1) % coverItems.length;
  updateCoverflow();
}

// init
updateCoverflow();

// smooth infinite movement
setInterval(moveCoverflow, 2500);

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
