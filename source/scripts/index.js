/* ============================================================
   LIFETOUR — основной скрипт страницы
   Слайдеры , доступность, обработка клавиатуры
   ============================================================ */

(function () {


  /* ===== Утилита доступности слайдов ===== */
  // Скрывает неактивные слайды от скринридеров и клавиатуры
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

  /* ===== Hero slider ===== */
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
          const activeSlide = swiper.slides.find((slide) =>
            slide.classList.contains('swiper-slide-active'),
          );
          if (activeSlide) {
            activeSlide.focus({preventScroll: true});
          }
        }
      },
    },
  });

  /* ===== Tours slider ===== */
  new Swiper('.tours__slider', {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 30,
    loop: false,
    navigation: {
      prevEl: '.tours__controls .arrow-button--prev',
      nextEl: '.tours__controls .arrow-button--next',
      disabledClass: 'arrow-button--disabled',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        loop: true,
      },
      768: {slidesPerView: 2, spaceBetween: 18},
      1440: {slidesPerView: 3, spaceBetween: 30},
    },
  });

  /* ===== Education slider ===== */
  new Swiper('.education__slider', {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 20,
    loop: false,
    navigation: {
      prevEl: '.education__controls .arrow-button--prev',
      nextEl: '.education__controls .arrow-button--next',
      disabledClass: 'arrow-button--disabled',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
      },
      768: {slidesPerView: 3, spaceBetween: 25},
      1440: {slidesPerView: 4, spaceBetween: 20},
    },
  });

  /* ===== Reviews slider ===== */
  new Swiper('.reviews__slider', {
    slidesPerView: 1,
    spaceBetween: 120,
    slidesPerGroup: 1,
    navigation: {
      prevEl: '.reviews__controls .arrow-button--prev',
      nextEl: '.reviews__controls .arrow-button--next',
      disabledClass: 'arrow-button--disabled',
    },
    breakpoints: {
      320: {spaceBetween: 15},
      768: {spaceBetween: 20},
      1440: {spaceBetween: 120},
    },
  });

  /* ===== Advantages slider ===== */
  // Cлайдер только на десктопе.
  // На планшете/мобилке Swiper выключен — работает CSS-сетка.
  // Для корректного зацикливания клонируем 5 слайдов до 10.
  const advantagesWrapper = document.querySelector('.advantages__slider .swiper-wrapper');

  if (advantagesWrapper && advantagesWrapper.children.length === 5) {
    const originalSlides = Array.from(advantagesWrapper.children);
    originalSlides.forEach((slide) => {
      advantagesWrapper.appendChild(slide.cloneNode(true));
    });
  }

  new Swiper('.advantages__slider', {
    enabled: false,
    slidesPerView: 'auto',
    slidesPerGroup: 2,
    spaceBetween: 30,
    loop: true,
    navigation: {
      prevEl: '.advantages__controls .arrow-button--prev',
      nextEl: '.advantages__controls .arrow-button--next',
      disabledClass: 'arrow-button--disabled',
    },
    breakpoints: {
      320: {enabled: false},
      768: {enabled: false},
      1440: {
        enabled: true,
        centeredSlides: true,
        initialSlide: 2,
        loopAddBlankSlides: false,
      },
    },
  });

  /* ===== Gallery slider ===== */
  (function () {
    const gallerySliderEl = document.querySelector('.gallery__slider');
    if (!gallerySliderEl) {
      return;
    }

    const desktopMedia = window.matchMedia('(min-width: 1440px)');
    let gallerySwiper = null;

    function initGallerySwiper() {
      if (desktopMedia.matches) {
      // 1. На десктопе (1440px+): если Swiper активен, уничтожаем его
        if (gallerySwiper) {
          gallerySwiper.destroy(true, true);
          gallerySwiper = null;
        }
      } else {
      // 2. На мобильных и планшетах (< 1440px): создаём Swiper, если его ещё нет
        if (!gallerySwiper) {
          gallerySwiper = new Swiper(gallerySliderEl, {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 5,
            loop: true,
            navigation: {
              prevEl: '.gallery__controls .arrow-button--prev',
              nextEl: '.gallery__controls .arrow-button--next',
              disabledClass: 'arrow-button--disabled',
            },
            breakpoints: {
              320: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
            },
          });
        }
      }
    }

    // Запуск проверки при загрузке страницы
    initGallerySwiper();

    // Отслеживание изменений ширины экрана (ресайз)
    if (desktopMedia.addEventListener) {
      desktopMedia.addEventListener('change', initGallerySwiper);
    } else {
      desktopMedia.addListener(initGallerySwiper);
    }
  })();

  /* ===== Обработка клавиатуры ===== */
  // Пробел/Enter на интерактивных элементах — эмуляция клика
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Space' || evt.key === ' ') {
      const isInteractive = evt.target.closest(
        'button, a, [role="button"], .swiper-pagination-bullet, .arrow-button',
      );
      if (isInteractive) {
        evt.preventDefault();
        evt.target.click();
      }
    }
  });
})();
