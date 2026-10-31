# Data Center EPO: What Emergency Power Off Is and How It Works

Knowledge Center · Power

An emergency power off button can cut power to an entire IT room in under a second. That makes it a life safety device and one of the most common causes of self-inflicted outages. Here is what EPO means, when the electrical code requires one, how the system is wired, and how good sites keep it from being pressed by mistake.

10 min read All levels Updated October 2026

On this page

1. [What EPO means](https://datacentertraining.us/learn/data-center-epo.html#what)
2. [What the code requires](https://datacentertraining.us/learn/data-center-epo.html#code)
3. [How an EPO system works](https://datacentertraining.us/learn/data-center-epo.html#how)
4. [Preventing accidental EPO](https://datacentertraining.us/learn/data-center-epo.html#accidental)
5. [Testing and maintenance](https://datacentertraining.us/learn/data-center-epo.html#testing)
6. [Emergency procedures and training](https://datacentertraining.us/learn/data-center-epo.html#procedures)
7. [EPO training](https://datacentertraining.us/learn/data-center-epo.html#courses)
8. [FAQ](https://datacentertraining.us/learn/data-center-epo.html#faq)
9. [Sources](https://datacentertraining.us/learn/data-center-epo.html#sources)

[**Test yourself**Take the Safety quiz.](https://datacentertraining.us/quizzes/safety-quiz.html)

**Short answer:** EPO stands for emergency power off. In a data center, an EPO system is a set of clearly marked switches, usually at the main exit doors of an IT room, that disconnect power to the IT equipment and shut down the dedicated HVAC in that room so firefighters and staff are not exposed to energized equipment. The NEC requires one only when a room is designed under Article 645; many modern facilities follow the general code chapters instead and do not install a room-wide EPO.

Key takeaways

- EPO means emergency power off: a remote disconnect that de-energizes IT equipment and dedicated HVAC in an IT equipment room.
- NEC Article 645 (Information Technology Equipment) is where the EPO requirement comes from, and Article 645 is optional: a room only has to meet it if the designer chose to apply it.
- EPO buttons are a leading cause of human-error outages, so they need guards, labels, alarms, and training.
- UPS systems have their own EPO or REPO input. Know which button drops which load before you need it.
- Testing an EPO is a planned, high-risk event that needs a method of procedure, not a quick press during a walkthrough.

## What does EPO mean in electrical terms?

EPO stands for **emergency power off**. It is a control circuit, not a disconnect switch you open by hand: pressing the button signals shunt-trip breakers, contactors, or UPS controls to open, which removes power from the equipment downstream. Some documents use EPO for the whole system and REPO (remote emergency power off) for a button mounted away from the equipment it controls.

You will see EPO in three places in and around a data center:

- **The IT room EPO**, usually red buttons at the principal exit doors of a computer room or data hall, which de-energize the IT equipment and the HVAC that serves only that room.
- **The UPS EPO or REPO input**, which shuts down a UPS module and its output. On many systems this drops the critical load rather than transferring it to bypass.
- **Equipment-level emergency stops**, such as the stop on a generator, a battery cabinet, or a piece of construction equipment. On construction sites, EPO and E-stop usually refer to these machine-level controls.

## Does a data center need an EPO? What the code says

An EPO is required by the National Electrical Code only when the room is built and wired under NEC Article 645, Information Technology Equipment. Article 645 is optional: it gives an IT room some wiring allowances, such as relaxed rules for cables under a raised floor, in exchange for a set of conditions, and one of those conditions is the disconnecting means in 645.10. If the room is designed under the general rules of NEC Chapters 1 to 4 instead, the room-wide EPO requirement does not apply.

Where Article 645 is applied, the disconnecting means must remove power to the electronic equipment in the room and to the HVAC dedicated to it, and cause fire and smoke dampers to close. The controls must be grouped, identified, readily accessible at the principal exit doors, and protected from accidental operation. The code also recognizes an alternative for critical operations data systems, where an approved arrangement such as zoned disconnects, continuous supervision by qualified staff, and a fire alarm and detection approach can stand in for a single room-wide shutdown. The exact wording changes between editions, so check the edition your jurisdiction has adopted.

NFPA 75, Standard for the Fire Protection of Information Technology Equipment, works alongside Article 645 and addresses when IT and HVAC power should be disconnected during a fire. Your authority having jurisdiction (AHJ), usually the local building or fire official, decides how these rules apply to your building. That is why two facilities run by the same company can have very different EPO arrangements.

**EPO in a data center: common arrangements**

| Arrangement | What happens when pressed | Where you find it |
| --- | --- | --- |
| Article 645 room EPO | IT power and dedicated HVAC in that room shut off; dampers close | Enterprise computer rooms, older data centers, some government sites |
| Zoned EPO (critical operations data system) | Only the affected zone is de-energized, under an approved plan | Larger facilities that apply Article 645 but cannot accept a total shutdown |
| No room-wide EPO (general code rules) | No single button; disconnects follow the normal code rules for each circuit | Many colocation and hyperscale facilities |
| UPS EPO / REPO input | UPS output shuts down, often without transfer to bypass | Every site with a UPS, whatever the room design |

## How a data center EPO system works

A typical EPO system is a low-voltage control loop. Each button is wired into the loop, and when one is pressed the loop signals the equipment to shut down. The main parts are:

- **Pushbuttons**, usually red mushroom-head or flush buttons in a labeled station, often with a hinged or lift cover.
- **An EPO control panel or relay panel** that monitors the loop, provides contacts to each piece of equipment, and in better designs reports status and trouble to the BMS or fire alarm system.
- **Shunt-trip breakers and contactors** on the PDUs, panelboards, and HVAC units that open when they receive the signal.
- **Interfaces** to the UPS EPO input, the fire alarm panel, and dampers.

Two design details decide how an EPO fails. A *normally closed* loop opens on a broken wire, so a cut cable can cause a shutdown; a *normally open* loop needs the circuit to close, so a broken wire can leave a button that does nothing. Designers choose one deliberately and add supervision so the BMS can tell a healthy loop from a damaged one. Ask your site which type you have.

Once tripped, power usually stays off until someone resets the EPO panel and re-closes the breakers or restarts the UPS. Recovery is a controlled restart, not a flip of a switch, which is why an accidental EPO costs hours, not seconds.

## How to prevent accidental EPO activation

Accidental EPO presses are a well-known cause of data center outages: a visitor mistakes the button for a door release, a cart bumps an unguarded station, or a technician tests the wrong circuit. Sites that have not had one usually have these controls in place:

- **Covers that alarm when lifted**, so lifting the cover sounds a local horn before anyone can press the button.
- **Clear separation from door releases**. Do not mount an EPO next to a request-to-exit button or a fire alarm pull station that looks similar.
- **Plain-language labels** that say what the button shuts off, for example "Shuts down ALL IT power in Data Hall 2".
- **Bollards or guards** where carts and pallet jacks pass.
- **Visitor and contractor briefings** that point out the EPO stations during the first walk-in.
- **Engineering review** of whether the EPO scope is larger than it needs to be, with the AHJ involved before any change.

## Testing and maintaining an EPO system

An EPO that has never been tested may not work, and an EPO tested carelessly will take the site down. Treat testing as high-risk work:

1. ### Write a method of procedure

   List each button, the expected result, how outputs are isolated or bypassed during the test, and the rollback steps.
2. ### Test the loop, not the load

   Where the design allows, confirm that each button changes the state of the EPO panel while the outputs to live equipment are blocked under lockout or test mode.
3. ### Prove the outputs during a planned window

   Full functional testing of shunt trips and UPS inputs usually happens at commissioning or during a planned shutdown.
4. ### Record and restore

   Document the results, return every bypass to normal, and confirm on the BMS that the loop reports healthy.

Commissioning is where EPO behavior is proven first. See [data center commissioning levels 1 to 5](https://datacentertraining.us/learn/data-center-commissioning.html) for where it fits in integrated systems testing.

## EPO in data center emergency procedures

Every operator should know when to press the EPO and when not to. Most sites reserve it for a person in contact with energized equipment who cannot be freed safely another way, a fire in the IT space when the emergency plan calls for de-energizing, or a direction from the fire department. A smoke alarm or a clean agent pre-discharge alarm is usually a signal to evacuate and follow the emergency action plan, not to press the EPO. Your site's emergency operating procedures (EOPs) make that call, and drills should practice it.

For the wider safety picture, read the [data center safety guide](https://datacentertraining.us/learn/data-center-safety.html), which covers arc flash, lockout/tagout, batteries, and clean agent systems.

**Could you find the EPO in your data hall blindfolded?** Ten questions on data center safety.

[Take the Safety Quiz](https://datacentertraining.us/quizzes/safety-quiz.html)

## EPO training for data center teams

Our EPO course covers activation criteria, emergency shutdown sequences, testing, and recovery, and pairs with electrical safety and arc flash training for anyone who works near energized equipment.

### [Data Center Emergency Power Off (EPO) Procedures Training](https://datacentertraining.us/courses/data-center-epo-procedures.html)

Power & Electrical · Modular Specialization

Safe activation and reset procedures for data center Emergency Power Off systems.

1 hr

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-epo-procedures)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-epo-procedures)

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

### [Incident Response & Troubleshooting](https://datacentertraining.us/courses/incident-response-troubleshooting.html)

Operations · Modular Specialization

Systematic troubleshooting and root-cause analysis to cut MTTR.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=incident-response-troubleshooting)
- [Add to Cart](https://datacentertraining.us/cart.html?add=incident-response-troubleshooting)

## Frequently asked questions

### What does EPO stand for in a data center?

EPO stands for emergency power off. It is a system of remote switches, usually at the exit doors of an IT room, that disconnects power to the IT equipment and the dedicated HVAC in that room in an emergency.

### Is an EPO required in every data center?

No. The NEC requires an EPO disconnecting means only when the IT room is designed under Article 645, which is optional. Rooms wired under the general rules of NEC Chapters 1 to 4 do not need a room-wide EPO, although the local authority having jurisdiction makes the final call and UPS systems still have their own EPO inputs.

### What is the difference between EPO and REPO?

EPO is the general term for an emergency power off function. REPO, remote emergency power off, usually means a button mounted away from the equipment it controls, such as a remote station wired to a UPS EPO input.

### What happens when someone presses the EPO button?

The EPO control loop signals shunt-trip breakers, contactors, or the UPS to open, and power to the connected IT equipment and room HVAC shuts off within moments. Power stays off until the system is reset and restarted under a controlled procedure.

### How do you stop people from pressing the EPO by accident?

Use alarmed lift covers, mount EPO stations away from door release buttons and pull stations, label exactly what each button shuts off, add guards where carts pass, and point out the EPO stations to every visitor and contractor on their first entry.

### Who should be trained on the EPO?

Everyone who works unescorted in the IT space should know where the EPO stations are, what they shut off, and when the site's procedures say to use them. Operators and electrical staff also need training on reset, recovery, and testing.

## Sources

- NFPA, [NFPA 70, National Electrical Code](https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70) (Article 645, Information Technology Equipment).
- NFPA, [NFPA 75, Standard for the Fire Protection of Information Technology Equipment](https://www.nfpa.org/codes-and-standards/nfpa-75-standard-development/75).
- OSHA, [29 CFR 1910.38, Emergency action plans](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.38).

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-power.html)

### How Data Center Power Works

Switchgear, UPS, PDUs, and where the EPO cuts in.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-safety.html)

### Data Center Safety Guide

Arc flash, LOTO, batteries, EPO, and clean agents.

Read the guide →

[Training](https://datacentertraining.us/training/data-center-electrical-safety-training.html)

### Data Center Electrical Safety Training

NFPA 70E, switching, and qualified-person training.

See the training →

[Course](https://datacentertraining.us/courses/data-center-epo-procedures.html)

### Data Center EPO Procedures

Activation, shutdown sequences, testing, and recovery.

View the course →

This guide is general educational information, not engineering or code compliance advice. Your authority having jurisdiction and the edition of the NEC and NFPA 75 it has adopted decide what your facility needs.

## Train Your Team on EPO and Emergency Procedures

Online EPO, electrical safety, and incident response courses for data center operators and technicians, with team seats and progress tracking.

- [See the EPO Course](https://datacentertraining.us/courses/data-center-epo-procedures.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-epo.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
