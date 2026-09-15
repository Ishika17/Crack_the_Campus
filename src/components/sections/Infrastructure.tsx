import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { infrastructureStats } from "@/content/stats";

const ASSURANCES: { icon: IconName; label: string }[] = [
  { icon: "shield", label: "AI proctoring & integrity monitoring" },
  { icon: "globe", label: "Windows, macOS & Linux" },
  { icon: "building", label: "420+ partner institutions" },
];

export function Infrastructure() {
  return (
    <Section id="infrastructure" spacing="tight" aria-labelledby="infrastructure-heading">
      <div className="rounded-panel border border-line bg-surface-2 p-8 sm:p-10 lg:p-12">
        <SectionHeading
          id="infrastructure-heading"
          eyebrow="Built for drive day"
          title="Enterprise-grade infrastructure for high-stakes placements."
          description="Your placement test is not the moment for a loading spinner. The assessment platform is engineered for concurrent peak loads and global integrity checks."
          align="center"
          className="mx-auto"
        />

        <dl className="mt-10 grid gap-5 sm:grid-cols-3">
          {infrastructureStats.map((stat, index) => (
            <Reveal
              key={stat.id}
              delay={index * 90}
              className="flex flex-col gap-2 rounded-card border border-line bg-surface p-6 text-center"
            >
              {/* A definition group must read <dt> then <dd>; the visual order
                  (value first) is handled with flex `order` so the markup
                  stays valid. */}
              <dt className="order-2 font-bold tracking-tight">{stat.label}</dt>
              <dd className="order-1 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">
                {stat.value}
              </dd>
              <dd className="order-3 text-sm leading-relaxed text-muted">{stat.detail}</dd>
            </Reveal>
          ))}
        </dl>

        <Reveal
          delay={280}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-muted"
        >
          {ASSURANCES.map((item) => (
            <span key={item.label} className="inline-flex items-center gap-2">
              <Icon name={item.icon} size={16} className="text-brand" />
              {item.label}
            </span>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
