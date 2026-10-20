// Header behavior shared by every page: mobile menu toggle, dropdown menus,
// the site search launcher (loads /js/search.js the first time it's used), and
// the course cart.

// Cart: the course slugs a visitor has added, plus a seat count, saved in this
// browser's localStorage. Bundles are bought on their own, so only courses go
// in the cart. Buttons opt in with data-cart-add="slug[,slug...]" and work as
// plain links to cart.html?add=... when this script isn't running.
window.DCTCart = (function () {
  var KEY = 'dctCart';
  var valid = function (slug) { return /^[a-z0-9-]+$/.test(slug) && slug.indexOf('bundle-') !== 0; };
  var read = function () {
    var c = null;
    try { c = JSON.parse(window.localStorage.getItem(KEY)); } catch (e) { c = null; }
    var items = c && Array.isArray(c.items) ? c.items.filter(function (x, i, all) { return typeof x === 'string' && valid(x) && all.indexOf(x) === i; }) : [];
    var seats = c && c.seats > 0 ? Math.min(1000, Math.floor(c.seats)) : 1;
    return { items: items, seats: seats };
  };
  var write = function (cart) {
    try { window.localStorage.setItem(KEY, JSON.stringify({ items: cart.items, seats: cart.seats })); } catch (e) { /* storage blocked: the cart lasts for this page only */ }
    refresh();
    document.dispatchEvent(new CustomEvent('dct:cart'));
  };
  var add = function (slugs) {
    var cart = read();
    slugs.filter(valid).forEach(function (slug) { if (cart.items.indexOf(slug) === -1) cart.items.push(slug); });
    write(cart);
  };
  var remove = function (slug) {
    var cart = read();
    cart.items = cart.items.filter(function (x) { return x !== slug; });
    write(cart);
  };
  var setSeats = function (n) {
    var cart = read();
    cart.seats = n > 0 ? Math.min(1000, Math.floor(n)) : 1;
    write(cart);
  };
  var clear = function () { write({ items: [], seats: 1 }); };
  var slugsOf = function (el) { return (el.getAttribute('data-cart-add') || '').split(',').filter(valid); };
  // Update the header count and every Add to Cart button to match the cart.
  var refresh = function () {
    var items = read().items;
    Array.prototype.forEach.call(document.querySelectorAll('[data-cart-count]'), function (el) {
      el.textContent = String(items.length);
      el.hidden = !items.length;
    });
    Array.prototype.forEach.call(document.querySelectorAll('.nav-cart'), function (el) {
      el.setAttribute('aria-label', items.length ? 'Cart, ' + items.length + (items.length === 1 ? ' course' : ' courses') : 'Cart');
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-cart-add]'), function (el) {
      if (!el.hasAttribute('data-cart-label')) el.setAttribute('data-cart-label', el.textContent);
      var slugs = slugsOf(el);
      var inCart = slugs.length > 0 && slugs.every(function (x) { return items.indexOf(x) !== -1; });
      el.classList.toggle('in-cart', inCart);
      el.textContent = inCart ? 'In Cart \u2713' : el.getAttribute('data-cart-label');
      var name = el.getAttribute('data-cart-name');
      if (name) el.setAttribute('aria-label', (inCart ? 'In your cart: ' : 'Add to cart: ') + name);
      if (el.tagName === 'A') {
        var base = el.getAttribute('href').split('?')[0];
        el.setAttribute('href', inCart ? base : base + '?add=' + slugs.join(','));
      }
    });
  };
  return { read: read, add: add, remove: remove, setSeats: setSeats, clear: clear, refresh: refresh, slugsOf: slugsOf };
})();

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
  // Cart: Add to Cart buttons add their courses and say so; once a course is
  // in the cart, the same button links to the cart page.
  var cart = window.DCTCart;
  var toast;
  var showAdded = function (n) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'cart-toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    var cartLink = document.querySelector('.nav-cart');
    toast.innerHTML = '<span>' + (n === 1 ? 'Course added to your cart.' : n + ' courses added to your cart.') + '</span><a href="' + (cartLink ? cartLink.getAttribute('href') : '/cart.html') + '">View cart &rarr;</a>';
    toast.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { toast.classList.remove('show'); }, 4000);
  };
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-cart-add]');
    if (!btn || btn.classList.contains('in-cart') || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var slugs = cart.slugsOf(btn);
    if (!slugs.length) return;
    e.preventDefault();
    var before = cart.read().items.length;
    cart.add(slugs);
    showAdded(cart.read().items.length - before || slugs.length);
  });
  window.addEventListener('storage', function (e) { if (e.key === 'dctCart') cart.refresh(); });
  cart.refresh();

  // Show the Mac shortcut on Macs.
  if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
    document.querySelectorAll('.nav-search-kbd').forEach(function (k) { k.textContent = '⌘K'; });
  }
});
