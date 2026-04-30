(function initStarfield() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (document.querySelector(".starfield-canvas")) {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.className = "starfield-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);

  function draw() {
    const cssW = window.innerWidth;
    const cssH = Math.max(window.innerHeight, document.documentElement.scrollHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssW, cssH);

    const count = Math.min(420, Math.floor((cssW * cssH) / 3800));

    for (let i = 0; i < count; i++) {
      const x = Math.random() * cssW;
      const y = Math.random() * cssH;
      const r = Math.random() * 1.4 + 0.2;
      const alpha = 0.5 + Math.random() * 0.5;
      const cool = Math.random() > 0.78;

      if (cool) {
        ctx.fillStyle = `rgba(210, 228, 255, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      }

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  draw();

  let resizeTimer;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(draw, 150);
    },
    { passive: true }
  );
})();
