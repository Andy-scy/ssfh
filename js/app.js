/* ==========================================================
   盛世泛海官网（v3 · 液态玻璃版） — 渲染与交互
   依赖：js/data.js（window.SSFH_DATA）
   ========================================================== */
(function () {
  'use strict';

  var D = window.SSFH_DATA;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- 1. 跑马灯（两份内容做无缝循环） ---------- */
  (function () {
    var track = $('#marqueeTrack');
    var seq = D.marquee.map(function (n) { return '<span class="mq-item">' + n + '</span>'; }).join('<i class="mq-dot" aria-hidden="true"></i>');
    track.innerHTML = seq + '<i class="mq-dot" aria-hidden="true"></i>' + seq + '<i class="mq-dot" aria-hidden="true"></i>';
  })();

  /* ---------- 2. 业务卡片 ---------- */
  (function () {
    $('#svcGrid').innerHTML = D.services.map(function (s) {
      return (
        '<article class="svc-card glass reveal">' +
          '<div class="svc-media"><img src="' + s.img + '" alt="' + s.title + '" loading="lazy"><span class="svc-no">' + s.no + '</span></div>' +
          '<div class="svc-body">' +
            '<h3>' + s.title + '</h3>' +
            '<p>' + s.desc + '</p>' +
            '<div class="svc-tags">' + s.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
    $('#deviceChips').innerHTML = D.devices.map(function (t) { return '<li>' + t + '</li>'; }).join('');
    $('#moreChips').innerHTML = D.moreServices.map(function (t) { return '<li>' + t + '</li>'; }).join('');
  })();

  /* ---------- 3. 服务流程 ---------- */
  (function () {
    $('#processRail').innerHTML = D.process.map(function (p) {
      return (
        '<li class="p-step reveal">' +
          '<span class="p-dot glass glass-refract">' + p.step + '</span>' +
          '<h3>' + p.title + '</h3>' +
          '<p>' + p.desc + '</p>' +
        '</li>'
      );
    }).join('');
  })();

  /* ---------- 4. 案例筛选 + 网格 ---------- */
  var caseGrid = $('#caseGrid');
  (function () {
    $('#filterRow').innerHTML = D.caseFilters.map(function (f, i) {
      return '<button class="f-btn' + (i === 0 ? ' is-active' : '') + '" data-filter="' + f.key + '" role="tab" aria-selected="' + (i === 0) + '">' + f.label + '</button>';
    }).join('');
    caseGrid.innerHTML = D.cases.map(function (c, i) {
      return (
        '<figure class="case-card reveal" data-cat="' + c.cat + '" data-idx="' + i + '" tabindex="0" role="button" aria-label="查看大图：' + c.title + '">' +
          '<img src="' + c.img + '" alt="' + c.title + '" loading="lazy">' +
          '<figcaption><strong>' + c.title + '</strong><span>' + c.desc + '</span></figcaption>' +
        '</figure>'
      );
    }).join('');
  })();

  $('#filterRow').addEventListener('click', function (ev) {
    var btn = ev.target.closest('.f-btn');
    if (!btn) return;
    $$('.f-btn').forEach(function (b) {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
    });
    var key = btn.getAttribute('data-filter');
    $$('.case-card', caseGrid).forEach(function (card) {
      var show = key === 'all' || card.getAttribute('data-cat') === key;
      card.classList.toggle('is-hidden', !show);
    });
  });

  /* ---------- 5. 业绩时间线 ---------- */
  (function () {
    $('#timeline').innerHTML = D.milestones.map(function (m) {
      return (
        '<article class="tl-item reveal">' +
          '<div class="tl-marker"><span>' + m.date + '</span></div>' +
          '<div class="tl-card glass">' +
            '<figure class="tl-media"><img src="' + m.img + '" alt="' + m.title + '" loading="lazy"></figure>' +
            '<div class="tl-body">' +
              '<h3>' + m.title + '</h3>' +
              '<p>' + m.desc + '</p>' +
              '<span class="tl-tag">' + m.tag + '</span>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  })();

  /* ---------- 6. 合作客户（品牌客户 Logo 墙 + 更多客户列表） ---------- */
  (function () {
    var withLogo = D.clients.filter(function (c) { return c.logo; });
    var without = D.clients.filter(function (c) { return !c.logo; });
    $('#logoWall').innerHTML = withLogo.map(function (c) {
      return (
        '<div class="logo-card reveal">' +
          '<img src="' + c.logo + '" alt="' + c.name + '标识" loading="lazy">' +
          '<div class="cl-body"><strong>' + c.name + '</strong><span>' + c.work + '</span></div>' +
        '</div>'
      );
    }).join('');
    $('#clientTable').innerHTML = without.map(function (c, i) {
      var idx = (i + 1 < 10 ? '0' : '') + (i + 1);
      return (
        '<li class="cl-row glass reveal">' +
          '<span class="cl-idx">' + idx + '</span>' +
          '<div class="cl-body"><strong>' + c.name + '</strong><span>' + c.work + '</span></div>' +
        '</li>'
      );
    }).join('');
  })();

  /* ---------- 7. 液态玻璃：鼠标跟随高光 ---------- */
  (function () {
    var fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    $$('.glass').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        el.style.setProperty('--sy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      }, { passive: true });
    });
  })();

  /* ---------- 8. 滚动显现 ---------- */
  (function () {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    $$('.reveal').forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  })();

  /* ---------- 9. 数字滚动 ---------- */
  (function () {
    var done = new WeakSet();
    function animate(el) {
      if (done.has(el)) return;
      done.add(el);
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var t0 = null, dur = 1500;
      function frame(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    $$('.js-count').forEach(function (el) { io.observe(el); });
  })();

  /* ---------- 10. 导航：抽屉 / 高亮 / 进度条 / 返回顶部 ---------- */
  var navFloat = $('#navFloat');
  var navDrawer = $('#navDrawer');
  var navBurger = $('#navBurger');
  var backTop = $('#backTop');
  var progressBar = $('#progressBar');
  var navAnchors = $$('.nav-links a');

  navBurger.addEventListener('click', function () {
    var open = navDrawer.classList.toggle('is-open');
    navFloat.classList.toggle('nav-open', open);
    navBurger.classList.toggle('is-open', open);
    navBurger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $$('#navDrawer a').forEach(function (a) {
    a.addEventListener('click', function () {
      navDrawer.classList.remove('is-open');
      navFloat.classList.remove('nav-open');
      navBurger.classList.remove('is-open');
      navBurger.setAttribute('aria-expanded', 'false');
    });
  });

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      navFloat.classList.toggle('is-scrolled', y > 24);
      backTop.classList.toggle('is-show', y > 620);
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
      var pos = y + 160, current = '';
      $$('main section[id]').forEach(function (sec) {
        if (sec.offsetTop <= pos) current = '#' + sec.id;
      });
      navAnchors.forEach(function (a) {
        a.classList.toggle('is-cur', a.getAttribute('href') === current);
      });
      ticking = false;
    });
  }, { passive: true });

  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 11. 灯箱 ---------- */
  var lightbox = $('#lightbox');
  var lbImg = $('#lbImg'), lbTitle = $('#lbTitle'), lbDesc = $('#lbDesc'), lbCount = $('#lbCount');
  var lbList = [], lbIdx = 0;

  function visibleCases() { return $$('.case-card:not(.is-hidden)', caseGrid); }
  function showLb() {
    var card = lbList[lbIdx];
    if (!card) return;
    var data = D.cases[parseInt(card.getAttribute('data-idx'), 10)];
    var img = card.querySelector('img');
    lbImg.src = img.getAttribute('src');
    lbImg.alt = data.title;
    lbTitle.textContent = data.title;
    lbDesc.textContent = data.desc;
    lbCount.textContent = (lbIdx + 1) + ' / ' + lbList.length;
  }
  function openLb(card) {
    lbList = visibleCases();
    lbIdx = lbList.indexOf(card);
    showLb();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function stepLb(d) {
    lbIdx = (lbIdx + d + lbList.length) % lbList.length;
    showLb();
  }

  caseGrid.addEventListener('click', function (ev) {
    var card = ev.target.closest('.case-card');
    if (card) openLb(card);
  });
  caseGrid.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    var card = ev.target.closest('.case-card');
    if (card) { ev.preventDefault(); openLb(card); }
  });
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbBackdrop').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', function () { stepLb(-1); });
  $('#lbNext').addEventListener('click', function () { stepLb(1); });
  document.addEventListener('keydown', function (ev) {
    if (!lightbox.classList.contains('is-open')) return;
    if (ev.key === 'Escape') closeLb();
    if (ev.key === 'ArrowLeft') stepLb(-1);
    if (ev.key === 'ArrowRight') stepLb(1);
  });

  /* ---------- 12. 留言表单（mailto） ---------- */
  var form = $('#contactForm');
  var toast = $('#toast');
  var toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-show'); }, 3200);
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var name = $('#fName'), phone = $('#fPhone'), msg = $('#fMsg');
    var ok = true;
    [name, phone, msg].forEach(function (f) {
      var valid = f.value.trim().length > 0;
      f.classList.toggle('is-error', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { showToast('请完整填写称呼、联系电话和项目需求'); return; }
    var subject = encodeURIComponent('【官网留言】' + name.value.trim());
    var body = encodeURIComponent('称呼：' + name.value.trim() + '\n电话：' + phone.value.trim() + '\n\n' + msg.value.trim());
    window.location.href = 'mailto:shengshifanhai@126.com?subject=' + subject + '&body=' + body;
    showToast('感谢留言，正在为您打开邮件客户端…');
    form.reset();
  });

  /* ---------- 13. 年份 ---------- */
  $('#year').textContent = new Date().getFullYear();
})();
