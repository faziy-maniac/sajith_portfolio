/**
 * MOHAMMED SAJITH G - PERSONAL PORTFOLIO
 * Main JavaScript Controller
 * High-performance, accessible, vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. PITCH SCROLL PROGRESS BAR & STICKY HEADER
     -------------------------------------------------------------------------- */
  const progressBar = document.getElementById('pitch-progress-bar');
  const siteHeader = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Active navigation link highlighting based on current scroll position
    let currentSectionId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollTop >= top && scrollTop < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION MENU (HAMBURGER)
     -------------------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.contains('open');
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link, .nav-cta').forEach((item) => {
      item.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu();
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu();
        navToggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. SUBSTITUTION SLIDE-IN ANIMATION (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const subSlideElements = document.querySelectorAll('.sub-slide-in');

  if ('IntersectionObserver' in window) {
    const subObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    subSlideElements.forEach((el) => subObserver.observe(el));
  } else {
    subSlideElements.forEach((el) => el.classList.add('in-view'));
  }

  /* --------------------------------------------------------------------------
     4. SCOREBOARD STATS COUNTER ANIMATION
     -------------------------------------------------------------------------- */
  const counterElements = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;

  const runCounters = () => {
    if (countersAnimated) return;
    countersAnimated = true;

    counterElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(ease * target);

        counter.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const statsSection = document.getElementById('about');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runCounters();
          statsObserver.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    statsObserver.observe(statsSection);
  } else {
    runCounters();
  }

  /* --------------------------------------------------------------------------
     5. EA FC / FIFA STYLE PLAYER CARD 3D TILT EFFECT
     -------------------------------------------------------------------------- */
  const fifaCard = document.querySelector('.fifa-card');

  if (fifaCard && window.matchMedia('(hover: hover)').matches) {
    fifaCard.addEventListener('mousemove', (e) => {
      const rect = fifaCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12; // tilt angle
      const rotateY = ((x - centerX) / centerX) * 12;

      fifaCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    fifaCard.addEventListener('mouseleave', () => {
      fifaCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  /* --------------------------------------------------------------------------
     6. RESPONSIVE KEYBOARD & SWIPE LIGHTBOX FOR GALLERY
     -------------------------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  let lastFocusedElement = null;

  const galleryData = Array.from(galleryItems).map((item) => {
    const img = item.querySelector('.gallery-img');
    const caption = item.querySelector('.gallery-caption')?.textContent.trim() || 'Match Action';
    return {
      src: img?.getAttribute('src') || '',
      alt: img?.getAttribute('alt') || 'Mohammed Sajith G Match Photo',
      caption: caption
    };
  });

  const openLightbox = (index) => {
    if (!lightboxModal || !galleryData[index]) return;
    lastFocusedElement = document.activeElement;
    currentGalleryIndex = index;
    updateLightboxContent();

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (lightboxClose) lightboxClose.focus();
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const updateLightboxContent = () => {
    const data = galleryData[currentGalleryIndex];
    if (!data) return;

    if (lightboxImg) {
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = data.caption;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `MATCH PHOTO ${currentGalleryIndex + 1} OF ${galleryData.length}`;
    }
  };

  const showNextImage = () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent();
  };

  const showPrevImage = () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  };

  // Bind gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  // Close on backdrop click
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-inner')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });

  // Touch Swipe Support for Lightbox (Mobile)
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    lightboxModal.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchEndX - touchStartX;
        if (Math.abs(diffX) > 45) {
          if (diffX > 0) {
            showPrevImage();
          } else {
            showNextImage();
          }
        }
      },
      { passive: true }
    );
  }

  /* --------------------------------------------------------------------------
     7. QUICK COPY EMAIL TO CLIPBOARD WITH TOAST FEEDBACK
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('quick-copy-email');
  const toastMsg = document.getElementById('toast-msg');

  if (copyEmailBtn && toastMsg) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'mdsajith19@gmail.com';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for older browsers
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        toastMsg.textContent = '⚽ Email copied to clipboard: mdsajith19@gmail.com';
        toastMsg.classList.add('show');
        setTimeout(() => {
          toastMsg.classList.remove('show');
        }, 3200);
      } catch (err) {
        window.location.href = `mailto:${email}?subject=Hello%20Sajith!`;
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. DYNAMIC COPYRIGHT YEAR
     -------------------------------------------------------------------------- */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

/* --------------------------------------------------------------------------
   9. GLOBAL IMAGE FALLBACK HELPER
   Renders a high-contrast MSG avatar placeholder if any image fails to load
   -------------------------------------------------------------------------- */
window.handleImageError = function (img) {
  img.onerror = null;
  img.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><rect width='600' height='600' fill='%230B3D2E'/><circle cx='300' cy='300' r='220' stroke='%23B6F23C' stroke-width='4' fill='none' stroke-dasharray='16 8'/><circle cx='300' cy='300' r='12' fill='%23B6F23C'/><text x='300' y='325' font-family='Arial, sans-serif' font-size='100' font-weight='900' fill='%23B6F23C' text-anchor='middle' dominant-baseline='middle'>MSG</text><text x='300' y='410' font-family='Arial, sans-serif' font-size='22' font-weight='bold' fill='%23FFFFFF' text-anchor='middle' letter-spacing='4'>MOHAMMED SAJITH G</text></svg>`;
  img.alt = 'Mohammed Sajith G - Professional Footballer';
};
