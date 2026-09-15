"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

type ContactFormButtonProps = {
  label: string;
  subject: string;
  description: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  trailingIcon?: IconName;
};

/**
 * Presentation-only contact form for the assessment. It gives visitors a
 * clear submission flow without claiming to send email until an email service
 * is connected later.
 */
export function ContactFormButton({
  label,
  subject,
  description,
  variant = "secondary",
  size,
  className,
  trailingIcon,
}: ContactFormButtonProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const showDialog = () => {
    setSubmitted(false);
    setOpen(true);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        trailingIcon={trailingIcon}
        onClick={showDialog}
      >
        {label}
      </Button>

      {open
        ? createPortal(
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/45 p-4"
          role="presentation"
          onMouseDown={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-heading"
            className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-panel border border-line bg-surface p-4 shadow-float sm:max-h-[calc(100dvh-4rem)] sm:p-5"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.08em] uppercase text-brand">Contact us</p>
                <h2 id="contact-form-heading" className="mt-1.5 text-xl font-extrabold tracking-tight">
                  {subject}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
              </div>
              <button
                type="button"
                aria-label="Close contact form"
                onClick={() => setOpen(false)}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-brand"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="mt-7 rounded-xl border border-success/20 bg-success-soft p-6 text-center">
                <span className="mx-auto grid size-11 place-items-center rounded-full bg-surface text-success">
                  <Icon name="check" size={22} />
                </span>
                <h3 className="mt-4 font-bold">Message submitted</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Thanks for reaching out. Our team will get back to you soon.
                </p>
                <Button className="mt-5" onClick={() => setOpen(false)}>
                  Done
                </Button>
              </div>
            ) : (
              <form className="mt-4 flex flex-col gap-2.5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  Name
                  <input required name="name" placeholder="Your name" className="h-10 rounded-xl border border-line bg-surface-2 px-3.5 font-normal outline-none transition-colors placeholder:text-muted focus:border-brand" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  Email
                  <input required name="email" type="email" placeholder="you@example.com" className="h-10 rounded-xl border border-line bg-surface-2 px-3.5 font-normal outline-none transition-colors placeholder:text-muted focus:border-brand" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  How can we help?
                  <textarea required name="message" rows={2} placeholder="Write your message..." className="resize-none rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 font-normal outline-none transition-colors placeholder:text-muted focus:border-brand" />
                </label>
                <Button type="submit" size="lg" trailingIcon="arrowRight" className="mt-1">
                  Submit enquiry
                </Button>
              </form>
            )}
          </div>
        </div>,
        document.body,
      )
        : null}
    </>
  );
}
