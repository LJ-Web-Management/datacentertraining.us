# Data Center Operations & Monitoring Quiz

Quiz · Operations & Monitoring

Ten questions on how critical facilities run day to day: procedures, change control, maintenance strategy, monitoring, and incident response. Each answer comes with a short explanation.

10 questions About 5 minutes Intermediate

## Quiz questions

1. Question 1 Which document is a step-by-step plan for a specific, planned change to live critical infrastructure, such as putting a UPS on maintenance bypass?

   - SOP (standard operating procedure)
   - MOP (method of procedure)
   - EOP (emergency operating procedure)
   - SLA (service level agreement)

   **Show answer**

   **Answer: a MOP.** SOPs cover routine, repeatable tasks like equipment rounds, while MOPs cover planned work on critical systems with exact steps, hold points, approvals, and a back-out plan. EOPs tell responders what to do when something fails. [Read the operations guide](https://datacentertraining.us/learn/data-center-operations.html).
2. Question 2 Which statement about change management in a critical facility is correct?

   - Emergency changes skip review and documentation entirely
   - It applies only to IT software, not to power and cooling systems
   - Approval is needed only when a change is expected to cause an outage
   - Changes to critical infrastructure are risk-assessed, approved, scheduled, and documented, with a back-out plan, before work starts

   **Show answer**

   **Answer: every change is assessed, approved, and documented first.** Many outages start with a change or maintenance task, so change review is where risk gets caught. Emergency changes still follow an expedited path and are documented afterward. [Data Center Operations Management](https://datacentertraining.us/courses/data-center-operations-management.html) covers change control.
3. Question 3 What is the difference between preventive and predictive maintenance?

   - Preventive is done on a fixed schedule or run hours; predictive uses condition data, such as vibration or infrared scans, to act when indicators show it is needed
   - Preventive is done after a failure; predictive is done before one
   - They are two names for the same calendar-based practice
   - Predictive maintenance applies only to IT equipment, not facility systems

   **Show answer**

   **Answer: schedule-based versus condition-based.** Preventive work follows the calendar or run hours, like quarterly filter changes. Predictive work watches condition, like rising bearing vibration or a hot lug on an infrared scan, and fixes it before it fails; repairing after failure is reactive maintenance. [Preventive Maintenance Planning](https://datacentertraining.us/courses/preventive-maintenance-planning.html) covers both strategies.
4. Question 4 What does a CMMS do for a facilities team?

   - Controls chiller staging in real time
   - Tracks rack power, space, and network ports for capacity planning
   - Schedules and tracks work orders, preventive maintenance tasks, asset history, and spare parts
   - Monitors network traffic for intrusions

   **Show answer**

   **Answer: it manages maintenance work and asset history.** A computerized maintenance management system is the system of record for what was done, when, and by whom. Real-time control belongs to the BMS, and rack-level capacity tracking belongs to DCIM. [Preventive Maintenance Planning](https://datacentertraining.us/courses/preventive-maintenance-planning.html) covers CMMS use.
5. Question 5 Inherent availability is often estimated as MTBF / (MTBF + MTTR). What does shortening MTTR do?

   - Lowers availability
   - Raises availability, because each failure keeps the system down for less time
   - Has no effect, because only MTBF matters
   - Raises MTBF by the same amount

   **Show answer**

   **Answer: it raises availability.** MTBF is mean time between failures and MTTR is mean time to repair. With an MTBF of 10,000 hours, cutting MTTR from 10 hours to 2 hours lifts availability from about 99.90 to 99.98 percent, which is why on-site spares, clear EOPs, and trained staff matter. [Incident Response & Troubleshooting](https://datacentertraining.us/courses/incident-response-troubleshooting.html) covers faster recovery.
6. Question 6 What is the difference between RTO and RPO?

   - RTO is the maximum acceptable time to restore a service; RPO is the maximum acceptable data loss, measured as time since the last good copy
   - RTO is the maximum acceptable data loss; RPO is the time it takes to recover
   - Both measure how long the UPS batteries can carry the load
   - RTO applies to facility systems, while RPO applies only to networks

   **Show answer**

   **Answer: RTO is restore time; RPO is data loss.** An RPO of 15 minutes means backups or replication can never be more than 15 minutes behind. RTO drives recovery site and staffing decisions, while RPO drives backup and replication design. [Disaster Recovery & Business Continuity](https://datacentertraining.us/courses/disaster-recovery-business-continuity.html) covers both.
7. Question 7 Which system is built to monitor the electrical distribution system in detail, including power quality and breaker status, often with waveform capture?

   - BMS (building management system)
   - DCIM (data center infrastructure management)
   - CMMS (computerized maintenance management system)
   - EPMS (electrical power monitoring system)

   **Show answer**

   **Answer: the EPMS.** An EPMS reads meters, relays, and breaker trip units to capture power quality events and sequence-of-events data. A BMS monitors and controls mechanical systems like CRAHs, chillers, and pumps, and DCIM ties facility data to IT assets and capacity. [Monitoring, Automation & BMS Systems](https://datacentertraining.us/courses/monitoring-automation-bms-systems.html) compares the platforms.
8. Question 8 What is the best way to reduce alarm fatigue in a monitoring center?

   - Turn off any alarm that sounds more than once a day
   - Add louder alarm tones so operators pay attention
   - Rationalize alarms: tune setpoints and deadbands, set priorities, suppress follow-on alarms, and remove nuisance points
   - Send every alarm to email instead of the console

   **Show answer**

   **Answer: rationalize the alarms.** When operators see hundreds of low-value alarms, they start acknowledging without reading, and a critical one gets missed. Rationalization gives every alarm a cause, a priority, and a defined response. [DCIM Platform Fundamentals](https://datacentertraining.us/courses/dcim-platform-fundamentals.html) covers alarm management.
9. Question 9 After an incident is resolved, what is the goal of a root cause analysis (RCA)?

   - Identify which employee should be disciplined for the failure
   - Calculate the service credits owed to affected customers
   - Replace the failed part as quickly as possible and close the ticket
   - Find the underlying causes, often in process, design, or training, and set corrective actions that prevent a repeat

   **Show answer**

   **Answer: find underlying causes and prevent a repeat.** Methods like the 5 Whys and fishbone diagrams dig past "the breaker tripped" to why it tripped and why nobody caught it. A blameless approach gets honest answers, and corrective actions are tracked to closure. [Incident Response & Troubleshooting](https://datacentertraining.us/courses/incident-response-troubleshooting.html) covers RCA methods.
10. Question 10 What makes a good shift handoff in a 24/7 critical facility?

    - A structured turnover of active alarms, systems in abnormal or bypass states, work in progress, and planned work, written down and reviewed together
    - A quick verbal "all good" as the next shift walks in
    - Notes left in each technician's personal email
    - A formal handoff only when there is an active incident

    **Show answer**

    **Answer: a structured, written, face-to-face turnover.** Incidents can start when the incoming shift does not know a system was left in bypass or a valve was left closed. A written log plus a walk-through keeps that knowledge from leaving with the outgoing shift. [Data Center Operations Management](https://datacentertraining.us/courses/data-center-operations-management.html) covers shift practices.

Choose an answer to continue.

## Courses That Cover These Topics

Every question above maps to a self-paced course. Each awards a certificate of completion.

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

Save 42% with the bundle

Operations & Reliability Bundle

10 courses · 44 hours · **$830.99** per seat, instead of ~~$1,433.90~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-operations-reliability)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Keep Going

Brush up with a guide, or try another quiz.

### [Data Center Operations Guide](https://datacentertraining.us/learn/data-center-operations.html)

The guide behind this quiz: procedures, maintenance, and monitoring.

Read the guide →

### [Tiers & Design Quiz](https://datacentertraining.us/quizzes/tiers-design-quiz.html)

Tier I to IV, redundancy, commissioning, and availability math.

Take the quiz →

### [Which Career Fits You?](https://datacentertraining.us/quizzes/career-quiz.html)

Find your data center role in ten questions.

Find my match →

---

Markdown version of https://datacentertraining.us/quizzes/operations-quiz.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
