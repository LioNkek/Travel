/* ============================================================
   LIFETOUR — основной скрипт страницы
   Слайдеры, доступность, обработка клавиатуры
   ============================================================ */

/* global Swiper */

(function () {

  /* ===== Утилита доступности слайдов ===== */
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
  const heroSwiper = new Swiper('.hero__slider', {
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
  const toursSwiper = new Swiper('.tours__slider', {
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
  const educationSwiper = new Swiper('.education__slider', {
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
  const reviewsSwiper = new Swiper('.reviews__slider', {
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
      768: {spaceBetween: 30},
      1440: {spaceBetween: 120},
    },
  });

  /* ===== Advantages slider ===== */
  (function () {
    const advantagesSliderEl = document.querySelector('.advantages__slider');
    if (!advantagesSliderEl) {
      return;
    }

    const desktopMedia = window.matchMedia('(min-width: 1440px)');
    let advantagesSwiper = null;

    function initAdvantagesSwiper() {
      if (desktopMedia.matches) {
        if (!advantagesSwiper) {
          const wrapper = advantagesSliderEl.querySelector('.swiper-wrapper');

          if (wrapper && wrapper.children.length > 0 && wrapper.children.length < 10) {
            const originalSlides = Array.from(wrapper.children);
            originalSlides.forEach((slide) => {
              wrapper.appendChild(slide.cloneNode(true));
            });
          }

          advantagesSwiper = new Swiper(advantagesSliderEl, {
            slidesPerView: 'auto',
            slidesPerGroup: 2,
            spaceBetween: 30,
            loop: true,
            centeredSlides: true,
            initialSlide: 2,
            navigation: {
              prevEl: '.advantages__controls .arrow-button--prev',
              nextEl: '.advantages__controls .arrow-button--next',
              disabledClass: 'arrow-button--disabled',
            },
          });
        }
      } else if (advantagesSwiper) {
        advantagesSwiper.destroy(true, true);
        advantagesSwiper = null;

        const wrapper = advantagesSliderEl.querySelector('.swiper-wrapper');
        if (wrapper && wrapper.children.length > 5) {
          while (wrapper.children.length > 5) {
            wrapper.removeChild(wrapper.lastChild);
          }
        }
      }
    }

    initAdvantagesSwiper();
    desktopMedia.addEventListener('change', initAdvantagesSwiper);
  })();

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
        if (gallerySwiper) {
          gallerySwiper.destroy(true, true);
          gallerySwiper = null;
        }
      } else if (!gallerySwiper) {
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

    initGallerySwiper();
    desktopMedia.addEventListener('change', initGallerySwiper);
  })();

  /* ===== Обработка клавиатуры ===== */
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

  // Проверяем, что все слайдеры инициализированы
  if (heroSwiper && toursSwiper && educationSwiper && reviewsSwiper) {
  // ок
  }
})();
