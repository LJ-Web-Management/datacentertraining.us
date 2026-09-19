document.addEventListener('DOMContentLoaded', function () {

  // FAQ accordion
  document.querySelectorAll('.faq-row').forEach(function (row) {
    var q = row.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = row.classList.contains('open');
      document.querySelectorAll('.faq-row.open').forEach(function (r) { r.classList.remove('open'); });
      if (!wasOpen) row.classList.add('open');
    });
  });

  // Populate course list + bundle cards from config.js data (single source of truth)
  var courseList = document.getElementById('courseList');
  if (courseList && typeof DC_COURSES !== 'undefined') {
    courseList.innerHTML = DC_COURSES.map(function (c) {
      return '' +
        '<a class="course-row" href="checkout.html?item=' + c.slug + '">' +
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
          '</div>' +
        '</a>';
    }).join('');
  }

  var bundleGrid = document.getElementById('bundleGrid');
  if (bundleGrid && typeof DC_BUNDLES !== 'undefined') {
    bundleGrid.innerHTML = DC_BUNDLES.map(function (b) {
      return '' +
        '<div class="bundle-card' + (b.featured ? ' featured' : '') + '">' +
          '<span class="bundle-badge">' + (b.featured ? 'Best Value' : 'Starter') + '</span>' +
          '<div class="bundle-tier">' + b.tier + ' Bundle</div>' +
          '<h3>' + b.name + '</h3>' +
          '<p class="bundle-scope">' + b.scope + '</p>' +
          '<div class="bundle-price-row">' +
            '<span class="bundle-price">$' + b.bundlePrice + '</span>' +
            '<span class="bundle-price-was">$' + formatMoney(b.costSeparate) + '</span>' +
          '</div>' +
          '<div class="bundle-savings">Save ' + b.savingsPct + '% vs. à la carte</div>' +
          '<div class="bundle-count">' + b.totalCourses + ' courses included</div>' +
          '<a class="btn ' + (b.featured ? 'glass-chip' : 'btn-dark') + ' btn-block" href="checkout.html?item=' + b.slug + '">Get this bundle</a>' +
        '</div>';
    }).join('');
  }
});
