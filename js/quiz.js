// Quizzes on /quizzes/. The questions, answers, and explanations are static
// HTML (crawlable, and readable without JavaScript via "Show answer"); this
// file turns them into a one-question-at-a-time quiz with a score.
//
//   <section class="quiz" data-quiz-id="..." data-quiz-type="knowledge|career">
//   knowledge: each <li class="quiz-q" data-answer="b"> has radio values a-d
//   career:    each radio value lists the role ids it points to ("hvac operations"),
//              and <div class="career-result" data-role="hvac"> holds each result
//
// Best scores are kept in localStorage so /quizzes/ can show them; the quiz
// still works when storage is blocked.
(function () {
  'use strict';

  var PREFIX = 'dct-quiz:';

  function readScore(id) {
    try { return JSON.parse(window.localStorage.getItem(PREFIX + id)); } catch (e) { return null; }
  }

  function saveScore(id, value) {
    try { window.localStorage.setItem(PREFIX + id, JSON.stringify(value)); } catch (e) { /* storage blocked */ }
  }

  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  }

  function liveRegion(root) {
    var el = document.createElement('p');
    el.className = 'visually-hidden';
    el.setAttribute('aria-live', 'polite');
    root.appendChild(el);
    return function (msg) { el.textContent = ''; setTimeout(function () { el.textContent = msg; }, 30); };
  }

  function optionText(label) {
    return label.querySelector('span').textContent.trim();
  }

  function share(btn, text) {
    var url = window.location.href.split('#')[0];
    var done = function (msg) {
      var old = btn.getAttribute('data-label') || btn.textContent;
      btn.setAttribute('data-label', old);
      btn.textContent = msg;
      setTimeout(function () { btn.textContent = old; }, 2200);
    };
    if (navigator.share) {
      navigator.share({ title: document.title, text: text, url: url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text + ' ' + url).then(function () { done('Link copied!'); }, function () { done('Copy failed'); });
    } else {
      window.prompt('Copy this link:', text + ' ' + url);
    }
  }

  function initQuiz(root) {
    var type = root.getAttribute('data-quiz-type') || 'knowledge';
    var id = root.getAttribute('data-quiz-id');
    var title = root.getAttribute('data-quiz-title') || document.title;
    var qs = Array.prototype.slice.call(root.querySelectorAll('.quiz-q'));
    if (!qs.length) return;
    var total = qs.length;
    var progressText = root.querySelector('.quiz-progress-text');
    var progressBar = root.querySelector('.quiz-progress-bar');
    var progressScore = root.querySelector('.quiz-progress-score');
    var nav = root.querySelector('.quiz-nav');
    var next = root.querySelector('.quiz-next');
    var back = root.querySelector('.quiz-back');
    var hint = root.querySelector('.quiz-nav-hint');
    var result = root.querySelector('.quiz-result');
    var announce = liveRegion(root);
    var idx = 0, score = 0, picks = [], autoTimer;

    root.classList.add('quiz-js');

    function show(i) {
      idx = i;
      qs.forEach(function (q, n) { q.classList.toggle('current', n === i); });
      if (progressText) progressText.textContent = 'Question ' + (i + 1) + ' of ' + total;
      if (progressBar) progressBar.style.width = (i / total * 100) + '%';
      if (progressScore) progressScore.textContent = 'Score ' + score;
      var answered = picks[i] !== undefined;
      next.disabled = !answered;
      next.textContent = i === total - 1 ? (type === 'career' ? 'See my match' : 'See my score') : 'Next question';
      if (hint) hint.textContent = answered ? '' : 'Choose an answer to continue.';
      if (back) back.hidden = i === 0;
    }

    function answerKnowledge(q, input) {
      var i = qs.indexOf(q);
      if (picks[i] !== undefined) return;
      var correct = q.getAttribute('data-answer');
      var isRight = input.value === correct;
      picks[i] = input.value;
      if (isRight) score++;
      var rightLabel = null;
      q.querySelectorAll('.quiz-opt').forEach(function (label) {
        var inp = label.querySelector('input');
        label.classList.add('locked');
        if (inp.value === correct) { label.classList.add('correct'); rightLabel = label; }
        else if (inp === input) label.classList.add('incorrect');
        inp.disabled = true;
      });
      var explain = q.querySelector('.quiz-explain');
      if (explain) {
        var verdict = document.createElement('span');
        verdict.className = 'quiz-verdict ' + (isRight ? 'is-correct' : 'is-incorrect');
        verdict.textContent = isRight ? 'Correct!' : 'Not quite. The answer is: ' + optionText(rightLabel);
        var summary = explain.querySelector('summary');
        if (summary) summary.insertAdjacentElement('afterend', verdict); else explain.insertBefore(verdict, explain.firstChild);
        explain.open = true;
      }
      announce(isRight ? 'Correct.' : 'Incorrect. The correct answer is ' + optionText(rightLabel) + '.');
      if (progressScore) progressScore.textContent = 'Score ' + score;
      next.disabled = false;
      if (hint) hint.textContent = '';
      next.focus({ preventScroll: true });
    }

    function answerCareer(q, input) {
      var i = qs.indexOf(q);
      picks[i] = input.value;
      q.querySelectorAll('.quiz-opt').forEach(function (label) {
        label.classList.toggle('picked', label.querySelector('input') === input);
      });
      next.disabled = false;
      if (hint) hint.textContent = '';
      clearTimeout(autoTimer);
      autoTimer = setTimeout(function () { if (idx === i) go(); }, 450);
    }

    function go() {
      if (idx < total - 1) {
        show(idx + 1);
        var first = qs[idx].querySelector('input:not([disabled])');
        if (first) first.focus({ preventScroll: true });
        root.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        finish();
      }
    }

    function finishKnowledge() {
      var prev = readScore(id);
      var best = Math.max(score, prev && prev.best ? prev.best : 0);
      saveScore(id, { best: best, last: score, total: total, date: new Date().toISOString().slice(0, 10) });
      result.querySelector('.quiz-score').textContent = score + '/' + total;
      var tiers = Array.prototype.slice.call(result.querySelectorAll('.quiz-tier'));
      var tier = tiers.filter(function (t) { return score >= +t.getAttribute('data-min'); })
        .sort(function (a, b) { return b.getAttribute('data-min') - a.getAttribute('data-min'); })[0];
      tiers.forEach(function (t) { t.hidden = t !== tier; });
      var bestEl = result.querySelector('.quiz-best');
      if (bestEl) bestEl.textContent = prev && prev.best ? 'Your best score on this quiz: ' + best + '/' + total : '';
      var review = result.querySelector('.quiz-review ol');
      if (review) {
        review.innerHTML = '';
        qs.forEach(function (q, n) {
          var li = document.createElement('li');
          var correctLabel = q.querySelector('input[value="' + q.getAttribute('data-answer') + '"]').closest('.quiz-opt');
          var ok = picks[n] === q.getAttribute('data-answer');
          var status = document.createElement('span');
          status.className = ok ? 'is-correct' : 'is-incorrect';
          status.textContent = ok ? 'Correct: ' : 'Missed: ';
          li.appendChild(status);
          li.appendChild(document.createTextNode(q.querySelector('.quiz-q-text').textContent.trim() + (ok ? '' : ' (Answer: ' + optionText(correctLabel) + ')')));
          review.appendChild(li);
        });
      }
      track('quiz_complete', { quiz_id: id, score: score, total: total });
      return 'I scored ' + score + '/' + total + ' on the ' + title + '. Can you beat it?';
    }

    function finishCareer() {
      var points = {};
      var results = Array.prototype.slice.call(result.querySelectorAll('.career-result'));
      var order = results.map(function (r) { return r.getAttribute('data-role'); });
      order.forEach(function (r) { points[r] = 0; });
      picks.forEach(function (v) {
        String(v || '').split(/\s+/).forEach(function (r, n) { if (r in points) points[r] += n === 0 ? 2 : 1; });
      });
      var ranked = order.slice().sort(function (a, b) { return points[b] - points[a] || order.indexOf(a) - order.indexOf(b); });
      results.forEach(function (r) { r.hidden = r.getAttribute('data-role') !== ranked[0]; });
      var also = result.querySelector('.career-also');
      if (also) {
        var second = results[order.indexOf(ranked[1])];
        var name = second.querySelector('h3').textContent.trim();
        also.innerHTML = '';
        also.appendChild(document.createTextNode('Also a strong fit: '));
        var a = document.createElement('a');
        a.href = second.getAttribute('data-href') || '#';
        a.textContent = name;
        also.appendChild(a);
      }
      var winner = results[order.indexOf(ranked[0])].querySelector('h3').textContent.trim();
      saveScore(id, { role: ranked[0], label: winner, date: new Date().toISOString().slice(0, 10) });
      track('quiz_complete', { quiz_id: id, result: ranked[0] });
      return 'My data center career match is ' + winner + '. Find yours:';
    }

    var shareText = '';
    function finish() {
      clearTimeout(autoTimer);
      qs.forEach(function (q) { q.classList.remove('current'); });
      if (progressBar) progressBar.style.width = '100%';
      if (progressText) progressText.textContent = type === 'career' ? 'Done!' : 'Quiz complete';
      nav.hidden = true;
      shareText = type === 'career' ? finishCareer() : finishKnowledge();
      result.hidden = false;
      var heading = result.querySelector('.quiz-score, .career-result:not([hidden]) h3');
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      announce(type === 'career' ? 'Your career match is ready.' : 'You scored ' + score + ' out of ' + total + '.');
    }

    function reset() {
      idx = 0; score = 0; picks = [];
      qs.forEach(function (q) {
        q.querySelectorAll('.quiz-opt').forEach(function (label) {
          label.classList.remove('locked', 'correct', 'incorrect', 'picked');
          var inp = label.querySelector('input');
          inp.disabled = false;
          inp.checked = false;
        });
        var explain = q.querySelector('.quiz-explain');
        if (explain) {
          explain.open = false;
          var v = explain.querySelector('.quiz-verdict');
          if (v) v.remove();
        }
      });
      result.hidden = true;
      nav.hidden = false;
      show(0);
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var first = qs[0].querySelector('input');
      if (first) first.focus({ preventScroll: true });
    }

    root.addEventListener('change', function (e) {
      var input = e.target;
      if (input.type !== 'radio') return;
      var q = input.closest('.quiz-q');
      if (!q || !q.classList.contains('current')) return;
      if (type === 'career') answerCareer(q, input); else answerKnowledge(q, input);
    });
    next.addEventListener('click', go);
    if (back) back.addEventListener('click', function () { clearTimeout(autoTimer); if (idx > 0) show(idx - 1); });
    var retake = result.querySelector('.quiz-retake');
    if (retake) retake.addEventListener('click', reset);
    var shareBtn = result.querySelector('.quiz-share');
    if (shareBtn) shareBtn.addEventListener('click', function () { share(shareBtn, shareText); });

    show(0);
  }

  // Hub pages: show the visitor's best score on each quiz card.
  function showScores() {
    document.querySelectorAll('[data-quiz-score]').forEach(function (el) {
      var s = readScore(el.getAttribute('data-quiz-score'));
      if (!s) return;
      if (s.label) el.textContent = 'Your match: ' + s.label;
      else if (s.total) el.textContent = 'Your best: ' + s.best + '/' + s.total;
      else return;
      el.hidden = false;
    });
  }

  function init() {
    document.querySelectorAll('.quiz[data-quiz-id]').forEach(initQuiz);
    showScores();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
