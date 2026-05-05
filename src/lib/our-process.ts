export type ProcessStep = {
  name: string;
  detail: string;
};

/** Single source of truth for onboarding / field process copy (home page). */
export const OUR_PROCESS_STEPS: ProcessStep[] = [
  {
    name: "Consultation",
    detail:
      "We capture hours, access points, incident history, tenant mix, and reporting expectations. If you already have post orders, we review what works and what creates gaps.",
  },
  {
    name: "Site assessment",
    detail:
      "For many Los Angeles properties, a walkthrough clarifies blind spots: dock flows, parking structure risk, perimeter breaches, and camera coverage gaps.",
  },
  {
    name: "Proposal",
    detail:
      "You receive a staffing plan with clear assumptions: armed vs unarmed, patrol design, start dates, supervision cadence, and pricing structure—without hidden fees buried in fine print.",
  },
  {
    name: "Onboarding",
    detail:
      "We align communication channels, escalation paths, and documentation standards with your property team. Post orders are finalized before the first shift.",
  },
  {
    name: "Operations and supervision",
    detail:
      "Field leadership checks quality, replaces callouts, and enforces standards. You should feel the difference in consistency—not just uniforms on site.",
  },
  {
    name: "Reporting and review",
    detail:
      "Daily activity reporting supports management reviews. For evolving sites (especially construction), we adjust post orders as phases change.",
  },
];
