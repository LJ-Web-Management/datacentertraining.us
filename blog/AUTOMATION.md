Every day at the scheduled run time, create exactly 1 fresh, original blog post package for datacentertraining.us, upload it to the GitHub repository `LJ-Web-Management/datacentertraining.us`, and save the same package locally in the dated Blog Posts folder.

The ZIP package must contain exactly one complete plain-text blog post file ending in `.txt` and one generated wide 16:9 `.png` cover image. Existing `.txt` files and ZIPs in the repo are for duplicate checks only and are not errors. This run's upload must be a ZIP, not a bare `.txt`.

Use America/Chicago for all dates and times. Use `MM-DD-YYYY` for the local dated folder name.

Website and customer context:
- Website: https://datacentertraining.us/
- The site sells 44 self-paced online data center courses (Comprehensive Programs of 12-18 hours and Modular Specializations of 1-8 hours) plus 7 bundles, delivered by HAZWOPER OSHA Training, LLC, an IACET-accredited provider. Learners receive a certificate of completion.
- Course tracks: Power & Electrical; Cooling & Facilities Efficiency; Operations & Reliability; Security & Compliance; Design, Planning & Commissioning; Monitoring & Smart Facility.
- Ideal readers and buyers: data center facility managers, critical facilities engineers, electricians, HVAC and mechanical technicians, operations managers, NOC and site reliability staff, EHS managers, security and compliance leads, commissioning agents, colocation and hyperscale contractors, and training coordinators building role-based plans.

Content strategy:
- Practical, search-friendly topics such as UPS and battery safety, generator operations and fuel, electrical safety and arc flash (NFPA 70E), EPO procedures, lithium-ion thermal runaway, cooling and refrigerant safety, PUE and energy efficiency, Uptime Institute Tier concepts, ANSI/TIA-942 design, commissioning and startup, preventive maintenance planning, incident response, disaster recovery and business continuity, DCIM and BMS monitoring, physical security and access control, SOC 2 / ISO 27001 compliance for facilities, fire suppression, raised floor and confined space work, capacity planning, and role-based training plans for new technicians.
- Each article should naturally support enrolling in a relevant course or bundle. Do not write generic IT or cloud content; every post must connect to physical data center facilities, operations, safety, or training decisions.
- Prefer evergreen topics. Browse and verify any current-event or standards-update claim before using it.
- These are knowledge and best-practice courses, not certification exams. Never claim a course grants a regulatory certification, CEUs, or PDHs, and never imply OSHA, Uptime Institute, TIA, NFPA, or any other body certifies, approves, or endorses a course, learner, or employer. Use "standards-aligned", "certificate of completion", and "supports your training program".

Repository workflow:
- Repository: `https://github.com/LJ-Web-Management/datacentertraining.us`. Confirm write access with `gh repo view LJ-Web-Management/datacentertraining.us --json viewerPermission`; if it is missing, stop and report it rather than retrying.
- All paths are relative to the repo root: `blog/posts.json`, `blog/posts/`, `blog/uploads/`, `blog/uploads/processed/`.
- Use a workspace-local or temporary checkout. If one exists, run `git checkout main && git pull --rebase origin main`; otherwise clone fresh.
- Before writing, inspect existing titles and topics in `blog/posts.json`, `blog/posts/`, `blog/uploads/`, `blog/uploads/processed/`, and inside existing ZIPs (read the included `.txt`) and the local dated folders. Do not repeat titles or substantially repeat recent topics.
- Put the new ZIP in `blog/uploads/`. That folder is watched by `.github/workflows/blog-convert.yml` ("Convert blog uploads (datacentertraining.us)"). Do not upload a bare `.txt` or loose image, and do not place the ZIP in `uploads/processed/`.
- Commit with a concise message including the current date and run hour.
- Push: `git config http.postBuffer 524288000`, then `git pull --rebase origin main && git push origin main`. If it still fails, run `gh auth status` and report the exact error rather than retrying blindly. Last resort only, for a path that does not already exist remotely: `gh api --method PUT repos/LJ-Web-Management/datacentertraining.us/contents/blog/uploads/<URL-encoded filename> --input -` with a JSON payload containing `message`, `branch: main`, and base64 `content`.
- After a successful push, wait about 90 seconds and check `gh run list --repo LJ-Web-Management/datacentertraining.us --limit 5` for successful runs of both "Convert blog uploads (datacentertraining.us)" and "pages build and deployment". Then `git pull` to fast-forward past the bot's follow-up commit (it moves the ZIP to `uploads/processed/`, updates `posts.json` and `sitemap.xml`, and adds the generated post). This is expected, not a conflict; do not force-push or create a second package.
- Verify success at `https://datacentertraining.us/blog/posts/<slug>.html` returning 200. The slug is the title lowercased with every run of non-letters/digits replaced by a single hyphen; confirm it from the new `posts.json` entry.

