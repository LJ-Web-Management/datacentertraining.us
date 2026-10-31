# Data Center Tiers & Design Quiz

Quiz · Tiers & Design

Ten questions on how data centers are rated, built, and proven: Tiers, redundancy, commissioning, and the math behind availability. Each answer comes with a short explanation.

10 questions About 5 minutes Intermediate to advanced

## Quiz questions

1. Question 1 What distinguishes an Uptime Institute Tier II facility from Tier I?

   - Two independent utility feeds
   - Redundant capacity components, such as extra UPS modules or chillers, on a single distribution path
   - Fault tolerance against any single failure
   - Concurrent maintainability of every component and path

   **Show answer**

   **Answer: redundant capacity components.** Tier I is basic capacity with no redundancy, and Tier II adds redundant components but keeps a single distribution path, so path maintenance still needs a shutdown. Concurrent maintainability is Tier III and fault tolerance is Tier IV. [Read the Tiers guide](https://datacentertraining.us/learn/data-center-tiers.html).
2. Question 2 A facility can take any component or distribution path offline for planned maintenance without shutting down IT, but it is not designed to ride through every unplanned failure automatically. Which Tier does that describe?

   - Tier I
   - Tier II
   - Tier III
   - Tier IV

   **Show answer**

   **Answer: Tier III, concurrently maintainable.** Tier III has redundant components and multiple distribution paths, so planned work never forces an outage. Tier IV adds fault tolerance: a single unplanned failure of any component or path does not affect the critical load. [Tier Infrastructure Fundamentals](https://datacentertraining.us/courses/tier-infrastructure-fundamentals.html) compares the two.
3. Question 3 A site needs 1,000 kW of UPS capacity for its IT load. How much UPS capacity does a 2N design install?

   - 1,000 kW, the same as N
   - 1,250 kW, with one spare 250 kW module
   - 1,500 kW, with half again the load in reserve
   - 2,000 kW, as two independent 1,000 kW systems

   **Show answer**

   **Answer: 2,000 kW in two independent systems.** N is 1,000 kW, and 2N means two complete systems that can each carry the full load alone. An N+1 design built from four 250 kW modules would install 1,250 kW. [See the redundancy table](https://datacentertraining.us/learn/data-center-power.html#redundancy).
4. Question 4 How does ANSI/TIA-942 label its levels of data center infrastructure?

   - Rated-1 to Rated-4
   - Tier I to Tier IV
   - Class A to Class D
   - Level 1 to Level 5

   **Show answer**

   **Answer: Rated-1 to Rated-4.** TIA uses "Rated" levels to avoid confusion with Uptime Institute Tiers, and it rates telecommunications, electrical, architectural, and mechanical infrastructure. A TIA-942 rating and an Uptime Tier certification come from different organizations with different criteria. [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html) covers both systems.
5. Question 5 A provider markets a new building as "Tier III", but Uptime Institute has never certified it. What does that claim usually mean?

   - It is automatically certified because it follows the Tier Standard
   - It meets ANSI/TIA-942 Rated-3
   - It was designed with Tier III intent, but no Uptime certification verifies it
   - It guarantees 99.982 percent availability

   **Show answer**

   **Answer: Tier III design intent, not a certification.** Uptime Institute certifies design documents, constructed facilities, and operational sustainability, and a buyer can ask for those certificates. The 99.982 percent figure is a commonly quoted industry number, not part of the Tier Standard. [Read the Tiers guide](https://datacentertraining.us/learn/data-center-tiers.html).
6. Question 6 In common industry usage, what happens during Level 5 commissioning?

   - Factory witness testing of equipment before it ships to the site
   - Inspection of equipment as it is delivered and set in place
   - Functional performance testing of each system on its own
   - Integrated systems testing (IST) of all systems working together under load and failure scenarios

   **Show answer**

   **Answer: integrated systems testing.** The common sequence is L1 factory acceptance, L2 delivery and installation inspection, L3 pre-functional checks and start-up, L4 functional performance testing, and L5 IST, such as a simulated utility outage with load banks running. Terms vary between firms. [Read the commissioning guide](https://datacentertraining.us/learn/data-center-commissioning.html).
7. Question 7 What is "stranded capacity" in a data center?

   - Power, cooling, or space that exists but cannot be used because another resource runs out first
   - Capacity reserved under contract for a future customer
   - Generator fuel that has degraded in storage
   - Spare servers kept in inventory

   **Show answer**

   **Answer: capacity that cannot be used because another resource runs out first.** For example, a row may have spare UPS capacity while its cooling is maxed out, so that power is stranded. Planners track power, cooling, space, and network together to avoid it. [Capacity Planning & Forecasting](https://datacentertraining.us/courses/capacity-planning-forecasting.html) covers how to measure it.
8. Question 8 All else being equal, which candidate site is the poorest choice for a new data center?

   - Near two utility substations with available capacity
   - Near several fiber routes from different carriers
   - Inside a 100-year floodplain and under an airport approach path
   - In a mild climate with many economizer hours

   **Show answer**

   **Answer: the floodplain under the flight path.** Site selection screens for natural hazards like floods, earthquakes, and wildfire, and for man-made ones like flight paths, rail lines, and pipelines. Power availability, diverse fiber, water, and permitting are weighed alongside them. [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html) covers site selection.
9. Question 9 A facility is quoted at 99.982 percent availability. About how much downtime per year does that allow?

   - About 1.6 hours
   - About 8.8 hours
   - About 22.7 hours
   - About 26 minutes

   **Show answer**

   **Answer: about 1.6 hours.** 100 minus 99.982 leaves 0.018 percent, and 0.018 percent of 8,760 hours is about 1.6 hours. This percentage is often quoted for Tier III, but it is an industry rule of thumb, not part of Uptime's Tier Standard. [Try the uptime calculator](https://datacentertraining.us/tools/uptime-calculator.html).
10. Question 10 Why does a design with N+1 UPS modules feeding a single output path fall short of concurrent maintainability?

    - Because N+1 never provides enough capacity
    - Because the single distribution path still has to be shut down to maintain it
    - Because UPS modules cannot be isolated for maintenance
    - Because concurrent maintainability requires 2N generators

    **Show answer**

    **Answer: the single path still needs a shutdown.** Redundant modules protect against a module failure, but concurrent maintainability also needs redundant distribution paths, so switchboards, PDUs, and feeders can be serviced while IT stays up. N+1 on one path is a Tier II-style design. [Tier Infrastructure Fundamentals](https://datacentertraining.us/courses/tier-infrastructure-fundamentals.html) covers path redundancy.

Choose an answer to continue.

## Courses That Cover These Topics

Every question above maps to a self-paced course. Each awards a certificate of completion.

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

Save 42% with the bundle

Design, Planning & Commissioning Bundle

4 courses · 28 hours · **$557.99** per seat, instead of ~~$961.96~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-design-planning)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Keep Going

Brush up with a guide, run the numbers, or read about commissioning.

### [Data Center Tiers Explained](https://datacentertraining.us/learn/data-center-tiers.html)

The guide behind this quiz: Tier I to IV and what certification means.

Read the guide →

### [Uptime Calculator](https://datacentertraining.us/tools/uptime-calculator.html)

Turn an availability percentage into hours of downtime.

Try the calculator →

### [Data Center Commissioning](https://datacentertraining.us/learn/data-center-commissioning.html)

Levels 1 to 5, from factory tests to integrated systems testing.

Read the guide →

---

Markdown version of https://datacentertraining.us/quizzes/tiers-design-quiz.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
