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
  // True when an observed element has left through the bottom of the screen.
  function belowScreen(e) {
    var bottom = e.rootBounds ? e.rootBounds.bottom : window.innerHeight;
    return e.boundingClientRect.top >= bottom - 2;
  }
  var targets = Array.prototype.slice.call(document.querySelectorAll('[data-rv]'));

  function revealAll() {
    root.classList.remove('js-motion');
    targets.forEach(function (el) { el.classList.add('is-in'); });
  }

  if (reduce || typeof IntersectionObserver === 'undefined') {
    revealAll();
  } else {
    root.classList.add('js-motion');
    // Reveals play each time a part of the page comes up from below. Once a
    // part has dropped back below the screen (the visitor scrolled up past
    // it), it resets, so it plays again on the way back down. Parts above the
    // screen are left as they are, so scrolling up never replays anything.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var t = e.target;
        if (e.isIntersecting) { t.classList.add('is-in'); return; }
        if (t.getAttribute('data-rv') === 'hero' || t.getAttribute('data-rv') === 'tide') return;
        if (belowScreen(e)) t.classList.remove('is-in');
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

  var phoneDeck = window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
  if (steps.length && typeof IntersectionObserver !== 'undefined' && !phoneDeck) {
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

  /* ---------- 2b. phone: the principles as a dial card ----------
     Builds the dark principle card: a five-part ring with a rolling number,
     the principle's name, the principle itself, and a row of numbers to jump
     between them. Advances on its own while on screen; swipes and taps take
     over and it resumes after a rest. */
  var doctrine = document.querySelector('.doctrine');
  var stepsEl = doctrine && doctrine.querySelector('.steps');
  if (phoneDeck && doctrine && stepsEl && steps.length) {
    var NS = 'http://www.w3.org/2000/svg';
    var HOLD = 5600, RESUME = 9000, N = steps.length;
    doctrine.classList.add('is-dial');

    var card = document.createElement('div'); card.className = 'pc';
    card.setAttribute('aria-roledescription', 'carousel');
    card.setAttribute('aria-label', 'Operating principles');
    var head = document.createElement('div'); head.className = 'pc-head';
    var dial = document.createElement('div'); dial.className = 'pc-dial'; dial.setAttribute('aria-hidden', 'true');
    var ring = document.createElementNS(NS, 'svg'); ring.setAttribute('class', 'pc-ring'); ring.setAttribute('viewBox', '0 0 44 44');
    var segs = [], fills = [];
    for (var i = 0; i < N; i++) {
      ['seg', 'fill'].forEach(function (cls) {
        var c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', '22'); c.setAttribute('cy', '22'); c.setAttribute('r', '20');
        c.setAttribute('pathLength', '100'); c.setAttribute('class', cls);
        c.style.strokeDashoffset = String(-(i * 20 + 1.5));
        if (cls === 'seg') { c.style.strokeDasharray = '17 83'; segs.push(c); } else fills.push(c);
        ring.appendChild(c);
      });
    }
    var num = document.createElement('div'); num.className = 'pc-num';
    var numSpan = document.createElement('span'); numSpan.className = 'is-in'; numSpan.textContent = '01'; num.appendChild(numSpan);
    dial.appendChild(ring); dial.appendChild(num);
    var meta = document.createElement('div'); meta.className = 'pc-meta';
    meta.innerHTML = '<span class="pc-k">Principle</span><span class="pc-name" aria-live="polite"><span></span></span>';
    var nameBox = meta.querySelector('.pc-name');
    head.appendChild(dial); head.appendChild(meta);
    var rule = document.createElement('div'); rule.className = 'pc-rule';
    var pcStage = document.createElement('div'); pcStage.className = 'pc-stage';
    pcStage.appendChild(stepsEl);
    var navEl = document.createElement('div'); navEl.className = 'pc-nav';
    var navBtns = [];
    for (var k = 0; k < N; k++) {
      var bt = document.createElement('button'); bt.type = 'button';
      bt.textContent = (k < 9 ? '0' : '') + (k + 1);
      bt.setAttribute('aria-label', 'Principle ' + (k + 1) + ': ' + NAMES[k]);
      navBtns.push(bt); navEl.appendChild(bt);
    }
    card.appendChild(head); card.appendChild(rule); card.appendChild(pcStage); card.appendChild(navEl);
    doctrine.appendChild(card);
    nameBox.firstChild.textContent = NAMES[0];

    var cur = 0, timer = null, rest = null, inView = false, held = false;

    var runFill = function () {
      fills.forEach(function (f, i) {
        f.classList.remove('is-running', 'is-full');
        if (i < cur) f.classList.add('is-full');
      });
      var f = fills[cur];
      void f.getBoundingClientRect();
      if (!held && !reduce) f.classList.add('is-running'); else f.classList.add('is-full');
    };
    var show = function (n, dir) {
      if (n === cur && numSpan.textContent) { runFill(); return; }
      var prev = cur; cur = n;
      steps.forEach(function (s, i) { s.classList.toggle('is-current', i === n); });
      segs.forEach(function (s, i) { s.classList.toggle('is-past', i < n); });
      navBtns.forEach(function (b, i) { b.classList.toggle('is-current', i === n); b.setAttribute('aria-current', i === n ? 'true' : 'false'); });
      // odometer number
      var next = document.createElement('span');
      next.textContent = (n < 9 ? '0' : '') + (n + 1);
      next.className = dir < 0 ? 'to-above' : 'from-below';
      num.appendChild(next);
      var old = numSpan; numSpan = next;
      old.className = dir < 0 ? 'from-below' : 'to-above';
      void next.offsetWidth; next.className = 'is-in';
      setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 800);
      // name
      var nm = document.createElement('span'); nm.textContent = NAMES[n]; nm.className = 'is-waiting';
      var oldName = nameBox.lastChild; oldName.className = 'is-out';
      nameBox.appendChild(nm); void nm.offsetWidth;
      setTimeout(function () { nm.className = ''; }, 120);
      setTimeout(function () { if (oldName.parentNode) oldName.parentNode.removeChild(oldName); }, 700);
      runFill();
    };
    var go = function (n) {
      var dir = n > cur || (cur === N - 1 && n === 0) ? 1 : -1;
      show(n, dir);
    };
    var advance = function () { if (inView && !held) go((cur + 1) % N); };
    var restart = function () { if (timer) clearInterval(timer); if (!reduce) timer = setInterval(advance, HOLD); };
    var hold = function () {
      held = true; runFill();
      if (rest) clearTimeout(rest);
      rest = setTimeout(function () { held = false; runFill(); restart(); }, RESUME);
    };

    navBtns.forEach(function (b, i) { b.addEventListener('click', function () { hold(); go(i); }); });
    var sx = 0, sy = 0, swiping = false;
    pcStage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; swiping = true; }, { passive: true });
    pcStage.addEventListener('touchend', function (e) {
      if (!swiping) return; swiping = false;
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      hold();
      go(dx < 0 ? (cur + 1) % N : (cur - 1 + N) % N);
    }, { passive: true });

    // One fixed height: the tallest principle.
    var fit = function () {
      var h = 0;
      steps.forEach(function (s) {
        s.classList.add('is-measure');
        h = Math.max(h, s.offsetHeight);
        s.classList.remove('is-measure');
      });
      pcStage.style.height = h + 'px';
    };
    window.addEventListener('resize', fit, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    window.addEventListener('load', fit);
    fit();

    if (typeof IntersectionObserver !== 'undefined') {
      new IntersectionObserver(function (entries) {
        var was = inView; inView = entries[0].isIntersecting;
        if (inView && !was) { runFill(); restart(); }
      }, { threshold: 0.55 }).observe(card);
    }
    if (typeof dial.style.setProperty === 'function') card.style.setProperty('--hold', (HOLD / 1000) + 's');
    cur = -1; numSpan.textContent = ''; 
    (function init() {
      cur = 0;
      steps.forEach(function (s, i) { s.classList.toggle('is-current', i === 0); });
      navBtns.forEach(function (b, i) { b.classList.toggle('is-current', i === 0); });
      numSpan.textContent = '01';
      fills[0].classList.add('is-full');
    })();
  }

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

  /* ---------- 7. fold-in, desktop and phone ----------
     Each block in a section eases up into place as it comes up from below,
     in a short sequence when several arrive together. A block that drops back
     below the screen resets, so it settles in again the next time you scroll
     down to it. Scrolling up never animates anything. */
  if (!reduce && typeof IntersectionObserver !== 'undefined') {
    var blocks = [];
    document.querySelectorAll('main > .sec:not(.hero)').forEach(function (sec) {
      var g = sec.querySelector(':scope > .ghost');
      if (g) blocks.push(g);
      var wrap = sec.querySelector(':scope > .wrap');
      if (!wrap) return;
      Array.prototype.forEach.call(wrap.children, function (k) {
        // Step into layout grids so each real block moves on its own.
        if (k.children.length > 1 && /\bgrid\b/.test(k.className) && !k.classList.contains('areas')) {
          Array.prototype.forEach.call(k.children, function (c) { blocks.push(c); });
        } else blocks.push(k);
      });
    });
    var vh0 = window.innerHeight;
    blocks.forEach(function (el) {
      el.classList.add('fold');
      if (el.getBoundingClientRect().top < vh0 * 0.92) el.classList.add('is-folded'); // on screen at load: already in place
    });
    var foldIO = new IntersectionObserver(function (entries) {
      var n = 0;
      entries.forEach(function (e) {
        var el = e.target;
        if (e.isIntersecting) {
          if (el.classList.contains('is-folded')) return;
          el.style.setProperty('--fold-delay', (Math.min(n++, 4) * 0.09) + 's');
          el.classList.add('is-folded');
        } else if (belowScreen(e)) {
          el.classList.remove('is-folded');
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    blocks.forEach(function (el) { foldIO.observe(el); });
    setTimeout(function () {
      // safety net: anything on screen that somehow missed its cue still shows
      blocks.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-folded');
      });
    }, 4000);
  }
})();
