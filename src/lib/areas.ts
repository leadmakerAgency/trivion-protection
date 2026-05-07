export type ServiceAreaState = "california" | "texas";

export type ServiceAreaItem = {
  state: ServiceAreaState;
  slug: string;
  name: string;
  metaDescription: string;
  intro: string;
  focusBullets: string[];
  closing: string;
  commonPropertyTypes: string[];
  riskNotes: string[];
  recommendedServiceSlugs: string[];
  planningChecklist: string[];
  faqs: { question: string; answer: string }[];
  /** Deeper local narrative for large metros (e.g. Los Angeles County). */
  subMarkets?: { title: string; body: string }[];
};

const laSubMarkets: { title: string; body: string }[] = [
  {
    title: "Downtown Los Angeles and nearby districts",
    body: "High foot traffic, mixed retail and residential conversions, and overnight vacancy windows create predictable risks. We emphasize access control discipline, parking structure patrol touchpoints, and documentation that supports property management escalations.",
  },
  {
    title: "Hollywood, Mid-City, and entertainment-adjacent sites",
    body: "Nightlife-adjacent properties often need customer-forward security that can still enforce standards firmly. Post orders should spell out boundaries for enforcement, trespass, and coordination with venue teams.",
  },
  {
    title: "Westside and coastal-adjacent corridors",
    body: "Premium tenant expectations mean professionalism matters as much as deterrence. We focus on polished communication, discreet patrol patterns, and consistent supervisor check-ins.",
  },
  {
    title: "South Bay industrial and logistics pockets",
    body: "Truck courts, trailer lines, and yard integrity are common loss vectors. Guards trained in dock awareness and seal integrity can materially reduce pilferage and organized theft attempts.",
  },
  {
    title: "Eastside and Gateway cities",
    body: "Retail strips, industrial yards, and residential communities each need different patrol logic. We build schedules around your real operating hours, not generic overnight templates.",
  },
];

