// Cart page (cart.html): lists the courses saved in this browser by
// window.DCTCart (js/nav.js), prices them from js/config.js, and sends them to
// checkout together as checkout.html?items=<slug>,<slug>&seats=<n>.
document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('[data-cart-page]');
  if (!root || !window.DCTCart || typeof DC_COURSES === 'undefined') return;
  var cart = window.DCTCart;

  // cart.html?add=<slug>[,<slug>]: what Add to Cart links open without JavaScript.
  var params = new URLSearchParams(window.location.search);
  if (params.get('add')) {
    cart.add(params.get('add').split(','));
    history.replaceState(null, '', window.location.pathname);
  }

  var empty = root.querySelector('.cart-empty');
  var layout = root.querySelector('.cart-layout');
  var list = root.querySelector('.cart-list');
  var seatsInput = root.querySelector('#cartSeats');
  var checkout = root.querySelector('[data-cart-checkout]');
  var course = function (slug) { return DC_COURSES.find(function (c) { return c.slug === slug; }); };
  var usd = function (n) { return '$' + formatMoney(n); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var set = function (key, text) {
    var el = root.querySelector('[data-out="' + key + '"]');
    if (el) el.textContent = text;
  };

  function render() {
    var state = cart.read();
    var items = state.items.map(course).filter(Boolean);
    empty.hidden = items.length > 0;
    layout.hidden = !items.length;
    if (!items.length) return;

    list.innerHTML = items.map(function (c) {
      return '<li class="cart-item">' +
        '<div class="cart-item-main"><a href="courses/' + c.slug + '.html">' + esc(c.name) + '</a>' +
        '<div class="cart-item-meta">' + esc(c.duration) + ' &middot; ' + esc(c.category) + '</div></div>' +
        '<div class="cart-item-price">' + usd(c.msrp) + '<span>per seat</span></div>' +
        '<button type="button" class="cart-remove" data-remove="' + c.slug + '" aria-label="Remove ' + esc(c.name) + ' from cart">Remove</button></li>';
    }).join('');

    var seats = state.seats;
    if (document.activeElement !== seatsInput) seatsInput.value = String(seats);
    var tier = tierForSeats(seats);
    var perSeat = items.reduce(function (sum, c) { return sum + c.msrp; }, 0);
    var hours = items.reduce(function (sum, c) { return sum + parseFloat(c.duration); }, 0);
    var subtotal = Math.round(perSeat * seats * 100) / 100;
    // The volume discount applies to each course's per-seat price, as at checkout.
    var total = Math.round(items.reduce(function (sum, c) { return sum + tierPrice(c.msrp, tier) * seats; }, 0) * 100) / 100;
    set('count', items.length + (items.length === 1 ? ' course' : ' courses'));
    set('hours', (hours % 1 ? hours.toFixed(1) : hours) + ' hrs');
    set('perSeat', usd(perSeat));
    set('subtotal', usd(subtotal) + (seats > 1 ? ' (' + seats + ' seats)' : ''));
    set('discountLabel', 'Volume discount (' + Math.round(tier.discount * 100) + '%)');
    set('discount', '-' + usd(Math.round((subtotal - total) * 100) / 100));
    root.querySelector('[data-row="discount"]').hidden = !tier.discount;
    set('total', usd(total));

    var slugs = items.map(function (c) { return c.slug; });
    checkout.href = 'checkout.html?' + (slugs.length === 1 ? 'item=' + slugs[0] : 'items=' + slugs.join(',')) + '&seats=' + seats + '&from=cart';
    checkout.textContent = 'Check Out ' + (slugs.length === 1 ? '1 Course' : slugs.length + ' Courses');
  }

  list.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-remove]');
    if (btn) cart.remove(btn.getAttribute('data-remove'));
  });
  seatsInput.addEventListener('input', function () {
    var n = parseInt(seatsInput.value, 10);
    if (n > 0) cart.setSeats(n);
  });
  // Only tidy the field on blur: re-rendering here would replace the list under a click.
  seatsInput.addEventListener('blur', function () { seatsInput.value = String(cart.read().seats); });
  root.querySelector('[data-cart-clear]').addEventListener('click', function () { cart.clear(); });
  document.addEventListener('dct:cart', render);
  window.addEventListener('storage', function (e) { if (e.key === 'dctCart') render(); });
  render();
});
