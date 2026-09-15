import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type FeatureRowProps = {
  icon: IconName;
  title: string;
  description: string;
  /** Set when the row sits on the dark `spotlight` surface. */
  onSpotlight?: boolean;
};

export function FeatureRow({
  icon,
  title,
  description,
  onSpotlight = false,
}: FeatureRowProps) {
  return (
    <li className="group/row flex gap-4">
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 ease-out group-hover/row:scale-110 motion-reduce:transform-none motion-reduce:transition-none",
          onSpotlight ? "bg-white/10 text-on-spotlight" : "bg-brand-soft text-brand",
        )}
      >
        <Icon name={icon} size={20} />
      </span>
      <div className="flex flex-col gap-1">
        <h4 className="font-bold tracking-tight">{title}</h4>
        <p
          className={cn(
            "text-sm leading-relaxed text-pretty",
            onSpotlight ? "text-on-spotlight-muted" : "text-muted",
          )}
        >
          {description}
        </p>
      </div>
    </li>
  );
}
