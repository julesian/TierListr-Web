(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const parallaxTargets = document.querySelectorAll("[data-parallax]");

  if (!revealTargets.length && !parallaxTargets.length) {
    return;
  }

  if (reduceMotion.matches) {
    revealTargets.forEach(function (node) {
      node.classList.add("is-visible");
    });
    return;
  }

  document.documentElement.classList.add("motion-ready");

  if (revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealTargets.forEach(function (node) {
      revealObserver.observe(node);
    });
  }

  if (!parallaxTargets.length) {
    return;
  }

  let ticking = false;

  function updateParallax() {
    const viewportHeight = window.innerHeight || 1;

    parallaxTargets.forEach(function (node) {
      const rect = node.getBoundingClientRect();
      const center = rect.top + (rect.height / 2);
      const distanceFromCenter = (center - (viewportHeight / 2)) / viewportHeight;
      node.style.setProperty("--parallax-shift", `${distanceFromCenter * -18}px`);
    });

    ticking = false;
  }

  function requestParallax() {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateParallax);
  }

  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
})();
