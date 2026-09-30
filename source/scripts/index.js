/* в этот файл добавляет скрипты*/
function updateInert(swiper) {
  swiper.slides.forEach((slide) => {
    const isActive = slide.classList.contains('swiper-slide-active');
    if (isActive) {
      slide.removeAttribute('inert');
      // Добавляем tabindex="-1", чтобы слайд мог принимать программный фокус
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
    },
    slideChange() {
      setTimeout(() => updateInert(this), 0);
    },
    click(swiper, event) {
      // Если клик был НЕ по кнопке/ссылке/пагинации
      const isInteractive = event.target.closest('a, button, .swiper-pagination-bullet');

      if (!isInteractive) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide) {
          activeSlide.focus({preventScroll: true}); // Переносим фокус на сам слайд
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
