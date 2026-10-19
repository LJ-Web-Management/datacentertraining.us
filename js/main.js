document.addEventListener('DOMContentLoaded', function () {

  // FAQ accordion (click still toggles/pins open on touch + keyboard;
  // hover-to-preview is handled purely in CSS for pointer-fine devices)
  document.querySelectorAll('.faq-row').forEach(function (row) {
    var q = row.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = row.classList.contains('open');
      document.querySelectorAll('.faq-row.open').forEach(function (r) { r.classList.remove('open'); });
      if (!wasOpen) row.classList.add('open');
    });
  });

  // Course list, hero card snapshot, and bundle grid are pre-rendered as static
  // HTML directly in index.html (generated from the same config.js data) so
  // search engines and other non-JS-rendering crawlers can see and follow
  // links to every course/bundle page without executing JavaScript.

  // Guide pages: highlight the "On this page" link for the section in view.
  var toc = document.querySelector('.guide-toc');
  if (toc && 'IntersectionObserver' in window) {
    var tocLinks = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var sections = tocLinks.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var current = sections.filter(function (s) { return visible[s.id]; })[0];
      if (!current) return;
      tocLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + current.id); });
    }, { rootMargin: '-80px 0px -60% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // Glossary: filter terms as you type, hiding letters with no matches.
  var glossaryFilter = document.getElementById('glossarySearch');
  if (glossaryFilter) {
    var gItems = Array.prototype.slice.call(document.querySelectorAll('.glossary-item'));
    var gSections = Array.prototype.slice.call(document.querySelectorAll('.glossary-section'));
    var gCount = document.getElementById('glossaryCount');
    var gNorm = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); };
    gItems.forEach(function (item) { item.dataset.text = gNorm(item.textContent); });
    var gRun = function () {
      var words = gNorm(glossaryFilter.value).split(' ').filter(Boolean);
      var shown = 0;
      gItems.forEach(function (item) {
        var hit = words.every(function (w) { return item.dataset.text.indexOf(w) !== -1; });
        item.hidden = !hit;
        if (hit) shown++;
      });
      gSections.forEach(function (sec) { sec.hidden = !sec.querySelector('.glossary-item:not([hidden])'); });
      if (gCount) gCount.textContent = shown + (shown === 1 ? ' term' : ' terms');
    };
    glossaryFilter.addEventListener('input', gRun);
    gRun();
  }

  // "Which Courses Does Your Role Need?" role picker
  document.querySelectorAll('.role-picker').forEach(function (picker) {
    var buttons = picker.querySelectorAll('.role-picker-btn');
    var resultsWrap = document.querySelector(picker.dataset.resultsTarget || '.role-picker-results');
    if (!resultsWrap) return;
    var results = resultsWrap.querySelectorAll('.role-picker-result');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.toggle('active', b === btn); });
        results.forEach(function (r) {
          r.classList.toggle('active', r.dataset.role === btn.dataset.role);
        });
        resultsWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  });
});
