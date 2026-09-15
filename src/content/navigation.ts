export type NavLink = {
  label: string;
  href: string;
  /** Shown in the mobile drawer to make the jump target obvious. */
  hint?: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

/**
 * In-page sections, used by both the desktop bar and the mobile drawer.
 * Add a section here and it appears in every navigation surface at once.
 */
export const primaryNav: NavLink[] = [
  { label: "Ecosystem", href: "/#ecosystem", hint: "Web Hub + Pro-Suite" },
  { label: "Pathways", href: "/#pathways", hint: "Company-mapped tracks" },
  { label: "PR Score", href: "/#pr-score", hint: "Your placement-readiness credential" },
  { label: "Sprint", href: "/#sprint", hint: "Monthly contests & rewards" },
  { label: "Stories", href: "/#stories", hint: "Placed student results" },
  { label: "FAQ", href: "/#faq", hint: "Common questions" },
];

export const footerNav: NavGroup[] = [
  {
    title: "Learn",
    links: [
      { label: "Explore pathways", href: "/explore" },
      { label: "AI-assisted courses", href: "/#ecosystem" },
      { label: "Practice assessments", href: "/#ecosystem" },
      { label: "Monthly Sprint", href: "/#sprint" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "The PR Score", href: "/#pr-score" },
      { label: "Pro-Suite download", href: "/#ecosystem" },
      { label: "For institutions", href: "/#institutions" },
      { label: "Infrastructure", href: "/#infrastructure" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Student stories", href: "/#stories" },
      { label: "Contact", href: `mailto:${"info@crackthecampus.com"}` },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
