import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { RewardTier } from "@/content/sprint";
import { cn } from "@/lib/cn";

type RewardCardProps = {
  tier: RewardTier;
};

export function RewardCard({ tier }: RewardCardProps) {
  return (
    <Card
      as="article"
      tone="spotlight"
      padding="md"
      interactive
      className={cn(
        "flex h-full flex-col gap-4",
        tier.highlight && "border-accent/40 bg-accent/[0.08]",
      )}
    >
      <span
        className={cn(
          "grid size-11 place-items-center rounded-xl",
          tier.highlight ? "bg-accent/15 text-accent" : "bg-white/10 text-on-spotlight",
        )}
      >
        <Icon name={tier.icon} size={22} />
      </span>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-bold tracking-[0.08em] uppercase text-on-spotlight-muted">
          {tier.tier}
        </p>
        <h3 className="text-lg font-bold tracking-tight">{tier.reward}</h3>
      </div>

      <p className="text-sm leading-relaxed text-on-spotlight-muted">{tier.detail}</p>
    </Card>
  );
}
