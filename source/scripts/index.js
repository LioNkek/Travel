/* в этот файл добавляет скрипты*/
function updateInert(swiper) {
  swiper.slides.forEach((slide) => {
    const isActive = slide.classList.contains('swiper-slide-active');
    if (isActive) {
      slide.removeAttribute('inert');
    } else {
      slide.setAttribute('inert', '');
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
