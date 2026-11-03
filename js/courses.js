// Progressive-enhancement search/sort/filter for the course catalog.
// The course list itself is static, server-rendered HTML (see main.js) so
// every course link is crawlable without JS; this file only reorders and
// shows/hides the existing .course-row elements already in the DOM.

// Query matching, kept free of the DOM so scripts/catalog-search.test.js can
// run it in Node. A query matches a course when every word in it (ignoring
// filler words like "and" or "for") starts a word in the course's name, track,
// standard, or keywords, either as typed, without a plural ending, or as one of
// the synonyms below ("loto" finds Lockout/Tagout, "batteries" finds Battery).
(function (root) {
  var STOPWORDS = { a: 1, an: 1, and: 1, the: 1, for: 1, of: 1, in: 1, on: 1, to: 1, with: 1, course: 1, courses: 1, training: 1, class: 1, classes: 1 };
  var SYNONYMS = {
    ups: ['uninterruptible power'], pue: ['power usage effectiveness', 'energy efficiency'], dcim: ['data center infrastructure management'],
    bms: ['building management', 'building automation'], bas: ['building automation'], epo: ['emergency power off'],
    ats: ['automatic transfer', 'transfer switch'], pdu: ['power distribution'], loto: ['lockout', 'tagout'], lockout: ['loto'],
    tagout: ['loto'], hvac: ['cooling', 'mechanical'], crac: ['cooling'], crah: ['cooling'], chiller: ['chilled water', 'cooling'],
    cx: ['commissioning'], li: ['lithium'], lithium: ['li ion'], dr: ['disaster recovery'],
    bc: ['business continuity'], bcdr: ['business continuity', 'disaster recovery'], fire: ['suppression', 'nfpa 75'],
    electrician: ['electrical'], electric: ['electrical'], generators: ['generator'], genset: ['generator'],
    ac: ['cooling'], security: ['access control'], badge: ['access control'], ppe: ['protective equipment', 'arc flash'],
    beginner: ['fundamentals', 'foundational'], beginners: ['fundamentals', 'foundational'], intro: ['fundamentals'],
    introduction: ['fundamentals'], basics: ['fundamentals'], basic: ['fundamentals'], advanced: ['comprehensive'],
    tech: ['technician'], techs: ['technician'], efficiency: ['pue'], energy: ['efficiency', 'pue']
  };

  // Spelled-out terms the catalog abbreviates, replaced before matching word by word.
  var PHRASES = [
    ['power usage effectiveness', 'pue'], ['power usage', 'pue'], ['uninterruptible power supply', 'ups'],
    ['uninterruptible power', 'ups'], ['lockout tagout', 'loto'], ['lock out tag out', 'loto'],
    ['emergency power off', 'epo'], ['building management system', 'bms'], ['lithium ion', 'lithium']
  ];

  function normalize(s) {
    return ' ' + String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/&/g, ' and ').replace(/[^a-z0-9.+/]+/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  }

  function alternatives(word) {
    var alts = [word];
    if (word.length > 3 && /ies$/.test(word)) alts.push(word.slice(0, -3) + 'y');
    else if (word.length > 3 && /(s|x|z|ch|sh)es$/.test(word)) alts.push(word.slice(0, -2));
    else if (word.length > 3 && /[^s]s$/.test(word)) alts.push(word.slice(0, -1));
    (SYNONYMS[word] || []).forEach(function (s) { alts.push(normalize(s).trim()); });
    return alts;
  }

  // Each normalized haystack starts and ends with a space, so " term" is a word start.
  function matches(haystack, query) {
    var q = normalize(query);
    PHRASES.forEach(function (p) { q = q.split(' ' + p[0] + ' ').join(' ' + p[1] + ' '); });
    var words = q.trim().split(' ').filter(Boolean);
    // A query of only filler words ("training courses") filters nothing.
    words = words.filter(function (w) { return !STOPWORDS[w]; });
    if (!words.length) return true;
    return words.every(function (word) {
      return alternatives(word).some(function (alt) {
        return haystack.indexOf(' ' + alt) !== -1 || haystack.indexOf('/' + alt) !== -1;
      });
    });
  }

  var api = { normalize: normalize, matches: matches };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DCTCatalogSearch = api;
})(typeof window !== 'undefined' ? window : this);

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', function () {
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
  var requestLink = document.getElementById('courseRequestLink');
  var subheads = {
    comprehensive: document.getElementById('courseSubheadComprehensive'),
    modular: document.getElementById('courseSubheadModular')
  };

  function rowsOf(panel) {
    return panel ? Array.prototype.slice.call(panel.querySelectorAll('.course-row')) : [];
  }

  var match = window.DCTCatalogSearch;

  function matchesSearch(row, query) {
    if (!query) return true;
    if (!row._haystack) {
      row._haystack = match.normalize([
        row.dataset.name, row.dataset.category, row.dataset.standard, row.dataset.tier, row.dataset.keywords
      ].join(' '));
    }
    return match.matches(row._haystack, query);
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
    // "Request this course" carries the search that found nothing.
    if (requestLink) requestLink.href = 'course-request.html' + (query ? '?topic=' + encodeURIComponent(searchInput.value.trim()) : '');
  }

  // Pre-fill from ?q=&type=&track=&sort= so filtered views are linkable (and
  // the WebSite SearchAction on the homepage lands on real results).
  var params = new URLSearchParams(window.location.search);
  function setFrom(el, key) {
    var v = params.get(key);
    if (!el || v === null) return;
    if (el.tagName === 'SELECT' && !Array.prototype.some.call(el.options, function (o) { return o.value === v; })) return;
    el.value = v;
  }
  setFrom(searchInput, 'q');
  setFrom(tierSelect, 'type');
  setFrom(categorySelect, 'track');
  setFrom(sortSelect, 'sort');

  [searchInput, sortSelect, tierSelect, categorySelect].forEach(function (el) {
    if (!el) return;
    el.addEventListener('input', apply);
    el.addEventListener('change', apply);
  });

  // The toolbar is a real GET form (works without JS, and is exposed to AI
  // agents as the declarative WebMCP tool "search_catalog"); with JS we filter
  // in place instead of reloading.
  var form = document.getElementById('courseFilters');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      apply();
      var visible = Array.prototype.filter.call(document.querySelectorAll('.course-row'), function (r) { return !r.hidden; });
      if (e.agentInvoked && typeof e.respondWith === 'function') {
        e.respondWith(Promise.resolve(JSON.stringify({
          count: visible.length,
          courses: visible.map(function (r) {
            var a = r.querySelector('h3 a');
            return { title: r.dataset.name, url: a ? a.href : null, track: r.dataset.category, hours: parseFloat(r.dataset.hours), price_usd: parseFloat(r.dataset.price) };
          })
        })));
      }
    });
  }

  apply();
});
