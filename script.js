const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const openStatus = document.querySelector("[data-open-status]");
const statusDot = document.querySelector("[data-status-dot]");
const bookingForm = document.querySelector("#booking-form");
const bookingResult = document.querySelector("#booking-result");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

if (header) {
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (openStatus && statusDot) {
  const updateOpenStatus = () => {
    openStatus.textContent = "Demo-Öffnungszeiten";
    statusDot.classList.remove("closed");
  };

  updateOpenStatus();
}

if (bookingForm) {
  const dateInput = bookingForm.querySelector('input[name="date"]');
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const details = [
      `Service: ${formData.get("service")}`,
      `Wunschtag: ${formData.get("date")}`,
      `Wunschzeit: ${formData.get("time")}`,
      `Name: ${formData.get("name")}`,
      `Kontakt: ${formData.get("phone")}`,
      formData.get("note") ? `Hinweis: ${formData.get("note")}` : null
    ].filter(Boolean);

    bookingResult.classList.add("is-visible");
    bookingResult.textContent = [
      "Demo-Anfrage vorbereitet.",
      ...details,
      "",
      "In dieser Demo wird nichts verschickt. Für einen echten Salon wird dieser Schritt mit Buchungslink, Widget, API oder E-Mail/WhatsApp-Anfrage verbunden."
    ].join("\n");
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

if (window.lucide) {
  window.lucide.createIcons();
}
