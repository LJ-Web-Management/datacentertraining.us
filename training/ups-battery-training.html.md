# UPS & Battery Training for Data Centers

Training · UPS & Batteries

The UPS carries every server through the seconds between a utility failure and generator pickup, and its batteries hold energy even when everything else is switched off. Here is who needs UPS training, what it should cover, how to work safely around it, and the course path that builds it.

8 min read Beginner to intermediate Updated October 2026

On this page

1. [UPS training courses](https://datacentertraining.us/training/ups-battery-training.html#courses)
2. [Who needs UPS training](https://datacentertraining.us/training/ups-battery-training.html#who-needs)
3. [What UPS training covers](https://datacentertraining.us/training/ups-battery-training.html#what-it-covers)
4. [Battery types and battery safety](https://datacentertraining.us/training/ups-battery-training.html#batteries)
5. [Lithium-ion thermal runaway](https://datacentertraining.us/training/ups-battery-training.html#lithium-ion)
6. [Safe practices](https://datacentertraining.us/training/ups-battery-training.html#safe-practices)
7. [How often to refresh](https://datacentertraining.us/training/ups-battery-training.html#refresh)
8. [The course path](https://datacentertraining.us/training/ups-battery-training.html#course-path)
9. [FAQ](https://datacentertraining.us/training/ups-battery-training.html#faq)
10. [Sources](https://datacentertraining.us/training/ups-battery-training.html#sources)

[**Test yourself**Take the 10-question Power & Electrical quiz.](https://datacentertraining.us/quizzes/power-electrical-quiz.html)

**Short answer:** UPS and battery training teaches data center staff how uninterruptible power supply systems work, what their alarms mean, how bypass and load transfers are done safely, how batteries are tested and maintained, and how to recognize lead-acid and lithium-ion battery hazards. Many roles need the knowledge, but only employer-qualified people perform switching and battery service.

Key takeaways

- Power technicians need deep UPS training. Everyone else who works near UPS and battery rooms needs awareness of operating states, alarms, and hazards.
- Bypass operations are where people drop load. Training should make written, step-by-step switching procedures a habit.
- Batteries stay energized when the UPS is off. Lithium-ion adds thermal runaway, which needs its own recognition and response training.
- Refresh training on your employer's schedule, and whenever equipment, procedures, or battery chemistry change.

## UPS systems training courses

These self-paced online courses cover UPS theory, operations and load testing, DC fundamentals, battery safety, and lithium-ion emergency response. Each awards a certificate of completion.

### [UPS Systems Fundamentals](https://datacentertraining.us/courses/ups-systems-fundamentals.html)

Power & Electrical · Modular Specialization

Foundational UPS theory to complement hands-on operations and load testing.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=ups-systems-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=ups-systems-fundamentals)

### [UPS Operations & Load Testing](https://datacentertraining.us/courses/ups-operations-load-testing.html)

Power & Electrical · Modular Specialization

Master UPS operations, battery testing, and load-bank procedures.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=ups-operations-load-testing)
- [Add to Cart](https://datacentertraining.us/cart.html?add=ups-operations-load-testing)

### [Batteries and DC Circuits](https://datacentertraining.us/courses/batteries-dc-circuits.html)

Power & Electrical · Modular Specialization

Master DC circuit fundamentals and battery behavior behind every backup power system.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=batteries-dc-circuits)
- [Add to Cart](https://datacentertraining.us/cart.html?add=batteries-dc-circuits)

### [Data Center UPS and Battery System Safety Training](https://datacentertraining.us/courses/data-center-ups-battery-safety.html)

Power & Electrical · Modular Specialization

Safety-focused training for anyone working around data center UPS and battery systems.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-ups-battery-safety)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-ups-battery-safety)

### [Lithium-Ion Battery Thermal Runaway and Emergency Response Training](https://datacentertraining.us/courses/lithium-ion-thermal-runaway-emergency-response.html)

Power & Electrical · Modular Specialization

Recognize and respond to lithium-ion battery thermal runaway before it escalates.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=lithium-ion-thermal-runaway-emergency-response)
- [Add to Cart](https://datacentertraining.us/cart.html?add=lithium-ion-thermal-runaway-emergency-response)

Save 38% with the bundle

Power & Electrical Systems Bundle

14 courses · 47 hours · **$986.99** per seat, instead of ~~$1,603.86~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-power-electrical)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Who needs UPS training?

Anyone who operates, maintains, monitors, or works near UPS and battery systems needs UPS training, but the depth differs by role. A power technician needs to understand transfers and testing in detail; an IT technician needs to know what "on bypass" means and why they must stay out of the battery room.

**UPS training needs by role**

| Role | What they need to know | Depth |
| --- | --- | --- |
| Critical facilities and power technicians, electricians | Topologies, operating modes, static and maintenance bypass, switching procedures, battery testing, load-bank tests, and battery hazards | Deep, plus hands-on training on site equipment |
| Data center and IT technicians | What the UPS does, A and B feeds, what alarms mean, and battery room hazards | Awareness |
| NOC and BMS operators | Which UPS alarms are urgent, what each state means, and who to escalate to | Awareness plus alarm response |
| Facility managers | Maintenance and testing programs, vendor oversight, MOP review, and battery replacement planning | Program level |
| Security and emergency response staff | Battery room hazards, thermal runaway warning signs, evacuation and notification steps | Awareness plus emergency response |

## What does UPS training cover?

Solid uninterruptible power supply training covers five topics: topologies, operating modes and bypass, alarms, testing, and batteries. The [data center power guide](https://datacentertraining.us/learn/data-center-power.html) gives the big picture of where the UPS sits in the power chain.

### Topologies and operating modes

Data centers almost always use double-conversion (online) UPS systems, which feed the load from the inverter continuously, so there is no transfer time when the utility fails. Line-interactive and standby designs, and high-efficiency "eco" modes, show up in smaller rooms and edge sites. [UPS Systems Fundamentals](https://datacentertraining.us/courses/ups-systems-fundamentals.html) covers topologies, how the UPS manages its batteries, and how to read status panels.

### Bypass operations

A UPS has two bypass paths. The static bypass is an automatic electronic switch that moves the load to the bypass source on an internal fault or overload. The maintenance bypass is a set of manually operated breakers that route power around the UPS so it can be serviced. On either bypass, the load has no battery protection. Operating breakers in the wrong order is a well-known way to drop a data hall, which is why switching is done only by authorized staff from a written method of procedure (MOP), with a second person verifying each step.

### Alarms and what to do about them

**Common UPS alarms and typical first responses**

| Alarm or state | What it usually means | Typical first response |
| --- | --- | --- |
| On battery | Input power is lost or out of tolerance and the batteries are carrying the load. | Urgent. Confirm generator start and transfer, watch remaining runtime, escalate immediately. |
| Load on bypass | The load is fed from the bypass source, not the inverter, and has no battery protection. | Urgent unless it is part of a planned MOP. Escalate to the power team. |
| Low battery or battery fault | Runtime is reduced, or a string, cell, or connection has a problem. | Escalate; review recent battery test data; avoid risky work on that system. |
| Overload | Load exceeds the UPS rating, which can force a transfer to bypass. | Escalate; check recent installs and A/B feed loading. |
| High battery or room temperature | Cooling problem in the battery space; heat shortens battery life and raises risk. | Check room cooling and escalate; on lithium-ion systems, treat as a possible early warning. |

Your site's alarm procedures take priority over any generic table. The point of training is that nobody acknowledges an "on battery" alarm the way they would a filter alarm.

### Load testing

A load-bank test connects a temporary resistive load to prove that the UPS and its batteries can carry rated load for the expected runtime. Tests are planned like any critical change, with a written procedure, a backout plan, and qualified staff or the manufacturer's service team making the connections. [UPS Operations & Load Testing](https://datacentertraining.us/courses/ups-operations-load-testing.html) covers battery management, load transfer procedures, and how load-bank tests are planned and interpreted.

## Battery types and battery safety

UPS batteries are DC systems that store a large amount of energy, and that energy is present whether the UPS is running or not. Training should cover the chemistry on your site and the hazards that come with it.

**UPS battery types at a glance**

| Type | Where you see it | What training should stress |
| --- | --- | --- |
| Valve-regulated lead-acid (VRLA) | The long-time default for UPS cabinets and racks | Heat shortens life sharply; regular voltage, internal resistance, and temperature checks catch weak cells early. |
| Vented (flooded) lead-acid | Larger and older battery rooms | Hydrogen off-gassing and ventilation, corrosive electrolyte, eyewash and drench equipment. |
| Lithium-ion | Increasingly common in new UPS systems | Battery management system alarms, thermal runaway warning signs, and site emergency response. |

IEEE publishes recommended practices for battery maintenance and testing, such as IEEE 450 for vented lead-acid and IEEE 1188 for VRLA batteries, and manufacturers set their own schedules. [Batteries and DC Circuits](https://datacentertraining.us/courses/batteries-dc-circuits.html) builds the DC theory behind those test results: series and parallel strings, internal resistance, and why readings change as batteries age.

On the safety side, NFPA 70E includes specific requirements for work on batteries and battery rooms, and OSHA requires facilities for quick drenching or flushing of the eyes and body where workers may be exposed to injurious corrosive materials. [Data Center UPS and Battery System Safety Training](https://datacentertraining.us/courses/data-center-ups-battery-safety.html) covers off-gassing, stored energy, PPE and ventilation, and incident response.

## Lithium-ion thermal runaway: what training must add

Lithium-ion batteries need their own emergency training because they fail differently. In thermal runaway, a cell overheats and releases flammable and toxic gases, heat can spread from cell to cell, and a fire that looks extinguished can reignite.

- **Codes and testing:** NFPA 855 covers the installation of stationary energy storage systems, and UL 9540A is the test method used to evaluate how thermal runaway propagates in a battery system.
- **Warning signs:** off-gas detector alarms, battery management system alarms, rising cell or cabinet temperatures, unusual odors, swelling, or venting.
- **Response:** raise the alarm, evacuate, notify the fire department, and follow the facility's emergency action plan. Facility staff are not trained or equipped to fight a battery fire.

[Lithium-Ion Battery Thermal Runaway and Emergency Response Training](https://datacentertraining.us/courses/lithium-ion-thermal-runaway-emergency-response.html) covers recognition, containment steps, and coordination with fire services.

## Safe practices around UPS and battery systems

The safest UPS work is planned, written down, and done by the right people. These habits should come out of any UPS and battery training program:

- Treat every battery string as energized. Opening the UPS output does not de-energize the batteries.
- Use insulated tools and remove jewelry. A dropped wrench across battery terminals can cause an arc and severe burns.
- Never operate bypass or battery breakers without authorization and a written procedure; use a second person to verify each step.
- Know where the eyewash station, spill kit, and emergency stops are before you enter a battery room.
- Keep battery rooms clean, cool, ventilated, and free of ignition sources and stored combustibles.

Training is not authorization

Online UPS and battery courses build knowledge and awareness. They do not make anyone a qualified person, authorize switching or lockout/tagout, or replace the manufacturer's procedures and hands-on training on your site's equipment. Your employer decides who may do that work.

## How often should UPS training be refreshed?

Follow your employer's electrical safety program. NFPA 70E calls for electrical safety retraining at intervals not exceeding three years, and sooner when there is a reason, such as new equipment or work practices or evidence that someone is not following procedures.

Many sites go further as a practice, not a legal requirement: they review bypass procedures every year, walk through the MOP before every planned transfer or load test, drill battery room emergency response, and retrain when the UPS model or battery chemistry changes or after an incident.

**How well do you know UPS systems and batteries?** Ten questions on data center power, instant answers.

[Take the Power Quiz](https://datacentertraining.us/quizzes/power-electrical-quiz.html)

## The UPS and battery training path, course by course

Take the safety course first if you will enter battery rooms, then build theory before operations. Add lithium-ion response if your site has lithium-ion batteries.

1. ### Battery room safety

   [UPS and Battery System Safety](https://datacentertraining.us/courses/data-center-ups-battery-safety.html) for anyone who works near UPS and battery installations.
2. ### DC and UPS theory

   [Batteries and DC Circuits](https://datacentertraining.us/courses/batteries-dc-circuits.html), then [UPS Systems Fundamentals](https://datacentertraining.us/courses/ups-systems-fundamentals.html), so test results, displays, and alarms make sense.
3. ### Operations and load testing

   [UPS Operations & Load Testing](https://datacentertraining.us/courses/ups-operations-load-testing.html) for power technicians and electricians who support transfers and load-bank tests.
4. ### Lithium-ion emergency response

   [Lithium-Ion Thermal Runaway and Emergency Response](https://datacentertraining.us/courses/lithium-ion-thermal-runaway-emergency-response.html) for facilities and response staff on sites with lithium-ion batteries.

## Frequently asked questions

### Who should take UPS systems training courses?

Critical facilities technicians, electricians, and power technicians need the deepest UPS training because they operate, test, and support maintenance on the equipment. Data center technicians, NOC and BMS operators, facility managers, and anyone who enters battery rooms need awareness-level training on UPS states, alarms, and battery hazards.

### Can uninterruptible power supply training be done online?

Yes, the knowledge part can. Online courses cover UPS theory, operating modes, alarms, testing concepts, and battery hazards well. Hands-on switching, battery service, and load-bank connections still have to be learned on your site's equipment under the manufacturer's procedures and your employer's supervision.

### Does UPS battery training cover lithium-ion batteries?

It should. Lithium-ion UPS batteries are now common, and they bring a different emergency than lead-acid: thermal runaway, where overheating cells release flammable and toxic gases and heat can spread from cell to cell. Staff need to recognize the warning signs and follow the site's evacuation and notification steps.

### Does a UPS course qualify me to perform UPS maintenance?

No. A course builds knowledge and awareness. Only your employer can designate you as qualified for switching, battery replacement, or other work on or near energized parts, after equipment-specific training and demonstrated skill, and much UPS maintenance is performed by manufacturer-trained service technicians.

### How often should UPS and battery training be repeated?

Follow your employer's electrical safety program. NFPA 70E calls for electrical safety retraining at intervals not exceeding three years, and sooner when work practices, equipment, or procedures change. Many sites also review UPS switching procedures and battery emergency response every year and before major tests.

## Sources

- OSHA, [29 CFR 1910.151, Medical services and first aid](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.151) (eyewash and drench facilities where corrosive materials are present).
- NFPA, [NFPA 70E, Standard for Electrical Safety in the Workplace: document information](https://www.nfpa.org/codes-and-standards/nfpa-70e-standard-development/70e).
- Electrical Contractor magazine, [Has it been three years already? Updates to NFPA 70E's training requirements](https://www.ecmag.com/magazine/articles/article-detail/has-it-been-three-years-already-updates-to-nfpa-70e-s-training-requirements) (retraining interval).
- NFPA, [NFPA 855, Standard for the Installation of Stationary Energy Storage Systems: document information](https://www.nfpa.org/codes-and-standards/nfpa-855-standard-development/855).
- UL Solutions, [UL 9540A test method](https://www.ul.com/services/UL-9540A-test-method) (evaluating thermal runaway fire propagation in battery energy storage systems).
- European Commission Joint Research Centre, [IEEE 450, Recommended practice for maintenance, testing, and replacement of vented lead-acid batteries](https://ses.jrc.ec.europa.eu/eirie/en/standard-regulations/ieee-recommended-practice-maintenance-testing-and-replacement-vented-lead-acid) (standard summary).

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-power.html)

### How Data Center Power Works

Where the UPS sits between the utility, the generators, and the racks.

Read the guide →

[Training](https://datacentertraining.us/training/generator-training.html)

### Generator Training

The other half of backup power: generators, transfer switches, and load banks.

Read the guide →

[Training](https://datacentertraining.us/training/arc-flash-training.html)

### Arc Flash Training

Arc flash hazards, boundaries, and PPE around switchgear and UPS systems.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-electrician.html)

### Data Center Electrician

What electricians do in data centers and how to move into the field.

See the role →

This guide is general educational information, not engineering, legal, safety, or compliance advice. Follow your site's procedures, the equipment manufacturer's instructions, and the codes adopted in your jurisdiction. Your employer decides who is qualified for each task.

## Train Your Team on UPS and Battery Systems

Our Power & Electrical courses cover UPS theory and operations, load testing, DC fundamentals, battery safety, and lithium-ion emergency response.

- [See the Power Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/training/ups-battery-training.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
