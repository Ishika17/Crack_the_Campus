import { Icon } from "@/components/ui/Icon";
import type { Faq } from "@/content/faqs";

type FaqItemProps = {
  faq: Faq;
  /** Shared name turns the list into an exclusive accordion — natively. */
  group: string;
};

/**
 * Built on native `<details>`/`<summary>`.
 *
 * No JavaScript at all: keyboard support, screen-reader semantics and the
 * open/close toggle are the browser's. The open/close height animation is
 * handled by `::details-content` + `interpolate-size` in `globals.css`, and
 * browsers without that selector simply snap open.
 */
export function FaqItem({ faq, group }: FaqItemProps) {
  return (
    <details name={group} className="faq-item group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold transition-colors duration-200 hover:text-brand [&::-webkit-details-marker]:hidden">
        <span className="text-[1.0625rem] text-pretty">{faq.question}</span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-[transform,color,border-color] duration-300 ease-out group-open:rotate-180 group-open:border-brand group-open:text-brand motion-reduce:transition-none">
          <Icon name="chevronDown" size={16} />
        </span>
      </summary>
      <p className="max-w-[58rem] pb-6 text-[0.9375rem] leading-relaxed text-pretty text-muted">
        {faq.answer}
      </p>
    </details>
  );
}
