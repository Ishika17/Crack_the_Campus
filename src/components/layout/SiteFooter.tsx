import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { footerNav, legalNav } from "@/content/navigation";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface-2">
      <Container>
        <div className="grid gap-12 py-14 lg:grid-cols-[1.4fr_2fr] lg:py-20">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-[26rem] text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
            <ul className="flex flex-wrap gap-2">
              {site.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-2 text-xs font-semibold text-muted transition-colors duration-200 hover:border-brand hover:text-brand"
                  >
                    {social.label}
                    <Icon name="arrowUpRight" size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3">
                <h3 className="text-xs font-bold tracking-[0.08em] uppercase text-text">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors duration-200 hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-[0.08em] uppercase text-text">
                Contact
              </h3>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors duration-200 hover:text-brand-strong"
              >
                <Icon name="mail" size={15} />
                {site.email}
              </a>
              <address className="text-sm leading-relaxed text-muted not-italic">
                {site.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={site.address.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors duration-200 hover:text-brand"
              >
                <Icon name="pin" size={15} />
                Open in Maps
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {legalNav.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-muted transition-colors duration-200 hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
