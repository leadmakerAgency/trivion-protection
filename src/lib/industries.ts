export type IndustryItem = {
  id: string;
  title: string;
  summary: string;
  challenges: string[];
  typicalPosts: string[];
  reportingTips: string[];
  primaryServiceSlug: string;
  relatedKnowledgeSlugs: string[];
  /** Optional second service link */
  secondaryServiceSlug?: string;
};

export const industries: IndustryItem[] = [
  {
    id: "retail-mixed-use",
    title: "Retail and mixed-use",
    summary:
      "Customer-forward presence, after-hours lockup routines, and parking structure patrol touchpoints for high-theft environments.",
    challenges: [
      "Parking structures concentrate theft and disorder on predictable nights.",
      "Tenant mix changes faster than post orders, guards need clear boundaries.",
    ],
    typicalPosts: [
      "Lobby or corridor visibility during peaks",
      "Closing walks with alarm verification where permitted",
      "Parking sweeps coordinated with management radios",
    ],
    reportingTips: [
      "Track denials at access points and repeat vendor anomalies weekly.",
      "Keep incident drafts timestamped for law enforcement handoffs.",
    ],
    primaryServiceSlug: "unarmed-security-guards",
    secondaryServiceSlug: "marked-vehicle-patrol-security",
    relatedKnowledgeSlugs: ["armed-vs-unarmed-security-guards", "how-much-do-security-guards-cost-los-angeles"],
  },
  {
    id: "corporate-offices",
    title: "Corporate offices",
    summary:
      "Lobby access control, visitor management, after-hours patrols, and clear escalation paths for sensitive workplaces.",
    challenges: [
      "Tailgating and visitor policy drift during busy mornings.",
      "After-hours floors with limited staff need disciplined roving patterns.",
    ],
    typicalPosts: [
      "Visitor badging and vendor escorts",
      "After-hours floor and stairwell checks",
      "Executive floor protocols when required",
    ],
    reportingTips: [
      "Summarize exceptions (failed badges, tailgaters) for security committee reviews.",
      "Align terminology with HR and legal for consistent narratives.",
    ],
    primaryServiceSlug: "unarmed-security-guards",
    relatedKnowledgeSlugs: ["armed-vs-unarmed-security-guards"],
  },
  {
    id: "industrial-warehouse",
    title: "Industrial / warehouse / logistics",
    summary:
      "Dock visibility, yard patrols, seal integrity awareness, and documentation that supports investigations when theft occurs.",
    challenges: [
      "Throughput pressure tempts gate shortcuts.",
      "Trailer rows and blind corners hide organized theft.",
    ],
    typicalPosts: [
      "Receiving lane presence during peaks",
      "Yard patrols with seal checks on interval",
      "Exception notes for LP follow-up",
    ],
    reportingTips: [
      "Log seal anomalies with trailer identifiers when safe to do so.",
      "Highlight dock congestion windows that correlate with loss.",
    ],
    primaryServiceSlug: "warehouse-security-guards",
    secondaryServiceSlug: "marked-vehicle-patrol-security",
    relatedKnowledgeSlugs: ["how-much-do-security-guards-cost-los-angeles"],
  },
  {
    id: "construction",
    title: "Construction",
    summary:
      "Gate control, delivery verification, perimeter integrity, blind-spot patrols, and optional fire watch alignment.",
    challenges: [
      "Vendor traffic spikes overwhelm single-gate models.",
      "Laydown yards attract overnight crews targeting tools and copper.",
    ],
    typicalPosts: [
      "Gate manifests and delivery verification",
      "Perimeter sweeps including blind corners",
      "Coordination with GC safety leads",
    ],
    reportingTips: [
      "Daily superintendent summaries with open risks called out.",
      "Photo or note discipline for perimeter breaches.",
    ],
    primaryServiceSlug: "construction-site-security-guards",
    secondaryServiceSlug: "fire-watch-security-guards",
    relatedKnowledgeSlugs: ["what-is-fire-watch-security"],
  },
  {
    id: "residential-hoa",
    title: "Residential / HOA",
    summary:
      "Amenity coverage, parking enforcement support, patrol routes with documentation, and calm resident communication.",
    challenges: [
      "Rule enforcement without escalating neighbor conflicts.",
      "Amenity misuse during weekends and holidays.",
    ],
    typicalPosts: [
      "Pool and clubhouse checks per HOA hours",
      "Parking patrol routes with variance",
      "Noise and nuisance first response per policy",
    ],
    reportingTips: [
      "Board-ready summaries without personal data unrelated to violations.",
      "Clear language on what was observed versus what was assumed.",
    ],
    primaryServiceSlug: "marked-vehicle-patrol-security",
    secondaryServiceSlug: "unarmed-security-guards",
    relatedKnowledgeSlugs: ["how-much-do-security-guards-cost-los-angeles"],
  },
  {
    id: "healthcare",
    title: "Healthcare and clinics",
    summary:
      "Controlled access, patient-adjacent professionalism, and firm enforcement where safety rules are non-negotiable.",
    challenges: [
      "Sensitive patient contexts require calm communication.",
      "Controlled substances and equipment rooms need strict access logs.",
    ],
    typicalPosts: [
      "Lobby and department adjacency checks",
      "Vendor and patient visitor verification",
      "After-hours perimeter and parking support",
    ],
    reportingTips: [
      "Minimize PHI in security logs, record facts needed for safety only.",
      "Align escalation names with on-call clinical leadership.",
    ],
    primaryServiceSlug: "unarmed-security-guards",
    relatedKnowledgeSlugs: ["armed-vs-unarmed-security-guards"],
  },
  {
    id: "hospitality",
    title: "Hospitality",
    summary:
      "Night audits, discreet patrol patterns, and coordination with management for high-traffic guest environments.",
    challenges: [
      "Guest experience must stay warm while standards stay firm.",
      "Parking and exterior doors are common weak points overnight.",
    ],
    typicalPosts: [
      "Night audit support per hotel policy",
      "Parking and exterior door checks",
      "Event perimeter support when scoped",
    ],
    reportingTips: [
      "Shift notes tailored to MOD handoffs.",
      "Noise and trespass documentation with timestamps.",
    ],
    primaryServiceSlug: "unarmed-security-guards",
    secondaryServiceSlug: "marked-vehicle-patrol-security",
    relatedKnowledgeSlugs: ["how-much-do-security-guards-cost-los-angeles"],
  },
  {
    id: "film-production",
    title: "Film and production support",
    summary:
      "Perimeter control, access verification, and site discipline for busy sets and sensitive equipment zones.",
    challenges: [
      "Rapid vendor churn at gates.",
      "High-value equipment zones with changing layouts.",
    ],
    typicalPosts: [
      "Perimeter integrity and crowd line support",
      "Equipment zone access verification",
      "Parking and base camp discipline",
    ],
    reportingTips: [
      "Incident notes that support insurance and completion bonds.",
      "Clear communication paths to unit production management.",
    ],
    primaryServiceSlug: "armed-security-guards",
    secondaryServiceSlug: "unarmed-security-guards",
    relatedKnowledgeSlugs: ["armed-vs-unarmed-security-guards"],
  },
];
