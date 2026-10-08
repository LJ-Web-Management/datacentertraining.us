// PRODUCTION
const STRIPE_PUBLISHABLE_KEY = "pk_live_doCHB0jglD5eISjEmB1vB6mb00xIg51noK";
const API_BASE_URL = "https://hazwoper-osha.com/api";

// Checkout is intentionally disabled until Data Center Training courses are
// live in the LMS catalog. Flip to false once course IDs are provisioned.
const CHECKOUT_DISABLED = true;

// Bulk pricing tiers (seat-count discount ladder, applied to each item's per-seat price).
// Matches the master catalog's Seat Tier Pricing; 1,001+ seats is a custom enterprise quote.
var BULK_TIERS = [
  { min: 1, max: 24, discount: 0 },
  { min: 25, max: 50, discount: 0.10 },
  { min: 51, max: 100, discount: 0.15 },
  { min: 101, max: 200, discount: 0.20 },
  { min: 201, max: 350, discount: 0.25 },
  { min: 351, max: 500, discount: 0.30 },
  { min: 501, max: 1000, discount: 0.35 }
];

// Source of truth for the Data Center Training course catalog.
// 'tier' is comprehensive (multi-module programs) or modular (focused specializations).
var DC_COURSES = [
  { slug: "data-center-design-fundamentals", id: 401, tier: "comprehensive", category: "Design & Planning", name: "Data Center Design Fundamentals", msrp: 312.99, duration: "8 hrs", standard: "ANSI/TIA-942", hook: "Design data center facilities that scale — from site selection to redundancy strategy." },
  { slug: "tier-infrastructure-fundamentals", id: 402, tier: "comprehensive", category: "Design & Planning", name: "Tier Infrastructure Fundamentals", msrp: 280.99, duration: "8 hrs", standard: "Uptime Institute Tier Framework", hook: "Understand and assess TIER I–IV infrastructure without the formal certification track." },
  { slug: "data-center-operations-management", id: 403, tier: "comprehensive", category: "Operations", name: "Data Center Operations Management", msrp: 325.99, duration: "8 hrs", standard: "DCIM / SLA Frameworks", hook: "Run daily operations like the teams behind Tier 3/4 facilities — maintenance, incident response, and SLAs." },
  { slug: "security-compliance-data-centers", id: 404, tier: "comprehensive", category: "Security & Compliance", name: "Security & Compliance for Data Centers", msrp: 291.99, duration: "8 hrs", standard: "SOC 2 / ISO 27001", hook: "Build a facility security program that satisfies SOC 2, ISO 27001, and physical audit requirements." },
  { slug: "power-systems-electrical-fundamentals", id: 405, tier: "comprehensive", category: "Power & Electrical", name: "Power Systems & Electrical Fundamentals", msrp: 303.99, duration: "8 hrs", standard: "NFPA 70E", hook: "Master data center electrical infrastructure — from utility interconnection to UPS and PDU architecture." },
  { slug: "cooling-systems-design-optimization", id: 406, tier: "comprehensive", category: "Cooling & Efficiency", name: "Cooling Systems Design & Optimization", msrp: 298.99, duration: "8 hrs", standard: "PUE / ASHRAE Thermal Guidelines", hook: "Cut cooling costs and improve reliability with modern thermal management strategy." },
  { slug: "disaster-recovery-business-continuity", id: 407, tier: "comprehensive", category: "Operations", name: "Disaster Recovery & Business Continuity", msrp: 307.99, duration: "8 hrs", standard: "RTO/RPO Frameworks", hook: "Design resilient infrastructure and DR plans that survive real failures — not just tabletop exercises." },
  { slug: "infrastructure-commissioning-startup", id: 408, tier: "comprehensive", category: "Design & Planning", name: "Infrastructure Commissioning & Startup", msrp: 267.99, duration: "8 hrs", standard: "Commissioning Test Protocols", hook: "Lead new facility launches and major upgrades with a proven commissioning framework." },
  { slug: "monitoring-automation-bms-systems", id: 409, tier: "comprehensive", category: "Monitoring & Automation", name: "Monitoring, Automation & BMS Systems", msrp: 276.99, duration: "8 hrs", standard: "BMS / DCIM", hook: "Design a monitoring and BMS strategy that catches problems before they cause downtime." },
  { slug: "hvac-troubleshooting-essentials", id: 421, tier: "modular", category: "Cooling & Efficiency", name: "HVAC Systems Troubleshooting Essentials", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Hands-on troubleshooting skills for CRAC/CRAH systems and common cooling failures." },
  { slug: "ups-operations-load-testing", id: 422, tier: "modular", category: "Power & Electrical", name: "UPS Operations & Load Testing", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Master UPS operations, battery testing, and load-bank procedures." },
  { slug: "fiber-optics-network-cabling", id: 423, tier: "modular", category: "Monitoring & Automation", name: "Fiber Optics & Network Cabling", msrp: 99.99, duration: "4 hrs", standard: "ANSI/TIA-942", hook: "Terminate, test, and troubleshoot data center fiber to ANSI/TIA-942 standards." },
  { slug: "generator-operations-maintenance", id: 424, tier: "modular", category: "Power & Electrical", name: "Generator Operations & Maintenance", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Size, test, and maintain backup generators with confidence." },
  { slug: "energy-efficiency-pue-optimization", id: 425, tier: "modular", category: "Cooling & Efficiency", name: "Energy Efficiency & PUE Optimization", msrp: 99.99, duration: "4 hrs", standard: "PUE", hook: "Cut operating costs with a measurable PUE optimization roadmap." },
  { slug: "capacity-planning-forecasting", id: 426, tier: "modular", category: "Design & Planning", name: "Capacity Planning & Forecasting", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Build a 3–5 year capacity plan before you run out of power, cooling, or space." },
  { slug: "preventive-maintenance-planning", id: 427, tier: "modular", category: "Operations", name: "Preventive Maintenance Planning", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Reduce emergency repairs with a structured preventive maintenance program." },
  { slug: "facility-environmental-compliance", id: 428, tier: "modular", category: "Security & Compliance", name: "Facility Environmental Compliance", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Understand the environmental regulations that apply to your facility." },
  { slug: "incident-response-troubleshooting", id: 429, tier: "modular", category: "Operations", name: "Incident Response & Troubleshooting", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Systematic troubleshooting and root-cause analysis to cut MTTR." },
  { slug: "access-control-physical-security", id: 430, tier: "modular", category: "Security & Compliance", name: "Access Control & Physical Security", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Practical security training for facility staff — access control, surveillance, and incident reporting." },
  { slug: "dcim-platform-fundamentals", id: 431, tier: "modular", category: "Monitoring & Automation", name: "DCIM Platform Fundamentals", msrp: 99.99, duration: "4 hrs", standard: "DCIM", hook: "Understand DCIM strategy and build the ROI case for implementation." },
  { slug: "mechanical-systems-maintenance", id: 432, tier: "modular", category: "Cooling & Efficiency", name: "Mechanical Systems & Equipment Maintenance", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Hands-on mechanical maintenance — piping, chillers, and vibration diagnostics." },
  { slug: "electrical-safety-best-practices", id: 433, tier: "modular", category: "Power & Electrical", name: "Electrical Safety & Best Practices", msrp: 99.99, duration: "4 hrs", standard: "NFPA 70E", hook: "NFPA 70E-aligned electrical safety fundamentals for facility staff." },
  { slug: "batteries-dc-circuits", id: 441, tier: "modular", category: "Power & Electrical", name: "Batteries and DC Circuits", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Master DC circuit fundamentals and battery behavior behind every backup power system." },
  { slug: "building-automation-systems-fundamentals", id: 442, tier: "modular", category: "Monitoring & Automation", name: "Building Automation Systems (BAS) Fundamentals", msrp: 99.99, duration: "6 hrs", standard: "BMS/BAS", hook: "Understand the building automation systems that tie HVAC, power, and monitoring together." },
  { slug: "building-envelope-fundamentals", id: 443, tier: "modular", category: "Cooling & Efficiency", name: "Building Envelope Fundamentals", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Understand how a facility's building envelope drives cooling load and energy cost." },
  { slug: "building-maintenance-fundamentals", id: 444, tier: "modular", category: "Operations", name: "Building Maintenance Fundamentals", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Core building maintenance fundamentals for facilities teams supporting critical infrastructure." },
  { slug: "business-continuity-disaster-recovery-planning", id: 445, tier: "modular", category: "Operations", name: "Business Continuity and Disaster Recovery Planning Training", msrp: 99.99, duration: "8 hrs", standard: "ICS-NIMS", hook: "A hands-on planning course for building or stress-testing a business continuity plan." },
  { slug: "data-center-arc-flash-safety", id: 446, tier: "modular", category: "Power & Electrical", name: "Data Center Arc Flash Safety Training", msrp: 99.99, duration: "2 hrs", standard: "NFPA 70E", hook: "NFPA 70E arc flash safety specific to data center switchgear and power distribution." },
  { slug: "data-center-cooling-refrigerant-safety", id: 447, tier: "modular", category: "Cooling & Efficiency", name: "Data Center Cooling System and Refrigerant Safety Training", msrp: 99.99, duration: "2 hrs", standard: "EPA/OSHA", hook: "Refrigerant handling and cooling system safety practices specific to data center CRAC/CRAH environments." },
  { slug: "data-center-electrical-safety", id: 448, tier: "modular", category: "Power & Electrical", name: "Data Center Electrical Safety Training", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Foundational electrical safety practices for anyone working around data center power systems." },
  { slug: "data-center-epo-procedures", id: 449, tier: "modular", category: "Power & Electrical", name: "Data Center Emergency Power Off (EPO) Procedures Training", msrp: 99.99, duration: "1 hr", standard: null, hook: "Safe activation and reset procedures for data center Emergency Power Off systems." },
  { slug: "data-center-fire-suppression-safety", id: 450, tier: "modular", category: "Security & Compliance", name: "Data Center Fire Suppression System Safety Training (Clean Agent Systems)", msrp: 99.99, duration: "2 hrs", standard: "NFPA 2001", hook: "Clean agent fire suppression safety for occupied data hall environments." },
  { slug: "data-center-physical-security-access-control", id: 451, tier: "modular", category: "Security & Compliance", name: "Data Center Physical Security and Access Control Training", msrp: 99.99, duration: "1 hr", standard: null, hook: "Foundational physical security and access control practices for data hall environments." },
  { slug: "data-center-raised-floor-confined-space", id: 452, tier: "modular", category: "Operations", name: "Data Center Raised Floor and Confined Space Awareness Training", msrp: 99.99, duration: "1 hr", standard: "OSHA 1910.146", hook: "Confined space awareness and safe practices for working under a raised floor." },
  { slug: "data-center-ups-battery-safety", id: 453, tier: "modular", category: "Power & Electrical", name: "Data Center UPS and Battery System Safety Training", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Safety-focused training for anyone working around data center UPS and battery systems." },
  { slug: "emergency-standby-power-systems-fundamentals", id: 454, tier: "modular", category: "Power & Electrical", name: "Emergency/Standby Power Systems Fundamentals", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Understand the standby power systems that carry a facility through a utility outage." },
  { slug: "facility-management-fundamentals", id: 455, tier: "modular", category: "Operations", name: "Facility Management Fundamentals", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Core facility management principles for teams running critical infrastructure." },
  { slug: "generator-fundamentals", id: 456, tier: "modular", category: "Power & Electrical", name: "Generator Fundamentals", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Foundational generator theory to complement hands-on operations and load-bank training." },
  { slug: "lithium-ion-thermal-runaway-emergency-response", id: 457, tier: "modular", category: "Power & Electrical", name: "Lithium-Ion Battery Thermal Runaway and Emergency Response Training", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Recognize and respond to lithium-ion battery thermal runaway before it escalates." },
  { slug: "power-distribution-systems-fundamentals", id: 459, tier: "modular", category: "Power & Electrical", name: "Power Distribution Systems Fundamentals", msrp: 99.99, duration: "4 hrs", standard: null, hook: "Core power distribution theory behind PDUs, panels, and branch circuits." },
  { slug: "roofing-systems-maintenance-fundamentals", id: 460, tier: "modular", category: "Operations", name: "Roofing Systems Maintenance Fundamentals", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Preventive roofing maintenance to protect the facility below it." },
  { slug: "server-room-ergonomics-manual-handling", id: 461, tier: "modular", category: "Operations", name: "Server Room Ergonomics and Manual Handling Training", msrp: 99.99, duration: "1 hr", standard: null, hook: "Safe lifting and ergonomic practices for server room and data hall work." },
  { slug: "ups-systems-fundamentals", id: 462, tier: "modular", category: "Power & Electrical", name: "UPS Systems Fundamentals", msrp: 99.99, duration: "2 hrs", standard: null, hook: "Foundational UPS theory to complement hands-on operations and load testing." },
];

// Role-based learning tracks. Catalog groupings only (not sold as products); every
// course belongs to exactly one track.
var DC_TRACKS = [
  { slug: "track-power-electrical", name: "Power & Electrical Systems Track", description: "For electricians and power technicians who own the electrical chain end to end: from data center-scale power architecture down to UPS, generator, battery safety, and daily electrical work practices.", courses: ["power-systems-electrical-fundamentals", "ups-operations-load-testing", "generator-operations-maintenance", "electrical-safety-best-practices", "batteries-dc-circuits", "data-center-arc-flash-safety", "data-center-electrical-safety", "data-center-epo-procedures", "data-center-ups-battery-safety", "emergency-standby-power-systems-fundamentals", "generator-fundamentals", "lithium-ion-thermal-runaway-emergency-response", "power-distribution-systems-fundamentals", "ups-systems-fundamentals"] },
  { slug: "track-cooling-efficiency", name: "Cooling & Facilities Efficiency Track", description: "For HVAC and facilities technicians who need both the cooling design fundamentals and the hands-on maintenance skills to keep it running efficiently.", courses: ["cooling-systems-design-optimization", "hvac-troubleshooting-essentials", "energy-efficiency-pue-optimization", "mechanical-systems-maintenance", "data-center-cooling-refrigerant-safety", "building-envelope-fundamentals"] },
  { slug: "track-operations-reliability", name: "Operations & Reliability Track", description: "For operations and facility managers who own uptime — daily operations, disaster recovery, preventive maintenance, incident response, and the general facility management skills that hold it all together.", courses: ["data-center-operations-management", "disaster-recovery-business-continuity", "preventive-maintenance-planning", "incident-response-troubleshooting", "business-continuity-disaster-recovery-planning", "building-maintenance-fundamentals", "facility-management-fundamentals", "roofing-systems-maintenance-fundamentals", "server-room-ergonomics-manual-handling", "data-center-raised-floor-confined-space"] },
  { slug: "track-security-compliance", name: "Security & Compliance Track", description: "For security and compliance leads building an audit-ready physical security, fire safety, and environmental compliance program.", courses: ["security-compliance-data-centers", "access-control-physical-security", "facility-environmental-compliance", "data-center-fire-suppression-safety", "data-center-physical-security-access-control"] },
  { slug: "track-design-planning", name: "Design, Planning & Commissioning Track", description: "For engineers and project leads taking a facility from design through TIER benchmarking, capacity planning, and commissioning.", courses: ["data-center-design-fundamentals", "tier-infrastructure-fundamentals", "infrastructure-commissioning-startup", "capacity-planning-forecasting"] },
  { slug: "track-monitoring-smart-facility", name: "Monitoring & Smart Facility Track", description: "For teams building out monitoring, DCIM, building automation, and the network cabling infrastructure that supports it.", courses: ["monitoring-automation-bms-systems", "dcim-platform-fundamentals", "fiber-optics-network-cabling", "building-automation-systems-fundamentals"] },
];

// Products sold on the site, exactly as listed in the HAZWOPER-OSHA master catalog
// (B2B Bundles & Seat Tiers). Every product is a one-time, per-seat purchase.
// Savings vs. buying each course individually is computed at render time.
var DC_BUNDLES = [
  { slug: "bundle-facilities-safety-pack", id: 508, name: "Data Center Facilities Safety Pack", description: "For white-space and gray-space technicians at data centers and critical facilities: the OSHA/NFPA life-safety and electrical compliance training every technician needs before working on the floor.", courses: ["data-center-arc-flash-safety", "data-center-electrical-safety", "data-center-ups-battery-safety", "data-center-epo-procedures", "data-center-fire-suppression-safety", "data-center-cooling-refrigerant-safety", "data-center-raised-floor-confined-space", "data-center-physical-security-access-control", "server-room-ergonomics-manual-handling", "lithium-ion-thermal-runaway-emergency-response"], price: 649.99 },
  { slug: "bundle-infrastructure-professional-pack", id: 509, name: "Data Center Infrastructure Professional Pack", description: "For data center managers and engineers: all nine advanced programs covering design, tiers, operations, power, cooling, commissioning, monitoring, security, and disaster recovery.", courses: ["data-center-design-fundamentals", "tier-infrastructure-fundamentals", "data-center-operations-management", "security-compliance-data-centers", "power-systems-electrical-fundamentals", "cooling-systems-design-optimization", "disaster-recovery-business-continuity", "infrastructure-commissioning-startup", "monitoring-automation-bms-systems"], price: 1867.99 },
  { slug: "bundle-technician-skills-pack", id: 510, name: "Data Center Technician Skills Pack", description: "For facilities technicians and operations staff: the core technical competencies across UPS, generators, power distribution, HVAC, building automation, DCIM, cabling, maintenance, and troubleshooting.", courses: ["ups-systems-fundamentals", "ups-operations-load-testing", "generator-fundamentals", "generator-operations-maintenance", "power-distribution-systems-fundamentals", "batteries-dc-circuits", "hvac-troubleshooting-essentials", "building-automation-systems-fundamentals", "dcim-platform-fundamentals", "fiber-optics-network-cabling", "preventive-maintenance-planning", "incident-response-troubleshooting", "electrical-safety-best-practices"], price: 844.99 },
  { slug: "bundle-data-center-library", id: 511, name: "Data Center & IT Infrastructure Library", description: "All 43 data center courses for one learner in a single one-time purchase: every safety, technician, and infrastructure program in the catalog.", courses: ["access-control-physical-security", "batteries-dc-circuits", "building-automation-systems-fundamentals", "building-envelope-fundamentals", "building-maintenance-fundamentals", "business-continuity-disaster-recovery-planning", "capacity-planning-forecasting", "cooling-systems-design-optimization", "data-center-arc-flash-safety", "data-center-cooling-refrigerant-safety", "data-center-design-fundamentals", "data-center-electrical-safety", "data-center-epo-procedures", "data-center-fire-suppression-safety", "data-center-operations-management", "data-center-physical-security-access-control", "data-center-raised-floor-confined-space", "data-center-ups-battery-safety", "dcim-platform-fundamentals", "disaster-recovery-business-continuity", "electrical-safety-best-practices", "emergency-standby-power-systems-fundamentals", "energy-efficiency-pue-optimization", "facility-environmental-compliance", "facility-management-fundamentals", "fiber-optics-network-cabling", "generator-fundamentals", "generator-operations-maintenance", "hvac-troubleshooting-essentials", "incident-response-troubleshooting", "infrastructure-commissioning-startup", "lithium-ion-thermal-runaway-emergency-response", "mechanical-systems-maintenance", "monitoring-automation-bms-systems", "power-distribution-systems-fundamentals", "power-systems-electrical-fundamentals", "preventive-maintenance-planning", "roofing-systems-maintenance-fundamentals", "security-compliance-data-centers", "server-room-ergonomics-manual-handling", "tier-infrastructure-fundamentals", "ups-operations-load-testing", "ups-systems-fundamentals"], price: 119 },
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
  if (!discount) return basePrice;
  // Catalog rounding: nearest whole dollar, kept on a .99 ending for .99 list prices.
  var dollars = Math.round(basePrice * (1 - discount));
  return Math.round(basePrice * 100) % 100 === 99 ? Math.round((dollars - 0.01) * 100) / 100 : dollars;
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
