import type { IconName } from "@/components/ui/Icon";

export type EcosystemFeature = {
  icon: IconName;
  title: string;
  description: string;
};

export type EcosystemPillar = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  tagline: string;
  description: string;
  features: EcosystemFeature[];
  cta: { label: string; href: string };
  tone: "brand" | "spotlight";
};

export const ecosystemPillars: EcosystemPillar[] = [
  {
    id: "web-hub",
    index: "01",
    kicker: "Web",
    title: "The Web Hub",
    tagline: "Your daily training ground",
    description:
      "Open access, no install, no fee. Prepare between lectures, on the bus, the night before a drive.",
    tone: "brand",
    features: [
      {
        icon: "sparkles",
        title: "AI-assisted courses",
        description: "Interactive, industry-mapped modules that adapt to what you keep getting wrong.",
      },
      {
        icon: "route",
        title: "Corporate Pathways",
        description: "Master the exact stack and round structure your dream company screens for.",
      },
      {
        icon: "file",
        title: "AI resume builder",
        description: "An ATS-ready resume in minutes, scored against real recruiter filters.",
      },
      {
        icon: "target",
        title: "Practice assessments",
        description: "Unlimited mock tests to build speed before anything counts.",
      },
    ],
    cta: { label: "Explore courses & pathways", href: "/explore" },
  },
  {
    id: "pro-suite",
    index: "02",
    kicker: "Software",
    title: "The Pro-Suite",
    tagline: "The official hiring environment",
    description:
      "The proctored desktop suite where your performance becomes a verified, recruiter-facing number.",
    tone: "spotlight",
    features: [
      {
        icon: "briefcase",
        title: "Official hiring drives",
        description: "Sit actual recruitment assessments for companies hiring on campus right now.",
      },
      {
        icon: "monitor",
        title: "Simulated environments",
        description: "Practice in a real proctored coding and interview setting before the day itself.",
      },
      {
        icon: "shield",
        title: "High-stakes evaluation",
        description: "Verified assessments with integrity monitoring that feed your PR Score.",
      },
      {
        icon: "link",
        title: "Direct placement access",
        description: "Reach recruiters through official scores instead of a cold application pile.",
      },
    ],
    cta: { label: "Download the Pro-Suite", href: "#institutions" },
  },
];
