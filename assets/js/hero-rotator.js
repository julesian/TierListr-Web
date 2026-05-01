(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const heroWords = document.querySelectorAll(".hero-line, .hero-word");
  const track = document.querySelector("[data-hero-rotator]");
  let measureFrame = 0;

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
  let wordHeight = 0;

  function applyPosition(index, animate) {
    track.style.transition = animate
      ? `transform ${transitionDuration}ms cubic-bezier(0.25, 0.9, 0.3, 1)`
      : "none";
    track.style.transform = `translateY(${-index * wordHeight}px)`;
  }

  function getWordHeight() {
    const activeWord = track.firstElementChild;

    if (activeWord) {
      const rect = activeWord.getBoundingClientRect();

      if (rect.height > 0) {
        return rect.height;
      }
    }

    const rotatorRect = rotator.getBoundingClientRect();

    if (rotatorRect.height > 0) {
      return rotatorRect.height;
    }

    return wordHeight || 0;
  }

  function measure() {
    wordHeight = getWordHeight();
    applyPosition(activeIndex, false);
  }

  function scheduleMeasure() {
    if (measureFrame) {
      window.cancelAnimationFrame(measureFrame);
    }

    measureFrame = window.requestAnimationFrame(function () {
      measureFrame = window.requestAnimationFrame(function () {
        measureFrame = 0;
        measure();
      });
    });
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

  scheduleMeasure();
  window.addEventListener("resize", scheduleMeasure);
  window.addEventListener("load", scheduleMeasure);
  window.addEventListener("pageshow", scheduleMeasure);

  if (document.fonts && typeof document.fonts.ready === "object") {
    document.fonts.ready.then(scheduleMeasure);
  }

  if (typeof ResizeObserver === "function") {
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(rotator);
    resizeObserver.observe(track);
  }

  window.setInterval(advance, stepDuration);
})();
