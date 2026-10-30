# Data Center Standards and Regulations: A Practical Guide

Knowledge Center · Standards

Data centers answer to dozens of codes, standards, and frameworks, from the National Electrical Code to SOC 2. This guide sorts them by topic, explains who enforces each one, and shows what “aligned with” really means.

13 min read All levels Updated October 2026

On this page

1. [Codes vs. standards](https://datacentertraining.us/learn/data-center-standards.html#codes-standards)
2. [Who enforces them](https://datacentertraining.us/learn/data-center-standards.html#enforcement)
3. [Aligned vs. certified](https://datacentertraining.us/learn/data-center-standards.html#aligned-certified)
4. [Design and topology](https://datacentertraining.us/learn/data-center-standards.html#design)
5. [Electrical](https://datacentertraining.us/learn/data-center-standards.html#electrical)
6. [Fire and life safety](https://datacentertraining.us/learn/data-center-standards.html#fire)
7. [Thermal and energy](https://datacentertraining.us/learn/data-center-standards.html#thermal-energy)
8. [Environmental](https://datacentertraining.us/learn/data-center-standards.html#environmental)
9. [Security and compliance](https://datacentertraining.us/learn/data-center-standards.html#security)
10. [Workplace safety](https://datacentertraining.us/learn/data-center-standards.html#workplace)
11. [Using standards on the job](https://datacentertraining.us/learn/data-center-standards.html#on-the-job)
12. [Courses](https://datacentertraining.us/learn/data-center-standards.html#courses)
13. [FAQ](https://datacentertraining.us/learn/data-center-standards.html#faq)

[**Test yourself**Take the Security & Compliance quiz.](https://datacentertraining.us/quizzes/security-compliance-quiz.html)

Key takeaways

- Codes become law when a state or city adopts them. Standards and guidelines are voluntary until a code, regulation, contract, or insurer makes them mandatory.
- The authority having jurisdiction (AHJ) enforces adopted codes. OSHA and EPA enforce federal regulations. Auditors, customers, and insurers enforce the rest through reports and contracts.
- Only the issuing body, or an organization it licenses or accredits, can certify against a standard. “Aligned with” means built around it, nothing more.
- Always confirm which edition applies. The edition your jurisdiction or contract names is often not the latest one.

## Codes, standards, regulations, and guidelines

People use these words interchangeably, but the difference decides whether something is a legal requirement or a best practice.

**Four kinds of requirements**

| Type | What it is | Data center example |
| --- | --- | --- |
| Regulation | A rule issued by a government agency under a statute. It has the force of law. | OSHA 29 CFR 1910.147 (lockout/tagout); EPA refrigerant rules under Section 608 of the Clean Air Act |
| Code | A model document written to be adopted into law. It becomes mandatory where a state or local government adopts it, often with amendments. | NFPA 70, the National Electrical Code; the local building and fire codes |
| Standard | A consensus document that sets requirements or practices. Voluntary unless a code, regulation, contract, or insurer requires it. | NFPA 70E, ANSI/TIA-942, ISO/IEC 27001 |
| Guideline or framework | Recommendations or criteria used as a benchmark or an audit basis, rather than strict requirements. | ASHRAE TC 9.9 thermal guidelines; the AICPA Trust Services Criteria used for SOC 2 |

Standards often become mandatory indirectly. An adopted fire code, for example, typically references NFPA 72 and NFPA 13, which pulls them into law. OSHA has not adopted NFPA 70E into its regulations, but OSHA points to 70E as the consensus standard employers can use to meet its electrical safety requirements. A colocation contract can make a SOC 2 report a deliverable, and an insurer can make a fire protection feature a condition of coverage.

## Who enforces what

- **The authority having jurisdiction (AHJ).** The building official, electrical inspector, and fire marshal enforce adopted codes: they review plans, inspect construction, and witness fire protection acceptance tests. Their interpretation is what counts on your site.
- **Federal and state agencies.** OSHA, or a state OSHA plan, enforces workplace safety regulations. EPA and state environmental agencies enforce air permits, spill prevention, refrigerant, and waste rules.
- **Auditors and certification bodies.** Independent CPA firms issue SOC 2 reports. Accredited certification bodies audit against ISO management system standards. Qualified Security Assessors assess PCI DSS compliance where required.
- **Customers.** Enterprise and colocation customers write standards into contracts and service level agreements and ask for audit reports.
- **Insurers.** Property insurers inspect fire protection, generator testing, and housekeeping, and can set conditions for coverage.

Your employer's own policies sit on top of all of this, and they often go further than any code.

## “Aligned with” vs. “certified by”

A certification means the issuing body, or an organization it licenses or accredits, evaluated something against the standard and issued a certificate. “Aligned with,” “designed to,” or “built around” means someone used the standard as a reference. How it works for the names you will hear most:

- **Uptime Institute Tiers.** Only Uptime Institute issues Tier Certification, separately for design documents, the constructed facility, and Operational Sustainability. A “Tier III” claim without that certification describes design intent.
- **ANSI/TIA-942.** Certification is performed through certification bodies licensed by TIA. The standard rates facilities from Rated-1 to Rated-4.
- **ISO/IEC 27001 and ISO 50001.** Certificates are issued by accredited certification bodies after an audit. ISO itself does not certify organizations.
- **SOC 2.** An attestation report by an independent CPA firm, not a certificate. Customers read the report, including any exceptions.
- **NFPA and OSHA.** Neither certifies facilities or approves training courses. OSHA's Outreach Training Program (10- and 30-hour cards) is delivered by OSHA-authorized trainers.

How our courses fit

Our courses are standards-aligned and award a certificate of completion. They are not a certification or license, and no standards body has approved or endorsed them. Employers decide who is qualified for a task. The [certifications page](https://datacentertraining.us/certifications.html) lists which courses are built around which standards.

In the tables below, the Related course column points to the course closest to each topic. Where the certifications page names a standard, that course is built around it; otherwise the course covers the related subject, not the full standard.

## Design and topology

**Design and topology standards**

| Standard | What it covers | Who uses it | Related course |
| --- | --- | --- | --- |
| [ANSI/TIA-942](https://tiaonline.org/products-and-services/tia942certification/) | Data center telecommunications infrastructure, spaces, cabling, and facility requirements, rated from Rated-1 to Rated-4. | Designers, cabling contractors, owners pursuing TIA-942 certification | [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html); [Fiber Optics & Network Cabling](https://datacentertraining.us/courses/fiber-optics-network-cabling.html) |
| [Uptime Institute Tier Standard: Topology](https://uptimeinstitute.com/tiers) | Performance definitions for Tier I (basic capacity), Tier II (redundant capacity components), Tier III (concurrently maintainable), and Tier IV (fault tolerant). | Owners and designers pursuing Tier Certification | [Tier Infrastructure Fundamentals](https://datacentertraining.us/courses/tier-infrastructure-fundamentals.html) |
| [Uptime Institute Tier Standard: Operational Sustainability](https://uptimeinstitute.com/tiers) | How staffing, maintenance, training, and management practices keep a facility performing to its Tier over time. | Operations teams | [Data Center Operations Management](https://datacentertraining.us/courses/data-center-operations-management.html) |
| [ANSI/BICSI 002](https://www.bicsi.org/standards) | Data center design and implementation practices covering site, architecture, power, cooling, cabling, security, and operations, with its own availability classes. | Designers, engineers, consultants | [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html) |
| [EN 50600](https://www.cencenelec.eu/) | European standard series for data center facilities and infrastructures, from construction and power to security and efficiency metrics. Its international counterpart is the ISO/IEC 22237 series. | Operators and designers in Europe; multinational owners | [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html) |

TIA-942 and the Uptime Tier Standard overlap but use different criteria and certification programs. The [Tier levels guide](https://datacentertraining.us/learn/data-center-tiers.html) explains the differences, and the [uptime calculator](https://datacentertraining.us/tools/uptime-calculator.html) converts availability into downtime.

## Electrical

**Electrical codes, standards, and regulations**

| Standard | What it covers | Who uses it | Related course |
| --- | --- | --- | --- |
| [NFPA 70, National Electrical Code (NEC)](https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70) | Installation requirements for electrical wiring and equipment. Article 645 has special provisions for information technology equipment rooms that meet its conditions, including a disconnecting means for IT equipment and cooling. | Electrical engineers, electricians, electrical inspectors | [Power Distribution Systems Fundamentals](https://datacentertraining.us/courses/power-distribution-systems-fundamentals.html) |
| [NFPA 70E](https://www.nfpa.org/codes-and-standards/nfpa-70e-standard-development/70e) | Electrical safety in the workplace: electrically safe work conditions, risk assessment, approach boundaries, arc flash PPE, and training. | Employers, electricians, facility technicians | [Electrical Safety & Best Practices](https://datacentertraining.us/courses/electrical-safety-best-practices.html); [Data Center Arc Flash Safety](https://datacentertraining.us/courses/data-center-arc-flash-safety.html) |
| [NFPA 70B](https://www.nfpa.org/codes-and-standards/nfpa-70b-standard-development/70b) | Electrical equipment maintenance programs, intervals, and testing. Since its 2023 edition it is a standard with mandatory language rather than a recommended practice. | Facility managers, maintenance and testing contractors | [Preventive Maintenance Planning](https://datacentertraining.us/courses/preventive-maintenance-planning.html) |
| [NFPA 110](https://www.nfpa.org/codes-and-standards/nfpa-110-standard-development/110) | Emergency and standby power systems: generator performance, installation, fuel, transfer switches, and routine testing and maintenance. | Generator technicians, facility managers, AHJs | [Emergency/Standby Power Systems Fundamentals](https://datacentertraining.us/courses/emergency-standby-power-systems-fundamentals.html); [Generator Operations & Maintenance](https://datacentertraining.us/courses/generator-operations-maintenance.html) |
| [NFPA 111](https://www.nfpa.org/codes-and-standards/nfpa-111-standard-development/111) | Stored electrical energy emergency and standby power systems, such as UPS and battery systems that serve as the emergency or standby source. | Power engineers, UPS technicians | [UPS Systems Fundamentals](https://datacentertraining.us/courses/ups-systems-fundamentals.html) |
| [IEEE 1584](https://standards.ieee.org/standard/1584-2018.html) | The guide for performing arc flash hazard calculations, used to find incident energy and arc flash boundaries for equipment labels. | Electrical engineers performing arc flash studies | [Data Center Arc Flash Safety](https://datacentertraining.us/courses/data-center-arc-flash-safety.html) |
| [OSHA 29 CFR 1910 Subpart S](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910SubpartS) | Federal electrical requirements for general industry, including design safety standards and safety-related work practices (1910.331 to 1910.335). | All U.S. employers with electrical hazards | [Data Center Electrical Safety](https://datacentertraining.us/courses/data-center-electrical-safety.html) |
| [OSHA 29 CFR 1910.147](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147) | Control of hazardous energy (lockout/tagout) during servicing and maintenance of machines and equipment. | All employers; every technician who services equipment | [Electrical Safety & Best Practices](https://datacentertraining.us/courses/electrical-safety-best-practices.html) |

One nuance: 1910.147 covers mechanical, hydraulic, thermal, and other energy, but work on or near electrical conductors falls under Subpart S, including the lockout rules in 1910.333. Site LOTO programs usually cover both. The [Data Center Safety Guide](https://datacentertraining.us/learn/data-center-safety.html) and [power guide](https://datacentertraining.us/learn/data-center-power.html) show how these rules play out on the floor.

## Fire and life safety

**Fire and life safety codes and standards**

| Standard | What it covers | Who uses it | Related course |
| --- | --- | --- | --- |
| [NFPA 72](https://www.nfpa.org/codes-and-standards/nfpa-72-standard-development/72) | The National Fire Alarm and Signaling Code: detection, notification, releasing service for suppression systems, and inspection and testing. | Fire alarm contractors, AHJs, facility managers | [Data Center Fire Suppression System Safety](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html) |
| [NFPA 75](https://www.nfpa.org/codes-and-standards/nfpa-75-standard-development/75) | Fire protection of information technology equipment: room construction, detection and suppression, and emergency disconnect for IT areas. | Designers, owners, insurers | [Data Center Fire Suppression System Safety](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html) |
| [NFPA 76](https://www.nfpa.org/codes-and-standards/nfpa-76-standard-development/76) | Fire protection of telecommunications facilities, such as carrier central offices and telecom spaces. | Carriers and operators of telecom spaces | [Data Center Fire Suppression System Safety](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html) |
| [NFPA 13](https://www.nfpa.org/codes-and-standards/nfpa-13-standard-development/13) | Sprinkler system installation, including the pre-action systems common in data halls, which keep piping dry until a detection system (and, in double-interlock designs, a sprinkler head) activates. | Fire protection engineers, sprinkler contractors | [Data Center Fire Suppression System Safety](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html) |
| [NFPA 2001](https://www.nfpa.org/codes-and-standards/nfpa-2001-standard-development/2001) | Clean agent systems using HFC-227ea (sold as FM-200), FK-5-1-12 (sold as Novec 1230 and others), or inert gases such as IG-541, including enclosure integrity and personnel safety. | Fire protection contractors, facility technicians | [Data Center Fire Suppression System Safety](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html) |
| [NFPA 855](https://www.nfpa.org/codes-and-standards/nfpa-855-standard-development/855) | Installation of stationary energy storage systems, including lithium-ion UPS batteries and battery energy storage. | Designers, AHJs, battery vendors | [Lithium-Ion Battery Thermal Runaway and Emergency Response](https://datacentertraining.us/courses/lithium-ion-thermal-runaway-emergency-response.html) |
| Local fire code | The fire code your state or city adopts, usually the International Fire Code or NFPA 1, which pulls in the standards above and adds local permits and inspections. | Fire marshals and every facility | [Data Center Fire Suppression System Safety](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html) |

Suppression systems are hazardous energy too

Before work in a protected room, follow your site's procedure for placing the suppression system in a safe condition and notifying the monitoring company. Inert gas systems lower oxygen levels when they discharge, and every clean agent room needs clear evacuation rules.

## Thermal and energy

**Thermal and energy standards and programs**

| Standard | What it covers | Who uses it | Related course |
| --- | --- | --- | --- |
| [ASHRAE TC 9.9 thermal guidelines](https://www.ashrae.org/technical-resources/bookstore/datacom-series) | Recommended and allowable temperature and humidity ranges by equipment class. The recommended inlet range for most classes is 18-27 °C (64.4-80.6 °F). TC 9.9 also publishes liquid cooling guidance. | Cooling engineers, operators, IT hardware vendors | [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html) |
| [ASHRAE Standard 90.4](https://www.ashrae.org/technical-resources/bookstore/datacom-series) | The Energy Standard for Data Centers: minimum efficiency requirements for data center mechanical and electrical systems, used in energy code compliance. | Designers, energy code reviewers | [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html) |
| [ISO/IEC 30134 series](https://www.iso.org/) | Data center key performance indicators. Part 2 defines power usage effectiveness (PUE); other parts define metrics such as renewable energy factor, energy reuse factor, and water usage effectiveness. | Operators reporting efficiency, sustainability teams | [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html) |
| [ISO 50001](https://www.iso.org/) | Energy management systems: a plan-do-check-act framework for continual energy performance improvement, certifiable by accredited bodies. | Owners and operators running energy programs | [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html) |
| [ENERGY STAR for data centers](https://www.energystar.gov/buildings/tools-and-resources/energy-star-score-data-centers) | EPA's 1-100 ENERGY STAR score for data centers, calculated in Portfolio Manager from facility and IT energy data, with certification available for top performers. | Owners benchmarking energy performance | [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html) |

PUE equals total facility energy divided by IT equipment energy; the ideal is 1.0. The metric originated with The Green Grid and is now standardized in ISO/IEC 30134-2. Try the [PUE calculator](https://datacentertraining.us/tools/pue-calculator.html) or read the [energy efficiency guide](https://datacentertraining.us/learn/energy-efficiency-pue.html).

## Environmental

**Environmental regulations**

| Standard | What it covers | Who uses it | Related course |
| --- | --- | --- | --- |
| [EPA Section 608 (Clean Air Act)](https://www.epa.gov/) | Refrigerant management: leak repair, recovery, recordkeeping, and technician certification. Technicians who open refrigerant systems need Section 608 certification from an EPA-approved program. | HVAC technicians, facility managers | [Data Center Cooling System and Refrigerant Safety](https://datacentertraining.us/courses/data-center-cooling-refrigerant-safety.html) |
| [SPCC rule (40 CFR 112)](https://www.epa.gov/) | Spill Prevention, Control, and Countermeasure plans for facilities that store oil above regulatory thresholds, such as diesel for generators, where a spill could reach navigable waters. | Facility managers, environmental staff | [Facility Environmental Compliance](https://datacentertraining.us/courses/facility-environmental-compliance.html) |
| [Air permits for generators](https://www.epa.gov/) | State and local air permits for diesel and gas engines, plus federal engine emission standards that limit how many hours emergency generators may run for maintenance and testing. | Facility managers, environmental staff | [Facility Environmental Compliance](https://datacentertraining.us/courses/facility-environmental-compliance.html) |

Chemical inventory reporting for battery electrolyte and fuel, waste rules for batteries, and stormwater permits can apply too. Requirements vary by state and local agency, so each site needs its own register.

## Security and compliance

**Security and compliance frameworks**

| Standard | What it covers | Who uses it | Related course |
| --- | --- | --- | --- |
| [ISO/IEC 27001](https://www.iso.org/) | Information security management systems. Annex A of the 2022 edition includes physical controls such as perimeters, entry controls, and equipment protection. | Operators, colocation and cloud providers | [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html) |
| [SOC 2](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2) | A CPA firm's report on controls relevant to the AICPA Trust Services Criteria: security, availability, processing integrity, confidentiality, and privacy. Type 2 reports test controls over a period of time. | Colocation and cloud providers and their customers | [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html) |
| [PCI DSS](https://www.pcisecuritystandards.org/) | Payment card data security. Requirement 9 restricts physical access to cardholder data, including facility entry controls, visitor handling, and media protection. | Facilities hosting payment systems and their providers | [Access Control & Physical Security](https://datacentertraining.us/courses/access-control-physical-security.html) |
| [HIPAA Security Rule](https://www.hhs.gov/) | Safeguards for electronic protected health information. The physical safeguards in 45 CFR 164.310 cover facility access controls, workstation security, and device and media controls. | Facilities hosting health data; business associates | [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html) |
| [NIST SP 800-53, PE family](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) | The federal security control catalog. Its Physical and Environmental Protection family covers physical access, visitors, power, emergency shutoff, fire protection, and environmental controls. | Federal agencies and contractors | [Access Control & Physical Security](https://datacentertraining.us/courses/access-control-physical-security.html) |
| [ISO 22301](https://www.iso.org/) | Business continuity management systems: planning, exercising, and improving the ability to keep critical services running through disruption. | Operators, enterprise continuity teams | [Business Continuity and Disaster Recovery Planning](https://datacentertraining.us/courses/business-continuity-disaster-recovery-planning.html) |

Most of these frameworks ask the same physical questions: who can get in, how you know, and what happens to media when it leaves. The [security and compliance guide](https://datacentertraining.us/learn/data-center-security-compliance.html) walks through how sites answer them.

## Workplace safety

**OSHA workplace safety rules beyond electrical**

| Standard | What it covers | Who uses it | Related course |
| --- | --- | --- | --- |
| [OSHA 29 CFR 1910.146](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.146) | Permit-required confined spaces: evaluation, permits, attendants, and rescue. Some vaults, tanks, pits, and deep under-floor spaces can qualify. | Employers, EHS managers, technicians | [Data Center Raised Floor and Confined Space Awareness](https://datacentertraining.us/courses/data-center-raised-floor-confined-space.html) |
| [OSHA 29 CFR 1910.132](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.132) | General PPE requirements: hazard assessment, selection, fit, and training. Electrical PPE is covered in 1910.137 and 1910.335. | All employers | [Data Center Electrical Safety](https://datacentertraining.us/courses/data-center-electrical-safety.html) |
| [OSHA 29 CFR 1910.95](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95) | Occupational noise exposure and hearing conservation programs. Generator rooms and dense, fan-heavy halls can be loud. | EHS managers, technicians | [Generator Operations & Maintenance](https://datacentertraining.us/courses/generator-operations-maintenance.html) |
| [OSHA 29 CFR 1910.1200](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200) | Hazard communication: labels, Safety Data Sheets, and training for hazardous chemicals such as battery electrolyte, diesel fuel, refrigerants, and coolants. | All employers with hazardous chemicals | [Data Center Cooling System and Refrigerant Safety](https://datacentertraining.us/courses/data-center-cooling-refrigerant-safety.html) |

States with their own OSHA-approved plans may add requirements, and state electrician licenses come from state licensing boards.

## How to use standards on the job

1. ### Know which edition applies

   Jurisdictions adopt specific editions, sometimes several cycles old, and contracts name editions too.
2. ### Read the scope first

   Every standard starts by saying what it covers and what it does not. Many arguments end there.
3. ### Keep a register

   List every code, standard, permit, and audit that applies to your site, with the edition, an owner, and the next due date.
4. ### Escalate conflicts

   When documents disagree, the adopted code and the AHJ's interpretation govern. Take conflicts to engineering rather than picking the convenient answer.
5. ### Go to the source

   Summaries, including this one, are no substitute for the current text. NFPA offers free read-only access to many of its codes and standards online.

**Which training does your team need?** Pick a role, topics, and time budget to get a course plan.

[Build a Training Plan](https://datacentertraining.us/tools/training-plan-builder.html)

## Courses that go deeper

These self-paced, standards-aligned courses cover the standards above in the context of real data center work. Each awards a certificate of completion.

### [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html)

Design & Planning · Comprehensive Program · ANSI/TIA-942

Design data center facilities that scale — from site selection to redundancy strategy.

8 hrs

$312.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-design-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-design-fundamentals)

### [Tier Infrastructure Fundamentals](https://datacentertraining.us/courses/tier-infrastructure-fundamentals.html)

Design & Planning · Comprehensive Program · Uptime Institute Tier Framework

Understand and assess TIER I–IV infrastructure without the formal certification track.

8 hrs

$280.99

- [Enroll](https://datacentertraining.us/checkout.html?item=tier-infrastructure-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=tier-infrastructure-fundamentals)

### [Electrical Safety & Best Practices](https://datacentertraining.us/courses/electrical-safety-best-practices.html)

Power & Electrical · Modular Specialization · NFPA 70E

NFPA 70E-aligned electrical safety fundamentals for facility staff.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=electrical-safety-best-practices)
- [Add to Cart](https://datacentertraining.us/cart.html?add=electrical-safety-best-practices)

### [Data Center Fire Suppression System Safety Training (Clean Agent Systems)](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html)

Security & Compliance · Modular Specialization · NFPA 2001

Clean agent fire suppression safety for occupied data hall environments.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-fire-suppression-safety)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-fire-suppression-safety)

### [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html)

Security & Compliance · Comprehensive Program · SOC 2 / ISO 27001

Build a facility security program that satisfies SOC 2, ISO 27001, and physical audit requirements.

16 hrs

$291.99

- [Enroll](https://datacentertraining.us/checkout.html?item=security-compliance-data-centers)
- [Add to Cart](https://datacentertraining.us/cart.html?add=security-compliance-data-centers)

### [Facility Environmental Compliance](https://datacentertraining.us/courses/facility-environmental-compliance.html)

Security & Compliance · Modular Specialization

Understand the environmental regulations that apply to your facility.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=facility-environmental-compliance)
- [Add to Cart](https://datacentertraining.us/cart.html?add=facility-environmental-compliance)

### [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html)

Cooling & Efficiency · Modular Specialization · PUE

Cut operating costs with a measurable PUE optimization roadmap.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=energy-efficiency-pue-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=energy-efficiency-pue-optimization)

### [Data Center Raised Floor and Confined Space Awareness Training](https://datacentertraining.us/courses/data-center-raised-floor-confined-space.html)

Operations · Modular Specialization · OSHA 1910.146

Confined space awareness and safe practices for working under a raised floor.

1 hr

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-raised-floor-confined-space)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-raised-floor-confined-space)

Save 52% with the bundle

Complete Data Center Professional Bundle

43 courses · 192 hours · **$2,928.99** per seat, instead of ~~$6,067.57~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-complete-catalog)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### Is ANSI/TIA-942 the same as the Uptime Institute Tier Standard?

No. ANSI/TIA-942 is a TIA standard for data center infrastructure, with ratings from Rated-1 to Rated-4. The Uptime Institute Tier Standard defines Tier I through Tier IV, and only Uptime Institute issues Tier Certification. A facility can be designed to one, both, or neither.

### Is NFPA 70E the law?

Not by itself. OSHA has not adopted NFPA 70E into its regulations, but OSHA's electrical rules require employers to protect workers from electrical hazards, and NFPA 70E is the recognized consensus standard for how to do that. In practice, following NFPA 70E is how most employers meet those requirements.

### Does a data center need SOC 2 or ISO/IEC 27001?

No law requires either for most data centers, but customers often do. Colocation and cloud providers commonly obtain both because customers ask for them in contracts and security reviews. Note that SOC 2 is an attestation report from a CPA firm, not a certification.

### Will a standards-aligned course make me certified in that standard?

No. A standards-aligned course teaches how a standard applies to your work and awards a certificate of completion. It is not a certification or license, and it does not mean the standards body approved the course. Credentials such as EPA Section 608 certification, state electrician licenses, and Uptime Institute accreditations are offered by those organizations.

### What do ANSI and IEC compliance mean for AI data center reference designs?

ANSI accredits the organizations that write U.S. standards, such as TIA for ANSI/TIA-942. IEC publishes international electrical standards, such as IEC 62368-1 for IT equipment safety and the IEC 60364 series for low-voltage installations. A reference design that claims compliance should name the exact standard and edition for each part, say who verified it (self-declaration, a test lab or a certification body), and still be checked against the codes your local authority enforces, such as the NEC in the United States.

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-tiers.html)

### Tier Levels Explained

Tier I to IV, Rated-1 to Rated-4, and what certification really covers.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-safety.html)

### Data Center Safety Guide

NFPA 70E, LOTO, batteries, and confined spaces in practice.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-security-compliance.html)

### Security & Compliance

How SOC 2, ISO/IEC 27001, and PCI DSS shape physical security.

Read the guide →

[Reference](https://datacentertraining.us/learn/glossary.html)

### Data Center Glossary

AHJ, SPCC, MOP, and every other acronym in one place.

Open the glossary →

This guide is general educational information, not engineering, legal, or compliance advice. Requirements depend on your jurisdiction, contracts, and the editions in force; confirm them with the AHJ, your counsel, and the current text of each document.

## Train Your Team on the Standards That Apply

Standards-aligned courses across power, cooling, fire protection, security, environmental compliance, and operations, each with a certificate of completion.

- [See the Complete Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-standards.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
