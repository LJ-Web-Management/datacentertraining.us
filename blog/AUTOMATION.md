Every day at the scheduled run time, create 1 fresh, original blog post package for datacentertraining.us, upload it to the GitHub repository `LJ-Web-Management/datacentertraining.us`, and save a local copy in the dated Blog Posts folder.

This automation runs once per day. Each run must create exactly 1 new blog post package.

The new blog post package must be a `.zip` file. The ZIP package must contain exactly:
- One complete blog post file ending in `.txt`.
- One generated cover image for that specific blog post, saved as a wide 16:9 `.png` file.

Existing `.txt` files and ZIP packages already in the repository are allowed and should be used for duplicate/title/topic inspection. Do not treat them as an error. The restriction is only that this run's new upload must be a ZIP package, not a bare `.txt` file.

Use America/Chicago for all dates and times. Use the current run date, formatted as `MM-DD-YYYY`, for the local dated folder name.

Repository workflow:
- Repository: https://github.com/LJ-Web-Management/datacentertraining.us. Confirm write access with `gh repo view LJ-Web-Management/datacentertraining.us --json viewerPermission`. If access is missing, stop and report it rather than retrying.
- All blog paths are inside the `blog/` folder at the repo root: `blog/posts.json`, `blog/posts/`, `blog/uploads/`, `blog/uploads/processed/`.
- Use a workspace-local or temporary checkout. If a suitable checkout exists, run `git checkout main && git pull --rebase origin main` before making changes. Otherwise clone the repo fresh.
- Inspect existing titles and topics before writing anything. Check `blog/posts.json`, `blog/posts/`, `blog/uploads/`, and `blog/uploads/processed/`.
- Open every existing ZIP package in `blog/uploads/`, `blog/uploads/processed/`, and the local dated Blog Posts folders. Read the `.txt` inside each one and use its title and topic for duplicate detection.
- Do not repeat titles or substantially repeat recent topics, including titles/topics found only inside existing ZIP packages.
- Put the new `.zip` in `blog/uploads/`. That is the intake folder watched by the repo's `.github/workflows/blog-convert.yml` GitHub Action ("Convert blog uploads (datacentertraining.us)").
- Do not upload a bare `.txt` or a loose image to `blog/uploads/`, and do not place the ZIP directly in `blog/uploads/processed/`.
- Commit the 1 new ZIP with a concise message that includes the current date and scheduled run hour.
- Push: run `git config http.postBuffer 524288000` first (large ZIPs can otherwise fail with a misleading `HTTP 400` / `unexpected disconnect`), then `git pull --rebase origin main && git push origin main`. If it still fails, run `gh auth status` and report the exact error rather than retrying blindly.
- Last resort only, for a path that does not already exist remotely: `gh api --method PUT repos/LJ-Web-Management/datacentertraining.us/contents/blog/uploads/<URL-encoded filename> --input -` with a JSON payload containing `message`, `branch: main`, and base64 `content`. Never overwrite an existing upload.
- After a successful push, wait about 90 seconds and run `gh run list --repo LJ-Web-Management/datacentertraining.us --limit 5`. Confirm both "Convert blog uploads (datacentertraining.us)" and "pages build and deployment" succeeded.
- Then `git pull` to fast-forward past the bot's follow-up commit. The bot moves the ZIP to `blog/uploads/processed/`, adds the post page to `blog/posts/`, and updates `blog/posts.json` and `sitemap.xml`. This is expected, not a conflict. Do not force-push or create a second package.
- Verify the post is live: `https://datacentertraining.us/blog/posts/<slug>.html` must return 200. Take the slug from the new `blog/posts.json` entry (it is the title lowercased, with every run of characters other than letters and digits replaced by one hyphen).

Local copy workflow:
- Create this folder if needed: `/Users/hp/Desktop/LJ Web Management/Websites/Hazwoper Osha/Landing Pages/Blog Posts/datacentertraining/MM-DD-YYYY`, replacing `MM-DD-YYYY` with the current America/Chicago date. If Desktop access is blocked, use the task's `outputs/Blog Posts/datacentertraining/MM-DD-YYYY` and report the fallback.
- Save the same `.zip` package from this run into that folder. It must contain the same `.txt` and `.png` that were uploaded.
- Preserve the full title in the `.txt`, `.png`, and `.zip` filenames, removing only characters that cannot be used in macOS filenames. Use ` - Cover.png` for the cover image.

