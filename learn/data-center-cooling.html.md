# How Data Center Cooling Works

Knowledge Center · Cooling

Every watt a server uses turns into heat, and that heat has to leave the building as fast as it is made. Here is how air, water, and liquid systems do it, and what happens when they stop.

14 min read Beginner to intermediate Updated October 2026

On this page

1. [Every watt becomes heat](https://datacentertraining.us/learn/data-center-cooling.html#heat)
2. [Temperature targets](https://datacentertraining.us/learn/data-center-cooling.html#ashrae)
3. [CRAC and CRAH units](https://datacentertraining.us/learn/data-center-cooling.html#air-cooling)
4. [Chilled water and DX](https://datacentertraining.us/learn/data-center-cooling.html#heat-rejection)
5. [Economizers](https://datacentertraining.us/learn/data-center-cooling.html#economizers)
6. [Airflow management](https://datacentertraining.us/learn/data-center-cooling.html#airflow)
7. [Liquid cooling](https://datacentertraining.us/learn/data-center-cooling.html#liquid)
8. [High density and AI](https://datacentertraining.us/learn/data-center-cooling.html#high-density)
9. [Monitoring and maintenance](https://datacentertraining.us/learn/data-center-cooling.html#monitoring)
10. [Refrigerant safety](https://datacentertraining.us/learn/data-center-cooling.html#refrigerant)
11. [When cooling fails](https://datacentertraining.us/learn/data-center-cooling.html#failure)
12. [Courses](https://datacentertraining.us/learn/data-center-cooling.html#courses)
13. [FAQ](https://datacentertraining.us/learn/data-center-cooling.html#faq)

[**Test yourself**Take the 10-question Cooling quiz.](https://datacentertraining.us/quizzes/cooling-quiz.html)

Key takeaways

- Nearly all the power IT equipment uses becomes heat. 1 kW of load is about 3,412 BTU/hr, and one ton of cooling is 12,000 BTU/hr.
- ASHRAE TC 9.9 recommends server inlet air of 18 to 27°C (64.4 to 80.6°F) for most equipment. Measure it at the server inlet.
- Airflow management (containment, blanking panels, sealed openings) is usually the cheapest way to gain capacity and efficiency.
- At high densities, a room can overheat within minutes of losing cooling, so ride-through and restart planning matter as much as capacity.

## Every watt becomes heat

Almost all the electrical energy IT equipment uses ends up as heat in the room. For cooling purposes, treat the IT load in kilowatts as the heat load in kilowatts. Add heat from UPS losses, lighting, people, and the building envelope, and you have the total the cooling system must remove.

Two conversions do most of the work:

- **1 watt = 3.412 BTU/hr**, so 1 kW = 3,412 BTU/hr.
- **1 ton of cooling = 12,000 BTU/hr**, which is about 3.52 kW.

**Worked example:** a row of ten racks at 8 kW each is 80 kW of IT load. 80 × 3,412 = 272,960 BTU/hr. Divide by 12,000 and the IT load alone needs about 22.7 tons of cooling, before redundancy and other heat sources.

Air also has to carry that heat to the coil. The standard sensible heat formula for air near sea level is BTU/hr = 1.08 × CFM × &Delta;T (°F). A 10 kW rack (34,120 BTU/hr) with a 20°F temperature rise across the servers needs roughly 34,120 ÷ (1.08 × 20), or about 1,580 CFM. If the room cannot deliver that much cold air to the rack inlets, the servers pull in their own hot exhaust instead.

**Size a room in seconds.** Convert IT load to BTU/hr, tons, and airflow, then size units with redundancy.

[Try the Cooling Load Calculator](https://datacentertraining.us/tools/cooling-load-calculator.html)

## Temperature and humidity targets

The reference for IT environments is the ASHRAE Technical Committee 9.9 publication *Thermal Guidelines for Data Processing Environments*. Its **recommended** range for server inlet air is 18 to 27°C (64.4 to 80.6°F) for most equipment classes. Wider **allowable** ranges exist for each class, but running there usually costs more server fan energy and can affect reliability.

- **Measure at the inlet.** What matters is the air entering the front of the servers, not the return air at the cooling unit.
- **Colder is not safer.** Very cold supply air wastes energy and hides airflow problems. Many sites now run toward the upper part of the recommended range.
- **Humidity is managed by dew point.** Very dry air raises the risk of static discharge, and humid air risks condensation and corrosion. ASHRAE sets limits on both ends.

## Air cooling: CRAC and CRAH units

Most data halls are still cooled with air. Cooling units push cold air into the room, server fans draw it through the equipment, and warm exhaust returns to the units. The two classic unit types differ in where their cooling comes from. (See the glossary entries for [CRAC](https://datacentertraining.us/learn/glossary.html#term-crac) and [CRAH](https://datacentertraining.us/learn/glossary.html#term-crah).)

**CRAC vs CRAH**

| Feature | CRAC (computer room air conditioner) | CRAH (computer room air handler) |
| --- | --- | --- |
| Cooling source | Its own refrigeration circuit (direct expansion, or DX) | Chilled water from a central plant |
| Compressor in the unit | Yes | No. A control valve modulates chilled water through the coil. |
| Heat rejection | Remote air-cooled condenser, or a water or glycol condenser with a dry cooler | The chiller plant and its cooling towers or dry coolers |
| Typical setting | Small and mid-size rooms, edge sites, buildings without a chiller plant | Mid-size and large facilities with a chilled water plant |
| Maintenance focus | Compressors, refrigerant circuit, condensers, filters, fans | Coils, valves and actuators, filters, fans, water leaks |
| Refrigerant work | At the unit, by EPA Section 608 certified technicians | At the chillers, not the unit |

You will also see in-row coolers between racks and fan walls that supply a whole hall from an adjacent gallery. The goal is the same: cold air at the server inlets, and hot exhaust back to the coil without mixing.

## Chilled water plants and DX systems

Data hall units only move heat from air into a coil. Something else carries it outdoors.

### Chilled water plants

A chilled water plant makes cold water centrally and pumps it to CRAHs, fan walls, or coolant distribution units. Its main parts are:

- **Chillers**, refrigeration machines with centrifugal, screw, or scroll compressors that pull heat out of the chilled water loop.
- **Pumps**, increasingly on variable speed drives, that circulate chilled and condenser water.
- **Heat rejection**: water-cooled chillers send heat through a condenser water loop to **cooling towers**, where evaporation carries it away. **Air-cooled chillers** reject heat straight to outdoor air with fans.
- **Controls** in the BMS that stage equipment as load and weather change.

Water-cooled plants are usually more efficient, especially in hot weather, because evaporation lets them reject heat close to the outdoor wet-bulb temperature. The trade-offs are water use, water treatment, and more equipment. Air-cooled chillers use little or no water but work harder on hot days. Many plants add chilled water storage tanks that can carry the load for a short time if the chillers stop.

### DX systems

In a direct expansion (DX) system, refrigerant evaporates directly in the indoor unit's coil, and a compressor and condenser reject the heat outdoors. DX units need no chilled water plant, so they are common in smaller facilities, edge sites, and telecom rooms. Each unit stands alone, which simplifies redundancy, but you have many refrigerant circuits to maintain.

## Economizers and free cooling

When outdoor conditions allow, a facility can reject heat without running compressors. This is economization, or free cooling, and it is a big lever on energy use.

- **Airside economizers** bring filtered outdoor air into the data hall (direct), or use it to cool indoor air through a heat exchanger without mixing (indirect, including indirect evaporative units). Direct systems need careful control of humidity, dust, and smoke from wildfires or nearby industry.
- **Waterside economizers** use cooling towers or dry coolers to chill water through a plate heat exchanger, bypassing the chillers when the outdoor wet-bulb temperature is low enough. Partial economization pre-cools the water so the chillers do less work.

Raising supply air and chilled water temperatures within the ASHRAE recommended range increases the hours each year the economizer can carry the load. [Energy Efficiency and PUE Explained](https://datacentertraining.us/learn/energy-efficiency-pue.html) shows how that shows up in the numbers.

## Airflow management

Cooling capacity is wasted if cold air never reaches the server inlets or if hot exhaust gets back into them. Fixing that is usually the cheapest efficiency project in an air-cooled room.

### Hot aisle and cold aisle

Racks face front to front and back to back. Servers pull cold air from the cold aisle and exhaust into the hot aisle. One rack turned backward blows hot air into its neighbor's inlet.

### Containment

**Cold aisle containment** closes the ends and top of the cold aisle with doors and panels, so supply air can only pass through the equipment. **Hot aisle containment** encloses the hot aisle and ducts exhaust to a ceiling plenum or back to the cooling units. Chimney cabinets do the same at the rack level. Containment must be coordinated with fire detection and suppression.

### Blanking panels, tiles, and floors

Every empty rack unit needs a blanking panel, and every cable cutout needs a brush grommet or seal; missing blanking panels are a classic cause of hot spots. On a **raised floor**, cooling units pressurize the underfloor plenum, and perforated tiles or grates in the cold aisle release the air. Tile placement, underfloor obstructions, and floor pressure all affect delivery, and a perforated tile in a hot aisle is pure waste. Many new facilities build on **slab** instead, supplying air from fan walls or overhead and relying on containment to keep hot and cold air apart.

### Bypass, recirculation, and delta T

**Bypass airflow** is cold air that returns to the cooling units without passing through IT equipment. **Recirculation** is hot exhaust drawn back into server inlets. The quick diagnostic is **delta T**, the temperature difference across a device. If the cooling units see a much smaller delta T than the servers do, cold air is bypassing the load and the units are moving more air than needed. Fix bypass first, then raise setpoints or slow fans.

## Liquid cooling

Water carries heat far more effectively than air, which is why liquid cooling is spreading as rack densities climb. There are three main approaches.

For operating and safety skills on liquid-cooled racks, see [liquid cooling training](https://datacentertraining.us/training/liquid-cooling-training.html). For the air side, read [CRAH units explained](https://datacentertraining.us/learn/crah-units.html).

### Rear-door heat exchangers

A water coil replaces the rack's rear door, so server exhaust leaves near room temperature. Passive doors rely on server fans; active doors add their own. They are a common retrofit for denser racks in an air-cooled room.

### Direct-to-chip cooling

Cold plates on the processors and GPUs carry coolant through the server. A **coolant distribution unit (CDU)** uses a heat exchanger, pumps, and filtration to separate the facility water system from the technology cooling loop that runs to the racks, holding coolant temperature, pressure, and flow. Memory, drives, and power supplies still shed some heat to air, so most deployments are hybrids. Because chips tolerate warm coolant, these systems can often run on warmer water, which extends economizer hours.

### Immersion cooling

In **single-phase immersion**, servers sit in tanks of dielectric fluid that is pumped through a heat exchanger. In **two-phase immersion**, the fluid boils on hot components and condenses on a coil above the bath. Immersion handles very high densities, but it changes how hardware is serviced, and some two-phase fluids face environmental and regulatory scrutiny.

Liquid near electronics

Leak detection cable along piping, drip trays, dripless quick-disconnect couplings, pressure testing, and coolant quality checks are standard parts of a liquid cooling deployment. Follow the manufacturer's procedures for connecting and disconnecting manifolds, and never break into a pressurized loop without isolation.

## High density and AI

Traditional enterprise racks draw a few kilowatts. GPU servers for AI training and inference can push a single rack to tens of kilowatts, and the newest systems go well beyond that. At those densities you cannot practically move enough air through a cabinet, so facilities turn to direct-to-chip cooling and rear doors, often in hybrid rooms with air-cooled racks alongside. More heat in less space also means temperatures rise faster when cooling stops. Read [AI Data Centers](https://datacentertraining.us/learn/ai-data-centers.html) for how designs are changing.

## Monitoring, alarms, and maintenance

A well-instrumented system tracks rack inlet temperatures (top, middle, and bottom, since the top usually runs warmest), supply and return conditions at each unit, underfloor pressure, chilled water temperatures and flows, CDU conditions, and leak detection zones. The [BMS](https://datacentertraining.us/learn/glossary.html#term-bms) controls the plant and raises alarms, and [DCIM](https://datacentertraining.us/learn/glossary.html#term-dcim) tools add rack-level thermal maps. Good alarm design uses warning and critical thresholds, rate-of-change alarms that catch a fast temperature rise early, and clear escalation.

Cooling equipment runs every hour of every day, so preventive maintenance keeps it reliable:

- **Filters:** replace on schedule or by pressure drop.
- **Coils:** clean evaporator and condenser coils, which lose capacity when dirty.
- **Fans and belts:** check belt tension, bearings, and vibration. Many newer units use beltless EC fans.
- **Condensate:** keep drain pans, traps, and pumps clear and test their alarms. A blocked drain is a classic source of water under the floor.
- **Leak checks:** inspect chilled water piping and valves, test leak detection, and check refrigerant circuits.
- **Plant and controls:** chiller tube cleaning, cooling tower water treatment with a Legionella management program, sensor calibration, and tests of failover between units.

All of this runs under written procedures and change control. [Mechanical Systems & Equipment Maintenance](https://datacentertraining.us/courses/mechanical-systems-maintenance.html) and [HVAC Systems Troubleshooting Essentials](https://datacentertraining.us/courses/hvac-troubleshooting-essentials.html) cover the hands-on side.

## Refrigerant safety and EPA Section 608

Chillers and DX units hold refrigerant under pressure. The main hazards are:

- **Oxygen displacement.** Many refrigerants are heavier than air and collect in low or enclosed spaces. Machinery rooms typically have refrigerant detectors and emergency ventilation under ASHRAE Standard 15 and the mechanical code.
- **Cold and pressure.** Released liquid refrigerant flashes to very cold vapor that can cause frostbite, and systems operate at high pressure.
- **Flammability.** Many newer low global warming potential refrigerants are classed A2L (mildly flammable) under ASHRAE Standard 34, which brings new handling rules.

In the United States, Section 608 of the Clean Air Act governs refrigerant handling. EPA rules prohibit knowingly venting refrigerant and require technicians who maintain, service, repair, or dispose of equipment that could release refrigerant to be certified through an EPA-approved certifying program. Certification types cover small appliances (Type I), high-pressure systems (Type II), low-pressure systems (Type III), or all three (Universal). Data center chillers and DX units generally fall under Type II or Type III.

Awareness training is not Section 608 certification

Our [Cooling System and Refrigerant Safety](https://datacentertraining.us/courses/data-center-cooling-refrigerant-safety.html) course builds hazard awareness and awards a certificate of completion. EPA Section 608 certification is a separate credential offered by EPA-approved certifying organizations.

## What happens when cooling fails

IT equipment keeps producing heat when cooling stops, so inlet temperatures start rising immediately. A lightly loaded legacy room may have some cushion. A high-density room can heat past the allowable range within minutes, and servers start throttling or shutting down to protect themselves.

The most common trigger is a power event. During a utility outage, the UPS carries the IT load instantly, but most chillers and many cooling units are not on UPS. They stop until the generators pick them up, and chillers then need time to restart and reach full capacity. That gap is why designs include:

- UPS-backed fans and pumps, so air and water keep moving while chillers restart.
- Chilled water storage tanks that supply cold water during the restart window.
- Fast-restart chillers and carefully tuned restart sequences.
- Redundant cooling capacity (N+1 or better), so one failed unit does not overheat the room.

Operators back this up with emergency procedures: confirm units restarted after a transfer, recover a chiller that did not, bring in temporary cooling, or ask IT to shed non-critical load. Commissioning should prove how long the room rides through a cooling interruption at full design load. See [How Data Center Power Works](https://datacentertraining.us/learn/data-center-power.html) for the electrical side of that sequence.

**How well do you know data center cooling?** Ten questions, instant answers.

[Take the Cooling Quiz](https://datacentertraining.us/quizzes/cooling-quiz.html)

## Courses that go deeper

Each of these self-paced courses awards a certificate of completion. Start with [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html) for the full picture.

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

### [Building Envelope Fundamentals](https://datacentertraining.us/courses/building-envelope-fundamentals.html)

Cooling & Efficiency · Modular Specialization

Understand how a facility's building envelope drives cooling load and energy cost.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=building-envelope-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=building-envelope-fundamentals)

Save 42% with the bundle

Cooling & Facilities Efficiency Bundle

6 courses · 24 hours · **$462.99** per seat, instead of ~~$798.94~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-cooling-efficiency)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### What temperature should a data center be kept at?

ASHRAE TC 9.9 recommends server inlet air between 18 and 27°C (64.4 and 80.6°F) for most equipment classes. Measure at the server inlets, not at the cooling unit return. Many facilities now run toward the warmer end of that range to save energy, as long as airflow is well managed and there are no hot spots.

### What is the difference between a CRAC and a CRAH?

A CRAC (computer room air conditioner) has its own refrigeration circuit with a compressor and rejects heat through a condenser. A CRAH (computer room air handler) has no compressor. It uses chilled water from a central chiller plant, with a valve controlling flow through its coil. CRACs are common in smaller rooms, and CRAHs in larger facilities with chilled water plants.

### How many tons of cooling does a 10 kW rack need?

Multiply 10 kW by 3,412 to get 34,120 BTU per hour, then divide by 12,000 BTU per hour per ton. The answer is about 2.8 tons for the IT load alone. Real designs add other heat sources and redundancy, and the cold air or liquid has to reach the rack, not just be produced somewhere in the room.

### Do I need EPA Section 608 certification to work on data center cooling?

You need Section 608 certification, from an EPA-approved certifying program, to maintain, service, repair, or dispose of equipment in ways that could release refrigerant. Many other cooling tasks, such as changing filters, watching alarms, or checking chilled water units, do not involve opening refrigerant circuits, but your employer decides who may perform each task.

### What should a facility manager check in the first week of a new data center cooling system?

Confirm that alarms reach the BMS and the on-call team, that setpoints and sequences match the commissioning record, and that the integrated systems test covered failover. Trend supply and return temperatures and humidity at the racks, check for leaks, vibration and unusual noise, and start the filter, water treatment and refrigerant logs. Keep the commissioning punch list open until every item is closed, and walk staff through the emergency operating procedures.

## Keep learning

[Guide](https://datacentertraining.us/learn/energy-efficiency-pue.html)

### Energy Efficiency and PUE

How cooling choices show up in PUE, and how to improve it.

Read the guide →

[Guide](https://datacentertraining.us/learn/ai-data-centers.html)

### AI Data Centers

Why GPU racks are pushing facilities toward liquid cooling.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-jobs.html#hvac-technician)

### Data Center HVAC Technician

What the job involves and how to prepare for it.

See the role →

[Guide](https://datacentertraining.us/learn/data-center-power.html)

### How Data Center Power Works

The other half of the critical infrastructure, from utility to rack.

Read the guide →

This guide is general educational information, not engineering, legal, or compliance advice. Follow your site's procedures, manufacturer instructions, and applicable codes and regulations.

## Train Your Team on Data Center Cooling

Our Cooling & Facilities Efficiency courses cover design, troubleshooting, maintenance, refrigerant safety, and PUE improvement.

- [See the Cooling Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-cooling.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
