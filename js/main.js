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
