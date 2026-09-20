// PRODUCTION
const STRIPE_PUBLISHABLE_KEY = "pk_live_doCHB0jglD5eISjEmB1vB6mb00xIg51noK";
const API_BASE_URL = "https://hazwoper-osha.com/api";

// Checkout is intentionally disabled until Data Center Training courses are
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

// Source of truth for the Data Center Training course catalog.
// 'tier' is comprehensive (multi-module programs) or modular (focused specializations).
var DC_COURSES = [
  { slug: "data-center-design-fundamentals", id: 401, tier: "comprehensive", category: "Design & Planning", name: "Data Center Design Fundamentals", msrp: 695, duration: "16 hrs", standard: "ANSI/TIA-942", hook: "Design data center facilities that scale \u2014 from site selection to redundancy strategy." },
  { slug: "tier-infrastructure-fundamentals", id: 402, tier: "comprehensive", category: "Design & Planning", name: "Tier Infrastructure Fundamentals", msrp: 625, duration: "14 hrs", standard: "Uptime Institute Tier Framework", hook: "Understand and assess TIER I\u2013IV infrastructure without the formal certification track." },
  { slug: "data-center-operations-management", id: 403, tier: "comprehensive", category: "Operations", name: "Data Center Operations Management", msrp: 725, duration: "18 hrs", standard: "DCIM / SLA Frameworks", hook: "Run daily operations like the teams behind Tier 3/4 facilities \u2014 maintenance, incident response, and SLAs." },
  { slug: "security-compliance-data-centers", id: 404, tier: "comprehensive", category: "Security & Compliance", name: "Security & Compliance for Data Centers", msrp: 650, duration: "16 hrs", standard: "SOC 2 / ISO 27001", hook: "Build a facility security program that satisfies SOC 2, ISO 27001, and physical audit requirements." },
  { slug: "power-systems-electrical-fundamentals", id: 405, tier: "comprehensive", category: "Power & Electrical", name: "Power Systems & Electrical Fundamentals", msrp: 675, duration: "18 hrs", standard: "NFPA 70E", hook: "Master data center electrical infrastructure \u2014 from utility interconnection to UPS and PDU architecture." },
  { slug: "cooling-systems-design-optimization", id: 406, tier: "comprehensive", category: "Cooling & Efficiency", name: "Cooling Systems Design & Optimization", msrp: 665, duration: "16 hrs", standard: "PUE / ASHRAE Thermal Guidelines", hook: "Cut cooling costs and improve reliability with modern thermal management strategy." },
  { slug: "disaster-recovery-business-continuity", id: 407, tier: "comprehensive", category: "Operations", name: "Disaster Recovery & Business Continuity", msrp: 685, duration: "17 hrs", standard: "RTO/RPO Frameworks", hook: "Design resilient infrastructure and DR plans that survive real failures \u2014 not just tabletop exercises." },
  { slug: "infrastructure-commissioning-startup", id: 408, tier: "comprehensive", category: "Design & Planning", name: "Infrastructure Commissioning & Startup", msrp: 595, duration: "12 hrs", standard: "Commissioning Test Protocols", hook: "Lead new facility launches and major upgrades with a proven commissioning framework." },
  { slug: "monitoring-automation-bms-systems", id: 409, tier: "comprehensive", category: "Monitoring & Automation", name: "Monitoring, Automation & BMS Systems", msrp: 615, duration: "14 hrs", standard: "BMS / DCIM", hook: "Design a monitoring and BMS strategy that catches problems before they cause downtime." },
  { slug: "hvac-troubleshooting-essentials", id: 421, tier: "modular", category: "Cooling & Efficiency", name: "HVAC Systems Troubleshooting Essentials", msrp: 175, duration: "4 hrs", standard: null, hook: "Hands-on troubleshooting skills for CRAC/CRAH systems and common cooling failures." },
  { slug: "ups-operations-load-testing", id: 422, tier: "modular", category: "Power & Electrical", name: "UPS Operations & Load Testing", msrp: 165, duration: "4 hrs", standard: null, hook: "Master UPS operations, battery testing, and load-bank procedures." },
  { slug: "fiber-optics-network-cabling", id: 423, tier: "modular", category: "Monitoring & Automation", name: "Fiber Optics & Network Cabling", msrp: 145, duration: "3.5 hrs", standard: "ANSI/TIA-942", hook: "Terminate, test, and troubleshoot data center fiber to ANSI/TIA-942 standards." },
  { slug: "generator-operations-maintenance", id: 424, tier: "modular", category: "Power & Electrical", name: "Generator Operations & Maintenance", msrp: 155, duration: "3.5 hrs", standard: null, hook: "Size, test, and maintain backup generators with confidence." },
  { slug: "energy-efficiency-pue-optimization", id: 425, tier: "modular", category: "Cooling & Efficiency", name: "Energy Efficiency & PUE Optimization", msrp: 135, duration: "3 hrs", standard: "PUE", hook: "Cut operating costs with a measurable PUE optimization roadmap." },
  { slug: "capacity-planning-forecasting", id: 426, tier: "modular", category: "Design & Planning", name: "Capacity Planning & Forecasting", msrp: 145, duration: "3.5 hrs", standard: null, hook: "Build a 3\u20135 year capacity plan before you run out of power, cooling, or space." },
  { slug: "preventive-maintenance-planning", id: 427, tier: "modular", category: "Operations", name: "Preventive Maintenance Planning", msrp: 125, duration: "3 hrs", standard: null, hook: "Reduce emergency repairs with a structured preventive maintenance program." },
  { slug: "facility-environmental-compliance", id: 428, tier: "modular", category: "Security & Compliance", name: "Facility Environmental Compliance", msrp: 115, duration: "3 hrs", standard: null, hook: "Understand the environmental regulations that apply to your facility." },
  { slug: "incident-response-troubleshooting", id: 429, tier: "modular", category: "Operations", name: "Incident Response & Troubleshooting", msrp: 155, duration: "4 hrs", standard: null, hook: "Systematic troubleshooting and root-cause analysis to cut MTTR." },
  { slug: "access-control-physical-security", id: 430, tier: "modular", category: "Security & Compliance", name: "Access Control & Physical Security", msrp: 135, duration: "3.5 hrs", standard: null, hook: "Practical security training for facility staff \u2014 access control, surveillance, and incident reporting." },
  { slug: "dcim-platform-fundamentals", id: 431, tier: "modular", category: "Monitoring & Automation", name: "DCIM Platform Fundamentals", msrp: 195, duration: "5 hrs", standard: "DCIM", hook: "Understand DCIM strategy and build the ROI case for implementation." },
  { slug: "mechanical-systems-maintenance", id: 432, tier: "modular", category: "Cooling & Efficiency", name: "Mechanical Systems & Equipment Maintenance", msrp: 165, duration: "4 hrs", standard: null, hook: "Hands-on mechanical maintenance \u2014 piping, chillers, and vibration diagnostics." },
  { slug: "electrical-safety-best-practices", id: 433, tier: "modular", category: "Power & Electrical", name: "Electrical Safety & Best Practices", msrp: 125, duration: "3 hrs", standard: "NFPA 70E", hook: "NFPA 70E-aligned electrical safety fundamentals for facility staff." },
];

