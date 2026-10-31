# Data Center Energy Efficiency and PUE Explained

Knowledge Center · Efficiency

Power usage effectiveness is the number every data center gets judged by. Here is how to calculate it correctly, what moves it, what it hides, and a practical plan for cutting the energy a facility spends on overhead.

13 min read Beginner to intermediate Updated October 2026

On this page

1. [What PUE measures](https://datacentertraining.us/learn/energy-efficiency-pue.html#what-is-pue)
2. [Worked example](https://datacentertraining.us/learn/energy-efficiency-pue.html#calculate)
3. [DCiE](https://datacentertraining.us/learn/energy-efficiency-pue.html#dcie)
4. [Where the energy goes](https://datacentertraining.us/learn/energy-efficiency-pue.html#energy-breakdown)
5. [Why PUE changes](https://datacentertraining.us/learn/energy-efficiency-pue.html#why-pue-moves)
6. [Limitations of PUE](https://datacentertraining.us/learn/energy-efficiency-pue.html#limitations)
7. [WUE, CUE, and more](https://datacentertraining.us/learn/energy-efficiency-pue.html#other-metrics)
8. [Efficiency checklist](https://datacentertraining.us/learn/energy-efficiency-pue.html#checklist)
9. [Industry context](https://datacentertraining.us/learn/energy-efficiency-pue.html#industry)
10. [Improvement plan](https://datacentertraining.us/learn/energy-efficiency-pue.html#plan)
11. [Courses](https://datacentertraining.us/learn/energy-efficiency-pue.html#courses)
12. [FAQ](https://datacentertraining.us/learn/energy-efficiency-pue.html#faq)

[**Run the numbers**Calculate PUE, DCiE, and savings in the PUE Calculator.](https://datacentertraining.us/tools/pue-calculator.html)

Key takeaways

- PUE is total facility energy divided by IT equipment energy. A PUE of 1.5 means 0.5 kWh of overhead for every kWh delivered to IT.
- Calculate it from energy (kWh) over a full year, not a single power reading, and state where you measured the IT energy.
- Cooling is usually the largest source of overhead, followed by power conversion losses in UPS systems and transformers.
- PUE says nothing about how much useful work the IT equipment does, or about water and carbon. Pair it with WUE, CUE, and IT utilization.
- The biggest wins usually come from airflow management, warmer setpoints within ASHRAE ranges, economization, and right-sized equipment.

## What PUE measures

Power usage effectiveness ([PUE](https://datacentertraining.us/learn/glossary.html#term-pue)) is the most widely used data center efficiency metric. It compares the energy the whole facility uses with the energy that reaches the IT equipment:

**PUE = total facility energy ÷ IT equipment energy**

**Total facility energy** is everything metered at the facility boundary: IT equipment, cooling, power conversion losses, lighting, and other building loads inside that boundary. **IT equipment energy** is what the servers, storage, network gear, and related IT devices consume. A perfect facility, where every kilowatt-hour went to IT, would have a PUE of 1.0. Every real facility is above that.

PUE was introduced by The Green Grid, an industry consortium, and is standardized internationally as **ISO/IEC 30134-2**. Both describe measurement categories based on where IT energy is metered: at the UPS output (simplest, but losses in downstream PDUs get counted as IT), at the PDU outputs, or at the IT equipment itself (most accurate). Always state which one you used.

## How to calculate PUE: a worked example

Suppose a facility meters the following over 12 months:

- Total facility energy at the utility meters: **13,140,000 kWh**
- IT equipment energy at the PDU outputs: **8,760,000 kWh** (an average IT load of 1 MW)

PUE = 13,140,000 ÷ 8,760,000 = **1.50**. The facility spends 4,380,000 kWh a year, or 0.5 kWh for every kWh of IT energy, on cooling, power losses, and other overhead.

Now suppose an airflow and cooling project brings PUE down to 1.30 at the same IT load. Total energy becomes 8,760,000 × 1.30 = 11,388,000 kWh, a saving of 1,752,000 kWh a year. Multiply that by your utility rate to get the annual cost saving. The same math works in reverse: at a PUE of 1.5, every kilowatt of new IT load brings about half a kilowatt of overhead with it.

Energy, not power

A PUE calculated from one instantaneous kW reading is a snapshot. Annual energy captures every season, load level, and maintenance event. Many sites trend a rolling 12-month PUE alongside daily or monthly values.

**Try it with your own numbers.** Get PUE, DCiE, overhead cost, and the savings from hitting a target PUE.

[Open the PUE Calculator](https://datacentertraining.us/tools/pue-calculator.html)

## DCiE: the same idea, inverted

Data center infrastructure efficiency (DCiE) is the reciprocal of PUE, shown as a percentage: DCiE = IT equipment energy ÷ total facility energy × 100, or simply 1 ÷ PUE. A PUE of 1.5 is a DCiE of about 67 percent, meaning two-thirds of the energy reaches IT. A PUE of 2.0 is a DCiE of 50 percent. The Green Grid published DCiE alongside PUE, but PUE became the figure most organizations report.

## Where the facility energy goes

Everything that is not IT energy is overhead. In most facilities it falls into four buckets:

**Sources of facility overhead**

| Category | What uses the energy | Main levers |
| --- | --- | --- |
| Cooling | Chillers and compressors, CRAH and CRAC fans, pumps, cooling tower fans, humidifiers, CDUs | Warmer setpoints, containment, economizers, variable speed drives, liquid cooling |
| Power conversion and distribution | UPS rectifier and inverter losses, transformer losses, conductor losses, battery charging | Efficient UPS operating modes, well-loaded UPS modules, high-efficiency transformers |
| Lighting | Data hall, gray space, and exterior lighting | LED fixtures, occupancy sensors, lights-off operation in data halls |
| Other building loads | Generator block heaters, security systems, offices and support spaces inside the boundary | Controls tuning, scheduling, separate metering of non-data center loads |

Cooling is usually the largest piece, which is why most efficiency programs start there; the [cooling guide](https://datacentertraining.us/learn/data-center-cooling.html) explains the equipment involved. Power losses are easy to overlook. A UPS running at a small fraction of its rating often operates lower on its efficiency curve than one loaded closer to its sweet spot, so check the manufacturer's curve for your units.

## Why PUE changes

- **IT load.** Much of the overhead is fixed. Lighting, block heaters, minimum pump flows, and UPS losses do not shrink in proportion when IT load drops. A half-empty facility almost always has a worse PUE than the same facility full, which is why new sites often post high PUE in their first year.
- **Weather.** Economizers run more hours in cool weather, and chillers work harder in hot, humid weather. PUE typically rises in summer and falls in winter, which is why annual figures matter.
- **Measurement point and boundary.** Measuring IT energy at the UPS output instead of at the IT equipment, or leaving offices or part of the plant out of the boundary, changes the number. Two equally efficient sites can report different PUEs.
- **Redundancy.** In a 2N design, each side normally carries less than half of its capacity, so UPS modules and transformers run at light load, where efficiency is lower.
- **Operations.** Changed setpoints, units left in manual, stuck economizer dampers, or a failed valve can all move PUE without anyone noticing unless someone is trending it.

## Limitations of PUE

PUE measures one thing: infrastructure overhead relative to IT energy. Keep its blind spots in mind.

- **It ignores IT efficiency.** A room full of idle servers can post an excellent PUE while doing little useful work. Decommissioning servers cuts total energy but can raise PUE, because fixed overhead is spread over less IT load.
- **Server fans count as IT.** Push inlet temperatures too high and server fans speed up. PUE improves because facility fans slow down, while total energy may barely change, or even rise.
- **It ignores water and carbon.** Evaporative cooling can lower PUE while using a lot of water, and a low-PUE site on a carbon-intensive grid can still have large emissions.
- **It invites unfair comparisons.** Climate, Tier level, density, measurement category, and boundary all affect the number. Compare a site with itself over time before comparing it with others.
- **Design PUE is not operating PUE.** A design figure is usually calculated at full load in typical weather. Ask for measured annual values.

## WUE, CUE, and other metrics

**Metrics that complement PUE**

| Metric | Formula | What it tells you |
| --- | --- | --- |
| WUE (water usage effectiveness) | Annual site water use (liters) ÷ IT equipment energy (kWh) | Water consumed per unit of IT energy, mostly from evaporative cooling |
| CUE (carbon usage effectiveness) | CO₂ emissions from the facility's energy ÷ IT equipment energy | Emissions per kWh of IT energy, driven by PUE and the grid's carbon intensity |
| ERF (energy reuse factor) | Energy reused outside the data center ÷ total facility energy | Credit for heat reuse, which PUE cannot show |
| IT utilization | Average useful work or CPU utilization of IT equipment | Whether the IT energy is doing useful work |

The Green Grid introduced WUE and CUE as companions to PUE, and the ISO/IEC 30134 series standardizes several of these key performance indicators. Reporting PUE, WUE, and CUE together gives a far more honest picture than PUE alone.

## A practical efficiency checklist

- **Meter first.** Verify sub-metering for IT, cooling, and power losses, and document the measurement boundary.
- **Raise supply temperatures** within the ASHRAE recommended inlet range of 18 to 27°C (64.4 to 80.6°F) once airflow is under control, and raise chilled water temperatures with them. Watch rack inlets and server fan behavior as you go.
- **Contain and seal.** Add hot or cold aisle containment, blanking panels in every empty rack unit, and grommets on every cable opening. Then slow fans or turn off surplus cooling units.
- **Economize more hours.** Tune airside or waterside economizer controls, repair dampers and valves, and widen the conditions that allow free cooling.
- **Use variable speed drives and EC fans** on fans, pumps, and cooling towers. Under the fan affinity laws, power varies roughly with the cube of speed, so a fan at 80 percent speed draws about half the power.
- **Right-size the UPS.** Consolidate lightly loaded modules where redundancy allows, evaluate high-efficiency modes as a risk decision, and specify efficient units at replacement.
- **Decommission idle servers.** Find servers that draw power but do no useful work and remove them. Consolidate and virtualize where possible. Total energy falls even if PUE ticks up.
- **Stop units fighting.** Make sure neighboring cooling units are not humidifying and dehumidifying at the same time.
- **Adopt liquid cooling where density justifies it.** Direct-to-chip and rear-door systems can run on warmer water, which cuts fan energy and extends economizer hours.
- **Reuse heat.** Where there is a nearby user, such as a district heating network, waste heat can replace fuel burned elsewhere. Track it with ERF.

## Industry context

Efficiency matters more as demand grows, and the industry average has stalled.

1.56

Average PUE in Uptime Institute's 2024 survey. Its 2025 survey found little change for six consecutive years.

Source: [Uptime Institute](https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025)

4.4%

Share of total U.S. electricity used by data centers in 2023, about 176 TWh.

Source: [U.S. DOE / LBNL](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers)

6.7% to 12%

Projected data center share of U.S. electricity by 2028, about 325 to 580 TWh.

Source: [U.S. DOE / LBNL](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers)

Averages hide a wide spread. Newer, large facilities designed around economization and containment tend to run far lower than older, smaller rooms, which leaves plenty of room for improvement in existing sites. As AI pushes rack densities up, liquid cooling and warmer water temperatures are also changing what good performance looks like. See [AI Data Centers](https://datacentertraining.us/learn/ai-data-centers.html).

## How to build a PUE improvement plan

1. ### Define the boundary and metering

   Decide what counts as total facility energy and where IT energy is measured, write it down, and close metering gaps. Use the same method every time. [Monitoring, Automation & BMS Systems](https://datacentertraining.us/courses/monitoring-automation-bms-systems.html) covers the data side.
2. ### Establish a baseline

   Trend at least 12 months of energy data along with IT load and weather, so you can separate real improvement from seasonal swings.
3. ### Find the losses

   Survey airflow and rack inlet temperatures, look for bypass and recirculation, review UPS loading against efficiency curves, and benchmark the chiller plant in kW per ton. [DCIM](https://datacentertraining.us/courses/dcim-platform-fundamentals.html) and BMS trend data show where energy goes.
4. ### Take the quick wins

   Blanking panels, sealed cable openings, corrected tile placement, and tuned setpoints cost little and often pay back quickly.
5. ### Plan capital projects

   Containment, variable speed drives, economizer upgrades, UPS replacement, and liquid cooling need budgets. Rank them by energy saved, risk, and payback.
6. ### Manage risk and change

   Every change to a live facility goes through change control and a written method of procedure with rollback steps. Raise setpoints in small steps and watch inlet temperatures.
7. ### Verify and sustain

   Compare results with the baseline, normalized for IT load and weather. Report PUE with WUE and CUE, and keep trending so gains do not quietly erode.

## Courses that go deeper

Each of these self-paced courses awards a certificate of completion. Start with [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html), then add cooling, controls, and planning.

### [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html)

Cooling & Efficiency · Modular Specialization · PUE

Cut operating costs with a measurable PUE optimization roadmap.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=energy-efficiency-pue-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=energy-efficiency-pue-optimization)

### [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html)

Cooling & Efficiency · Comprehensive Program · PUE / ASHRAE Thermal Guidelines

Cut cooling costs and improve reliability with modern thermal management strategy.

8 hrs

$298.99

- [Enroll](https://datacentertraining.us/checkout.html?item=cooling-systems-design-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=cooling-systems-design-optimization)

### [Building Envelope Fundamentals](https://datacentertraining.us/courses/building-envelope-fundamentals.html)

Cooling & Efficiency · Modular Specialization

Understand how a facility's building envelope drives cooling load and energy cost.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=building-envelope-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=building-envelope-fundamentals)

### [Monitoring, Automation & BMS Systems](https://datacentertraining.us/courses/monitoring-automation-bms-systems.html)

Monitoring & Automation · Comprehensive Program · BMS / DCIM

Design a monitoring and BMS strategy that catches problems before they cause downtime.

8 hrs

$276.99

- [Enroll](https://datacentertraining.us/checkout.html?item=monitoring-automation-bms-systems)
- [Add to Cart](https://datacentertraining.us/cart.html?add=monitoring-automation-bms-systems)

### [DCIM Platform Fundamentals](https://datacentertraining.us/courses/dcim-platform-fundamentals.html)

Monitoring & Automation · Modular Specialization · DCIM

Understand DCIM strategy and build the ROI case for implementation.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=dcim-platform-fundamentals)
- [Add to Cart](https://datacentertraining.us/cart.html?add=dcim-platform-fundamentals)

### [Capacity Planning & Forecasting](https://datacentertraining.us/courses/capacity-planning-forecasting.html)

Design & Planning · Modular Specialization

Build a 3–5 year capacity plan before you run out of power, cooling, or space.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=capacity-planning-forecasting)
- [Add to Cart](https://datacentertraining.us/cart.html?add=capacity-planning-forecasting)

Save 42% with the bundle

Cooling & Facilities Efficiency Bundle

6 courses · 24 hours · **$462.99** per seat, instead of ~~$798.94~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-cooling-efficiency)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### What is a good PUE for a data center?

There is no single target, because climate, density, redundancy, and measurement method all affect the result. Uptime Institute's 2024 survey put the industry average at 1.56. Newer facilities designed around economization often run well below that, while older enterprise rooms often run higher. The most useful comparison is your own site against its own baseline over time.

### Can PUE be lower than 1.0?

No. PUE divides total facility energy by IT energy, and total facility energy always includes the IT energy plus some overhead, so the ratio cannot fall below 1.0. Heat reuse does not lower PUE. It is credited through separate metrics such as the energy reuse factor (ERF).

### Does a lower PUE always mean a more efficient data center?

Not always. PUE measures infrastructure overhead, not how much useful work the IT equipment does. Removing idle servers saves energy but can raise PUE, and evaporative cooling can lower PUE while increasing water use. Look at PUE together with total energy, IT utilization, WUE, and CUE.

### How often should PUE be measured?

Measure continuously if your metering allows it, and report annual PUE based on 12 months of energy data so seasonal swings and load changes are captured. Daily or monthly trends are useful for spotting problems, but a single instantaneous reading is only a snapshot.

### What is the difference between PUE and DCiE?

They express the same relationship in opposite directions. PUE is total facility energy divided by IT energy, so lower is better and 1.0 is ideal. DCiE is IT energy divided by total facility energy, shown as a percentage, so higher is better and 100 percent is ideal. A PUE of 2.0 equals a DCiE of 50 percent.

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-cooling.html)

### How Data Center Cooling Works

The equipment behind the biggest slice of facility overhead.

Read the guide →

[Guide](https://datacentertraining.us/learn/ai-data-centers.html)

### AI Data Centers

How GPU density is changing power, cooling, and efficiency.

Read the guide →

[Tool](https://datacentertraining.us/tools/pue-calculator.html)

### PUE Calculator

PUE, DCiE, overhead cost, and savings from a target PUE.

Open the tool →

[Careers](https://datacentertraining.us/careers/data-center-jobs.html#facility-manager)

### Data Center Facility Manager

The role that owns energy, maintenance, and budgets.

See the role →

This guide is general educational information, not engineering, legal, or compliance advice. Validate any change to a live facility with qualified engineers and your site's change control process.

## Cut Energy Without Adding Risk

Our Cooling & Facilities Efficiency courses cover PUE improvement, cooling design, maintenance, and the building envelope.

- [See the Cooling & Efficiency Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/energy-efficiency-pue.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
