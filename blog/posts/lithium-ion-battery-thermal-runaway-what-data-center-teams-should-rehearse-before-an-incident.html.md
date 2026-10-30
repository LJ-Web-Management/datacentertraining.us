# Lithium-Ion Battery Thermal Runaway: What Data Center Teams Should Rehearse Before an Incident

[← Back to Blog](https://datacentertraining.us/blog/)

September 24, 2026

![Lithium-Ion Battery Thermal Runaway: What Data Center Teams Should Rehearse Before an Incident](https://datacentertraining.us/blog/assets/img/posts/lithium-ion-battery-thermal-runaway-what-data-center-teams-should-rehearse-before-an-incident.jpg)

## The Operational Question

Lithium-ion battery systems can support data center resilience, but a thermal runaway event requires a coordinated response that is different from ordinary UPS alarm handling. The hard question is not simply whether a battery cabinet has a smoke detector or whether the fire system is maintained. It is whether facilities, security, operations, emergency response, and contractors understand the first indications, the decision points, the boundaries of the room, and the handoff to the incident commander.

This guide lays out a rehearsal framework for data center teams that use lithium-ion UPS batteries or are evaluating them for a new installation. It explains what a facility manager should verify before an exercise, what technicians and NOC staff need to recognize, and how to connect emergency-response training to a role-based plan. The objective is practical readiness, not a promise that a course certificate replaces the site emergency action plan, the fire protection design, or instructions from the authority having jurisdiction.

## Who This Affects

The scenario affects any site with lithium-ion battery cabinets, integrated battery systems, or a planned conversion from valve-regulated lead-acid batteries to lithium-ion technology. It is relevant to:

- Critical facilities managers responsible for UPS rooms, battery rooms, emergency action plans, and vendor coordination.
- Electrical technicians who inspect UPS equipment, battery cabinets, disconnects, monitoring points, and DC distribution.
- NOC and operations staff who receive battery, temperature, smoke, gas, or system-health alarms.
- EHS managers and emergency coordinators who maintain evacuation, accountability, and incident-command procedures.
- Security staff who control access, guide first responders, and preserve safe perimeter information during an event.
- Fire protection and commissioning teams validating detection, suppression, ventilation, and shutdown interfaces.
- Colocation and hyperscale contractors working near energized battery systems during construction, maintenance, or expansion.
- Training coordinators building different learning paths for electricians, operators, security officers, and managers.

The rehearsal needs to fit the site type. An enterprise data center may have a local fire brigade relationship and a small facilities team. A colocation site may need to account for customer communications and multiple contractors. A hyperscale campus may have a dedicated emergency management structure but several battery rooms across a large property. An edge site may have remote monitoring and delayed on-site response. The common issue is that an alarm can start in an electrical room while the people who must make the first decisions are elsewhere.

## What Can Go Wrong

Thermal runaway is a rapid self-heating condition in a battery cell or module. It can involve venting, heat release, smoke, flammable gases, pressure, cascading cell failure, or re-ignition concerns. The exact behavior depends on the battery chemistry, enclosure, state of charge, installation, damage, ventilation, and protection systems. A team should not assume that a lithium-ion room behaves like a server room, a generator room, or a conventional VRLA battery room.

The first operational problem is delayed recognition. A BMS alarm may appear before visible smoke, but the alarm could be routed to a screen that no one is watching or labeled in language the NOC does not understand. A temperature rise, module imbalance, communication fault, gas detection signal, or repeated battery warning may be treated as a nuisance because the team has not practiced its meaning.

The second problem is unsafe investigation. A technician may be tempted to open a cabinet, reset a fault, silence an alarm, or enter the room to look for a failed module. If the emergency plan does not clearly state when entry stops and who authorizes it, a routine troubleshooting instinct can place people in a changing atmosphere or near damaged equipment.

The third problem is fragmented response. Facilities may be focused on protecting critical load, security may be focused on access, the NOC may be focused on customer notification, and the fire response team may be focused on life safety. Without a shared incident command structure, these actions can conflict. A door may be opened to improve visibility when the procedure calls for keeping the room closed. A vendor may be dispatched without receiving the current alarm state. A shutdown may be requested without identifying which UPS or battery cabinet is affected.

The fourth problem is an incomplete handoff. A room can appear quiet after an alarm clears while a damaged cell, hot spot, or residual energy condition remains. The team needs a process for monitoring, restricting re-entry, documenting equipment state, and returning the room to service only after the appropriate technical and emergency reviews.

Consequences can include:

- Injury from heat, smoke, pressure release, electrical energy, or an unsafe approach.
- Loss of UPS capacity or a forced change to a less resilient power configuration.
- Unplanned evacuation, customer impact, or a prolonged maintenance outage.
- Damage to adjacent battery modules, switchgear, cabling, or room finishes.
- Confusion over whether a fire alarm, BMS alarm, or UPS alarm is the initiating event.
- Incomplete records that make the next shift underestimate the remaining risk.

The correct response is site-specific. NFPA 855, local fire codes, the equipment manufacturer, the fire protection engineer, and the authority having jurisdiction may all affect the design and procedure. Training should help a team ask the right questions without presenting a generic checklist as a universal code requirement.

## What Managers Should Check

A rehearsal should be built around decisions and communications, not only around a list of alarm names. Before running an exercise, the manager should check the following.

1. Identify the battery technology and installation boundaries. Record the battery chemistry, cabinet or room location, UPS association, rated capacity, ventilation design, detection types, suppression approach, and nearby equipment. Make sure the emergency plan distinguishes the battery room from the UPS room if they are separate.
2. Map the alarm path. List every alarm that may precede or accompany an event, such as temperature, cell voltage, module fault, BMS communication loss, smoke, gas, fire, or UPS battery abnormality. For each alarm, document where it appears, who receives it, the expected acknowledgement, and the escalation timer.
3. Define the first safe action. The plan should state what the first operator does without entering the room. This may include acknowledging the alarm, notifying the incident lead, restricting access, checking adjacent indicators, and following the emergency action plan. The exercise should test whether staff can do these steps from their normal workstations.
4. Establish an entry decision. Define who can authorize entry, what conditions must exist, what information responders need, and when the room is treated as unsafe to enter. Do not use a training exercise to invent PPE, gas testing, firefighting, or rescue requirements. Those controls must come from the site plan and qualified emergency professionals.
5. Connect the battery event to critical-power decisions. Identify the load served by the UPS, the available modules, the expected runtime, the bypass path, generator dependency, and the consequences of isolating a battery cabinet. Operations staff should know who evaluates the power impact while emergency personnel evaluate life safety.
6. Check emergency access and accountability. Security should know how to keep untrained people out, provide responders with a current floor plan, control contractor access, and account for occupants. Confirm that access-control behavior does not trap people or create an unplanned route through the affected area.
7. Verify the communications tree. Include facilities, NOC, EHS, security, building management, the UPS vendor, the fire protection vendor, leadership, and customer-facing contacts as appropriate. Define who speaks for the site and what information must be verified before external communication.
8. Exercise the no-reset rule. Ask what happens if the alarm clears after an operator acknowledges it. The correct answer should not be an automatic reset-and-close ticket. The team should know which evidence to preserve, what equipment remains out of service, and who approves the next step.
9. Test the handoff to responders. Practice giving concise information: location, alarm time, observed indicators, battery type, UPS association, known injuries, room access status, and current power configuration. Avoid assumptions about what is burning or which protective system has operated.
10. Define recovery gates. Write the conditions for technical inspection, environmental checks, equipment isolation, damage assessment, replacement, monitoring, and return to service. Include a plan for customer and shift handoff if the room remains restricted.
11. Capture exercise findings. Record delayed notifications, unclear alarm labels, missing contacts, conflicting instructions, access problems, and decisions that depended on one person’s memory. Assign owners and due dates. A rehearsal that produces no corrective action has limited value.
12. Repeat with role changes. Run the exercise once with the normal day shift and again with an off-shift or remote-monitoring team. If the response depends on one experienced technician being present, the training gap is already visible.

A manager can keep the exercise controlled by declaring a tabletop scenario and prohibiting real equipment manipulation. The value comes from seeing how people interpret information and transfer responsibility under pressure.

## Which Training Fits This Situation

Lithium-Ion Battery Thermal Runaway and Emergency Response Training is the most direct fit for technicians, supervisors, and emergency coordinators who need a focused foundation for battery hazards, warning signs, and response planning. It can anchor the common vocabulary used in the tabletop exercise.

Data Center UPS and Battery System Safety Training is useful for staff who work around the UPS and battery system during normal maintenance. It helps connect battery safety to cabinet access, stored energy, operating modes, and the boundaries between routine work and an abnormal event.

Batteries and DC Circuits can support technicians who need a shorter introduction to battery strings, DC hazards, and the electrical relationships behind a battery alarm. For managers and operations leads, Power Systems & Electrical Fundamentals provides broader context for the critical-power path and the effect of battery isolation on UPS resilience.

A role-based plan might assign training this way:

- Facilities technicians: Lithium-Ion Battery Thermal Runaway and Emergency Response Training, followed by Data Center UPS and Battery System Safety Training and site-specific supervised work practices.
- NOC and operations staff: the lithium-ion emergency-response course plus a tabletop using actual alarm labels and the site escalation tree.
- Security and access staff: the emergency-response course at the level needed for access control, accountability, responder support, and restricted-area procedures.
- Facility managers and EHS leads: the lithium-ion course plus Power Systems & Electrical Fundamentals, with responsibility for exercise design, documentation, and corrective actions.
- A broader electrical team: the Power & Electrical Systems Bundle assigned by role, supplemented with a live site exercise and employer qualification process.

These are self-paced knowledge courses that provide a certificate of completion. They do not grant a fire-service credential, regulatory certification, electrical license, or permission to enter a hazardous room. The employer must still use the manufacturer’s instructions, site emergency action plan, applicable fire and electrical requirements, qualified responders, and local authority guidance.

## Common Mistakes to Avoid

- Treating a battery alarm as a nuisance because no smoke is visible.
- Sending a technician into the room to investigate before the entry decision is made.
- Resetting the BMS or UPS alarm without preserving the event history and notifying the incident lead.
- Assuming a suppression system removes the need for evacuation, isolation, or responder coordination.
- Using generic language such as “battery issue” instead of identifying the room, cabinet, UPS, and alarm type.
- Failing to tell the NOC how a battery cabinet isolation changes available runtime or redundancy.
- Allowing contractors to continue nearby work without a clear boundary and authorization.
- Ignoring adjacent rooms, shared ventilation, cable paths, or equipment that may be affected by heat or smoke.
- Practicing only with the day shift and assuming the alarm path is understood overnight.
- Closing the incident when the alarm clears instead of creating technical and recovery gates.
- Purchasing a course and treating the certificate as the site’s emergency qualification.
- Writing a plan that depends on one experienced person rather than a repeatable team response.

## Key Takeaway

A lithium-ion battery response plan is only as strong as the first five minutes after the first credible alarm. This week, run a no-equipment tabletop with the facilities lead, NOC, security, and EHS contact using one real battery-room alarm path, and record the first decision each role would make before anyone enters the room.

## Sources

- [National Fire Protection Association, NFPA 855 Standard for the Installation of Stationary Energy Storage Systems](https://www.nfpa.org/codes-and-standards/nfpa-855-standard-development/855)
- [Occupational Safety and Health Administration, Emergency Action Plans, 29 CFR 1910.38](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.38)
- [National Fire Protection Association, NFPA 70E Standard for Electrical Safety in the Workplace](https://www.nfpa.org/codes-and-standards/nfpa-70e-standard-development/70e-2024)
- [Cybersecurity and Infrastructure Security Agency, Physical Security Performance Goals](https://www.cisa.gov/resources-tools/resources/physical-security-performance-goals)

## More from the blog

[!\[Tier Infrastructure Review: What Facility Managers Should Verify Beyond the Label\](https://datacentertraining.us/blog/assets/img/posts/tier-infrastructure-review-what-facility-managers-should-verify-beyond-the-label.jpg)](https://datacentertraining.us/blog/posts/tier-infrastructure-review-what-facility-managers-should-verify-beyond-the-label.html)

September 25, 2026

### Tier Infrastructure Review: What Facility Managers Should Verify Beyond the Label

[!\[How to Build a Role-Based Training Matrix for a Colocation Facility\](https://datacentertraining.us/blog/assets/img/posts/how-to-build-a-role-based-training-matrix-for-a-colocation-facility.jpg)](https://datacentertraining.us/blog/posts/how-to-build-a-role-based-training-matrix-for-a-colocation-facility.html)

September 24, 2026

### How to Build a Role-Based Training Matrix for a Colocation Facility

[!\[DCIM vs BMS Alarm Dashboards: What Data Center Operations Teams Should Verify\](https://datacentertraining.us/blog/assets/img/posts/dcim-vs-bms-alarm-dashboards-what-data-center-operations-teams-should-verify.jpg)](https://datacentertraining.us/blog/posts/dcim-vs-bms-alarm-dashboards-what-data-center-operations-teams-should-verify.html)

September 24, 2026

### DCIM vs BMS Alarm Dashboards: What Data Center Operations Teams Should Verify

[View all posts →](https://datacentertraining.us/blog/)

---

Markdown version of https://datacentertraining.us/blog/posts/lithium-ion-battery-thermal-runaway-what-data-center-teams-should-rehearse-before-an-incident.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
