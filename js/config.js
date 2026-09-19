// PRODUCTION
const STRIPE_PUBLISHABLE_KEY = "pk_live_doCHB0jglD5eISjEmB1vB6mb00xIg51noK";
const API_BASE_URL = "https://hazwoper-osha.com/api";

// Checkout is intentionally disabled until Data Center Safety courses are
// live in the LMS catalog. Flip to false once course IDs are provisioned.
const CHECKOUT_DISABLED = true;

// Bulk pricing tiers (seat-count discount ladder, applied to each item's per-seat price)
var BULK_TIERS = [
  { min: 1, max: 1, discount: 0 },
  { min: 2, max: 10, discount: 0.01 },
  { min: 11, max: 20, discount: 0.02 },
  { min: 21, max: 50, discount: 0.03 },
  { min: 51, max: 100, discount: 0.05 },
  { min: 101, max: 250, discount: 0.07 },
  { min: 251, max: 500, discount: 0.08 },
  { min: 501, max: 1000, discount: 0.10 }
];

// Source of truth for the Data Center Safety course catalog + bundles.
// Pulled from ICTrainingUS_reviewed.xlsx (Data Center Safety category +
// Data Center & IT Infrastructure Bundle scope).
var DC_COURSES = [
  { slug: "electrical-safety", id: 299, name: "Data Center Electrical Safety Training", regBody: "OSHA", citation: "29 CFR 1910 Subpart S", duration: "2 Hours", msrp: 44.99, audience: "Data center facilities & IT infrastructure staff" },
  { slug: "arc-flash", id: 297, name: "Data Center Arc Flash Safety Training", regBody: "OSHA/NFPA", citation: "29 CFR 1910 Subpart S / NFPA 70E", duration: "2 Hours", msrp: 49.99, audience: "Data center electricians, facilities technicians", tag: "NFPA 70E" },
  { slug: "cooling-refrigerant", id: 298, name: "Data Center Cooling System and Refrigerant Safety Training", regBody: "OSHA/EPA", citation: "29 CFR 1910.111 / 40 CFR 82", duration: "2 Hours", msrp: 49.99, audience: "Data center facilities/HVAC technicians" },
  { slug: "epo-procedures", id: 300, name: "Data Center Emergency Power Off (EPO) Procedures Training", regBody: "OSHA", citation: "29 CFR 1910 Subpart S / NFPA 70/75", duration: "1 Hour", msrp: 34.99, audience: "Data center operations & facilities staff", tag: "NFPA 70/75" },
  { slug: "fire-suppression", id: 301, name: "Data Center Fire Suppression System Safety Training", full: "Data Center Fire Suppression System Safety Training (Clean Agent Systems)", regBody: "NFPA/OSHA", citation: "NFPA 2001 (Clean Agent Fire Extinguishing Systems)", duration: "2 Hours", msrp: 54.99, audience: "Data center facilities & fire/life safety staff", tag: "NFPA 2001" },
  { slug: "physical-security", id: 302, name: "Data Center Physical Security and Access Control Training", regBody: "OSHA/Industry Standard", citation: "Uptime Institute / SOC 2 Physical Security Practices", duration: "1 Hour", msrp: 34.99, audience: "Data center security & facilities staff" },
  { slug: "raised-floor-confined-space", id: 303, name: "Data Center Raised Floor and Confined Space Awareness Training", regBody: "OSHA", citation: "29 CFR 1910.146 (general awareness level)", duration: "1 Hour", msrp: 29.99, audience: "Data center facilities & cabling technicians" },
  { slug: "ups-battery", id: 304, name: "Data Center UPS and Battery System Safety Training", regBody: "OSHA", citation: "29 CFR 1910.305 / NFPA 70/75", duration: "2 Hours", msrp: 49.99, audience: "Data center electrical & facilities technicians", tag: "NFPA 70/75" },
  { slug: "server-room-ergonomics", id: 305, name: "Server Room Ergonomics and Manual Handling Training", regBody: "OSHA", citation: "OSHA General Duty Clause", duration: "1 Hour", msrp: 29.99, audience: "Data center IT technicians, server installation crews" }
];

var DC_BUNDLES = [
  {
    slug: "data-center-safety-bundle",
    name: "Data Center Safety Bundle",
    tier: "Starter",
    scope: "All 9 Data Center Safety courses",
    totalCourses: 9,
    costSeparate: 379.91,
    bundlePrice: 69,
    savingsPct: 82
  },
  {
    slug: "data-center-it-infrastructure-bundle",
    name: "Data Center & IT Infrastructure Bundle",
    tier: "Complete",
    scope: "22 courses covering data center safety plus electrical, HVAC/R, facility & building maintenance, and emergency management fundamentals",
    totalCourses: 22,
    costSeparate: 1504.78,
    bundlePrice: 119,
    savingsPct: 92,
    featured: true
  }
];

var formatMoney = function (n) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

var tierForSeats = function (seats) {
  for (var i = BULK_TIERS.length - 1; i >= 0; i--) {
    if (seats >= BULK_TIERS[i].min) return BULK_TIERS[i];
  }
  return BULK_TIERS[0];
};

var tierLabel = function (tier) {
  return tier.min === tier.max ? String(tier.min) : tier.min + '–' + tier.max.toLocaleString('en-US');
};

var tierPrice = function (basePrice, tier) {
  var discount = (tier && typeof tier.discount === 'number') ? tier.discount : 0;
  return Math.round(basePrice * (1 - discount) * 100) / 100;
};

// Look up a course or bundle by slug (used by index.html enroll links + checkout.html)
var findDcItem = function (slug) {
  var course = DC_COURSES.find(function (c) { return c.slug === slug; });
  if (course) return { type: 'course', name: course.full || course.name, price: course.msrp, courseId: course.id };
  var bundle = DC_BUNDLES.find(function (b) { return b.slug === slug; });
  if (bundle) return { type: 'bundle', name: bundle.name, price: bundle.bundlePrice, courseId: null };
  return null;
};

// Mobile nav toggle (shared by all pages; lets checkout.html run without main.js)
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
});
