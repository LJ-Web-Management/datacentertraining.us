# Anti-Tailgating in Access Control: How Data Centers Stop Piggybacking

Knowledge Center · Security

A badge reader only proves that one badge was presented. Tailgating, when a second person walks through on the first person's badge, is how most unauthorized people get into secure spaces. Here is what anti-tailgating means, the systems data centers use to enforce it, and how to keep them from becoming a life safety problem.

9 min read All levels Updated October 2026

On this page

1. [What tailgating is](https://datacentertraining.us/learn/anti-tailgating.html#what)
2. [Anti-tailgating systems](https://datacentertraining.us/learn/anti-tailgating.html#systems)
3. [Anti-tailgating vs. anti-passback](https://datacentertraining.us/learn/anti-tailgating.html#passback)
4. [Where to use it](https://datacentertraining.us/learn/anti-tailgating.html#layers)
5. [Egress and life safety](https://datacentertraining.us/learn/anti-tailgating.html#life-safety)
6. [Audit logs and compliance](https://datacentertraining.us/learn/anti-tailgating.html#audit)
7. [Training and culture](https://datacentertraining.us/learn/anti-tailgating.html#people)
8. [Access control courses](https://datacentertraining.us/learn/anti-tailgating.html#courses)
9. [FAQ](https://datacentertraining.us/learn/anti-tailgating.html#faq)
10. [Sources](https://datacentertraining.us/learn/anti-tailgating.html#sources)

[**Test yourself**Take the Security & Compliance quiz.](https://datacentertraining.us/quizzes/security-compliance-quiz.html)

**Short answer:** Anti-tailgating is any control that makes sure only one authorized person passes through an access point per valid credential. In data centers it is enforced with mantraps (interlocking double-door vestibules), single-person security portals, optical turnstiles, and video analytics that detect two people on one badge, backed by staff training and a culture of challenging strangers. It is different from anti-passback, which stops one badge from being used to enter twice without exiting.

Key takeaways

- Tailgating (or piggybacking) is a person following an authorized user through a door without presenting their own credential.
- Mantraps and single-person portals physically stop it; turnstiles and video analytics detect and alarm on it.
- Anti-passback is a related but different control: it blocks a badge that has not been used to exit from entering again.
- Every anti-tailgating device in a path of egress must still let people out in an emergency under the fire and life safety code.
- Technology fails without training: staff need to know they are expected to stop and challenge, and how to do it safely.

## What is tailgating in access control?

Tailgating is when an unauthorized person follows an authorized person through a controlled door before it closes. Piggybacking is the same thing with the authorized person's knowledge, for example holding the door for a colleague or a delivery driver. Either way, the access control system logs one entry while two people go through, so the record of who is inside is wrong.

In a data center that matters for more than theft. Customers and auditors rely on access records to prove that only authorized people reached their cages, the security team uses them to account for everyone during an evacuation, and an untrained visitor in an electrical room is a safety hazard.

## Anti-tailgating systems used in data centers

**Anti-tailgating options compared**

| System | How it works | Prevents or detects? | Typical location |
| --- | --- | --- | --- |
| Mantrap (interlocking vestibule) | Two doors that cannot be open at the same time; the second unlocks only after the first closes and the person is verified | Prevents | Building entry, data hall entry |
| Single-person security portal | Enclosed revolving or sliding portal with sensors (weight, overhead 3D, or infrared) that confirm only one person is inside | Prevents | Data hall and high-security cage entry |
| Optical turnstile or speed gate | Sensor beams count people through a lane and alarm on two per credential; barrier arms or glass wings add resistance | Detects, slows | Lobby, security checkpoint |
| Full-height turnstile | Rotating barrier that admits one person per rotation | Prevents (mostly) | Perimeter, parking, construction gates |
| Video analytics and people counting | Overhead cameras count people per door opening and alert the security desk | Detects | Doors where a portal is not practical |
| Door-held and door-forced alarms | Alarm when a door stays open too long or opens without a valid credential | Detects | Every controlled door |

Most sites combine them: a mantrap at the building entry with biometric verification, single-person portals or interlocked doors into the data halls, and door-held alarms everywhere. Pairing a card with a PIN or biometric adds identity assurance but does not by itself stop a second person from following.

## Anti-tailgating vs. anti-passback

The two terms are often confused. **Anti-tailgating** stops two people passing on one credential. **Anti-passback** stops one credential being used twice in the same direction, for example a badge passed back over a turnstile to a second person, by requiring the badge to register an exit before it can enter again. Hard anti-passback denies the second entry; soft anti-passback allows it but logs an alarm. Anti-passback only works when entry and exit are both read, so it is common at mantraps and turnstiles and rare at single doors.

## Where data centers use anti-tailgating controls

Data center physical security is built in layers, from the fence line to the rack. Anti-tailgating controls belong at the transitions where the level of trust changes:

- The building entry, where visitors are separated from badge holders.
- The data hall or white space entry, where only people with a work reason should pass.
- High-security areas such as customer suites, cages with their own requirements, and media destruction rooms.
- Shipping and receiving, where dock doors are a common gap.

For the full layered model and how it maps to SOC 2, ISO 27001, and PCI DSS, read [data center physical security and compliance](https://datacentertraining.us/learn/data-center-security-compliance.html).

## Anti-tailgating and egress: the life safety rule

Any anti-tailgating device that sits in a path of egress must still allow people to get out in an emergency. The building and fire codes, including NFPA 101, Life Safety Code, and the locking rules your jurisdiction has adopted, set requirements such as free egress from the inside, release on fire alarm or power loss where required, and limits on delayed-egress locking. Mantraps and portals are designed with these modes, but they must be configured and tested with the fire alarm system and approved by the authority having jurisdiction. Security staff should know exactly how each portal behaves in fire alarm, power loss, and manual release.

## Audit logs without overwhelming administrators

Tailgating detection creates alarms, and alarms create workload. The physical security systems that keep complete audit logs without burying administrators share a few traits: they log every event but alert only on events that need action; they correlate the access event with the camera clip so an operator can confirm a tailgate in seconds; they group repeated door-held alarms from the same door; and they produce scheduled reports for auditors so nobody has to dig through raw logs. Whatever platform you use, decide in writing which events alert, which are logged only, and how long records are retained to meet customer and audit requirements.

## Training and culture: the part technology cannot do

Most tailgating happens because people are polite. Training should make three expectations clear: everyone badges every time, nobody holds a secure door for anyone, and anyone who sees an unbadged person reports it or, if trained to do so, challenges them politely. Security officers need practice on how to challenge without escalating and what to do when someone refuses. Our guide to [data center security guards](https://datacentertraining.us/learn/data-center-security-guards.html) covers the officer side in more detail.

**Know your mantrap from your portal?** Ten questions on data center security and compliance.

[Take the Security Quiz](https://datacentertraining.us/quizzes/security-compliance-quiz.html)

## Access control and physical security courses

### [Access Control & Physical Security](https://datacentertraining.us/courses/access-control-physical-security.html)

Security & Compliance · Modular Specialization

Practical security training for facility staff — access control, surveillance, and incident reporting.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=access-control-physical-security)
- [Add to Cart](https://datacentertraining.us/cart.html?add=access-control-physical-security)

### [Data Center Physical Security and Access Control Training](https://datacentertraining.us/courses/data-center-physical-security-access-control.html)

Security & Compliance · Modular Specialization

Foundational physical security and access control practices for data hall environments.

1 hr

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-physical-security-access-control)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-physical-security-access-control)

### [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html)

Security & Compliance · Comprehensive Program · SOC 2 / ISO 27001

Build a facility security program that satisfies SOC 2, ISO 27001, and physical audit requirements.

16 hrs

$291.99

- [Enroll](https://datacentertraining.us/checkout.html?item=security-compliance-data-centers)
- [Add to Cart](https://datacentertraining.us/cart.html?add=security-compliance-data-centers)

Save 42% with the bundle

Security & Compliance Bundle

5 courses · 27 hours · **$400.99** per seat, instead of ~~$691.95~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-security-compliance)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Frequently asked questions

### What is anti-tailgating in access control?

Anti-tailgating is any measure that ensures only one authorized person passes through a controlled access point for each valid credential. It includes physical barriers such as mantraps and single-person portals, detection such as sensor turnstiles and video analytics, and staff training.

### What is the difference between tailgating and piggybacking?

Both mean an unauthorized person passing through a secure door behind an authorized one. Tailgating usually means the authorized person did not know; piggybacking means they allowed it, for example by holding the door.

### What is the difference between anti-tailgating and anti-passback?

Anti-tailgating prevents two people passing on one credential. Anti-passback prevents one credential from being used to enter twice without exiting in between, which stops people from passing a badge back to someone else.

### What is a mantrap in a data center?

A mantrap is a small vestibule with two interlocked doors. The second door will not open until the first has closed and the person inside has been verified, often with a badge plus a biometric or a single-person sensor.

### Do mantraps have to allow emergency exit?

Yes. A mantrap or portal in a path of egress must meet the life safety and building code requirements your jurisdiction has adopted, which generally means people can get out in an emergency. The configuration must be approved by the authority having jurisdiction and tested with the fire alarm system.

## Sources

- NFPA, [NFPA 101, Life Safety Code](https://www.nfpa.org/codes-and-standards/nfpa-101-standard-development/101).
- PCI Security Standards Council, [PCI DSS v4.0.1](https://www.pcisecuritystandards.org/document_library/) (Requirement 9, restrict physical access to cardholder data).
- CISA, [Physical security](https://www.cisa.gov/topics/physical-security).

## Keep learning

[Guide](https://datacentertraining.us/learn/data-center-security-compliance.html)

### Physical Security and Compliance

Layers of security plus SOC 2, ISO 27001, and PCI DSS.

Read the guide →

[Guide](https://datacentertraining.us/learn/data-center-security-guards.html)

### Data Center Security Guards

Armed and unarmed officers, duties, and training.

Read the guide →

[Training](https://datacentertraining.us/training/data-center-security-training.html)

### Data Center Security Certification

Certifications and courses for security teams.

See the training →

[Careers](https://datacentertraining.us/careers/data-center-security-jobs.html)

### Data Center Security Jobs

Roles, skills, and how to get hired.

See the roles →

This guide is general educational information, not security engineering or code compliance advice. Door locking and egress arrangements must meet the codes your authority having jurisdiction has adopted.

## Train Your Security Team

Online access control, physical security, and compliance courses for data center security officers, supervisors, and managers.

- [See Security Training](https://datacentertraining.us/training/data-center-security-training.html)
- [Browse All Courses](https://datacentertraining.us/courses.html)
- [Call 1-866-429-6742](tel:18664296742)

---

Markdown version of https://datacentertraining.us/learn/anti-tailgating.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
