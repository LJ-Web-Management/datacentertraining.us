/* Privacy choices for datacentertraining.us.
 *
 * Nothing that tracks visitors loads until the visitor opts in:
 *   analytics: Google Analytics, Ahrefs Web Analytics, Microsoft Clarity (session recording)
 *   chat:      Tawk.to live chat
 * A browser Global Privacy Control (GPC) signal is honored as an opt-out of
 * analytics. The choice is kept in localStorage under "dct-consent" and can be
 * changed any time from the "Your Privacy Choices" footer link
 * (any element with [data-privacy-choices]).
 *
 * The loaders themselves live in the <!-- dct:head --> block (scripts/build-site.js)
 * and are exposed as window.dctLoad.analytics() / window.dctLoad.chat().
 */
(function (w, d) {
  var KEY = 'dct-consent';
  var VERSION = 1;
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

  function close() {
    if (banner) { banner.remove(); banner = null; }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function save(analytics, chat) {
    var prev = read();
    var choice = { v: VERSION, analytics: !!analytics && !gpc, chat: !!chat, ts: new Date().toISOString() };
    write(choice);
    close();
    // Turning something off after it has loaded needs a reload to unload it.
    if (prev && ((prev.analytics && !choice.analytics) || (prev.chat && !choice.chat))) {
      w.location.reload();
      return;
    }
    apply(choice, true);
  }

  function open(fromUser) {
    if (banner) { banner.querySelector('input:not([disabled]), button').focus(); return; }
    lastFocus = d.activeElement;
    var cur = read() || { analytics: false, chat: false };
    banner = d.createElement('section');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Privacy choices');
    banner.innerHTML =
      '<h2 class="consent-title">Your privacy choices</h2>' +
      '<p class="consent-text">We use optional tools to understand how the site is used and to offer live chat. ' +
      'They stay off unless you turn them on. See our <a href="' + privacyHref() + '">Privacy Policy</a>.</p>' +
      (gpc ? '<p class="consent-text consent-gpc">Your browser is sending a Global Privacy Control signal, so analytics and session recording stay off.</p>' : '') +
      '<div class="consent-options">' +
        '<label><input type="checkbox" id="consentAnalytics"' + (cur.analytics && !gpc ? ' checked' : '') + (gpc ? ' disabled' : '') + '> ' +
          '<span><strong>Analytics and session recording</strong> (Google Analytics, Ahrefs Web Analytics, Microsoft Clarity): pages viewed, clicks, scrolling, and device details.</span></label>' +
        '<label><input type="checkbox" id="consentChat"' + (cur.chat ? ' checked' : '') + '> ' +
          '<span><strong>Live chat</strong> (Tawk.to): the chat window and the messages you send in it.</span></label>' +
      '</div>' +
      '<div class="consent-actions">' +
        '<button type="button" class="btn btn-secondary btn-sm" data-consent="reject">Reject all</button>' +
        '<button type="button" class="btn btn-secondary btn-sm" data-consent="save">Save choices</button>' +
        '<button type="button" class="btn btn-primary btn-sm" data-consent="accept">Accept all</button>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var act = e.target.getAttribute && e.target.getAttribute('data-consent');
      if (!act) return;
      if (act === 'accept') save(true, true);
      else if (act === 'reject') save(false, false);
      else save(d.getElementById('consentAnalytics').checked, d.getElementById('consentChat').checked);
    });
    banner.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && read()) close();
    });
    d.body.appendChild(banner);
    if (fromUser) banner.querySelector('input:not([disabled]), button').focus();
  }

  w.dctConsent = { open: function () { open(true); }, get: read };

  function init() {
    d.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-privacy-choices]');
      if (t) { e.preventDefault(); open(true); }
    });
    var choice = read();
    if (choice) apply(choice, false);
    else open();
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init);
  else init();
})(window, document);
