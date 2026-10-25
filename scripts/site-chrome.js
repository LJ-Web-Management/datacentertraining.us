'use strict';
// Header navigation and footer shared by every page. build-site.js replaces
// each page's <header class="glass-nav"> and <footer class="site-footer"
// id="contact"> with the output of header()/footer(), so a menu or footer
// change is made here once and the next build applies it everywhere.
//
// Hrefs below are root-relative paths ('' = homepage, '#teams' = an anchor on
// the homepage); link() turns them into page-relative URLs.

const ICON_CHEVRON = '<svg class="nav-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
const ICON_CART = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>';
const ICON_SEARCH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

const SOCIAL = [
  ['https://www.facebook.com/HazwoperOsha/', 'Facebook', '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>'],
  ['https://www.instagram.com/hazwoper_osha_training/?hl=en', 'Instagram', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>'],
  ['https://www.youtube.com/@hazwoper-osha', 'YouTube', '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27z"/></svg>'],
  ['https://x.com/HazwoperOsha', 'X', '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.4 8.4L23 22h-6.6l-5.2-6.8L5.1 22H2l7.9-9L1.6 2h6.8l4.7 6.2z"/></svg>'],
  ['https://www.linkedin.com/company/hazwoper-osha', 'LinkedIn', '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18.34V10.1H5.67v8.24zM7.01 8.97a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.34 18.34v-4.6c0-2.46-1.31-3.6-3.06-3.6a2.64 2.64 0 0 0-2.39 1.32V10.1H10.2s.04.86 0 8.24h2.68v-4.6c0-.25.02-.5.09-.68a1.5 1.5 0 0 1 1.37-1c.96 0 1.35.73 1.35 1.8v4.48z"/></svg>'],
  ['https://www.pinterest.com/hazwoperosha/', 'Pinterest', '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.32-.09-.79-.17-2.01.03-2.88.19-.79 1.22-5.03 1.22-5.03s-.31-.63-.31-1.55c0-1.45.84-2.54 1.89-2.54.89 0 1.32.67 1.32 1.47 0 .89-.57 2.23-.86 3.47-.25 1.03.52 1.88 1.53 1.88 1.84 0 3.07-2.36 3.07-5.15 0-2.12-1.43-3.71-4.02-3.71-2.93 0-4.76 2.19-4.76 4.63 0 .84.25 1.44.63 1.9.18.21.2.3.14.54-.05.18-.16.63-.21.81-.07.26-.28.35-.51.26-1.44-.59-2.11-2.16-2.11-3.93 0-2.92 2.46-6.43 7.34-6.43 3.92 0 6.5 2.84 6.5 5.89 0 4.03-2.24 7.04-5.55 7.04-1.11 0-2.16-.6-2.51-1.28 0 0-.6 2.36-.73 2.82-.22.8-.66 1.6-1.06 2.22.95.29 1.95.45 3 .45 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>']
];

// Pages that sit at a different path than their file (the blog post template
// is rendered into blog/posts/<slug>.html).
const RENDERED_AT = { 'blog/scripts/templates/post-template.html': 'blog/posts/post.html' };

function pagePath(rel) {
  return RENDERED_AT[rel] || rel;
}

function prefixFor(rel) {
  // 404.html is served at whatever URL was missing, so its links are absolute.
  if (rel === '404.html') return '/';
  return '../'.repeat(pagePath(rel).split('/').length - 1);
}

function link(P, target) {
  if (target === '') return P || './';
  if (target.startsWith('#')) return (P || './') + target;
  return P + target;
}

// The page a root-relative target opens, for aria-current.
function targetFile(target) {
  if (target === '' || target.startsWith('#')) return 'index.html';
  return target.endsWith('/') ? target + 'index.html' : target;
}

function sectionOf(rel) {
  const p = pagePath(rel);
  if (/^(courses\.html|courses\/|bundles\.html|who\.html|certifications\.html|faq\.html|checkout\.html|training\/)/.test(p)) return 'training';
  if (p.startsWith('learn/')) return 'learn';
  if (p.startsWith('careers/')) return 'careers';
  if (p.startsWith('quizzes/') || p.startsWith('tools/')) return 'quizzes';
  if (p.startsWith('blog/')) return 'blog';
  return '';
}

function navData(d) {
  const n = d.courses.length;
  const hours = d.courses.reduce((sum, c) => sum + c.duration_hours, 0);
  const save = Math.max(...d.bundles.map((b) => b.savings_percent));
  return [
    {
      id: 'training',
      label: 'Courses',
      columns: [
        {
          label: 'Online Training',
          links: [
            { href: 'courses.html', title: 'Course Catalog', desc: 'All ' + n + ' self-paced courses' },
            { href: 'bundles.html', title: 'Course Bundles', desc: 'Role-based bundles, save up to ' + save + '%' },
            { href: 'who.html', title: 'Courses by Role', desc: 'Find the track for your job' },
            { href: 'tools/training-plan-builder.html', title: 'Training Plan Builder', desc: 'Build and price a plan in minutes' }
          ]
        },
        {
          label: 'Training by Topic',
          links: [
            { href: 'training/', title: 'All Training Programs' },
            { href: 'training/data-center-technician-training.html', title: 'Data Center Technician Training' },
            { href: 'training/nfpa-70e-training.html', title: 'NFPA 70E Training' },
            { href: 'training/osha-electrical-safety-training.html', title: 'OSHA Electrical Safety Training' },
            { href: 'training/arc-flash-training.html', title: 'Arc Flash Training' },
            { href: 'training/lockout-tagout-training.html', title: 'Lockout/Tagout Training' },
            { href: 'training/ups-battery-training.html', title: 'UPS & Battery Training' },
            { href: 'training/generator-training.html', title: 'Generator Training' },
            { href: 'training/bms-dcim-training.html', title: 'BMS & DCIM Training' }
          ]
        },
        {
          label: 'Enrolling',
          links: [
            { href: '#teams', title: 'Team Training', desc: 'Seats, progress tracking, PO billing' },
            { href: 'certifications.html', title: 'Certificates & Accreditation', desc: 'What your certificate means' },
            { href: 'faq.html', title: 'FAQ', desc: 'Pricing, access, and policies' }
          ]
        }
      ],
      feature: { href: 'bundles.html', kicker: 'Best value', title: 'Complete Data Center Professional Bundle', text: n + ' courses and ' + hours + ' hours of training in one enrollment. Save ' + save + '%.', cta: 'Compare bundles' }
    },
    {
      id: 'learn',
      label: 'Learn',
      columns: [
        {
          label: 'Start Here',
          links: [
            { href: 'learn/', title: 'Knowledge Center', desc: 'Every guide in one place' },
            { href: 'learn/what-is-a-data-center.html', title: 'Data Center 101', desc: 'How data centers work' },
            { href: 'learn/glossary.html', title: 'Glossary', desc: 'Data center terms, A to Z' },
            { href: 'learn/data-center-standards.html', title: 'Standards & Regulations', desc: 'TIA-942, NFPA, OSHA, ASHRAE, ISO' }
          ]
        },
        {
          label: 'Systems',
          links: [
            { href: 'learn/data-center-power.html', title: 'Power Systems' },
            { href: 'learn/data-center-cooling.html', title: 'Cooling Systems' },
            { href: 'learn/data-center-tiers.html', title: 'Tier Levels & Redundancy' },
            { href: 'learn/energy-efficiency-pue.html', title: 'Energy Efficiency & PUE' },
            { href: 'learn/ai-data-centers.html', title: 'AI & High-Density Facilities' },
            { href: 'learn/800-vdc-data-center-safety.html', title: '800 VDC Power Safety' }
          ]
        },
        {
          label: 'Operations',
          links: [
            { href: 'learn/data-center-safety.html', title: 'Safety Guide' },
            { href: 'learn/data-center-security-compliance.html', title: 'Security & Compliance' },
            { href: 'learn/data-center-operations.html', title: 'Operations & Maintenance' },
            { href: 'learn/data-center-commissioning.html', title: 'Commissioning (Levels 1-5)' },
            { href: 'blog/', title: 'Blog: Field Guidance' }
          ]
        }
      ]
    },
    {
      id: 'careers',
      label: 'Careers',
      columns: [
        {
          label: 'Get Started',
          links: [
            { href: 'careers/', title: 'Careers Hub', desc: 'Why the industry is hiring' },
            { href: 'careers/data-center-technician.html', title: 'Data Center Technician', desc: 'The most common way in' },
            { href: 'careers/entry-level-data-center-jobs.html', title: 'Entry-Level Jobs', desc: 'Roles you can get without experience' },
            { href: 'careers/how-to-get-into-data-centers.html', title: 'How to Get Into Data Centers', desc: 'A step-by-step starting plan' },
            { href: 'careers/data-center-technician-salary.html', title: 'Salary Guide', desc: 'What the pay data shows' }
          ]
        },
        {
          label: 'Jobs & Roles',
          links: [
            { href: 'careers/data-center-jobs.html', title: 'All Job Roles Explained' },
            { href: 'careers/data-center-electrician.html', title: 'Data Center Electrician' },
            { href: 'careers/critical-facilities-technician.html', title: 'Critical Facilities Technician' },
            { href: 'careers/data-center-engineer.html', title: 'Data Center Engineer' },
            { href: 'careers/data-center-jobs-by-location.html', title: 'Jobs by Location' },
            { href: 'careers/hyperscale-data-center-jobs.html', title: 'Big Tech Data Center Jobs' }
          ]
        },
        {
          label: 'Get Hired',
          links: [
            { href: 'careers/data-center-certifications.html', title: 'Certifications Guide' },
            { href: 'careers/data-center-apprenticeships.html', title: 'Apprenticeships & Programs' },
            { href: 'careers/data-center-technician-resume.html', title: 'Resume Guide' },
            { href: 'careers/interview-questions.html', title: 'Interview Questions' },
            { href: 'careers/career-changers.html', title: 'Career Changers' }
          ]
        }
      ],
      feature: { href: 'quizzes/career-quiz.html', kicker: '2-minute quiz', title: 'Which Data Center Career Fits You?', text: 'Answer 10 quick questions and get a matching role and training track.', cta: 'Take the career quiz' }
    },
    {
      id: 'quizzes',
      label: 'Quizzes & Tools',
      columns: [
        {
          label: 'Quizzes',
          links: [
            { href: 'quizzes/', title: 'All Quizzes' },
            { href: 'quizzes/career-quiz.html', title: 'Career Match Quiz' },
            { href: 'quizzes/data-center-basics-quiz.html', title: 'Data Center Basics' },
            { href: 'quizzes/power-electrical-quiz.html', title: 'Power & Electrical' },
            { href: 'quizzes/cooling-quiz.html', title: 'Cooling & HVAC' },
            { href: 'quizzes/safety-quiz.html', title: 'Safety' },
            { href: 'quizzes/security-compliance-quiz.html', title: 'Security & Compliance' },
            { href: 'quizzes/tiers-design-quiz.html', title: 'Tiers & Design' },
            { href: 'quizzes/operations-quiz.html', title: 'Operations & Monitoring' }
          ]
        },
        {
          label: 'Tools',
          links: [
            { href: 'tools/', title: 'All Tools' },
            { href: 'tools/training-plan-builder.html', title: 'Training Plan Builder' },
            { href: 'tools/pue-calculator.html', title: 'PUE Calculator' },
            { href: 'tools/uptime-calculator.html', title: 'Uptime & Downtime Calculator' },
            { href: 'tools/cooling-load-calculator.html', title: 'Cooling Load Calculator' }
          ]
        }
      ]
    }
  ];
}

function navLink(P, rel, l, withDesc) {
  const current = targetFile(l.href) === pagePath(rel) && !l.href.startsWith('#') ? ' aria-current="page"' : '';
  const desc = withDesc && l.desc ? '<span class="nav-link-desc">' + l.desc + '</span>' : '';
  return '<a href="' + link(P, l.href) + '"' + current + '><span class="nav-link-title">' + l.title.replace(/&(?!amp;)/g, '&amp;') + '</span>' + desc + '</a>';
}

function header(rel, d) {
  const P = prefixFor(rel);
  const page = pagePath(rel);
  const section = sectionOf(rel);
  const groups = navData(d).map((g) => {
    const menuId = 'navMenu-' + g.id;
    const cols = g.columns.map((c) =>
      '          <div class="nav-menu-col">\n' +
      '            <p class="nav-menu-label">' + c.label + '</p>\n' +
      c.links.map((l) => '            ' + navLink(P, rel, l, true)).join('\n') + '\n' +
      '          </div>'
    ).join('\n');
    const feature = g.feature
      ? '\n          <a class="nav-feature" href="' + link(P, g.feature.href) + '"><span class="nav-feature-kicker">' + g.feature.kicker + '</span><span class="nav-feature-title">' + g.feature.title + '</span><span class="nav-feature-text">' + g.feature.text + '</span><span class="nav-feature-cta">' + g.feature.cta + ' &rarr;</span></a>'
      : '';
    return [
      '      <div class="nav-item">',
      '        <button type="button" class="nav-trigger' + (section === g.id ? ' active' : '') + '" aria-expanded="false" aria-controls="' + menuId + '">' + g.label.replace('&', '&amp;') + ICON_CHEVRON + '</button>',
      '        <div class="nav-menu nav-menu-' + (g.columns.length + (g.feature ? 1 : 0)) + '" id="' + menuId + '">',
      cols + feature,
      '        </div>',
      '      </div>'
    ].join('\n');
  });
  const blogCurrent = page === 'blog/index.html' ? ' aria-current="page"' : '';
  const cta = page === 'checkout.html'
    ? '<a href="' + link(P, 'courses.html') + '" class="btn btn-secondary btn-sm nav-cta">Back to Courses</a>'
    : '<a href="' + link(P, 'courses.html') + '" class="btn btn-primary btn-sm nav-cta">View Courses</a>';
  return [
    '<header class="glass-nav">',
    '  <div class="container nav-inner">',
    '    <a href="' + (page === 'index.html' ? '#top' : link(P, '')) + '" class="logo">',
    '      <img class="logo-img" src="' + P + 'images/logo.png" alt="datacentertraining.us" width="537" height="96">',
    '    </a>',
    '',
    '    <nav class="main-nav" id="mainNav" aria-label="Main">',
    groups.join('\n'),
    '      <a href="' + link(P, 'blog/') + '" class="nav-link' + (section === 'blog' ? ' active' : '') + '"' + blogCurrent + '>Blog</a>',
    '    </nav>',
    '',
    '    <div class="nav-actions">',
    '      <a href="' + link(P, 'search.html') + '" class="nav-search" data-search-open aria-keyshortcuts="Control+K" title="Search (Ctrl+K)">' + ICON_SEARCH + '<span class="nav-search-label">Search</span><kbd class="nav-search-kbd">Ctrl K</kbd></a>',
    '      <a href="' + link(P, 'cart.html') + '" class="nav-cart" aria-label="Cart"' + (page === 'cart.html' ? ' aria-current="page"' : '') + '>' + ICON_CART + '<span class="nav-cart-count" data-cart-count hidden>0</span></a>',
    '      ' + cta,
    '      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mainNav">',
    '        <span></span><span></span><span></span>',
    '      </button>',
    '    </div>',
    '  </div>',
    '</header>'
  ].join('\n');
}

function footerData() {
  return [
    {
      label: 'Training',
      links: [
        ['courses.html', 'Course Catalog'],
        ['bundles.html', 'Course Bundles'],
        ['training/', 'Training by Topic'],
        ['training/nfpa-70e-training.html', 'NFPA 70E Training'],
        ['training/arc-flash-training.html', 'Arc Flash Training'],
        ['who.html', 'Courses by Role'],
        ['tools/training-plan-builder.html', 'Training Plan Builder'],
        ['#teams', 'Team Training'],
        ['certifications.html', 'Certificates & Accreditation'],
        ['faq.html', 'FAQ']
      ]
    },
    {
      label: 'Learn',
      links: [
        ['learn/', 'Knowledge Center'],
        ['learn/what-is-a-data-center.html', 'Data Center 101'],
        ['learn/data-center-power.html', 'Power Systems'],
        ['learn/data-center-cooling.html', 'Cooling Systems'],
        ['learn/data-center-tiers.html', 'Tier Levels'],
        ['learn/data-center-safety.html', 'Safety Guide'],
        ['learn/data-center-standards.html', 'Standards Guide'],
        ['learn/glossary.html', 'Glossary'],
        ['blog/', 'Blog']
      ]
    },
    {
      label: 'Careers',
      links: [
        ['careers/', 'Careers Hub'],
        ['careers/data-center-technician.html', 'Data Center Technician'],
        ['careers/data-center-jobs.html', 'Job Roles Explained'],
        ['careers/entry-level-data-center-jobs.html', 'Entry-Level Jobs'],
        ['careers/data-center-technician-salary.html', 'Salary Guide'],
        ['careers/data-center-jobs-by-location.html', 'Jobs by Location'],
        ['careers/data-center-certifications.html', 'Certifications Guide'],
        ['careers/interview-questions.html', 'Interview Questions'],
        ['quizzes/career-quiz.html', 'Career Match Quiz']
      ]
    },
    {
      label: 'Quizzes & Tools',
      links: [
        ['quizzes/', 'All Quizzes'],
        ['quizzes/data-center-basics-quiz.html', 'Data Center Basics Quiz'],
        ['tools/', 'All Tools'],
        ['tools/pue-calculator.html', 'PUE Calculator'],
        ['tools/uptime-calculator.html', 'Uptime Calculator'],
        ['tools/cooling-load-calculator.html', 'Cooling Load Calculator'],
        ['search.html', 'Search the Site']
      ]
    },
    {
      label: 'Company',
      links: [
        ['about.html', 'About Us'],
        ['https://hazwoper-osha.com/', 'HAZWOPER-OSHA Training'],
        ['https://hazwoper-osha.com/certificate-verification', 'Verify Certificate'],
        ['privacy.html', 'Privacy Policy'],
        ['terms.html', 'Terms of Service'],
        ['accessibility.html', 'Accessibility'],
        ['privacy.html#choices', 'Your Privacy Choices'],
        ['https://hazwoper-osha.com/refund-policy', 'Refund Policy']
      ]
    }
  ];
}

function footer(rel) {
  const P = prefixFor(rel);
  const cols = footerData().map((c) => {
    const links = c.links.map(([href, title]) => {
      const external = /^https:/.test(href);
      const attrs = external ? ' target="_blank" rel="noopener"' : (href === 'privacy.html#choices' ? ' data-privacy-choices' : '');
      return '      <a href="' + (external ? href : link(P, href)) + '"' + attrs + '>' + title.replace('&', '&amp;') + '</a>';
    }).join('\n');
    return '    <div class="footer-col">\n      <h3>' + c.label.replace('&', '&amp;') + '</h3>\n' + links + '\n    </div>';
  }).join('\n');
  const social = SOCIAL.map(([href, label, svg]) => '          <a href="' + href + '" target="_blank" rel="noopener" aria-label="' + label + '">' + svg + '</a>').join('\n');
  return [
    '<footer class="site-footer" id="contact">',
    '  <div class="container">',
    '    <div class="footer-top">',
    '      <div class="footer-brand">',
    '        <a href="' + link(P, '') + '" class="logo">',
    '          <img class="logo-img" src="' + P + 'images/logo.png" alt="datacentertraining.us" width="537" height="96" loading="lazy">',
    '        </a>',
    '        <p class="footer-legal">Data Center Training is a specialty training division of <a href="https://hazwoper-osha.com/" target="_blank" rel="noopener">HAZWOPER-OSHA Training, LLC</a>, an IACET-accredited provider of professional data center and safety compliance training.</p>',
    '        <p class="footer-legal" style="margin-top:8px;">HAZWOPER OSHA Training, LLC &middot; 11901 Santa Monica Blvd., Suite #414, Los Angeles, CA 90025</p>',
    '        <div class="footer-badges">',
    '          <img src="https://media.hazwoper-osha.com/wp-content/uploads/2023/11/1698821020/IACET-small.webp" alt="IACET Accredited Provider" width="40" height="24" loading="lazy">',
    '          <img src="https://media.hazwoper-osha.com/wp-content/uploads/2026/07/1784291935/bbb.webp" alt="BBB A+ Rating" width="40" height="24" loading="lazy">',
    '          <img src="https://media.hazwoper-osha.com/wp-content/uploads/2026/07/1784292027/trust.webp" alt="Google Trust Services" width="141" height="20" loading="lazy" style="height:20px;">',
    '        </div>',
    '      </div>',
    '      <div class="footer-cta">',
    '        <p class="footer-cta-title">Not sure where to start?</p>',
    '        <p class="footer-cta-text">Find the data center role that fits you, then get a training plan built around it.</p>',
    '        <div class="footer-cta-actions">',
    '          <a href="' + link(P, 'quizzes/career-quiz.html') + '" class="btn btn-primary btn-sm">Take the Career Quiz</a>',
    '          <a href="' + link(P, 'tools/training-plan-builder.html') + '" class="text-link">Build a training plan &rarr;</a>',
    '        </div>',
    '        <div class="footer-contact-links">',
    '          <a href="tel:18664296742">',
    '            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    '            1-866-429-6742',
    '          </a>',
    '          <a href="mailto:info@hazwoper-osha.com">',
    '            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    '            info@hazwoper-osha.com',
    '          </a>',
    '        </div>',
    '        <div class="footer-social">',
    social,
    '        </div>',
    '      </div>',
    '    </div>',
    '',
    '    <div class="footer-grid">',
    cols,
    '    </div>',
    '',
    '    <p class="footer-agents"><span>For AI agents:</span> <a href="/llms.txt">llms.txt</a> <a href="/llms-full.txt">llms-full.txt</a> <a href="/.well-known/mcp.json">WebMCP Manifest</a> <a href="/api/index.json">JSON Catalog API</a> <a href="/openapi.json">API Docs (OpenAPI)</a> <a href="/sitemap.xml">Sitemap</a></p>',
    '  </div>',
    '  <div class="footer-bottom">',
    '    <div class="container">',
    '      <p>&copy; 2026 HAZWOPER-OSHA Training, LLC. All Rights Reserved.</p>',
    '    </div>',
    '  </div>',
    '</footer>'
  ].join('\n');
}

module.exports = { header, footer, prefixFor, link, pagePath, sectionOf };
