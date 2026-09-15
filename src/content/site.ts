/**
 * Single source of truth for brand-level copy and contact details.
 * Changing the company name, address or social handles is a one-file edit.
 */
export const site = {
  name: "Crack The Campus",
  shortName: "CTC",
  domain: "crackthecampus.com",
  url: "https://crackthecampus.com",
  description:
    "India's campus-to-career platform for engineering students. Upskill with industry-mapped courses, master Corporate Pathways, and build a recruiter-trusted PR Score.",
  tagline:
    "Campus-to-career infrastructure: Web Hub training, Pro-Suite verification, recruiter-trusted scores.",
  email: "info@crackthecampus.com",
  address: {
    lines: [
      "Ground Floor, ThiDiff Tech Park",
      "Aishwarya Crystal Layout, Singasandra",
      "Bengaluru, Karnataka 560068",
    ],
    mapUrl: "https://maps.google.com/?q=ThiDiff+Tech+Park+Singasandra+Bengaluru",
  },
  social: [
    { label: "Instagram", handle: "@crackthecampus_", href: "https://instagram.com/crackthecampus_" },
    { label: "LinkedIn", handle: "/company/crackthecampus", href: "https://linkedin.com/company/crackthecampus" },
  ],
} as const;
