# Data Center Cooling Load Calculator

Tool · Cooling

Every watt of IT load becomes heat. Turn racks and kilowatts into BTU/hr, tons of cooling, server airflow, and the number of cooling units you need with redundancy.

kW to BTU/hr and tons Airflow in CFM and m³/h N, N+1, N+2, 2N

## Calculator

Your room

- Number of racks

racks

- Average load per rack

kW

Use measured average draw, not nameplate. IT load: **200 kW**

- Other heat in the room

% of IT

Lighting, in-room UPS and PDU losses, people, and heat through walls and roof.

- Air temperature rise across the IT equipment

°F

Server exhaust minus inlet, equal to 11.1 °C. A smaller rise needs more airflow.

- Cooling unit size (optional)

tons each

- Redundancy

Cooling required

62.6 tons

of cooling for 220 kW of heat

750,671 BTU/hr

Heat load

31,600 CFM

1,580 CFM per rack

53,688 m³/h

IT airflow, metric

4 units

30-ton units at N+1 (3 needed for the load)

Rule-of-thumb estimate for sensible heat at sea-level air density. Real designs must account for latent load, altitude, unit derating at your supply temperatures, and future growth. Have a mechanical engineer size equipment.

On this page

1. [The math behind it](https://datacentertraining.us/tools/cooling-load-calculator.html#math)
2. [Why airflow matters](https://datacentertraining.us/tools/cooling-load-calculator.html#airflow)
3. [Sizing with redundancy](https://datacentertraining.us/tools/cooling-load-calculator.html#redundancy)
4. [Courses](https://datacentertraining.us/tools/cooling-load-calculator.html#courses)
5. [FAQ](https://datacentertraining.us/tools/cooling-load-calculator.html#faq)

[**Go deeper**Read How Data Center Cooling Works.](https://datacentertraining.us/learn/data-center-cooling.html)

## The math behind it

IT equipment turns almost all of the electricity it uses into heat, so the cooling system has to remove about as much energy as the IT load consumes. Three conversions do most of the work:

| Conversion | Value | Example |
| --- | --- | --- |
| Kilowatts to BTU per hour | 1 kW = 3,412 BTU/hr | 200 kW = about 682,000 BTU/hr |
| BTU per hour to tons | 1 ton = 12,000 BTU/hr | 682,000 BTU/hr = about 56.9 tons |
| Tons to kilowatts of cooling | 1 ton = 3.517 kW | 56.9 tons = about 200 kW |

The calculator adds a percentage for other heat sources in the room, then converts the total. Those sources are easy to forget: UPS and PDU losses if they sit in the data hall, lighting, people, and heat gained through the building envelope.

## Why airflow matters

Cooling capacity alone isn't enough. Servers pull cool air through their fans and push hot air out the back, and the cooling units have to supply at least that much air. At sea level, the sensible heat equation gives a handy shortcut:

**CFM ≈ 3.16 × watts ÷ temperature rise (°F)**

A 10 kW rack with a 20 °F rise needs about 1,580 CFM. If the cooling units deliver less air than the servers want, hot exhaust gets pulled back into the inlets (recirculation). If they deliver far more, the extra air bypasses the equipment and wastes fan energy.

That is why containment, blanking panels, and sealed floor openings matter so much: they make sure the air you pay to cool goes through the equipment and nowhere else.

## Sizing with redundancy

"N" is the number of cooling units needed to carry the load. N+1 adds one spare so any single unit can fail or be serviced without overheating the room. 2N duplicates the whole set. The calculator divides the required tons by your unit size, rounds up to get N, and then applies the redundancy you choose. In practice, engineers also check unit capacity at the actual supply and return temperatures, because published ratings are usually given at specific test conditions.

**Know your CRAH from your CRAC?** Ten questions on data center cooling.

[Take the Cooling Quiz](https://datacentertraining.us/quizzes/cooling-quiz.html)

## Courses for cooling teams

Go from rules of thumb to designing, troubleshooting, and maintaining real cooling systems.

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

### How many BTUs per hour does 1 kW of IT load produce?

About 3,412 BTU per hour. Nearly all the electricity IT equipment uses ends up as heat in the room, so cooling has to remove roughly 3,412 BTU/hr for every kilowatt of IT load.

### How many kW is one ton of cooling?

One ton of refrigeration is 12,000 BTU per hour, which is about 3.517 kW of heat removal. So 100 kW of heat needs roughly 28.4 tons of cooling before any redundancy or safety margin.

### How much airflow does a server rack need?

At sea level, airflow in CFM is about 3.16 times the load in watts divided by the air temperature rise across the equipment in degrees Fahrenheit. A 10 kW rack with a 20 degree F rise needs about 1,580 CFM. A smaller temperature rise needs more airflow.

Estimates for planning and education only. Equipment selection and design are engineering decisions for qualified professionals.

## More Tools and Guides

### [PUE Calculator](https://datacentertraining.us/tools/pue-calculator.html)

Cooling is the biggest overhead. See what it costs you.

Open the calculator →

### [AI & High-Density Facilities](https://datacentertraining.us/learn/ai-data-centers.html)

What changes when racks reach tens of kilowatts.

Read the guide →

### [Training Plan Builder](https://datacentertraining.us/tools/training-plan-builder.html)

Build a course plan for your cooling team.

Build a plan →

## Train the People Who Keep It Cool

Cooling design, HVAC troubleshooting, mechanical maintenance, refrigerant safety, and efficiency, in one track.

- [See the Cooling Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/tools/cooling-load-calculator.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
