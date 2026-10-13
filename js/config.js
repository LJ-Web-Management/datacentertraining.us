// PRODUCTION
const STRIPE_PUBLISHABLE_KEY = "pk_live_doCHB0jglD5eISjEmB1vB6mb00xIg51noK";
const API_BASE_URL = "https://hazwoper-osha.com/api";

// Checkout is intentionally disabled until Data Center Training courses are
// live in the LMS catalog. Course IDs are provisioned (see lmsId below), but
// as of the Oct 13, 2026 HAZWOPER-OSHA course export every one is still
// content "Not Available" / page "Unpublish". Flip to false once they're live.
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
// 'id' is this site's public catalog number; 'lmsId' is the hazwoper-osha.com
// LMS course id that checkout sends to the add_order API.
var DC_COURSES = [
  { slug: "data-center-design-fundamentals", id: 401, lmsId: 842, tier: "comprehensive", category: "Design & Planning", name: "Data Center Design Fundamentals", msrp: 312.99, duration: "8 hrs", standard: "ANSI/TIA-942", hook: "Design data center facilities that scale — from site selection to redundancy strategy." },
  { slug: "tier-infrastructure-fundamentals", id: 402, lmsId: 849, tier: "comprehensive", category: "Design & Planning", name: "Tier Infrastructure Fundamentals", msrp: 280.99, duration: "8 hrs", standard: "Uptime Institute Tier Framework", hook: "Understand and assess TIER I–IV infrastructure without the formal certification track." },
  { slug: "data-center-operations-management", id: 403, lmsId: 843, tier: "comprehensive", category: "Operations", name: "Data Center Operations Management", msrp: 325.99, duration: "8 hrs", standard: "DCIM / SLA Frameworks", hook: "Run daily operations like the teams behind Tier 3/4 facilities — maintenance, incident response, and SLAs." },
  { slug: "security-compliance-data-centers", id: 404, lmsId: 848, tier: "comprehensive", category: "Security & Compliance", name: "Security & Compliance for Data Centers", msrp: 291.99, duration: "8 hrs", standard: "SOC 2 / ISO 27001", hook: "Build a facility security program that satisfies SOC 2, ISO 27001, and physical audit requirements." },
  { slug: "power-systems-electrical-fundamentals", id: 405, lmsId: 847, tier: "comprehensive", category: "Power & Electrical", name: "Power Systems & Electrical Fundamentals", msrp: 303.99, duration: "8 hrs", standard: "NFPA 70E", hook: "Master data center electrical infrastructure — from utility interconnection to UPS and PDU architecture." },
  { slug: "cooling-systems-design-optimization", id: 406, lmsId: 841, tier: "comprehensive", category: "Cooling & Efficiency", name: "Cooling Systems Design & Optimization", msrp: 298.99, duration: "8 hrs", standard: "PUE / ASHRAE Thermal Guidelines", hook: "Cut cooling costs and improve reliability with modern thermal management strategy." },
  { slug: "disaster-recovery-business-continuity", id: 407, lmsId: 844, tier: "comprehensive", category: "Operations", name: "Disaster Recovery & Business Continuity", msrp: 307.99, duration: "8 hrs", standard: "RTO/RPO Frameworks", hook: "Design resilient infrastructure and DR plans that survive real failures — not just tabletop exercises." },
  { slug: "infrastructure-commissioning-startup", id: 408, lmsId: 845, tier: "comprehensive", category: "Design & Planning", name: "Infrastructure Commissioning & Startup", msrp: 267.99, duration: "8 hrs", standard: "Commissioning Test Protocols", hook: "Lead new facility launches and major upgrades with a proven commissioning framework." },
  { slug: "monitoring-automation-bms-systems", id: 409, lmsId: 846, tier: "comprehensive", category: "Monitoring & Automation", name: "Monitoring, Automation & BMS Systems", msrp: 276.99, duration: "8 hrs", standard: "BMS / DCIM", hook: "Design a monitoring and BMS strategy that catches problems before they cause downtime." },
  { slug: "hvac-troubleshooting-essentials", id: 421, lmsId: 836, tier: "modular", category: "Cooling & Efficiency", name: "HVAC Systems Troubleshooting Essentials", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Hands-on troubleshooting skills for CRAC/CRAH systems and common cooling failures." },
  { slug: "ups-operations-load-testing", id: 422, lmsId: 840, tier: "modular", category: "Power & Electrical", name: "UPS Operations & Load Testing", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Master UPS operations, battery testing, and load-bank procedures." },
  { slug: "fiber-optics-network-cabling", id: 423, lmsId: 834, tier: "modular", category: "Monitoring & Automation", name: "Fiber Optics & Network Cabling", msrp: 99.99, duration: "4 hrs", standard: "ANSI/TIA-942", hook: "Terminate, test, and troubleshoot data center fiber to ANSI/TIA-942 standards." },
  { slug: "generator-operations-maintenance", id: 424, lmsId: 835, tier: "modular", category: "Power & Electrical", name: "Generator Operations & Maintenance", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Size, test, and maintain backup generators with confidence." },
  { slug: "energy-efficiency-pue-optimization", id: 425, lmsId: 832, tier: "modular", category: "Cooling & Efficiency", name: "Energy Efficiency & PUE Optimization", msrp: 99.99, duration: "4 hrs", standard: "PUE", hook: "Cut operating costs with a measurable PUE optimization roadmap." },
  { slug: "capacity-planning-forecasting", id: 426, lmsId: 829, tier: "modular", category: "Design & Planning", name: "Capacity Planning & Forecasting", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Build a 3–5 year capacity plan before you run out of power, cooling, or space." },
  { slug: "preventive-maintenance-planning", id: 427, lmsId: 839, tier: "modular", category: "Operations", name: "Preventive Maintenance Planning", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Reduce emergency repairs with a structured preventive maintenance program." },
  { slug: "facility-environmental-compliance", id: 428, lmsId: 833, tier: "modular", category: "Security & Compliance", name: "Facility Environmental Compliance", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Understand the environmental regulations that apply to your facility." },
  { slug: "incident-response-troubleshooting", id: 429, lmsId: 837, tier: "modular", category: "Operations", name: "Incident Response & Troubleshooting", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Systematic troubleshooting and root-cause analysis to cut MTTR." },
  { slug: "access-control-physical-security", id: 430, lmsId: 828, tier: "modular", category: "Security & Compliance", name: "Access Control & Physical Security", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Practical security training for facility staff — access control, surveillance, and incident reporting." },
  { slug: "dcim-platform-fundamentals", id: 431, lmsId: 830, tier: "modular", category: "Monitoring & Automation", name: "DCIM Platform Fundamentals", msrp: 99.99, duration: "4 hrs", standard: "DCIM", hook: "Understand DCIM strategy and build the ROI case for implementation." },
  { slug: "mechanical-systems-maintenance", id: 432, lmsId: 838, tier: "modular", category: "Cooling & Efficiency", name: "Mechanical Systems & Equipment Maintenance", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Hands-on mechanical maintenance — piping, chillers, and vibration diagnostics." },
  { slug: "electrical-safety-best-practices", id: 433, lmsId: 831, tier: "modular", category: "Power & Electrical", name: "Electrical Safety & Best Practices", msrp: 99.99, duration: "4 hrs", standard: "NFPA 70E", hook: "NFPA 70E-aligned electrical safety fundamentals for facility staff." },
  { slug: "batteries-dc-circuits", id: 441, lmsId: 1084, tier: "modular", category: "Power & Electrical", name: "Batteries and DC Circuits", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Master DC circuit fundamentals and battery behavior behind every backup power system." },
  { slug: "building-automation-systems-fundamentals", id: 442, lmsId: 1104, tier: "modular", category: "Monitoring & Automation", name: "Building Automation Systems (BAS) Fundamentals", msrp: 99.99, duration: "6 hrs", standard: "BMS/BAS", hook: "Understand the building automation systems that tie HVAC, power, and monitoring together." },
  { slug: "building-envelope-fundamentals", id: 443, lmsId: 1096, tier: "modular", category: "Cooling & Efficiency", name: "Building Envelope Fundamentals", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Understand how a facility's building envelope drives cooling load and energy cost." },
  { slug: "building-maintenance-fundamentals", id: 444, lmsId: 1097, tier: "modular", category: "Operations", name: "Building Maintenance Fundamentals", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Core building maintenance fundamentals for facilities teams supporting critical infrastructure." },
  { slug: "business-continuity-disaster-recovery-planning", id: 445, lmsId: 880, tier: "modular", category: "Operations", name: "Business Continuity and Disaster Recovery Planning Training", msrp: 99.99, duration: "8 hrs", standard: "ICS-NIMS", hook: "A hands-on planning course for building or stress-testing a business continuity plan." },
  { slug: "data-center-arc-flash-safety", id: 446, lmsId: 850, tier: "modular", category: "Power & Electrical", name: "Data Center Arc Flash Safety Training", msrp: 99.99, duration: "2 hrs", standard: "NFPA 70E", hook: "NFPA 70E arc flash safety specific to data center switchgear and power distribution." },
  { slug: "data-center-cooling-refrigerant-safety", id: 447, lmsId: 851, tier: "modular", category: "Cooling & Efficiency", name: "Data Center Cooling System and Refrigerant Safety Training", msrp: 99.99, duration: "2 hrs", standard: "EPA/OSHA", hook: "Refrigerant handling and cooling system safety practices specific to data center CRAC/CRAH environments." },
  { slug: "data-center-electrical-safety", id: 448, lmsId: 852, tier: "modular", category: "Power & Electrical", name: "Data Center Electrical Safety Training", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Foundational electrical safety practices for anyone working around data center power systems." },
  { slug: "data-center-epo-procedures", id: 449, lmsId: 853, tier: "modular", category: "Power & Electrical", name: "Data Center Emergency Power Off (EPO) Procedures Training", msrp: 99.99, duration: "1 hr", standard: null, hook: "Safe activation and reset procedures for data center Emergency Power Off systems." },
  { slug: "data-center-fire-suppression-safety", id: 450, lmsId: 854, tier: "modular", category: "Security & Compliance", name: "Data Center Fire Suppression System Safety Training (Clean Agent Systems)", msrp: 99.99, duration: "2 hrs", standard: "NFPA 2001", hook: "Clean agent fire suppression safety for occupied data hall environments." },
  { slug: "data-center-physical-security-access-control", id: 451, lmsId: 855, tier: "modular", category: "Security & Compliance", name: "Data Center Physical Security and Access Control Training", msrp: 99.99, duration: "1 hr", standard: null, hook: "Foundational physical security and access control practices for data hall environments." },
  { slug: "data-center-raised-floor-confined-space", id: 452, lmsId: 856, tier: "modular", category: "Operations", name: "Data Center Raised Floor and Confined Space Awareness Training", msrp: 99.99, duration: "1 hr", standard: "OSHA 1910.146", hook: "Confined space awareness and safe practices for working under a raised floor." },
  { slug: "data-center-ups-battery-safety", id: 453, lmsId: 857, tier: "modular", category: "Power & Electrical", name: "Data Center UPS and Battery System Safety Training", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Safety-focused training for anyone working around data center UPS and battery systems." },
  { slug: "emergency-standby-power-systems-fundamentals", id: 454, lmsId: 1098, tier: "modular", category: "Power & Electrical", name: "Emergency/Standby Power Systems Fundamentals", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Understand the standby power systems that carry a facility through a utility outage." },
  { slug: "facility-management-fundamentals", id: 455, lmsId: 1099, tier: "modular", category: "Operations", name: "Facility Management Fundamentals", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Core facility management principles for teams running critical infrastructure." },
  { slug: "generator-fundamentals", id: 456, lmsId: 1100, tier: "modular", category: "Power & Electrical", name: "Generator Fundamentals", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Foundational generator theory to complement hands-on operations and load-bank training." },
  { slug: "lithium-ion-thermal-runaway-emergency-response", id: 457, lmsId: 1021, tier: "modular", category: "Power & Electrical", name: "Lithium-Ion Battery Thermal Runaway and Emergency Response Training", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Recognize and respond to lithium-ion battery thermal runaway before it escalates." },
  { slug: "power-distribution-systems-fundamentals", id: 459, lmsId: 1092, tier: "modular", category: "Power & Electrical", name: "Power Distribution Systems Fundamentals", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Core power distribution theory behind PDUs, panels, and branch circuits." },
  { slug: "roofing-systems-maintenance-fundamentals", id: 460, lmsId: 1101, tier: "modular", category: "Operations", name: "Roofing Systems Maintenance Fundamentals", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Preventive roofing maintenance to protect the facility below it." },
  { slug: "server-room-ergonomics-manual-handling", id: 461, lmsId: 858, tier: "modular", category: "Operations", name: "Server Room Ergonomics and Manual Handling Training", msrp: 99.99, duration: "1 hr", standard: null, hook: "Safe lifting and ergonomic practices for server room and data hall work." },
  { slug: "ups-systems-fundamentals", id: 462, lmsId: 1102, tier: "modular", category: "Power & Electrical", name: "UPS Systems Fundamentals", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Foundational UPS theory to complement hands-on operations and load testing." },
];

// Themed bundles — each combines a comprehensive program with related modular
// specializations. The complete-catalog bundle covers every course in one enrollment.
// Price is fixed; savings vs. buying each course individually is computed at render time.
var DC_BUNDLES = [
  { slug: "bundle-power-electrical", id: 501, name: "Power & Electrical Systems Bundle", description: "For electricians and power technicians who own the electrical chain end to end: from data center-scale power architecture down to UPS, generator, battery safety, and daily electrical work practices.", courses: ["power-systems-electrical-fundamentals", "ups-operations-load-testing", "generator-operations-maintenance", "electrical-safety-best-practices", "batteries-dc-circuits", "data-center-arc-flash-safety", "data-center-electrical-safety", "data-center-epo-procedures", "data-center-ups-battery-safety", "emergency-standby-power-systems-fundamentals", "generator-fundamentals", "lithium-ion-thermal-runaway-emergency-response", "power-distribution-systems-fundamentals", "ups-systems-fundamentals"], price: 986.99 },
  { slug: "bundle-cooling-efficiency", id: 502, name: "Cooling & Facilities Efficiency Bundle", description: "For HVAC and facilities technicians who need both the cooling design fundamentals and the hands-on maintenance skills to keep it running efficiently.", courses: ["cooling-systems-design-optimization", "hvac-troubleshooting-essentials", "energy-efficiency-pue-optimization", "mechanical-systems-maintenance", "data-center-cooling-refrigerant-safety", "building-envelope-fundamentals"], price: 462.99 },
  { slug: "bundle-operations-reliability", id: 503, name: "Operations & Reliability Bundle", description: "For operations and facility managers who own uptime — daily operations, disaster recovery, preventive maintenance, incident response, and the general facility management skills that hold it all together.", courses: ["data-center-operations-management", "disaster-recovery-business-continuity", "preventive-maintenance-planning", "incident-response-troubleshooting", "business-continuity-disaster-recovery-planning", "building-maintenance-fundamentals", "facility-management-fundamentals", "roofing-systems-maintenance-fundamentals", "server-room-ergonomics-manual-handling", "data-center-raised-floor-confined-space"], price: 830.99 },
  { slug: "bundle-security-compliance", id: 504, name: "Security & Compliance Bundle", description: "For security and compliance leads building an audit-ready physical security, fire safety, and environmental compliance program.", courses: ["security-compliance-data-centers", "access-control-physical-security", "facility-environmental-compliance", "data-center-fire-suppression-safety", "data-center-physical-security-access-control"], price: 400.99 },
  { slug: "bundle-design-planning", id: 505, name: "Design, Planning & Commissioning Bundle", description: "For engineers and project leads taking a facility from design through TIER benchmarking, capacity planning, and commissioning.", courses: ["data-center-design-fundamentals", "tier-infrastructure-fundamentals", "infrastructure-commissioning-startup", "capacity-planning-forecasting"], price: 557.99 },
  { slug: "bundle-monitoring-smart-facility", id: 506, name: "Monitoring & Smart Facility Bundle", description: "For teams building out monitoring, DCIM, building automation, and the network cabling infrastructure that supports it.", courses: ["monitoring-automation-bms-systems", "dcim-platform-fundamentals", "fiber-optics-network-cabling", "building-automation-systems-fundamentals"], price: 333.99 },
  { slug: "bundle-complete-catalog", id: 507, name: "Complete Data Center Professional Bundle", description: "Every course in the catalog — all 6 role-based tracks in one enrollment. The single path for a team that wants full coverage across design, power, cooling, security, operations, and monitoring, at the deepest discount we offer.", courses: ["access-control-physical-security", "batteries-dc-circuits", "building-automation-systems-fundamentals", "building-envelope-fundamentals", "building-maintenance-fundamentals", "business-continuity-disaster-recovery-planning", "capacity-planning-forecasting", "cooling-systems-design-optimization", "data-center-arc-flash-safety", "data-center-cooling-refrigerant-safety", "data-center-design-fundamentals", "data-center-electrical-safety", "data-center-epo-procedures", "data-center-fire-suppression-safety", "data-center-operations-management", "data-center-physical-security-access-control", "data-center-raised-floor-confined-space", "data-center-ups-battery-safety", "dcim-platform-fundamentals", "disaster-recovery-business-continuity", "electrical-safety-best-practices", "emergency-standby-power-systems-fundamentals", "energy-efficiency-pue-optimization", "facility-environmental-compliance", "facility-management-fundamentals", "fiber-optics-network-cabling", "generator-fundamentals", "generator-operations-maintenance", "hvac-troubleshooting-essentials", "incident-response-troubleshooting", "infrastructure-commissioning-startup", "lithium-ion-thermal-runaway-emergency-response", "mechanical-systems-maintenance", "monitoring-automation-bms-systems", "power-distribution-systems-fundamentals", "power-systems-electrical-fundamentals", "preventive-maintenance-planning", "roofing-systems-maintenance-fundamentals", "security-compliance-data-centers", "server-room-ergonomics-manual-handling", "tier-infrastructure-fundamentals", "ups-operations-load-testing", "ups-systems-fundamentals"], price: 2928.99 },
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
  if (course) return { type: 'course', name: course.name, price: course.msrp, courseId: course.lmsId };
  var bundle = DC_BUNDLES.find(function (b) { return b.slug === slug; });
  if (bundle) {
    var includedCourses = bundle.courses.map(function (s) { return DC_COURSES.find(function (c) { return c.slug === s; }); }).filter(Boolean);
    return {
      type: 'bundle',
      name: bundle.name,
      price: bundle.price,
      courseIds: includedCourses.map(function (c) { return c.lmsId; }),
      includedNames: includedCourses.map(function (c) { return c.name; })
    };
  }
  return null;
};
