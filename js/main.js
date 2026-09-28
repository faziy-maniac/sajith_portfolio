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
     5. HERO POLAROID COLLAGE PARALLAX (DESKTOP ONLY)
     -------------------------------------------------------------------------- */
  const heroSection = document.getElementById('hero');
  const heroCollage = document.getElementById('hero-collage');
  const collageItems = document.querySelectorAll('.hero-collage .collage-item');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroSection && heroCollage && collageItems.length > 0 && !prefersReducedMotion) {
    if (window.innerWidth >= 1025) {
      let isHeroHovered = false;

      heroSection.addEventListener('mouseenter', () => {
        isHeroHovered = true;
      });

      heroSection.addEventListener('mousemove', (e) => {
        if (!isHeroHovered) return;
        const rect = heroCollage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        collageItems.forEach((item) => {
          const depth = parseFloat(item.getAttribute('data-parallax-depth')) || 0.03;
          const moveX = deltaX * depth * 35;
          const moveY = deltaY * depth * 35;
          let baseRot = 0;
          if (item.classList.contains('polaroid-1')) baseRot = -7;
          else if (item.classList.contains('polaroid-2')) baseRot = 6;
          else if (item.classList.contains('polaroid-3')) baseRot = -4;

          item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${baseRot}deg)`;
        });
      });

      heroSection.addEventListener('mouseleave', () => {
        isHeroHovered = false;
        collageItems.forEach((item) => {
          let baseRot = 0;
          if (item.classList.contains('polaroid-1')) baseRot = -7;
          else if (item.classList.contains('polaroid-2')) baseRot = 6;
          else if (item.classList.contains('polaroid-3')) baseRot = -4;
          item.style.transform = `translate3d(0, 0, 0) rotate(${baseRot}deg)`;
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     6. EA FC / FIFA STYLE PLAYER CARD 3D TILT EFFECT
     -------------------------------------------------------------------------- */
  const fifaCard = document.querySelector('.fifa-card');

  if (fifaCard && window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
    fifaCard.addEventListener('mousemove', (e) => {
      const rect = fifaCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      fifaCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    fifaCard.addEventListener('mouseleave', () => {
      fifaCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  /* --------------------------------------------------------------------------
     7. MATCHDAY MOMENTS FILM-STRIP CONTROLLER (SCROLL, DRAG & ARROWS)
     -------------------------------------------------------------------------- */
  const momentsTrack = document.getElementById('moments-track');
  const momentsPrev = document.getElementById('moments-prev');
  const momentsNext = document.getElementById('moments-next');
  let isMomentDragging = false;
  let momentStartX = 0;
  let momentScrollLeft = 0;
  let momentMoved = 0;

  if (momentsTrack) {
    if (momentsPrev) {
      momentsPrev.addEventListener('click', () => {
        momentsTrack.scrollBy({ left: -340, behavior: 'smooth' });
      });
    }
    if (momentsNext) {
      momentsNext.addEventListener('click', () => {
        momentsTrack.scrollBy({ left: 340, behavior: 'smooth' });
      });
    }

    // Mouse drag-to-scroll support
    momentsTrack.addEventListener('mousedown', (e) => {
      isMomentDragging = true;
      momentMoved = 0;
      momentStartX = e.pageX - momentsTrack.offsetLeft;
      momentScrollLeft = momentsTrack.scrollLeft;
      momentsTrack.style.cursor = 'grabbing';
      momentsTrack.style.scrollBehavior = 'auto';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMomentDragging) return;
      const x = e.pageX - momentsTrack.offsetLeft;
      momentMoved = Math.abs(x - momentStartX);
      const walk = (x - momentStartX) * 1.5;
      momentsTrack.scrollLeft = momentScrollLeft - walk;
    });

    const endMomentDrag = () => {
      if (isMomentDragging) {
        isMomentDragging = false;
        momentsTrack.style.cursor = 'grab';
        momentsTrack.style.scrollBehavior = 'smooth';
      }
    };

    window.addEventListener('mouseup', endMomentDrag);
    momentsTrack.addEventListener('mouseleave', endMomentDrag);
  }

  /* --------------------------------------------------------------------------
     8. GALLERY CATEGORY FILTERS & SCOREBOARD COUNTER
     -------------------------------------------------------------------------- */
  const filterChips = document.querySelectorAll('.filter-chip');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryCounter = document.getElementById('gallery-counter');
  const filterStatusLabel = document.getElementById('scoreboard-filter-status');

  const animateGalleryCounter = (targetVal) => {
    if (!galleryCounter) return;
    const startVal = parseInt(galleryCounter.textContent, 10) || 0;
    if (startVal === targetVal) return;

    const duration = 500;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(startVal + (targetVal - startVal) * ease);
      galleryCounter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        galleryCounter.textContent = targetVal;
      }
    };
    requestAnimationFrame(update);
  };

  const applyGalleryFilter = (category) => {
    let visibleCount = 0;
    galleryCards.forEach((card) => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    animateGalleryCounter(visibleCount);

    if (filterStatusLabel) {
      filterStatusLabel.textContent = `FILTER: ${category.toUpperCase()}`;
    }
  };

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filterChips.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');

      const filter = chip.getAttribute('data-filter') || 'matches';
      applyGalleryFilter(filter);
    });
  });

  // Default to Matches filter initially as required
  applyGalleryFilter('matches');

  // Also trigger counter animation when gallery scrolls into view
  const gallerySection = document.getElementById('gallery');
  if (gallerySection && 'IntersectionObserver' in window) {
    let galleryScrolledIn = false;
    const galleryObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !galleryScrolledIn) {
        galleryScrolledIn = true;
        const visibleCards = document.querySelectorAll('.gallery-card:not(.hidden)').length;
        animateGalleryCounter(visibleCards);
      }
    }, { threshold: 0.2 });
    galleryObserver.observe(gallerySection);
  }

  /* --------------------------------------------------------------------------
     9. FULLSCREEN LIGHTBOX MODAL (WITH FOCUS TRAP, ARROW KEYS & TOUCH SWIPE)
     -------------------------------------------------------------------------- */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let activeLightboxItems = [];
  let currentLightboxIndex = 0;
  let lastFocusedElement = null;

  const getCardData = (el) => {
    const fullSrc = el.getAttribute('data-full') || el.querySelector('img')?.getAttribute('src') || '';
    const alt = el.querySelector('img')?.getAttribute('alt') || 'Mohammed Sajith G Match Photo';
    const caption = el.querySelector('.gallery-caption, .moment-title')?.textContent.trim() || 'Match Action';
    const cat = el.querySelector('.gallery-cat-tag, .moment-category-pill')?.textContent.trim() || '';
    return { src: fullSrc, alt: alt, caption: caption, category: cat };
  };

  const openLightbox = (itemsArray, startIndex) => {
    if (!lightboxModal || itemsArray.length === 0) return;
    lastFocusedElement = document.activeElement;
    activeLightboxItems = itemsArray;
    currentLightboxIndex = startIndex >= 0 && startIndex < itemsArray.length ? startIndex : 0;

    renderLightboxContent();

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (lightboxClose) {
      setTimeout(() => lightboxClose.focus(), 50);
    }
  };

  const closeLightbox = () => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const renderLightboxContent = () => {
    const data = activeLightboxItems[currentLightboxIndex];
    if (!data) return;

    if (lightboxImg) {
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
    }
    if (lightboxCaption) {
      lightboxCaption.innerHTML = `${data.category ? `<span style="color:var(--turf-lime); font-size:0.85em; display:block; margin-bottom:2px;">${data.category}</span>` : ''}${data.caption}`;
    }
    if (lightboxCounter) {
      const currentNum = String(currentLightboxIndex + 1).padStart(2, '0');
      const totalNum = String(activeLightboxItems.length).padStart(2, '0');
      lightboxCounter.textContent = `MATCH PHOTO ${currentNum} / ${totalNum}`;
    }
  };

  const showNextLightbox = () => {
    if (activeLightboxItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % activeLightboxItems.length;
    renderLightboxContent();
  };

  const showPrevLightbox = () => {
    if (activeLightboxItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + activeLightboxItems.length) % activeLightboxItems.length;
    renderLightboxContent();
  };

  // Bind Gallery Cards
  galleryCards.forEach((card) => {
    const handleCardOpen = (e) => {
      const visibleCards = Array.from(document.querySelectorAll('.gallery-card:not(.hidden)'));
      const items = visibleCards.map(getCardData);
      const clickedIdx = visibleCards.indexOf(card);
      openLightbox(items, clickedIdx !== -1 ? clickedIdx : 0);
    };

    card.addEventListener('click', handleCardOpen);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardOpen(e);
      }
    });
  });

  // Bind Matchday Moment Cards
  const momentCards = document.querySelectorAll('.moment-card');
  momentCards.forEach((momentCard, idx) => {
    const handleMomentOpen = (e) => {
      if (momentMoved > 10) return;
      const items = Array.from(momentCards).map(getCardData);
      openLightbox(items, idx);
    };

    momentCard.addEventListener('click', handleMomentOpen);
    momentCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleMomentOpen(e);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightbox);

  // Close on backdrop click
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-inner')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation & Focus Trapping for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrevLightbox();
    } else if (e.key === 'Tab') {
      // Focus trap within modal
      const focusableElements = [lightboxClose, lightboxPrev, lightboxNext].filter(Boolean);
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
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
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) {
            showPrevLightbox();
          } else {
            showNextLightbox();
          }
        }
      },
      { passive: true }
    );
  }

  /* --------------------------------------------------------------------------
     10. QUICK COPY EMAIL TO CLIPBOARD WITH TOAST FEEDBACK
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
     11. DYNAMIC COPYRIGHT YEAR
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
