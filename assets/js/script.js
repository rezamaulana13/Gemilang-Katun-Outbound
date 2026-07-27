// =========================================================
// GEMILANG KATUN OUTBOUND — script.js
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  // Init AOS scroll animation
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  var navbar = document.getElementById('mainNav');
  var backToTop = document.getElementById('backToTop');

  function handleScroll() {
    var scrolled = window.scrollY > 40;

    // Navbar background on scroll
    if (navbar) {
      navbar.classList.toggle('scrolled', scrolled);
    }

    // Back to top button visibility
    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 400);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Highlight active nav link based on section in view
  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('.gko-navbar .nav-link');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (sec) { observer.observe(sec); });

  // Auto-close mobile navbar after clicking a link
  var navMenu = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('show')) {
        var collapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapse.hide();
      }
    });
  });

});