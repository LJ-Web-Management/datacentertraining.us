# Data Center Security & Compliance Quiz

Quiz · Security & Compliance

Ten questions on how data centers control who gets in and how auditors check it, from mantraps to SOC 2 and PCI DSS. Each answer comes with a short explanation.

10 questions About 5 minutes Intermediate

## Quiz questions

1. Question 1 Data center physical security is built in layers. Which order runs from the outside in?

   - Data hall, building entry, perimeter, cabinet
   - Perimeter fence and gate, building entry, data hall entry, cage or cabinet lock
   - Cabinet lock, cage, lobby, perimeter
   - Lobby, perimeter, cabinet, data hall

   **Show answer**

   **Answer: perimeter, building, data hall, cabinet.** Each layer delays and detects an intruder and needs its own authorization, so one failed control does not expose the equipment. Cameras, guards, and alarms back up every layer. [Read the security and compliance guide](https://datacentertraining.us/learn/data-center-security-compliance.html).
2. Question 2 What is a mantrap (access control vestibule) designed to prevent?

   - Fire and smoke spreading between rooms
   - Dust and contaminants entering the data hall
   - Unauthorized logins to the corporate network
   - Tailgating and piggybacking, by letting only one authorized person through at a time

   **Show answer**

   **Answer: tailgating and piggybacking.** A mantrap has two interlocked doors, and the second will not open until the first has closed. Many add a second factor such as biometrics, or sensors that detect more than one person inside. [Access Control & Physical Security](https://datacentertraining.us/courses/access-control-physical-security.html) covers entry design.
3. Question 3 A vendor technician arrives to service a CRAH but is not on the access list. What is the correct practice?

   - Let them in, since they have a company uniform and a signed work order
   - Lend them a staff badge for the day so they can move around freely
   - Verify the visit with the requester, check ID, log them in, badge them, and escort them throughout
   - Give them the door code and ask them to sign out when they finish

   **Show answer**

   **Answer: verify, log, badge, and escort.** Visitors are checked against a scheduled request, identified, logged, badged, and escorted at all times inside controlled areas. Sharing badges or codes breaks the audit trail that SOC 2, ISO/IEC 27001, and PCI DSS assessors look for. [Data Center Physical Security and Access Control Training](https://datacentertraining.us/courses/data-center-physical-security-access-control.html) covers visitor handling.
4. Question 4 Which list matches the five AICPA Trust Services Criteria used in SOC 2 reports?

   - Security, availability, processing integrity, confidentiality, and privacy
   - Identify, protect, detect, respond, and recover
   - Confidentiality, integrity, availability, authentication, and authorization
   - Plan, do, check, act, and improve

   **Show answer**

   **Answer: security, availability, processing integrity, confidentiality, and privacy.** Security is included in every SOC 2 report, and the other criteria are added when they fit the service; data centers often include availability. Option b lists functions from the NIST Cybersecurity Framework. [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html) covers SOC 2 audits.
5. Question 5 Which statement about ISO/IEC 27001 is correct?

   - It is a U.S. federal law that protects health information
   - It is the AICPA standard for attestation reports
   - It rates data center redundancy from level 1 to level 4
   - It is an international standard for an information security management system, and organizations can be certified against it

   **Show answer**

   **Answer: it is the international ISMS standard.** Accredited certification bodies audit and certify organizations against ISO/IEC 27001. Its Annex A controls include physical security, such as secure perimeters, entry controls, equipment protection, and secure disposal. [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html) compares the frameworks.
6. Question 6 In PCI DSS, what does Requirement 9 cover?

   - Encrypting cardholder data sent over public networks
   - Restricting physical access to cardholder data
   - Installing and maintaining network security controls such as firewalls
   - Running regular penetration tests

   **Show answer**

   **Answer: restricting physical access to cardholder data.** Requirement 9 covers facility entry controls, visitor handling, and the protection and destruction of media. In a colocation facility, the provider often covers part of it for customers, which is documented in a responsibility matrix. [Read the security and compliance guide](https://datacentertraining.us/learn/data-center-security-compliance.html).
7. Question 7 Which of these is a HIPAA Security Rule physical safeguard?

   - A risk analysis and workforce security training
   - Unique user IDs and audit logs
   - Facility access controls, workstation security, and device and media controls
   - Encrypting data sent over the internet

   **Show answer**

   **Answer: facility access, workstation, and device and media controls.** Physical safeguards are listed in 45 CFR 164.310. Risk analysis and training are administrative safeguards, and user IDs, audit logs, and transmission security are technical safeguards. [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html) covers HIPAA requirements.
8. Question 8 Why do data centers run periodic access reviews?

   - To confirm each person's access is still needed and remove access for people who left or changed roles
   - To check that badge readers and door controllers have fresh batteries
   - To count how many visitors entered the building during the quarter
   - To give everyone the same access level so the system is simpler to run

   **Show answer**

   **Answer: to remove access that is no longer needed.** Reviews compare access lists against HR records and customer authorizations, and access for people who are no longer authorized is a classic audit finding. Terminations should be removed right away, not at the next review. [Data Center Physical Security and Access Control Training](https://datacentertraining.us/courses/data-center-physical-security-access-control.html) covers access governance.
9. Question 9 A failed hard drive held customer data. What is the accepted way to handle it?

   - Put it in the regular e-waste bin with other failed parts
   - Reformat it and resell it through an IT asset reseller
   - Keep it under chain of custody until it is sanitized or destroyed, with a destruction record
   - Ship it back to the manufacturer under warranty without wiping it

   **Show answer**

   **Answer: chain of custody, then sanitize or destroy.** NIST SP 800-88 describes clear, purge, and destroy methods, and degaussing works only on magnetic media, not SSDs. Many customers require that drives never leave the site intact. [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html) covers media handling.
10. Question 10 When does EPA's SPCC rule (40 CFR Part 112) generally apply to a data center?

    - Whenever the site has any generator, no matter how much fuel it stores
    - When aboveground oil storage exceeds 1,320 U.S. gallons and a spill could reach navigable waters or shorelines
    - Only when the site stores refrigerant cylinders in a mechanical room
    - Only when the site sits directly on an ocean coastline

    **Show answer**

    **Answer: above 1,320 gallons aboveground, with a path to water.** Bulk diesel tanks, generator day tanks, and oil-filled transformers of 55 gallons or more count toward capacity. The Spill Prevention, Control, and Countermeasure plan covers containment, inspections, training, and spill response. [Facility Environmental Compliance](https://datacentertraining.us/courses/facility-environmental-compliance.html) covers SPCC plans.

Choose an answer to continue.

## Courses That Cover These Topics

Every question above maps to a self-paced course. Each awards a certificate of completion.

### [Security & Compliance for Data Centers](https://datacentertraining.us/courses/security-compliance-data-centers.html)

Security & Compliance · Comprehensive Program · SOC 2 / ISO 27001

Build a facility security program that satisfies SOC 2, ISO 27001, and physical audit requirements.

16 hrs

$291.99

- [Enroll](https://datacentertraining.us/checkout.html?item=security-compliance-data-centers)
- [Add to Cart](https://datacentertraining.us/cart.html?add=security-compliance-data-centers)

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

### [Facility Environmental Compliance](https://datacentertraining.us/courses/facility-environmental-compliance.html)

Security & Compliance · Modular Specialization

Understand the environmental regulations that apply to your facility.

4 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=facility-environmental-compliance)
- [Add to Cart](https://datacentertraining.us/cart.html?add=facility-environmental-compliance)

### [Data Center Fire Suppression System Safety Training (Clean Agent Systems)](https://datacentertraining.us/courses/data-center-fire-suppression-safety.html)

Security & Compliance · Modular Specialization · NFPA 2001

Clean agent fire suppression safety for occupied data hall environments.

2 hrs

$99.99

- [Enroll](https://datacentertraining.us/checkout.html?item=data-center-fire-suppression-safety)
- [Add to Cart](https://datacentertraining.us/cart.html?add=data-center-fire-suppression-safety)

Save 42% with the bundle

Security & Compliance Bundle

5 courses · 27 hours · **$400.99** per seat, instead of ~~$691.95~~ bought separately

- [Enroll in the Bundle](https://datacentertraining.us/checkout.html?item=bundle-security-compliance)
- [Compare Bundles](https://datacentertraining.us/bundles.html)

## Keep Going

Brush up with a guide, or try another quiz.

### [Data Center Security & Compliance](https://datacentertraining.us/learn/data-center-security-compliance.html)

The guide behind this quiz: physical security layers and audit frameworks.

Read the guide →

### [Data Center Safety Quiz](https://datacentertraining.us/quizzes/safety-quiz.html)

Arc flash, LOTO, batteries, and confined spaces.

Take the quiz →

### [Which Career Fits You?](https://datacentertraining.us/quizzes/career-quiz.html)

Find your data center role in ten questions.

Find my match →

---

Markdown version of https://datacentertraining.us/quizzes/security-compliance-quiz.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
