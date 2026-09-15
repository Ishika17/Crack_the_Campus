export type Testimonial = {
  id: string;
  name: string;
  college: string;
  outcome: string;
  score: number;
  quote: string;
};

/** Mock social proof. Avatars are generated initials — no image requests. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Raghavan",
    college: "NIT Trichy · CSE '26",
    outcome: "Placed at Google",
    score: 9.1,
    quote:
      "The Product SDE pathway matched the actual round structure almost exactly. Walking into the interview already knowing the format is what settled my nerves.",
  },
  {
    id: "t2",
    name: "Arjun Menon",
    college: "VIT Vellore · IT '26",
    outcome: "Placed at Infosys",
    score: 8.4,
    quote:
      "I was failing aptitude cut-offs every single drive. Six weeks of the Mass Recruiter track and I cleared three in a row.",
  },
  {
    id: "t3",
    name: "Neha Bhandari",
    college: "IIIT Hyderabad · ECE '25",
    outcome: "Placed at NVIDIA",
    score: 8.9,
    quote:
      "Recruiters asked about my PR Score before they asked about my CGPA. It gave them something verified to look at.",
  },
  {
    id: "t4",
    name: "Sandeep Kulkarni",
    college: "BMS College · ISE '26",
    outcome: "Placed at PayPal",
    score: 8.2,
    quote:
      "Proctored mocks in the Pro-Suite felt heavier than the real test. By drive day the pressure was just familiar.",
  },
  {
    id: "t5",
    name: "Fatima Sheikh",
    college: "Jamia Millia · CSE '27",
    outcome: "Summer internship, SAP",
    score: 7.9,
    quote:
      "I study on my phone between labs. Everything loads instantly, so I actually keep the streak going.",
  },
  {
    id: "t6",
    name: "Rohit Deshmukh",
    college: "COEP Pune · Mech '26",
    outcome: "Switched to Data Analyst",
    score: 8.0,
    quote:
      "Non-CS branch, no coding background. The Data track gave me a route that didn't assume four years of CS.",
  },
];
