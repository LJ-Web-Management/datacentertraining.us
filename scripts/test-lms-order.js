#!/usr/bin/env node
// Sends the same add_new_user + add_order requests that checkout.html sends,
// so you can check that a course or bundle links to the right LMS course(s).
//
//   node scripts/test-lms-order.js --item data-center-epo-procedures --email you+test@example.com
//   node scripts/test-lms-order.js --item data-center-epo-procedures --email you+test@example.com --send
//
// Without --send it only prints the requests. With --send it calls the LIVE
// API: it creates a real user and a real pending order in the LMS. No card is
// charged unless you pass --payment-method-id with a real Stripe payment method.
//
// Options: --item <slug>  --email <address>  --seats <n> (default 1)
//          --first <name> --last <name>  --payment-method-id <pm_...>
//          --api <base url> (default API_BASE_URL in js/config.js)  --send

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const k = process.argv[i].replace(/^--/, '');
  const next = process.argv[i + 1];
  if (next && !next.startsWith('--')) { args[k] = next; i++; } else args[k] = true;
}

const ctx = { window: {}, console };
vm.createContext(ctx);
const cfgSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'config.js'), 'utf8').replace(/^const /gm, 'var ');
vm.runInContext(cfgSrc, ctx);

const item = args.item ? ctx.findDcItem(args.item) : null;
if (!item || !args.email) {
  console.error('Usage: node scripts/test-lms-order.js --item <course-or-bundle-slug> --email <address> [--seats n] [--send]');
  if (args.item && !item) console.error('Unknown item "' + args.item + '". Slugs are in js/config.js.');
  process.exit(1);
}

if (item.type === 'bundle') {
  console.log('Note: checkout sends bundle orders by email, not to the LMS API. This still tests that the LMS accepts the bundle\'s course IDs.');
}

const api = (typeof args.api === 'string' ? args.api : ctx.API_BASE_URL).replace(/\/$/, '');
const seats = parseInt(args.seats, 10) > 0 ? parseInt(args.seats, 10) : 1;
const first = args.first || 'DCT';
const last = args.last || 'API Test';
const courseIds = item.type === 'bundle' ? item.courseIds : [item.courseId];

const userPayload = {
  first_name: first, last_name: last, email: args.email,
  user_name: first + ' ' + last, user_role_id: 2, phone: ''
};
const orderPayload = (customerId) => ({
  customer_id: customerId,
  payment_method: 'stripe',
  payment_method_id: args['payment-method-id'] || '',
  order_type: 'normal',
  order_status: 'pending',
  order_from: 'datacentertraining.us',
  billing_first_name: first,
  billing_last_name: last,
  billing_name: first + ' ' + last,
  billing_email: args.email,
  billing_phone: '',
  billing_company: 'API test - please ignore',
  billing_address_1: '', billing_address_2: '', billing_city: '', billing_state: '', billing_postcode: '', billing_country: 'US',
  shipping_address_1: '', shipping_address_2: '', shipping_city: '', shipping_state: '', shipping_postcode: '', shipping_country: 'US',
  courses: courseIds.map((cid) => ({
    course_id: cid,
    quantity: seats,
    users: [{ first_name: first, last_name: last, email: args.email, user_name: '' }]
  }))
});

const post = async (url, body) => {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const text = await res.text();
  let parsed; try { parsed = JSON.parse(text); } catch (e) { parsed = text; }
  return { status: res.status, body: parsed };
};
const show = (label, x) => console.log('\n== ' + label + '\n' + (typeof x === 'string' ? x : JSON.stringify(x, null, 2)));

(async () => {
  console.log(item.type + ': ' + item.name + ' -> LMS course id' + (courseIds.length > 1 ? 's ' : ' ') + courseIds.join(', '));
  if (!args.send) {
    show('POST ' + api + '/add_new_user', userPayload);
    show('POST ' + api + '/add_order', orderPayload('<user_id from add_new_user>'));
    console.log('\nDry run: nothing sent. Add --send to call the live API.');
    return;
  }

  const user = await post(api + '/add_new_user', userPayload);
  show('add_new_user -> HTTP ' + user.status, user.body);
  const b = user.body || {};
  const customerId = b.user_id || (b.data && b.data.user_id) || (b.success && b.success.user_id) || (b.user && b.user.user_id) || 0;
  if (!customerId) console.log('\nNo user_id in the response; sending add_order with customer_id 0, as checkout does.');

  const order = await post(api + '/add_order', orderPayload(customerId));
  show('add_order -> HTTP ' + order.status, order.body);

  const ok = order.status >= 200 && order.status < 300 && order.body && order.body.success !== false && !order.body.error;
  console.log('\n' + (ok
    ? 'Order accepted. In the LMS admin, open this order / user ' + args.email + ' and confirm it lists course id(s) ' + courseIds.join(', ') + '.'
    : 'Order NOT accepted. The response above says why (for example an unknown or unpublished course id).'));
  process.exitCode = ok ? 0 : 1;
})().catch((err) => { console.error('Request failed:', err.message); process.exit(1); });
