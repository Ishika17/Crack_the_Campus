import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, updated, children }: LegalPageProps) {
  return (
    <>
      <section className="border-b border-line bg-surface-2 py-16 sm:py-20">
        <Container width="narrow">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-title font-extrabold text-balance">{title}</h1>
          <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>
        </Container>
      </section>

      <article className="py-12 sm:py-16">
        <Container width="narrow">
          <div className="legal-copy">{children}</div>
          <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
            Questions about this page? Contact {" "}
            <a className="font-semibold text-brand hover:text-brand-strong" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </Container>
      </article>
    </>
  );
}
