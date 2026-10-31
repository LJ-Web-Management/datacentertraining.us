# Data Center Glossary: 200+ Terms Explained

Knowledge Center · Reference

Plain-English definitions of the power, cooling, safety, security, networking, monitoring, sustainability, and business terms you will hear on a data center floor. Filter the list or jump to a letter.

233 terms Beginner friendly Updated October 2026

- Filter terms

- [0-9](https://datacentertraining.us/learn/glossary.html#letter-0-9)
- [A](https://datacentertraining.us/learn/glossary.html#letter-a)
- [B](https://datacentertraining.us/learn/glossary.html#letter-b)
- [C](https://datacentertraining.us/learn/glossary.html#letter-c)
- [D](https://datacentertraining.us/learn/glossary.html#letter-d)
- [E](https://datacentertraining.us/learn/glossary.html#letter-e)
- [F](https://datacentertraining.us/learn/glossary.html#letter-f)
- [G](https://datacentertraining.us/learn/glossary.html#letter-g)
- [H](https://datacentertraining.us/learn/glossary.html#letter-h)
- [I](https://datacentertraining.us/learn/glossary.html#letter-i)
- [J](https://datacentertraining.us/learn/glossary.html#letter-j)
- [K](https://datacentertraining.us/learn/glossary.html#letter-k)
- [L](https://datacentertraining.us/learn/glossary.html#letter-l)
- [M](https://datacentertraining.us/learn/glossary.html#letter-m)
- [N](https://datacentertraining.us/learn/glossary.html#letter-n)
- [O](https://datacentertraining.us/learn/glossary.html#letter-o)
- [P](https://datacentertraining.us/learn/glossary.html#letter-p)
- [Q](https://datacentertraining.us/learn/glossary.html#letter-q)
- [R](https://datacentertraining.us/learn/glossary.html#letter-r)
- [S](https://datacentertraining.us/learn/glossary.html#letter-s)
- [T](https://datacentertraining.us/learn/glossary.html#letter-t)
- [U](https://datacentertraining.us/learn/glossary.html#letter-u)
- [V](https://datacentertraining.us/learn/glossary.html#letter-v)
- [W](https://datacentertraining.us/learn/glossary.html#letter-w)

## 0-9

2N

A redundancy design with two complete, independent systems (A and B), each able to carry the full load alone. A failure or maintenance anywhere in one path leaves the other carrying the load. See [how data center power works](https://datacentertraining.us/learn/data-center-power.html).

2N+1

A [2N](https://datacentertraining.us/learn/glossary.html#term-2n) design with an additional spare unit, so the facility keeps full redundancy even while one component is out of service.

19-inch rack

The standard equipment rack defined by the EIA-310 standard, in which equipment front panels are 19 inches wide. Equipment height is measured in [rack units](https://datacentertraining.us/learn/glossary.html#term-rack-unit).

## A

A/B power feeds

Two independent power paths delivered to each rack, usually from separate UPS systems. [Dual-corded](https://datacentertraining.us/learn/glossary.html#term-dual-corded) equipment plugs into both, so each feed must be loaded lightly enough to carry the full load alone if the other is lost.

Access control

The systems and procedures that decide who can enter which spaces, and when. In data centers it usually layers badges, PINs, or biometrics with zones, logs, and escorts. See [security and compliance](https://datacentertraining.us/learn/data-center-security-compliance.html).

Adiabatic cooling

Lowering air temperature by evaporating water into it. Data centers often use it to pre-cool air entering dry coolers or condensers on hot days, trading some water use for lower energy use.

AHJ (Authority Having Jurisdiction)

The office or official responsible for enforcing a code and approving equipment, installations, or procedures, such as a building official, electrical inspector, or fire marshal. Their interpretation governs on site. See the [standards guide](https://datacentertraining.us/learn/data-center-standards.html).

Air-side economizer

A cooling mode that brings filtered outside air into the facility when outdoor conditions are cool and dry enough, reducing or replacing mechanical cooling. It requires careful control of humidity and air quality.

Aisle containment

Doors, roof panels, or curtains that enclose either the cold aisle or the hot aisle so supply and exhaust air do not mix. Containment improves cooling efficiency and lets supply air temperatures rise.

Anti-passback

An access control rule that rejects a badge used to enter an area again before it has been used to exit. It stops one badge from being passed back to let a second person in.

Arc flash

A release of energy from an electric arc through air between conductors or to ground. It produces intense heat, light, pressure, and molten metal, and can cause severe burns or death. See [data center safety](https://datacentertraining.us/learn/data-center-safety.html) and [Data Center Arc Flash Safety](https://datacentertraining.us/courses/data-center-arc-flash-safety.html).

Arc flash boundary

The distance from a potential arc source at which incident energy equals 1.2 cal/cm², the level associated with the onset of a second-degree burn on bare skin. Anyone inside it needs arc-rated PPE.

Arc-rated (AR) clothing

Clothing and PPE tested to resist ignition and limit heat transfer from an arc flash, labeled with an arc rating in cal/cm². The rating must meet or exceed the incident energy for the task.

ASHRAE

A professional society for heating, ventilation, air conditioning, and refrigeration. Its Technical Committee 9.9 publishes the thermal guidelines most data centers follow, with a recommended inlet range of 18-27 °C (64.4-80.6 °F) for most equipment classes.

Aspirating smoke detection

A detection system that continuously draws air samples through a pipe network to a highly sensitive detector, giving very early warning of smoke. VESDA is a widely known brand.

ATS (Automatic Transfer Switch)

A switch that automatically moves electrical load from the normal source, usually the utility, to an alternate source, usually a generator, when the normal source fails, and back when it returns. Most transfers involve a brief interruption that the UPS covers.

Availability

The percentage of time a system is running and able to serve its load, often expressed in “nines,” such as 99.99%. The [uptime calculator](https://datacentertraining.us/tools/uptime-calculator.html) converts availability into downtime.

Available fault current

The maximum current that could flow at a given point during a short circuit. Equipment must be rated to withstand and interrupt it, and it is a key input to [arc flash](https://datacentertraining.us/learn/glossary.html#term-arc-flash) studies.

## B

BACnet

A standard communication protocol for building automation and control networks, published as ASHRAE Standard 135. Many BMS controllers, chillers, and air handlers use it.

Battery string

A set of battery cells or blocks connected in series to reach the DC voltage a UPS needs. Large UPS systems often use several strings in parallel for capacity and redundancy.

BESS (Battery Energy Storage System)

A large battery installation that stores energy for later use, such as reducing peak demand, supporting the grid, or backing up a site. NFPA 855 covers stationary energy storage installations.

BICSI

A professional association for information and communications technology infrastructure. It publishes ANSI/BICSI 002, a data center design standard, and offers its own credentials, such as the RCDD.

Biometric authentication

Verifying identity with a physical trait, such as a fingerprint, iris, hand geometry, or face. Often combined with a badge for two-factor entry into secure areas.

Blanking panel

A plate that fills unused rack spaces so hot exhaust air cannot recirculate to the front of the rack. One of the cheapest and most effective airflow fixes.

BMS (Building Management System)

The control and monitoring system for mechanical and building equipment such as chillers, air handlers, pumps, and lighting. Also called a building automation system (BAS). It trends data, raises alarms, and runs control sequences. See [Monitoring, Automation & BMS Systems](https://datacentertraining.us/courses/monitoring-automation-bms-systems.html).

Branch circuit

The final circuit between the last overcurrent device and the outlets or equipment it serves, such as the circuit feeding a rack PDU.

BTU (British Thermal Unit)

The heat needed to raise one pound of water by one degree Fahrenheit. Cooling loads are often stated in BTU per hour, and 1 kW of IT load produces about 3,412 BTU/hr of heat.

Build-to-suit

A data center developed to a specific tenant's requirements, usually under a long-term lease. Common for large cloud and AI deployments.

Busway

A prefabricated enclosure of copper or aluminum bars that distributes power, often overhead, with plug-in tap-off boxes feeding racks. It is easier to reconfigure than individual cable runs.

Bypass airflow

Cool supply air that returns to the cooling units without passing through IT equipment, for example through cable cutouts or misplaced perforated tiles. It wastes fan energy and cooling capacity.

## C

Cable tray

An open support system, such as a ladder or wire basket, that carries power or data cables overhead or under a raised floor.

Cage

A locked, mesh-enclosed area inside a colocation data hall that holds one customer's racks.

Capacity planning

Forecasting demand for power, cooling, space, and network so capacity is added before it runs out, without overbuilding. See [Capacity Planning & Forecasting](https://datacentertraining.us/courses/capacity-planning-forecasting.html).

Carrier-neutral

A data center that lets customers connect to many telecommunications carriers and network providers, rather than only the provider that owns the building.

CCTV

Closed-circuit television: the cameras and recording systems that monitor perimeters, entrances, and data halls. Video retention periods are often set by contracts or audit requirements.

CDU (Coolant Distribution Unit)

Equipment that transfers heat from a liquid-cooled rack loop to the facility water system using a heat exchanger, pumps, filters, and controls. Central to direct-to-chip cooling. See [AI data centers](https://datacentertraining.us/learn/ai-data-centers.html).

CFD (Computational Fluid Dynamics)

Computer modeling of airflow and temperature in a data hall. Used to test layouts, find hot spots, and check what happens when a cooling unit fails.

Chain of custody

A documented record of who handled a piece of equipment or media, such as a failed drive, from removal through destruction. Many security frameworks and customer contracts require it.

Change management

The process for proposing, reviewing, approving, scheduling, and documenting changes to critical systems, so risky work happens deliberately and with a back-out plan. See [operations and maintenance](https://datacentertraining.us/learn/data-center-operations.html).

Chilled water

Water cooled by chillers and pumped to CRAHs, air handlers, or coolant distribution units to absorb heat. Warmer chilled water temperatures improve chiller efficiency and increase economizer hours.

Chiller

A machine that removes heat from water using a refrigeration cycle. Air-cooled chillers reject heat to outdoor air; water-cooled chillers reject it to condenser water and cooling towers.

Circuit breaker

A switching device that opens a circuit automatically on overload or short circuit and can also be operated manually. Large breakers in switchgear are controlled by trip units or protective relays.

Clean agent

An electrically nonconductive fire suppressant that leaves no residue, such as HFC-227ea (sold as FM-200), FK-5-1-12 (sold as Novec 1230 and others), or inert gases such as IG-541. NFPA 2001 covers these systems. See [Fire Suppression System Safety](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html).

CMMS (Computerized Maintenance Management System)

Software that schedules preventive maintenance and tracks work orders, assets, spare parts, and maintenance history.

Cold aisle

The aisle where rack fronts face each other and cool supply air is delivered to equipment inlets.

Cold plate

A metal plate with internal channels mounted directly on a processor or GPU. Coolant flowing through it carries the heat away. The core component of [direct-to-chip cooling](https://datacentertraining.us/learn/glossary.html#term-direct-to-chip-cooling).

Colocation

A business model in which a provider supplies space, power, cooling, security, and connectivity, and customers bring their own IT equipment. Sold by the rack, cage, suite, or hall.

Commissioning

A structured process that verifies systems are installed and perform as designed, commonly organized in levels from factory witness testing (L1) through integrated systems testing (L5). See [data center commissioning](https://datacentertraining.us/learn/data-center-commissioning.html).

Concurrent maintainability

The ability to take any component or distribution path out of service for planned maintenance without affecting the IT load. The defining feature of a [Tier III](https://datacentertraining.us/learn/glossary.html#term-tier-iii) facility.

Condenser water

The water loop that carries heat from water-cooled chillers to cooling towers, where it is rejected to the atmosphere.

Confined space

A space large enough to enter, with limited entry or exit, not designed for continuous occupancy. OSHA 29 CFR 1910.146 requires a permit program for confined spaces with serious hazards. See [Raised Floor and Confined Space Awareness](https://datacentertraining.us/courses/data-center-raised-floor-confined-space.html).

Cooling tower

An outdoor heat rejection device that cools condenser water by evaporating part of it. It consumes water and needs water treatment, including Legionella control.

CRAC (Computer Room Air Conditioner)

A computer room cooling unit with its own refrigeration compressor, typically a direct expansion (DX) system. Compare with a [CRAH](https://datacentertraining.us/learn/glossary.html#term-crah), which uses chilled water.

CRAH (Computer Room Air Handler)

A cooling unit that uses fans and a chilled water coil to cool data hall air. It has no compressor; the chiller plant does the refrigeration. See [how data center cooling works](https://datacentertraining.us/learn/data-center-cooling.html).

Critical load

The equipment that must stay powered without interruption, usually the IT equipment on UPS power plus any critical mechanical loads.

Cross-connect

A physical cable connection between two parties inside a data center, such as between a customer's cage and a carrier. Colocation providers usually charge a monthly fee for each one.

CUE (Carbon Usage Effectiveness)

A Green Grid metric of the carbon emissions caused by a data center's energy use, divided by IT equipment energy, usually expressed in kg CO2e per kWh.

## D

Dark fiber

Installed optical fiber that is not lit by a provider's equipment. The customer leases it and connects its own optics, controlling capacity end to end.

Data hall

A room in a data center that holds IT racks. Also called a computer room or [white space](https://datacentertraining.us/learn/glossary.html#term-white-space).

Day tank

A small fuel tank at or in a generator that feeds the engine directly and is refilled from larger bulk storage tanks.

DCiE (Data Center infrastructure Efficiency)

IT equipment energy divided by total facility energy, expressed as a percentage. It is the inverse of [PUE](https://datacentertraining.us/learn/glossary.html#term-pue), so a PUE of 1.5 equals a DCiE of about 67%.

DCIM (Data Center Infrastructure Management)

Software that tracks and monitors physical infrastructure: assets, rack space, power and cooling capacity, environmental sensors, and connectivity. It bridges IT and facilities data. See [DCIM Platform Fundamentals](https://datacentertraining.us/courses/dcim-platform-fundamentals.html).

Defense in depth

Layering security controls, such as perimeter fencing, building entry, mantraps, data hall access, and locked racks, so one failure does not expose critical assets.

Delta T

A temperature difference, such as between supply and return air or water. A healthy delta T across IT equipment and coils shows air or water is being used efficiently.

Demarc (demarcation point)

The point where a carrier's network responsibility ends and the customer's or building's begins.

Dew point

The temperature at which water vapor in air condenses. ASHRAE expresses data center humidity limits partly in dew point, and surfaces colder than it will collect condensation.

Direct-to-chip cooling

Liquid cooling that pumps coolant through cold plates mounted on processors and GPUs. It removes most of a server's heat at the source and is the most common approach for high-density AI racks.

Disaster recovery (DR)

The plans, systems, and procedures for restoring IT services after a major disruption, measured against [RTO](https://datacentertraining.us/learn/glossary.html#term-rto) and [RPO](https://datacentertraining.us/learn/glossary.html#term-rpo) targets. See [Disaster Recovery & Business Continuity](https://datacentertraining.us/courses/disaster-recovery-business-continuity.html).

Distributed redundancy

A design that spreads load across three or more power systems so any one can fail and the others absorb its share, without building a full 2N. Often written like 4N/3: four systems sharing a load that three could carry.

Diverse routing

Running redundant fiber or power paths along physically separate routes so a single cut or event cannot take out both.

Double conversion

The online UPS topology that converts incoming AC to DC and back to clean AC continuously, so the load sees no transfer when utility power fails. The standard for data center critical loads.

Dry cooler

An outdoor fan-and-coil heat exchanger that rejects heat from a water or glycol loop to the air without evaporating water. It saves water, but its capacity drops on hot days.

Dual-corded equipment

IT equipment with two power supplies, connected to separate A and B feeds so it keeps running if one feed fails.

DX (Direct Expansion)

A cooling system in which refrigerant evaporates directly in the air-cooling coil, as in most [CRAC](https://datacentertraining.us/learn/glossary.html#term-crac) units.

## E

Economizer

Any cooling mode that uses cool outdoor air or water to reduce or replace mechanical refrigeration. See [air-side](https://datacentertraining.us/learn/glossary.html#term-air-side-economizer) and [water-side](https://datacentertraining.us/learn/glossary.html#term-water-side-economizer) economizers.

Edge data center

A smaller facility placed close to users or devices to reduce latency, often unstaffed and monitored remotely.

Electrically safe work condition (ESWC)

A state in which equipment has been disconnected, locked and tagged out, tested for absence of voltage, and grounded where needed. NFPA 70E makes establishing it the preferred way to work on electrical equipment.

Energized electrical work permit

A written authorization required under NFPA 70E before justified work on energized equipment. It documents why the work cannot be de-energized, the hazards, the boundaries, and the PPE.

Entrance room

The space where carrier and campus cabling enters the data center and connects to the internal cabling system, as defined in ANSI/TIA-942.

EOP (Emergency Operating Procedure)

A pre-written procedure for responding to a specific failure or emergency, such as a UPS fault, chiller trip, or utility outage, so technicians act quickly and correctly under pressure.

EPA Section 608

The Clean Air Act section under which EPA regulates refrigerant handling. Technicians who open refrigerant systems need Section 608 certification from an EPA-approved certifying program. See [Cooling System and Refrigerant Safety](https://datacentertraining.us/courses/data-center-cooling-refrigerant-safety.html).

EPMS (Electrical Power Monitoring System)

Meters and software that monitor power quality, loads, breaker status, and events across switchgear, UPS systems, and distribution equipment.

EPO (Emergency Power Off)

A system that lets someone quickly shut off power to IT equipment in an emergency, usually through guarded buttons near room exits. Accidental activation is a known cause of outages. See [EPO Procedures](https://datacentertraining.us/courses/data-center-epo-procedures.html).

ERE (Energy Reuse Effectiveness)

A Green Grid metric that credits energy reused outside the data center, such as waste heat sent to a heating network. It equals total facility energy minus reused energy, divided by IT energy.

ESD (Electrostatic Discharge)

A sudden flow of static electricity that can damage electronic components. Wrist straps, grounded work surfaces, and humidity control reduce the risk.

Evaporative cooling

Cooling by evaporating water into air, either directly into the supply air or indirectly through a heat exchanger. It saves energy but consumes water.

## F

Facility rounds

Scheduled walk-throughs in which technicians check and record equipment readings, alarms, leaks, and conditions across the facility.

Facility water system (FWS)

In liquid cooling, the building-side water loop served by chillers, cooling towers, or dry coolers. A CDU connects it to the [technology cooling system](https://datacentertraining.us/learn/glossary.html#term-tcs).

Fault tolerance

The ability to withstand any single unplanned failure of a component or path without affecting the IT load. The defining feature of a [Tier IV](https://datacentertraining.us/learn/glossary.html#term-tier-iv) facility.

Firestop

Listed materials and systems that seal openings where cables or pipes pass through fire-rated walls and floors, preserving the fire rating.

FK-5-1-12

A clean agent fire suppressant, sold under names including Novec 1230, stored as a liquid and discharged as a gas. Systems are designed under NFPA 2001.

Flywheel UPS

A UPS that stores energy in a spinning rotor instead of batteries. It provides ride-through for seconds rather than minutes, so generators must start quickly.

FM-200 (HFC-227ea)

A widely used clean agent fire suppressant, heptafluoropropane. As a hydrofluorocarbon, it is subject to HFC phase-down rules.

Free cooling

Cooling with little or no compressor energy by using cool outdoor air or water, typically through an [economizer](https://datacentertraining.us/learn/glossary.html#term-economizer).

Fuel polishing

Filtering and conditioning stored diesel fuel to remove water, sediment, and microbial growth so generators get clean fuel.

## G

Generator (standby)

An engine-driven alternator, usually diesel, that carries the facility through utility outages after the UPS bridges the start-up. NFPA 110 covers testing and maintenance. See [Generator Fundamentals](https://datacentertraining.us/courses/generator-fundamentals.html).

Glycol

Ethylene or propylene glycol mixed with water to lower the freezing point of cooling loops exposed to cold weather. It reduces heat transfer somewhat and must be tested and maintained.

GPU (Graphics Processing Unit)

A processor with thousands of parallel cores, now the main engine of AI training and inference. GPU servers draw far more power per rack than traditional servers. See [AI data centers](https://datacentertraining.us/learn/ai-data-centers.html).

Gray space

The back-of-house areas that hold support infrastructure, such as electrical rooms, UPS and battery rooms, mechanical plants, and generator yards.

Grounding and bonding

Grounding connects electrical systems to the earth; bonding connects metal parts so they stay at the same potential. Together they let protective devices clear faults and reduce shock hazards.

GWP (Global Warming Potential)

A measure of how much heat a gas traps compared with carbon dioxide over a set period. Refrigerant and fire suppressant choices increasingly hinge on low GWP.

## H

Harmonics

Currents or voltages at multiples of the fundamental frequency, created by non-linear loads such as power supplies and drives. They add heat to transformers and neutral conductors and can upset sensitive equipment.

HazCom (Hazard Communication)

The OSHA standard, 29 CFR 1910.1200, that requires labels, Safety Data Sheets, and training for hazardous chemicals such as battery electrolyte, diesel fuel, refrigerants, and coolants.

HDA (Horizontal Distribution Area)

In ANSI/TIA-942, the space where horizontal cabling to equipment racks is distributed, often serving a row or zone of the data hall.

Heat reuse

Capturing waste heat from a data center for another purpose, such as heating nearby buildings. Liquid cooling makes it easier because heat leaves at higher temperatures.

High density

Racks or rooms with power and heat loads above what conventional air cooling handles easily. Traditional enterprise racks commonly draw single-digit kilowatts; AI training racks commonly draw tens of kilowatts.

Hot aisle

The aisle where rack backs face each other and hot exhaust air collects before returning to the cooling units.

Hot spot

A location where equipment inlet temperatures run above the intended range, often caused by recirculation, blocked airflow, or a local overload.

Hot work permit

Authorization required before welding, cutting, brazing, or other spark-producing work, with precautions such as a fire watch and coordination with the fire alarm and suppression systems.

HVAC

Heating, ventilation, and air conditioning: the mechanical systems that control temperature, humidity, and air quality.

Hyperscale data center

A very large facility or campus built and operated by a major cloud or internet company to run its own services at massive scale.

## I

Immersion cooling

Cooling servers by submerging them in a dielectric fluid. In single-phase systems the fluid stays liquid; in two-phase systems it boils off hot components and condenses on a coil.

Incident energy

The thermal energy an arc flash could deliver to a surface at a given working distance, measured in cal/cm². Arc flash studies calculate it, commonly with the IEEE 1584 method, to select PPE.

Incident management

Detecting, responding to, escalating, and resolving events that affect or threaten operations, followed by documentation and [root cause analysis](https://datacentertraining.us/learn/glossary.html#term-root-cause-analysis). See [Incident Response & Troubleshooting](https://datacentertraining.us/courses/incident-response-troubleshooting.html).

Inert gas agent

A clean agent made of naturally occurring gases, such as IG-541 (Inergen), IG-55, or IG-100 (nitrogen), that suppresses fire by lowering oxygen concentration. Protected rooms need pressure relief venting and clear evacuation procedures.

Infrared thermography

Using a thermal camera to find hot connections, overloaded circuits, and failing components without contact. A routine part of electrical maintenance.

In-row cooling

Cooling units placed between racks within a row, close to the heat source, rather than at the room perimeter.

Internet exchange (IX)

A shared switching platform where networks connect and exchange traffic directly with each other, often hosted in carrier-neutral data centers.

Inverter

The UPS stage that converts DC power from the rectifier or batteries into conditioned AC power for the load.

ISO/IEC 27001

The international standard for information security management systems. Annex A of the 2022 edition includes physical security controls, and certification is issued by accredited certification bodies.

IST (Integrated Systems Testing)

The final level of commissioning, which tests all systems together under realistic conditions, including utility and component failures, often with load banks in place of IT equipment.

IT load

The power drawn by IT equipment such as servers, storage, and network gear. It is the denominator in [PUE](https://datacentertraining.us/learn/glossary.html#term-pue).

## J

JHA (Job Hazard Analysis)

A step-by-step review of a task to identify its hazards and controls before work begins. Also called a job safety analysis (JSA).

## K

kVA (kilovolt-ampere)

A unit of apparent power, the product of voltage and current. UPS systems, generators, and transformers are often rated in kVA, while loads are measured in kW.

kW (kilowatt)

A unit of real power, the rate at which energy is used. Rack and IT loads are usually stated in kW.

kWh (kilowatt-hour)

A unit of energy: one kilowatt used for one hour. Utility bills and PUE calculations use energy in kWh, not instantaneous kW.

## L

Latency

The time it takes data to travel between two points, usually measured in milliseconds. Distance, routing, and equipment all add to it.

Leak detection

Cable or spot sensors that alarm when they sense water or coolant under raised floors, near cooling units, or along liquid cooling piping.

Limited approach boundary

An NFPA 70E shock protection boundary around exposed energized parts. Unqualified persons may cross it only when continuously escorted and advised by a qualified person.

Liquid cooling

Any cooling method that brings liquid to or very close to the heat source, such as direct-to-chip cold plates, rear-door heat exchangers, or immersion.

Lithium-ion battery

A battery chemistry increasingly used in UPS systems because it is smaller, lighter, and longer-lived than lead-acid. It carries a risk of [thermal runaway](https://datacentertraining.us/learn/glossary.html#term-thermal-runaway). See [Lithium-Ion Thermal Runaway](https://datacentertraining.us/courses/lithium-ion-thermal-runaway-emergency-response.html).

Load bank

A portable or permanent device that applies an artificial electrical load, and its heat, to test generators, UPS systems, and cooling before or without real IT load.

LOTO (Lockout/Tagout)

Procedures that isolate energy sources and secure them with locks and tags so equipment cannot be energized while someone works on it. Required by OSHA 29 CFR 1910.147, with electrical work also covered by Subpart S. See [data center safety](https://datacentertraining.us/learn/data-center-safety.html).

## M

Maintenance bypass

Manually operated breakers that route power around a UPS so it can be fully isolated for service. The load is unprotected while on bypass, so switching follows a written procedure.

Mantrap

A small entry vestibule with two interlocked doors, only one of which can open at a time, used to prevent tailgating and verify identity. Also called a security vestibule.

MDA (Main Distribution Area)

In ANSI/TIA-942, the central space that holds the main cross-connect and usually the core routers and switches.

Medium voltage

Distribution voltages above 1,000 V, commonly up to about 35 kV, used for utility service and campus distribution in large data centers.

Meet-me room (MMR)

A secure room where carriers and customers interconnect their networks through cross-connects. The heart of a carrier-neutral facility.

Modbus

A simple, widely used industrial communication protocol for reading meters, UPS systems, generators, and other equipment into BMS and EPMS platforms.

Modular data center

A data center built from prefabricated, factory-tested modules, such as power skids, cooling modules, or complete IT pods, to speed construction and scale in steps.

MOP (Method of Procedure)

A written, step-by-step procedure for a specific task on critical equipment, with prerequisites, hold points, verification steps, and a back-out plan. It is reviewed and approved through change management. See [operations and maintenance](https://datacentertraining.us/learn/data-center-operations.html).

MPO connector

A multi-fiber push-on connector that terminates many fibers in a single ferrule. Used for high-speed links and dense trunk cabling.

MTBF (Mean Time Between Failures)

The average operating time between failures of a repairable component or system. A statistical measure, not a promise for any single unit.

MTTR (Mean Time To Repair)

The average time to restore a failed component or system to service. Good spares, procedures, and training lower it.

Multimode fiber

Optical fiber with a larger core that carries multiple light paths. Its optics cost less, but distances are shorter, so it is common inside data halls.

## N

N

The amount of capacity needed to carry the load, with no spare. Redundancy is described relative to it, as in [N+1](https://datacentertraining.us/learn/glossary.html#term-n-plus-1) or [2N](https://datacentertraining.us/learn/glossary.html#term-2n).

N+1

A redundancy level with one more unit than the load needs, such as five UPS modules where four would carry the load. It covers a single unit's failure or maintenance, but usually shares one distribution path.

NEC (National Electrical Code)

NFPA 70, the model code for electrical installations in the United States. It becomes law where states and localities adopt it. Article 645 has provisions for information technology equipment rooms.

NFPA 70E

The NFPA standard for electrical safety in the workplace, covering electrically safe work conditions, risk assessment, approach boundaries, arc flash PPE, and training. See [Electrical Safety & Best Practices](https://datacentertraining.us/courses/electrical-safety-best-practices.html).

NOC (Network Operations Center)

A staffed center that monitors networks, systems, and often facility alarms around the clock, and coordinates the response to incidents.

## O

Open Compute Project (OCP)

An industry organization that publishes open hardware designs for servers, racks, and power, including rack designs that distribute DC power on busbars.

Operational Sustainability

Uptime Institute's standard for the staffing, maintenance, training, and management practices that keep a facility performing to its Tier over time. It is certified separately from design and construction.

OSHA

The U.S. Occupational Safety and Health Administration, which sets and enforces workplace safety rules such as 29 CFR 1910 Subpart S (electrical), 1910.147 (lockout/tagout), and 1910.146 (confined spaces).

OTDR (Optical Time-Domain Reflectometer)

A test instrument that sends light pulses down a fiber and measures what reflects back, to locate breaks, splices, connectors, and loss along the link.

## P

Paralleling switchgear

Switchgear that synchronizes multiple generators onto a common bus so they share the load and back each other up.

Patch panel

A panel of ports where permanent cabling terminates, so connections can be changed with short patch cords instead of new cable runs.

PCI DSS

The Payment Card Industry Data Security Standard. Its Requirement 9 restricts physical access to cardholder data, which affects facilities hosting payment systems.

PDU (Power Distribution Unit)

Equipment that distributes power to IT racks. A floor-standing PDU usually contains a transformer that steps 480 V down to rack voltage plus panelboards; a [rack PDU](https://datacentertraining.us/learn/glossary.html#term-rack-pdu) is the power strip inside the rack.

Peering

Two networks exchanging traffic directly, often without payment, rather than through a transit provider. It usually happens at internet exchanges or over cross-connects.

Plenum

An air space used for air distribution, such as the space under a raised floor or above a ceiling. Cables in plenums must meet stricter fire ratings.

Point of presence (PoP)

A location where a network provider has equipment and offers connections to customers.

Power factor

The ratio of real power (kW) to apparent power (kVA). Modern IT power supplies run close to 1.0, which affects how UPS and generator capacity is sized.

Powered shell

A building delivered with utility power and basic infrastructure in place but without the data hall fit-out, which the tenant completes.

PPA (Power Purchase Agreement)

A long-term contract to buy electricity, often tied to a specific wind or solar project, used by data center operators to source renewable energy.

PPE (Personal Protective Equipment)

Equipment worn to reduce exposure to hazards, such as arc-rated clothing, voltage-rated gloves, safety glasses, and hearing protection. OSHA 29 CFR 1910.132 sets the general requirements.

Pre-action sprinkler system

A sprinkler system with dry piping that fills with water only after a detection system activates; in double-interlock designs, water flows only when a sprinkler head also opens. Common in data halls to reduce accidental water release.

Predictive maintenance

Maintenance triggered by condition data, such as vibration, oil analysis, thermography, or battery impedance trends, rather than a fixed calendar.

Preventive maintenance (PM)

Scheduled inspection, testing, and servicing to prevent failures, based on manufacturer recommendations, standards such as NFPA 70B, and site history. See [Preventive Maintenance Planning](https://datacentertraining.us/courses/preventive-maintenance-planning.html).

PUE (Power Usage Effectiveness)

Total facility energy divided by IT equipment energy. A PUE of 1.0 would mean every kilowatt-hour goes to IT; real facilities run higher. Try the [PUE calculator](https://datacentertraining.us/tools/pue-calculator.html) or read the [energy efficiency guide](https://datacentertraining.us/learn/energy-efficiency-pue.html).

## Q

Qualified person

Under OSHA and NFPA 70E, a person with the skills, knowledge, and safety training to recognize and avoid the hazards of specific equipment and tasks. The employer makes that determination; no course alone makes someone qualified.

## R

Rack PDU

A power strip mounted in a rack that feeds IT equipment, often with metering, outlet switching, and network monitoring.

Rack unit (U)

The standard unit of rack height, 1.75 inches (44.45 mm). A 2U server is 3.5 inches tall, and full-height racks are commonly 42U or more.

Raised floor

A floor of removable tiles on pedestals above the structural slab. The space beneath can serve as a cool-air plenum and route cables and piping.

Rear-door heat exchanger (RDHx)

A water-cooled coil that replaces a rack's rear door and removes heat from exhaust air before it enters the room. Passive versions rely on server fans; active versions add their own.

Rectifier

The UPS stage that converts incoming AC power to DC to charge the batteries and feed the inverter.

Redundancy

Extra components or paths beyond what the load needs, so failures or maintenance do not interrupt service. Described with notation such as [N+1](https://datacentertraining.us/learn/glossary.html#term-n-plus-1) and [2N](https://datacentertraining.us/learn/glossary.html#term-2n).

Refrigerant

The working fluid in a vapor-compression cooling cycle. EPA regulates its handling under Section 608, and many refrigerants are being phased down because of their global warming potential.

Relative humidity (RH)

The moisture in air compared with the maximum it could hold at that temperature, as a percentage. Very dry air raises static risk; very humid air risks condensation.

Remote hands

On-site technical services a colocation provider performs on request, such as rebooting servers, reseating cables, or swapping drives. More skilled versions are often called smart hands.

Restricted approach boundary

The NFPA 70E shock protection boundary closest to exposed energized parts, where the likelihood of shock is increased. Only qualified persons using shock protection techniques and PPE may cross it.

Retail colocation

Leasing smaller amounts of space and power, such as individual racks or cages, usually with shorter terms and more provider services. Compare with [wholesale colocation](https://datacentertraining.us/learn/glossary.html#term-wholesale-colocation).

Return air

Warm air flowing from the IT equipment back to the cooling units.

Ride-through

How long equipment or a facility can keep operating through a disturbance, such as UPS battery runtime or how long servers stay within temperature limits after cooling stops.

Room integrity test

A door fan test that measures how well a room protected by a clean agent system will hold the agent after discharge. Commonly performed at acceptance and after changes to the room.

Root cause analysis (RCA)

A structured investigation that finds the underlying causes of an incident, not just the immediate trigger, and sets corrective actions to prevent a repeat.

RPO (Recovery Point Objective)

The maximum acceptable data loss after a disruption, measured in time. An RPO of one hour means data must be backed up or replicated at least hourly.

RPP (Remote Power Panel)

A cabinet of branch circuit breakers fed from a PDU and placed near the racks it serves, extending power distribution closer to the rows.

RTO (Recovery Time Objective)

The maximum acceptable time to restore a service after a disruption. It drives disaster recovery design and cost.

## S

Safety Data Sheet (SDS)

A standardized document from a chemical's manufacturer describing its hazards, safe handling, PPE, and emergency measures. Required under OSHA's [hazard communication](https://datacentertraining.us/learn/glossary.html#term-hazcom) standard.

Scope 2 emissions

Greenhouse gas emissions from generating the electricity, heat, or steam an organization buys. For most data centers, purchased electricity makes Scope 2 the largest share of operational emissions.

Selective coordination

Choosing and setting protective devices so that only the device nearest a fault opens, leaving the rest of the system energized.

Single point of failure (SPOF)

Any component or path whose failure would interrupt the IT load. Eliminating them is the goal of redundant design.

Single-mode fiber

Optical fiber with a very small core that carries a single light path, supporting long distances and high bandwidth. Used for campus and metro links and increasingly inside data halls.

SLA (Service Level Agreement)

The contract terms that define a provider's commitments, such as power availability, temperature range, and response times, and the credits owed if they are missed.

SNMP (Simple Network Management Protocol)

A protocol for monitoring and managing network-connected devices. UPS systems, rack PDUs, and sensors often report to DCIM through SNMP.

SOC 2

An attestation report, issued by an independent CPA firm under AICPA standards, on controls relevant to the Trust Services Criteria: security, availability, processing integrity, confidentiality, and privacy. Type 2 reports test controls over a period of time.

SOP (Standard Operating Procedure)

A written procedure for a routine task, such as facility rounds or generator testing. Compare with a [MOP](https://datacentertraining.us/learn/glossary.html#term-mop) for specific changes and an [EOP](https://datacentertraining.us/learn/glossary.html#term-eop) for emergencies.

SPCC plan

A Spill Prevention, Control, and Countermeasure plan required by EPA under 40 CFR 112 for facilities that store oil, including diesel fuel, above set thresholds. See [Facility Environmental Compliance](https://datacentertraining.us/courses/facility-environmental-compliance.html).

Spine-leaf architecture

A data center network design in which every leaf (access) switch connects to every spine switch, giving predictable latency and simple scaling.

Static bypass

An automatic electronic switch inside a UPS that transfers the load directly to the bypass source if the UPS has a fault or overload.

Step load

A sudden increase or decrease in load. Generators and UPS systems are rated for how large a step they can accept while holding voltage and frequency.

Stranded capacity

Power, cooling, or space that exists but cannot be used, for example a rack position with power but no cooling, or cooling but no floor space.

Structured cabling

A standards-based cabling system of backbone and horizontal cabling, patch panels, and pathways, as described in ANSI/TIA-942 and related standards. See [Fiber Optics & Network Cabling](https://datacentertraining.us/courses/fiber-optics-network-cabling.html).

STS (Static Transfer Switch)

A solid-state switch that moves a load between two independent power sources within milliseconds, fast enough that single-corded equipment rides through.

Substation

A facility that transforms voltage between transmission and distribution levels and switches circuits. Large campuses often have dedicated utility substations.

Supply air

Cooled air delivered from the cooling units to equipment inlets.

Surge protective device (SPD)

A device that limits transient overvoltages, such as from lightning or switching, by diverting surge current to ground.

Switchgear

Assemblies of circuit breakers, relays, and switches that control, protect, and isolate electrical equipment. It holds large amounts of energy, so switching follows written procedures.

## T

Tailgating

Following an authorized person through a secure door without badging in. Mantraps, anti-passback rules, and staff awareness counter it.

TCO (Total Cost of Ownership)

The full cost of an asset over its life, including purchase, installation, energy, maintenance, and disposal. Used to compare design options.

Technology cooling system (TCS)

In liquid cooling, the secondary loop that circulates treated coolant through rack manifolds and cold plates. A CDU separates it from the [facility water system](https://datacentertraining.us/learn/glossary.html#term-fws).

Thermal runaway

An uncontrolled, self-heating reaction in a battery cell that can spread to neighboring cells and cause fire or the release of flammable and toxic gases. A key lithium-ion risk.

Three-phase power

AC power delivered on three conductors with voltages offset by 120 degrees. It moves more power with less conductor material than single-phase and is standard for data center distribution.

TIA-942

ANSI/TIA-942, the Telecommunications Industry Association standard for data center infrastructure, covering spaces, cabling, and facility systems, with ratings from Rated-1 to Rated-4.

Tier I

Uptime Institute's basic capacity level: dedicated site infrastructure with a single path for power and cooling and no redundant components. Planned maintenance requires a shutdown.

Tier II

Uptime Institute's redundant capacity components level: a single distribution path, but with redundant components such as extra UPS modules, chillers, or generators.

Tier III

Uptime Institute's concurrently maintainable level: redundant components and multiple distribution paths, so any component can be removed for planned maintenance without affecting IT. A “Tier III” claim without Uptime certification describes design intent. See [Tier levels explained](https://datacentertraining.us/learn/data-center-tiers.html).

Tier IV

Uptime Institute's fault tolerant level: concurrently maintainable and able to withstand any single unplanned failure without affecting IT, with independent, physically separated paths.

Ton of refrigeration

A unit of cooling capacity equal to 12,000 BTU/hr, or about 3.517 kW of heat removal. Try the [cooling load calculator](https://datacentertraining.us/tools/cooling-load-calculator.html).

Top-of-rack (ToR) switch

A network switch mounted in each rack that connects the servers in that rack, with uplinks to aggregation or spine switches.

Transceiver

A pluggable optical or electrical module, such as an SFP or QSFP, that converts signals between a switch port and the cable.

Transformer

A device that changes AC voltage from one level to another, such as stepping medium-voltage utility power down to 480 V, or 480 V down to rack voltage in a PDU.

## U

UPS (Uninterruptible Power Supply)

Equipment that conditions power and carries the IT load from stored energy, usually batteries, during the seconds to minutes before generators take over. See [how data center power works](https://datacentertraining.us/learn/data-center-power.html) and [UPS Systems Fundamentals](https://datacentertraining.us/courses/ups-systems-fundamentals.html).

Uptime Institute

An organization known for its Tier Classification System and Tier Certification of data center designs, constructed facilities, and operations, and for industry research such as its annual global survey.

Utility feed

The incoming power service from the electric utility. Critical sites often take two feeds from separate substations or circuits.

## V

VFD (Variable Frequency Drive)

A motor controller that varies the speed of fans and pumps by changing the supply frequency. Because fan and pump power drops steeply with speed, VFDs are a major efficiency tool.

VRLA battery

A valve-regulated lead-acid battery: a sealed lead-acid design that was long the default for UPS systems. It needs temperature control, regular monitoring, and periodic replacement.

## W

Water-side economizer

A cooling mode that uses cooling towers or dry coolers to chill water through a heat exchanger when outdoor conditions allow, bypassing or assisting the chillers.

Wet stacking

Unburned fuel and carbon building up in a diesel engine's exhaust when it runs lightly loaded for long periods. Load-bank testing helps prevent it.

White space

The area of a data center where IT equipment is installed, as opposed to the [gray space](https://datacentertraining.us/learn/glossary.html#term-gray-space) that holds support infrastructure.

Wholesale colocation

Leasing large blocks of data center capacity, such as a whole hall or building, usually to a single large tenant under a long-term contract. Compare with [retail colocation](https://datacentertraining.us/learn/glossary.html#term-retail-colocation).

Work order

A documented request or assignment for maintenance work, tracked in a [CMMS](https://datacentertraining.us/learn/glossary.html#term-cmms) from creation through completion and sign-off.

WUE (Water Usage Effectiveness)

A Green Grid metric of water use: liters of site water consumed per kWh of IT energy. Evaporative cooling raises WUE; dry cooling lowers it.

These definitions are general educational information, not engineering, legal, or compliance advice. Follow your site's procedures, the equipment manufacturer's instructions, and the codes adopted in your jurisdiction.

## Courses that cover these terms

Turn vocabulary into job skills with self-paced, standards-aligned courses. Each awards a certificate of completion.

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

### [Data Center Operations Management](https://datacentertraining.us/courses/data-center-operations-management.html)

Operations · Comprehensive Program · DCIM / SLA Frameworks

Run daily operations like the teams behind Tier 3/4 facilities — maintenance, incident response, and SLAs.

8 hrs

$325.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-operations-management)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-operations-management)

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

### [Electrical Safety & Best Practices](https://datacentertraining.us/courses/electrical-safety-best-practices.html)

Power & Electrical · Modular Specialization · NFPA 70E

NFPA 70E-aligned electrical safety fundamentals for facility staff.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=electrical-safety-best-practices)
- [Add to Cart](https://datacentertraining.us/cart.html?add=electrical-safety-best-practices)

### [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html)

Security & Compliance · Comprehensive Program · SOC 2 / ISO 27001

Build a facility security program that satisfies SOC 2, ISO 27001, and physical audit requirements.

16 hrs

$291.99

- [Enroll](https://datacentertraining.us/checkout.html?item=security-compliance-data-centers)
- [Add to Cart](https://datacentertraining.us/cart.html?add=security-compliance-data-centers)

### [Monitoring, Automation & BMS Systems](https://datacentertraining.us/courses/monitoring-automation-bms-systems.html)

Monitoring & Automation · Comprehensive Program · BMS / DCIM

Design a monitoring and BMS strategy that catches problems before they cause downtime.

8 hrs

$276.99

- [Enroll](https://datacentertraining.us/checkout.html?item=monitoring-automation-bms-systems)
- [Add to Cart](https://datacentertraining.us/cart.html?add=monitoring-automation-bms-systems)

Save 52% with the bundle

Complete Data Center Professional Bundle

43 courses · 192 hours · **$2,928.99** per seat, instead of ~~$6,067.57~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-complete-catalog)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Keep learning

See the terms in context, or test what you know.

### [What Is a Data Center?](https://datacentertraining.us/learn/what-is-a-data-center.html)

How the building, power, cooling, and network fit together.

Read the guide →

### [How Data Center Power Works](https://datacentertraining.us/learn/data-center-power.html)

UPS, ATS, STS, PDU, and generators in one chain.

Read the guide →

### [How Data Center Cooling Works](https://datacentertraining.us/learn/data-center-cooling.html)

CRAHs, chillers, containment, and economizers explained.

Read the guide →

### [Standards & Regulations](https://datacentertraining.us/learn/data-center-standards.html)

TIA-942, NFPA, OSHA, ASHRAE, and ISO, sorted by topic.

Read the guide →

### [Data Center Basics Quiz](https://datacentertraining.us/quizzes/data-center-basics-quiz.html)

Check how much of this vocabulary has stuck.

Take the quiz →

### [Data Center Careers](https://datacentertraining.us/careers/)

The roles that use these terms every shift.

Explore careers →

## Learn the Systems Behind the Terms

The Complete Data Center Professional Bundle covers power, cooling, safety, security, design, and operations, with a certificate of completion for every course.

- [See the Complete Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/glossary.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
