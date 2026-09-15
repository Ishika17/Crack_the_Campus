import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { Testimonial } from "@/content/testimonials";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card as="figure" padding="md" interactive className="flex h-full flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Icon name="quote" size={22} className="text-brand/40" />
        <span className="rounded-full bg-success-soft px-2.5 py-1 text-xs font-bold text-success-ink">
          {testimonial.outcome}
        </span>
      </div>

      <blockquote className="text-[0.9375rem] leading-relaxed text-pretty text-text">
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-4">
        <Avatar name={testimonial.name} />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{testimonial.name}</p>
          <p className="truncate text-xs text-muted">{testimonial.college}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-base font-bold tabular-nums text-brand">
            {testimonial.score.toFixed(1)}
          </p>
          <p className="text-[0.625rem] font-semibold tracking-[0.06em] uppercase text-muted">
            PR Score
          </p>
        </div>
      </figcaption>
    </Card>
  );
}
