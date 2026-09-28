/* в этот файл добавляет скрипты*/
const heroSlider = new Swiper('.hero__slider', {
  loop: true,
  pagination: {
    el: '.hero__pagination',
    clickable: true,
  },
  slidesPerView: 1,
  effect: 'fade',
});
