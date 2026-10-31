# Data Center Operations: How Facilities Are Run 24/7

Knowledge Center · Operations

Redundant equipment only delivers uptime when people operate and maintain it well. Here is how critical facilities teams staff a site around the clock, control every change, keep equipment healthy, and respond when something breaks.

12 min read Beginner to intermediate Updated October 2026

On this page

1. [The 24/7 shift model](https://datacentertraining.us/learn/data-center-operations.html#shifts)
2. [SOPs, MOPs, and EOPs](https://datacentertraining.us/learn/data-center-operations.html#procedures)
3. [Change management](https://datacentertraining.us/learn/data-center-operations.html#change-management)
4. [Maintenance](https://datacentertraining.us/learn/data-center-operations.html#maintenance)
5. [Rounds and logs](https://datacentertraining.us/learn/data-center-operations.html#rounds)
6. [Monitoring and alarms](https://datacentertraining.us/learn/data-center-operations.html#monitoring)
7. [Incident response](https://datacentertraining.us/learn/data-center-operations.html#incidents)
8. [Capacity and vendors](https://datacentertraining.us/learn/data-center-operations.html#capacity)
9. [DR and business continuity](https://datacentertraining.us/learn/data-center-operations.html#dr-bc)
10. [Documentation and training](https://datacentertraining.us/learn/data-center-operations.html#training)
11. [Operations KPIs](https://datacentertraining.us/learn/data-center-operations.html#kpis)
12. [Courses](https://datacentertraining.us/learn/data-center-operations.html#courses)
13. [FAQ](https://datacentertraining.us/learn/data-center-operations.html#faq)

[**Test yourself**Take the Operations quiz.](https://datacentertraining.us/quizzes/operations-quiz.html)

Key takeaways

- Data centers are staffed or covered 24/7 by a shift team that runs rounds, maintenance, and first response.
- Routine work follows SOPs, risky work follows an approved MOP, and failures are handled with EOPs.
- Change management, preventive maintenance, and good alarm handling prevent more outages than any single piece of equipment.
- Measure the program with a few honest KPIs, such as availability, MTTR, and PM completion, and review them every month.

## The 24/7 shift model

A data center never closes, so operations are built around shifts. Many sites run 12-hour shifts on a rotating schedule, while others use three 8-hour shifts. Smaller or edge sites may staff days only and rely on remote monitoring and on-call technicians at night. Whatever the pattern, someone qualified to respond must be reachable within the time the site's risk assessment allows.

A typical large site has these people on, or on call:

- **Critical facilities technicians and engineers** who run the electrical and mechanical plant, perform rounds and maintenance, and respond first to failures.
- **A shift lead or chief engineer** who directs the shift and makes the first escalation decisions.
- **Security officers** who control access and monitor alarms.
- **Data center technicians** who rack, cable, and handle remote-hands requests for IT customers.
- **A network operations center (NOC)**, on site or remote, watching IT and network health.
- **On-call managers, subject matter experts, and vendors** reachable through an escalation list.

The most important minutes of any shift are the **turnover**. The outgoing team briefs the incoming team on open work orders, equipment out of service, active alarms, abnormal configurations (for example, a UPS on maintenance bypass), and weather or utility warnings. Good sites use a written turnover log so nothing depends on memory. [Data Center Operations Management](https://datacentertraining.us/courses/data-center-operations-management.html) covers how to organize shifts, staffing, and handoffs.

## SOPs, MOPs, and EOPs

Written procedures are the backbone of critical operations, because most outages trace back to human actions rather than equipment. Three types cover nearly everything:

- **Standard operating procedures (SOPs)** cover routine, repeatable tasks: rounds, generator monthly runs, filter changes, receiving a delivery.
- **Methods of procedure ([MOPs](https://datacentertraining.us/learn/glossary.html#term-mop))** are written for specific work on critical systems, such as transferring a UPS to maintenance bypass or replacing a breaker. They are reviewed, approved, and executed step by step.
- **Emergency operating procedures (EOPs)** tell responders what to do when something fails: loss of utility, a generator that does not start, a chiller trip, a water leak, or a fire alarm.

### What a MOP looks like

A short MOP for transferring a UPS module to maintenance bypass might be outlined like this:

1. **Header:** MOP number, title, revision, author, and approvers.
2. **Scope and risk:** what equipment is affected, which loads lose redundancy, and the risk level.
3. **Prerequisites:** approved change ticket, customer notifications, alternate source confirmed healthy, no severe weather, required PPE and permits.
4. **Roles:** who performs, who reads back each step, and who monitors the BMS and power monitoring system.
5. **Pre-checks:** expected UPS load, bypass source voltage, alarm status, and generator availability.
6. **Procedure:** numbered steps, each with the expected indication and a space to initial, plus hold points that require a pause and check.
7. **Back-out plan:** how to return to normal safely if any step does not produce the expected result.
8. **Post-checks and close-out:** verify normal configuration, clear alarms, record readings, and sign off.

## Change management and the CAB

Any change to critical infrastructure, whether maintenance, a new installation, a setpoint change, or a firmware update, goes through change management. A change request describes the work, the risk, the affected systems and customers, the timing, and the MOP. A **change advisory board (CAB)**, usually including facilities, operations, security, and sometimes IT or customer representatives, reviews and approves normal changes on a regular schedule.

Most sites classify changes as **standard** (pre-approved, low risk, done often), **normal** (reviewed by the CAB), or **emergency** (approved quickly by a designated manager, then reviewed after the fact). They also set change windows, freeze periods around busy business seasons, and a post-implementation review so lessons from each change improve the next.

## Preventive, predictive, and corrective maintenance

**Three kinds of maintenance**

| Type | How it is triggered | Data center examples |
| --- | --- | --- |
| Preventive (PM) | Time or run-hours, on a fixed schedule | UPS service visits, generator oil changes, filter changes, breaker exercising |
| Predictive (PdM) | Measured condition crossing a limit | Infrared scans, vibration analysis on pumps and fans, oil analysis, battery impedance trends |
| Corrective | A failure or a defect found during other work | Replacing a failed fan, repairing a leaking valve, fixing a deficiency from an infrared scan |

A healthy program leans on preventive and predictive work so corrective work is planned instead of urgent. Manufacturer recommendations, NFPA 70B for electrical equipment maintenance (a full standard since its 2023 edition), and NFPA 110 for generators set the baseline intervals.

To set up the program behind this work, read [how to build a data center maintenance program](https://datacentertraining.us/learn/data-center-maintenance-program.html), and see [preventive maintenance training](https://datacentertraining.us/training/preventive-maintenance-training.html) for planners and technicians.

### CMMS and work orders

A **computerized maintenance management system (CMMS)** holds the asset list, PM schedules, work orders, parts, and history. Every task becomes a work order that moves through a lifecycle: created, planned, scheduled, executed, and closed with notes, readings, and time spent. That history is what lets you spot a fan that fails every six months or a PM that keeps getting deferred. When the backlog grows, rank work by risk to the critical load, not by age; see [how to triage a PM backlog](https://datacentertraining.us/blog/posts/preventive-maintenance-backlog-triage-how-data-center-facility-managers-should-rank-critical-work-orders.html). The [Preventive Maintenance Planning](https://datacentertraining.us/courses/preventive-maintenance-planning.html) course covers building schedules and work order discipline.

## Rounds and logs

Rounds are scheduled walk-throughs, often once or more per shift, where technicians check equipment in person and record readings. A round might capture UPS load and battery status, generator fuel levels and block heater temperatures, switchgear indications, chiller and pump status, supply and return water temperatures, CRAH status, leak detection panels, and battery room conditions.

Rounds catch what sensors miss: a new noise, a smell of hot insulation, a drip under a pipe, a door left open, a tile out of place. Many sites now record rounds on tablets so readings are trended automatically and out-of-range values raise a work order.

## The monitoring stack and alarm management

Operators watch the site through several overlapping systems:

- **Building management system ([BMS](https://datacentertraining.us/learn/glossary.html#term-bms))**: monitors and controls mechanical equipment such as chillers, pumps, CRAHs, and air handlers, usually over protocols like BACnet and Modbus.
- **Electrical power monitoring system (EPMS)**: meters, breaker status, and power quality data from switchgear, UPS, and PDUs, often with waveform capture for event analysis.
- **Data center infrastructure management ([DCIM](https://datacentertraining.us/learn/glossary.html#term-dcim))**: assets, space, rack power, and capacity, tying the facility to the IT equipment it supports.

The hard part is not collecting data but acting on it. **Alarm fatigue** sets in when operators see hundreds of low-value alarms and start silencing them, then miss the one that matters. Good alarm management means every alarm has a defined priority and a required response, chattering and nuisance points are fixed rather than ignored, standing alarms are tracked and cleared, and alarm counts are reviewed weekly. ANSI/ISA-18.2, written for process industries, is a useful model. See [Monitoring, Automation & BMS Systems](https://datacentertraining.us/courses/monitoring-automation-bms-systems.html) and [DCIM Platform Fundamentals](https://datacentertraining.us/courses/dcim-platform-fundamentals.html).

## Incident response

When something fails, a practiced sequence keeps a small problem from becoming an outage:

1. **Detect**An alarm, a round, or a customer report flags the problem.
2. **Triage**Confirm what is affected, whether the critical load is at risk, and which EOP applies.
3. **Escalate**Call the shift lead, on-call manager, and vendors on a defined timeline.
4. **Communicate**Update the NOC, customers, and leadership at set intervals, even if nothing has changed.
5. **Restore**Stabilize, restore redundancy, and return to normal configuration under a MOP.
6. **Root cause analysis**Find why it happened and fix the cause, not just the symptom.

Assign one **incident lead** who coordinates while others work the problem. After the event, run a blameless post-incident review using tools like the five whys or a cause-and-effect diagram, and track corrective actions to completion. The first minutes matter most; read [what facilities and NOC teams should confirm in the first 15 minutes](https://datacentertraining.us/blog/posts/data-center-incident-response-handoffs-what-facilities-and-noc-teams-should-confirm-in-the-first-15-minutes.html). The [Incident Response & Troubleshooting](https://datacentertraining.us/courses/incident-response-troubleshooting.html) course builds these skills.

## Capacity, vendor, and contractor management

### Capacity management

Capacity has four dimensions: space, power, cooling, and network connectivity. Operations tracks each at the room, row, and rack level, because a hall can have plenty of floor space but no cooling left in one row. Watch for **stranded capacity**, power or cooling that exists but cannot be used because of how it is distributed, and protect redundancy limits such as keeping each side of a 2N feed below half its rating. Forecast demand with IT and sales so expansions start before the site runs out.

### Vendor and contractor management

Original equipment manufacturer (OEM) service contracts cover UPS, generators, switchgear, chillers, and fire systems. Manage them with clear response-time commitments, approved MOPs for every visit, site orientation, escorting, and a review of each service report. Track vendor performance like any other KPI.

## Disaster recovery and business continuity

**Business continuity** keeps the organization running through a disruption; **disaster recovery** restores IT services after one. Two numbers drive the design: the **recovery time objective (RTO)**, how long a service can be down, and the **recovery point objective (RPO)**, how much data loss is tolerable. They decide whether a workload needs a second site, replication, or just good backups.

The facility side of continuity includes fuel delivery agreements, spare parts, staff coverage during severe weather or illness, alternate communication paths, and plans for losing the site entirely. Test plans regularly:

- **Tabletop exercises** walk a team through a scenario around a table to find gaps in roles, decisions, and communication.
- **Functional drills** exercise one part of the plan, such as an EOP for loss of a chiller.
- **Failover tests** actually move workloads to an alternate site or system and measure the results against the RTO and RPO.

ISO 22301 is the international standard for business continuity management systems. The [Disaster Recovery & Business Continuity](https://datacentertraining.us/courses/disaster-recovery-business-continuity.html) course covers planning and testing.

## Documentation and training

A site is only as good as its documentation: current single-line diagrams, sequences of operation, as-built drawings, equipment manuals, SOPs, MOPs, EOPs, and the site's own lessons learned. Review procedures on a schedule and after every incident.

Staffing is a real constraint. The [Uptime Institute Global Data Center Survey 2025](https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025) found that nearly two-thirds of operators report difficulty retaining staff, finding qualified candidates, or both. That makes structured onboarding, cross-training, and documented qualification on each system essential, not optional.

## Operations KPIs

**Common data center operations KPIs**

| KPI | How it is calculated | What to watch |
| --- | --- | --- |
| Availability | Uptime divided by total time, for the critical load or each service | Report it alongside the number of events, not alone |
| MTBF | Total operating time divided by the number of failures | Falling MTBF on one asset class points to a maintenance or design issue |
| MTTR | Total repair or restoration time divided by the number of repairs | Parts, vendor response, and procedures drive it down |
| PM completion rate | PMs completed on time divided by PMs scheduled | Deferred critical PMs matter more than the headline percentage |
| PUE | Total facility energy divided by IT equipment energy | Track the trend at your site; compare across sites with care |
| Alarm counts | Alarms per shift or per week, and standing alarms | A rising count usually means nuisance alarms are hiding real ones |

For more on PUE, see the [Energy Efficiency & PUE guide](https://datacentertraining.us/learn/energy-efficiency-pue.html) or try the [PUE Calculator](https://datacentertraining.us/tools/pue-calculator.html).

**Think you could run a shift?** Test yourself on procedures, maintenance, and incident response.

[Take the Operations Quiz](https://datacentertraining.us/quizzes/operations-quiz.html)

## Courses that go deeper

These self-paced courses cover the operations disciplines above, and each awards a certificate of completion.

### [Data Center Operations Management](https://datacentertraining.us/courses/data-center-operations-management.html)

Operations · Comprehensive Program · DCIM / SLA Frameworks

Run daily operations like the teams behind Tier 3/4 facilities — maintenance, incident response, and SLAs.

8 hrs

$325.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-operations-management)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-operations-management)

### [Preventive Maintenance Planning](https://datacentertraining.us/courses/preventive-maintenance-planning.html)

Operations · Modular Specialization

Reduce emergency repairs with a structured preventive maintenance program.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=preventive-maintenance-planning)
- [Add to Cart](https://datacentertraining.us/cart.html?add=preventive-maintenance-planning)

### [Incident Response & Troubleshooting](https://datacentertraining.us/courses/incident-response-troubleshooting.html)

Operations · Modular Specialization

Systematic troubleshooting and root-cause analysis to cut MTTR.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=incident-response-troubleshooting)
- [Add to Cart](https://datacentertraining.us/cart.html?add=incident-response-troubleshooting)

### [Monitoring, Automation & BMS Systems](https://datacentertraining.us/courses/monitoring-automation-bms-systems.html)

Monitoring & Automation · Comprehensive Program · BMS / DCIM

Design a monitoring and BMS strategy that catches problems before they cause downtime.

8 hrs

$276.99

- [Enroll](https://datacentertraining.us/checkout.html?item=monitoring-automation-bms-systems)
- [Add to Cart](https://datacentertraining.us/cart.html?add=monitoring-automation-bms-systems)

### [DCIM Platform Fundamentals](https://datacentertraining.us/courses/dcim-platform-fundamentals.html)

Monitoring & Automation · Modular Specialization · DCIM

Understand DCIM strategy and build the ROI case for implementation.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=dcim-platform-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=dcim-platform-fundamentals)

### [Disaster Recovery & Business Continuity](https://datacentertraining.us/courses/disaster-recovery-business-continuity.html)

Operations · Comprehensive Program · RTO/RPO Frameworks

Design resilient infrastructure and DR plans that survive real failures — not just tabletop exercises.

8 hrs

$307.99

- [Enroll](https://datacentertraining.us/checkout.html?item=disaster-recovery-business-continuity)
- [Add to Cart](https://datacentertraining.us/cart.html?add=disaster-recovery-business-continuity)

### [Facility Management Fundamentals](https://datacentertraining.us/courses/facility-management-fundamentals.html)

Operations · Modular Specialization

Core facility management principles for teams running critical infrastructure.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=facility-management-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=facility-management-fundamentals)

### [Building Maintenance Fundamentals](https://datacentertraining.us/courses/building-maintenance-fundamentals.html)

Operations · Modular Specialization

Core building maintenance fundamentals for facilities teams supporting critical infrastructure.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=building-maintenance-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=building-maintenance-fundamentals)

Save 42% with the bundle

Operations & Reliability Bundle

10 courses · 44 hours · **$830.99** per seat, instead of ~~$1,433.90~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-operations-reliability)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### What is the difference between an SOP and a MOP?

A standard operating procedure (SOP) describes a routine task that is done the same way every time, such as a daily round or a generator monthly run. A method of procedure (MOP) is written for a specific piece of work on critical equipment, such as transferring a UPS to maintenance bypass, and includes step-by-step actions, expected readings, hold points, approvals, and a back-out plan. Emergency operating procedures (EOPs) cover how to respond when something fails.

### What does a critical facilities technician do on a shift?

A typical shift starts with a turnover briefing, then rounds through electrical rooms, the central plant, and data halls to record readings and spot problems. The rest of the shift is scheduled maintenance from work orders, supporting vendors and contractors, responding to alarms, and updating logs. On nights and weekends the technician may be the most senior person on site and the first responder to any failure.

### What is the difference between RTO and RPO?

The recovery time objective (RTO) is how long a service can be down before the business impact is unacceptable. The recovery point objective (RPO) is how much data, measured in time, the business can afford to lose. An RTO of four hours and an RPO of fifteen minutes means the service must be back within four hours and lose no more than the last fifteen minutes of data.

### What is alarm fatigue and how do data centers prevent it?

Alarm fatigue happens when operators see so many nuisance or low-value alarms that they start ignoring or silencing them, and miss the one that matters. Sites prevent it by rationalizing alarms so each one needs a specific action, setting clear priorities, fixing chattering points, tracking standing alarms, and reviewing alarm counts every week.

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-commissioning.html)

### Commissioning Explained

How a new site is tested, Levels 1 to 5, before operations takes over.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-power.html)

### How Data Center Power Works

The UPS, generator, and distribution systems operators run every day.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-jobs.html#critical-facilities-technician)

### Critical Facilities Technician

The shift role at the center of data center operations.

See the role →

[Tool](https://datacentertraining.us/tools/uptime-calculator.html)

### Uptime & Downtime Calculator

Turn availability percentages into minutes of downtime.

Open the calculator →

This guide is general educational information, not engineering, legal, or compliance advice. Follow your site's procedures, the equipment manufacturer's instructions, and the codes adopted in your jurisdiction.

## Train Your Team on Data Center Operations

Our Operations & Reliability courses cover operations management, maintenance planning, monitoring, incident response, and disaster recovery.

- [See the Operations Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-operations.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
