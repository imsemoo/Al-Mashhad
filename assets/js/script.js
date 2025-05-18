$(document).ready(function () {
  $(window).on("scroll", function () {
    $(".navbar").toggleClass("fixed-nav", $(window).scrollTop() > 50);
  });
  // Toggle search input visibility when search icon is clicked
  document.addEventListener('DOMContentLoaded', function () {
    const searchToggle = document.querySelector('.search-toggle');
    const searchInputContainer = document.querySelector('.search-input-container');
    searchToggle.addEventListener('click', function () {
      searchInputContainer.classList.toggle('active');
    });
  });

  $(".articlesSlider").owlCarousel({
    loop: true,
    rtl: true,
    margin: 15,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      992: {
        items: 1
      }
    }
  });
  $(".owl-about-us").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  });
  // عند تحميل الصفحة بالكامل
  $(window).on('load', function () {
    $('#preloadr').fadeOut(500); // بيخفي اللودر بعد التحميل بـ 0.5 ثانية
  });

  var $loader = $('#preloadr'),
    isHidden = false;

  /**
   * Fade out the loader element once called.
   * Ensures we only perform the fadeOut() once.
   */
  function hideLoader() {
    if (isHidden) return;
    isHidden = true;
    $loader.fadeOut(500);
  }

  // When all page assets (images, scripts, etc.) have finished loading, hide the loader.
  $(window).on('load', hideLoader);

  // Fallback: If window.load never fires (e.g. due to a hung resource),
  // automatically hide the loader after 10 seconds.
  setTimeout(hideLoader, 10000);

  // For snappier UX, fade the loader out shortly after the DOM is ready,
  // even before other assets finish loading.
  $(document).ready(function () {
    setTimeout(hideLoader, 2000);
  });

  $(".mobile-menu-toggle").on("click", function () {
    $(".navbar-links-mobile").addClass("active");
    $("body").addClass("mobile-menu-open");
  });

  $(".mobile-close").on("click", function () {
    $(".navbar-links-mobile").removeClass("active");
    $("body").removeClass("mobile-menu-open");
  });

  // لو ضغط المستخدم بره القائمة
  $(document).on("click", function (e) {
    if (!$(e.target).closest('.navbar-links-mobile, .mobile-menu-toggle').length) {
      $(".navbar-links-mobile").removeClass("active");
      $("body").removeClass("mobile-menu-open");
    }
  });

  var owl = $('.hero-carousel').owlCarousel({
    items: 1,
    loop: true,
    autoplay: false,
    dots: false,
    nav: false,
    rtl: true,
    smartSpeed: 600,

  });

  // Hook up your custom buttons
  $('.custom-next').click(function () {
    owl.trigger('next.owl.carousel');
  });

  $('.custom-prev').click(function () {
    owl.trigger('prev.owl.carousel');
  });
  $('.news-thumb').on('click', function () {
    var index = $(this).data('slide');
    $('.news-thumb').removeClass('active');
    $(this).addClass('active');
    owl.trigger('to.owl.carousel', [index, 500]);
  });

  owl.on('changed.owl.carousel', function (event) {
    var index = event.item.index - event.relatedTarget._clones.length / 2;
    if (index >= event.item.count) { index = 0; }
    if (index < 0) { index = event.item.count - 1; }
    $('.news-thumb').removeClass('active');
    $('.news-thumb[data-slide="' + index + '"]').addClass('active');
  });

  // =========================================================
  //      Enhanced WaveSurfer.js Podcast Player Logic
  // =========================================================
  document.querySelectorAll('.podcast-player').forEach(container => {
    const ws = WaveSurfer.create({
      container: container.querySelector('.pp-wave'),
      waveColor: '#DCDCDC',
      progressColor: '#3AB4FF',
      barWidth: 2,
      height: 38,
      cursorWidth: 1,
      cursorColor: '#999'
    });
    ws.load(container.dataset.src);

    const play = container.querySelector('.pp-play');
    const back = container.querySelector('.pp-back');
    const forward = container.querySelector('.pp-forward');
    const mute = container.querySelector('.pp-mute');
    const curr = container.querySelector('.pp-current');
    const dur = container.querySelector('.pp-duration');

    const formatTime = s => new Date(s * 1000).toISOString().substr(14, 5);

    ws.on('ready', () => {
      dur.textContent = formatTime(ws.getDuration());
      ws.setVolume(1);
    });

    play.addEventListener('click', () => ws.playPause());
    ws.on('play', () => play.innerHTML = '<i class="fa-solid fa-pause"></i>');
    ws.on('pause', () => play.innerHTML = '<i class="fa-solid fa-play"></i>');
    ws.on('finish', () => play.innerHTML = '<i class="fa-solid fa-play"></i>');

    back.addEventListener('click', () => {
      const t = Math.max(ws.getCurrentTime() - 10, 0);
      ws.seekTo(t / ws.getDuration());
    });

    forward.addEventListener('click', () => {
      const t = Math.min(ws.getCurrentTime() + 10, ws.getDuration());
      ws.seekTo(t / ws.getDuration());
    });

    let lastVol = 1;
    let isMuted = false;
    mute.addEventListener('click', () => {
      isMuted = !isMuted;
      if (isMuted) {
        lastVol = ws.getVolume();
        ws.setVolume(0);
        mute.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      } else {
        ws.setVolume(lastVol);
        mute.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    });

    ws.on('audioprocess', () => {
      curr.textContent = formatTime(ws.getCurrentTime());
    });
  });
});
