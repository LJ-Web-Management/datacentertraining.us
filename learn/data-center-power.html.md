# How Data Center Power Works: From the Grid to the Rack

Knowledge Center · Power

Every server in a data center depends on a chain of equipment that turns utility power into clean, uninterrupted power at the rack. Here is how each link works, how facilities keep it running through failures, and who maintains it.

14 min read Beginner to intermediate Updated October 2026

On this page

1. [The power path](https://datacentertraining.us/learn/data-center-power.html#power-path)
2. [Utility service and switchgear](https://datacentertraining.us/learn/data-center-power.html#utility)
3. [Generators and transfer switches](https://datacentertraining.us/learn/data-center-power.html#generators)
4. [UPS systems and batteries](https://datacentertraining.us/learn/data-center-power.html#ups)
5. [Distribution to the rack](https://datacentertraining.us/learn/data-center-power.html#distribution)
6. [Redundancy: N, N+1, 2N](https://datacentertraining.us/learn/data-center-power.html#redundancy)
7. [Maintenance and testing](https://datacentertraining.us/learn/data-center-power.html#testing)
8. [Electrical safety](https://datacentertraining.us/learn/data-center-power.html#safety)
9. [Courses](https://datacentertraining.us/learn/data-center-power.html#courses)
10. [FAQ](https://datacentertraining.us/learn/data-center-power.html#faq)

[**Test yourself**Take the 10-question Power & Electrical quiz.](https://datacentertraining.us/quizzes/power-electrical-quiz.html)

Key takeaways

- Power reaches a server through a chain: utility service, switchgear, transformers, transfer switches, UPS, and power distribution units.
- The UPS and its batteries carry the load for the seconds to minutes it takes standby generators to start. Generators carry it for hours or days.
- Redundancy (N+1, 2N) lets a facility lose or service a component without dropping the IT load, but only if loading limits are respected.
- Most outages trace back to people and procedures, not equipment, which is why switching procedures, testing, and training matter as much as hardware.

## The power path, from grid to server

A data center's electrical system has one job: deliver power to the IT equipment without interruption, even when the utility fails or a component is out for maintenance. To do that, power passes through several stages, and each stage either conditions the power, protects it, or provides a backup source.

1. **Utility service**Medium-voltage feed from the electric utility, often from two substations.
2. **Switchgear**Breakers and relays that protect and switch large blocks of power.
3. **Transformers**Step medium voltage down to the low voltage the building uses.
4. **Transfer switch**Moves the load between utility and generator power.
5. **Generators**Diesel or gas engines that carry the site through long outages.
6. **UPS and batteries**Condition power and bridge the gap until generators take over.
7. **PDUs and panels**Power distribution units and remote power panels feed the rows.
8. **Rack PDUs and servers**Power strips in each rack feed dual-corded IT equipment.

Real facilities vary. Some use busway overhead instead of floor-standing PDUs, some parallel many generators on one bus, and hyperscale campuses build their own substations. The logic stays the same: every stage has a backup, and every backup gets tested.

## Utility service and switchgear

Large data centers usually take power at medium voltage, commonly somewhere in the range of 4 kV to 35 kV in North America, because moving megawatts at low voltage would take enormous conductors. Where the site can get it, the utility provides two feeds from different substations so one upstream failure does not take out both.

**Medium-voltage switchgear** receives that power. It contains circuit breakers, protective relays that detect faults and trip breakers in milliseconds, and metering. **Step-down transformers** then convert medium voltage to the low voltage used inside the building, typically 480/277 V three-phase in the United States. Low-voltage switchgear and switchboards split that power into the feeders that serve UPS systems, mechanical equipment, and building loads.

Switchgear is where some of the largest arc flash hazards in a facility live, which is why switching it is a planned, procedure-driven task done by qualified people. See the [Data Center Safety Guide](https://datacentertraining.us/learn/data-center-safety.html) for how that work is controlled.

## Generators and transfer switches

When utility power fails, standby generators take over. Most data center generators are diesel engines driving alternators, sized in the megawatt range, with enough fuel stored on site to run for a day or more before refueling. Natural gas and other fuels are used too, and some campuses are adding battery energy storage and on-site generation.

The handoff is controlled by an **automatic transfer switch (ATS)** or by **paralleling switchgear** that synchronizes several generators onto one bus. The sequence during an outage looks like this:

1. Utility power drops or goes out of tolerance. The UPS instantly carries the IT load from its batteries.
2. The transfer controls signal the generators to start. Engines crank, reach speed, and stabilize voltage and frequency, typically within seconds.
3. The transfer switch moves the load to generator power. The UPS returns to normal operation and begins recharging its batteries.
4. When the utility is stable again, the system retransfers to utility power after a set delay, and the generators cool down and stop.

Most mechanical cooling equipment is not on the UPS, so chillers and pumps can stop briefly until the generators pick them up, while some designs put critical fans and pumps on a separate mechanical UPS. How fast cooling recovers after a transfer is a key part of design and commissioning, because high-density rooms heat up quickly. The [cooling guide](https://datacentertraining.us/learn/data-center-cooling.html) explains why.

Why generators need regular exercise

NFPA 110, the standard for emergency and standby power systems, sets monthly exercise and periodic load-testing requirements for generators. Engines that only run unloaded can build up unburned fuel in the exhaust ("wet stacking"), and fuel that sits for long periods can degrade. Facilities that test under real load find problems before an outage does.

## UPS systems and batteries

The **uninterruptible power supply (UPS)** sits between the building's electrical system and the IT load. It does two things: it cleans up the power (filtering sags, surges, and noise), and it carries the load from stored energy during the seconds or minutes before generators take over.

**The three UPS topologies**

| Topology | How it works | Where you see it |
| --- | --- | --- |
| Double conversion (online) | Converts incoming AC to DC and back to clean AC continuously. The load always runs from the inverter, so there is no transfer time when the utility fails. | The standard choice for data center critical loads. |
| Line-interactive | Passes utility power through and regulates voltage with a transformer. Switches to the inverter when the utility fails. | Smaller rooms, network closets, edge sites. |
| Standby (offline) | Load runs on utility power until it fails, then switches to battery and inverter. | Desktop and small office equipment. |

Many large UPS systems also offer an "eco" or high-efficiency mode that runs the load on bypass and switches to the inverter only when needed, trading some protection for efficiency. Whether to use it is an engineering and risk decision for each site.

### Bypass: the most misunderstood part of a UPS

A UPS has two kinds of bypass. The **static bypass** is an automatic electronic switch that moves the load straight to the bypass source if the UPS has an internal fault or overload. The **maintenance bypass** is a set of manually operated breakers that route power around the UPS entirely so it can be serviced. While the load is on either bypass, it is not protected by the batteries. Operating the maintenance bypass in the wrong sequence is a classic cause of outages, which is why sites use written, step-by-step switching procedures.

### Batteries and stored energy

UPS batteries are usually sized to carry full load for a few minutes, commonly in the 5 to 15 minute range, which is plenty of time for generators to start. Valve-regulated lead-acid (VRLA) batteries were the default for decades. Lithium-ion batteries are now common because they are smaller, lighter, and last longer, but they bring a different fire risk profile that has to be managed. Some sites use flywheels, which store energy for seconds rather than minutes.

Stored energy is always live

Battery strings stay energized when the UPS is switched off, and DC arc flash and shock hazards remain. Lithium-ion systems add the risk of thermal runaway. Our [UPS and Battery System Safety](https://datacentertraining.us/courses/data-center-ups-battery-safety.html) and [Lithium-Ion Thermal Runaway](https://datacentertraining.us/courses/lithium-ion-thermal-runaway-emergency-response.html) courses cover both.

## Distribution to the rack

After the UPS, power is distributed to the data hall. A **power distribution unit (PDU)** is a floor-standing cabinet with a transformer and panelboards that steps 480 V down to the 208/120 V or 415/240 V used by IT equipment. **Remote power panels (RPPs)** extend those circuits closer to the racks, and **overhead busway** is increasingly used instead of under-floor cables because it is easier to reconfigure.

Inside each rack, **rack PDUs** (intelligent power strips) feed the servers and often meter power per outlet. Most enterprise IT equipment has two power supplies, connected to separate **A and B feeds** that trace back to separate UPS systems. Equipment with only one power supply can be protected with a **static transfer switch (STS)** or a rack-mounted automatic transfer switch that picks between the two sources.

The 50 percent rule on A/B feeds

If both feeds share a dual-corded load, each one normally carries about half. When one feed is lost, the other suddenly carries all of it. So in a 2N design, each feed must be kept below roughly half of its rated capacity, with margin. Capacity planning and monitoring are how sites keep that promise. See [Capacity Planning & Forecasting](https://datacentertraining.us/courses/capacity-planning-forecasting.html).

## Redundancy: N, N+1, and 2N

Redundancy notation describes how much spare capacity and how many independent paths a system has. "N" is the amount of equipment needed to carry the load.

| Design | What it means | What it survives |
| --- | --- | --- |
| N | Exactly enough capacity for the load, with no spare. | Nothing. Any failure or maintenance affects the load. |
| N+1 | One extra unit beyond what the load needs, such as five UPS modules where four would do. | The failure or maintenance of any single unit, but the distribution path is still shared. |
| 2N | Two complete, independent systems (A and B), each able to carry the full load. | Failure or maintenance of anything in one path, from switchgear to rack. |
| 2N+1 / distributed redundant | Variations that add spare units within each path, or spread the load across three or more systems so any one can fail. | Multiple concurrent failures, depending on the design. |

Redundancy is the foundation of the Uptime Institute Tier levels. Read [Data Center Tier Levels Explained](https://datacentertraining.us/learn/data-center-tiers.html) to see how concurrent maintainability and fault tolerance build on these ideas, or try the [Uptime & Downtime Calculator](https://datacentertraining.us/tools/uptime-calculator.html).

## Maintenance and testing

Electrical equipment that is never tested will fail when it is finally needed. A mature power maintenance program typically includes:

- **Infrared (thermographic) scans** of switchgear, panels, and connections to find loose or overheating joints.
- **Battery monitoring and testing**, such as impedance or conductance readings and periodic discharge tests, to catch weak cells before they fail.
- **Generator exercise and load-bank testing** to prove engines can carry real load, plus fuel quality checks.
- **UPS preventive maintenance**, including capacitor and fan replacement on manufacturer schedules.
- **Breaker testing and protective relay checks**, so breakers trip when, and only when, they should.
- **Integrated systems tests** that pull the utility on purpose and watch the whole chain respond.

Each of these is done under a written method of procedure (MOP), with change control and a rollback plan. The [Operations & Maintenance guide](https://datacentertraining.us/learn/data-center-operations.html) explains how that process works.

## Electrical safety

Data center power systems carry enough energy to kill or seriously injure, and many hazards remain after a breaker is opened. In the United States, OSHA's electrical standards (29 CFR 1910 Subpart S) and lockout/tagout rule (1910.147) set the legal requirements, and NFPA 70E describes how to meet them in practice: establish an electrically safe work condition whenever possible, assess shock and arc flash risk, use the right PPE, and limit energized work to qualified persons with a justified, permitted reason.

Even technicians who never open a panel need awareness training, because they work near energized equipment every day. Our [Data Center Safety Guide](https://datacentertraining.us/learn/data-center-safety.html) covers arc flash boundaries, LOTO, batteries, and EPO systems in more depth.

**How much do you know about data center power?** Ten questions, instant answers.

[Take the Power Quiz](https://datacentertraining.us/quizzes/power-electrical-quiz.html)

## Courses that go deeper

These self-paced courses turn the concepts above into job skills. Each awards a certificate of completion.

### [Power Systems & Electrical Fundamentals](https://datacentertraining.us/courses/power-systems-electrical-fundamentals.html)

Power & Electrical · Comprehensive Program · NFPA 70E

Master data center electrical infrastructure — from utility interconnection to UPS and PDU architecture.

8 hrs

$303.99

- [Enroll](https://datacentertraining.us/checkout.html?item=power-systems-electrical-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=power-systems-electrical-fundamentals)

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

### [Generator Fundamentals](https://datacentertraining.us/courses/generator-fundamentals.html)

Power & Electrical · Modular Specialization

Foundational generator theory to complement hands-on operations and load-bank training.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=generator-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=generator-fundamentals)

### [Emergency/Standby Power Systems Fundamentals](https://datacentertraining.us/courses/emergency-standby-power-systems-fundamentals.html)

Power & Electrical · Modular Specialization

Understand the standby power systems that carry a facility through a utility outage.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=emergency-standby-power-systems-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=emergency-standby-power-systems-fundamentals)

### [Power Distribution Systems Fundamentals](https://datacentertraining.us/courses/power-distribution-systems-fundamentals.html)

Power & Electrical · Modular Specialization

Core power distribution theory behind PDUs, panels, and branch circuits.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=power-distribution-systems-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=power-distribution-systems-fundamentals)

### [Data Center Arc Flash Safety Training](https://datacentertraining.us/courses/data-center-arc-flash-safety.html)

Power & Electrical · Modular Specialization · NFPA 70E

NFPA 70E arc flash safety specific to data center switchgear and power distribution.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-arc-flash-safety)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-arc-flash-safety)

Save 38% with the bundle

Power & Electrical Systems Bundle

14 courses · 47 hours · **$986.99** per seat, instead of ~~$1,603.86~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-power-electrical)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### How long do data center UPS batteries last during an outage?

UPS batteries are usually sized to carry the load for a few minutes, often somewhere between about 5 and 15 minutes at full load, which is enough time for the standby generators to start and take over. They are a bridge to the generators, not a replacement for them. The exact runtime depends on the battery design, its age, and how much load is on the UPS.

### What is the difference between N+1 and 2N power?

N is the capacity the load needs. N+1 adds one spare unit, such as one extra UPS module or generator, so a single unit can fail or be serviced. 2N duplicates the entire system into two independent paths (A and B), so either path can carry the full load by itself. 2N costs more but survives failures and maintenance anywhere in one path.

### Why do servers have two power cords?

Dual-corded servers connect one power supply to the A feed and the other to the B feed. If one feed is lost or shut down for maintenance, the server keeps running on the other. This only works if each feed is loaded so it can carry the whole load on its own, which is why A/B feeds are usually kept below about half of their rated capacity.

### Do I need to be an electrician to work on data center power systems?

Work on or near exposed energized parts is limited to people the employer has designated as qualified under OSHA and NFPA 70E, which usually means licensed or trained electricians and power technicians. Other technicians still need electrical safety awareness training so they understand the hazards, the approach boundaries, and what they must not touch.

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-cooling.html)

### How Data Center Cooling Works

Every watt of power becomes heat. See how it gets removed.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-tiers.html)

### Tier Levels Explained

How redundancy turns into Tier I through Tier IV.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-jobs.html#electrician)

### Data Center Electrician

What the job involves and how to prepare for it.

See the role →

[Reference](https://datacentertraining.us/learn/glossary.html)

### Data Center Glossary

ATS, STS, PDU, RPP, and every other acronym in one place.

Open the glossary →

This guide is general educational information, not engineering, legal, or compliance advice. Follow your site's procedures, the equipment manufacturer's instructions, and the codes adopted in your jurisdiction.

## Train Your Team on Data Center Power

Our Power & Electrical courses cover the full electrical chain, from fundamentals to UPS, generators, batteries, and arc flash safety.

- [See the Power Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-power.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
