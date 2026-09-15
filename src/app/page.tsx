import { CtcScore } from "@/components/sections/CtcScore";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Pathways } from "@/components/sections/Pathways";
import { Sprint } from "@/components/sections/Sprint";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";

/**
 * The page is a flat, readable list of sections. Reordering the narrative, or
 * dropping a section for an A/B test, is a one-line change here — no section
 * knows about its neighbours.
 */
export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <Hero />
      <TrustedBy />
      <Ecosystem />
      <Pathways />
      <CtcScore />
      <Sprint />
      <Infrastructure />
      <Testimonials />
      <Faq />
      <FinalCta />

      {/* Rich-result markup for the FAQ block. Ships as static JSON in the
          HTML — no runtime cost. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: site.name,
            url: site.url,
            email: site.email,
            description: site.description,
          }),
        }}
      />
    </>
  );
}
