# Data Center Safety Guide: Hazards, Rules, and Training

Knowledge Center · Safety

A data center looks clean and quiet, but it holds high-energy electrical gear, battery rooms, gas-based fire suppression, pressurized refrigerant, and heavy equipment. Here is what can hurt you, which rules apply, and how good sites keep people safe.

14 min read Beginner to intermediate Updated October 2026

On this page

1. [Hazards at a glance](https://datacentertraining.us/learn/data-center-safety.html#hazards)
2. [Shock and arc flash](https://datacentertraining.us/learn/data-center-safety.html#electrical)
3. [Lockout/tagout](https://datacentertraining.us/learn/data-center-safety.html#loto)
4. [Batteries](https://datacentertraining.us/learn/data-center-safety.html#batteries)
5. [Emergency power off](https://datacentertraining.us/learn/data-center-safety.html#epo)
6. [Fire suppression](https://datacentertraining.us/learn/data-center-safety.html#fire-suppression)
7. [Raised floors and confined spaces](https://datacentertraining.us/learn/data-center-safety.html#raised-floor)
8. [Refrigerant, lifting, noise, heat](https://datacentertraining.us/learn/data-center-safety.html#other-hazards)
9. [Contractors and permits](https://datacentertraining.us/learn/data-center-safety.html#contractors)
10. [Building a training program](https://datacentertraining.us/learn/data-center-safety.html#training)
11. [Courses](https://datacentertraining.us/learn/data-center-safety.html#courses)
12. [FAQ](https://datacentertraining.us/learn/data-center-safety.html#faq)

[**Test yourself**Take the Data Center Safety quiz.](https://datacentertraining.us/quizzes/safety-quiz.html)

Key takeaways

- Electrical energy is the biggest serious hazard in a data center. The default is to establish an electrically safe work condition, not to work energized.
- OSHA sets the legal requirements (29 CFR 1910 Subpart S, 1910.147, 1910.146) and NFPA 70E explains how to meet the electrical ones in practice.
- Batteries, EPO buttons, and clean agent systems are specific to data centers and need site-specific training, not just general safety awareness.
- Only the employer designates a qualified person. Training supports that decision; it does not replace it.

## Data center hazards at a glance

Most serious injuries in critical facilities come from a short list of hazards. Here is where each one shows up, how it is controlled, and what governs it.

**Common data center hazards and their controls**

| Hazard | Where it shows up | Key controls | Governing standard | Course |
| --- | --- | --- | --- | --- |
| Shock and arc flash | Switchgear, UPS, PDUs, panels, busway | De-energize and verify, boundaries, arc-rated PPE, permits | OSHA 1910 Subpart S, NFPA 70E | [Arc Flash Safety](https://datacentertraining.us/courses/data-center-arc-flash-safety.html) |
| Hazardous energy during service | Breakers, CRAH fans, pumps, chillers | Written procedures, personal locks, verification | OSHA 1910.147 and 1910.333 | [Electrical Safety & Best Practices](https://datacentertraining.us/courses/electrical-safety-best-practices.html) |
| Battery hazards | UPS battery rooms and cabinets | Ventilation, eyewash, insulated tools, monitoring | NFPA 70E Article 320, NFPA 855 for lithium-ion | [UPS & Battery Safety](https://datacentertraining.us/courses/data-center-ups-battery-safety.html) |
| Accidental power-off | EPO stations at data hall exits | Covers, labeling, training | NFPA 70 Article 645, NFPA 75 | [EPO Procedures](https://datacentertraining.us/courses/data-center-epo-procedures.html) |
| Fire suppression discharge | Clean agent and inert gas protected rooms | Pre-discharge alarms, evacuation, controlled re-entry | NFPA 2001, NFPA 72 | [Fire Suppression Safety](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html) |
| Open floors and confined spaces | Raised floor plenums, vaults, tanks, tunnels | Barricades, space evaluation, entry permits | OSHA 1910.22, 1910.146 | [Raised Floor & Confined Space](https://datacentertraining.us/courses/data-center-raised-floor-confined-space.html) |
| Refrigerant release | CRAC units, chillers, mechanical rooms | Leak detection, ventilation, certified technicians | EPA Section 608, ASHRAE Standard 15 | [Cooling & Refrigerant Safety](https://datacentertraining.us/courses/data-center-cooling-refrigerant-safety.html) |
| Lifting and handling | Loading dock, rack installs | Server lifts, team lifts | OSHA General Duty Clause, NIOSH guidance | [Ergonomics & Manual Handling](https://datacentertraining.us/courses/server-room-ergonomics-manual-handling.html) |

## Electrical shock and arc flash

**Shock** happens when current passes through your body after contact with an energized part. **Arc flash** happens when current jumps through the air between conductors, releasing intense heat, light, pressure, and molten metal in a fraction of a second. A dropped tool, a failed insulator, or a breaker racked in under fault can start one, and large data center switchgear can produce severe incidents. That is why [arc flash](https://datacentertraining.us/learn/glossary.html#term-arc-flash) gets so much attention in this industry.

For training requirements, in-house operator programs, and how rules differ across major markets, see [data center electrical safety training](https://datacentertraining.us/training/data-center-electrical-safety-training.html) and [switchgear safety training](https://datacentertraining.us/training/switchgear-safety-training.html).

### The first rule: make it safe

NFPA 70E, the Standard for Electrical Safety in the Workplace, starts from one principle: put equipment in an **electrically safe work condition** before anyone works on it. Identify every source, open the disconnects, visually confirm the contacts are open, release stored energy, apply locks and tags, and test for absence of voltage with a rated meter checked on a known live source before and after. Until then, the equipment is energized.

### Approach boundaries

NFPA 70E defines distances around exposed energized parts that control who may get close:

- **Limited approach boundary** (shock): unqualified persons may not cross it unless a qualified person is advising and escorting them.
- **Restricted approach boundary** (shock): only qualified persons, using shock protection techniques and PPE, may cross it. For a typical 480 V system, the NFPA 70E table sets the restricted approach boundary at 1 ft and, for exposed fixed parts, the limited approach boundary at 3 ft 6 in.
- **Arc flash boundary**: the distance at which incident energy would fall to 1.2 cal/cm², the level associated with the onset of a second-degree burn. Inside it, arc-rated PPE is required while an arc flash hazard exists.

### Labels, PPE categories, and permits

Equipment labels from the arc flash risk assessment show the nominal voltage, the arc flash boundary, and either the incident energy at a working distance or the PPE category. If a label is missing or older than the last system change, stop and ask. NFPA 70E groups arc-rated clothing into **PPE categories 1 through 4**, with minimum arc ratings of 4, 8, 25, and 40 cal/cm².

When work inside the restricted approach boundary, or where an arc flash hazard exists, truly cannot be done de-energized, NFPA 70E requires an **energized electrical work permit** recording the justification, risk assessments, PPE, access control, job briefing, and management approval. Convenience is not a justification. Concurrently maintainable designs exist so maintenance can be done de-energized while the load runs on the other path.

Only qualified persons do energized work

OSHA and NFPA 70E limit work on or near exposed energized parts to qualified persons: people trained and able to demonstrate the skills and knowledge for that equipment and its hazards. The employer makes that designation, task by task. Everyone else needs awareness training. Our [Data Center Electrical Safety](https://datacentertraining.us/courses/data-center-electrical-safety.html) course is built around NFPA 70E for that audience.

## Lockout/tagout

Lockout/tagout ([LOTO](https://datacentertraining.us/learn/glossary.html#term-loto)) keeps equipment from being energized or started while someone works on it. OSHA 29 CFR 1910.147 covers servicing of machines and equipment such as CRAH fans, pumps, and chillers. Electrical work on conductors falls under the Subpart S lockout provisions (1910.333), and NFPA 70E aligns with both, so most sites write one energy control program for all energy types.

The program needs written, equipment-specific procedures, standardized locks and tags, training for authorized and affected employees, and a periodic inspection of each procedure at least annually. The basic sequence:

1. ### Prepare and notify

   Review the procedure, identify every energy source (including backfeeds and capacitors), and tell affected employees and the control room.
2. ### Shut down the equipment

   Use the normal stopping method, so a disconnect never has to break load it was not rated for.
3. ### Isolate every source

   Open breakers and disconnects, close and secure valves, and visually confirm isolation where the equipment allows it.
4. ### Apply locks and tags

   Each authorized worker applies a personal lock to every isolation point, or to a group lockbox. Your lock, your key, your body.
5. ### Release or restrain stored energy

   Discharge capacitors, bleed pressure, block moving parts, and apply grounds where voltage could return.
6. ### Verify isolation

   Attempt a normal start and test for absence of voltage (live-dead-live) before work begins. Afterward, inspect the area, account for everyone, remove locks, and notify affected employees before re-energizing.

## Battery hazards: VRLA and lithium-ion

UPS batteries are stored energy that cannot be switched off. Large strings commonly operate at several hundred volts DC, and DC arcs lack the current zero crossing that helps AC arcs extinguish. NFPA 70E Article 320 covers batteries and battery rooms.

**Valve-regulated lead-acid (VRLA)** batteries hold sulfuric acid electrolyte in glass mat or gel. They release hydrogen, especially when overcharged, so battery rooms need ventilation to keep hydrogen well below flammable levels. Damaged jars can leak electrolyte, and OSHA 1910.151(c) requires eyewash or drench facilities where corrosive exposure is possible. VRLA cells can also go into thermal runaway if overcharged or overheated.

**Lithium-ion** batteries are smaller and last longer, but a damaged or overcharged cell can enter **thermal runaway**: a self-heating reaction that vents flammable and toxic gases and can spread cell to cell. Off-gas detection gives early warning, and gas trapped in a closed room is an explosion hazard. NFPA 855 governs stationary energy storage installations. Response differs from an ordinary fire: evacuate, call the fire department, do not open the room to look, and expect re-ignition. See [Lithium-Ion Thermal Runaway & Emergency Response](https://datacentertraining.us/courses/lithium-ion-thermal-runaway-emergency-response.html).

Battery work basics

Remove jewelry, use insulated tools rated for the DC voltage, cover adjacent terminals, wear face and hand protection, and locate the eyewash station and spill kit before you start.

## Emergency power off (EPO) systems

An [EPO](https://datacentertraining.us/learn/glossary.html#term-epo) system disconnects power to IT equipment, and in many designs the room's HVAC, with one action from buttons at the data hall exits. Whether a room has one depends on the code path used, mainly NFPA 70 Article 645 and NFPA 75, and on the authority having jurisdiction.

For the full explanation of how EPO systems are wired, what NEC Article 645 requires, and how to prevent accidental activation, read [data center EPO explained](https://datacentertraining.us/learn/data-center-epo.html).

Responders get a fast way to de-energize the room. The catch: accidental EPO activation is a well-known cause of data center outages. Someone mistakes the button for a door release, a cart bumps it, or a visitor presses it out of curiosity. Good sites reduce the risk with:

- Hinged or lift covers, with an alarm when a cover is lifted.
- Clear labeling and distance from door release buttons and light switches.
- EPO awareness in every site orientation, including visitors and contractors.
- Written procedures for when to use it and how to recover, and testing only under a method of procedure.

Recovery is its own procedure: reset the system and restore power in a controlled sequence. The [EPO Procedures](https://datacentertraining.us/courses/data-center-epo-procedures.html) course covers both sides.

## Clean agent and inert gas fire suppression

Many data halls and electrical rooms are protected by gaseous systems governed by NFPA 2001. **Clean agents** such as HFC-227ea (sold as FM-200) and FK-5-1-12 (sold as Novec 1230 and others) mainly absorb heat. **Inert gas** systems such as IG-541 (Inergen), IG-55, and IG-100 lower oxygen below the level that supports combustion. Neither leaves residue. Many rooms also have pre-action sprinklers under NFPA 13, with detection governed by NFPA 72. What everyone in a protected room should know:

Our [data center fire suppression guide](https://datacentertraining.us/learn/data-center-fire-suppression.html) covers detection, clean agents, preaction sprinklers, and how to restore compliance after a discharge.

- **Pre-discharge alarm.** Detection usually needs two devices in alarm. Horns and strobes then start a time delay before discharge. That delay is your exit window.
- **Abort switch.** Many systems have a switch that holds discharge while pressed. Only trained people use it, and only after confirming there is no fire.
- **Evacuate.** Leave at the first alarm and close doors. A discharge is loud and violent, a real fire produces toxic smoke, and clean agents exposed to fire form decomposition products such as hydrogen fluoride.
- **Re-entry.** Do not go back in until the room has been ventilated and the fire department or an authorized person has cleared it.
- **Impairments.** Dust, smoke, or heat from work can trigger detection. Disabling a system requires an impairment procedure, notifications, and often a fire watch.

Room integrity matters too: unsealed penetrations and propped doors let agent escape before it has held for the design period. See [Fire Suppression System Safety](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html).

## Raised floor work and confined spaces

An open floor tile is a hole in the floor. Use a proper tile lifter, barricade every opening, never leave one unattended, and limit how many adjacent tiles come up at once, because removing tiles can weaken the floor grid. Check concentrated and rolling load ratings before moving heavy equipment across tiles. OSHA's walking-working surfaces rules (1910.22 and related sections) apply to floor openings.

Whether a space is a **confined space** under OSHA 1910.146 depends on three things: it is large enough to bodily enter, it has limited means of entry or exit, and it is not designed for continuous occupancy. Most shallow raised floor plenums are too small to enter. Deep plenums, cable vaults, utility tunnels, manholes, fuel tank vaults, sumps, and large ducts may qualify. It becomes a **permit-required** confined space if it has or could have a hazardous atmosphere (for example, from a gaseous suppression discharge or a refrigerant leak), engulfment, a configuration that could trap someone, or another serious hazard such as exposed electrical parts. The employer must evaluate the workplace, mark permit spaces, and either run a permit entry program or keep employees out.

## Refrigerant, lifting, noise, and heat

### Refrigerant hazards

Most refrigerants are heavier than air and can displace oxygen in low or enclosed spaces. Liquid refrigerant causes frostbite, systems run at high pressure, and many refrigerants form toxic products in a flame. ASHRAE Standard 15 sets requirements such as detection and ventilation in machinery rooms, and newer A2L (mildly flammable) refrigerants add ignition concerns. Opening a system requires EPA Section 608 certification from an EPA-approved certifying program.

### Ergonomics and manual handling

Servers, GPU nodes, and battery modules are heavy and often lifted at shoulder height. The revised NIOSH lifting equation starts from 51 lb (23 kg) for an ideal lift and lowers it for reach, height, twisting, and frequency, which is why server lifts and two-person lifts are standard. Extend rack stabilizer feet before sliding equipment out on rails, and load racks from the bottom up.

### Noise and heat

OSHA 1910.95 requires a hearing conservation program when exposures reach an 85 dBA eight-hour time-weighted average, and sets a permissible exposure limit of 90 dBA. Running generators, chiller plants, and some high-density halls call for a noise survey and hearing protection. Contained hot aisles can run well above 100 °F (38 °C): limit time there, drink water, take breaks in cooler space, and know the signs of heat illness. There is no single OSHA rule for hot aisle work, but employers are expected to address heat hazards, and some states have their own heat rules.

## Contractors, permits, and hot work

Much of the highest-risk work is done by contractors: testing firms, UPS and generator field engineers, and mechanical and construction crews. The site still coordinates that work. A strong contractor program includes:

- Prequalification of safety records, training, and insurance.
- Site orientation on EPO, suppression alarms, evacuation, and restricted areas.
- A method of procedure ([MOP](https://datacentertraining.us/learn/glossary.html#term-mop)) reviewed and approved before any work on critical systems.
- Permits for energized electrical work, confined space entry, hot work, work at heights, roof access, and fire protection impairments.
- A site representative with authority to stop the work.

**Hot work** (welding, cutting, brazing, grinding) needs a hot work permit under NFPA 51B and OSHA 1910.252, a fire watch during the work and for a set period afterward, and coordination with the fire alarm and suppression systems so the work does not trigger a discharge or an evacuation.

## Building a safety training program

OSHA requires training under several standards, including electrical safety-related work practices (1910.332), lockout/tagout (1910.147), confined spaces (1910.146), PPE (1910.132), hearing conservation (1910.95), and hazard communication (1910.1200) for chemicals such as battery electrolyte and diesel. NFPA 70E adds retraining at intervals not exceeding three years. A practical data center program layers three things:

1. **Awareness for everyone** who enters the white space.
2. **Role-based training** for technicians: NFPA 70E, LOTO, batteries, and their systems.
3. **Site-specific qualification**: supervisors observe each person on the actual equipment before the employer designates them qualified.

Keep training records, procedure sign-offs, and qualification decisions together; inspectors, insurers, and customer auditors ask for them. The [Training Plan Builder](https://datacentertraining.us/tools/training-plan-builder.html) helps map roles to courses.

**How well do you know data center safety?** Test yourself on arc flash, LOTO, batteries, and suppression.

[Take the Safety Quiz](https://datacentertraining.us/quizzes/safety-quiz.html)

## Courses that go deeper

These self-paced courses are standards-aligned and award a certificate of completion that documents your training.

### [Data Center Electrical Safety Training](https://datacentertraining.us/courses/data-center-electrical-safety.html)

Power & Electrical · Modular Specialization

Foundational electrical safety practices for anyone working around data center power systems.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-electrical-safety)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-electrical-safety)

### [Data Center Arc Flash Safety Training](https://datacentertraining.us/courses/data-center-arc-flash-safety.html)

Power & Electrical · Modular Specialization · NFPA 70E

NFPA 70E arc flash safety specific to data center switchgear and power distribution.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-arc-flash-safety)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-arc-flash-safety)

### [Electrical Safety & Best Practices](https://datacentertraining.us/courses/electrical-safety-best-practices.html)

Power & Electrical · Modular Specialization · NFPA 70E

NFPA 70E-aligned electrical safety fundamentals for facility staff.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=electrical-safety-best-practices)
- [Add to Cart](https://datacentertraining.us/cart.html?add=electrical-safety-best-practices)

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

### [Data Center Emergency Power Off (EPO) Procedures Training](https://datacentertraining.us/courses/data-center-epo-procedures.html)

Power & Electrical · Modular Specialization

Safe activation and reset procedures for data center Emergency Power Off systems.

1 hr

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-epo-procedures)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-epo-procedures)

### [Data Center Fire Suppression System Safety Training (Clean Agent Systems)](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html)

Security & Compliance · Modular Specialization · NFPA 2001

Clean agent fire suppression safety for occupied data hall environments.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-fire-suppression-safety)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-fire-suppression-safety)

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

### What is the arc flash boundary?

Under NFPA 70E, the arc flash boundary is the distance from an arc source at which the incident energy would equal 1.2 cal/cm2, the level associated with the onset of a second-degree burn on bare skin. Anyone inside that boundary while an arc flash hazard exists must wear arc-rated PPE. The boundary for a specific piece of equipment comes from an arc flash risk assessment and is shown on the equipment label.

### Does a data center safety course make me a qualified person?

No. Under OSHA and NFPA 70E, only your employer can designate you as a qualified person for specific equipment and tasks, after you have the training, skills, and demonstrated knowledge for that work. A course gives you knowledge and a certificate of completion that can support that decision, but it does not make the designation.

### Is it safe to be in a room when a clean agent system discharges?

Clean agent systems are designed for occupied spaces, but you should still leave as soon as the pre-discharge alarm sounds. A discharge is loud and turbulent, can blow ceiling tiles and debris around, reduces visibility, and a fire produces its own toxic smoke and decomposition products. Evacuate, close the doors, and do not re-enter until the space has been ventilated and cleared by the fire department or your site's authorized person.

### Can UPS batteries still shock you when the UPS is turned off?

Yes. A battery string stays energized no matter what the UPS is doing, and large UPS strings commonly operate at several hundred volts DC. Opening the battery breaker isolates the string from the UPS, but the terminals and inter-cell connections are still live. Battery work calls for its own risk assessment, insulated tools, and PPE.

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-power.html)

### How Data Center Power Works

The equipment behind the hazards, from switchgear to rack PDUs.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-standards.html)

### Standards & Regulations

OSHA, NFPA, ASHRAE, and TIA rules in one map.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-jobs.html#ehs-manager)

### EHS Manager

The role that runs safety programs at critical facilities.

See the role →

[Quiz](https://datacentertraining.us/quizzes/safety-quiz.html)

### Data Center Safety Quiz

Check what you learned with instant explanations.

Take the quiz →

This guide is general educational information, not engineering, legal, or compliance advice. Follow your employer's safety program, the equipment manufacturer's instructions, and the codes and regulations that apply at your site.

## Train Your Team on Data Center Safety

Our safety courses cover arc flash, electrical safety, batteries, EPO, fire suppression, and confined spaces, with a certificate of completion for every course.

- [See the Complete Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-safety.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
