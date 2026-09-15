export type PathwayLevel = "Beginner" | "Intermediate" | "Advanced";

export type Pathway = {
  slug: string;
  title: string;
  /** Short student-facing promise — what changes after finishing this track. */
  promise: string;
  overview: string;
  targets: string[];
  weeks: number;
  modules: number;
  level: PathwayLevel;
  skills: string[];
  outcomes: string[];
  curriculum: { title: string; description: string }[];
  /** Optional ribbon, e.g. "Most enrolled". */
  flag?: string;
};

/**
 * Adding a new program is one object here — the grid, the `/explore` page and
 * the mobile carousel all read from this array.
 */
export const pathways: Pathway[] = [
  {
    slug: "product-sde",
    overview:
      "A structured preparation track for product-company engineering roles. Build the problem-solving depth, design vocabulary and interview confidence needed for high-signal technical rounds.",
    title: "Product SDE Track",
    promise: "Clear DSA rounds and system-design screens at product companies.",
    targets: ["Google", "Meta", "NVIDIA"],
    weeks: 14,
    modules: 62,
    level: "Advanced",
    skills: ["DSA", "System design", "Low-level design", "Problem solving"],
    outcomes: [
      "Solve common DSA patterns under interview time limits",
      "Explain scalable system-design decisions with confidence",
      "Turn projects into strong technical interview stories",
    ],
    curriculum: [
      { title: "DSA foundations", description: "Arrays, strings, recursion and complexity patterns." },
      { title: "Problem-solving patterns", description: "Trees, graphs, dynamic programming and timed sets." },
      { title: "System design", description: "APIs, databases, caching, queues and trade-offs." },
      { title: "Interview simulation", description: "Mock technical and behavioural interview practice." },
    ],
    flag: "Most enrolled",
  },
  {
    slug: "mass-recruiter",
    overview:
      "A focused, fast-moving track for campus drives at service and consulting companies. Practise the exact aptitude, verbal, pseudocode and programming formats that decide early-round cut-offs.",
    title: "Mass Recruiter Blitz",
    promise: "Crack service-company drives where speed and aptitude decide the cut-off.",
    targets: ["TCS", "Infosys", "Wipro"],
    weeks: 6,
    modules: 38,
    level: "Beginner",
    skills: ["Aptitude", "Verbal", "Pseudocode", "Core Java"],
    outcomes: [
      "Improve accuracy across aptitude and verbal cut-off rounds",
      "Read, trace and correct pseudocode faster",
      "Prepare a dependable Core Java base for technical screens",
    ],
    curriculum: [
      { title: "Quantitative aptitude", description: "Percentages, ratios, time-work and data interpretation." },
      { title: "Logical reasoning", description: "Pattern recognition, arrangements and decision problems." },
      { title: "Pseudocode practice", description: "Trace logic, identify output and spot mistakes quickly." },
      { title: "Technical sprint", description: "Core Java and recruiter-style mock assessments." },
    ],
    flag: "Fastest result",
  },
  {
    slug: "full-stack",
    overview:
      "Build a complete, deployed web application while learning the frontend, backend and database decisions that hiring teams expect junior developers to understand.",
    title: "Full-Stack Web",
    promise: "Ship a deployed portfolio project reviewers actually open.",
    targets: ["Startups", "SAP", "PayPal"],
    weeks: 12,
    modules: 54,
    level: "Intermediate",
    skills: ["React", "Node.js", "Databases", "REST & auth"],
    outcomes: [
      "Build responsive React interfaces with reusable components",
      "Design REST APIs and connect a persistent database",
      "Deploy a portfolio project and explain its architecture",
    ],
    curriculum: [
      { title: "Frontend foundations", description: "React, state, reusable UI and responsive layouts." },
      { title: "Backend APIs", description: "Node.js services, REST patterns and validation." },
      { title: "Data and auth", description: "Schema design, queries, sessions and protected routes." },
      { title: "Portfolio launch", description: "Testing, deployment and project walkthrough practice." },
    ],
  },
  {
    slug: "data-analytics",
    overview:
      "Learn to turn business questions into clean data analysis. The track combines SQL, Python and dashboard work with the case-style thinking used in analyst interviews.",
    title: "Data & Analytics",
    promise: "Answer SQL and case rounds for analyst and data-engineering roles.",
    targets: ["Deloitte", "Accenture", "Dell"],
    weeks: 10,
    modules: 46,
    level: "Intermediate",
    skills: ["SQL", "Python", "Statistics", "Dashboards"],
    outcomes: [
      "Write clear SQL queries for common business questions",
      "Explore and clean datasets with Python",
      "Present insights through concise dashboards and case stories",
    ],
    curriculum: [
      { title: "SQL for analysis", description: "Joins, aggregations, window functions and query logic." },
      { title: "Python workflows", description: "Cleaning, exploration and visual analysis with real datasets." },
      { title: "Statistics basics", description: "Metrics, distributions and hypothesis-led thinking." },
      { title: "Business storytelling", description: "Dashboards, case rounds and insight communication." },
    ],
  },
  {
    slug: "cloud-devops",
    overview:
      "For students who want to show they can ship and operate software, not only write it. Learn the essential deployment, automation and observability practices behind reliable engineering teams.",
    title: "Cloud & DevOps",
    promise: "Prove you can run what you build — containers, CI and observability.",
    targets: ["Cisco", "VMware", "HP"],
    weeks: 9,
    modules: 41,
    level: "Intermediate",
    skills: ["Linux", "Docker", "CI/CD", "AWS basics"],
    outcomes: [
      "Work confidently with Linux, shells and service processes",
      "Containerise an application using Docker",
      "Set up a simple delivery pipeline and monitor a deployed service",
    ],
    curriculum: [
      { title: "Linux essentials", description: "Shell commands, permissions, processes and networking." },
      { title: "Containers", description: "Docker images, multi-service environments and registries." },
      { title: "Delivery automation", description: "CI/CD pipelines, checks and repeatable releases." },
      { title: "Cloud operations", description: "AWS foundations, logs, metrics and incident basics." },
    ],
  },
  {
    slug: "interview-comms",
    overview:
      "A practical confidence-building lab for the part of placements that technical practice alone cannot solve: communicating clearly, handling pressure and making your experience memorable.",
    title: "Interview & Comms Lab",
    promise: "Handle HR, managerial and group-discussion rounds without freezing.",
    targets: ["All recruiters"],
    weeks: 4,
    modules: 22,
    level: "Beginner",
    skills: ["Mock interviews", "Resume", "GD", "Storytelling"],
    outcomes: [
      "Create a clear, recruiter-ready resume and introduction",
      "Answer HR and managerial questions with relevant examples",
      "Contribute confidently in group discussions and mock interviews",
    ],
    curriculum: [
      { title: "Personal positioning", description: "Resume, LinkedIn and a strong 60-second introduction." },
      { title: "Interview stories", description: "Use structured examples for HR and managerial questions." },
      { title: "Group discussions", description: "Listening, framing ideas and contributing without dominating." },
      { title: "Mock interview lab", description: "Recorded practice, feedback and improvement plans." },
    ],
  },
];
