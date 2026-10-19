// Calculators and the training plan builder on /tools/. Each tool's inputs
// and default results are static HTML (so the page reads correctly without
// JavaScript); this file recalculates as the visitor types.
//
//   <div data-tool="pue|uptime|cooling|plan"> ... [data-out="key"] outputs ...
//
// The plan builder reads DC_COURSES, DC_BUNDLES, and the volume discount
// helpers from js/config.js, so it always quotes current catalog prices.
(function () {
  'use strict';

  var HOURS_PER_YEAR = 8760;

  function num(input) {
    if (!input) return NaN;
    var v = parseFloat(String(input.value).replace(/[,\s$%]/g, ''));
    return isFinite(v) ? v : NaN;
  }

  function fmt(n, digits) {
    return n.toLocaleString('en-US', { minimumFractionDigits: digits || 0, maximumFractionDigits: digits || 0 });
  }

  function usd(n, digits) {
    return '$' + fmt(n, digits === undefined ? 2 : digits);
  }

  function out(root, key) {
    return root.querySelector('[data-out="' + key + '"]');
  }

  function set(root, key, text) {
    var el = out(root, key);
    if (el) el.textContent = text;
  }

  function showError(root, msg) {
    var el = out(root, 'error');
    if (!el) return;
    el.textContent = msg || '';
    el.hidden = !msg;
  }

  function onInput(root, fn) {
    root.addEventListener('input', fn);
    root.addEventListener('change', fn);
    root.querySelectorAll('form').forEach(function (f) {
      f.addEventListener('submit', function (e) { e.preventDefault(); fn(); });
    });
  }

  // ── PUE calculator ────────────────────────────────────────────────────
  function initPue(root) {
    var total = root.querySelector('[name="total"]');
    var it = root.querySelector('[name="it"]');
    var price = root.querySelector('[name="price"]');
    var target = root.querySelector('[name="target"]');
    var marker = root.querySelector('.meter-marker');
    var rating = out(root, 'rating');

    function run() {
      var t = num(total), i = num(it), p = num(price), g = num(target);
      if (!(t > 0) || !(i > 0)) return showError(root, 'Enter a total facility load and an IT load greater than zero.');
      if (i > t) return showError(root, 'The IT load can\'t be larger than the total facility load, which includes it.');
      showError(root, '');
      var pue = t / i;
      set(root, 'pue', fmt(pue, 2));
      set(root, 'dcie', fmt(100 / pue, 1) + '%');
      set(root, 'overhead', fmt(t - i, t - i < 10 ? 1 : 0) + ' kW');
      set(root, 'overheadCost', p >= 0 ? usd((t - i) * HOURS_PER_YEAR * p, 0) : '-');
      var save = g >= 1 && g < pue && p >= 0 ? (pue - g) * i * HOURS_PER_YEAR * p : 0;
      set(root, 'savings', g >= 1 && g < pue ? usd(save, 0) : 'Already at target');
      var level, label;
      if (pue < 1.3) { level = 'good'; label = 'Excellent: hyperscale-class efficiency'; }
      else if (pue < 1.5) { level = 'good'; label = 'Good: better than the industry average'; }
      else if (pue < 1.7) { level = 'ok'; label = 'Around the industry average'; }
      else if (pue < 2.0) { level = 'poor'; label = 'Room to improve'; }
      else { level = 'poor'; label = 'Inefficient: large savings likely'; }
      rating.setAttribute('data-level', level);
      rating.textContent = label;
      if (marker) marker.style.left = Math.max(0, Math.min(100, (pue - 1) / 2 * 100)) + '%';
    }
    onInput(root, run);
    run();
  }

  // ── Uptime / downtime calculator ──────────────────────────────────────
  function duration(hours) {
    var s = hours * 3600;
    if (s < 60) return fmt(s, s < 10 ? 1 : 0) + ' sec';
    var m = Math.floor(s / 60), sec = Math.round(s % 60);
    if (m < 60) return m + ' min' + (sec ? ' ' + sec + ' sec' : '');
    var h = Math.floor(m / 60), min = m % 60;
    if (h < 24) return h + ' hr' + (min ? ' ' + min + ' min' : '');
    var d = Math.floor(h / 24), hr = h % 24;
    return d + (d === 1 ? ' day' : ' days') + (hr ? ' ' + hr + ' hr' : '');
  }

  function initUptime(root) {
    var avail = root.querySelector('[name="availability"]');
    var down = root.querySelector('[name="downtime"]');

    function show(a) {
      var frac = 1 - a / 100;
      var perYear = frac * HOURS_PER_YEAR;
      set(root, 'year', duration(perYear));
      set(root, 'month', duration(perYear / 12));
      set(root, 'week', duration(frac * 168));
      set(root, 'day', duration(frac * 24));
      var nines = frac > 0 ? -Math.log10(frac) : Infinity;
      set(root, 'nines', isFinite(nines) ? fmt(Math.floor(nines + 1e-9), 0) + ' nines' : '100%');
      return perYear;
    }

    function fromAvail() {
      var a = num(avail);
      if (!(a > 0 && a <= 100)) return showError(root, 'Enter an availability between 0 and 100 percent.');
      showError(root, '');
      var perYear = show(a);
      if (document.activeElement !== down) down.value = +(perYear).toFixed(perYear < 1 ? 3 : 2);
    }

    function fromDown() {
      var h = num(down);
      if (!(h >= 0 && h <= HOURS_PER_YEAR)) return showError(root, 'Enter yearly downtime between 0 and 8,760 hours.');
      showError(root, '');
      var a = (1 - h / HOURS_PER_YEAR) * 100;
      avail.value = +a.toFixed(5);
      show(a);
    }

    avail.addEventListener('input', fromAvail);
    down.addEventListener('input', fromDown);
    root.querySelectorAll('form').forEach(function (f) { f.addEventListener('submit', function (e) { e.preventDefault(); }); });
    root.querySelectorAll('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () {
        avail.value = b.getAttribute('data-preset');
        fromAvail();
      });
    });
    fromAvail();
  }

  // ── Cooling load calculator ───────────────────────────────────────────
  function initCooling(root) {
    var racks = root.querySelector('[name="racks"]');
    var density = root.querySelector('[name="density"]');
    var other = root.querySelector('[name="other"]');
    var dt = root.querySelector('[name="deltat"]');
    var unit = root.querySelector('[name="unit"]');
    var redundancy = root.querySelector('[name="redundancy"]');

    function run() {
      var r = num(racks), k = num(density), o = num(other), d = num(dt), u = num(unit);
      if (!(r > 0) || !(k > 0)) return showError(root, 'Enter the number of racks and the average load per rack.');
      if (!(d > 0)) return showError(root, 'Enter a temperature rise across the IT equipment greater than zero.');
      showError(root, '');
      var itKw = r * k;
      var heatKw = itKw * (1 + (o > 0 ? o : 0) / 100);
      var btu = heatKw * 3412.14;
      var tons = btu / 12000;
      var cfm = 3.16 * itKw * 1000 / d;
      set(root, 'itkw', fmt(itKw, itKw < 10 ? 1 : 0) + ' kW');
      set(root, 'heatkw', fmt(heatKw, heatKw < 10 ? 1 : 0));
      set(root, 'btu', fmt(btu, 0) + ' BTU/hr');
      set(root, 'tons', fmt(tons, 1) + ' tons');
      set(root, 'cfm', fmt(cfm, 0) + ' CFM');
      set(root, 'm3h', fmt(cfm * 1.699, 0) + ' m³/h');
      set(root, 'rackcfm', fmt(cfm / r, 0) + ' CFM per rack');
      set(root, 'dtc', fmt(d * 5 / 9, 1) + ' °C');
      if (u > 0) {
        var n = Math.max(1, Math.ceil(tons / u - 1e-9));
        var mode = redundancy ? redundancy.value : 'n1';
        var total = mode === '2n' ? n * 2 : mode === 'n2' ? n + 2 : mode === 'n' ? n : n + 1;
        var label = { n: 'N', n1: 'N+1', n2: 'N+2', '2n': '2N' }[mode];
        set(root, 'units', total + ' units');
        set(root, 'unitsLabel', fmt(u, u % 1 ? 1 : 0) + '-ton units at ' + label + ' (' + n + ' needed for the load)');
      } else {
        set(root, 'units', '-');
        set(root, 'unitsLabel', 'Enter a cooling unit size to size the units');
      }
    }
    onInput(root, run);
    run();
  }

  // ── Training plan builder ─────────────────────────────────────────────
  var ROLES = {
    electrician: {
      label: 'Electrician or power technician', bundle: 'bundle-power-electrical',
      newbie: ['data-center-electrical-safety', 'electrical-safety-best-practices', 'power-systems-electrical-fundamentals', 'batteries-dc-circuits', 'ups-systems-fundamentals', 'power-distribution-systems-fundamentals', 'generator-fundamentals', 'data-center-arc-flash-safety', 'data-center-ups-battery-safety', 'data-center-epo-procedures', 'emergency-standby-power-systems-fundamentals', 'ups-operations-load-testing', 'generator-operations-maintenance', 'lithium-ion-thermal-runaway-emergency-response'],
      experienced: ['power-systems-electrical-fundamentals', 'data-center-arc-flash-safety', 'ups-operations-load-testing', 'generator-operations-maintenance', 'emergency-standby-power-systems-fundamentals', 'lithium-ion-thermal-runaway-emergency-response', 'data-center-ups-battery-safety', 'data-center-epo-procedures', 'power-distribution-systems-fundamentals', 'electrical-safety-best-practices', 'data-center-electrical-safety', 'ups-systems-fundamentals', 'generator-fundamentals', 'batteries-dc-circuits']
    },
    hvac: {
      label: 'HVAC or mechanical technician', bundle: 'bundle-cooling-efficiency',
      newbie: ['data-center-cooling-refrigerant-safety', 'hvac-troubleshooting-essentials', 'building-envelope-fundamentals', 'mechanical-systems-maintenance', 'cooling-systems-design-optimization', 'energy-efficiency-pue-optimization'],
      experienced: ['cooling-systems-design-optimization', 'hvac-troubleshooting-essentials', 'mechanical-systems-maintenance', 'energy-efficiency-pue-optimization', 'data-center-cooling-refrigerant-safety', 'building-envelope-fundamentals']
    },
    operations: {
      label: 'Facility or operations manager', bundle: 'bundle-operations-reliability',
      newbie: ['facility-management-fundamentals', 'data-center-operations-management', 'building-maintenance-fundamentals', 'preventive-maintenance-planning', 'incident-response-troubleshooting', 'data-center-raised-floor-confined-space', 'server-room-ergonomics-manual-handling', 'business-continuity-disaster-recovery-planning', 'disaster-recovery-business-continuity', 'roofing-systems-maintenance-fundamentals'],
      experienced: ['data-center-operations-management', 'disaster-recovery-business-continuity', 'incident-response-troubleshooting', 'preventive-maintenance-planning', 'business-continuity-disaster-recovery-planning', 'facility-management-fundamentals', 'building-maintenance-fundamentals', 'data-center-raised-floor-confined-space', 'server-room-ergonomics-manual-handling', 'roofing-systems-maintenance-fundamentals']
    },
    security: {
      label: 'Security or compliance', bundle: 'bundle-security-compliance',
      newbie: ['data-center-physical-security-access-control', 'access-control-physical-security', 'data-center-fire-suppression-safety', 'security-compliance-data-centers', 'facility-environmental-compliance'],
      experienced: ['security-compliance-data-centers', 'access-control-physical-security', 'facility-environmental-compliance', 'data-center-fire-suppression-safety', 'data-center-physical-security-access-control']
    },
    design: {
      label: 'Engineer or project lead', bundle: 'bundle-design-planning',
      newbie: ['data-center-design-fundamentals', 'tier-infrastructure-fundamentals', 'capacity-planning-forecasting', 'infrastructure-commissioning-startup'],
      experienced: ['tier-infrastructure-fundamentals', 'infrastructure-commissioning-startup', 'capacity-planning-forecasting', 'data-center-design-fundamentals']
    },
    it: {
      label: 'DCIM, monitoring, or network', bundle: 'bundle-monitoring-smart-facility',
      newbie: ['dcim-platform-fundamentals', 'fiber-optics-network-cabling', 'building-automation-systems-fundamentals', 'monitoring-automation-bms-systems'],
      experienced: ['monitoring-automation-bms-systems', 'dcim-platform-fundamentals', 'building-automation-systems-fundamentals', 'fiber-optics-network-cabling']
    },
    newcomer: {
      label: 'New to data centers', bundle: null,
      newbie: ['data-center-electrical-safety', 'facility-management-fundamentals', 'data-center-physical-security-access-control', 'server-room-ergonomics-manual-handling', 'data-center-raised-floor-confined-space', 'data-center-epo-procedures', 'ups-systems-fundamentals', 'data-center-operations-management'],
      experienced: ['data-center-electrical-safety', 'facility-management-fundamentals', 'data-center-physical-security-access-control', 'server-room-ergonomics-manual-handling', 'data-center-raised-floor-confined-space', 'data-center-epo-procedures', 'ups-systems-fundamentals', 'data-center-operations-management']
    }
  };
  var TOPICS = {
    safety: { label: 'Safety', courses: ['data-center-electrical-safety', 'data-center-arc-flash-safety', 'data-center-ups-battery-safety', 'data-center-epo-procedures', 'data-center-fire-suppression-safety', 'data-center-raised-floor-confined-space', 'server-room-ergonomics-manual-handling', 'data-center-cooling-refrigerant-safety', 'lithium-ion-thermal-runaway-emergency-response'] },
    power: { label: 'Power', courses: ['power-systems-electrical-fundamentals', 'ups-systems-fundamentals', 'generator-fundamentals', 'power-distribution-systems-fundamentals', 'ups-operations-load-testing'] },
    cooling: { label: 'Cooling', courses: ['cooling-systems-design-optimization', 'hvac-troubleshooting-essentials', 'energy-efficiency-pue-optimization'] },
    operations: { label: 'Operations', courses: ['data-center-operations-management', 'preventive-maintenance-planning', 'incident-response-troubleshooting'] },
    security: { label: 'Security', courses: ['security-compliance-data-centers', 'data-center-physical-security-access-control', 'access-control-physical-security'] },
    design: { label: 'Design and planning', courses: ['data-center-design-fundamentals', 'tier-infrastructure-fundamentals', 'capacity-planning-forecasting'] },
    monitoring: { label: 'Monitoring', courses: ['monitoring-automation-bms-systems', 'dcim-platform-fundamentals'] }
  };
  var CORE_COUNT = 4;

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function initPlan(root) {
    if (typeof DC_COURSES === 'undefined') return;
    var form = root.querySelector('form');
    var list = root.querySelector('.plan-list');
    var empty = root.querySelector('.plan-empty');
    var bundleBox = root.querySelector('.plan-bundle');
    var actions = root.querySelector('.plan-actions');
    var course = function (slug) { return DC_COURSES.find(function (c) { return c.slug === slug; }); };
    var hoursOf = function (c) { return parseFloat(c.duration); };
    var picked = null; // course slugs the visitor kept checked; null = use the recommendation

    function readForm() {
      var fd = new FormData(form);
      return {
        role: fd.get('role') || 'newcomer',
        level: fd.get('level') || 'newbie',
        topics: fd.getAll('topic'),
        hours: parseFloat(fd.get('hours')) || Infinity,
        seats: Math.max(1, Math.min(1000, parseInt(fd.get('seats'), 10) || 1))
      };
    }

    function recommend(s) {
      var role = ROLES[s.role];
      var order = role[s.level] || role.newbie;
      var items = [];
      var add = function (slug, why) {
        if (items.some(function (x) { return x.slug === slug; })) return;
        var c = course(slug);
        if (c) items.push({ slug: slug, why: why, c: c });
      };
      order.slice(0, CORE_COUNT).forEach(function (slug) { add(slug, 'Core for your role'); });
      s.topics.forEach(function (t) {
        var n = 0;
        TOPICS[t].courses.forEach(function (slug) {
          if (n < 2 && !items.some(function (x) { return x.slug === slug; })) { add(slug, 'You chose ' + TOPICS[t].label.toLowerCase()); n++; }
        });
      });
      order.slice(CORE_COUNT).forEach(function (slug) { add(slug, 'Rounds out your role'); });
      // Fill the time budget in priority order, skipping courses that don't fit.
      var left = s.hours, plan = [];
      items.forEach(function (x) {
        var h = hoursOf(x.c);
        if (h <= left) { plan.push(x); left -= h; }
      });
      return plan;
    }

    function render() {
      var s = readForm();
      var plan = recommend(s);
      var tier = tierForSeats(s.seats);
      if (!plan.length) {
        list.innerHTML = '';
        empty.hidden = false;
        bundleBox.hidden = true;
        actions.hidden = true;
        ['hours', 'perSeat', 'total'].forEach(function (k) { set(root, k, '-'); });
        return;
      }
      empty.hidden = true;
      actions.hidden = false;
      var keep = picked;
      list.innerHTML = plan.map(function (x) {
        var checked = !keep || keep.indexOf(x.slug) !== -1;
        return '<li class="plan-item"><input type="checkbox" id="plan-' + x.slug + '" value="' + x.slug + '"' + (checked ? ' checked' : '') + ' aria-label="Include ' + escapeHtml(x.c.name) + '">' +
          '<div class="plan-item-main"><div class="plan-item-name"><a href="../courses/' + x.slug + '.html">' + escapeHtml(x.c.name) + '</a></div>' +
          '<div class="plan-item-why">' + escapeHtml(x.why) + '</div></div>' +
          '<div class="plan-item-figs">' + x.c.duration + '<br>' + usd(x.c.msrp) + '</div></li>';
      }).join('');
      totals(s, tier);
    }

    function selected() {
      return Array.prototype.slice.call(list.querySelectorAll('input:checked')).map(function (i) { return course(i.value); });
    }

    function totals(s, tier) {
      s = s || readForm();
      tier = tier || tierForSeats(s.seats);
      var chosen = selected();
      var hours = chosen.reduce(function (a, c) { return a + hoursOf(c); }, 0);
      var perSeat = chosen.reduce(function (a, c) { return a + c.msrp; }, 0);
      var total = chosen.reduce(function (a, c) { return a + tierPrice(c.msrp, tier) * s.seats; }, 0);
      set(root, 'hours', fmt(hours, hours % 1 ? 1 : 0) + ' hrs');
      set(root, 'perSeat', usd(perSeat));
      set(root, 'total', usd(total));
      set(root, 'totalLabel', s.seats === 1 ? 'Total for 1 seat' : 'Total for ' + s.seats + ' seats' + (tier.discount ? ' (' + Math.round(tier.discount * 100) + '% volume discount)' : ''));
      var slugs = chosen.map(function (c) { return c.slug; });

      // Bundle advice: the cheapest bundle that contains the whole plan, or the role's track bundle.
      var covering = DC_BUNDLES.filter(function (b) { return slugs.length && slugs.every(function (x) { return b.courses.indexOf(x) !== -1; }); })
        .sort(function (a, b) { return a.price - b.price; })[0];
      var role = ROLES[s.role];
      var html = '';
      var bundleSlug = null;
      if (covering && covering.price < perSeat) {
        bundleSlug = covering.slug;
        html = '<strong>Save with a bundle:</strong> the ' + escapeHtml(covering.name) + ' includes every course in your plan' +
          (covering.courses.length > slugs.length ? ' plus ' + (covering.courses.length - slugs.length) + ' more' : '') +
          ' for ' + usd(covering.price) + ' per seat, ' + usd(perSeat - covering.price) + ' less than buying these courses separately.';
      } else if (role.bundle) {
        var b = DC_BUNDLES.find(function (x) { return x.slug === role.bundle; });
        var listPrice = bundleListPrice(b);
        bundleSlug = b.slug;
        html = '<strong>Going further?</strong> The ' + escapeHtml(b.name) + ' has all ' + b.courses.length + ' courses in your track for ' + usd(b.price) +
          ' per seat, ' + Math.round((1 - b.price / listPrice) * 100) + '% less than buying them one at a time.';
      } else {
        var all = DC_BUNDLES.find(function (x) { return x.slug === 'bundle-complete-catalog'; });
        bundleSlug = all.slug;
        html = '<strong>Training a whole team?</strong> The ' + escapeHtml(all.name) + ' covers all ' + all.courses.length + ' courses for ' + usd(all.price) + ' per seat.';
      }
      bundleBox.innerHTML = html;
      bundleBox.hidden = !slugs.length;
      var bundleBtn = actions.querySelector('[data-plan="bundle"]');
      bundleBtn.href = '../checkout.html?item=' + bundleSlug + '&seats=' + s.seats;
      bundleBtn.hidden = !slugs.length;
      var single = actions.querySelector('[data-plan="single"]');
      if (single) {
        // One course left: enroll straight into it rather than a bundle.
        single.hidden = slugs.length !== 1;
        if (slugs.length === 1) single.href = '../checkout.html?item=' + slugs[0] + '&seats=' + s.seats;
        bundleBtn.hidden = bundleBtn.hidden || slugs.length === 1;
      }
      var lines = ['Training plan request', '', 'Role: ' + role.label, 'Seats: ' + s.seats, ''].concat(chosen.map(function (c) {
        return '- ' + c.name + ' (' + c.duration + ', ' + usd(c.msrp) + ')';
      })).concat(['', 'Total: ' + fmt(hours, hours % 1 ? 1 : 0) + ' hours, ' + usd(perSeat) + ' per seat, ' + usd(total) + ' for ' + s.seats + (s.seats === 1 ? ' seat' : ' seats'), '', 'Built with ' + window.location.href.split('#')[0]]);
      actions.querySelector('[data-plan="email"]').href = 'mailto:info@hazwoper-osha.com?subject=' + encodeURIComponent('Training plan request: ' + role.label + ' (' + s.seats + (s.seats === 1 ? ' seat)' : ' seats)')) + '&body=' + encodeURIComponent(lines.join('\n'));
      saveHash(s, slugs);
    }

    function saveHash(s, slugs) {
      var h = 'role=' + s.role + '&level=' + s.level + '&hours=' + (isFinite(s.hours) ? s.hours : 'any') + '&seats=' + s.seats +
        (s.topics.length ? '&topics=' + s.topics.join(',') : '') + (picked ? '&courses=' + slugs.join(',') : '');
      history.replaceState(null, '', '#' + h);
    }

    function loadHash() {
      // Plans are saved in the hash; links into the builder may preset it with a query string.
      var p = new URLSearchParams(window.location.hash.slice(1) || window.location.search.slice(1));
      if (!p.get('role') || !ROLES[p.get('role')]) return;
      var check = function (name, value) {
        var el = form.querySelector('[name="' + name + '"][value="' + value + '"]');
        if (el) el.checked = true;
      };
      check('role', p.get('role'));
      check('level', p.get('level'));
      (p.get('topics') || '').split(',').forEach(function (t) { check('topic', t); });
      var hours = form.querySelector('[name="hours"]');
      if (p.get('hours') && hours.querySelector('option[value="' + p.get('hours') + '"]')) hours.value = p.get('hours');
      var seats = parseInt(p.get('seats'), 10);
      if (seats > 0) form.querySelector('[name="seats"]').value = seats;
      if (p.get('courses')) picked = p.get('courses').split(',');
    }

    form.addEventListener('change', function (e) {
      if (e.target.closest('.plan-list')) return;
      picked = null;
      render();
    });
    form.addEventListener('input', function (e) {
      if (e.target.name === 'seats') totals();
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    list.addEventListener('change', function () {
      picked = Array.prototype.slice.call(list.querySelectorAll('input:checked')).map(function (i) { return i.value; });
      totals();
    });
    var share = actions.querySelector('[data-plan="share"]');
    share.addEventListener('click', function () {
      var url = window.location.href;
      var done = function (msg) { share.textContent = msg; setTimeout(function () { share.textContent = 'Copy Link to Plan'; }, 2200); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { done('Link copied!'); }, function () { done('Copy failed'); });
      else window.prompt('Copy this link:', url);
    });
    actions.querySelector('[data-plan="print"]').addEventListener('click', function () { window.print(); });

    loadHash();
    root.classList.add('plan-ready');
    render();
  }

  var TOOLS = { pue: initPue, uptime: initUptime, cooling: initCooling, plan: initPlan };

  function init() {
    document.querySelectorAll('[data-tool]').forEach(function (el) {
      var fn = TOOLS[el.getAttribute('data-tool')];
      if (fn) fn(el);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
