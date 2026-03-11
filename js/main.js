// Mobile menu toggle
(function () {
  'use strict';

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const header = document.querySelector('.header');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  // Mobile menu toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('is-open');
      document.body.style.overflow = isOpen ? '' : 'hidden';

      // Focus trap: focus first link when menu opens
      if (!isOpen && mobileLinks.length > 0) {
        mobileLinks[0].focus();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });

    // Focus trap inside mobile menu
    mobileNav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !mobileNav.classList.contains('is-open')) return;

      const focusable = mobileNav.querySelectorAll('a, button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // Close mobile menu on link click
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Sticky header shadow on scroll
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }, { passive: true });
  }

  // Active nav link based on current page
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        target.focus({ preventScroll: true });
      }
    });
  });
})();
