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
    a11y: {
      enabled: true,
      notification: false,
      slideRole: 'listitem',
    },
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
            if (evt.key === ' ') {
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
          const activeSlide = Array.from(swiper.slides).find((slide) =>
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
    a11y: {
      enabled: true,
      notification: false,
      slideRole: 'listitem',
    },
    navigation: {
      prevEl: '.tours__controls .arrow-button--prev',
      nextEl: '.tours__controls .arrow-button--next',
      disabledClass: 'arrow-button--disabled',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  /* ===== Education slider ===== */
  const educationSwiper = new Swiper('.education__slider', {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 20,
    loop: false,
    a11y: {
      enabled: true,
      notification: false,
      slideRole: 'listitem',
    },
    navigation: {
      prevEl: '.education__controls .arrow-button--prev',
      nextEl: '.education__controls .arrow-button--next',
      disabledClass: 'arrow-button--disabled',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });

  /* ===== Reviews slider ===== */
  const reviewsSwiper = new Swiper('.reviews__slider', {
    slidesPerView: 1,
    spaceBetween: 120,
    slidesPerGroup: 1,
    a11y: {
      enabled: true,
      notification: false,
      slideRole: 'listitem',
    },
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
    let originalSlidesCount = 0;

    function initAdvantagesSwiper() {
      if (desktopMedia.matches) {
        if (!advantagesSwiper) {
          const wrapper = advantagesSliderEl.querySelector('.swiper-wrapper');

          if (wrapper) {
            originalSlidesCount = wrapper.children.length;
            Array.from(wrapper.children).forEach((slide) => {
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
            a11y: {
              enabled: true,
              notification: false,
              slideRole: 'listitem',
            },
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
        if (wrapper) {
          while (wrapper.children.length > originalSlidesCount) {
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
          a11y: {
            enabled: true,
            notification: false,
            slideRole: 'listitem',
          },
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

  /* ===== Форма обратной связи ===== */
  (function () {
    const form = document.querySelector('.questions__form');
    if (!form) {
      return;
    }

    const inputs = form.querySelectorAll('.questions__input');

    inputs.forEach((input) => {
    // Браузер вызывает "invalid" при попытке отправки невалидного поля
      input.addEventListener('invalid', () => {
        input.classList.add('questions__input--error');
      });

      // Снимаем подсветку при вводе
      input.addEventListener('input', () => {
        input.classList.remove('questions__input--error');
      });
    });
  })();

  /* ===== Бургер-меню ===== */
  (function () {
    const header = document.querySelector('.header');
    const burgerButton = document.querySelector('.header__burger');

    if (!header || !burgerButton) {
      return;
    }

    const desktopMedia = window.matchMedia('(min-width: 1440px)');

    function openMenu() {
      header.classList.add('header--open');
      burgerButton.setAttribute('aria-expanded', 'true');
      burgerButton.setAttribute('aria-label', 'Закрыть меню');
      document.body.classList.add('no-scroll');
    }

    function closeMenu() {
      header.classList.remove('header--open');
      burgerButton.setAttribute('aria-expanded', 'false');
      burgerButton.setAttribute('aria-label', 'Открыть меню');
      document.body.classList.remove('no-scroll');
    }

    burgerButton.addEventListener('click', () => {
      const isOpen = header.classList.contains('header--open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' && header.classList.contains('header--open')) {
        closeMenu();
        burgerButton.focus();
      }
    });

    const overlay = document.querySelector('.header__overlay');

    if (overlay) {
      overlay.addEventListener('click', () => {
        if (header.classList.contains('header--open')) {
          closeMenu();
        }
      });
    }

    // Сбрасываем состояние меню при переходе на десктопную ширину
    function handleDesktopChange(evt) {
      if (evt.matches && header.classList.contains('header--open')) {
        closeMenu();
      }
    }

    desktopMedia.addEventListener('change', handleDesktopChange);

    const headerNav = header.querySelector('.header__nav');

    if (headerNav) {
      headerNav.addEventListener('click', (evt) => {
        const link = evt.target.closest('.main-nav__link');
        if (link && header.classList.contains('header--open')) {
          closeMenu();
        }
      });
    }
  })();

  // Перемещаем все уведомления Swiper в body, чтобы они не ломали валидацию списков
  [heroSwiper, toursSwiper, educationSwiper, reviewsSwiper].forEach((swiper) => {
    if (!swiper) {
      return;
    }
    if (swiper.wrapperEl) {
      swiper.wrapperEl.setAttribute('role', 'list');
    }
    swiper.slides.forEach((slide) => {
      slide.setAttribute('role', 'listitem');
    });
  });

  // Проверяем, что все слайдеры инициализированы
  if (heroSwiper && toursSwiper && educationSwiper && reviewsSwiper) {
    document.documentElement.classList.add('swipers-ready');
  }
})();