export const californiaAreas: Omit<ServiceAreaItem, "state">[] = [
  {
    slug: "kern-county",
    name: "Kern County",
    metaDescription:
      "Security guard services for Kern County properties: patrols, access control, and site-specific coverage plans from Trivon Protection.",
    intro:
      "From logistics hubs to industrial corridors, Kern County operations benefit from disciplined access control, visible deterrence, and reporting that leadership can trust.",
    focusBullets: [
      "After-hours perimeter integrity for yards and lots",
      "Visitor and vendor verification at controlled gates",
      "Scalable staffing as seasonal demand changes",
    ],
    closing:
      "Tell us about your hours, access points, and risk profile. We will recommend armed or unarmed coverage that fits the site.",
    commonPropertyTypes: ["Distribution and 3PL yards", "Oilfield-adjacent industrial", "Agricultural processing"],
    riskNotes: ["Wide perimeters with uneven lighting", "Seasonal volume spikes at gates"],
    recommendedServiceSlugs: [
      "marked-vehicle-patrol-security",
      "warehouse-security-guards",
      "unarmed-security-guards",
    ],
    planningChecklist: [
      "Share peak receiving or shift-change windows",
      "Identify trailer rows or laydown zones with prior losses",
      "List AHJ or insurer requirements that affect staffing",
    ],
    faqs: [
      {
        question: "Do you cover Bakersfield and outlying industrial corridors?",
        answer:
          "Yes, scope drives routing and hours. We design patrol and static mixes based on your geography, not generic LA templates.",
      },
      {
        question: "When is marked patrol preferred over a static gate?",
        answer:
          "Large yards with intermittent gate bursts often benefit from randomized exterior routes plus focused gate coverage during peaks.",
      },
    ],
  },
  {
    slug: "los-angeles-county",
    name: "Los Angeles County",
    metaDescription:
      "Los Angeles County security guards: armed and unarmed posts, patrol, fire watch, construction and warehouse programs with Trivon Protection.",
    intro:
      "Los Angeles County is a high-velocity market: dense retail corridors, complex residential portfolios, active construction, and logistics pressure around major freeways. Trivon Protection focuses on practical post orders, consistent supervision, and communication that keeps property teams aligned.",
    focusBullets: [
      "Neighborhood-aware patrol planning for real deterrence",
      "Clear escalation paths and documentation when incidents occur",
      "Programs that pair well with cameras and access systems you already use",
    ],
    closing:
      "If you are comparing Los Angeles security guard companies, start with a clear scope: hours, posts, armed vs unarmed, and reporting expectations. We will translate that into a plan you can operationalize quickly.",
    commonPropertyTypes: [
      "High-rise residential and mixed-use",
      "Retail and neighborhood centers",
      "Logistics yards and last-mile hubs",
      "Healthcare and education campuses",
    ],
    riskNotes: [
      "Parking structures and alley-adjacent retail",
      "Construction theft during vertical builds",
      "Weekend and overnight gaps on multi-tenant sites",
    ],
    recommendedServiceSlugs: [
      "unarmed-security-guards",
      "marked-vehicle-patrol-security",
      "construction-site-security-guards",
      "warehouse-security-guards",
    ],
    planningChecklist: [
      "Send site maps with camera blind spots noted",
      "Define visitor and vendor policies you want enforced",
      "List prior incidents with dates to inform patrol weighting",
    ],
    faqs: [
      {
        question: "How fast can Los Angeles County programs start?",
        answer:
          "Mobilization depends on scope clarity, access provisioning, and uniform post orders. Complex sites move faster when supers and property managers join a single onboarding call.",
      },
      {
        question: "Can programs combine armed and unarmed posts?",
        answer:
          "Yes when risk tiers differ by zone, lobby versus yard, day versus night. Your proposal documents the mix and why it fits.",
      },
    ],
    subMarkets: laSubMarkets,
  },
  {
    slug: "orange-county",
    name: "Orange County",
    metaDescription:
      "Orange County private security: professional guards for retail, corporate campuses, HOAs, and industrial sites. Request a quote from Trivon Protection.",
    intro:
      "Orange County clients often need polished customer-facing security in retail and mixed-use environments, paired with firm access control after hours.",
    focusBullets: [
      "Customer-service-forward presence where public interaction is frequent",
      "Night coverage for parking structures and amenity areas",
      "Coordinated vendor and contractor check-in routines",
    ],
    closing:
      "We can align coverage to your property management workflows and communication channels.",
    commonPropertyTypes: ["Corporate campuses", "Retail and lifestyle centers", "Master-planned HOAs"],
    riskNotes: ["Parking structure weekend activity", "Retail shrink during peak tourism"],
    recommendedServiceSlugs: ["unarmed-security-guards", "marked-vehicle-patrol-security"],
    planningChecklist: [
      "Clarify tenant mix and amenity hours",
      "Share property rules for parking enforcement support",
      "Identify languages helpful for guest communication",
    ],
    faqs: [
      {
        question: "Do you support bilingual post orders?",
        answer:
          "When needed, we incorporate communication expectations into written post orders so coverage stays consistent across shifts.",
      },
      {
        question: "What reporting do HOAs receive?",
        answer:
          "Activity summaries, incident drafts, and exception notes aligned to your board’s preferences without dumping raw noise.",
      },
    ],
  },
  {
    slug: "riverside-county",
    name: "Riverside County",
    metaDescription:
      "Riverside County security services: patrol and static posts for warehouses, yards, retail, and residential communities. Trivon Protection.",
    intro:
      "Riverside County’s mix of residential growth and industrial activity creates distinct risks: perimeter breaches, yard theft, and weekend vulnerabilities.",
    focusBullets: [
      "Large-perimeter patrol strategies",
      "Truck court visibility for logistics operators",
      "HOA and community patrol options",
    ],
    closing:
      "Share your site map and peak risk windows. We will propose a schedule that matches reality, not a generic template.",
    commonPropertyTypes: ["Inland logistics", "New residential master plans", "Strip retail"],
    riskNotes: ["Long fence lines", "Weekend residential amenity gaps"],
    recommendedServiceSlugs: ["marked-vehicle-patrol-security", "warehouse-security-guards"],
    planningChecklist: ["Note HOA covenant enforcement boundaries", "List prior yard or dock incidents"],
    faqs: [
      {
        question: "How do you price large perimeters?",
        answer:
          "We model realistic patrol intervals and any static posts required during peaks, then quote honestly instead of under-staffing routes.",
      },
      {
        question: "Can warehouse and HOA programs share patrol?",
        answer:
          "Sometimes, when geography and liability allow. Otherwise we keep scopes separate with clear documentation.",
      },
    ],
  },
  {
    slug: "santa-barbara-county",
    name: "Santa Barbara County",
    metaDescription:
      "Santa Barbara County security guard coverage for hospitality, education, residential, and commercial sites. Contact Trivon Protection.",
    intro:
      "Santa Barbara County properties often need discreet, professional coverage that respects brand experience while still enforcing standards.",
    focusBullets: [
      "Controlled access for events and seasonal peaks",
      "Night audits for remote or hillside sites",
      "Calm, professional communication with guests and residents",
    ],
    closing:
      "We build post orders around your guest experience goals and your non-negotiable safety requirements.",
    commonPropertyTypes: ["Hospitality and coastal retail", "Education campuses", "Residential enclaves"],
    riskNotes: ["Seasonal population swings", "Remote buildings with limited staff overnight"],
    recommendedServiceSlugs: ["unarmed-security-guards", "marked-vehicle-patrol-security"],
    planningChecklist: ["Share event calendars that affect staffing", "Identify quiet hours policies"],
    faqs: [
      {
        question: "Can officers support night audits for hotels?",
        answer:
          "Yes, post orders define floor checks, noise response boundaries, and coordination with management.",
      },
      {
        question: "How visible should uniforms be?",
        answer:
          "We align attire and presence with brand standards, from low-profile to high-visibility, without compromising safety rules.",
      },
    ],
  },
  {
    slug: "san-bernardino-county",
    name: "San Bernardino County",
    metaDescription:
      "San Bernardino County security guards for warehouses, distribution, retail, and construction. Trivon Protection serving the Inland Empire corridor.",
    intro:
      "The Inland Empire’s logistics intensity makes dock visibility, trailer lines, and yard integrity central to loss prevention.",
    focusBullets: [
      "High-throughput gate processes without creating truck backlog",
      "Internal theft deterrence through presence and audits",
      "Construction laydown and equipment protection",
    ],
    closing:
      "If you are managing multiple sites, ask about marked vehicle patrol patterns that consolidate coverage efficiently.",
    commonPropertyTypes: ["Cross-dock warehouses", "E-commerce fulfillment", "Construction laydown yards"],
    riskNotes: ["Seal integrity on trailer lines", "Peak receiving congestion"],
    recommendedServiceSlugs: ["warehouse-security-guards", "construction-site-security-guards", "marked-vehicle-patrol-security"],
    planningChecklist: ["Provide dock appointment policies", "Share LP hot spots from prior quarters"],
    faqs: [
      {
        question: "Do you cover multi-building logistics campuses?",
        answer:
          "Yes, routing and post counts depend on building spacing, shared gates, and whether interior checks are in scope.",
      },
      {
        question: "How do you document incidents for LP?",
        answer:
          "Timestamped notes, involved parties, and preserved access to camera correlation when your team drives follow-up.",
      },
    ],
  },
  {
    slug: "san-diego",
    name: "San Diego",
    metaDescription:
      "San Diego security guard services: armed and unarmed officers, patrol programs, and specialized site coverage by Trivon Protection.",
    intro:
      "San Diego’s diverse property mix, from defense-adjacent industrial to coastal hospitality, requires adaptable staffing and clear reporting.",
    focusBullets: [
      "Waterfront and tourism-adjacent properties with public interaction",
      "Industrial and tech campuses with controlled access",
      "Residential high-rises and mixed-use developments",
    ],
    closing:
      "We will align staffing to your risk tier, operating hours, and local expectations.",
    commonPropertyTypes: ["Defense-adjacent industrial", "Coastal hospitality", "Urban residential high-rises"],
    riskNotes: ["Tourist-heavy weekends", "Controlled access compliance expectations"],
    recommendedServiceSlugs: ["unarmed-security-guards", "armed-security-guards", "marked-vehicle-patrol-security"],
    planningChecklist: ["List controlled-area rules for officers", "Share visitor management tools in use"],
    faqs: [
      {
        question: "When is armed coverage more common in San Diego?",
        answer:
          "Certain industrial, cash-handling, or elevated-risk footprints justify it. We document rationale and alternatives so procurement stays clear.",
      },
      {
        question: "Can you coordinate with marina or port-adjacent rules?",
        answer:
          "Post orders reflect landlord and port requirements. We do not improvise outside your written scope.",
      },
    ],
  },
  {
    slug: "san-fernando-valley",
    name: "San Fernando Valley",
    metaDescription:
      "San Fernando Valley security guards for studios, retail strips, HOAs, and industrial pockets. Trivon Protection.",
    intro:
      "The Valley’s spread-out geography makes patrol design important: randomized routes, clear check-ins, and tight communication reduce predictable gaps criminals exploit.",
    focusBullets: [
      "Parking lot and alley-adjacent retail deterrence",
      "HOA patrol models with documented routes",
      "Industrial pockets with overnight exposure",
    ],
    closing:
      "Tell us where your cameras are blind. We will design patrol touchpoints to complement them.",
    commonPropertyTypes: ["Studio-adjacent lots", "Suburban HOAs", "Industrial pockets"],
    riskNotes: ["Alley-adjacent retail", "Predictable overnight patrol timing if poorly designed"],
    recommendedServiceSlugs: ["marked-vehicle-patrol-security", "unarmed-security-guards"],
    planningChecklist: ["Map alleys and rear entries", "Share prior vehicle break-in patterns if any"],
    faqs: [
      {
        question: "How do you avoid predictable patrol loops?",
        answer:
          "Supervisor QA on route variance, randomized checkpoints, and weighted coverage toward prior incident hotspots.",
      },
      {
        question: "Can HOA patrol include pool and amenity checks?",
        answer:
          "Yes when post orders and HOA rules define access, hours, and documentation expectations.",
      },
    ],
  },
  {
    slug: "san-gabriel-valley",
    name: "San Gabriel Valley",
    metaDescription:
      "San Gabriel Valley private security for retail, medical, education, and residential properties. Quote Trivon Protection today.",
    intro:
      "San Gabriel Valley sites often balance multilingual community contexts with firm safety standards. Professional guards reduce friction while enforcing rules consistently.",
    focusBullets: [
      "Medical and professional campuses with sensitive access",
      "Retail centers with high weekend traffic",
      "Residential communities with parking and amenity risk",
    ],
    closing:
      "We can incorporate bilingual communication requirements into post orders when needed.",
    commonPropertyTypes: ["Medical plazas", "Education-adjacent retail", "Dense residential communities"],
    riskNotes: ["Weekend retail peaks", "Shared parking structures"],
    recommendedServiceSlugs: ["unarmed-security-guards", "marked-vehicle-patrol-security"],
    planningChecklist: ["List languages helpful for your community", "Share parking enforcement boundaries"],
    faqs: [
      {
        question: "How are bilingual needs documented?",
        answer:
          "Post orders include greeting scripts, escalation phrases, and when to request supervisory or language support.",
      },
      {
        question: "What is the best model for medical plazas?",
        answer:
          "Often a disciplined lobby post plus parking sweeps on interval, tailored to your patient flow and hours.",
      },
    ],
  },
  {
    slug: "ventura-county",
    name: "Ventura County",
    metaDescription:
      "Ventura County security guard services for agriculture-adjacent industry, logistics, retail, and residential communities. Trivon Protection.",
    intro:
      "Ventura County blends industrial strength with coastal communities, coverage should match both operational tempo and local expectations.",
    focusBullets: [
      "Perimeter and yard programs for industrial operators",
      "Residential community patrol and rule enforcement",
      "Retail and mixed-use customer-forward security",
    ],
    closing:
      "We will recommend armed or unarmed staffing based on your asset mix and incident history, without upselling you into the wrong tier.",
    commonPropertyTypes: ["Agriculture-adjacent processing", "Coastal retail", "Residential HOAs"],
    riskNotes: ["Perimeter length on industrial sites", "Seasonal tourism effects on retail"],
    recommendedServiceSlugs: ["warehouse-security-guards", "unarmed-security-guards", "marked-vehicle-patrol-security"],
    planningChecklist: ["Clarify coastal event calendars", "Share prior trespass or theft notes"],
    faqs: [
      {
        question: "Do you cover Oxnard logistics corridors?",
        answer:
          "Yes, routing and staffing depend on gate counts, yard size, and whether interior checks are included.",
      },
      {
        question: "How do you approach mixed English/Spanish sites?",
        answer:
          "We document communication expectations and escalation contacts so every shift performs consistently.",
      },
    ],
  },
];

