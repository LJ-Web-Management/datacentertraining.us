# Data Center Cooling & HVAC Quiz

Quiz · Cooling & HVAC

Ten questions on how heat leaves the data hall, from airflow management to chilled water math and liquid cooling. Each answer comes with a short explanation.

10 questions About 5 minutes Intermediate

## Quiz questions

1. Question 1 What is the key difference between a CRAC and a CRAH?

   - A CRAC has its own refrigerant compressor, while a CRAH uses chilled water from a central plant
   - A CRAC cools the hot aisle, while a CRAH cools the cold aisle
   - A CRAH has its own refrigerant compressor, while a CRAC uses chilled water
   - They are the same unit sold under different brand names

   **Show answer**

   **Answer: the CRAC has a compressor; the CRAH uses chilled water.** A computer room air conditioner runs its own refrigeration cycle and rejects heat through a condenser. A computer room air handler is fans plus a chilled-water coil, so it depends on the chiller plant. [Read the cooling guide](https://datacentertraining.us/learn/data-center-cooling.html).
2. Question 2 What is the ASHRAE recommended range for server inlet air temperature for most equipment classes?

   - 10 to 15 °C (50 to 59 °F)
   - 15 to 20 °C (59 to 68 °F)
   - 18 to 27 °C (64.4 to 80.6 °F)
   - 27 to 35 °C (80.6 to 95 °F)

   **Show answer**

   **Answer: 18 to 27 °C (64.4 to 80.6 °F).** The ASHRAE TC 9.9 thermal guidelines measure this at the server inlet, not at the cooling unit return. Allowable ranges are wider, and running cold aisles colder than needed wastes energy. [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html) covers the guidelines.
3. Question 3 A row of racks draws 35 kW. About how much cooling does that heat load need?

   - About 3 tons
   - About 10 tons
   - About 35 tons
   - About 120 tons

   **Show answer**

   **Answer: about 10 tons.** Nearly all power used by IT equipment becomes heat. One kW equals 3,412 BTU/hr and one ton equals 12,000 BTU/hr, so 35 kW is about 119,400 BTU/hr, or roughly 10 tons. [Try the cooling load calculator](https://datacentertraining.us/tools/cooling-load-calculator.html).
4. Question 4 In a room with hot aisle containment, the open room outside the containment runs close to which temperature?

   - The hot aisle exhaust temperature
   - The outdoor air temperature
   - Halfway between supply and return temperature
   - The cold supply air temperature

   **Show answer**

   **Answer: the cold supply air temperature.** Hot aisle containment captures exhaust behind the racks and returns it to the cooling units through a ceiling plenum or chimney, so the rest of the room becomes one large cold aisle. Cold aisle containment does the opposite: only the contained aisle is cool and the room runs warm. [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html) compares both approaches.
5. Question 5 What is bypass airflow?

   - Hot exhaust air that curls over the tops of racks into server inlets
   - Air that flows through the electrical rooms instead of the data hall
   - Outdoor air brought in by an economizer
   - Cold supply air that returns to the cooling units without passing through any IT equipment

   **Show answer**

   **Answer: supply air that never passes through IT equipment.** Bypass air is cooling capacity you paid for that never touches a server. Common causes are unsealed cable cutouts, perforated tiles in hot aisles, and supplying more air than the servers draw, while hot air curling into inlets is recirculation, the opposite problem. [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html) covers airflow fixes.
6. Question 6 Why are blanking panels installed in empty rack spaces?

   - To stop hot exhaust from flowing back through the rack to server intakes
   - To meet electrical code requirements for rack grounding
   - To reduce fan noise in the data hall
   - To keep dust off unused mounting rails

   **Show answer**

   **Answer: to stop exhaust from recirculating to server intakes.** Open rack units let hot air flow from the back of the rack to the front, where servers pull it in, and let cold air short-circuit to the hot side. Blanking panels are one of the cheapest airflow fixes in a data hall. [HVAC Systems Troubleshooting Essentials](https://datacentertraining.us/courses/hvac-troubleshooting-essentials.html) covers hot spot diagnosis.
7. Question 7 What does an economizer do in a data center cooling system?

   - Lowers the chilled water setpoint so the pumps use less energy
   - Uses cool outdoor air or water to reduce or replace compressor cooling when conditions allow
   - Slows the CRAH fans automatically whenever the IT load drops
   - Recovers refrigerant from the chillers during maintenance work

   **Show answer**

   **Answer: it uses outdoor conditions to cut compressor cooling.** An airside economizer uses outdoor air directly or through a heat exchanger. A waterside economizer uses cooling towers or dry coolers to cool the chilled water loop through a heat exchanger, so the chillers can slow down or shut off. [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html) covers free cooling.
8. Question 8 For water, heat flow is roughly BTU/hr = 500 × gpm × delta T (°F). If the chilled water delta T falls by half while the load stays the same, what happens to the flow needed?

   - It falls by half
   - It stays the same
   - It doubles
   - It quadruples

   **Show answer**

   **Answer: it doubles.** With a fixed load, flow and delta T are inversely related, so half the delta T needs twice the water. That is why "low delta T syndrome" drives up pump energy and can force extra chillers online; dirty coils, open bypass valves, and poor setpoints are common causes. [Mechanical Systems & Equipment Maintenance](https://datacentertraining.us/courses/mechanical-systems-maintenance.html) covers the chilled water plant.
9. Question 9 In a direct-to-chip liquid cooling system, what does the coolant distribution unit (CDU) do?

   - Sprays dielectric fluid directly onto the server boards to cool them
   - Converts AC power to DC power for high-density GPU servers
   - Distributes cold supply air through the raised floor plenum
   - Isolates the cold plate coolant loop from facility water and controls its flow, temperature, and pressure

   **Show answer**

   **Answer: it isolates and controls the coolant loop to the cold plates.** The CDU uses a heat exchanger and pumps to keep the clean, tightly controlled technology cooling loop separate from the facility water system. It also filters the loop and alarms on leaks or pressure changes. [Read how AI data centers use liquid cooling](https://datacentertraining.us/learn/ai-data-centers.html).
10. Question 10 Under EPA Section 608 of the Clean Air Act, who needs Section 608 technician certification?

    - Technicians who maintain, service, repair, or dispose of equipment in ways that could release refrigerant
    - Anyone who works in a data hall that contains CRAC units
    - Facility managers who approve refrigerant purchase orders
    - Only contractors who install new chillers, not those who service them

    **Show answer**

    **Answer: technicians whose work could release refrigerant.** Section 608 certification is earned through EPA-approved certifying programs in Type I, II, III, or Universal categories, based on the equipment serviced. [Data Center Cooling System and Refrigerant Safety Training](https://datacentertraining.us/courses/data-center-cooling-refrigerant-safety.html) covers refrigerant hazards and handling awareness; it does not replace Section 608 certification.

Choose an answer to continue.

## Courses That Cover These Topics

Every question above maps to a self-paced course. Each awards a certificate of completion.

### [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html)

Cooling & Efficiency · Comprehensive Program · PUE / ASHRAE Thermal Guidelines

Cut cooling costs and improve reliability with modern thermal management strategy.

8 hrs

$298.99

- [Enroll](https://datacentertraining.us/checkout.html?item=cooling-systems-design-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=cooling-systems-design-optimization)

### [HVAC Systems Troubleshooting Essentials](https://datacentertraining.us/courses/hvac-troubleshooting-essentials.html)

Cooling & Efficiency · Modular Specialization

Hands-on troubleshooting skills for CRAC/CRAH systems and common cooling failures.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=hvac-troubleshooting-essentials)
- [Add to Cart](https://datacentertraining.us/cart.html?add=hvac-troubleshooting-essentials)

### [Mechanical Systems & Equipment Maintenance](https://datacentertraining.us/courses/mechanical-systems-maintenance.html)

Cooling & Efficiency · Modular Specialization

Hands-on mechanical maintenance — piping, chillers, and vibration diagnostics.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=mechanical-systems-maintenance)
- [Add to Cart](https://datacentertraining.us/cart.html?add=mechanical-systems-maintenance)

### [Data Center Cooling System and Refrigerant Safety Training](https://datacentertraining.us/courses/data-center-cooling-refrigerant-safety.html)

Cooling & Efficiency · Modular Specialization · EPA/OSHA

Refrigerant handling and cooling system safety practices specific to data center CRAC/CRAH environments.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-cooling-refrigerant-safety)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-cooling-refrigerant-safety)

### [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html)

Cooling & Efficiency · Modular Specialization · PUE

Cut operating costs with a measurable PUE optimization roadmap.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=energy-efficiency-pue-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=energy-efficiency-pue-optimization)

Save 42% with the bundle

Cooling & Facilities Efficiency Bundle

6 courses · 24 hours · **$462.99** per seat, instead of ~~$798.94~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-cooling-efficiency)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Keep Going

Brush up with the guide, size a load with the calculator, or try another quiz.

### [How Data Center Cooling Works](https://datacentertraining.us/learn/data-center-cooling.html)

The guide behind this quiz, from airflow to chilled water.

Read the guide →

### [Cooling Load Calculator](https://datacentertraining.us/tools/cooling-load-calculator.html)

Convert IT kW to BTU/hr and tons of cooling.

Try the calculator →

### [Data Center Safety Quiz](https://datacentertraining.us/quizzes/safety-quiz.html)

Arc flash, LOTO, batteries, and confined spaces.

Take the quiz →

---

Markdown version of https://datacentertraining.us/quizzes/cooling-quiz.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
