if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

const gallery = document.querySelector("[data-rotating-gallery]");

if (gallery) {
  const imageEl = gallery.querySelector("img");
  const imageBasePath = gallery.dataset.imageBasePath || "";
  const rawSlides = gallery.dataset.slides;
  const slides = rawSlides ? JSON.parse(rawSlides) : [];
  let current = 0;

  function renderSlide(index) {
    if (!slides[index] || !imageEl) {
      return;
    }

    const slide = slides[index];
    const imagePath = slide.src || `${imageBasePath}${slide.file}`;
    imageEl.src = imagePath;
    imageEl.alt = slide.alt;
  }

  if (slides.length > 0) {
    renderSlide(current);
  }

  let autoRotateTimer = null;

  function goToNextSlide() {
    current = (current + 1) % slides.length;
    renderSlide(current);
  }

  function goToPrevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    renderSlide(current);
  }

  function restartAutoRotate() {
    if (autoRotateTimer) {
      clearInterval(autoRotateTimer);
    }

    if (slides.length > 1) {
      autoRotateTimer = setInterval(goToNextSlide, 3500);
    }
  }

  if (slides.length > 1) {
    const controls = document.createElement("div");
    controls.className = "gallery-controls";
    controls.innerHTML = `
      <button type="button" class="gallery-btn" data-gallery-prev aria-label="Previous image">←</button>
      <button type="button" class="gallery-btn" data-gallery-next aria-label="Next image">→</button>
    `;
    gallery.appendChild(controls);

    const prevBtn = controls.querySelector("[data-gallery-prev]");
    const nextBtn = controls.querySelector("[data-gallery-next]");

    prevBtn.addEventListener("click", () => {
      goToPrevSlide();
      restartAutoRotate();
    });

    nextBtn.addEventListener("click", () => {
      goToNextSlide();
      restartAutoRotate();
    });

    restartAutoRotate();
  }
}
