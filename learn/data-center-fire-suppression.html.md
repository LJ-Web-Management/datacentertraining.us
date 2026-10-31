# Data Center Fire Suppression: Clean Agents, Detection, and Compliance

Knowledge Center · Safety

A data center has to put out a fire without destroying the equipment it is protecting, and without hurting the people inside. That is why it uses very early smoke detection, clean agent gas, and preaction sprinklers instead of the systems in an office. Here is how each one works, which standards apply, and what to do after a discharge or a failed inspection.

11 min read All levels Updated October 2026

On this page

1. [How data center fire protection is layered](https://datacentertraining.us/learn/data-center-fire-suppression.html#layers)
2. [Fire detection](https://datacentertraining.us/learn/data-center-fire-suppression.html#detection)
3. [Clean agent systems](https://datacentertraining.us/learn/data-center-fire-suppression.html#clean-agent)
4. [Preaction sprinklers](https://datacentertraining.us/learn/data-center-fire-suppression.html#sprinklers)
5. [Standards compliance teams evaluate](https://datacentertraining.us/learn/data-center-fire-suppression.html#standards)
6. [Restoring compliance after an event](https://datacentertraining.us/learn/data-center-fire-suppression.html#restore)
7. [Safety for people in the room](https://datacentertraining.us/learn/data-center-fire-suppression.html#people)
8. [Fire suppression training](https://datacentertraining.us/learn/data-center-fire-suppression.html#courses)
9. [FAQ](https://datacentertraining.us/learn/data-center-fire-suppression.html#faq)
10. [Sources](https://datacentertraining.us/learn/data-center-fire-suppression.html#sources)

[**Test yourself**Take the Safety quiz.](https://datacentertraining.us/quizzes/safety-quiz.html)

**Short answer:** Most data centers protect IT spaces with very early warning aspirating smoke detection, a clean agent gaseous system (such as HFC-227ea, FK-5-1-12, or inert gases like IG-541) that puts out a fire without leaving residue, and a preaction sprinkler system as the backup required by the building code. The key standards are NFPA 75 and 76 for IT and telecom spaces, NFPA 2001 for clean agents, NFPA 13 for sprinklers, NFPA 72 for detection and alarm, and NFPA 25 for sprinkler inspection, testing, and maintenance.

Key takeaways

- Detection comes first: aspirating (VESDA-style) systems find smoke long before a fire grows.
- Clean agents put out fires by removing heat or oxygen without water or residue; inert gas systems lower oxygen, so people must evacuate.
- Preaction sprinklers need two events, a detection signal and a fused sprinkler head, before water flows.
- A suppression discharge, a damaged fire barrier, or a failed inspection is an impairment that needs a documented plan, often including a fire watch.
- Room integrity matters: a clean agent only works if the room holds the gas long enough, which is why penetrations and door seals are tested.

## How data center fire protection is layered

Data center fire protection works in layers, each designed to act before the next one is needed: prevent ignition through good electrical maintenance and housekeeping; detect smoke at the earliest stage; suppress a fire in the room with a clean agent; and, if that fails, control it with sprinklers. Fire barriers separate rooms so a fire in one does not spread to another, and the fire alarm system ties it all together.

## Fire detection: why aspirating systems are standard

The high airflow in a data hall dilutes smoke, so ordinary spot smoke detectors on the ceiling may not see a smoldering cable until it is well developed. Aspirating smoke detection (often called VESDA, after a common brand) draws air continuously through a pipe network to a very sensitive detector and raises staged alerts, from an early warning that sends someone to investigate to a fire signal that starts suppression. Sampling points are often placed at CRAH returns and in the hot aisle, where smoke goes first. Detection and alarm systems are installed, inspected, and tested under NFPA 72.

## Clean agent fire suppression systems

A clean agent is a gas that puts out fire and leaves no residue, so equipment can often be returned to service after cleanup. Systems are designed and maintained under NFPA 2001.

**Common clean agents in data centers**

| Agent | How it works | Notes |
| --- | --- | --- |
| HFC-227ea (often sold as FM-200) | Chemical agent that absorbs heat | Long installed base; it is a hydrofluorocarbon being phased down under the U.S. AIM Act, which affects future supply and cost |
| FK-5-1-12 (often sold as Novec 1230) | Fluorinated ketone stored as a liquid, absorbs heat | Low global warming potential; 3M ended its own production, and other manufacturers supply the agent |
| Inert gases (IG-541, IG-55, IG-100) | Lower oxygen to a level that will not support combustion | No chemical byproducts; needs more cylinder space and pressure relief venting |

Clean agent systems are usually triggered by two detection signals (cross-zoned or a staged aspirating alarm), sound a pre-discharge alarm, and run a countdown so people can leave. An abort switch can hold the countdown, and a manual release can start it.

## Preaction sprinkler systems

Most building codes still require sprinklers in data centers, and NFPA 75 relies on them as the backstop. To protect against accidental water release, IT spaces usually use preaction systems: the pipes are dry until a detection system opens a valve, and water flows only from sprinkler heads that the heat of a fire has opened. A double-interlock preaction system needs both events before water enters the pipes. Sprinkler systems are designed under NFPA 13 and inspected, tested, and maintained under NFPA 25.

## What fire detection and suppression requirements should compliance teams evaluate?

- **NFPA 75**, Fire Protection of Information Technology Equipment, and **NFPA 76**, Fire Protection of Telecommunications Facilities: construction, detection, suppression, and emergency procedures for IT and telecom spaces.
- **NFPA 2001**, Clean Agent Fire Extinguishing Systems: design concentration, hold time, room integrity, safety for people, and inspection.
- **NFPA 72**, National Fire Alarm and Signaling Code: detection, alarm, and the inspection and testing schedule.
- **NFPA 13 and NFPA 25**: sprinkler design and ongoing inspection, testing, and maintenance, including impairment handling.
- **The adopted building and fire codes** (often the International Building and Fire Codes) and any local amendments, enforced by the fire marshal.
- **Insurer requirements**, which may go beyond the code.
- **Lithium-ion battery hazards** in UPS rooms, which can need specific detection, ventilation, and suppression approaches. See [lithium-ion thermal runaway emergency response](https://datacentertraining.us/courses/lithium-ion-thermal-runaway-emergency-response.html).

Compliance teams should check that inspection and test records exist for each system on the required schedule, deficiencies are tracked to closure, and impairments are handled under a written procedure.

## How to restore compliance after a discharge, damaged barrier, or failed inspection

Each of these events leaves part of the facility with less fire protection than it was designed for. Treat it as an impairment and work through these steps:

1. ### Make the area safe and notify

   After a discharge, ventilate before re-entry and confirm the fire is out. Notify the fire alarm monitoring company, the fire department or fire marshal as required, your insurer, and affected customers.
2. ### Put interim protection in place

   Follow your impairment procedure. That often means a fire watch, extra portable extinguishers, and restricting hot work until protection is restored.
3. ### Find the cause

   For a discharge, establish whether it was a real fire, a detection fault, or human error. For a failed inspection, list each deficiency.
4. ### Restore the system with licensed contractors

   Recharge or replace agent cylinders, repair detection, and fix fire barrier penetrations using listed firestop systems. Many states, including Texas through its State Fire Marshal's Office, license the firms that service fire protection systems.
5. ### Test and document

   Re-test the system, including a room integrity (door fan) test where the enclosure changed, and record the results. Get the fire marshal's sign-off where required.
6. ### Close the loop

   Update procedures or training if human error was involved and brief the operations team.

## Safety for people in a protected room

Clean agents are designed for occupied spaces at their normal concentrations, but no one should stay in a room during a discharge. Inert gas systems lower oxygen, a fire produces toxic smoke, and chemical agents can break down into harmful byproducts in a fire. Everyone who enters an IT space should know what the pre-discharge alarm sounds like, where the abort and manual release stations are, and how to get out.

**Do you know what the pre-discharge alarm means?** Ten questions on data center safety.

[Take the Safety Quiz](https://datacentertraining.us/quizzes/safety-quiz.html)

## Fire suppression and compliance training

### [Data Center Fire Suppression System Safety Training (Clean Agent Systems)](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html)

Security & Compliance · Modular Specialization · NFPA 2001

Clean agent fire suppression safety for occupied data hall environments.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-fire-suppression-safety)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-fire-suppression-safety)

### [Lithium-Ion Battery Thermal Runaway and Emergency Response Training](https://datacentertraining.us/courses/lithium-ion-thermal-runaway-emergency-response.html)

Power & Electrical · Modular Specialization

Recognize and respond to lithium-ion battery thermal runaway before it escalates.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=lithium-ion-thermal-runaway-emergency-response)
- [Add to Cart](https://datacentertraining.us/cart.html?add=lithium-ion-thermal-runaway-emergency-response)

### [Facility Environmental Compliance](https://datacentertraining.us/courses/facility-environmental-compliance.html)

Security & Compliance · Modular Specialization

Understand the environmental regulations that apply to your facility.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=facility-environmental-compliance)
- [Add to Cart](https://datacentertraining.us/cart.html?add=facility-environmental-compliance)

## Frequently asked questions

### What fire suppression system is used in data centers?

Most data centers use a clean agent gaseous system such as HFC-227ea, FK-5-1-12, or an inert gas in the IT spaces, with a preaction sprinkler system as the code-required backup, and very early warning aspirating smoke detection.

### Is clean agent fire suppression safe for people?

Clean agents are designed for use in normally occupied spaces at their design concentrations, but people should still evacuate when the pre-discharge alarm sounds. Inert gases lower oxygen, and smoke and agent breakdown products from a fire are hazardous.

### What is a preaction sprinkler system?

A preaction system keeps the sprinkler pipes dry until a detection system opens a control valve. Water then flows only from sprinkler heads opened by heat. This protects IT equipment from accidental water release.

### What standards apply to data center fire suppression?

NFPA 75 and 76 for IT and telecom spaces, NFPA 2001 for clean agent systems, NFPA 72 for detection and alarm, NFPA 13 for sprinkler design, NFPA 25 for sprinkler inspection and maintenance, and the building and fire codes adopted by your jurisdiction.

### What should a data center do after a clean agent discharge?

Ventilate and make the area safe, notify the monitoring company, fire officials, insurer, and customers as required, put a fire watch or other interim protection in place, find the cause, have a licensed contractor recharge and restore the system, test room integrity if needed, and document everything.

## Sources

- NFPA, [NFPA 75, Fire Protection of Information Technology Equipment](https://www.nfpa.org/codes-and-standards/nfpa-75-standard-development/75).
- NFPA, [NFPA 2001, Clean Agent Fire Extinguishing Systems](https://www.nfpa.org/codes-and-standards/nfpa-2001-standard-development/2001).
- NFPA, [NFPA 25, Inspection, Testing, and Maintenance of Water-Based Fire Protection Systems](https://www.nfpa.org/codes-and-standards/nfpa-25-standard-development/25).
- U.S. EPA, [Protecting our climate by reducing use of HFCs](https://www.epa.gov/climate-hfcs-reduction) (AIM Act).
- Texas Department of Insurance, [State Fire Marshal's Office](https://www.tdi.texas.gov/fire/index.html) (fire protection licensing).

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-safety.html)

### Data Center Safety Guide

Arc flash, LOTO, batteries, EPO, and clean agents.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-epo.html)

### Data Center EPO

Emergency power off and how it ties to fire systems.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-standards.html)

### Standards and Regulations

NFPA, OSHA, TIA-942, ASHRAE, and ISO in one place.

Read the guide →

[Course](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html)

### Fire Suppression Safety

Clean agents, detection, and safe work in protected rooms.

View the course →

This guide is general educational information, not fire protection engineering or code compliance advice. Your authority having jurisdiction, your insurer, and a qualified fire protection engineer decide what your facility needs.

## Train Your Team on Fire Safety

Online fire suppression, lithium-ion battery emergency response, and compliance courses for data center operators and compliance teams.

- [See the Fire Suppression Course](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-fire-suppression.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
