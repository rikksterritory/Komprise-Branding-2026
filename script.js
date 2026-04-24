const logoImages = document.querySelectorAll("[data-logo-light][data-logo-dark]");
const tocLinks = [...document.querySelectorAll(".toc__link")];
const sections = [...document.querySelectorAll("[data-section]")];
const yearTargets = document.querySelectorAll("[data-year]");

function applySurfaceLogos() {
  logoImages.forEach((image) => {
    const surface = image.closest("[data-surface]")?.dataset.surface ?? "light";
    image.src = surface === "dark" ? image.dataset.logoDark : image.dataset.logoLight;
  });
}

function setFooterYear() {
  const currentYear = new Date().getFullYear();
  yearTargets.forEach((target) => {
    target.textContent = String(currentYear);
  });
}

function setActiveLink(id) {
  tocLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initializeTocObserver() {
  if (!("IntersectionObserver" in window) || tocLinks.length === 0 || sections.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries.length > 0) {
        setActiveLink(visibleEntries[0].target.id);
      }
    },
    {
      rootMargin: "-18% 0px -58% 0px",
      threshold: [0.2, 0.4, 0.6],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

applySurfaceLogos();
if (sections[0]) {
  setActiveLink(sections[0].id);
}
initializeTocObserver();
setFooterYear();
