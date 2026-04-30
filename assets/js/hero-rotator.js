(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const heroWords = document.querySelectorAll(".hero-line, .hero-word");
  const track = document.querySelector("[data-hero-rotator]");

  function splitLetters(node) {
    if (!node || node.dataset.heroSplit === "true") {
      return;
    }

    const text = (node.textContent || "").trim();

    if (!text) {
      return;
    }

    node.textContent = "";

    Array.from(text).forEach(function (character) {
      const glyph = document.createElement("span");
      glyph.className = "hero-glyph";
      glyph.textContent = character;
      node.appendChild(glyph);
    });

    node.dataset.heroSplit = "true";
  }

  heroWords.forEach(splitLetters);

  if (!track || reduceMotion.matches) {
    return;
  }

  const rotator = track.parentElement;
  const wordCount = track.children.length - 1;
  const stepDuration = 1550;
  const transitionDuration = 620;
  let activeIndex = 0;
  let wordHeight = rotator.clientHeight;

    function applyPosition(index, animate) {
      track.style.transition = animate
      ? `transform ${transitionDuration}ms cubic-bezier(0.25, 0.9, 0.3, 1)`
      : "none";
      track.style.transform = `translateY(${-index * wordHeight}px)`;
    }

  function measure() {
    wordHeight = rotator.clientHeight;
    applyPosition(activeIndex, false);
  }

  function advance() {
    activeIndex += 1;
    applyPosition(activeIndex, true);

    if (activeIndex === wordCount) {
      window.setTimeout(function () {
        activeIndex = 0;
        applyPosition(activeIndex, false);
      }, transitionDuration + 40);
    }
  }

  measure();
  window.addEventListener("resize", measure);
  window.setInterval(advance, stepDuration);
})();
