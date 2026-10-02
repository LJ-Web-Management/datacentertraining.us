/* Privacy choices for datacentertraining.us.
 *
 * Both categories are on by default for every visitor (opt-out model):
 *   analytics: Google Analytics, Ahrefs Web Analytics, Microsoft Clarity (session recording)
 *   chat:      Tawk.to live chat
 * A browser Global Privacy Control (GPC) signal is honored as an opt-out of
 * analytics. A visitor's opt-out is kept in localStorage under "dct-consent"
 * and can be changed any time from the "Your Privacy Choices" footer link
 * (any element with [data-privacy-choices]).
 *
 * The loaders themselves live in the <!-- dct:head --> block (scripts/build-site.js)
 * and are exposed as window.dctLoad.analytics() / window.dctLoad.chat().
 */
(function (w, d) {
  var KEY = 'dct-consent';
  var VERSION = 1;
  var DEFAULT = { analytics: true, chat: true };
  var gpc = navigator.globalPrivacyControl === true;

  function read() {
    try {
      var v = JSON.parse(w.localStorage.getItem(KEY) || 'null');
      return v && v.v === VERSION ? v : null;
    } catch (e) { return null; }
  }
  function write(choice) {
    try { w.localStorage.setItem(KEY, JSON.stringify(choice)); } catch (e) { /* storage blocked: choice lasts for this page only */ }
  }

  function apply(choice, immediate) {
    var load = w.dctLoad || {};
    if (choice.analytics && !gpc && load.analytics) load.analytics(immediate);
    if (choice.chat && load.chat) load.chat(immediate);
  }

  function privacyHref() {
    var s = d.querySelector('script[src$="consent.js"]');
    return s ? s.getAttribute('src').replace(/js\/consent\.js$/, 'privacy.html') : '/privacy.html';
  }

  var banner = null;
  var lastFocus = null;

  // Keep the Tawk.to bubble out of the way while the panel is open.
  function tawk(method) {
    try { if (w.Tawk_API && typeof w.Tawk_API[method] === 'function') w.Tawk_API[method](); } catch (e) { /* chat not loaded */ }
  }

  function close() {
    if (banner) { banner.remove(); banner = null; tawk('showWidget'); }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function save(analytics, chat) {
    var prev = read() || { analytics: !gpc, chat: true };
    var choice = { v: VERSION, analytics: !!analytics && !gpc, chat: !!chat, ts: new Date().toISOString() };
    write(choice);
    close();
    // Turning something off after it has loaded needs a page reload to unload it.
    // The reload is an ordinary page request; the choice itself never leaves the browser.
    if ((prev.analytics && !choice.analytics) || (prev.chat && !choice.chat)) {
      w.location.reload();
      return;
    }
    apply(choice, true);
  }

  function open(fromUser) {
    if (banner) { banner.querySelector('input:not([disabled]), button').focus(); return; }
    lastFocus = d.activeElement;
    var cur = read() || DEFAULT;
    banner = d.createElement('section');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Privacy choices');
    banner.innerHTML =
      '<h2 class="consent-title">Your privacy choices</h2>' +
      '<p class="consent-text">We use analytics, session recording, and live chat to understand how the site is used and to answer questions. ' +
      'Uncheck a box and save to turn it off for this browser. See our <a href="' + privacyHref() + '">Privacy Policy</a>.</p>' +
      (gpc ? '<p class="consent-text consent-gpc">Your browser is sending a Global Privacy Control signal, so analytics and session recording stay off.</p>' : '') +
      '<div class="consent-options">' +
        '<label><input type="checkbox" id="consentAnalytics"' + (cur.analytics && !gpc ? ' checked' : '') + (gpc ? ' disabled' : '') + '> ' +
          '<span><strong>Analytics and session recording</strong> (Google Analytics, Ahrefs Web Analytics, Microsoft Clarity): pages viewed, clicks, scrolling, and device details.</span></label>' +
        '<label><input type="checkbox" id="consentChat"' + (cur.chat ? ' checked' : '') + '> ' +
          '<span><strong>Live chat</strong> (Tawk.to): the chat window and the messages you send in it.</span></label>' +
      '</div>' +
      '<div class="consent-actions">' +
        '<button type="button" class="btn btn-secondary btn-sm" data-consent="reject">Turn all off</button>' +
        '<button type="button" class="btn btn-secondary btn-sm" data-consent="save">Save choices</button>' +
        '<button type="button" class="btn btn-primary btn-sm" data-consent="accept">Allow all</button>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var act = e.target.getAttribute && e.target.getAttribute('data-consent');
      if (!act) return;
      if (act === 'accept') save(true, true);
      else if (act === 'reject') save(false, false);
      else save(d.getElementById('consentAnalytics').checked, d.getElementById('consentChat').checked);
    });
    banner.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
    d.body.appendChild(banner);
    tawk('hideWidget');
    if (fromUser) banner.querySelector('input:not([disabled]), button').focus();
  }

  w.dctConsent = { open: function () { open(true); }, get: read };

  function init() {
    d.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-privacy-choices]');
      if (t) { e.preventDefault(); open(true); }
    });
    apply(read() || DEFAULT, false);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init);
  else init();
})(window, document);
