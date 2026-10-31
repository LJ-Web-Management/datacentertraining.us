# Data Center Tier Levels Explained: Tier I to Tier IV

Knowledge Center · Design

"Tier III" is one of the most used and most misused phrases in the industry. Here is what each Tier actually requires, what it survives, how the Tiers relate to TIA-942, and how to tell a certified facility from a marketing claim.

13 min read Beginner to intermediate Updated October 2026

On this page

1. [What the Tier system is](https://datacentertraining.us/learn/data-center-tiers.html#what-tiers-are)
2. [The four Tiers at a glance](https://datacentertraining.us/learn/data-center-tiers.html#four-tiers)
3. [Maintainable vs fault tolerant](https://datacentertraining.us/learn/data-center-tiers.html#maintainability)
4. [Availability figures](https://datacentertraining.us/learn/data-center-tiers.html#availability)
5. [ANSI/TIA-942 Rated levels](https://datacentertraining.us/learn/data-center-tiers.html#tia-942)
6. [Uptime certifications](https://datacentertraining.us/learn/data-center-tiers.html#certification)
7. [Common misconceptions](https://datacentertraining.us/learn/data-center-tiers.html#misconceptions)
8. [How to choose a Tier](https://datacentertraining.us/learn/data-center-tiers.html#choosing)
9. [Redundancy recap](https://datacentertraining.us/learn/data-center-tiers.html#redundancy)
10. [Courses](https://datacentertraining.us/learn/data-center-tiers.html#courses)
11. [FAQ](https://datacentertraining.us/learn/data-center-tiers.html#faq)

[**Test yourself**Take the 10-question Tiers & Design quiz.](https://datacentertraining.us/quizzes/tiers-design-quiz.html)

Key takeaways

- Uptime Institute's Tier Classification System rates site infrastructure from Tier I (basic capacity) to Tier IV (fault tolerant), based on what the facility can survive.
- Tier III means any component or path can be taken out for planned work without affecting IT. Tier IV adds survival of any single unplanned failure without operator action.
- The availability percentages often attached to the Tiers are commonly cited industry figures, not part of Uptime's Tier Standard.
- Only Uptime Institute awards Tier Certification. "Tier III design" or "Tier III-ready" without it describes intent, not a verified result.
- Topology sets the ceiling; operations decide how close a site gets to it.

## What the Tier Classification System is

Uptime Institute created the Tier Classification System to give owners, designers, and operators a common language for data center infrastructure performance. It is defined in two documents: the **Tier Standard: Topology**, which sets infrastructure requirements for each Tier, and the **Tier Standard: Operational Sustainability**, which covers how a site is staffed, maintained, and managed.

The Tiers are outcome-based. Instead of prescribing specific equipment, they define what the infrastructure must be able to do: keep the IT load running through planned maintenance, through an unplanned failure, or neither. Engineers can meet those objectives with different designs. Three ideas shape how they are applied:

- **The weakest subsystem sets the Tier.** A building with a Tier IV electrical system and a Tier II cooling plant is a Tier II facility.
- **Tiers cover site infrastructure.** Power, cooling, and the systems that support them. They do not rate the network, the servers, or the applications.
- **Generators are the primary source.** For Tier purposes, Uptime treats on-site engine generators as the facility's primary power source and the utility as an economic alternative, so the site must be able to carry its load on its own generators.

## The four Tiers at a glance

Each Tier includes the requirements of the Tiers below it. Every step up adds equipment, space, cost, and operational complexity.

Tier I

Basic Capacity

- Dedicated UPS, cooling, and engine generator for the IT space.
- Single path, no redundant components.
- Survives: a utility outage, on its UPS and generator. Planned maintenance needs a shutdown, and any component failure can drop the load.
- Typical use: small sites and workloads that can tolerate downtime.

Tier II

Redundant Capacity Components

- Adds redundant capacity components: UPS modules, chillers, pumps, generators.
- Still a single distribution path.
- Survives: removal or failure of a capacity component. Work on the path itself needs a shutdown.
- Typical use: sites that want fewer interruptions at moderate cost.

Tier III

Concurrently Maintainable

- Redundant components plus independent distribution paths for power and cooling.
- IT equipment must be dual-corded, or fed through point-of-use transfer switches.
- Survives: planned removal of any component or path element without affecting IT. An unplanned failure can still.
- Typical use: many enterprise and colocation sites with business-critical loads.

Tier IV

Fault Tolerant

- Multiple independent, physically isolated systems, simultaneously active.
- Compartmentalization and continuous cooling.
- Survives: any single unplanned failure or event, with no operator action, plus planned maintenance.
- Typical use: sites where any interruption is extremely costly.

## Concurrent maintainability vs fault tolerance

The jump from Tier II to Tier III, and from Tier III to Tier IV, is where most confusion lives. The difference comes down to planned versus unplanned events.

### Concurrent maintainability (Tier III)

Concurrently maintainable means every capacity component and every element of the distribution path can be taken out of service on a planned basis without affecting the IT load. Example: a site has two UPS systems, each feeding one side of the dual-corded servers. To service UPS A, operators follow a written method of procedure, confirm the B side can carry the full load, and shut UPS A down. The servers keep running on B. The same must be true for a switchgear lineup, a chilled water valve, or a section of pipe: there must be a way to isolate it without dropping the load.

The catch is that during that maintenance window, the site is running on one path. If something on the B side fails while A is out, the load can drop. Tier III also allows one active path with an alternate path that is not normally carrying load, so recovering from a failure may require an operator to act.

### Fault tolerance (Tier IV)

Fault tolerant means the infrastructure can sustain any single unplanned failure or event, such as a breaker trip, a burst pipe, or a fire in one electrical room, without affecting the IT load and without anyone having to do anything. Example: a breaker on path A trips unexpectedly. Path B is already active and carrying load, so the servers ride through on their second power supplies while controls keep cooling running automatically. Because the systems are compartmentalized in separate rooms, one fire or flood cannot take out both paths.

Tier IV also requires **continuous cooling**, so IT equipment does not see a temperature excursion during a utility-to-generator transfer. One subtlety: while a Tier IV site has a path down for maintenance, it is still concurrently maintainable but temporarily not fault tolerant.

Two questions that separate the Tiers

Ask "What happens if I turn this off on purpose?" If the IT load is unaffected for every component and path, the site is concurrently maintainable. Then ask "What happens if this fails right now, unannounced?" If the load rides through every single failure with no operator action, the site is fault tolerant.

## Availability and downtime figures

You will often see the Tiers paired with availability percentages. These are **commonly cited industry figures, not part of Uptime Institute's Tier Standard**, which defines Tiers by topology, not by an uptime number. Treat them as rough illustrations of relative performance, not as a design target or a guarantee.

**Commonly cited availability figures (not part of the Tier Standard)**

| Tier | Commonly cited availability | Equivalent downtime per year |
| --- | --- | --- |
| Tier I | 99.671% | About 28.8 hours |
| Tier II | 99.741% | About 22.7 hours |
| Tier III | 99.982% | About 1.6 hours (about 95 minutes) |
| Tier IV | 99.995% | About 26.3 minutes |

The math is simple: downtime hours per year = (1 &minus; availability) × 8,760. For Tier III, (1 &minus; 0.99982) × 8,760 = 0.00018 × 8,760, or about 1.6 hours. Real-world availability depends on how the site is operated and maintained and how fast staff respond. A well-run Tier II site can outperform a poorly run Tier III site.

**Turn percentages into minutes.** Convert any availability target into allowed downtime per year, month, and week.

[Try the Uptime Calculator](https://datacentertraining.us/tools/uptime-calculator.html)

## ANSI/TIA-942 Rated-1 to Rated-4

ANSI/TIA-942, the Telecommunications Infrastructure Standard for Data Centers from the Telecommunications Industry Association, is the other framework you will hear about. It uses **Rated-1 through Rated-4**, wording chosen to avoid confusion with Uptime's Tiers.

**Uptime Tiers vs ANSI/TIA-942 Rated levels**

| Aspect | Uptime Institute Tiers | ANSI/TIA-942 |
| --- | --- | --- |
| Levels | Tier I to Tier IV | Rated-1 to Rated-4 |
| Approach | Performance-based objectives | More prescriptive, with detailed tables of criteria |
| Scope | Site infrastructure (power, cooling, support systems), plus a separate operations standard | Telecommunications cabling and spaces, plus architectural, electrical, mechanical, safety, and security criteria |
| Who assesses | Only Uptime Institute awards Tier Certification | Independent auditors and certification bodies assess conformity |

The levels map onto similar ideas: Rated-1 basic, Rated-2 redundant components, Rated-3 concurrently maintainable, Rated-4 fault tolerant. The criteria are not identical, so a Rated-3 facility is not automatically Tier III, and the reverse is also true. TIA-942 also defines the cabling spaces of a data center, such as the entrance room and main distribution area. Other frameworks exist, including BICSI 002 (availability Classes F0 to F4) and the European EN 50600 series (availability classes 1 to 4).

## Uptime Institute certifications

Only Uptime Institute can award Tier Certification, and its certifications mean different things:

**Uptime Institute certification types**

| Certification | What Uptime reviews | What it proves |
| --- | --- | --- |
| Tier Certification of Design Documents | Design drawings and specifications | The design, on paper, meets the Tier objective. |
| Tier Certification of Constructed Facility | The built site, through on-site inspection and live demonstrations | The building actually performs as the design claims. |
| Tier Certification of Operational Sustainability | Staffing, training, maintenance, planning, and management, rated Gold, Silver, or Bronze | The site is run in a way that protects its Tier performance over time. |

A design certification is a milestone, not the finish line. Plenty changes between drawings and a finished building, and the constructed facility certification is what verifies the result. Uptime publishes a list of certified facilities, so a claim can be checked. Separately, Uptime offers accreditations for individuals, such as Accredited Tier Designer. Our [Tier Infrastructure Fundamentals](https://datacentertraining.us/courses/tier-infrastructure-fundamentals.html) course teaches the concepts behind the Tiers and awards a certificate of completion, not an Uptime credential.

## Common misconceptions

### "Tier III-ready" means Tier III

Phrases like "Tier III-ready," "Tier III design," or "built to Tier III standards" describe intent. Without an Uptime certification of the constructed facility, nobody has independently verified that the building performs to the Tier. Ask which certification, if any, was awarded, and for which building.

### "Tier 3+" is a real level

There is no Tier 3+ or Tier 3.5 in Uptime's system. A facility is classified at the highest Tier it fully meets. A plus sign usually means "Tier III with some extra redundancy," which may be valuable, but it is not a Tier. Uptime writes its Tiers in Roman numerals.

### Higher is always better

Each step up costs more to build and operate, and a Tier IV design has more equipment to maintain and more complex switching. Many organizations protect critical applications by running them in two or more Tier III sites instead of one Tier IV site, and some cloud operators handle much of their resilience in software.

### A Tier rating guarantees uptime

Tiers describe topology: what the infrastructure is capable of. They do not guarantee that people will execute procedures correctly, and most outages trace back to people, procedures, and maintenance rather than missing redundancy. A concurrently maintainable site can still go dark if someone opens the wrong breaker during maintenance. That is why the Operational Sustainability standard exists, and why training, written procedures, and change control matter.

## How to choose a Tier

1. ### Quantify the cost of downtime

   What does an hour of outage cost in revenue, penalties, safety, and reputation? A payment processor, a hospital, and an internal test lab will give very different answers.
2. ### Look at the application architecture

   If workloads fail over to another site automatically, each site may need less infrastructure redundancy. If one site carries everything, the building has to be more resilient. Plan this alongside [disaster recovery and business continuity](https://datacentertraining.us/courses/disaster-recovery-business-continuity.html).
3. ### Decide what you must survive

   Planned maintenance without shutdowns (Tier III), or also unplanned failures without impact (Tier IV)? Equipment has to be maintained, and shutdowns are hard to schedule, so most business-critical sites need at least concurrent maintainability.
4. ### Weigh cost and growth

   Higher Tiers need more equipment, space, and capital. Model total cost of ownership, and use [capacity planning](https://datacentertraining.us/courses/capacity-planning-forecasting.html) to keep redundancy intact as load grows.
5. ### Verify, then keep verifying

   For colocation, ask for Uptime certificates, commissioning reports, maintenance records, and incident history. For your own build, plan commissioning through integrated systems testing. See the [Commissioning guide](https://datacentertraining.us/learn/data-center-commissioning.html).

## Redundancy notation recap

Tier discussions lean on redundancy notation, where N is the capacity the load needs. **N+1** adds one spare unit, **2N** provides two complete independent systems that can each carry the load, and **2N+1** adds a spare on top of that. (See the glossary for [N+1](https://datacentertraining.us/learn/glossary.html#term-n-plus-1) and [2N](https://datacentertraining.us/learn/glossary.html#term-2n).)

Notation and Tiers are related but not the same. Tier II is typically built with N+1 components on a single path. Tier III needs redundant components and an independent alternate path, which can be met with N+1 equipment. And 2N equipment does not automatically make a site Tier IV: fault tolerance also needs active paths, compartmentalization, continuous cooling, and controls that respond without operator action. For the full table, see [Redundancy: N, N+1, and 2N](https://datacentertraining.us/learn/data-center-power.html#redundancy) in the power guide.

**Can you tell Tier III from Tier IV?** Ten questions on Tiers, redundancy, and design, with instant answers.

[Take the Tiers & Design Quiz](https://datacentertraining.us/quizzes/tiers-design-quiz.html)

## Courses that go deeper

These self-paced courses cover Tier concepts, design, commissioning, and planning. Each awards a certificate of completion. [Infrastructure Commissioning & Startup](https://datacentertraining.us/courses/infrastructure-commissioning-startup.html) shows how design intent gets verified.

### [Tier Infrastructure Fundamentals](https://datacentertraining.us/courses/tier-infrastructure-fundamentals.html)

Design & Planning · Comprehensive Program · Uptime Institute Tier Framework

Understand and assess TIER I–IV infrastructure without the formal certification track.

8 hrs

$280.99

- [Enroll](https://datacentertraining.us/checkout.html?item=tier-infrastructure-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=tier-infrastructure-fundamentals)

### [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html)

Design & Planning · Comprehensive Program · ANSI/TIA-942

Design data center facilities that scale — from site selection to redundancy strategy.

8 hrs

$312.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-design-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-design-fundamentals)

### [Infrastructure Commissioning & Startup](https://datacentertraining.us/courses/infrastructure-commissioning-startup.html)

Design & Planning · Comprehensive Program · Commissioning Test Protocols

Lead new facility launches and major upgrades with a proven commissioning framework.

8 hrs

$267.99

- [Enroll](https://datacentertraining.us/checkout.html?item=infrastructure-commissioning-startup)
- [Add to Cart](https://datacentertraining.us/cart.html?add=infrastructure-commissioning-startup)

### [Capacity Planning & Forecasting](https://datacentertraining.us/courses/capacity-planning-forecasting.html)

Design & Planning · Modular Specialization

Build a 3–5 year capacity plan before you run out of power, cooling, or space.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=capacity-planning-forecasting)
- [Add to Cart](https://datacentertraining.us/cart.html?add=capacity-planning-forecasting)

### [Disaster Recovery & Business Continuity](https://datacentertraining.us/courses/disaster-recovery-business-continuity.html)

Operations · Comprehensive Program · RTO/RPO Frameworks

Design resilient infrastructure and DR plans that survive real failures — not just tabletop exercises.

8 hrs

$307.99

- [Enroll](https://datacentertraining.us/checkout.html?item=disaster-recovery-business-continuity)
- [Add to Cart](https://datacentertraining.us/cart.html?add=disaster-recovery-business-continuity)

Save 42% with the bundle

Design, Planning & Commissioning Bundle

4 courses · 28 hours · **$557.99** per seat, instead of ~~$961.96~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-design-planning)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### What is the difference between Tier III and Tier IV?

Tier III is concurrently maintainable: any component or distribution path can be taken out of service for planned work without affecting the IT load. Tier IV is fault tolerant: it also survives any single unplanned failure, such as a tripped breaker or a fire in one electrical room, without affecting the IT load and without operator action. Tier IV requires simultaneously active, physically isolated systems and continuous cooling.

### Is Tier IV always better than Tier III?

Not necessarily. Tier IV costs more to build and operate and has more equipment to maintain. Many organizations get better overall resilience by running critical applications across two or more Tier III sites. The right Tier depends on the cost of downtime, how applications fail over, and the budget.

### What does Tier III certified mean?

It means Uptime Institute has awarded the facility a Tier III certification. Check which one: a design documents certification covers the drawings, a constructed facility certification verifies the built site through on-site testing, and an operational sustainability certification reviews how the site is run. Claims such as Tier III design or Tier III-ready without an Uptime award describe design intent, not certification.

### What is the difference between Uptime Tiers and TIA-942 ratings?

Uptime Institute's Tier Classification System uses Tier I to Tier IV, is performance-based, focuses on site infrastructure, and is certified only by Uptime. ANSI/TIA-942 is a standard from the Telecommunications Industry Association that uses Rated-1 to Rated-4, covers telecommunications cabling plus architectural, electrical, mechanical, and security criteria, and is assessed by independent auditors. The levels address similar ideas, but the criteria are not identical.

### How much downtime does a Tier III data center have per year?

The commonly cited figure is 99.982 percent availability, or about 1.6 hours of downtime per year. That number is an industry rule of thumb, not part of Uptime Institute's Tier Standard. Actual downtime depends heavily on how well the site is operated and maintained.

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-power.html)

### How Data Center Power Works

UPS, generators, A/B feeds, and the redundancy behind every Tier.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-commissioning.html)

### Data Center Commissioning

How Level 1 to Level 5 testing proves a design works.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-jobs.html#design-engineer)

### Data Center Design Engineer

What the role involves and the skills it takes.

See the role →

[Guide](https://datacentertraining.us/learn/what-is-a-data-center.html)

### Data Center 101

New to the industry? Start with how a data center works.

Read the guide →

This guide is general educational information, not engineering, legal, or compliance advice. Tier Certification is awarded only by Uptime Institute; consult Uptime Institute and the current standards for official requirements.

## Design and Verify Resilient Facilities

Our Design, Planning & Commissioning courses cover Tier concepts, design fundamentals, commissioning, and capacity planning.

- [See the Design Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-tiers.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
