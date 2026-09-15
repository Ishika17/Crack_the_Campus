import type { IconName } from "@/components/ui/Icon";

export type RewardTier = {
  id: string;
  tier: string;
  reward: string;
  detail: string;
  icon: IconName;
  highlight?: boolean;
};

export const rewardTiers: RewardTier[] = [
  {
    id: "elite",
    tier: "Elite tier",
    reward: "Hardware & scholarships",
    detail: "Premium tech hardware or a full course scholarship for the top of the leaderboard.",
    icon: "trophy",
    highlight: true,
  },
  {
    id: "growth",
    tier: "Growth tier",
    reward: "Premium hiring passes",
    detail: "Exclusive access to invite-only hiring events with partner recruiters.",
    icon: "ticket",
  },
  {
    id: "participation",
    tier: "Participation tier",
    reward: "Verified profile badge",
    detail: "Recognition on your PR Score profile for everyone who finishes the sprint.",
    icon: "badge",
  },
];

export type LeaderboardRow = {
  rank: number;
  participant: string;
  college: string;
  points: number;
};

export const leaderboard: LeaderboardRow[] = [
  { rank: 1, participant: "PRI****YA", college: "NIT Trichy", points: 8.0 },
  { rank: 2, participant: "ARJ****AN", college: "VIT Vellore", points: 7.8 },
  { rank: 3, participant: "NEH****RI", college: "IIIT Hyderabad", points: 7.2 },
  { rank: 4, participant: "SAN****EEP", college: "BMS College", points: 6.9 },
  { rank: 5, participant: "FAT****MA", college: "Jamia Millia", points: 6.7 },
];

export const sprint = {
  status: "Live challenge",
  title: "Corporate Pathway Sprint",
  window: "Entries close in 6 days · all deadlines UTC",
  participants: "4,812 students competing",
};
