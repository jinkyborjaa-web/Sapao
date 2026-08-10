document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");
  const navBar = document.querySelector(".nav");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (toggle && nav) {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = nav.classList.toggle("show");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a, button").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        nav.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown-toggle");
    if (!button) return;

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = dropdown.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  if (navBar) {
    const updateNav = () => {
      navBar.classList.toggle("scrolled", window.scrollY > 20);
    };
    updateNav();
    window.addEventListener("scroll", updateNav);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

  const pictureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  document.querySelectorAll(".picture1, .picture2, .picture3").forEach((el) => pictureObserver.observe(el));

  const sections = document.querySelectorAll(".about-section");
  if (sections.length) {
    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const container = entry.target.querySelector(".about-container");
          const text = container?.querySelector(".about-text");
          const image = container?.querySelector(".about-image");
          const isEven = [...sections].indexOf(entry.target) % 2 === 1;

          text?.classList.add(isEven ? "animate-right" : "animate-left");
          image?.classList.add(isEven ? "animate-left" : "animate-right");
          observer2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach((section) => observer2.observe(section));
  }
});