export const texasAreas: Omit<ServiceAreaItem, "state">[] = [
  {
    slug: "tarrant-county",
    name: "Tarrant County",
    metaDescription:
      "Tarrant County security programs for corporate, industrial, and residential portfolios. Regional coverage by Trivon Protection.",
    intro:
      "Dallas–Fort Worth growth creates predictable security pressure points: expanded truck courts, denser multifamily, and busier retail nights.",
    focusBullets: [
      "Patrol models that reduce repetitive predictability",
      "Access control discipline for mixed-use properties",
      "Construction and industrial site coverage options",
    ],
    closing:
      "If you operate across California and Texas, ask us how we align standards so your teams get consistent reporting formats.",
    commonPropertyTypes: ["Corporate campuses", "Industrial and logistics", "Multifamily portfolios"],
    riskNotes: ["Rapidly changing construction adjacency", "Retail nights near entertainment districts"],
    recommendedServiceSlugs: ["unarmed-security-guards", "marked-vehicle-patrol-security", "construction-site-security-guards"],
    planningChecklist: ["List sites that should share standards with California programs", "Identify regional insurer expectations"],
    faqs: [
      {
        question: "Is Texas coverage the same as Los Angeles staffing?",
        answer:
          "Standards align; deployment details follow local geography and your property mix. Proposals spell out assumptions per state.",
      },
      {
        question: "Can you support multi-site patrol routing?",
        answer:
          "Yes when drive times and liability allow, we model honest intervals before quoting.",
      },
    ],
  },
  {
    slug: "collin-county",
    name: "Collin County",
    metaDescription:
      "Collin County private security for corporate campuses, retail, and residential master-planned communities. Trivon Protection.",
    intro:
      "Plano, Frisco, and surrounding growth corridors often need polished security that matches premium tenant expectations.",
    focusBullets: [
      "Amenity and parking structure coverage",
      "Corporate lobby and visitor management",
      "Residential community patrol programs",
    ],
    closing:
      "We focus on clear communication with HOA boards and property managers, especially around enforcement boundaries.",
    commonPropertyTypes: ["Master-planned residential", "Corporate offices", "Upscale retail"],
    riskNotes: ["Amenity misuse during weekends", "Visitor tailgating at gates"],
    recommendedServiceSlugs: ["unarmed-security-guards", "marked-vehicle-patrol-security"],
    planningChecklist: ["Share HOA enforcement red lines", "Provide amenity hours and rules packets"],
    faqs: [
      {
        question: "How do you document HOA patrols?",
        answer:
          "Route logs and exception notes that boards can review, without personal data unrelated to safety.",
      },
      {
        question: "Can officers issue parking warnings?",
        answer:
          "Only actions explicitly authorized in your post orders and contracts, never improvised enforcement.",
      },
    ],
  },
  {
    slug: "northeast-dfw",
    name: "Northeast DFW",
    metaDescription:
      "Northeast DFW security guard services for logistics, retail, and residential sites. Trivon Protection regional coverage.",
    intro:
      "Northeast DFW includes high-throughput logistics pockets where dock integrity and yard visibility materially reduce shrink.",
    focusBullets: [
      "Truck court monitoring and seal awareness",
      "After-hours randomized patrol routes",
      "Incident documentation that supports investigations",
    ],
    closing:
      "Tell us your peak receiving windows. We will align staffing to operational reality.",
    commonPropertyTypes: ["Regional distribution hubs", "Last-mile depots", "Industrial parks"],
    riskNotes: ["Night trailer rows", "Peak congestion at gates"],
    recommendedServiceSlugs: ["warehouse-security-guards", "marked-vehicle-patrol-security"],
    planningChecklist: ["Share receiving peak charts", "Identify seal-check expectations"],
    faqs: [
      {
        question: "Do you integrate with site KPIs?",
        answer:
          "We align reporting to the operational metrics you already track, dock exceptions, incidents, and coverage gaps called out clearly.",
      },
      {
        question: "What is a realistic mobilization timeline?",
        answer:
          "Depends on scope clarity and access. Multi-gate sites move faster with a single onboarding workshop.",
      },
    ],
  },
  {
    slug: "denton-county",
    name: "Denton County",
    metaDescription:
      "Denton County security coverage for education-adjacent retail, residential growth areas, and industrial sites. Trivon Protection.",
    intro:
      "Rapid growth counties need security programs that scale without losing quality: documented patrols, trained replacements, and accountable supervision.",
    focusBullets: [
      "Residential community rule enforcement with professionalism",
      "Retail coverage for weekend peaks",
      "Industrial perimeter programs",
    ],
    closing:
      "We will map your risks first, then propose staffing, so you pay for outcomes, not buzzwords.",
    commonPropertyTypes: ["Student-adjacent retail", "New residential phases", "Light industrial"],
    riskNotes: ["Weekend retail peaks", "Construction-adjacent theft"],
    recommendedServiceSlugs: ["unarmed-security-guards", "construction-site-security-guards"],
    planningChecklist: ["Share school calendars affecting traffic", "List community rules for enforcement"],
    faqs: [
      {
        question: "How do you supervise spread-out communities?",
        answer:
          "Supervisor routes, spot checks, and digital checkpoints where your program uses them, designed to scale with honest drive times.",
      },
      {
        question: "Can programs start small and expand?",
        answer:
          "Yes, phased scopes with documented expansion triggers help fast-growing portfolios stay controlled.",
      },
    ],
  },
];

export const allAreas: ServiceAreaItem[] = [
  ...californiaAreas.map((a) => ({ ...a, state: "california" as const })),
  ...texasAreas.map((a) => ({ ...a, state: "texas" as const })),
];

export const getArea = (state: ServiceAreaState, slug: string) =>
  allAreas.find((a) => a.state === state && a.slug === slug);

export const getAreasByState = (state: ServiceAreaState) => allAreas.filter((a) => a.state === state);
