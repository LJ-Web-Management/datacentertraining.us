// Header behavior shared by every page: mobile menu toggle, dropdown menus,
// and the site search launcher (loads /js/search.js the first time it's used).
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav && !navToggle.dataset.navWired) {
    navToggle.dataset.navWired = '1';
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Dropdown menus: click or tap toggles; on desktop, hovering opens them too.
  if (mainNav && !mainNav.classList.contains('nav-js')) {
    mainNav.classList.add('nav-js');
    var items = Array.prototype.slice.call(mainNav.querySelectorAll('.nav-item'));
    var desktop = window.matchMedia('(min-width: 961px) and (hover: hover)');
    var setOpen = function (item, open) {
      item.classList.toggle('open', open);
      item.querySelector('.nav-trigger').setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    var closeAll = function (except) {
      items.forEach(function (item) { if (item !== except) setOpen(item, false); });
    };
    items.forEach(function (item) {
      var trigger = item.querySelector('.nav-trigger');
      var timer;
      trigger.addEventListener('click', function () {
        var open = !item.classList.contains('open');
        closeAll(item);
        setOpen(item, open);
      });
      item.addEventListener('mouseenter', function () {
        if (!desktop.matches) return;
        clearTimeout(timer);
        closeAll(item);
        setOpen(item, true);
      });
      item.addEventListener('mouseleave', function () {
        if (!desktop.matches) return;
        timer = setTimeout(function () { setOpen(item, false); }, 160);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && item.classList.contains('open')) {
          setOpen(item, false);
          trigger.focus();
        }
      });
      item.addEventListener('focusout', function (e) {
        if (desktop.matches && !item.contains(e.relatedTarget)) setOpen(item, false);
      });
    });
    document.addEventListener('click', function (e) {
      if (!mainNav.contains(e.target)) closeAll();
    });
  }

  // Site search: header button, Ctrl/Cmd+K, or "/" opens the search dialog.
  var loading = false;
  var openSearch = function () {
    if (window.DCTSearch) { window.DCTSearch.open(); return; }
    if (loading) return;
    loading = true;
    var s = document.createElement('script');
    s.src = '/js/search.js';
    s.onload = function () { if (window.DCTSearch) window.DCTSearch.open(); };
    s.onerror = function () { window.location.href = '/search.html'; };
    document.head.appendChild(s);
  };
  document.querySelectorAll('[data-search-open]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (mainNav) mainNav.classList.remove('open');
      openSearch();
    });
  });
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    var typing = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey) && !e.altKey) {
      e.preventDefault();
      openSearch();
    } else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      openSearch();
    }
  });
  // Show the Mac shortcut on Macs.
  if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
    document.querySelectorAll('.nav-search-kbd').forEach(function (k) { k.textContent = '⌘K'; });
  }
});
