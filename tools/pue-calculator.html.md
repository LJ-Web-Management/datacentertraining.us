# Data Center PUE Calculator

Tool · Energy Efficiency

Find your Power Usage Effectiveness, see how much of your electric bill never reaches the IT equipment, and estimate what a better PUE is worth each year.

Free, no sign-up Instant results Includes cost and savings

## Calculator

Your facility

- Total facility power

kW

Everything at the utility meter: IT, cooling, UPS and transformer losses, lighting, offices.

- IT equipment load

kW

Usually measured at the UPS output or at the PDUs feeding the racks.

- Electricity price

$ per kWh

- Target PUE

PUE

Used to estimate yearly savings at your current IT load.

Results

1.50

Power Usage Effectiveness (PUE)

Around the industry average

66.7%

DCiE: share of energy reaching IT

500 kW

Non-IT overhead load

$438,000

Overhead energy cost per year

$87,600

Yearly savings at your target PUE

Costs assume the loads you entered are averages that run all year (8,760 hours). Savings assume IT load stays the same.

On this page

1. [The PUE formula](https://datacentertraining.us/tools/pue-calculator.html#formula)
2. [What your number means](https://datacentertraining.us/tools/pue-calculator.html#benchmarks)
3. [How to improve PUE](https://datacentertraining.us/tools/pue-calculator.html#improve)
4. [Courses](https://datacentertraining.us/tools/pue-calculator.html#courses)
5. [FAQ](https://datacentertraining.us/tools/pue-calculator.html#faq)

[**Go deeper**Read the full energy efficiency and PUE guide.](https://datacentertraining.us/learn/energy-efficiency-pue.html)

## The PUE formula

Power Usage Effectiveness compares everything a facility uses with the part that actually reaches the IT equipment:

**PUE = total facility energy ÷ IT equipment energy**

A facility that draws 1,500 kW in total to support 1,000 kW of IT load has a PUE of 1.5. The extra 500 kW is overhead: cooling, power conversion losses in UPS systems and transformers, lighting, and support spaces.

A PUE of 1.0 would mean zero overhead, which no real facility reaches. DCiE (data center infrastructure efficiency) is the same idea upside down: IT energy divided by total energy, shown as a percentage. PUE was introduced by The Green Grid and is now standardized in ISO/IEC 30134-2.

## What your number means

| PUE | What it usually indicates |
| --- | --- |
| Below 1.3 | Highly optimized design, often with economizers, containment, and high supply temperatures. Common for large hyperscale campuses. |
| 1.3 to 1.5 | Better than the industry average. Good airflow management and efficient cooling plant. |
| 1.5 to 1.7 | Around the industry average. Uptime Institute surveys have put the average near 1.5 to 1.6 for several years. |
| 1.7 to 2.0 | Room to improve. Often older cooling equipment, mixed hot and cold air, or a lightly loaded facility. |
| Above 2.0 | More energy goes to overhead than to IT. Usually a large, fast payback opportunity. |

Compare a site with itself over time rather than with other sites. Climate, redundancy level, and how full the facility is all move PUE, and two sites can measure it at different points in the power chain.

## How to improve PUE

- **Stop hot and cold air from mixing.** Blanking panels, sealed cable openings, and hot or cold aisle containment let you raise supply temperatures and slow fans.
- **Raise supply air temperature** toward the top of the ASHRAE recommended range (up to 27 °C / 80.6 °F) once airflow is under control.
- **Use free cooling.** Air-side or water-side economizers cut compressor hours in cooler weather.
- **Add variable speed drives** on fans and pumps, and match cooling output to the actual load.
- **Right-size and tune UPS systems**, since lightly loaded UPS modules lose a larger share of their energy.
- **Remove idle IT equipment.** It doesn't change PUE much, but it cuts total energy, which is what the bill measures.

**How much heat is your IT load making?** Convert kW to BTU/hr, tons, and airflow.

[Cooling Load Calculator](https://datacentertraining.us/tools/cooling-load-calculator.html)

## Courses that cut energy costs

Turn a PUE number into an improvement plan with these self-paced courses.

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

Save 42% with the bundle

Cooling & Facilities Efficiency Bundle

6 courses · 24 hours · **$462.99** per seat, instead of ~~$798.94~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-cooling-efficiency)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### What is a good PUE for a data center?

Lower is better, and 1.0 is the theoretical ideal. Uptime Institute's annual surveys have put the industry average at roughly 1.5 to 1.6 for several years, while large hyperscale campuses commonly report figures well below that. A realistic target depends on the facility's age, climate, cooling design, and how heavily it is loaded.

### Should I enter power (kW) or energy (kWh)?

Either works as long as both numbers use the same unit and cover the same period. A single power reading gives a snapshot PUE. Annual energy totals give a more meaningful number because they capture seasonal changes in cooling. The cost figures on this page assume the kW values you enter are average loads that run all year.

### Why did my PUE get worse when IT load went down?

Much of a facility's overhead, such as cooling fans, pumps, UPS losses, and lighting, does not fall in proportion when IT load drops. The same overhead divided by a smaller IT load produces a higher PUE. That is why lightly loaded facilities often show poor PUE even when nothing is wrong with the equipment.

### Is DCiE different from PUE?

DCiE (data center infrastructure efficiency) is the inverse of PUE, written as a percentage: IT energy divided by total facility energy. A PUE of 1.5 equals a DCiE of about 66.7 percent, meaning two-thirds of the energy reaches the IT equipment.

Estimates for planning and education only. Validate savings with metered data and your engineering team before making investment decisions.

## More Tools and Quizzes

### [Uptime & Downtime Calculator](https://datacentertraining.us/tools/uptime-calculator.html)

Turn availability percentages into real minutes of downtime.

Open the calculator →

### [Training Plan Builder](https://datacentertraining.us/tools/training-plan-builder.html)

Get a course plan and price for your role in a minute.

Build a plan →

### [Cooling & HVAC Quiz](https://datacentertraining.us/quizzes/cooling-quiz.html)

Ten questions on CRAHs, airflow, and efficiency.

Take the quiz →

## Make Efficiency Part of the Job

The Cooling & Facilities Efficiency courses give technicians and managers the skills to bring PUE down and keep it there.

- [See the Cooling Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/tools/pue-calculator.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
