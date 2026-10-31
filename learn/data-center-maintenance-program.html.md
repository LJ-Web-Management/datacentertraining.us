# How to Build a Data Center Maintenance Program

Knowledge Center · Operations

Most data center outages trace back to equipment that was not maintained, or to maintenance that was done badly. A maintenance program is the system that decides what gets maintained, how often, by whom, and under what controls. Here is how to build one, from the asset list to the KPIs.

12 min read Intermediate Updated October 2026

On this page

1. [What a maintenance program is](https://datacentertraining.us/learn/data-center-maintenance-program.html#what)
2. [Preventive, predictive, and corrective](https://datacentertraining.us/learn/data-center-maintenance-program.html#types)
3. [Building the program step by step](https://datacentertraining.us/learn/data-center-maintenance-program.html#build)
4. [Typical task frequencies](https://datacentertraining.us/learn/data-center-maintenance-program.html#frequencies)
5. [Scheduling: calendar vs. operating hours](https://datacentertraining.us/learn/data-center-maintenance-program.html#scheduling)
6. [KPIs and backlog](https://datacentertraining.us/learn/data-center-maintenance-program.html#kpis)
7. [Planners, technicians, and training](https://datacentertraining.us/learn/data-center-maintenance-program.html#people)
8. [Maintenance training](https://datacentertraining.us/learn/data-center-maintenance-program.html#courses)
9. [FAQ](https://datacentertraining.us/learn/data-center-maintenance-program.html#faq)
10. [Sources](https://datacentertraining.us/learn/data-center-maintenance-program.html#sources)

[**Test yourself**Take the Operations & Monitoring quiz.](https://datacentertraining.us/quizzes/operations-quiz.html)

**Short answer:** A data center maintenance program is the documented system for keeping critical equipment reliable. It starts with a complete asset list ranked by criticality, assigns each asset preventive, predictive, and corrective tasks with frequencies taken from manufacturer guidance and standards such as NFPA 70B, NFPA 110, and IEEE battery standards, schedules the work in a CMMS by calendar or operating hours, performs it under methods of procedure and change control, and measures results with KPIs such as PM compliance, backlog, and repeat failures.

Key takeaways

- Start with the asset list: you cannot maintain equipment you have not identified and ranked by criticality.
- Mix preventive (time-based), predictive (condition-based), and corrective work; reliability-centered maintenance decides which fits each asset.
- NFPA 70B became an enforceable standard in its 2023 edition and expects a documented electrical maintenance program.
- Schedule by calendar for time-dependent tasks and by operating hours or condition for wear-dependent tasks; the CMMS should support both.
- Every task on critical equipment needs a method of procedure, change approval, and a check that redundancy is intact before work starts.

## What is an equipment maintenance program?

An equipment maintenance program is more than a calendar of PMs. It is a written system that covers which assets are in scope, what tasks each one gets and why, who is qualified to do them, how work is scheduled and controlled, how results and failures are recorded, and how the program improves over time. In a data center, it also has to protect uptime: almost every task touches equipment that is carrying live load or is one failure away from it.

## Preventive, predictive, and corrective maintenance

**Types of maintenance in a data center program**

| Type | Trigger | Examples |
| --- | --- | --- |
| Preventive (PM) | Calendar or runtime interval | Generator service, filter changes, breaker exercise, battery inspections |
| Predictive (PdM) / condition-based | Measured condition crosses a limit | Infrared thermography, vibration analysis, oil analysis, battery impedance trending |
| Corrective | A defect is found or equipment fails | Replacing a failed fan, repairing a leaking valve |
| Reliability-centered maintenance (RCM) | Analysis of failure modes and consequences | Deciding that a UPS capacitor gets replaced on age while a fan is run to condition |

A mature program shifts work from corrective to predictive over time, because finding a hot connection with a thermal camera is far cheaper than finding it with an arc flash.

## How to build a maintenance program step by step

1. ### Build the asset register

   List every maintainable asset with its make, model, serial number, location, what it feeds or serves, and its documentation. Commissioning records are the best starting point for a new site.
2. ### Rank assets by criticality

   Score each asset by the consequence of its failure (load lost, safety, redundancy remaining) and its likelihood of failure. Critical assets get the deepest maintenance and the tightest controls.
3. ### Define tasks and frequencies

   Start with manufacturer recommendations and applicable standards: NFPA 70B for electrical equipment, NFPA 110 for emergency and standby generators, IEEE 450 and IEEE 1188 for vented and valve-regulated lead-acid batteries, NFPA 25 and NFPA 72 for fire protection. Adjust for condition and history.
4. ### Write procedures

   Each recurring task on critical equipment needs a method of procedure (MOP) or standard operating procedure (SOP) with steps, safety controls, and back-out steps.
5. ### Load the CMMS

   Set up assets, task lists, frequencies, parts, and labor in a computerized maintenance management system so work orders generate automatically.
6. ### Control the work

   Route work on critical systems through change management, confirm redundancy before isolation, and apply lockout/tagout and NFPA 70E controls.
7. ### Record and review

   Capture as-found and as-left readings, failures, and corrective work. Review the data at least quarterly and change frequencies that are too frequent or not frequent enough.

## Typical data center maintenance task frequencies

These are common starting points. Your manufacturer's instructions, the standards your site follows, and your own failure history decide the final schedule.

**Common data center maintenance tasks**

| Asset | Typical tasks | Common frequency |
| --- | --- | --- |
| Standby generators | Inspection; exercise under load; annual service; load bank testing as required | Weekly inspection and monthly exercise under NFPA 110; annual service |
| UPS systems | Inspection, readings, alarm review; manufacturer PM; capacitor and fan replacement on age | Monthly checks; semiannual or annual PM |
| Batteries | Voltage, temperature, and impedance or resistance readings; capacity testing | Monthly to quarterly readings; capacity tests per IEEE schedule |
| Switchgear and breakers | Infrared scan; cleaning, torque checks, insulation testing; breaker exercise and trip testing | Infrared annually; deeper maintenance based on NFPA 70B condition rating |
| Transfer switches | Inspection and transfer testing | Monthly with generator test; annual maintenance |
| CRAH / CRAC units | Filters, coils, fans, valves, condensate, sensor calibration | Monthly to quarterly |
| Chillers and cooling towers | Condition checks, water treatment, tube cleaning, oil analysis | Daily rounds; quarterly and annual service |
| Fire protection | Detection, clean agent, and sprinkler inspection and testing | Per NFPA 72, 2001, and 25 schedules |

## Scheduling: calendar-based vs. operating-hours-based maintenance

Some failure modes depend on time (batteries age, seals dry out, fire equipment must be tested on a schedule), while others depend on use (fan bearings, compressor wear, engine hours). A good preventive maintenance scheduling data model supports both:

- **Calendar-based** tasks trigger on a fixed interval, such as every 30 days or every 12 months.
- **Meter-based** tasks trigger on operating hours, starts, or cycles read from the BMS or entered during rounds.
- **Whichever-comes-first** tasks combine the two, such as a generator service at 250 hours or 12 months.
- **Floating vs. fixed** schedules decide whether the next due date counts from completion or from the original due date; fixed schedules keep compliance tasks aligned to regulatory intervals.

Group tasks that need the same isolation into a single maintenance window, so you take redundancy away once instead of three times.

## Maintenance KPIs and engineering backlog

- **PM compliance:** percentage of scheduled PMs completed within their window. Critical assets should be near 100%.
- **Backlog:** open corrective and deferred work, measured in labor hours or weeks of crew capacity, with safety-critical items tracked separately.
- **Planned vs. unplanned work ratio:** how much time goes to scheduled work versus breakdowns.
- **Repeat failures and MTBF:** assets that fail again after repair point to a root cause the program is missing.
- **Overdue compliance tasks:** anything tied to code or insurance, such as generator and fire protection testing.

In safety-critical environments, tie every backlog item to a risk rating and an owner, review it in a standing meeting, and escalate items that reduce redundancy or protection.

## Maintenance planners, technicians, and training

Large sites separate planning from execution: a maintenance planner builds job plans, orders parts, and coordinates windows, while technicians and vendors do the work. Everyone needs training in the program itself, the CMMS, safe work practices, and the equipment they touch. Our [preventive maintenance training](https://datacentertraining.us/training/preventive-maintenance-training.html) page lays out a training path for planners and technicians.

**How well do you know data center operations?** Ten questions on operations and monitoring.

[Take the Operations Quiz](https://datacentertraining.us/quizzes/operations-quiz.html)

## Maintenance program and planning courses

### [Preventive Maintenance Planning](https://datacentertraining.us/courses/preventive-maintenance-planning.html)

Operations · Modular Specialization

Reduce emergency repairs with a structured preventive maintenance program.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=preventive-maintenance-planning)
- [Add to Cart](https://datacentertraining.us/cart.html?add=preventive-maintenance-planning)

### [Mechanical Systems & Equipment Maintenance](https://datacentertraining.us/courses/mechanical-systems-maintenance.html)

Cooling & Efficiency · Modular Specialization

Hands-on mechanical maintenance — piping, chillers, and vibration diagnostics.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=mechanical-systems-maintenance)
- [Add to Cart](https://datacentertraining.us/cart.html?add=mechanical-systems-maintenance)

### [Building Maintenance Fundamentals](https://datacentertraining.us/courses/building-maintenance-fundamentals.html)

Operations · Modular Specialization

Core building maintenance fundamentals for facilities teams supporting critical infrastructure.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=building-maintenance-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=building-maintenance-fundamentals)

### [Data Center Operations Management](https://datacentertraining.us/courses/data-center-operations-management.html)

Operations · Comprehensive Program · DCIM / SLA Frameworks

Run daily operations like the teams behind Tier 3/4 facilities — maintenance, incident response, and SLAs.

8 hrs

$325.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-operations-management)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-operations-management)

Save 42% with the bundle

Operations & Reliability Bundle

10 courses · 44 hours · **$830.99** per seat, instead of ~~$1,433.90~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-operations-reliability)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### What is a preventive maintenance program?

A preventive maintenance program is a documented system of scheduled inspections, tests, and servicing designed to keep equipment from failing. It defines the assets in scope, the tasks and frequencies for each, the procedures and qualifications required, and how work is scheduled, recorded, and reviewed.

### What should a data center maintenance program include?

An asset register ranked by criticality, task lists and frequencies based on manufacturer guidance and standards, written procedures, a CMMS to schedule and record work, change control and safety controls for work on critical systems, and KPIs reviewed regularly.

### Is NFPA 70B mandatory?

Since its 2023 edition, NFPA 70B has been a standard rather than a recommended practice, written in enforceable language that requires an electrical maintenance program. Whether it is legally required at your site depends on adoption by your jurisdiction, your insurer, and contracts, but OSHA and insurers increasingly look to it.

### Should preventive maintenance be scheduled by calendar or operating hours?

Use both. Time-dependent tasks such as battery inspections and fire system testing run on a calendar, while wear-dependent tasks such as engine or fan service run on operating hours. Many tasks are set to whichever comes first.

### How do you reduce a maintenance backlog?

Rank every item by risk, separate safety-critical work, group tasks that share a maintenance window, fix the causes of repeat failures, and match crew capacity to the scheduled workload. Review the backlog in a standing meeting with clear owners.

## Sources

- NFPA, [NFPA 70B, Standard for Electrical Equipment Maintenance](https://www.nfpa.org/codes-and-standards/nfpa-70b-standard-development/70b).
- NFPA, [NFPA 110, Standard for Emergency and Standby Power Systems](https://www.nfpa.org/codes-and-standards/nfpa-110-standard-development/110).
- IEEE, [IEEE 450, maintenance, testing, and replacement of vented lead-acid batteries](https://standards.ieee.org/ieee/450/7247/).
- U.S. Department of Energy, [Operations and Maintenance Best Practices Guide](https://www.energy.gov/femp/operations-and-maintenance-best-practices-guide).

## Keep learning

[Training](https://datacentertraining.us/training/preventive-maintenance-training.html)

### Preventive Maintenance Training

Courses for maintenance planners and technicians.

See the training →

[Guide](https://datacentertraining.us/learn/data-center-operations.html)

### Data Center Operations

Shifts, MOPs, change control, and incidents.

Read the guide →

[Guide](https://datacentertraining.us/learn/crah-units.html)

### CRAH Units Explained

Components, failures, and maintenance tasks.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-facility-manager.html)

### Data Center Facility Manager

The role that owns the maintenance program.

See the role →

This guide is general educational information. Maintenance frequencies and methods must follow the equipment manufacturer's instructions, the standards adopted for your site, and your insurer's requirements.

## Train Your Maintenance Team

Online preventive maintenance planning, mechanical maintenance, and operations courses for data center planners, technicians, and managers.

- [See Maintenance Training](https://datacentertraining.us/training/preventive-maintenance-training.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-maintenance-program.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
