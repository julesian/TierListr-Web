(function () {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  function updateHeaderOffset() {
    document.documentElement.style.setProperty("--header-offset", `${header.offsetHeight}px`);
  }

  updateHeaderOffset();
  window.addEventListener("load", updateHeaderOffset);
  window.addEventListener("resize", updateHeaderOffset);

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(updateHeaderOffset);
    observer.observe(header);
  }
})();
