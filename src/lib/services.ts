export type ServiceCategory = "static" | "mobile" | "specialized";

export type ServiceDecisionAid = {
  title: string;
  headers: [string, string, string];
  rows: { feature: string; left: string; right: string }[];
};

export type ServiceItem = {
  slug: string;
  title: string;
  shortDescription: string;
  highlights: string[];
  category: ServiceCategory;
  /** Short lines for index cards and hub summaries */
  bestFor: string;
  /** Opening editorial paragraph for detail page */
  whoBenefits: string;
  scenarios: { title: string; body: string }[];
  deliverables: string[];
  staffingModels: { label: string; description: string }[];
  considerations: string[];
  faqs: { question: string; answer: string }[];
  relatedKnowledgeSlugs: string[];
  relatedBlogSlugs: string[];
  decisionAid?: ServiceDecisionAid;
};

export const services: ServiceItem[] = [
  {
    slug: "armed-security-guards",
    title: "Armed Security Guards",
    category: "static",
    shortDescription:
      "High-visibility deterrence for high-value assets, overnight operations, and elevated-risk sites across Los Angeles County.",
    bestFor:
      "Banks, jewelry and high-value retail, critical infrastructure, overnight industrial sites, and locations where policy and insurance clearly support armed posts.",
    whoBenefits:
      "Armed coverage is not a default—it is a deliberate choice when deterrence, response time, and post orders align with your risk tier and legal environment. Trivon Protection staffs armed posts with professionals trained to de-escalate first and document always, while maintaining readiness when circumstances escalate.",
    highlights: [
      "Professional presence aligned to post orders",
      "Coordinated escalation paths with local authorities when required",
      "Documentation and incident reporting for accountability",
    ],
    scenarios: [
      {
        title: "Overnight industrial and logistics yards",
        body: "Organized theft crews target predictable patrol gaps. Armed presence changes the calculus when your perimeter is long, lighting is uneven, and trailer lines are exposed.",
      },
      {
        title: "High-value retail and asset rooms",
        body: "Limited access hours, strict visitor control, and visible deterrence reduce smash-and-grab and insider-adjacent incidents when post orders match how the store actually operates.",
      },
    ],
    deliverables: [
      "Written post orders with escalation matrix and prohibited actions",
      "Shift logs and incident narratives suitable for insurance and legal review",
      "Supervisor spot checks and replacement coverage for callouts",
    ],
    staffingModels: [
      {
        label: "Static armed post",
        description: "Fixed coverage at a lobby, gate, or asset room with defined check routines and communication windows to your operations center.",
      },
      {
        label: "Armed + patrol hybrid",
        description: "Static deterrence at a control point plus randomized exterior routes when the site is too large for a single vantage.",
      },
    ],
    considerations: [
      "Armed posts are a poor fit when public interaction is continuous and brand tone requires a softer profile—compare with unarmed programs.",
      "If your primary risk is internal theft, armed uniforms alone rarely fix process gaps—pair coverage with access control discipline.",
    ],
    faqs: [
      {
        question: "How do you decide armed versus unarmed?",
        answer:
          "We review incident history, asset value, hours, public interaction, and insurer expectations. Your written proposal documents the recommendation and assumptions so procurement stays transparent.",
      },
      {
        question: "Can armed officers perform access control and customer greeting?",
        answer:
          "Yes when post orders define tone, boundaries, and de-escalation steps. Many sites blend firm enforcement with professional communication—especially during opening and closing windows.",
      },
      {
        question: "What should we prepare before the first shift?",
        answer:
          "Current access lists, key contacts, camera blind spots, alarm protocols, and any contractor schedules. The faster we align on real workflows, the faster coverage feels native to your site.",
      },
    ],
    relatedKnowledgeSlugs: ["armed-vs-unarmed-security-guards", "how-much-do-security-guards-cost-los-angeles"],
    relatedBlogSlugs: ["los-angeles-private-security-hiring-checklist"],
    decisionAid: {
      title: "When clients compare armed and unarmed programs",
      headers: ["Topic", "Armed program", "Unarmed program"],
      rows: [
        {
          feature: "Primary deterrence signal",
          left: "High-visibility deterrence; elevated response posture",
          right: "Professional presence; emphasis on access control and communication",
        },
        {
          feature: "Typical public interaction",
          left: "Often lower in controlled industrial or overnight models",
          right: "Higher in retail, offices, and residential amenities",
        },
        {
          feature: "Documentation expectations",
          left: "Detailed logs for any show of force or detention pathway",
          right: "Visitor logs, incident notes, and property management summaries",
        },
      ],
    },
  },
  {
    slug: "unarmed-security-guards",
    title: "Unarmed Security Guards",
    category: "static",
    shortDescription:
      "Cost-effective coverage for retail, offices, residential communities, and public-facing environments where access control and customer service matter.",
    bestFor:
      "Corporate lobbies, retail and mixed-use, clinics, HOAs, and public-facing sites where professionalism and clear communication matter as much as deterrence.",
    whoBenefits:
      "Unarmed programs win when your biggest risks are unauthorized entry, disorderly conduct, parking structure vulnerability, and after-hours integrity checks—not necessarily a show of lethal force. We design posts around visitor experience, firm boundaries, and reporting your managers can use weekly.",
    highlights: [
      "Access control, visitor management, and patrol routines",
      "Conflict reduction and clear communication with staff and guests",
      "Daily activity reporting tailored to property management needs",
    ],
    scenarios: [
      {
        title: "Corporate and medical reception programs",
        body: "Controlled access, vendor badges, and calm redirection reduce tailgating and disputes without turning the lobby into a checkpoint customers fear.",
      },
      {
        title: "Retail centers with night lockup",
        body: "Closing routines, alarm verification support where permitted, and parking structure sweeps reduce predictable crime windows.",
      },
    ],
    deliverables: [
      "Visitor and vendor logging aligned to your access policy",
      "Incident drafts with timestamps for management follow-up",
      "Nightly activity summaries for property teams",
    ],
    staffingModels: [
      {
        label: "Lobby and single-post coverage",
        description: "One disciplined officer with clear escalation contacts and defined roving checks inside the building envelope.",
      },
      {
        label: "Split shifts for long operating hours",
        description: "Overlapping handoffs so standards stay consistent across mornings, peaks, and overnight coverage.",
      },
    ],
    considerations: [
      "If your site has repeated armed robberies or credible threats, unarmed coverage may be insufficient—upgrade paths should be documented.",
      "Busy retail without line-of-sight support may still need patrol augmentation—ask about marked vehicle add-ons.",
    ],
    faqs: [
      {
        question: "Can unarmed officers remove trespassers?",
        answer:
          "Post orders define what is permitted on your property and under your counsel’s guidance. Officers focus on lawful requests, documentation, and coordination with law enforcement when safety requires it.",
      },
      {
        question: "How do you train for customer-facing sites?",
        answer:
          "De-escalation, inclusive communication, and scenario drills are core. Your brand tone and prohibited behaviors are written into post orders—not assumed.",
      },
      {
        question: "What metrics should we track?",
        answer:
          "Denials at access points, after-hours anomalies, parking incidents, and response times to management calls. Good programs improve measurably in 30–60 days when reporting is consistent.",
      },
    ],
    relatedKnowledgeSlugs: ["armed-vs-unarmed-security-guards", "how-much-do-security-guards-cost-los-angeles"],
    relatedBlogSlugs: ["los-angeles-private-security-hiring-checklist"],
    decisionAid: {
      title: "Unarmed static post versus marked patrol",
      headers: ["Consideration", "Static unarmed post", "Marked patrol"],
      rows: [
        {
          feature: "Best when…",
          left: "You need continuous access control and visitor verification",
          right: "You need randomized exterior coverage across a large footprint",
        },
        {
          feature: "Customer interaction",
          left: "High—officers become part of daily operations",
          right: "Moderate—touchpoints at scheduled intervals and alarm events",
        },
        {
          feature: "Documentation",
          left: "Visitor logs, incidents, and shift notes at a fixed point",
          right: "Route logs, photos or checkpoints where your program requires them",
        },
      ],
    },
  },
  {
    slug: "marked-vehicle-patrol-security",
    title: "Marked Vehicle Patrol Security",
    category: "mobile",
    shortDescription:
      "Randomized route patrols for parking assets, industrial yards, HOAs, and multi-building campuses—ideal when you need coverage without a full-time static post.",
    bestFor:
      "HOAs, business parks, industrial yards, and multi-building campuses where randomized routes break predictability and support static posts overnight.",
    whoBenefits:
      "Patrol programs exist to compress risk across large footprints: visible deterrence, quick checks at blind spots, and documented routes that hold up when something goes wrong. We avoid cookie-cutter loops—routes reflect your hours, your incident history, and the parts of the property criminals actually probe.",
    highlights: [
      "Highly visible marked patrol presence",
      "Lock-up and unlock assistance where permitted",
      "Alarm response coordination depending on scope",
    ],
    scenarios: [
      {
        title: "Residential communities with overnight gaps",
        body: "Amenity lots, alley-adjacent garages, and pool houses see predictable windows. Randomized patrol reduces pattern learning compared to a single static officer far from the risk.",
      },
      {
        title: "Industrial parks with multiple tenants",
        body: "Shared drives and rear docks benefit from coordinated exterior checks without each tenant funding a dedicated vehicle.",
      },
    ],
    deliverables: [
      "Route sheets or digital checkpoints aligned to your program",
      "Exception reports for doors, gates, or equipment found out of standard",
      "Supervisor QA on route integrity and timing",
    ],
    staffingModels: [
      {
        label: "Night-focused randomized patrol",
        description: "Higher density between peak risk hours with documented variance week to week.",
      },
      {
        label: "Patrol + lock/unlock bundle",
        description: "Scheduled openings and closings where permitted, paired with perimeter sweeps.",
      },
    ],
    considerations: [
      "Patrol alone rarely replaces lobby access control—pair with static coverage where public entry is continuous.",
      "If response time SLAs are tight, confirm drive distances and post orders before promising sub-minute arrivals.",
    ],
    faqs: [
      {
        question: "How random is randomized?",
        answer:
          "Random enough to break predictability for outsiders, structured enough for supervision to audit. We avoid repeating the same sequence nightly.",
      },
      {
        question: "Can patrol officers enter buildings?",
        answer:
          "Only where your scope, lease, and post orders allow. Many programs include interior stairwell checks; others stay exterior-only by design.",
      },
      {
        question: "What is a realistic check interval?",
        answer:
          "Depends on geography, posted speed limits, and how many checkpoints you require. We model honest intervals before we quote so you are not sold an impossible route.",
      },
    ],
    relatedKnowledgeSlugs: ["how-much-do-security-guards-cost-los-angeles"],
    relatedBlogSlugs: ["construction-site-theft-prevention-los-angeles"],
    decisionAid: {
      title: "Marked patrol versus static coverage",
      headers: ["Topic", "Marked patrol", "Static post"],
      rows: [
        {
          feature: "Coverage shape",
          left: "Spreads deterrence across a wide area with timed touchpoints",
          right: "Continuous presence at a control point or lobby",
        },
        {
          feature: "Ideal footprint",
          left: "Campuses, HOAs, industrial yards, multi-building sites",
          right: "Single-tenant lobbies, retail entrances, small suites",
        },
        {
          feature: "Incident documentation",
          left: "Route-based logs and exception reports",
          right: "Visitor-centric logs and continuous observation notes",
        },
      ],
    },
  },
  {
    slug: "fire-watch-security-guards",
    title: "Fire Watch Security Guards",
    category: "specialized",
    shortDescription:
      "Dedicated fire watch coverage during impairments, hot work windows, and system outages—supporting safer operations while mechanical systems are down.",
    bestFor:
      "Construction during impairments, industrial outages, hot work programs, and any site where AHJs or insurers require continuous rounds and written logs.",
    whoBenefits:
      "Fire watch is a compliance-driven discipline: continuous patrol paths, clear communication with maintenance, and logs that demonstrate diligence. Trivon Protection aligns watch patterns to your impairment plan—not generic wandering—so field leadership and the AHJ see the same story.",
    highlights: [
      "Continuous rounds and logging aligned to site requirements",
      "Clear handoffs to maintenance and leadership",
      "Support for compliance-driven schedules in dynamic environments",
    ],
    scenarios: [
      {
        title: "Sprinkler or alarm impairments on active sites",
        body: "When systems are down for testing or repair, watch officers maintain vigilance on ignition sources, storage practices, and hot work boundaries.",
      },
      {
        title: "Hot work adjacent to combustibles",
        body: "Post orders define zones, break schedules, and communication paths when conditions change mid-shift.",
      },
    ],
    deliverables: [
      "Round logs with timestamps mapped to your impairment permit",
      "Shift briefings with maintenance and GC safety leads",
      "Escalation calls when conditions exceed agreed thresholds",
    ],
    staffingModels: [
      {
        label: "Dedicated impairment watch",
        description: "Single-purpose coverage until systems return to service with documented handoff.",
      },
      {
        label: "Construction GC coordination",
        description: "Aligned to site safety plans with clear radio channels and stop-work authority per your contracts.",
      },
    ],
    considerations: [
      "Fire watch is not a substitute for fixing impaired systems—timelines and responsible parties should be explicit.",
      "If your site also needs perimeter theft control, scope whether officers can perform both without diluting watch integrity.",
    ],
    faqs: [
      {
        question: "What do AHJs typically expect in logs?",
        answer:
          "Time-stamped rounds, areas checked, anomalies, and communication with responsible parties. Requirements vary; we mirror the standard attached to your permit.",
      },
      {
        question: "Can fire watch officers perform access control?",
        answer:
          "Only when your program explicitly combines roles without violating watch integrity. Most impairments require uninterrupted vigilance—scope carefully.",
      },
      {
        question: "How fast can we start?",
        answer:
          "With clear impairment windows, contacts, and site maps, many programs mobilize quickly. Unclear scopes delay staffing—send drawings and schedules early.",
      },
    ],
    relatedKnowledgeSlugs: ["what-is-fire-watch-security"],
    relatedBlogSlugs: ["construction-site-theft-prevention-los-angeles"],
  },
  {
    slug: "construction-site-security-guards",
    title: "Construction Site Security Guards",
    category: "specialized",
    shortDescription:
      "Reduce tool theft, copper loss, trespass, and after-hours liability on active builds—from laydown yards to high-rise cores in Los Angeles.",
    bestFor:
      "GC and CM-led projects with laydown yards, vertical cores, overnight steel or MEP exposure, and busy gate traffic requiring vendor verification.",
    whoBenefits:
      "Construction losses are rarely random luck—they follow predictable patterns: weak gate discipline, unverified deliveries, blind perimeter segments, and under-documented incidents. We align posts to your site logistics so supers get actionable information, not vague radio noise.",
    highlights: [
      "Gate control, delivery verification, and vendor check-in",
      "Perimeter integrity checks and blind-spot patrols",
      "Evidence-friendly documentation if incidents occur",
    ],
    scenarios: [
      {
        title: "Laydown and equipment yards",
        body: "Seal integrity, trailer line visibility, and after-hours sweeps reduce targeted theft when crews leave for the day.",
      },
      {
        title: "High-rise cores and hoists",
        body: "Elevator and hoist access control, trade stacking discipline, and visitor escorts where the GC requires controlled vertical movement.",
      },
    ],
    deliverables: [
      "Gate logs tied to delivery appointments where used",
      "Perimeter exception photos or notes when hazards appear",
      "Daily summaries for superintendents with open risks called out",
    ],
    staffingModels: [
      {
        label: "Gate-forward model",
        description: "Primary officer at controlled entry with roving second when volume or footprint requires it.",
      },
      {
        label: "Rover-heavy model",
        description: "For large perimeters with intermittent gate bursts—routes weighted to blind spots and laydown.",
      },
    ],
    considerations: [
      "If overnight welding or impairments occur, combine with dedicated fire watch when AHJs require it.",
      "Understaffed gates create tailgating—model honest throughput before cutting hours.",
    ],
    faqs: [
      {
        question: "How do you coordinate with trades and deliveries?",
        answer:
          "Post orders define check-in steps, required paperwork, and who can authorize exceptions. We align with your GC’s safety orientation so guards reinforce—not fight—the site plan.",
      },
      {
        question: "What is the biggest mistake sites make?",
        answer:
          "Treating security as a warm body at a gate without vendor discipline. Theft drops when deliveries, badges, and after-hours access are consistently enforced.",
      },
      {
        question: "Can you support multiple shifts?",
        answer:
          "Yes—continuity matters. We plan supervision and handoffs so standards do not drift between day and night crews.",
      },
    ],
    relatedKnowledgeSlugs: ["how-much-do-security-guards-cost-los-angeles", "armed-vs-unarmed-security-guards"],
    relatedBlogSlugs: ["construction-site-theft-prevention-los-angeles", "los-angeles-private-security-hiring-checklist"],
  },
  {
    slug: "warehouse-security-guards",
    title: "Warehouse Security Guards",
    category: "static",
    shortDescription:
      "Protect inventory, docks, and truck courts from pilferage, organized theft, and unauthorized access in logistics-heavy corridors around LA.",
    bestFor:
      "Distribution centers, 3PL cross-docks, manufacturing with receiving intensity, and yards where trailer lines and seal integrity are daily risk points.",
    whoBenefits:
      "Warehouse losses hide inside process noise: partial picks, seal gaps, mis-scanned returns, and tailgating at docks. Guards add visibility where cameras lag—at the human decisions around who enters, what leaves, and what looks slightly off.",
    highlights: [
      "Inbound/outbound visibility and seal integrity awareness",
      "Yard patrols and trailer line monitoring",
      "Shift notes that operations teams can action quickly",
    ],
    scenarios: [
      {
        title: "Peak receiving windows",
        body: "When doors are open and forklifts are flying, deterrence is about presence at choke points and calm enforcement of badge rules.",
      },
      {
        title: "After-hours trailer lines",
        body: "Organized crews probe dark rows—patrol touchpoints and seal checks matter as much as the front gate.",
      },
    ],
    deliverables: [
      "Dock-aware activity notes with exception callouts",
      "Yard patrol documentation with timestamps on high-risk rows",
      "Incident packages that loss prevention can extend into investigations",
    ],
    staffingModels: [
      {
        label: "Interior + dock emphasis",
        description: "Officer rotation across receiving, returns, and high-value aisles with defined checklists.",
      },
      {
        label: "Yard-forward model",
        description: "Exterior-heavy coverage with interior checks on interval—ideal when trailer lines are the top risk.",
      },
    ],
    considerations: [
      "If internal collusion is suspected, combine human presence with LP-led process reviews—uniforms alone do not fix bad data.",
      "High temps or cold chain sites need welfare and break planning baked into staffing.",
    ],
    faqs: [
      {
        question: "Do you integrate with WMS or scanners?",
        answer:
          "Guards follow your site rules. We do not replace IT systems—but post orders can reference scan expectations, seal checks, and who to call when systems disagree with physical reality.",
      },
      {
        question: "What is the handoff to third-shift operations?",
        answer:
          "Written summaries and flagged exceptions so opening managers see what changed overnight without playing detective.",
      },
      {
        question: "When is armed coverage considered?",
        answer:
          "When incident history, asset value, and insurer expectations justify it. Many warehouses run strong unarmed programs with excellent gate discipline.",
      },
    ],
    relatedKnowledgeSlugs: ["how-much-do-security-guards-cost-los-angeles", "armed-vs-unarmed-security-guards"],
    relatedBlogSlugs: ["construction-site-theft-prevention-los-angeles"],
    decisionAid: {
      title: "Dock-first versus yard-first emphasis",
      headers: ["Operational focus", "Dock-first program", "Yard-first program"],
      rows: [
        {
          feature: "Primary attention",
          left: "Receiving, returns, and seal checks at doors",
          right: "Trailer rows, perimeter gates, and exterior blind spots",
        },
        {
          feature: "Works best when…",
          left: "Internal shrink and throughput disputes dominate",
          right: "External theft and after-hours breaches dominate",
        },
        {
          feature: "Typical add-on",
          left: "Marked patrol for large campuses",
          right: "Interior aisle checks on interval",
        },
      ],
    },
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const servicesByCategory = (cat: ServiceCategory) => services.filter((s) => s.category === cat);
