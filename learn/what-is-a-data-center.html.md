# Data Center 101: What Is a Data Center and How Does It Work?

Knowledge Center · Basics

A data center is a building designed to keep computers running no matter what happens outside it. Here is what is inside one, the main types, how the core systems work together, and who keeps it all running.

13 min read Beginner Updated October 2026

On this page

1. [What is a data center?](https://datacentertraining.us/learn/what-is-a-data-center.html#definition)
2. [What is inside a facility](https://datacentertraining.us/learn/what-is-a-data-center.html#inside)
3. [Types of data centers](https://datacentertraining.us/learn/what-is-a-data-center.html#types)
4. [How the main systems work](https://datacentertraining.us/learn/what-is-a-data-center.html#systems)
5. [Key metrics](https://datacentertraining.us/learn/what-is-a-data-center.html#metrics)
6. [Industry snapshot](https://datacentertraining.us/learn/what-is-a-data-center.html#industry)
7. [The facility lifecycle](https://datacentertraining.us/learn/what-is-a-data-center.html#lifecycle)
8. [Who works there](https://datacentertraining.us/learn/what-is-a-data-center.html#people)
9. [Courses](https://datacentertraining.us/learn/what-is-a-data-center.html#courses)
10. [FAQ](https://datacentertraining.us/learn/what-is-a-data-center.html#faq)

[**Test yourself**Take the 10-question Data Center Basics quiz.](https://datacentertraining.us/quizzes/data-center-basics-quiz.html)

Key takeaways

- A data center keeps IT equipment running continuously by supplying it with conditioned power, cooling, network connectivity, and physical protection.
- A large share of a facility's space and construction budget goes to supporting infrastructure (the gray space), not to the rooms where the servers sit.
- Enterprise rooms, colocation buildings, hyperscale campuses, and edge sites differ in scale and ownership, but they all rely on the same core systems.
- The industry describes facilities with a few numbers: megawatts of critical IT capacity, kilowatts per rack, PUE, and availability.

## What is a data center?

A data center is a building, or a dedicated space inside a building, that houses servers, storage systems, and network equipment along with the infrastructure that keeps them running around the clock. That infrastructure includes the power system, cooling, network connectivity, fire protection, physical security, and the monitoring that ties it all together.

The scale varies enormously. A data center can be a single room in a hospital basement, a colocation building in a city center, or a campus of several large buildings that each draw tens of megawatts. What they share is a purpose: keep the computing equipment, which the industry calls the **IT load** or **critical load**, powered, cooled, connected, and protected, with as little downtime as possible.

It helps to think of a data center as two systems layered on top of each other. The **IT side** is the servers, storage, and networking that run applications. The **facility side**, often called critical facilities or critical infrastructure, is everything that keeps the IT side alive: switchgear, generators, UPS systems, chillers, air handlers, fire suppression, and access control. Different teams usually own each side, and a lot of real data center work happens where the two meet.

## What is inside a data center

Data center people divide a facility into **white space**, where the IT equipment lives, and **gray space**, which holds the infrastructure that supports it. A walk through a typical multi-megawatt building takes you through most of these areas.

**The main spaces in a data center**

| Space | What is in it | Why it matters |
| --- | --- | --- |
| Data halls (white space) | Rows of racks and cabinets, hot and cold aisles, containment, overhead cable trays or busway, sometimes a raised floor. | Where the IT load runs. Space, power, and cooling here are what colocation customers buy. |
| Meet-me room and network rooms | Carrier fiber entrances, cross-connect panels, carrier and customer network gear. | Where outside networks enter and connect to customers. |
| Electrical rooms | Medium- and low-voltage switchgear, transformers, transfer switches, distribution panels. | Receive utility power and route it through the building. |
| UPS and battery rooms | UPS modules, battery strings or cabinets, sometimes flywheels. | Carry the IT load for the seconds to minutes between a utility failure and generator pickup. |
| Mechanical plant | Chillers, cooling towers or dry coolers, pumps, heat exchangers, air handlers. | Remove the heat the IT equipment produces and reject it outdoors. |
| Generator yard | Diesel or gas engine-generators, fuel tanks, fuel transfer and polishing systems. | Carry the facility through long utility outages. |
| Security spaces | Guard station, security operations center, mantraps, badge and biometric readers, camera systems. | Control who gets in and record what happens. |
| NOC or control room | Screens for the building management system, power monitoring, DCIM, and network status. | Where operators watch the whole facility and coordinate response to alarms. |
| Support spaces | Loading dock, staging and burn-in rooms, storage, offices. | Keep dust and cardboard out of the data hall while equipment is unpacked and tested. |

Gray space is not an afterthought. The electrical and mechanical systems are a large part of what it costs to build a data center, and they are where most hands-on facility work happens. To understand a building, follow the power from the utility entrance to the rack, and the heat from the rack to the cooling tower.

White space vocabulary

Equipment height is measured in **rack units (U)**, where 1U is 1.75 inches. A **cage** is a fenced area for one customer, a **suite** is a private room, and a **pod** is a group of rows managed as one block.

## Types of data centers

Data centers are usually classified by who owns them and who uses them. The engineering is similar; the business model changes.

### Enterprise data centers

An enterprise data center is built, owned, and operated by a single organization for its own use. Banks, hospitals, universities, government agencies, and manufacturers run them on their own campuses or in dedicated buildings. It controls everything and carries all of the cost and staffing. Many enterprises now run a mix: some systems on premises, some in colocation, some in public cloud.

### Colocation: retail and wholesale

A colocation (colo) provider owns the building and its power, cooling, and security, and rents capacity to customers who bring their own IT equipment.

- **Retail colocation** leases individual cabinets, cages, or small suites inside a shared data hall. The provider runs the infrastructure and sells remote hands and cross-connects, short cables that link a customer directly to carriers, clouds, and partners in the same building.
- **Wholesale colocation** leases an entire data hall, a floor, or a whole building, usually measured in megawatts of critical IT capacity and on longer contracts. The tenant often has more say in the design and fit-out.

### Hyperscale and cloud

Hyperscale data centers are operated by large cloud and internet companies. They are built at very large scale, often as multi-building campuses, with standardized designs repeated across many sites. Hyperscalers often design their own servers and handle resilience partly in software, spreading workloads across buildings and regions.

### Edge data centers

Edge data centers are small facilities placed close to users or devices to cut latency and backhaul traffic: at cell tower sites, in regional telecom offices, in retail stores, or on factory floors. Many hold only a few racks and run unstaffed, relying on remote monitoring.

### Modular and prefabricated data centers

Modular data centers are built from factory-assembled units: prefabricated power skids, containerized IT modules, or whole prefabricated data halls that are shipped and set on site. Building in a factory can shorten the schedule and improve quality control, and capacity can be added in blocks as demand grows.

## How the main systems work

Every data center depends on the same handful of systems. Each one is designed with some level of redundancy so that a single failure, or a planned maintenance task, does not take down the IT load.

### Power

Utility power arrives at medium voltage, passes through switchgear and step-down transformers, and reaches the IT equipment through uninterruptible power supplies (UPS) and power distribution units (PDUs). When the utility fails, UPS batteries carry the load for the seconds it takes standby generators to start, and the generators carry it until utility power returns. Most servers have two power supplies fed from separate A and B paths. Read [How Data Center Power Works](https://datacentertraining.us/learn/data-center-power.html) for the full chain.

### Cooling

Nearly every watt the IT equipment uses ends up as heat. Cooling units in or beside the data hall move air across cold coils, and a chilled water plant or refrigerant system carries the heat outdoors. Containment keeps supply and exhaust air from mixing, and liquid cooling is spreading fast for high-density racks. See [How Data Center Cooling Works](https://datacentertraining.us/learn/data-center-cooling.html).

### Connectivity

Telecom carriers bring fiber into the building through diverse entrances, ideally on physically separate routes, and terminate it in the meet-me room. From there, structured cabling runs fiber and copper trunks through overhead trays to network racks and rows, where switches connect each server to the network. Cabling standards such as ANSI/TIA-942 and disciplined labeling keep the plant maintainable. Our [Fiber Optics & Network Cabling](https://datacentertraining.us/courses/fiber-optics-network-cabling.html) course covers this physical layer.

### Physical security

Security is layered from the property line inward: fencing and vehicle barriers, staffed guard posts, badge readers paired with PINs or biometrics, mantraps that pass one person at a time, recorded video, and locked cages and cabinets. Customers and auditors check these controls against frameworks such as SOC 2, ISO/IEC 27001, and PCI DSS. See the [Security & Compliance guide](https://datacentertraining.us/learn/data-center-security-compliance.html).

### Fire protection

Data halls typically combine aspirating smoke detection that samples the air, pre-action sprinklers whose pipes fill with water only after detection, and in some rooms clean agent suppression. NFPA 75 covers protection of IT equipment, NFPA 72 fire alarm systems, NFPA 13 sprinklers, and NFPA 2001 clean agent systems. The [Data Center Safety guide](https://datacentertraining.us/learn/data-center-safety.html) covers what technicians need to know.

### Monitoring and control

A **building management system ([BMS](https://datacentertraining.us/learn/glossary.html#term-bms))** controls and monitors the mechanical plant. An **electrical power monitoring system (EPMS)** watches switchgear, UPS systems, and generators. **Data center infrastructure management ([DCIM](https://datacentertraining.us/learn/glossary.html#term-dcim))** software tracks assets, rack power, space, and capacity. Operators in the NOC respond to alarms and run maintenance under written procedures. The [Operations guide](https://datacentertraining.us/learn/data-center-operations.html) explains how that work is organized.

## Key data center metrics

A handful of numbers describe most facilities. You will see them in sales sheets, design documents, and job interviews.

**Four numbers that describe a data center**

| Metric | What it measures | How to read it |
| --- | --- | --- |
| Availability (uptime) | The percentage of time the IT load has power and cooling. | 99.99% sounds close to perfect, but it still allows about 53 minutes of downtime a year. 99.999% ("five nines") allows about 5 minutes. |
| PUE (power usage effectiveness) | Total facility energy divided by IT equipment energy. | 1.0 would mean every kilowatt-hour goes to IT. Higher numbers mean more overhead for cooling and power losses. |
| kW per rack (density) | The average or peak power each rack draws. | Traditional enterprise racks draw a few kilowatts. AI and high-performance computing racks can draw many times that, which changes the cooling design. |
| MW of critical IT capacity | The power available to IT equipment, not counting cooling and other overhead. | The headline size of a facility. Total utility demand is higher because of cooling and losses. |

Floor area still matters, but power is now the constraint that decides how much IT a building can hold. A 1 MW data hall can support 100 racks at 10 kW each or 50 racks at 20 kW each, and those two layouts need very different cooling. Go deeper in [Energy Efficiency and PUE Explained](https://datacentertraining.us/learn/energy-efficiency-pue.html) and in [Data Center Tier Levels Explained](https://datacentertraining.us/learn/data-center-tiers.html), which shows how availability relates to design.

## Industry snapshot

Data centers are a fast-growing share of electricity demand, and the people who run them are in short supply. These figures come from the U.S. Department of Energy and Lawrence Berkeley National Laboratory, and from Uptime Institute's annual survey of operators.

4.4%

Share of total U.S. electricity used by data centers in 2023.

Source: [U.S. DOE / LBNL](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers)

176 TWh

Electricity used by U.S. data centers in 2023.

Source: [U.S. DOE / LBNL](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers)

6.7% to 12%

Projected data center share of U.S. electricity by 2028.

Source: [U.S. DOE / LBNL](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers)

325 to 580 TWh

Projected U.S. data center electricity use in 2028.

Source: [U.S. DOE / LBNL](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers)

Nearly 2 in 3

Operators reporting difficulty retaining staff, finding qualified candidates, or both.

Source: [Uptime Institute, 2025 survey](https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025)

1.56

Average PUE in Uptime's 2024 survey. The 2025 survey found little change for six consecutive years.

Source: [Uptime Institute](https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025)

The short version: demand is rising quickly, efficiency gains have leveled off, and operators report trouble finding and keeping qualified people.

## The data center lifecycle

A facility goes through the same phases whether it is a single enterprise room or a hyperscale campus. Each phase has its own specialists.

1. **Site selection**Power availability, fiber routes, water, land, natural hazards, incentives, and permitting decide where a facility can go.
2. **Design**Architects and electrical, mechanical, and controls engineers set capacity, redundancy, density, and layout.
3. **Construction**Contractors and trades build the shell, then install switchgear, generators, UPS, cooling, and cabling.
4. **Commissioning**Independent agents verify every system, from factory tests to integrated systems testing, before IT load arrives.
5. **Operations**Facility teams run, monitor, and maintain the site around the clock under written procedures and change control.
6. **Refresh**Equipment is upgraded or replaced as it ages and densities rise. Eventually spaces are retrofitted or decommissioned.

Commissioning deserves special attention because it is where design intent meets reality. Industry practice usually describes five levels: factory witness testing (L1), delivery and installation inspection (L2), pre-functional checks and start-up (L3), functional performance testing (L4), and integrated systems testing (L5), where the team pulls utility power on purpose and confirms that everything responds as designed. Terms vary by company. Read the [Commissioning guide](https://datacentertraining.us/learn/data-center-commissioning.html) for details.

Operations is the longest phase: the building serves for decades while IT equipment turns over every few years, and lessons from incidents and maintenance shape the next design. [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html) and [Data Center Operations Management](https://datacentertraining.us/courses/data-center-operations-management.html) cover both ends of that loop.

**How well do you know the basics?** Ten questions on data center spaces, systems, and metrics, with instant answers.

[Take the Basics Quiz](https://datacentertraining.us/quizzes/data-center-basics-quiz.html)

## Who works in a data center

A data center runs on a mix of IT specialists, skilled trades, and operations staff. Common roles include:

- [Data center technicians](https://datacentertraining.us/careers/data-center-jobs.html#data-center-technician), who rack, cable, and repair servers.
- [Critical facilities technicians](https://datacentertraining.us/careers/data-center-jobs.html#critical-facilities-technician), who operate and maintain power and cooling equipment.
- [Electricians](https://datacentertraining.us/careers/data-center-jobs.html#electrician) and [HVAC technicians](https://datacentertraining.us/careers/data-center-jobs.html#hvac-technician), who maintain switchgear, UPS systems, chillers, and air handlers.
- [Controls technicians](https://datacentertraining.us/careers/data-center-jobs.html#controls-technician), who manage the BMS, power monitoring, and sensors.
- [NOC technicians](https://datacentertraining.us/careers/data-center-jobs.html#noc-technician), who watch alarms and coordinate response around the clock.
- [Security officers](https://datacentertraining.us/careers/data-center-jobs.html#security-officer), who control access and patrol the site.
- [Facility managers](https://datacentertraining.us/careers/data-center-jobs.html#facility-manager) and [operations managers](https://datacentertraining.us/careers/data-center-jobs.html#operations-manager), who run the site, the budget, and the maintenance program.
- [Commissioning agents](https://datacentertraining.us/careers/data-center-jobs.html#commissioning-agent), [design engineers](https://datacentertraining.us/careers/data-center-jobs.html#design-engineer), and [capacity planners](https://datacentertraining.us/careers/data-center-jobs.html#capacity-planner), who plan and verify new capacity.

People reach these jobs from the military, the building trades, IT help desks, and many other starting points. The [How to Get Into Data Centers](https://datacentertraining.us/careers/how-to-get-into-data-centers.html) guide lays out common paths, and the [career quiz](https://datacentertraining.us/quizzes/career-quiz.html) can help you pick a starting point. If you are heading toward the facilities side, [Facility Management Fundamentals](https://datacentertraining.us/courses/facility-management-fundamentals.html) is a practical first course.

## Courses that go deeper

These self-paced courses build on this overview, from design to daily operations. Each awards a certificate of completion.

### [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html)

Design & Planning · Comprehensive Program · ANSI/TIA-942

Design data center facilities that scale — from site selection to redundancy strategy.

8 hrs

$312.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-design-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-design-fundamentals)

### [Facility Management Fundamentals](https://datacentertraining.us/courses/facility-management-fundamentals.html)

Operations · Modular Specialization

Core facility management principles for teams running critical infrastructure.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=facility-management-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=facility-management-fundamentals)

### [Data Center Operations Management](https://datacentertraining.us/courses/data-center-operations-management.html)

Operations · Comprehensive Program · DCIM / SLA Frameworks

Run daily operations like the teams behind Tier 3/4 facilities — maintenance, incident response, and SLAs.

8 hrs

$325.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-operations-management)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-operations-management)

### [Tier Infrastructure Fundamentals](https://datacentertraining.us/courses/tier-infrastructure-fundamentals.html)

Design & Planning · Comprehensive Program · Uptime Institute Tier Framework

Understand and assess TIER I–IV infrastructure without the formal certification track.

8 hrs

$280.99

- [Enroll](https://datacentertraining.us/checkout.html?item=tier-infrastructure-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=tier-infrastructure-fundamentals)

### [Power Systems & Electrical Fundamentals](https://datacentertraining.us/courses/power-systems-electrical-fundamentals.html)

Power & Electrical · Comprehensive Program · NFPA 70E

Master data center electrical infrastructure — from utility interconnection to UPS and PDU architecture.

8 hrs

$303.99

- [Enroll](https://datacentertraining.us/checkout.html?item=power-systems-electrical-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=power-systems-electrical-fundamentals)

### [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html)

Cooling & Efficiency · Comprehensive Program · PUE / ASHRAE Thermal Guidelines

Cut cooling costs and improve reliability with modern thermal management strategy.

8 hrs

$298.99

- [Enroll](https://datacentertraining.us/checkout.html?item=cooling-systems-design-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=cooling-systems-design-optimization)

Save 52% with the bundle

Complete Data Center Professional Bundle

43 courses · 192 hours · **$2,928.99** per seat, instead of ~~$6,067.57~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-complete-catalog)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### What is the difference between a data center and a server room?

A server room is usually a single room inside an office or other building, often with basic cooling and a small UPS. A data center is built around the IT load, with redundant power and cooling, standby generators, layered physical security, fire protection designed for IT equipment, and monitoring around the clock. The line between them is blurry, but the more a business depends on the equipment, the more its space needs to look like a true data center.

### What is colocation?

Colocation means renting space, power, cooling, and connectivity in a data center owned by a provider, while you own and manage your own IT equipment. Retail colocation leases individual cabinets, cages, or suites. Wholesale colocation leases whole data halls or buildings, usually sized in megawatts. The provider runs the building infrastructure and security, and you run the servers.

### How much electricity do data centers use?

According to the U.S. Department of Energy and Lawrence Berkeley National Laboratory, U.S. data centers used about 4.4 percent of total U.S. electricity in 2023, about 176 terawatt-hours, and could use about 6.7 to 12 percent by 2028. A single facility can range from a few kilowatts for a small server room to tens of megawatts for a large building.

### Do you need an IT degree to work in a data center?

No. Many data center roles are filled by people with trade, military, or technical backgrounds rather than computer science degrees. Facility roles value electrical, HVAC, and mechanical experience, and technician roles value hands-on hardware skills, attention to detail, and the discipline to follow written procedures. Requirements vary by employer, so check job postings for the roles that interest you.

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-power.html)

### How Data Center Power Works

Follow power from the utility to the rack, through generators and UPS systems.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-cooling.html)

### How Data Center Cooling Works

Every watt becomes heat. See how air and liquid systems remove it.

Read the guide →

[Careers](https://datacentertraining.us/careers/how-to-get-into-data-centers.html)

### How to Get Into Data Centers

Entry points, skills to build, and how people move up.

Read the guide →

[Reference](https://datacentertraining.us/learn/glossary.html)

### Data Center Glossary

UPS, PDU, CRAH, PUE, and every other acronym in one place.

Open the glossary →

This guide is general educational information, not engineering, legal, or compliance advice. Facility designs, procedures, and requirements vary by site, owner, and jurisdiction.

## Build Your Data Center Foundation

Our self-paced courses cover design, power, cooling, operations, safety, and security, so you can learn the whole facility or focus on one system.

- [See the Complete Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/what-is-a-data-center.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
