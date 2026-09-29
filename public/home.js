/* Bliztic Group — homepage behaviour
   Plain JavaScript, no dependencies, no build step.
   1. Scroll reveals    2. Operating-principle rail
   3. Mobile menu       4. Navigation tone over the dark hero
   5. Pinned hero       6. Ink rule on the page edge
   7. Phone fold-in                              */
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

  // On the homepage the header only ever sits over the hero, then is covered
  // by the page, so it keeps its hero styling the whole time and never
  // changes colour mid-scroll.
  var heroStage = document.querySelector('.hero-stage');

  function tone() {
    ticking = false;
    if (!nav) return;
    if (heroStage) { nav.classList.add('is-dark'); return; }
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
  var stage = document.querySelector('.hero-stage');
  var cover = document.querySelector('.tide-in');
  function pinHero() {
    if (!hero) return;
    hero.style.top = Math.min(0, window.innerHeight - hero.offsetHeight) + 'px';
    if (stage) stage.style.setProperty('--cover', window.innerHeight + 'px');
  }
  /* Once the page has fully covered the hero, take the hero and header out
     of the picture entirely; bring them back only near the top. */
  var heroGone = false;
  function hideCovered() {
    if (!hero || !cover) return;
    var gone = cover.getBoundingClientRect().top <= 0;
    if (gone === heroGone) return;
    heroGone = gone;
    hero.style.visibility = gone ? 'hidden' : '';
    if (nav) nav.style.visibility = gone ? 'hidden' : '';
    if (gone) setMenu(false);
  }
  window.addEventListener('resize', pinHero, { passive: true });
  window.addEventListener('scroll', hideCovered, { passive: true });
  window.addEventListener('resize', hideCovered, { passive: true });
  pinHero();
  hideCovered();

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

  /* ---------- 7. phone fold-in ----------
     On phones only, each block in a section eases up into place the first
     time it scrolls into view. Desktop keeps its own reveals. */
  var phone = window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
  if (phone && !reduce && typeof IntersectionObserver !== 'undefined') {
    var blocks = [];
    document.querySelectorAll('main > .sec:not(.hero)').forEach(function (sec) {
      var g = sec.querySelector(':scope > .ghost');
      if (g) blocks.push(g);
      var wrap = sec.querySelector(':scope > .wrap');
      if (!wrap) return;
      var kids = wrap.children;
      // Descend through single-wrapper layout grids so each real block folds on its own.
      var list = [];
      Array.prototype.forEach.call(kids, function (k) {
        if (k.children.length > 1 && /\bgrid\b/.test(k.className)) {
          Array.prototype.forEach.call(k.children, function (c) { list.push(c); });
        } else list.push(k);
      });
      list.forEach(function (el) { blocks.push(el); });
    });
    var vh = window.innerHeight;
    blocks.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.92) return; // already on screen: leave it
      el.classList.add('fold');
    });
    var foldIO = new IntersectionObserver(function (entries) {
      var n = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.setProperty('--fold-delay', (n++ * 0.08) + 's');
        e.target.classList.add('is-folded');
        foldIO.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    blocks.forEach(function (el) { if (el.classList.contains('fold')) foldIO.observe(el); });
    setTimeout(function () {
      // safety net: anything tall that never reaches the threshold still shows
      blocks.forEach(function (el) {
        if (el.classList.contains('fold') && el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-folded');
      });
    }, 4000);
  }
})();
