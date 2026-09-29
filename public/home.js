/* Bliztic Group — homepage behaviour
   Plain JavaScript, no dependencies, no build step.
   1. Scroll reveals    2. Operating-principle rail
   3. Mobile menu       4. Navigation tone over the dark hero
   5. Pinned hero       6. Ink rule on the page edge */
(function () {
  'use strict';

  var root = document.querySelector('.bz');
  if (!root) return;

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---------- 1. scroll reveals ---------- */
  var targets = Array.prototype.slice.call(document.querySelectorAll('[data-rv]'));

  function revealAll() {
    root.classList.remove('js-motion');
    targets.forEach(function (el) { el.classList.add('is-in'); });
  }

  if (reduce || typeof IntersectionObserver === 'undefined') {
    revealAll();
  } else {
    root.classList.add('js-motion');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });

    // safety net: if nothing has revealed shortly after load, show everything
    setTimeout(function () {
      var hero = document.querySelector('.hero[data-rv]');
      if (hero && !hero.classList.contains('is-in')) revealAll();
    }, 2500);
  }

  /* ---------- 2. operating-principle rail ---------- */
  var NAMES = ['Engineer Distribution', 'Build the System', 'Move With Speed',
               'Operate From Outcomes', 'Turn Intelligence Into Action'];
  var steps = document.querySelectorAll('[data-step]');
  var railBtns = document.querySelectorAll('.rail-list button');
  var railNums = document.querySelectorAll('.rail-num span');
  var railBar = document.querySelector('.rail-prog i');
  var railMobNum = document.querySelector('.rail-mobile b');
  var railMobName = document.querySelector('.rail-mobile span');
  var active = 1;

  function setActive(n) {
    if (n === active) return;
    active = n;
    railNums.forEach(function (el, i) {
      el.className = (i + 1 === n) ? 'is-active' : (i + 1 < n ? 'is-past' : '');
    });
    railBtns.forEach(function (b, i) { b.className = (i + 1 === n) ? 'is-active' : ''; });
    steps.forEach(function (s, i) { s.classList.toggle('is-current', i + 1 === n); });
    if (railBar) railBar.style.transform = 'scaleX(' + (n / 5) + ')';
    if (railMobNum) railMobNum.textContent = '0' + n + ' / 05';
    if (railMobName) railMobName.textContent = NAMES[n - 1];
  }

  if (steps.length && typeof IntersectionObserver !== 'undefined') {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = parseInt(e.target.getAttribute('data-step'), 10);
        if (n) setActive(n);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    steps.forEach(function (el) { io2.observe(el); });
  }

  document.querySelectorAll('[data-go]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var n = parseInt(btn.getAttribute('data-go'), 10);
      var el = document.getElementById('p' + n);
      if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      setActive(n);
    });
  });

  /* ---------- 3. mobile menu ---------- */
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('mobile-menu');
  var nav = document.querySelector('.nav');

  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.classList.toggle('is-open', open);
    if (nav) nav.classList.toggle('is-menu', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.textContent = open ? 'Close' : 'Menu';
  }
  if (menuBtn) menuBtn.addEventListener('click', function () {
    setMenu(!menu.classList.contains('is-open'));
  });
  document.querySelectorAll('[data-menu-close]').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  /* ---------- 4. navigation tone ---------- */
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');
  var ticking = false;

  function tone() {
    ticking = false;
    if (!nav) return;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var probe = y + 32;
    var overHero = hero && probe < hero.offsetTop + hero.offsetHeight;
    var overContact = contact && probe > contact.offsetTop;
    nav.classList.toggle('is-dark', !!(overHero || overContact));
  }
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(tone);
  }, { passive: true });
  window.addEventListener('resize', tone, { passive: true });
  tone();

  /* ---------- 5. pinned hero ----------
     A hero taller than the screen scrolls to its bottom edge, then pins. */
  function pinHero() {
    if (!hero) return;
    hero.style.top = Math.min(0, window.innerHeight - hero.offsetHeight) + 'px';
  }
  window.addEventListener('resize', pinHero, { passive: true });
  pinHero();

  /* ---------- 6. ink rule on the page edge ----------
     The line is drawn by scrolling: it starts as the page edge enters the
     screen and completes as the edge reaches the upper third. */
  var tide = document.querySelector('.tide-in');
  var inkPath = tide && tide.querySelector('.ink-dry');
  if (tide && inkPath && !reduce) {
    var inkTick = false;
    var drawInk = function () {
      inkTick = false;
      var vh = window.innerHeight;
      var top = tide.getBoundingClientRect().top;
      var p = (vh - top) / (vh * 0.62);
      p = Math.max(0, Math.min(1, p));
      p = 1 - Math.pow(1 - p, 2);
      tide.style.setProperty('--ink-draw', p.toFixed(4));
      tide.classList.toggle('is-dry', p >= 0.995);
    };
    var inkQueue = function () { if (!inkTick) { inkTick = true; window.requestAnimationFrame(drawInk); } };
    window.addEventListener('scroll', inkQueue, { passive: true });
    window.addEventListener('resize', inkQueue, { passive: true });
    drawInk();
  }
})();
