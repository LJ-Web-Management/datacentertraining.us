# Data Center Commissioning Explained: Levels 1 to 5

Knowledge Center · Commissioning

A new data center has to prove it can survive failures before it carries a single server. Commissioning is how that proof is built, one level at a time, from the factory floor to a full simulated utility outage.

12 min read Intermediate Updated October 2026

On this page

1. [What commissioning is](https://datacentertraining.us/learn/data-center-commissioning.html#what-is-cx)
2. [Who is involved](https://datacentertraining.us/learn/data-center-commissioning.html#who)
3. [The five levels](https://datacentertraining.us/learn/data-center-commissioning.html#levels)
4. [Key documents](https://datacentertraining.us/learn/data-center-commissioning.html#documents)
5. [Integrated systems testing](https://datacentertraining.us/learn/data-center-commissioning.html#ist)
6. [Handover to operations](https://datacentertraining.us/learn/data-center-commissioning.html#handover)
7. [Common pitfalls](https://datacentertraining.us/learn/data-center-commissioning.html#pitfalls)
8. [Retro-commissioning](https://datacentertraining.us/learn/data-center-commissioning.html#retro-cx)
9. [Courses](https://datacentertraining.us/learn/data-center-commissioning.html#courses)
10. [FAQ](https://datacentertraining.us/learn/data-center-commissioning.html#faq)

[**Test yourself**Take the Tiers & Design quiz.](https://datacentertraining.us/quizzes/tiers-design-quiz.html)

Key takeaways

- Commissioning (Cx) verifies that a facility is designed, built, tested, and documented to meet the owner's requirements, and that staff can operate it.
- Data center Cx is commonly organized into five levels, from factory witness testing (Level 1) to integrated systems testing (Level 5). Terms vary by owner and provider.
- Each level depends on the one before it. Skipping or rushing early levels shows up as failures during integrated testing, or later, in production.
- The real deliverable is an operations team that knows the site, backed by tested procedures and complete documentation.

## What commissioning is, and why data centers need more

Commissioning is a quality process that runs from design through occupancy. It verifies that systems are designed, installed, tested, and able to be operated and maintained according to the **owner's project requirements**. ASHRAE Standard 202 and ASHRAE Guideline 0 describe the general commissioning process for buildings, and ANSI/NETA ATS is widely used for electrical acceptance testing.

In an office building, commissioning mostly confirms that HVAC and lighting controls work and save energy. In a data center, the stakes are different. The design promises that the IT load will ride through a utility outage, a failed UPS module, or a chiller trip, and that equipment can be taken out for maintenance without dropping the load. Those promises involve automatic sequences across electrical, mechanical, controls, and fire systems from different vendors. The only way to know they work is to make them happen, under load, before customers move in. That is why critical facility Cx is more rigorous, more failure-focused, and more integrated than typical building Cx.

## Who is involved

- **Owner:** sets the requirements, funds the program, and accepts the facility. On many projects the owner is also the future operator.
- **Commissioning authority or agent (CxA):** plans and leads the Cx program, writes or reviews test scripts, directs testing, and reports issues. Ideally independent of the designers and installers and reporting to the owner.
- **Designers (engineers of record):** write the basis of design and sequences of operation, and resolve design issues found in testing.
- **General contractor and trade contractors:** electrical, mechanical, and controls contractors who install the systems and execute most test steps.
- **Equipment vendors (OEMs):** perform factory tests and start-up for UPS, switchgear, generators, chillers, and controls.
- **Testing agencies:** independent firms that perform electrical acceptance testing, often NETA-accredited.
- **Operations staff:** the people who will run the site. They should witness tests and learn the systems from Level 3 onward.
- **Authority having jurisdiction:** fire marshals and inspectors who witness life safety acceptance tests.

## The five levels of commissioning

Data center commissioning is commonly described in five levels. The names and boundaries vary between owners and Cx providers, but the progression is consistent: prove each component, then each system, then the whole facility.

1. **Level 1: Factory witness**Major equipment is tested at the factory before it ships.
2. **Level 2: Delivery and installation**Equipment is inspected on arrival and after it is installed.
3. **Level 3: Pre-functional and start-up**Checks, electrical tests, and vendor start-up bring each unit to life.
4. **Level 4: Functional performance**Each system is tested on its own through all its modes.
5. **Level 5: Integrated systems**All systems are tested together under load and failure scenarios.

**What happens at each commissioning level**

| Level | What is tested | Where | Who witnesses | Typical evidence |
| --- | --- | --- | --- | --- |
| L1 Factory witness test | UPS modules, switchgear, generators, paralleling gear, chillers, and other long-lead equipment against the specification | Manufacturer's factory | Owner's representative, CxA, often the design engineer | Factory acceptance test report, test data, punch list, release to ship |
| L2 Delivery and installation inspection | Model and ratings against approved submittals, shipping damage, storage conditions, installation, anchoring, clearances, connections | Site, at delivery and after setting | Contractor and CxA | Receiving checklists, installation checklists, photos, issues log entries |
| L3 Pre-functional checks and start-up | Electrical acceptance tests, torque and insulation checks, rotation, point-to-point controls checkout, flushing, first energization, OEM start-up | Site, equipment by equipment | Contractor, testing agency, OEM, CxA spot checks, operations staff | Pre-functional checklists, start-up reports, acceptance test reports, point-to-point records |
| L4 Functional performance testing | Each system through normal, failure, and maintenance modes: UPS on load bank, generator load tests, transfer switch operations, chiller staging, CRAH failover, control sequences | Site, system by system | CxA directs, contractor performs, owner and operations witness | Signed test scripts with recorded data, trend logs, issues and retest records |
| L5 Integrated systems testing | The whole facility under simulated IT load: utility failure, equipment failures, maintenance scenarios, return to normal | Entire site | CxA leads, with owner, operations, designers, contractors, and vendors | IST report, time-synchronized power and temperature data, final issues log |

The rule that makes the levels work: **do not start a level until the prior level is complete for the systems involved.** Running functional tests on equipment with open start-up issues wastes days and can damage equipment. The [Infrastructure Commissioning & Startup](https://datacentertraining.us/courses/infrastructure-commissioning-startup.html) course walks through each level in detail.

## Key commissioning documents

**Documents that drive a commissioning program**

| Document | What it contains |
| --- | --- |
| Owner's project requirements (OPR) | What the owner needs: capacity, redundancy, availability goals, Tier or Rated design intent, environmental ranges, and operational expectations. |
| Basis of design (BOD) | How the designers will meet the OPR: system choices, assumptions, and design criteria. |
| Commissioning plan | Scope, roles, schedule, communication, the systems to be commissioned, and the level of testing for each. |
| Test scripts | Step-by-step checklists and procedures for each level, with expected results and acceptance criteria written before testing. |
| Issues log | Every deficiency found, its owner, its status, and proof of resolution and retest. |
| Final commissioning report | Summary of the program, test results, open issues, and deferred or seasonal tests. |
| Systems manual | How the facility is meant to work: design intent, sequences of operation, single-line diagrams, setpoints, and O&M references. |
| Operator training records | Who was trained on what, by whom, with the training materials and any recordings. |

Tier or Rated design intent is not the same as certification. Read [Data Center Tier Levels Explained](https://datacentertraining.us/learn/data-center-tiers.html) for how Uptime Institute certification and ANSI/TIA-942 ratings work.

## Integrated systems testing in detail

Integrated systems testing (IST) is the closest a team gets to a real disaster without one. It proves that electrical, mechanical, controls, monitoring, and fire systems behave as one facility.

### Load banks

Because there are no servers yet, the IT load is simulated. **Resistive load banks** load generators and UPS systems; resistive-reactive units test at a realistic power factor. Inside the data hall, **heat load banks**, often rack-mounted or cart-mounted electric heaters with fans, recreate both the electrical draw and the heat and airflow of IT equipment, so the cooling system is tested along with the power path. Load is usually stepped up in stages so problems show up before the facility is at full design load. The [UPS Operations & Load Testing](https://datacentertraining.us/courses/ups-operations-load-testing.html) course covers load bank practice.

### Simulated utility failure

The centerpiece of most ISTs is opening the utility supply on purpose with the hall at load. The team then watches the chain respond: UPS systems carry the load on batteries, generators start and synchronize, transfer equipment moves the load, chillers and pumps restart, and temperatures rise and recover. After a stable run on generators, the site retransfers to utility. Every step is timed and compared with the sequence of operations. [Generator Operations & Maintenance](https://datacentertraining.us/courses/generator-operations-maintenance.html) covers the generator side of these tests.

### Failure scenarios

A good IST also tests what happens when things go wrong during the event:

- A generator fails to start or trips while carrying load.
- A UPS module fails, or one side of a 2N system is lost entirely.
- A chiller, pump, or CRAH fails, and standby units must pick up.
- A controls network or BMS controller fails, and equipment must fall back to safe states.
- Each major component is isolated for maintenance while the load stays up, proving concurrent maintainability.
- Fire alarm cause-and-effect sequences operate as designed; see [fire alarm cause-and-effect testing before handover](https://datacentertraining.us/blog/posts/data-center-fire-alarm-cause-and-effect-testing-what-commissioning-teams-should-verify-before-handover.html).

### Pass/fail criteria

Criteria are written into the scripts before testing starts, not decided afterward. Typical criteria include:

- No interruption to the simulated critical load, confirmed by power quality recorders.
- Voltage and frequency stay within the tolerances the design specifies.
- Rack inlet temperatures stay within the range the OPR sets, such as the ASHRAE recommended 18-27 °C (64.4-80.6 °F).
- Sequences complete within their design times.
- Alarms reach the BMS and power monitoring system with correct names and priorities.
- The facility returns to its normal configuration as designed.

Time-synchronize every data source, from power analyzers to BMS trends, so the team can rebuild the event second by second. IST is high-energy work, so it runs under its own method of procedure with a safety lead and defined stop criteria. If the owner is pursuing Uptime Institute Tier Certification of a constructed facility, Uptime's demonstrations are a separate activity from the Cx program.

**How well do you know Tiers and design?** Test yourself on redundancy, Tier levels, and testing.

[Take the Tiers & Design Quiz](https://datacentertraining.us/quizzes/tiers-design-quiz.html)

## Handover to operations

Commissioning ends when the operations team can run the facility, not when the last test passes. A strong handover includes:

- Operations staff who witnessed Level 3 to Level 5 testing and practiced key procedures on the real equipment.
- SOPs, MOPs, and EOPs drafted during construction and validated during functional testing and IST.
- The CMMS loaded with every asset, its nameplate data, and its preventive maintenance schedule.
- BMS and power monitoring alarms configured, named consistently, and prioritized.
- As-built drawings, O&M manuals, the systems manual, and warranty start dates.
- Spare parts and special tools on site.
- An open issues list with owners and due dates, plus deferred and seasonal tests scheduled.

For a detailed list, see the [commissioning handover checklist](https://datacentertraining.us/blog/posts/data-center-commissioning-handover-checklist-what-facilities-managers-should-verify-before-operations-takeover.html). The [Operations & Maintenance guide](https://datacentertraining.us/learn/data-center-operations.html) explains what the team does once it takes over.

## Common commissioning pitfalls

- **Starting Cx too late.** A CxA brought in after design misses the chance to fix problems on paper, where they are cheapest.
- **Letting the schedule eat testing time.** Construction delays push into the Cx window, and testing gets compressed or skipped.
- **Testing incomplete systems.** Temporary power, temporary controls, or missing alarm points make results meaningless.
- **Undersized load banks.** Testing at partial load hides problems that only appear near design capacity.
- **Only testing the happy path.** The value of IST is in the failure scenarios.
- **Closing issues without retest.** A fix is not done until the test that found the problem passes.
- **Changes after testing.** Firmware updates, setpoint edits, or wiring changes after IST can invalidate results.
- **Leaving operations out.** A team that first sees the systems on handover day starts with a knowledge gap.

## Retro-commissioning existing sites

Many operating data centers were never fully commissioned, or have changed so much since opening that the original results no longer apply. **Retro-commissioning** applies the process to an existing site; **re-commissioning** repeats it for a site that was commissioned before.

The approach is careful because the load is live. Teams start by documenting current conditions: walking down single-line diagrams against the field, comparing control sequences in the BMS to the written design, and reviewing alarm and maintenance history. Testing is then done system by system under approved MOPs and change control, with risk assessments and back-out plans for every step. Full IST on a live site is possible but requires extensive planning and customer coordination. Retro-commissioning commonly uncovers hidden single points of failure, sequences that no longer match the design, drifted setpoints, and wasted energy.

To understand how design choices set up a project for commissioning, see [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html) and [Tier Infrastructure Fundamentals](https://datacentertraining.us/courses/tier-infrastructure-fundamentals.html).

## Courses that go deeper

These self-paced courses cover commissioning, design, and the systems you will test, and each awards a certificate of completion.

### [Infrastructure Commissioning & Startup](https://datacentertraining.us/courses/infrastructure-commissioning-startup.html)

Design & Planning · Comprehensive Program · Commissioning Test Protocols

Lead new facility launches and major upgrades with a proven commissioning framework.

8 hrs

$267.99

- [Enroll](https://datacentertraining.us/checkout.html?item=infrastructure-commissioning-startup)
- [Add to Cart](https://datacentertraining.us/cart.html?add=infrastructure-commissioning-startup)

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

### [UPS Operations & Load Testing](https://datacentertraining.us/courses/ups-operations-load-testing.html)

Power & Electrical · Modular Specialization

Master UPS operations, battery testing, and load-bank procedures.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=ups-operations-load-testing)
- [Add to Cart](https://datacentertraining.us/cart.html?add=ups-operations-load-testing)

### [Generator Operations & Maintenance](https://datacentertraining.us/courses/generator-operations-maintenance.html)

Power & Electrical · Modular Specialization

Size, test, and maintain backup generators with confidence.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=generator-operations-maintenance)
- [Add to Cart](https://datacentertraining.us/cart.html?add=generator-operations-maintenance)

### [Monitoring, Automation & BMS Systems](https://datacentertraining.us/courses/monitoring-automation-bms-systems.html)

Monitoring & Automation · Comprehensive Program · BMS / DCIM

Design a monitoring and BMS strategy that catches problems before they cause downtime.

8 hrs

$276.99

- [Enroll](https://datacentertraining.us/checkout.html?item=monitoring-automation-bms-systems)
- [Add to Cart](https://datacentertraining.us/cart.html?add=monitoring-automation-bms-systems)

Save 42% with the bundle

Design, Planning & Commissioning Bundle

4 courses · 28 hours · **$557.99** per seat, instead of ~~$961.96~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-design-planning)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### What is the difference between Level 4 and Level 5 commissioning?

Level 4 functional performance testing proves each system works on its own across all of its operating modes, such as a UPS transferring to battery and bypass on a load bank. Level 5 integrated systems testing proves all the systems work together, for example by simulating a utility failure with the data hall under load and watching the UPS, generators, transfer equipment, cooling, controls, and monitoring respond as one facility.

### Who should be the commissioning authority on a data center project?

Ideally an experienced commissioning provider who reports to the owner and is independent of the designers and installing contractors. Independence matters because the commissioning authority has to report problems candidly, including design gaps and installation defects, even when that delays the schedule.

### Is commissioning the same as Uptime Institute Tier certification?

No. Commissioning is the owner's quality process for proving the facility meets its requirements. Uptime Institute Tier Certification is a separate program run by Uptime Institute, which reviews design documents and, for a constructed facility certification, observes demonstrations on site. A thorough commissioning program helps a site prepare for certification, but it does not grant it.

### What is retro-commissioning?

Retro-commissioning applies the commissioning process to an existing facility that was never commissioned, or whose documentation and performance have drifted over the years. It documents current conditions, tests sequences and failure responses under controlled procedures, and corrects problems, often finding both reliability risks and wasted energy.

Want to work in commissioning? See [commissioning and startup training](https://datacentertraining.us/training/commissioning-training.html) for courses, certifications, and a learning path.

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-tiers.html)

### Tier Levels Explained

Concurrent maintainability, fault tolerance, and what certification means.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-power.html)

### How Data Center Power Works

The UPS, generator, and transfer systems that IST puts to the test.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-jobs.html#commissioning-agent)

### Commissioning Agent

What the role involves and how people move into it.

See the role →

[Guide](https://datacentertraining.us/learn/data-center-cooling.html)

### How Data Center Cooling Works

Chillers, CRAHs, and containment, the systems behind the temperature criteria.

Read the guide →

This guide is general educational information, not engineering, legal, or compliance advice. Commissioning scope, terms, and acceptance criteria vary by owner and project; follow your project's commissioning plan, the manufacturer's instructions, and the codes adopted in your jurisdiction.

## Train Your Team on Commissioning and Design

Our Design, Planning & Commissioning courses cover design fundamentals, Tier infrastructure, capacity planning, and commissioning and start-up.

- [See the Design Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-commissioning.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
