/* в этот файл добавляет скрипты*/
new Swiper('.hero__slider', {
  loop: true,
  pagination: {
    el: '.hero__pagination',
    clickable: true,
  },
  slidesPerView: 1,
  effect: 'fade',
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
