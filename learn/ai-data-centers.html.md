# AI Data Centers: What High-Density Computing Changes for Facility Teams

Knowledge Center · AI & High Density

GPU clusters for AI pack far more power into each rack than the servers most facilities were built for. Here is what that changes in power, cooling, structure, safety, and daily operations, and what technicians should learn next.

12 min read Intermediate Updated October 2026

On this page

1. [Why AI clusters are different](https://datacentertraining.us/learn/ai-data-centers.html#why-different)
2. [Power impacts](https://datacentertraining.us/learn/ai-data-centers.html#power)
3. [Cooling: air to liquid](https://datacentertraining.us/learn/ai-data-centers.html#cooling)
4. [Water quality and leaks](https://datacentertraining.us/learn/ai-data-centers.html#water-leaks)
5. [Structural load](https://datacentertraining.us/learn/ai-data-centers.html#structural)
6. [Commissioning liquid systems](https://datacentertraining.us/learn/ai-data-centers.html#commissioning)
7. [Operations and safety](https://datacentertraining.us/learn/ai-data-centers.html#operations)
8. [Grid and site selection](https://datacentertraining.us/learn/ai-data-centers.html#grid)
9. [Skills to learn](https://datacentertraining.us/learn/ai-data-centers.html#skills)
10. [Courses](https://datacentertraining.us/learn/ai-data-centers.html#courses)
11. [FAQ](https://datacentertraining.us/learn/ai-data-centers.html#faq)

[**Test yourself**Take the Data Center Cooling quiz.](https://datacentertraining.us/quizzes/cooling-quiz.html)

Key takeaways

- Traditional enterprise racks commonly draw single-digit kilowatts. AI training racks commonly draw tens of kilowatts, and some current GPU systems exceed 100 kW per rack.
- At those densities air cooling runs out of room. Direct-to-chip liquid cooling with coolant distribution units (CDUs) is becoming the norm.
- Power systems get bigger feeds, higher distribution voltages, more fault current, and fast load swings from synchronized training jobs.
- Liquid in the white space brings new work: water chemistry, leak detection, pressure testing, and new commissioning and safety procedures.

## Why AI clusters are different

A traditional enterprise rack holds general-purpose servers, storage, and network gear, and commonly draws power in the single-digit kilowatt range. Many existing data halls were designed around that number: raised floors, perimeter cooling units, and containment sized for a few kilowatts per rack.

AI racks are filled with servers built around graphics processing units (GPUs) or other accelerators. A single eight-GPU server can draw as much power as an entire rack of traditional servers. A full AI training rack commonly draws tens of kilowatts, and some current rack-scale GPU systems exceed 100 kW per rack.

Two other traits matter. GPUs in a training job exchange data constantly, so racks sit close together to keep network links short; you cannot spread the load across a half-empty hall. And those GPUs work in lockstep, so power draw rises and falls together across the cluster.

**Traditional enterprise racks vs. AI training racks**

| Factor | Traditional enterprise rack | AI training rack |
| --- | --- | --- |
| Typical power | Single-digit kW | Tens of kW; some current systems above 100 kW |
| Primary cooling | Room air with aisle containment | Direct-to-chip liquid plus supplemental air or rear-door coils |
| Power delivery | Branch circuits from PDUs and remote power panels | Higher-voltage three-phase circuits, overhead busway, rack power shelves |
| Weight | Standard cabinet loads | Much heavier: dense hardware, busbars, manifolds, coolant |
| Load profile | Steady; thousands of workloads average out | Large, fast swings tied to the training job |

New to how a facility fits together? [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html) covers the building blocks before density changes them.

## Power impacts: bigger feeds, higher voltages, faster swings

Packing this much power into a rack changes every link in the chain described in [how data center power works](https://datacentertraining.us/learn/data-center-power.html).

### Distribution at higher power

Delivering 100 kW to a rack at 208 V three-phase takes roughly 280 amps. Raising the voltage cuts the current for the same power, which shrinks conductors and losses. That is why AI halls favor 415/240 V three-phase distribution in North America, overhead **busway** with plug-in tap-off boxes, and in some designs 48 V DC busbars inside the rack in the style of Open Compute Project hardware. Upstream, bigger halls need larger utility services, transformers, and switchgear, and long equipment lead times now shape project schedules.

### Fault current and arc flash energy

Larger transformers and short, heavy conductors raise the **available fault current** at busway and rack-level equipment. Depending on how quickly protective devices clear a fault, that can raise arc flash incident energy at equipment technicians open every day. Any change to transformers, busway, or protective device settings means the short-circuit, coordination, and arc flash studies must be updated, usually with the IEEE 1584 calculation method, and new labels posted. [Data Center Arc Flash Safety](https://datacentertraining.us/courses/data-center-arc-flash-safety.html) explains how to read those labels and boundaries.

### Power swings from synchronized workloads

In a training cluster, a job that starts, stops, or pauses to save a checkpoint can swing the load by a large share of the hall's capacity in a very short time. UPS systems see rapid, repeated load changes, and generators must accept large step loads without excessive voltage or frequency dips, which affects sizing, paralleling, and governor tuning. Utilities care too, because large oscillating loads can affect grid stability. Mitigations include GPU power capping and smoothing, energy storage that absorbs the swings, and equipment chosen for step-load performance.

### Redundancy choices

Training jobs save checkpoints and can restart after an interruption, so some operators build training halls with less redundancy than a traditional 2N enterprise room, while inference serving live customers gets the full treatment. That changes what technicians maintain and how outages are planned. The [Tier levels guide](https://datacentertraining.us/learn/data-center-tiers.html) explains the trade-offs.

## Cooling: from moving air to moving liquid

Every watt the IT equipment draws becomes heat, as the [cooling guide](https://datacentertraining.us/learn/data-center-cooling.html) explains. Air is a poor carrier of heat, so cooling with air means moving enormous volumes of it. As densities climb into the tens of kilowatts, the fans and airflow needed become impractical, loud, and power-hungry.

Why liquid wins

For the same temperature rise, a given volume of water carries roughly 3,500 times as much heat as the same volume of air. A small pipe can do the work of a very large duct.

### Rear-door heat exchangers

A **rear-door heat exchanger (RDHx)** replaces a rack's back door with a water coil, so exhaust air leaves close to room temperature. Passive doors rely on server fans; active doors add their own. Because no plumbing touches the servers, rear doors are a common way to add density to an existing air-cooled hall.

### Direct-to-chip liquid cooling

**Direct-to-chip** cooling pumps coolant through **cold plates** mounted on GPUs, CPUs, and sometimes memory and voltage regulators. Most single-phase systems use treated water or a water and propylene glycol mix; two-phase systems use a dielectric fluid that boils inside the cold plate. Cold plates remove most, but not all, of a server's heat, so the room still needs a working air system.

### Coolant distribution units and the two loops

Liquid-cooled racks almost never connect straight to building chilled water. A **coolant distribution unit (CDU)** sits between them, and ASHRAE's liquid cooling guidance names the two loops it separates:

- **Facility water system (FWS):** the building side, served by chillers, cooling towers, or dry coolers. Larger volumes and less strict chemistry.
- **Technology cooling system (TCS):** the secondary loop through rack manifolds and cold plates. Small passages, tight water quality, controlled temperature and pressure.

A CDU holds a liquid-to-liquid heat exchanger, redundant pumps, filtration, an expansion tank, sensors, and controls that hold TCS supply temperature and pressure. CDUs come in-rack, in-row, or as floor-standing units serving many racks. Because cold plates work well with warm coolant, facility water can often run much warmer than traditional chilled water, allowing more economizer hours and less chiller energy, as the [energy efficiency guide](https://datacentertraining.us/learn/energy-efficiency-pue.html) explains.

### Immersion cooling

**Immersion cooling** submerges servers in a dielectric fluid. In single-phase systems the fluid stays liquid and is pumped through a heat exchanger; in two-phase systems it boils off hot components and condenses on a coil above the tank. Immersion handles very high densities and removes almost all server fan power, but it needs compatible hardware, new handling procedures, and fluid management, and some two-phase fluids are fluorinated chemicals under growing environmental scrutiny.

**High-density cooling approaches compared**

| Approach | How heat leaves | Typical fit | Watch for |
| --- | --- | --- | --- |
| Air with containment | Fans push air through servers to room cooling units | Traditional and moderate densities | Fan power, noise, hot spots |
| Rear-door heat exchanger | A water coil cools exhaust air at the rack | Adding density to existing rooms | Water at the rack, coil upkeep |
| Direct-to-chip | Coolant in cold plates carries heat to a CDU | Most new AI training deployments | Water quality, leaks, residual air load |
| Immersion | Dielectric fluid carries heat away | Very high density, specialty sites | Hardware compatibility, fluid handling |

[Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html) walks through air and liquid approaches, including direct-to-chip, rear-door, and immersion designs.

**Sizing cooling for a dense row?** Convert IT kilowatts into BTU per hour and tons of cooling in seconds.

[Try the Cooling Load Calculator](https://datacentertraining.us/tools/cooling-load-calculator.html)

## Living with liquid: water quality and leak detection

Cold plates have narrow internal channels, so TCS water quality is not optional. Particles clog channels, corrosion fouls surfaces, and biological growth blocks flow. A sound program includes:

- **Filtration** at the CDU, with differential pressure monitoring so you know when filters are loading.
- **Coolant chemistry matched to the wetted materials**, usually with corrosion inhibitors and biocide, per the cold plate and CDU manufacturers' specifications. Mixing metals such as copper and aluminum invites galvanic corrosion.
- **Regular sampling** for pH, conductivity, inhibitor and glycol concentration, and bacteria, with results trended.
- **Controlled top-off** with the specified pre-mixed coolant, never whatever water is handy.

Leak detection is layered: cable sensors under CDUs, manifolds, and piping; spot sensors in drip trays; and flow, pressure, and reservoir level monitoring that can reveal a slow loss before anything is visible. Dripless quick-disconnects let technicians remove a server without draining the loop, and some systems run the TCS below atmospheric pressure so a breach pulls air in instead of pushing liquid out. Every alarm should reach the [BMS](https://datacentertraining.us/learn/glossary.html#term-bms) or [DCIM](https://datacentertraining.us/learn/glossary.html#term-dcim) platform with a written response.

Treat every leak as an electrical hazard

Liquid near energized equipment creates shock and slip hazards. Leak procedures should say who isolates what, in what order, and when equipment must be de-energized, before anyone reaches under a rack with a towel. Coolants and dielectric fluids come with Safety Data Sheets, so they belong in your hazard communication program under OSHA 29 CFR 1910.1200.

## Structural load and the white space

Dense GPU servers, power shelves, busbars, manifolds, and coolant can make a loaded AI rack several times heavier than a typical enterprise rack. Raised floors must be rated for those concentrated and rolling loads, and many new AI halls use slab floors with power and piping overhead instead. Loading docks, ramps, and elevators must carry racks that often arrive fully integrated from the factory. Overhead busway, tray, and piping need engineered supports and, in seismic areas, bracing. Moving these racks takes the right equipment, a planned route, and enough hands; tip-overs and lifting injuries are real risks covered in [Server Room Ergonomics and Manual Handling](https://datacentertraining.us/courses/server-room-ergonomics-manual-handling.html).

## Commissioning liquid-cooled systems

Liquid cooling adds commissioning work that air-cooled halls never needed. Within the levels described in the [commissioning guide](https://datacentertraining.us/learn/data-center-commissioning.html), the liquid scope typically runs:

1. ### Flush and clean

   Piping is flushed through temporary strainers to remove construction debris before any cold plate is connected. Rushing this step is a common cause of early clogging.
2. ### Pressure and leak test

   Every joint is pressure tested to the specified value and hold time, and results are documented.
3. ### Fill and verify chemistry

   The loop is filled with the specified coolant, vented of air, and sampled before IT equipment is connected.
4. ### Functional tests

   CDU pumps fail over, valves go to their fail positions, control loops hold setpoints, and every alarm reaches the BMS.
5. ### Integrated and failure testing

   Liquid-cooled load banks or the IT load provide heat, including step loads that mimic AI swings, while tests fail a pump, interrupt facility water, and drop utility power.

Thermal ride-through deserves special attention. A liquid loop holds little stored cooling and GPUs heat quickly, so many designs put CDU pumps on UPS power. [Infrastructure Commissioning & Startup](https://datacentertraining.us/courses/infrastructure-commissioning-startup.html) covers test planning and integrated systems testing.

## Operations and safety changes

- **Shared ownership.** Facilities, IT, and vendors all touch the liquid loop. A responsibility matrix should say who owns the CDU, manifolds, quick-disconnects, and cold plates, and who answers each alarm.
- **New procedures.** Filter changes, coolant top-off, pump swaps, and manifold isolation each need a written [method of procedure (MOP)](https://datacentertraining.us/learn/glossary.html#term-mop) with a back-out plan.
- **Hazardous energy beyond electricity.** Pumps, pressurized lines, and hot fluid must be isolated under [lockout/tagout](https://datacentertraining.us/learn/glossary.html#term-loto), not just breakers.
- **More to monitor.** Flow, differential pressure, supply and return temperatures, and coolant quality join the watch list. [Monitoring, Automation & BMS Systems](https://datacentertraining.us/courses/monitoring-automation-bms-systems.html) covers trending and alarm management.
- **Noise and heat.** High-speed server fans can be loud enough to warrant a noise assessment under OSHA 29 CFR 1910.95, and dense hot aisles are punishing places to work.

The [Data Center Safety Guide](https://datacentertraining.us/learn/data-center-safety.html) covers the electrical and confined space basics that still apply.

## Grid constraints and site selection

Power availability now drives where data centers get built. A U.S. Department of Energy report prepared by Lawrence Berkeley National Laboratory found that data centers used about 4.4% of total U.S. electricity in 2023 and projected about 6.7% to 12% by 2028.

4.4%

Share of U.S. electricity used by data centers in 2023 (about 176 TWh)

Source: [U.S. DOE / LBNL](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers)

6.7% to 12%

Projected share of U.S. electricity by 2028

Source: [U.S. DOE / LBNL](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers)

325-580 TWh

Projected U.S. data center electricity use in 2028

Source: [U.S. DOE / LBNL](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers)

That growth shows up as long waits for utility interconnection and new substations in constrained regions, site selection that starts with available power before fiber, land, water, and workforce, and more on-site generation and battery storage. Water is a trade-off: evaporative cooling saves energy but consumes water, while dry coolers save water but use more energy in hot weather. Warm-water liquid cooling widens the hours dry coolers can carry the load, so track water usage effectiveness (WUE) alongside PUE. Existing sites are squeezing more IT out of the power they have, which makes [Capacity Planning & Forecasting](https://datacentertraining.us/courses/capacity-planning-forecasting.html) a core skill.

## The skills gap and what technicians should learn

Staffing was tight before AI. In the [Uptime Institute Global Data Center Survey 2025](https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025), nearly two-thirds of operators reported difficulty retaining staff, finding qualified candidates, or both. High-density work raises the bar because it crosses trade lines. Skills worth building:

- **Liquid cooling and hydronics:** pumps, valves, heat exchangers, pressure drop, and CDU controls. See [Mechanical Systems & Equipment Maintenance](https://datacentertraining.us/courses/mechanical-systems-maintenance.html).
- **Water treatment basics:** what pH, conductivity, and inhibitor readings mean, and when to escalate.
- **Electrical at higher power:** three-phase distribution, busway, fault current, and safe work practices aligned with NFPA 70E. Start with [Power Systems & Electrical Fundamentals](https://datacentertraining.us/courses/power-systems-electrical-fundamentals.html).
- **Controls, commissioning, and procedures:** BMS trends and alarms, test scripts, and MOPs.
- **Capacity and efficiency math:** kW, tons, and PUE, covered in [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html).

The roles that feel this most are [HVAC technicians](https://datacentertraining.us/careers/data-center-jobs.html#hvac-technician), [critical facilities technicians](https://datacentertraining.us/careers/data-center-jobs.html#critical-facilities-technician), [controls technicians](https://datacentertraining.us/careers/data-center-jobs.html#controls-technician), and [electricians](https://datacentertraining.us/careers/data-center-jobs.html#electrician). Licensed electrical work still requires the state license, and opening refrigerant circuits requires EPA Section 608 certification from an EPA-approved program. Starting out? Read [how to get into data centers](https://datacentertraining.us/careers/how-to-get-into-data-centers.html).

## Courses that go deeper

These self-paced, standards-aligned courses build the skills high-density facilities depend on. Each awards a certificate of completion.

### [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html)

Cooling & Efficiency · Comprehensive Program · PUE / ASHRAE Thermal Guidelines

Cut cooling costs and improve reliability with modern thermal management strategy.

8 hrs

$298.99

- [Enroll](https://datacentertraining.us/checkout.html?item=cooling-systems-design-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=cooling-systems-design-optimization)

### [Power Systems & Electrical Fundamentals](https://datacentertraining.us/courses/power-systems-electrical-fundamentals.html)

Power & Electrical · Comprehensive Program · NFPA 70E

Master data center electrical infrastructure — from utility interconnection to UPS and PDU architecture.

8 hrs

$303.99

- [Enroll](https://datacentertraining.us/checkout.html?item=power-systems-electrical-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=power-systems-electrical-fundamentals)

### [Capacity Planning & Forecasting](https://datacentertraining.us/courses/capacity-planning-forecasting.html)

Design & Planning · Modular Specialization

Build a 3–5 year capacity plan before you run out of power, cooling, or space.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=capacity-planning-forecasting)
- [Add to Cart](https://datacentertraining.us/cart.html?add=capacity-planning-forecasting)

### [Mechanical Systems & Equipment Maintenance](https://datacentertraining.us/courses/mechanical-systems-maintenance.html)

Cooling & Efficiency · Modular Specialization

Hands-on mechanical maintenance — piping, chillers, and vibration diagnostics.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=mechanical-systems-maintenance)
- [Add to Cart](https://datacentertraining.us/cart.html?add=mechanical-systems-maintenance)

### [Data Center Design Fundamentals](https://datacentertraining.us/courses/data-center-design-fundamentals.html)

Design & Planning · Comprehensive Program · ANSI/TIA-942

Design data center facilities that scale — from site selection to redundancy strategy.

8 hrs

$312.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-design-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-design-fundamentals)

### [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html)

Cooling & Efficiency · Modular Specialization · PUE

Cut operating costs with a measurable PUE optimization roadmap.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=energy-efficiency-pue-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=energy-efficiency-pue-optimization)

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

## Frequently asked questions

### What rack density counts as high density?

There is no official cutoff. Traditional enterprise racks commonly draw single-digit kilowatts, and many operators call a rack high density once it reaches the low tens of kilowatts, where air cooling starts to struggle. AI training racks commonly run at tens of kilowatts, and some current GPU systems exceed 100 kW per rack.

### Does liquid cooling eliminate the need for air cooling?

Usually not. Cold plates remove most of the heat from GPUs and CPUs, but power supplies, memory, storage, and network gear still shed heat into the air. Most liquid-cooled halls keep a smaller air system alongside the liquid loop. Immersion comes closest to removing air cooling at the rack.

### Is it safe to run water near servers?

It can be, when the system is designed and run for it: a separate treated technology cooling loop, dripless quick-disconnects, layered leak detection, and alarms tied to the BMS. Thorough commissioning, water quality management, and written leak response procedures keep the risk low.

### What should a facility technician learn first to work in AI data centers?

Start with fundamentals you will use every shift: power distribution and electrical safety, how heat moves through air and liquid cooling systems, and how the BMS reports what is happening. Then add CDU operation, coolant chemistry, leak response, and commissioning procedures.

### What training and safety procedures do staff need for liquid-cooled servers?

Staff need training on the coolant loop as well as the IT: how the CDU, manifolds and quick disconnects work, how to isolate and drain a loop, leak detection and response, safe fluid handling (PPE and the safety data sheet for the glycol or dielectric fluid in use), and the electrical hazards of working on energized racks where fluid is present. Written procedures should cover connecting and disconnecting servers, leak alarms, spill cleanup, filling and venting, and lockout/tagout of pumps and CDUs. Manufacturer training covers each system's specifics.

### What does 800 VDC power change for data center safety?

Higher-voltage DC distribution to AI racks raises shock and arc flash exposure and adds DC-specific hazards, such as arcs that do not self-extinguish and stored energy in capacitors and batteries. See the [800 VDC data center safety guide](https://datacentertraining.us/learn/800-vdc-data-center-safety.html) for what NFPA 70E covers and how teams build a qualification path.

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-cooling.html)

### How Data Center Cooling Works

Chillers, CRAHs, and containment: the base liquid cooling builds on.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-power.html)

### How Data Center Power Works

Follow power from the utility to the rack.

Read the guide →

[Guide](https://datacentertraining.us/learn/800-vdc-data-center-safety.html)

### 800 VDC Power Safety

What high-voltage DC rack power changes for the people who maintain it.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-commissioning.html)

### Data Center Commissioning

The levels of testing that prove a facility works before it goes live.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-jobs.html#hvac-technician)

### Data Center HVAC Technician

The role liquid cooling is reshaping fastest.

See the role →

This guide is general educational information, not engineering, legal, or compliance advice. Follow your site's procedures, the equipment manufacturers' instructions, and the codes adopted in your jurisdiction.

## Prepare Your Team for High-Density Facilities

The Complete Data Center Professional Bundle covers power, cooling, monitoring, design, and capacity planning: the full skill set AI-era facilities depend on.

- [See the Complete Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/ai-data-centers.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
