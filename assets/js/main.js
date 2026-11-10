document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const moodReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  const prefersReducedMotion = () => moodReduced.matches;

  /* ============================================================
     Header: transparent → solid
     ============================================================ */
  const updateHeader = () => {
    if (!header) return;
    const isMenuOpen = navToggle && navToggle.getAttribute("aria-expanded") === "true";
    const isScrolled = window.scrollY > 24 || isMenuOpen;
    header.classList.toggle("site-header--scrolled", isScrolled);
    header.classList.toggle("site-header--transparent", !isScrolled);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ============================================================
     Mobile menu
     ============================================================ */
  const setMenu = (open, returnFocus = false) => {
    if (!navToggle || !mobileMenu) return;

    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    mobileMenu.hidden = !open;
    header.classList.toggle("site-header--menu-open", open);
    if (open) {
      header.classList.remove("site-header--transparent");
    } else {
      updateHeader();
    }

    if (!open && returnFocus) {
      navToggle.focus();
    }
  };

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false, true);
      }
    });

    document.addEventListener("click", (event) => {
      if (navToggle.getAttribute("aria-expanded") !== "true") return;
      if (header.contains(event.target)) return;
      setMenu(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900 && navToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
      }
    });
  }

  /* ============================================================
     Smooth scroll + focus management
     ============================================================ */
  const focusTarget = (target) => {
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }
    target.focus({ preventScroll: true });
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") {
        event.preventDefault();
        return;
      }

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      history.pushState(null, "", hash);
      focusTarget(target);
    });
  });

  /* ============================================================
     Active nav link based on section visibility
     ============================================================ */
  const observedSections = ["top", "produk", "bahan-utama", "kenapa-nolou", "tentang", "faq"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if ("IntersectionObserver" in window && observedSections.length) {
    const observer = new IntersectionObserver(
      () => {
        const viewportLine = window.innerHeight * 0.4;
        let currentId = null;
        let nearestId = null;
        let nearestDistance = Infinity;

        observedSections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top - viewportLine);

          if (rect.top <= viewportLine && rect.bottom > viewportLine) {
            currentId = section.id;
          }

          if (rect.bottom > 0 && rect.top < window.innerHeight && distance < nearestDistance) {
            nearestDistance = distance;
            nearestId = section.id;
          }
        });

        setActiveLink(currentId || nearestId || "top");
      },
      { rootMargin: "-20% 0px -50% 0px", threshold: 0 }
    );

    observedSections.forEach((section) => observer.observe(section));
  }

  /* ============================================================
     Reveal on scroll
     ============================================================ */
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* ============================================================
     FAQ accordion
     ============================================================ */
  const faq = document.querySelector("[data-faq]");

  if (faq) {
    const triggers = Array.from(faq.querySelectorAll(".faq__trigger"));

    const setPanel = (trigger, open) => {
      const panel = document.getElementById(trigger.getAttribute("aria-controls"));
      trigger.setAttribute("aria-expanded", String(open));
      if (panel) panel.hidden = !open;
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        triggers.forEach((item) => setPanel(item, false));
        if (!isOpen) setPanel(trigger, true);
      });

      trigger.addEventListener("keydown", (event) => {
        const index = triggers.indexOf(trigger);
        let nextIndex = null;

        if (event.key === "ArrowDown") nextIndex = (index + 1) % triggers.length;
        if (event.key === "ArrowUp") nextIndex = (index - 1 + triggers.length) % triggers.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = triggers.length - 1;

        if (nextIndex === null) return;
        event.preventDefault();
        triggers[nextIndex].focus();
      });
    });
  }
});
