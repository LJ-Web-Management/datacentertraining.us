// Course request form (course-request.html): turns the fields into an email to
// the sales team and opens it in the visitor's own mail app. Nothing is sent
// from the page itself. Without JavaScript the form falls back to a plain-text
// mailto: post. ?topic=<text> pre-fills the topic (the catalog and site search
// link here with the search that found nothing).
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('courseRequestForm');
  if (!form) return;
  var TO = 'sales@hazwoper-osha.com';
  // Some mail apps truncate or refuse very long mailto: links.
  var MAX_HREF = 1900;
  var sent = document.getElementById('requestSent');
  var copyBox = document.getElementById('requestCopy');
  var copyBtn = document.getElementById('requestCopyBtn');
  var copied = document.getElementById('requestCopied');
  var mailLink = document.getElementById('requestMailLink');
  form.noValidate = true;

  var topic = new URLSearchParams(window.location.search).get('topic');
  if (topic && !form.elements.topic.value) form.elements.topic.value = topic.slice(0, 120);

  var val = function (name) { return String(form.elements[name].value || '').trim(); };

  // Required fields show their own message under the field.
  var check = function (input) {
    var error = document.getElementById(input.getAttribute('aria-describedby'));
    var ok = input.checkValidity() && (!input.required || input.value.trim() !== '');
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    input.closest('.tool-input-wrap').classList.toggle('is-invalid', !ok);
    if (error) error.hidden = ok;
    return ok;
  };
  var required = Array.prototype.slice.call(form.querySelectorAll('[required]'));
  required.forEach(function (input) {
    input.addEventListener('blur', function () { if (input.value) check(input); });
    input.addEventListener('input', function () { if (input.getAttribute('aria-invalid') === 'true') check(input); });
  });

  var build = function (details) {
    var lines = ['Course request from datacentertraining.us', ''];
    var add = function (label, value) { if (value) lines.push(label + ': ' + value); };
    add('Course or topic', val('topic'));
    add('Standards or regulations', val('standards'));
    add('Number of learners', val('learners'));
    add('Preferred format', val('format'));
    add('Needed', val('timeline'));
    if (details) lines.push('', 'What it should cover:', details);
    lines.push('');
    add('Name', val('name'));
    add('Email', val('email'));
    add('Phone', val('phone'));
    add('Company', val('company'));
    add('Role', val('role'));
    return lines.join('\n');
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = required.filter(function (input) { return !check(input); });
    if (bad.length) { bad[0].focus(); return; }

    var subject = 'Course request: ' + val('topic');
    var details = val('details');
    var body = build(details);
    var href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    // Shorten only the email; the full text stays in the copy box below.
    while (href.length > MAX_HREF && details.length > 40) {
      details = details.slice(0, Math.floor(details.length * 0.8)).replace(/\s+\S*$/, '') + ' [shortened, full text to follow]';
      href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(build(details));
    }

    copyBox.value = 'To: ' + TO + '\nSubject: ' + subject + '\n\n' + body;
    mailLink.href = href;
    copied.textContent = '';
    form.hidden = true;
    sent.hidden = false;
    sent.focus();
    window.location.href = href;
  });

  copyBtn.addEventListener('click', function () {
    var done = function () { copied.textContent = 'Copied.'; };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(copyBox.value).then(done, function () { copyBox.select(); });
    } else {
      copyBox.select();
      try { if (document.execCommand('copy')) done(); } catch (err) { /* the text stays selected to copy by hand */ }
    }
  });

  document.getElementById('requestEdit').addEventListener('click', function () {
    sent.hidden = true;
    form.hidden = false;
    form.elements.topic.focus();
  });
});