// Themed bundles — each combines a comprehensive program with related modular
// specializations. Price is fixed; savings vs. buying each course individually
// is computed at render time from DC_COURSES.
var DC_BUNDLES = [
  { slug: "bundle-power-electrical", id: 501, name: "Power & Electrical Systems Bundle", description: "For electricians and power technicians who own the electrical chain end to end: from data center-scale power architecture down to UPS, generator, and daily electrical safety.", courses: ["power-systems-electrical-fundamentals", "ups-operations-load-testing", "generator-operations-maintenance", "electrical-safety-best-practices"], price: 669 },
  { slug: "bundle-cooling-efficiency", id: 502, name: "Cooling & Facilities Efficiency Bundle", description: "For HVAC and facilities technicians who need both the cooling design fundamentals and the hands-on maintenance skills to keep it running efficiently.", courses: ["cooling-systems-design-optimization", "hvac-troubleshooting-essentials", "energy-efficiency-pue-optimization", "mechanical-systems-maintenance"], price: 679 },
  { slug: "bundle-operations-reliability", id: 503, name: "Operations & Reliability Bundle", description: "For operations and facility managers who own uptime \u2014 daily operations, disaster recovery, preventive maintenance, and incident response in one path.", courses: ["data-center-operations-management", "disaster-recovery-business-continuity", "preventive-maintenance-planning", "incident-response-troubleshooting"], price: 999 },
  { slug: "bundle-security-compliance", id: 504, name: "Security & Compliance Bundle", description: "For security and compliance leads building an audit-ready physical security and environmental compliance program.", courses: ["security-compliance-data-centers", "access-control-physical-security", "facility-environmental-compliance"], price: 539 },
  { slug: "bundle-design-planning", id: 505, name: "Design, Planning & Commissioning Bundle", description: "For engineers and project leads taking a facility from design through TIER benchmarking, capacity planning, and commissioning.", courses: ["data-center-design-fundamentals", "tier-infrastructure-fundamentals", "infrastructure-commissioning-startup", "capacity-planning-forecasting"], price: 1199 },
  { slug: "bundle-monitoring-smart-facility", id: 506, name: "Monitoring & Smart Facility Bundle", description: "For teams building out monitoring, DCIM, and the network cabling infrastructure that supports it.", courses: ["monitoring-automation-bms-systems", "dcim-platform-fundamentals", "fiber-optics-network-cabling"], price: 569 },
  { slug: "bundle-complete-catalog", id: 507, name: "Complete Data Center Professional Bundle", description: "Every comprehensive program and every modular specialization in the catalog \u2014 the full curriculum for a team that wants one path covering every role on the floor.", courses: ["data-center-design-fundamentals", "tier-infrastructure-fundamentals", "data-center-operations-management", "security-compliance-data-centers", "power-systems-electrical-fundamentals", "cooling-systems-design-optimization", "disaster-recovery-business-continuity", "infrastructure-commissioning-startup", "monitoring-automation-bms-systems", "hvac-troubleshooting-essentials", "ups-operations-load-testing", "fiber-optics-network-cabling", "generator-operations-maintenance", "energy-efficiency-pue-optimization", "capacity-planning-forecasting", "preventive-maintenance-planning", "facility-environmental-compliance", "incident-response-troubleshooting", "access-control-physical-security", "dcim-platform-fundamentals", "mechanical-systems-maintenance", "electrical-safety-best-practices"], price: 4295 },
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

// Sum of a bundle's included courses at individual list price
var bundleListPrice = function (bundle) {
  return bundle.courses.reduce(function (sum, slug) {
    var c = DC_COURSES.find(function (x) { return x.slug === slug; });
    return sum + (c ? c.msrp : 0);
  }, 0);
};

// Look up a course or bundle by slug (used by index.html Enroll links + checkout.html)
var findDcItem = function (slug) {
  var course = DC_COURSES.find(function (c) { return c.slug === slug; });
  if (course) return { type: 'course', name: course.name, price: course.msrp, courseId: course.id };
  var bundle = DC_BUNDLES.find(function (b) { return b.slug === slug; });
  if (bundle) {
    var includedCourses = bundle.courses.map(function (s) { return DC_COURSES.find(function (c) { return c.slug === s; }); }).filter(Boolean);
    return {
      type: 'bundle',
      name: bundle.name,
      price: bundle.price,
      courseIds: includedCourses.map(function (c) { return c.id; }),
      includedNames: includedCourses.map(function (c) { return c.name; })
    };
  }
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
