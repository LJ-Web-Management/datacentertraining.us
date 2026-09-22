// Progressive-enhancement search/sort/filter for the course catalog.
// The course list itself is static, server-rendered HTML (see main.js) so
// every course link is crawlable without JS; this file only reorders and
// shows/hides the existing .course-row elements already in the DOM.
document.addEventListener('DOMContentLoaded', function () {
  var panels = {
    comprehensive: document.getElementById('courseListComprehensive'),
    modular: document.getElementById('courseListModular')
  };
  if (!panels.comprehensive && !panels.modular) return;

  var searchInput = document.getElementById('courseSearch');
  var sortSelect = document.getElementById('courseSort');
  var tierSelect = document.getElementById('courseTierFilter');
  var categorySelect = document.getElementById('courseCategoryFilter');
  var resultCount = document.getElementById('courseResultCount');
  var emptyState = document.getElementById('courseEmptyState');
  var subheads = {
    comprehensive: document.getElementById('courseSubheadComprehensive'),
    modular: document.getElementById('courseSubheadModular')
  };

  function rowsOf(panel) {
    return panel ? Array.prototype.slice.call(panel.querySelectorAll('.course-row')) : [];
  }

  function matchesSearch(row, query) {
    if (!query) return true;
    var haystack = (
      row.dataset.name + ' ' + row.dataset.category + ' ' + (row.dataset.standard || '')
    ).toLowerCase();
    return haystack.indexOf(query) !== -1;
  }

  function matchesCategory(row, category) {
    return category === 'all' || row.dataset.category === category;
  }

  function sortRows(rows, sortBy) {
    var sorted = rows.slice();
    sorted.sort(function (a, b) {
      switch (sortBy) {
        case 'price-asc':
          return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        case 'price-desc':
          return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
        case 'duration-asc':
          return parseFloat(a.dataset.hours) - parseFloat(b.dataset.hours);
        case 'duration-desc':
          return parseFloat(b.dataset.hours) - parseFloat(a.dataset.hours);
        case 'name-desc':
          return b.dataset.name.localeCompare(a.dataset.name);
        case 'name-asc':
        default:
          return a.dataset.name.localeCompare(b.dataset.name);
      }
    });
    return sorted;
  }

  function apply() {
    var query = (searchInput ? searchInput.value.trim().toLowerCase() : '');
    var sortBy = sortSelect ? sortSelect.value : 'name-asc';
    var tier = tierSelect ? tierSelect.value : 'all';
    var category = categorySelect ? categorySelect.value : 'all';

    var totalVisible = 0;

    ['comprehensive', 'modular'].forEach(function (tierKey) {
      var panel = panels[tierKey];
      if (!panel) return;
      var showPanel = tier === 'all' || tier === tierKey;
      var rows = rowsOf(panel);
      var visibleCount = 0;

      if (showPanel) {
        var sorted = sortRows(rows, sortBy);
        sorted.forEach(function (row) {
          var visible = matchesSearch(row, query) && matchesCategory(row, category);
          row.hidden = !visible;
          if (visible) visibleCount++;
          panel.appendChild(row);
        });
      } else {
        rows.forEach(function (row) { row.hidden = true; });
      }

      if (subheads[tierKey]) subheads[tierKey].hidden = !showPanel || visibleCount === 0;
      panel.hidden = !showPanel || visibleCount === 0;
      totalVisible += visibleCount;
    });

    if (resultCount) {
      resultCount.textContent = totalVisible === 1 ? '1 course' : totalVisible + ' courses';
    }
    if (emptyState) emptyState.hidden = totalVisible !== 0;
  }

  [searchInput, sortSelect, tierSelect, categorySelect].forEach(function (el) {
    if (!el) return;
    el.addEventListener('input', apply);
    el.addEventListener('change', apply);
  });

  apply();
});
