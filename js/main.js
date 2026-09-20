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

  // Render one tier of the course list (comprehensive or modular) into a panel
  var renderCourseRows = function (containerId, tier) {
    var el = document.getElementById(containerId);
    if (!el || typeof DC_COURSES === 'undefined') return;
    el.innerHTML = DC_COURSES.filter(function (c) { return c.tier === tier; }).map(function (c) {
      return '' +
        '<div class="course-row">' +
          '<div class="course-main">' +
            '<h3><a href="courses/' + c.slug + '.html">' + c.name + '</a></h3>' +
            '<div class="course-meta">' +
              '<span>' + c.category + '</span>' +
              (c.standard ? '<span class="sep">·</span><span>' + c.standard + '</span>' : '') +
            '</div>' +
          '</div>' +
          '<div class="course-side">' +
            '<div style="text-align:right;">' +
              '<div class="course-price">$' + formatMoney(c.msrp) + '</div>' +
              '<div class="course-duration">' + c.duration + '</div>' +
            '</div>' +
            '<a class="btn btn-primary btn-sm" href="checkout.html?item=' + c.slug + '" aria-label="Enroll in ' + c.name + '">Enroll</a>' +
          '</div>' +
        '</div>';
    }).join('');
  };
  renderCourseRows('courseListComprehensive', 'comprehensive');
  renderCourseRows('courseListModular', 'modular');

  // Hero card course snapshot — a handful of featured courses across both tiers
  var heroCardCourses = document.getElementById('heroCardCourses');
  if (heroCardCourses && typeof DC_COURSES !== 'undefined') {
    var featuredSlugs = ['data-center-design-fundamentals', 'power-systems-electrical-fundamentals', 'cooling-systems-design-optimization', 'security-compliance-data-centers', 'ups-operations-load-testing'];
    heroCardCourses.innerHTML = featuredSlugs.map(function (slug) {
      return DC_COURSES.find(function (c) { return c.slug === slug; });
    }).filter(Boolean).map(function (c) {
      return '' +
        '<a class="hero-card-course" href="courses/' + c.slug + '.html">' +
          '<span class="hero-card-course-name">' + c.name.replace('Data Center ', '') + '</span>' +
          '<span class="hero-card-course-price">$' + formatMoney(c.msrp) + '</span>' +
        '</a>';
    }).join('');
  }

  // Bundle grid — themed packages priced below buying each course individually
  var bundleGrid = document.getElementById('bundleGrid');
  if (bundleGrid && typeof DC_BUNDLES !== 'undefined') {
    bundleGrid.innerHTML = DC_BUNDLES.map(function (b) {
      var listPrice = bundleListPrice(b);
      var savingsPct = Math.round((1 - b.price / listPrice) * 100);
      var courseNames = b.courses.map(function (slug) {
        var c = DC_COURSES.find(function (x) { return x.slug === slug; });
        return c ? c.name : '';
      }).filter(Boolean);
      var isComplete = b.slug === 'bundle-complete-catalog';
      return '' +
        '<div class="bundle-card' + (isComplete ? ' bundle-card-featured' : '') + '">' +
          (isComplete ? '<div class="bundle-card-badge">Everything, One Price</div>' : '') +
          '<h3>' + b.name + '</h3>' +
          '<p class="bundle-card-desc">' + b.description + '</p>' +
          '<ul class="bundle-card-courses">' +
            courseNames.map(function (n) { return '<li>' + n + '</li>'; }).join('') +
          '</ul>' +
          '<div class="bundle-card-pricing">' +
            '<span class="bundle-card-price">$' + formatMoney(b.price) + '</span>' +
            '<span class="bundle-card-list-price">$' + formatMoney(listPrice) + '</span>' +
            '<span class="bundle-card-savings">Save ' + savingsPct + '%</span>' +
          '</div>' +
          '<a class="btn btn-primary btn-block" href="checkout.html?item=' + b.slug + '" aria-label="Enroll in the ' + b.name + '">Enroll the Team</a>' +
        '</div>';
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
