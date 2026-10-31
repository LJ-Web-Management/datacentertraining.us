# CRAH Units Explained: Components, CRAH vs. CRAC, and Maintenance

Knowledge Center · Cooling

Walk into most large data halls and the cooling you see is a row of CRAH units or a fan wall. They move more air than anything else in the building and they are where many cooling problems first show up. Here is how a CRAH works, what is inside one, how it differs from a CRAC, and what the technicians who maintain them look for.

9 min read Beginner to intermediate Updated October 2026

On this page

1. [What a CRAH unit is](https://datacentertraining.us/learn/crah-units.html#what)
2. [CRAH unit components](https://datacentertraining.us/learn/crah-units.html#components)
3. [CRAH vs. CRAC](https://datacentertraining.us/learn/crah-units.html#compare)
4. [How CRAHs are controlled](https://datacentertraining.us/learn/crah-units.html#control)
5. [Common CRAH problems](https://datacentertraining.us/learn/crah-units.html#failures)
6. [CRAH maintenance tasks](https://datacentertraining.us/learn/crah-units.html#maintenance)
7. [The CRAH technician role](https://datacentertraining.us/learn/crah-units.html#technician)
8. [Cooling courses](https://datacentertraining.us/learn/crah-units.html#courses)
9. [FAQ](https://datacentertraining.us/learn/crah-units.html#faq)
10. [Sources](https://datacentertraining.us/learn/crah-units.html#sources)

[**Test yourself**Take the Cooling & HVAC quiz.](https://datacentertraining.us/quizzes/cooling-quiz.html)

**Short answer:** A CRAH (computer room air handler) is a cooling unit that blows data center air across a chilled water coil. It has no compressor of its own: the cooling comes from a central chilled water plant, and the CRAH controls fans and a water valve to hold a supply air temperature. A CRAC (computer room air conditioner) contains its own refrigeration compressor, like a large split air conditioner. CRAHs are typical in large chilled water facilities; CRACs in smaller rooms and sites without a chiller plant.

Key takeaways

- CRAH = air handler with a chilled water coil; CRAC = air conditioner with its own compressor and refrigerant circuit.
- The main CRAH components are the coil, fans (usually EC fans), the chilled water control valve, filters, sensors, and the unit controller.
- Modern CRAHs control on supply or rack inlet temperature and modulate fan speed to match the IT load or aisle pressure.
- Most CRAH failures are mundane: dirty filters, stuck valves, failed fans, condensate leaks, and sensors in the wrong place.
- CRAH technicians need HVAC fundamentals plus data center habits: change control, redundancy awareness, and never taking a unit down without checking the N+1 margin.

## What is a CRAH unit?

A computer room air handler is a large fan-and-coil unit that sits on the data hall floor, in a gallery beside it, or above it. Warm air returning from the hot aisle passes through filters and across a coil filled with chilled water; the cooled air is then pushed back to the cold aisle, often under a raised floor or directly into the room. The heat ends up in the chilled water, which carries it back to chillers, cooling towers, or dry coolers.

Because the refrigeration happens centrally, CRAHs can be very large, efficient, and simple compared to units with built-in compressors. For the full picture of air, water, and liquid cooling, read [how data center cooling works](https://datacentertraining.us/learn/data-center-cooling.html).

## CRAH unit components

- **Chilled water coil:** finned tubes that transfer heat from air to water.
- **Control valve and actuator:** a two-way or three-way valve that modulates water flow to hold temperature.
- **Fans:** usually electronically commutated (EC) plug fans that vary speed, sometimes several in one unit so one can fail without losing the unit.
- **Filters:** panel or pleated filters on the return air side, with a differential pressure switch or sensor to flag loading.
- **Sensors:** return and supply air temperature, humidity, water temperatures, airflow or differential pressure, and remote rack inlet sensors.
- **Humidifier and reheat (optional):** fitted on some units for humidity control; many modern sites rely on wider humidity ranges and leave them out.
- **Condensate pan, pump, and leak detection:** to collect and remove water when the coil runs below dew point.
- **Unit controller:** runs the local control loop, talks to the BMS, and coordinates with neighboring units in teamwork or lead-lag modes.
- **Electrical section:** disconnect, fan drives, controls transformer, and often dual power feeds through a transfer device.

## CRAH vs. CRAC: what is the difference?

**CRAH and CRAC units compared**

|  | CRAH (computer room air handler) | CRAC (computer room air conditioner) |
| --- | --- | --- |
| Cooling source | Chilled water from a central plant | Built-in compressor and refrigerant circuit (DX), or glycol-cooled |
| Heat rejection | Through the chilled water plant | Remote air-cooled condenser, or a glycol loop and dry cooler |
| Typical facility | Large data centers with chillers | Smaller rooms, edge sites, sites without a chiller plant |
| Efficiency at scale | Higher, especially with economizers and warm water | Lower at large scale; each unit runs its own compressor |
| Trade skills | Hydronics, valves, controls, fans | Refrigeration (EPA Section 608), compressors, plus fans and controls |

## How CRAH units are controlled

Older units controlled on return air temperature, which led to cold supply air and wasted energy. Modern practice controls the chilled water valve on **supply air** or rack inlet temperature, within the ranges in the ASHRAE thermal guidelines for data processing environments, and controls fan speed separately, either on the temperature difference across the IT load or on differential pressure between the cold and hot aisles. Units work as a team so that if one fails, its neighbors speed up. Understanding these sequences is the difference between an operator who resets alarms and one who solves problems.

## Common CRAH problems and what they look like

- **High supply temperature with valve 100% open:** chilled water supply too warm, low flow, air in the coil, or a fouled coil.
- **Unit cooling but racks still hot:** airflow problem, such as missing blanking panels, open floor tiles in the hot aisle, or a containment gap.
- **Fan failure alarms:** failed EC fan, loose connection, or a fan drive fault.
- **Water under the floor:** condensate pan overflow, failed condensate pump, or a leaking valve or coil.
- **Units fighting each other:** one humidifying while another dehumidifies, or sensors reading differently; usually a calibration or control setting issue.

## CRAH maintenance tasks

Maintenance frequencies come from the manufacturer and your maintenance program, but the core tasks are consistent:

- Replace filters on condition (differential pressure) or schedule.
- Inspect and clean coils; check for corrosion and fin damage.
- Stroke the control valve and confirm the actuator follows its signal.
- Check fans for vibration, noise, and current draw.
- Clean the condensate pan, test the condensate pump and leak detection.
- Verify sensor calibration against a reference instrument.
- Test power transfer on dual-fed units, and confirm the unit restarts correctly after a power interruption.

Before taking any CRAH out of service, confirm that the remaining units can carry the load and that the work is under an approved method of procedure. The [data center maintenance program guide](https://datacentertraining.us/learn/data-center-maintenance-program.html) covers how to schedule this work.

## The CRAH technician role

CRAH technician is usually not a formal job title. The work is done by data center HVAC technicians, critical facilities technicians, and mechanical contractors. Employers look for HVAC fundamentals, hydronics and controls knowledge, EPA Section 608 certification for anyone who will work on CRAC refrigerant circuits, and the habits of mission-critical work. See the [data center HVAC technician](https://datacentertraining.us/careers/data-center-hvac-technician.html) career guide for the full role.

**CRAH or CRAC? Supply or return?** Ten questions on data center cooling.

[Take the Cooling Quiz](https://datacentertraining.us/quizzes/cooling-quiz.html)

## Data center cooling and HVAC courses

### [HVAC Systems Troubleshooting Essentials](https://datacentertraining.us/courses/hvac-troubleshooting-essentials.html)

Cooling & Efficiency · Modular Specialization

Hands-on troubleshooting skills for CRAC/CRAH systems and common cooling failures.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=hvac-troubleshooting-essentials)
- [Add to Cart](https://datacentertraining.us/cart.html?add=hvac-troubleshooting-essentials)

### [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html)

Cooling & Efficiency · Comprehensive Program · PUE / ASHRAE Thermal Guidelines

Cut cooling costs and improve reliability with modern thermal management strategy.

8 hrs

$298.99

- [Enroll](https://datacentertraining.us/checkout.html?item=cooling-systems-design-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=cooling-systems-design-optimization)

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

Save 42% with the bundle

Cooling & Facilities Efficiency Bundle

6 courses · 24 hours · **$462.99** per seat, instead of ~~$798.94~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-cooling-efficiency)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### What is a CRAH unit?

A CRAH, or computer room air handler, is a data center cooling unit that uses fans to move room air across a chilled water coil. It has no compressor; the chilled water comes from a central plant.

### What is the difference between a CRAH and a CRAC?

A CRAH uses chilled water from a central plant and contains no refrigeration compressor. A CRAC is a self-contained air conditioner with its own compressor and refrigerant circuit, rejecting heat to a remote condenser or a glycol loop.

### What are the main components of a CRAH unit?

The chilled water coil, the control valve and actuator, fans (usually EC fans), filters, temperature and humidity sensors, a condensate pan and pump, the unit controller, and the electrical section with its disconnect.

### How often should CRAH filters be changed?

Change them when differential pressure across the filter reaches the manufacturer's limit, or on the schedule in your maintenance program if pressure is not monitored. Dusty construction phases and high-airflow rooms load filters much faster.

### Do CRAH technicians need EPA 608 certification?

Not for work on chilled water CRAHs, which contain no refrigerant. Anyone who opens a refrigerant circuit on a CRAC unit, chiller, or other refrigeration equipment needs EPA Section 608 certification for that type of equipment.

## Sources

- ASHRAE TC 9.9, [Thermal Guidelines for Data Processing Environments](https://www.ashrae.org/technical-resources/bookstore/datacom-series) (Datacom Series).
- U.S. EPA, [Section 608 technician certification](https://www.epa.gov/section608).
- U.S. Department of Energy, [Federal Energy Management Program: data center energy efficiency](https://www.energy.gov/femp/data-center-energy-efficiency).

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-cooling.html)

### How Data Center Cooling Works

Air, chilled water, economizers, and liquid cooling.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-hvac-technician.html)

### Data Center HVAC Technician

Chillers, CRAH units, and refrigerant safety.

See the role →

[Training](https://datacentertraining.us/training/liquid-cooling-training.html)

### Liquid Cooling Training

CDUs, cold plates, and safe work on liquid-cooled racks.

See the training →

[Guide](https://datacentertraining.us/learn/data-center-bms.html)

### Data Center BMS

How the BMS controls and watches cooling units.

Read the guide →

This guide is general educational information. Follow the equipment manufacturer's instructions and your site's procedures for any maintenance work.

## Train Your Cooling Team

Online HVAC troubleshooting, cooling design, mechanical maintenance, and refrigerant safety courses for data center technicians.

- [See the Cooling Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/crah-units.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