Website and business context:
- Website: https://datacentertraining.us/
- The site sells 44 self-paced online data center courses and 7 bundles, delivered by HAZWOPER OSHA Training, LLC, an IACET-accredited provider. Comprehensive Programs run 12-18 hours; Modular Specializations run 1-8 hours. Learners receive a certificate of completion immediately on finishing. Courses can be bought individually or in bundles, and teams can enroll together.
- Course tracks: Power & Electrical; Cooling & Facilities Efficiency; Operations & Reliability; Security & Compliance; Design, Planning & Commissioning; Monitoring & Smart Facility.
- Before choosing a topic, open https://datacentertraining.us/courses.html and https://datacentertraining.us/bundles.html and use the real course and bundle names. Do not invent courses, prices, or hours.
- These are knowledge and best-practice courses, not certification exams. Never claim a course grants a regulatory certification, a license, CEUs, or PDHs. Never imply OSHA, Uptime Institute, TIA, NFPA, ASHRAE, or any other body certifies, approves, or endorses a course, learner, or employer. Use wording like "standards-aligned", "certificate of completion", and "supports your training program".

Topic selection and SEO strategy:
- Write for data center facility managers, critical facilities engineers, electricians, HVAC and mechanical technicians, operations managers, NOC and site staff, EHS managers, security and compliance leads, commissioning agents, colocation and hyperscale contractors, career switchers entering data center work, and training coordinators building role-based plans.
- Rotate deliberately across the six course tracks and these angles: electrical safety and arc flash (NFPA 70E), UPS and battery safety, generators and standby power, EPO procedures, lithium-ion thermal runaway, cooling and refrigerant safety, PUE and energy efficiency, Tier concepts, ANSI/TIA-942 design, commissioning and startup, preventive maintenance planning, incident response and troubleshooting, disaster recovery and business continuity, DCIM and BMS monitoring, physical security and access control, SOC 2 / ISO 27001 for facilities, fire suppression, raised floor and confined space work, capacity planning, onboarding new technicians, role-based training plans, and choosing between individual courses and bundles.
- Do not write generic IT, cloud, or AI industry commentary. Every post must connect to physical data center facilities, operations, safety, or a training decision, and to at least one real course or bundle on the site.
- Before picking a topic, list the last 20-30 titles/topics already used (from `blog/posts.json` and from `.txt` files inside existing ZIPs) and note the course track, target reader, and title pattern each used, so today's post deliberately differs.
- Choose a narrow, specific problem or skill outcome rather than a broad theme. The title must name the equipment, task, role, or decision clearly enough that a technician or manager would understand it from search results.
- Favor titles that match how people search, such as `What a New Data Center Technician Should Learn in the First 90 Days`, `UPS Maintenance Bypass Mistakes That Cause Outages`, `How to Build a Role-Based Training Plan for a Colocation Site`, or `Arc Flash Boundaries in Battery Rooms Explained`. Do not reuse these exact titles if they already exist.
- Vary the title pattern day to day: how-to, beginner guide, checklist, mistakes to avoid, comparison, "what you learn in", role-based plan, and pre-task readiness framing.
- Make the opening two or three sentences work as a search-result summary: the specific problem or decision, why it matters, and what the reader will understand after reading, in natural language without keyword stuffing.
- Prefer evergreen topics. If making a current-events, statistic, or standards-update claim, browse and verify it first.

