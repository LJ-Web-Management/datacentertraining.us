# Data Center Power & Electrical Quiz

Quiz · Power & Electrical

Ten questions on how power gets from the grid to the rack, and how it stays on when something fails. Each answer comes with a short explanation.

10 questions About 5 minutes Intermediate

## Quiz questions

1. Question 1 When the utility fails, what carries the IT load during the seconds before the generators are online?

   - The standby generators
   - The UPS and its stored energy (batteries or flywheel)
   - The automatic transfer switch
   - The main switchgear

   **Show answer**

   **Answer: the UPS and its stored energy.** Generators need several seconds to start and stabilize. The UPS carries the load from its batteries (or a flywheel) instantly, then hands off once the transfer switch moves the building to generator power. [Read how UPS systems work](https://datacentertraining.us/learn/data-center-power.html#ups).
2. Question 2 Which UPS topology powers the load from its inverter all the time, so there is no transfer time when the utility fails?

   - Standby (offline)
   - Line-interactive
   - Double conversion (online)
   - Maintenance bypass

   **Show answer**

   **Answer: double conversion (online).** A double-conversion UPS converts AC to DC and back to clean AC continuously, so the load never sees a transfer when the input fails. That is why it is the standard for data center critical loads. [UPS Systems Fundamentals](https://datacentertraining.us/courses/ups-systems-fundamentals.html) covers all three topologies.
3. Question 3 What does N+1 redundancy mean?

   - Two complete, independent systems that can each carry the full load
   - One spare unit beyond the capacity the load needs
   - One utility feed plus one generator
   - The load can grow by one rack before upgrades are needed

   **Show answer**

   **Answer: one spare unit beyond what the load needs.** If four UPS modules carry the load, N+1 means installing five, so any one module can fail or be serviced. Two complete independent systems is 2N. [See the redundancy table](https://datacentertraining.us/learn/data-center-power.html#redundancy).
4. Question 4 In a 2N design with dual-corded servers, why is each A and B feed usually kept below about half of its rated capacity?

   - To lower the electric bill
   - So either feed can carry the entire load if the other is lost
   - Because servers only draw power from one cord at a time
   - Because breakers trip at 50 percent of their rating

   **Show answer**

   **Answer: so either feed can carry everything.** Dual-corded equipment normally splits its draw between both feeds. If one feed drops, the other instantly picks up the whole load. A feed that was already loaded past half would then be overloaded. [Capacity Planning & Forecasting](https://datacentertraining.us/courses/capacity-planning-forecasting.html) teaches how to track this.
5. Question 5 Which device moves the building load from utility power to generator power during an outage?

   - A power distribution unit (PDU)
   - A rack PDU
   - An automatic transfer switch (ATS) or paralleling switchgear
   - The UPS static bypass

   **Show answer**

   **Answer: an ATS or paralleling switchgear.** The transfer equipment senses the utility failure, starts the generators, and switches the load once generator voltage and frequency are stable. It retransfers to the utility after the utility has been stable for a set time. [Emergency/Standby Power Systems Fundamentals](https://datacentertraining.us/courses/emergency-standby-power-systems-fundamentals.html) walks through the sequence.
6. Question 6 While a UPS is on maintenance bypass, what is true about the load?

   - It runs on bypass power and is not protected by the UPS batteries
   - It runs on battery power until maintenance is complete
   - It is automatically moved to generator power
   - It is fully shut down

   **Show answer**

   **Answer: it is not protected by the batteries.** Maintenance bypass routes power around the UPS so technicians can service it. A utility disturbance during that window reaches the load directly, which is why bypass work is scheduled, planned, and done step by step under a written procedure. [UPS Operations & Load Testing](https://datacentertraining.us/courses/ups-operations-load-testing.html) covers safe bypass operation.
7. Question 7 Under NFPA 70E, the arc flash boundary is the distance at which the incident energy equals:

   - 1.2 cal/cm²
   - 4 cal/cm²
   - 8 cal/cm²
   - 40 cal/cm²

   **Show answer**

   **Answer: 1.2 cal/cm².** That is roughly the energy that can cause a second-degree burn on unprotected skin. Anyone inside the arc flash boundary needs arc-rated PPE suited to the hazard. [Data Center Arc Flash Safety Training](https://datacentertraining.us/courses/data-center-arc-flash-safety.html) explains boundaries and labels.
8. Question 8 Which OSHA standard is titled "The control of hazardous energy (lockout/tagout)"?

   - 29 CFR 1910.146
   - 29 CFR 1910.147
   - 29 CFR 1910.303
   - 29 CFR 1926.501

   **Show answer**

   **Answer: 29 CFR 1910.147.** 1910.146 covers permit-required confined spaces, 1910.303 covers general electrical installation requirements, and 1926.501 is construction fall protection. Electrical work on de-energized parts also has lockout and tagging rules in 1910.333. [Read the Data Center Safety Guide](https://datacentertraining.us/learn/data-center-safety.html).
9. Question 9 Why are standby diesel generators exercised regularly under load, not just started and idled?

   - To keep the utility company informed
   - To recharge the UPS batteries
   - To prove they can carry real load and to prevent "wet stacking" from light-load running
   - Because diesel fuel must be burned within 30 days

   **Show answer**

   **Answer: to prove load capability and prevent wet stacking.** Diesels run lightly loaded can accumulate unburned fuel and carbon in the exhaust. NFPA 110 sets monthly exercise and periodic load-test requirements, and many sites add load-bank tests. [Generator Operations & Maintenance](https://datacentertraining.us/courses/generator-operations-maintenance.html) covers testing.
10. Question 10 What is a static transfer switch (STS) usually used for in a data center?

    - Transferring the building between utility and generator power
    - Giving single-corded equipment a second source by switching between two feeds in milliseconds
    - Shutting down all power to the data hall in an emergency
    - Stepping 480 V down to 208 V

    **Show answer**

    **Answer: protecting single-corded equipment.** An STS uses solid-state switches to move a load between two independent sources fast enough that equipment rides through. Emergency shutdown is the job of the EPO system, and stepping voltage down is done by a PDU transformer. [Power Distribution Systems Fundamentals](https://datacentertraining.us/courses/power-distribution-systems-fundamentals.html) covers the hardware.

Choose an answer to continue.

## Courses That Cover These Topics

Every question above maps to a self-paced course. Each awards a certificate of completion.

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

### [Generator Operations & Maintenance](https://datacentertraining.us/courses/generator-operations-maintenance.html)

Power & Electrical · Modular Specialization

Size, test, and maintain backup generators with confidence.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=generator-operations-maintenance)
- [Add to Cart](https://datacentertraining.us/cart.html?add=generator-operations-maintenance)

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

Save 38% with the bundle

Power & Electrical Systems Bundle

14 courses · 47 hours · **$986.99** per seat, instead of ~~$1,603.86~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-power-electrical)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Keep Going

Brush up with a guide, or try another quiz.

### [How Data Center Power Works](https://datacentertraining.us/learn/data-center-power.html)

The guide behind this quiz, from the grid to the rack.

Read the guide →

### [Data Center Safety Quiz](https://datacentertraining.us/quizzes/safety-quiz.html)

Arc flash, LOTO, batteries, and confined spaces.

Take the quiz →

### [Which Career Fits You?](https://datacentertraining.us/quizzes/career-quiz.html)

Find your data center role in ten questions.

Find my match →

---

Markdown version of https://datacentertraining.us/quizzes/power-electrical-quiz.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