Local copy workflow:
- Folder: `/Users/hp/Desktop/LJ Web Management/Websites/Hazwoper Osha/Landing Pages/Blog Posts/datacentertraining/MM-DD-YYYY`, creating it if needed. If Desktop access is blocked, use the task's `outputs/Blog Posts/datacentertraining/MM-DD-YYYY` and report the fallback.
- Save the identical ZIP there and verify it matches the pushed package by hash. Preserve the full title in filenames, stripping only macOS-unsafe characters; use ` - Cover.png` for the image.

Cover image requirements: one original image specific to the article, in a professional critical-facilities style: server halls and hot/cold aisles, UPS and battery rooms, switchgear, generators, chillers and CRAH units, technicians in PPE, commissioning walkthroughs, monitoring dashboards without readable text. Wide 16:9, no logos, watermarks, or readable text, PNG inside the ZIP only.

Article requirements:
- At least 1,500 words, a hard minimum. Fresh angle each day, with no repeated intros, structure, examples, or takeaways from recent posts.
- No HTML, no Markdown links, no raw URLs in the body, no em dashes. Practical, technically accurate, buyer-aware tone with no scare tactics or legal overclaiming.
- Use only these plain-text formatting shortcuts, which the site's converter turns into real formatting:
  - `## Heading` for section headings, `### Subheading` for smaller ones
  - `**bold**` and `*italic*`
  - `- item` for bullets, `1. item` for numbered steps
  - `> text` on its own line for a pull-quote or key note
  - `((text))` for a small caption or aside
  - `---` on its own line for a divider between sections
- Do not use Unicode "math bold" characters for headings; use `##`.

Follow this `.txt` structure:
1. Line 1: the complete title (plain text, no `##`).
2. An opening section under `## The Operational Question`: the real-world problem and why it matters to the facility, the team, and uptime.
3. `---` then `## Who This Affects`: the roles, site types (enterprise, colocation, hyperscale, edge), and situations most likely to face it.
4. `---` then `## What Can Go Wrong`: safety, uptime, compliance, and cost consequences, with accurate standards context only.
5. `---` then `## What Managers Should Check`: a practical checklist or decision framework using bullets or numbered steps.
6. `---` then `## Which Training Fits This Situation`: connect helpfully to the most relevant courses or a bundle by name, and to a role-based training plan.
7. `---` then `## Common Mistakes to Avoid`.
8. `---` then `## Key Takeaway`: a concise practical conclusion on getting the right people trained.
9. `---` then a line reading exactly `Sources`, followed by each source name on one line and its URL on the next line (for example NFPA 70E, then its nfpa.org URL). The converter turns these into linked citations. Use 3-5 authoritative sources such as OSHA, NFPA, Uptime Institute, TIA, ASHRAE, NIST, or equipment-neutral industry references.

Verification before finishing:
- Exactly 1 new ZIP pushed to `blog/uploads/` (or already moved to `blog/uploads/processed/` by the workflow).
- The ZIP contains exactly one `.txt` and one `.png`.
- The article is at least 1,500 words and follows the structure above.
- The title does not duplicate anything in `posts.json`, existing `.txt`/ZIP filenames, or titles inside existing ZIPs.
- "Convert blog uploads (datacentertraining.us)" and "pages build and deployment" both succeeded.
- `https://datacentertraining.us/blog/posts/<slug>.html` returns 200.
- The local ZIP matches the pushed package by hash.
- `git status --short --branch` is clean and in sync with `origin/main`.

Final response: brief. Include the title, commit hash, published post URL, and local folder path. If the upload fails, still save the local ZIP and report the failure and the exact next step.
