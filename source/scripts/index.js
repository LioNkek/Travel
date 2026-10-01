/* в этот файл добавляет скрипты*/
function updateInert(swiper) {
  swiper.slides.forEach((slide) => {
    const isActive = slide.classList.contains('swiper-slide-active');
    if (isActive) {
      slide.removeAttribute('inert');
      slide.setAttribute('tabindex', '-1');
    } else {
      slide.setAttribute('inert', '');
      slide.removeAttribute('tabindex');
    }
  });
}

new Swiper('.hero__slider', {
  loop: true,
  pagination: {
    el: '.hero__pagination',
    clickable: true,
  },
  effect: 'fade',
  on: {
    init() {
      updateInert(this);
      if (this.pagination && this.pagination.el) {
        this.pagination.el.addEventListener('keydown', (evt) => {
          if (evt.code === 'Space' || evt.key === ' ') {
            evt.preventDefault();
          }
        });
      }
    },
    slideChange() {
      setTimeout(() => updateInert(this), 0);
    },
    click(swiper, event) {
      const isInteractive = event.target.closest('a, button, .swiper-pagination-bullet');

      if (!isInteractive) {
        const activeSlide = swiper.slides.find((slide) => slide.classList.contains('swiper-slide-active'));
        if (activeSlide) {
          activeSlide.focus({preventScroll: true});
        }
      }
    },
  },
});

new Swiper('.tours__slider', {
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 30,
  navigation: {
    prevEl: '.arrow-button--prev',
    nextEl: '.arrow-button--next',
    disabledClass: 'arrow-button--disabled',
  },
  breakpoints: {
    320: {slidesPerView: 1},
    768: {slidesPerView: 2, spaceBetween: 18},
    1440: {slidesPerView: 3, spaceBetween: 30},
  },
});

new Swiper('.education__slider', {
  slidesPerView: 4,
  slidesPerGroup: 1,
  spaceBetween: 20,
  navigation: {
    prevEl: '.education__controls .arrow-button--prev',
    nextEl: '.education__controls .arrow-button--next',
    disabledClass: 'arrow-button--disabled',
  },
  breakpoints: {
    320: {slidesPerView: 1, spaceBetween: 20},
    768: {slidesPerView: 3, spaceBetween: 25},
    1440: {slidesPerView: 4, spaceBetween: 20},
  },
});

// Единый обработчик доступности для клавиатуры (Пробел и Enter)
document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Space' || evt.key === ' ') {
    const isInteractive = evt.target.closest('button, a, [role="button"], .swiper-pagination-bullet, .arrow-button');

    if (isInteractive) {
      evt.preventDefault();
      evt.target.click();
    }
  }
});
