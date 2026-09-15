"use client";

import { Icon } from "@/components/ui/Icon";

/** Must match the inline bootstrap script in `app/layout.tsx`. */
const STORAGE_KEY = "ctc-theme";

/**
 * Students revise at night, so a dark theme is a comfort feature here rather
 * than decoration. Every colour is a CSS variable, so switching themes is a
 * single attribute on `<html>`.
 *
 * Deliberately stateless: the theme lives in the DOM, not in React, and the
 * two icons are swapped by the `dark:` variant in CSS. That means no
 * `useEffect`, no state sync on mount, no re-render — and no risk of the icon
 * disagreeing with the theme the bootstrap script already applied.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing or blocked storage: the theme still applies to this
      // page view, it just will not be remembered.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-brand hover:text-brand"
    >
      <Icon name="moon" size={18} className="dark:hidden" />
      <Icon name="sun" size={18} className="hidden dark:block" />
    </button>
  );
}
