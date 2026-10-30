# Data Center Water Usage: How Much, Why, and How It Compares to Golf Courses

Knowledge Center · Water

Data center water use has become a local flashpoint, and the comparison with golf courses shows up in nearly every debate. Here are the best available U.S. figures, with the year and scope of each, why data centers use water at all, how designs reduce it, and what the golf comparison can and cannot tell you.

11 min read All levels Updated October 2026

On this page

1. [How much water data centers use](https://datacentertraining.us/learn/data-center-water-usage.html#how-much)
2. [Why data centers use water](https://datacentertraining.us/learn/data-center-water-usage.html#why)
3. [Direct vs. indirect water](https://datacentertraining.us/learn/data-center-water-usage.html#direct-indirect)
4. [What WUE measures](https://datacentertraining.us/learn/data-center-water-usage.html#wue)
5. [How designs reduce water use](https://datacentertraining.us/learn/data-center-water-usage.html#reduce)
6. [Data centers vs. golf courses](https://datacentertraining.us/learn/data-center-water-usage.html#golf)
7. [Why the comparison is apples to oranges](https://datacentertraining.us/learn/data-center-water-usage.html#apples-oranges)
8. [Courses](https://datacentertraining.us/learn/data-center-water-usage.html#courses)
9. [FAQ](https://datacentertraining.us/learn/data-center-water-usage.html#faq)
10. [Sources](https://datacentertraining.us/learn/data-center-water-usage.html#sources)

[**Try the calculator**Work out PUE for your facility in seconds.](https://datacentertraining.us/tools/pue-calculator.html)

**Short answer:** U.S. data center water usage was about 66 billion liters (about 17 billion gallons) of direct consumption in 2023, mostly for cooling, according to Lawrence Berkeley National Laboratory. U.S. golf facilities applied a projected 1.63 million acre-feet (about 531 billion gallons) in 2024, according to the GCSAA. Golf's total is larger, but the two figures measure different things.

Key takeaways

- Direct (on-site) data center water consumption was about 66 billion liters in 2023, roughly three times the 2014 level, with hyperscale and colocation sites accounting for 84 percent.
- Water consumed indirectly to generate data centers' electricity was nearly 800 billion liters in 2023, far more than direct use.
- U.S. golf facilities applied a projected 1.63 million acre-feet of water in 2024, 31 percent less than in 2005.
- The golf comparison mixes consumption with application, direct with indirect, and national totals with local impact. Treat it as context, not a verdict.
- Cooling design trades water against energy: waterless systems use more electricity, which carries its own indirect water footprint.

## How much water do data centers use?

U.S. data centers directly consumed about 66 billion liters of water in 2023, according to the 2024 United States Data Center Energy Usage Report from Lawrence Berkeley National Laboratory (LBNL), prepared for the U.S. Department of Energy. That is on-site consumption, mostly from cooling. The same report estimates nearly 800 billion liters of indirect consumption at the power plants that generated the facilities' electricity.

~66 billion L

Direct U.S. data center water consumption, 2023 (about 17 billion gallons)

Source: [LBNL, 2024](https://escholarship.org/uc/item/32d6m0d1)

~800 billion L

Indirect consumption through electricity generation, 2023 (about 211 billion gallons)

Source: [LBNL, 2024](https://escholarship.org/uc/item/32d6m0d1)

1.63 million acre-feet

Water applied on U.S. golf facilities, 2024 (about 531 billion gallons)

Source: [GCSAA, 2025](https://www.gcsaa.org/who-we-are/media/news-release/2025/12/30/golf-courses-reduce-water-usage-by-31-percent-according-to-national-survey)

**U.S. data center water figures from the LBNL 2024 report**

| Measure | Figure | Year | Scope |
| --- | --- | --- | --- |
| Direct water consumption | 21.2 billion liters | 2014 | All U.S. data centers, on site; 64% in internal (enterprise) data centers |
| Direct water consumption | About 66 billion liters | 2023 | All U.S. data centers, on site; 84% hyperscale and colocation, 12% internal |
| Direct water consumption, hyperscale only | 60 to 124 billion liters | 2028 (projection) | Hyperscale data centers, on site |
| Indirect water consumption | Nearly 800 billion liters | 2023 | Water consumed generating the electricity U.S. data centers used, based on regional grid mixes |
| Average site WUE | Just over 0.36 L/kWh | Through 2023 | Average across all U.S. data centers; projected 0.45 to 0.48 L/kWh after 2023 |

For scale on the energy side, the same LBNL work found that data centers used about 4.4 percent of total U.S. electricity in 2023 (176 TWh), with projections of about 6.7 to 12 percent by 2028. Indirect water use rises with that electricity demand unless the grid mix changes.

## Why do data centers use water?

Data centers use water mainly to reject heat. Every watt of IT power becomes heat, and evaporating water is one of the most energy-efficient ways to move that heat outdoors.

- **Cooling towers.** Water-cooled chillers send heat through a condenser water loop to cooling towers, where a portion of the water evaporates and carries the heat away. LBNL found that facilities with water-cooled chillers and no economizers have the highest water usage effectiveness of the systems it modeled, largely because of cooling tower water use.
- **Evaporative and adiabatic cooling.** Some air handlers and dry coolers spray or wet media to pre-cool air on hot days. Water is used only when that wet mode runs, but on hot sites that can be often.
- **Humidification.** Some sites add moisture to the air at times to stay within humidity limits, which uses a smaller amount of water.
- **Electricity generation.** Thermoelectric power plants need cooling, and hydroelectric reservoirs lose water through surface evaporation. That water is consumed off site, on behalf of every kilowatt-hour the data center buys.

The [cooling guide](https://datacentertraining.us/learn/data-center-cooling.html) explains chillers, towers, and economizers in more detail.

## Direct vs. indirect water use

Direct (site) water is what the data center itself consumes, mostly in its cooling system. Indirect (source) water is what power plants consume to make the facility's electricity. LBNL reports both, and notes that including both "reflects the true water cost of data centers," although the indirect part is complex to calculate and depends heavily on the electricity source.

Two definitions matter here. **Withdrawal** is all the water taken from a river, aquifer, or utility. **Consumption** is the part of withdrawn water that is permanently removed from the immediate water cycle, usually by evaporation. The LBNL data center figures are consumption figures.

LBNL's national average for indirect water was 4.52 liters per kWh of data center electricity in 2023, compared with 4.35 L/kWh for U.S. electricity overall, reflecting the grid regions where data centers are located. The report also notes that its method does not account for power purchase agreements or on-site generation, which could change the result for individual facilities.

## What is WUE (water usage effectiveness)?

Water usage effectiveness (WUE) is a facility's annual water consumption in liters divided by its IT equipment energy in kWh. It is the water counterpart of PUE, and like PUE it should be reported with its scope: site WUE counts only on-site water, while source WUE adds the water used to generate the electricity.

A low site WUE is not automatically better. LBNL points out that water-cooled and evaporative systems are generally more energy efficient than air-cooled chillers and other waterless systems, which use no water on site but more electricity. A site that cuts water by switching to air-cooled equipment can raise its PUE and its indirect water and carbon footprint. The [energy efficiency and PUE guide](https://datacentertraining.us/learn/energy-efficiency-pue.html) covers PUE, WUE, and CUE together.

**Tracking efficiency at your site?** Calculate PUE from your facility and IT energy readings.

[Open the PUE Calculator](https://datacentertraining.us/tools/pue-calculator.html)

## How data center designs reduce water use

Designs reduce water use by rejecting heat without evaporation for more hours of the year, or by using water that does not compete with drinking supplies. Each choice has an energy cost or a climate limit.

**Water-saving cooling approaches and their trade-offs**

| Approach | How it saves water | Trade-off |
| --- | --- | --- |
| Air-cooled chillers | Reject heat to outdoor air with fans; no cooling tower water. | More electricity, especially in hot weather, which raises indirect water use. |
| Dry coolers (with or without adiabatic assist) | Closed coils cooled by air; water is sprayed only on the hottest days if adiabatic assist is fitted. | Larger equipment; in hot climates the wet mode can run often. |
| Airside economizers | Use outdoor air for cooling so chilled water systems can shut down in favorable weather. LBNL notes this is common at hyperscale sites, with only sporadic adiabatic cooling. | Depends on climate and air quality; needs careful humidity and filtration control. |
| Closed-loop liquid cooling | Coolant runs in a closed loop to the chips, and warmer water temperatures allow more economizer hours or dry coolers. | Saves water only if the facility's heat rejection is waterless or mostly so; heat sent to cooling towers is still evaporated. |
| Reclaimed or non-potable water | Supplies cooling towers with treated wastewater or other non-drinking water. | Does not reduce consumption; needs suitable supply, treatment, and permits. |

Operations matter too. Good cooling tower water treatment lets towers run more cycles before blowdown, leak detection catches losses early, and raising supply temperatures within the ASHRAE recommended range (18-27 °C, or 64.4-80.6 °F, for most equipment) increases economizer hours. [Mechanical Systems & Equipment Maintenance](https://datacentertraining.us/courses/mechanical-systems-maintenance.html) covers water treatment and chiller operation, and [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html) covers economizers, containment, and liquid cooling.

## Do golf courses use more water than data centers?

On U.S. national totals, golf's figure is larger. U.S. golf facilities applied a projected 1.63 million acre-feet of water in 2024, about 2 trillion liters, according to the Golf Course Superintendents Association of America (GCSAA). U.S. data centers directly consumed about 66 billion liters in 2023 and indirectly consumed nearly 800 billion liters through electricity, according to LBNL.

**Data center vs. golf course water figures, side by side**

|  | U.S. data centers | U.S. golf facilities |
| --- | --- | --- |
| Headline figure | About 66 billion liters direct (about 17 billion gallons); nearly 800 billion liters indirect (about 211 billion gallons) | Projected 1.63 million acre-feet (about 531 billion gallons, or about 2 trillion liters) |
| Year | 2023 | 2024 |
| What is counted | Water consumed: on site (direct) and at power plants (indirect) | Water applied to the facility, mostly irrigation |
| How it was estimated | Model of the U.S. data center stock, cooling systems, and grid water intensity | Survey of nearly 1,700 golf facilities, projected to all U.S. facilities |
| Water sources | Varies by site; not broken out nationally | Wells 32%, lakes and ponds 27%, recycled water 19% |
| Trend | Direct use about three times the 2014 level; projected to keep rising | 31% less than in 2005 |
| Publisher | Lawrence Berkeley National Laboratory for the U.S. DOE, December 2024 | GCSAA, survey funded in part by the USGA, released December 2025 |

Taken at face value, golf's applied water is roughly 30 times data centers' direct consumption and a little over twice direct and indirect combined. Gallon and liter conversions are ours, using 325,851 gallons per acre-foot (the GCSAA's figure) and 3.785 liters per gallon.

## Why the golf course comparison is apples to oranges

The golf course vs. data center comparison is popular because both are visible, local land uses that draw water. But the two national figures differ in what they count, so neither side of the debate should lean on them too hard.

1. **Consumption vs. application.** LBNL counts water consumed, meaning removed from the immediate water cycle. The GCSAA counts water applied to turf and grounds. Its survey does not report how much of that water evaporates or is taken up by plants versus how much returns to the ground.
2. **Direct vs. indirect.** The data center figure can include power plant water; the golf figure includes none of the indirect water behind irrigation pumps or course maintenance. Comparing data centers' direct plus indirect water with golf's direct water alone is not like for like either.
3. **National vs. local.** Water stress is local. One large campus drawing on a stressed municipal system can matter more to a town than any national total, and the same is true of a course in a dry basin. In the GCSAA's 2020 survey, the Southeast and Southwest regions accounted for 58 percent of golf's applied water.
4. **Different sources and quality.** The GCSAA lists recycled water as 19 percent of golf's irrigation water sources in 2024. Data centers draw on municipal, reclaimed, and groundwater supplies depending on the site. A liter of treated drinking water and a liter of reclaimed wastewater are not equal in value to a community.
5. **Different years, methods, and directions.** The figures are a year apart, one is a model and the other a survey, and they are moving in opposite directions: golf's applied water fell 31 percent from 2005 to 2024, while data center direct consumption roughly tripled from 2014 to 2023.

What the evidence supports: nationally, golf irrigation is the larger water user by these published measures, and data center water use is smaller but growing quickly and concentrated in specific places. Whether any given project is a good use of local water is a local question that needs local data: the site's cooling design, its WUE, its water source, and the condition of the watershed.

## Courses on cooling, efficiency, and environmental compliance

These self-paced courses cover the cooling, efficiency, maintenance, and permitting decisions that drive a facility's water use. Each awards a certificate of completion.

### [Cooling Systems Design & Optimization](https://datacentertraining.us/courses/cooling-systems-design-optimization.html)

Cooling & Efficiency · Comprehensive Program · PUE / ASHRAE Thermal Guidelines

Cut cooling costs and improve reliability with modern thermal management strategy.

8 hrs

$298.99

- [Enroll](https://datacentertraining.us/checkout.html?item=cooling-systems-design-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=cooling-systems-design-optimization)

### [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html)

Cooling & Efficiency · Modular Specialization · PUE

Cut operating costs with a measurable PUE optimization roadmap.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=energy-efficiency-pue-optimization)
- [Add to Cart](https://datacentertraining.us/cart.html?add=energy-efficiency-pue-optimization)

### [Mechanical Systems & Equipment Maintenance](https://datacentertraining.us/courses/mechanical-systems-maintenance.html)

Cooling & Efficiency · Modular Specialization

Hands-on mechanical maintenance — piping, chillers, and vibration diagnostics.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=mechanical-systems-maintenance)
- [Add to Cart](https://datacentertraining.us/cart.html?add=mechanical-systems-maintenance)

### [Facility Environmental Compliance](https://datacentertraining.us/courses/facility-environmental-compliance.html)

Security & Compliance · Modular Specialization

Understand the environmental regulations that apply to your facility.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=facility-environmental-compliance)
- [Add to Cart](https://datacentertraining.us/cart.html?add=facility-environmental-compliance)

Save 42% with the bundle

Cooling & Facilities Efficiency Bundle

6 courses · 24 hours · **$462.99** per seat, instead of ~~$798.94~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-cooling-efficiency)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

Facility managers responsible for permits and reporting should also see [Facility Environmental Compliance](https://datacentertraining.us/courses/facility-environmental-compliance.html), and teams tracking efficiency targets should see [Energy Efficiency & PUE Optimization](https://datacentertraining.us/courses/energy-efficiency-pue-optimization.html).

## Frequently asked questions

### Do golf courses use more water than data centers?

On U.S. national totals, yes. Golf facilities applied a projected 1.63 million acre-feet of water in 2024, about 2 trillion liters, according to the GCSAA. Lawrence Berkeley National Laboratory estimates that data centers directly consumed about 66 billion liters in 2023, plus nearly 800 billion liters indirectly through electricity. The figures measure different things, so the comparison says little about local water impact.

### How much water does a data center use per day?

It depends on size, climate, and cooling design, so no single number is accurate. You can estimate on-site use by multiplying daily IT energy by the site's water usage effectiveness (WUE). For example, a facility with 10 MW of IT load uses 240,000 kWh a day; at the 2023 U.S. average site WUE of about 0.36 liters per kWh, that is roughly 86,000 liters a day. Evaporatively cooled sites can use much more, and air-cooled sites far less.

### What is the difference between water withdrawal and water consumption?

Withdrawal is all the water taken from a source. Consumption is the part that is not returned to the immediate water cycle, mostly because it evaporates. In a cooling tower, the water that evaporates is consumed, while blowdown is discharged and can be treated and reused downstream.

### Does liquid cooling use more or less water?

The liquid loop to the chips is closed and does not consume water by itself. Total water use depends on how the facility rejects the heat. Liquid cooling allows warmer water temperatures, which can extend economizer hours and allow dry coolers, but if the heat ends up in evaporative cooling towers, the site still consumes water.

### Is data center water usage increasing?

Yes. Lawrence Berkeley National Laboratory estimates U.S. data center direct water consumption rose from 21.2 billion liters in 2014 to about 66 billion liters in 2023, and projects that hyperscale data centers alone could consume 60 to 124 billion liters in 2028. Indirect water use also grows with electricity demand.

## Sources

- Shehabi, A., et al., Lawrence Berkeley National Laboratory, [2024 United States Data Center Energy Usage Report](https://escholarship.org/uc/item/32d6m0d1), LBNL-2001637, December 2024 (direct and indirect water consumption, WUE, cooling system trade-offs).
- U.S. Department of Energy, [DOE releases new report evaluating increase in electricity demand from data centers](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers) (electricity share in 2023 and 2028 projections).
- Golf Course Superintendents Association of America, [Golf courses reduce water usage by 31 percent according to national survey](https://www.gcsaa.org/who-we-are/media/news-release/2025/12/30/golf-courses-reduce-water-usage-by-31-percent-according-to-national-survey), December 30, 2025 (2024 applied water and water sources).
- Golf Course Superintendents Association of America, [Golf Course Environmental Profile, Phase III, Volume I: Water Use and Management Practices on U.S. Golf Courses](https://www.gcsaa.org/docs/default-source/environment/phase-3-water-survey-full-report.pdf), 2022 (acre-foot definition, survey method, 2020 regional shares).

## Keep learning

[Guide](https://datacentertraining.us/learn/energy-efficiency-pue.html)

### Energy Efficiency & PUE

PUE, WUE, and CUE, and how to cut facility overhead.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-cooling.html)

### How Data Center Cooling Works

Chillers, towers, economizers, and liquid cooling explained.

Read the guide →

[Guide](https://datacentertraining.us/learn/ai-data-centers.html)

### AI & High-Density Data Centers

Why AI racks push cooling, power, and water decisions.

Read the guide →

[Careers](https://datacentertraining.us/careers/data-center-hvac-technician.html)

### Data Center HVAC Technician

The people who run chillers, towers, and water treatment.

See the role →

[Research](https://datacentertraining.us/careers/how-many-jobs-does-a-data-center-create.html)

### How Many Jobs Does a Data Center Create?

Construction and permanent jobs, with sources.

Read the research →

[Careers](https://datacentertraining.us/careers/ai-data-center-jobs.html)

### AI Data Center Jobs

Roles opening up as AI campuses are built and operated.

Explore jobs →

This guide is general educational information, not engineering, environmental, or legal advice. Figures are national estimates with the years and scopes stated; check local utility, permit, and watershed data for any specific site.

## Train Your Team on Efficient Cooling

Our Cooling & Facilities Efficiency courses cover cooling design, PUE optimization, chillers, water treatment, and the maintenance that keeps them efficient.

- [See the Cooling Bundle](https://datacentertraining.us/bundles.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/data-center-water-usage.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