Article format (important: this is what the site's converter turns into real formatting):
- Line 1: the complete title as plain text. No `##`, no symbols.
- Section headings: start the line with `## ` (for example `## Who This Affects`). Use `### ` for an occasional subheading. A heading written as plain text with no `##` will render as an ordinary paragraph, so every section heading needs `## `.
- Divider between sections: a line containing only `---`.
- Bullets: `- item`. Numbered steps: `1. item`, `2. item`.
- Emphasis: `**bold**` and `*italic*`, used sparingly.
- Optional: `> text` on its own line for a key safety note or pull-quote, and `((text))` for a small caption or aside.
- Do not use HTML, markdown links, or raw URLs in the body (URLs are only allowed in the Sources section). Do not use em dashes. Do not use Unicode "math bold" characters or `━━━` lines.

Follow this exact `.txt` structure:
1. Line 1: complete title.
2. `## The Operational Question`: the real-world problem or training decision, why it matters for safety, uptime, and the team, and what the reader will get from the post.
3. `---` then `## Who This Affects`: the roles, site types (enterprise, colocation, hyperscale, edge), and situations most likely to face it.
4. `---` then `## What Can Go Wrong`: safety, uptime, compliance, and cost consequences, with accurate standards context only.
5. `---` then `## What Managers Should Check`: a practical checklist or decision framework using bullets or numbered steps.
6. `---` then `## Which Training Fits This Situation`: connect helpfully, not pushily, to the most relevant real courses or bundle by name, and to a role-based training plan.
7. `---` then `## Common Mistakes to Avoid`.
8. `---` then `## Key Takeaway`: a concise practical conclusion ending with one specific action the reader could take this week.
9. `---` then a line containing exactly `Sources` (no `##`), followed by each source name on one line and its URL on the next line. The converter turns these into linked citations. Include 3-5 authoritative sources (such as OSHA, NFPA, Uptime Institute, TIA, ASHRAE, NIST, or EPA) whenever the post references standards, regulations, or factual claims. Omit the section only if no sources were used.

Content requirements:
- The article must be at least 1,500 words. This is a hard minimum, not a target. If a draft is shorter, expand it with specific, useful, non-repetitive substance before packaging it.
- Use a fresh angle each day. Before finalizing, compare the opening sentence, section examples, and closing sentence against the last several published posts and rewrite anything that reads like a close paraphrase.
- Practical, technically accurate, buyer-aware tone. No scare tactics, no legal overclaiming, no filler.

Writing style and engagement:
- Keep paragraphs short and scannable. Break up any paragraph longer than about five sentences or 120 words.
- Use bullet or numbered lists in at least two sections when presenting three or more related items, steps, or examples.
- Use concrete detail instead of generalities: name plausible roles, equipment (switchgear, static transfer switches, VRLA and lithium-ion strings, CRAH units, chillers, generators, PDUs), procedures, and common mistakes.
- Vary sentence length and structure. Do not reuse stock transitions, metaphors, or sentence templates from recent posts.
- Vary the wording and focus of the closing action from post to post, for example auditing one procedure, walking one electrical room with a new technician, choosing a first course for a new hire, or scheduling a refresher for one team.
- Publication-ready formatting: correct section order, no repeated boilerplate, no malformed bullets, no em dashes.

Cover image requirements:
- Generate one original cover image that matches the specific topic, not a generic server-rack stock image. Vary setting, subject, and composition based on the topic, for example a technician in arc-rated PPE at switchgear, a UPS and battery room, a generator yard, a chiller plant, hot and cold aisles, a commissioning walkthrough, a monitoring room, or a security checkpoint.
- Professional, modern critical-facilities style, photo-realistic or clean editorial illustration, with an indigo and violet accent palette on neutral grey and white so images feel consistent with the site.
- Wide 16:9. No logos, watermarks, or readable text.
- Save as `.png` inside the ZIP only. Do not upload the image as a loose file.

Verification before finishing each run:
- Exactly 1 new `.zip` was pushed to `blog/uploads/` for this run (it may already have been moved to `blog/uploads/processed/` by the workflow).
- The ZIP contains exactly one `.txt` and one `.png`.
- The `.txt` is at least 1,500 words and follows the structure and formatting above: title on line 1, every section heading starting with `## `, `---` dividers, and `Sources` last.
- The title does not duplicate anything in `blog/posts.json`, existing `.txt`/ZIP filenames, or titles inside existing ZIPs.
- The title and course track differ from at least the last 2-3 published posts.
- "Convert blog uploads (datacentertraining.us)" and "pages build and deployment" both succeeded.
- `https://datacentertraining.us/blog/posts/<slug>.html` returns 200 and shows real section headings (not headings rendered as plain paragraphs).
- The local ZIP matches the pushed ZIP by hash.
- `git status --short --branch` is clean and in sync with `origin/main`.

Final response:
- Keep it brief.
- Include the title, the Git commit hash, the published post URL, and the local dated folder path.
- If pushing fails because of authentication, network, or permissions, still save the local ZIP and clearly report the failure and the exact next step (for example `gh auth login -h github.com` or granting write access to `LJ-Web-Management/datacentertraining.us`).
