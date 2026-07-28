// =========================================================
// GEMILANG KATUN OUTBOUND — script.js
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // 1. AOS SCROLL ANIMATION
  // ============================================================
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  // ============================================================
  // 2. NAVBAR SCROLL EFFECT
  // ============================================================
  var navbar = document.getElementById('mainNav');
  var backToTop = document.getElementById('backToTop');

  function handleScroll() {
    var scrolled = window.scrollY > 40;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrolled);
    }

    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 400);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ============================================================
  // 3. BACK TO TOP BUTTON
  // ============================================================
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 4. ACTIVE NAV LINK HIGHLIGHT
  // ============================================================
  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('.gko-navbar .nav-link');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          // Cek apakah href mengandung id (untuk link seperti #tentang)
          var href = link.getAttribute('href');
          if (href === '#' + id || (href && href.includes('#' + id))) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (sec) { observer.observe(sec); });

  // ============================================================
  // 5. AUTO-CLOSE MOBILE NAVBAR
  // ============================================================
  var navMenu = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu && navMenu.classList.contains('show')) {
        var collapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapse.hide();
      }
    });
  });

  // ============================================================
  // 6. LIGHTBOX GALERI — KLIK GAMBAR UNTUK MEMPERBESAR
  // ============================================================
  var galleryItems = document.querySelectorAll('.gko-gallery-item');
  var modal = document.getElementById('galleryModal');
  var lightboxImage = document.getElementById('lightboxImage');
  var lightboxCaption = document.getElementById('lightboxCaption');

  if (modal && lightboxImage) {
    // Inisialisasi modal Bootstrap
    var bsModal;
    try {
      bsModal = new bootstrap.Modal(modal, {
        keyboard: true,
        backdrop: true
      });
    } catch (e) {
      console.warn('Bootstrap Modal gagal diinisialisasi:', e);
    }

    // Fungsi untuk membuka lightbox
    function openLightbox(imgElement) {
      if (!imgElement || !bsModal) return;

      var imgSrc = imgElement.getAttribute('src') || '';
      var imgAlt = imgElement.getAttribute('alt') || 'Galeri Gemilang Katun Outbound';

      // Jika gambar dari picsum, gunakan ukuran lebih besar
      if (imgSrc.includes('picsum.photos')) {
        imgSrc = imgSrc.replace(/\/\d+\/\d+/, '/1200/900');
      }

      lightboxImage.src = imgSrc;
      lightboxImage.alt = imgAlt;
      if (lightboxCaption) {
        lightboxCaption.textContent = imgAlt;
      }

      bsModal.show();

      var modalBody = modal.querySelector('.modal-body');
      if (modalBody) modalBody.scrollTop = 0;
    }

    // Event listener untuk setiap item galeri
    galleryItems.forEach(function (item) {
      // Klik untuk membuka
      item.addEventListener('click', function (e) {
        var img = this.querySelector('img');
        if (img) {
          openLightbox(img);
        }
      });

      // Keyboard support (Enter / Space)
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    // Tutup modal dengan ESC sudah otomatis dari Bootstrap
    console.log('✅ Lightbox galeri siap digunakan!');
  } else {
    console.warn('⚠️ Lightbox modal tidak ditemukan di halaman ini');
  }

  // ============================================================
  // 7. TOMBOL "Lihat Galeri Lengkap" — SCROLL HALUS (opsional)
  // ============================================================
  var galleryBtn = document.querySelector('a[href="galeri.html"]');
  // Cari tombol dengan teks "Lihat Galeri Lengkap"
  var allButtons = document.querySelectorAll('.btn');
  var galleryLinkBtn = null;
  allButtons.forEach(function (btn) {
    if (btn.textContent && btn.textContent.includes('Lihat Galeri Lengkap')) {
      galleryLinkBtn = btn;
    }
  });

  if (galleryLinkBtn) {
    galleryLinkBtn.addEventListener('click', function (e) {
      // Biarkan arahkan ke galeri.html (tidak di-prevent)
      console.log('🔗 Tombol "Lihat Galeri Lengkap" diklik → menuju galeri.html');
    });
  }

  // ============================================================
  // 8. SMOOTH SCROLL UNTUK LINK ANCHOR (opsional)
  // ============================================================
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        var offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  console.log('✅ Gemilang Katun Outbound — script siap!');
});