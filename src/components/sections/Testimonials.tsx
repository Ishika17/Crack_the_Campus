import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section id="stories" aria-labelledby="stories-heading">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="stories-heading"
          eyebrow="Student stories"
          title="They were in your seat last placement season."
          description="Real outcomes from students across CS, IT and core branches — including the ones who started without a coding background."
        />

        <Reveal delay={160} className="flex shrink-0 items-center gap-3 rounded-card border border-line bg-surface-2 px-5 py-4">
          <span className="flex" aria-hidden>
            {[0, 1, 2, 3, 4].map((star) => (
              <Icon key={star} name="star" size={16} className="-ml-0.5 text-accent" />
            ))}
          </span>
          <span className="text-sm font-semibold">
            4.8/5
            <span className="ml-1.5 font-normal text-muted">from 12,400 students</span>
          </span>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal
            key={testimonial.id}
            as="li"
            delay={(index % 3) * 90}
            className="h-full"
          >
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
