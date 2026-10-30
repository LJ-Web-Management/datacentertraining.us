# Data Center Basics Quiz

Quiz · Data Center Basics

Ten beginner questions on what a data center is, how it is laid out, and the equipment that keeps it running. Each answer comes with a short explanation.

10 questions About 5 minutes Beginner

## Quiz questions

1. Question 1 In data center terms, what is "white space"?

   - The data hall floor area where IT racks and servers are installed
   - The electrical and mechanical rooms that support the IT equipment
   - Land on the campus held for future expansion
   - Empty rack units left open inside a cabinet

   **Show answer**

   **Answer: the data hall where IT equipment lives.** White space is the raised floor or slab area that holds racks, cabinets, and cages. The switchgear, UPS, battery, and mechanical rooms that support it are often called gray space. [Read What Is a Data Center?](https://datacentertraining.us/learn/what-is-a-data-center.html)
2. Question 2 What is an edge data center?

   - The largest building on a hyperscale campus
   - A facility built at the edge of a city to avoid zoning rules
   - A smaller facility placed close to users or devices to cut latency
   - A standby site that is used only during disasters

   **Show answer**

   **Answer: a smaller facility close to users or devices.** Edge sites put compute near where data is created or used, such as a metro area, a factory, or a cell site, so round trips are short. They are often remotely monitored and connect back to larger regional or hyperscale facilities. [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html) compares facility types.
3. Question 3 What is the main job of a UPS (uninterruptible power supply) in a data center?

   - Stepping medium-voltage utility power down to 480 V for the building
   - Switching the building from utility power to generator power during an outage
   - Measuring how much energy each rack uses so customers can be billed
   - Conditioning power and carrying the IT load from stored energy until generators take over

   **Show answer**

   **Answer: conditioning power and bridging to the generators.** The UPS filters disturbances and, when the utility fails, carries the load from batteries or a flywheel for the seconds to minutes generators need to start. Transformers step voltage down, and a transfer switch moves the building to generator power. [Read how UPS systems work](https://datacentertraining.us/learn/data-center-power.html#ups).
4. Question 4 Which equipment cools the data hall by blowing room air across a chilled-water coil?

   - A power distribution unit (PDU)
   - A computer room air handler (CRAH)
   - An uninterruptible power supply (UPS)
   - An automatic transfer switch (ATS)

   **Show answer**

   **Answer: a CRAH.** A CRAH uses fans and a coil fed with chilled water from the central plant. Its cousin, the CRAC, has its own refrigerant compressor, while a PDU distributes power to the racks. [Read the cooling guide](https://datacentertraining.us/learn/data-center-cooling.html).
5. Question 5 How is Power Usage Effectiveness (PUE) calculated?

   - Total facility energy divided by IT equipment energy
   - IT equipment energy divided by total facility energy
   - Cooling energy divided by total facility energy
   - IT equipment energy minus cooling energy

   **Show answer**

   **Answer: total facility energy divided by IT equipment energy.** A PUE of 1.0 would mean every kilowatt-hour reaches IT equipment, and a site at 1.5 spends 0.5 kWh on cooling, power losses, and lighting for every kWh of IT. The inverse, IT energy over total energy, is called DCiE. [Read the PUE guide](https://datacentertraining.us/learn/energy-efficiency-pue.html).
6. Question 6 Which Uptime Institute Tier is defined as "concurrently maintainable"?

   - Tier I
   - Tier II
   - Tier III
   - Tier IV

   **Show answer**

   **Answer: Tier III.** Concurrently maintainable means any component or distribution path can be taken out for planned maintenance without shutting down IT. Tier IV adds fault tolerance, so a single unplanned failure does not affect the load either. [Read the Tiers guide](https://datacentertraining.us/learn/data-center-tiers.html).
7. Question 7 In a hot aisle/cold aisle layout, how are the rack rows arranged?

   - Every row faces the same direction, so each row exhausts into the next row's fronts
   - Rows alternate so fronts face fronts across a cold aisle and backs face backs across a hot aisle
   - Racks face the cooling units, with servers mounted sideways in the cabinets
   - Hot and cold racks alternate within each row to even out temperatures

   **Show answer**

   **Answer: fronts face fronts, backs face backs.** Servers pull cool air in the front and exhaust hot air out the back. Facing the rows this way keeps cold supply air in one aisle and hot exhaust in the next, so the two streams mix less. [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html) covers white space layout.
8. Question 8 What happens in a meet-me room?

   - Visitors sign in, show ID, and receive badges before entering
   - Operators watch alarms from every building system around the clock
   - Customers meet sales staff before a tour of the facility
   - Carriers and customers connect their networks to each other with cross-connects

   **Show answer**

   **Answer: carriers and customers interconnect.** The meet-me room (MMR) is the interconnection hub of a colocation or carrier facility. Network providers terminate their fiber there, and a cross-connect cable links a customer cage to a carrier or to another customer. [Fiber Optics & Network Cabling](https://datacentertraining.us/courses/fiber-optics-network-cabling.html) covers the cabling side.
9. Question 9 A data hall needs four cooling units to carry its full heat load. The design installs five. What is that redundancy called?

   - N
   - N+1
   - 2N
   - 2(N+1)

   **Show answer**

   **Answer: N+1.** N is the capacity the load needs, here four units, and one extra unit makes N+1, so any single unit can fail or be serviced. A 2N design would install eight units as two complete sets. [See the redundancy table](https://datacentertraining.us/learn/data-center-power.html#redundancy).
10. Question 10 In a typical retail colocation data center, who owns and maintains the servers inside a customer's cage?

    - The customer
    - The colocation provider
    - The electric utility
    - The carrier in the meet-me room

    **Show answer**

    **Answer: the customer.** A colocation provider sells space, power, cooling, physical security, and connectivity, while customers bring and manage their own IT equipment. Many providers also offer "remote hands" for simple tasks. [Data Center Operations Management](https://datacentertraining.us/courses/data-center-operations-management.html) covers how the facility side runs.

Choose an answer to continue.

## Courses That Cover These Topics

Every question above maps to a self-paced course. Each awards a certificate of completion.

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

Save 52% with the bundle

Complete Data Center Professional Bundle

43 courses · 192 hours · **$2,928.99** per seat, instead of ~~$6,067.57~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-complete-catalog)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Keep Going

Brush up with a guide, or try another quiz.

### [What Is a Data Center?](https://datacentertraining.us/learn/what-is-a-data-center.html)

The guide behind this quiz: types, layout, and key systems.

Read the guide →

### [Which Career Fits You?](https://datacentertraining.us/quizzes/career-quiz.html)

Find your data center role in ten questions.

Find my match →

### [Power & Electrical Quiz](https://datacentertraining.us/quizzes/power-electrical-quiz.html)

UPS topologies, generators, transfer switches, and redundancy.

Take the quiz →

---

Markdown version of https://datacentertraining.us/quizzes/data-center-basics-quiz.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
