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
});
