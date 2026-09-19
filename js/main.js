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

  // FAQ "View More" toggle reveals the SEO long-tail questions
  var faqViewMoreBtn = document.getElementById('faqViewMoreBtn');
  if (faqViewMoreBtn) {
    var faqExtras = document.querySelectorAll('.faq-extra');
    faqViewMoreBtn.addEventListener('click', function () {
      var expanded = faqViewMoreBtn.getAttribute('aria-expanded') === 'true';
      faqExtras.forEach(function (row) {
        if (expanded) {
          row.hidden = true;
          row.classList.remove('open');
        } else {
          row.hidden = false;
        }
      });
      faqViewMoreBtn.setAttribute('aria-expanded', String(!expanded));
      faqViewMoreBtn.querySelector('.btn-text').textContent = expanded ? 'View More Questions' : 'View Fewer Questions';
      if (expanded) {
        document.getElementById('faqPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Populate course list from config.js data (single source of truth)
  var courseList = document.getElementById('courseList');
  if (courseList && typeof DC_COURSES !== 'undefined') {
    courseList.innerHTML = DC_COURSES.map(function (c) {
      return '' +
        '<div class="course-row">' +
          '<div class="course-main">' +
            '<h3>' + c.name + '</h3>' +
            '<div class="course-meta">' +
              '<span>' + c.regBody + '</span><span class="sep">·</span><span>' + c.citation + '</span>' +
              (c.tag ? '<span class="course-tag">' + c.tag + '</span>' : '') +
            '</div>' +
          '</div>' +
          '<div class="course-side">' +
            '<div style="text-align:right;">' +
              '<div class="course-price">$' + formatMoney(c.msrp) + '</div>' +
              '<div class="course-duration">' + c.duration + '</div>' +
            '</div>' +
            '<a class="btn btn-primary btn-sm" href="checkout.html?item=' + c.slug + '">Enroll</a>' +
          '</div>' +
        '</div>';
    }).join('');
  }

  // Hero card course snapshot — first 5 courses, matching the hero card's
  // "see all 9 below" link for the rest
  var heroCardCourses = document.getElementById('heroCardCourses');
  if (heroCardCourses && typeof DC_COURSES !== 'undefined') {
    heroCardCourses.innerHTML = DC_COURSES.slice(0, 5).map(function (c) {
      return '' +
        '<a class="hero-card-course" href="checkout.html?item=' + c.slug + '">' +
          '<span class="hero-card-course-name">' + c.name.replace('Data Center ', '') + '</span>' +
          '<span class="hero-card-course-price">$' + formatMoney(c.msrp) + '</span>' +
        '</a>';
    }).join('');
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
