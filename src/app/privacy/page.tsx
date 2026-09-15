import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Crack The Campus collects and uses student information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Your data" title="Privacy policy" updated="September 15, 2026">
      <h2>What we collect</h2>
      <p>
        When you create an account, contact us, or use Crack The Campus, we may collect details such as your name, email address, institution, learning activity, assessment results, and information you choose to add to your profile.
      </p>

      <h2>How we use it</h2>
      <p>
        We use this information to provide courses, practice assessments, PR Score features, support, product updates, and platform security. We use aggregated information to understand which learning experiences help students most. We do not sell student information.
      </p>

      <h2>Sharing and retention</h2>
      <p>
        We share information only with service providers that help us operate the platform, when you ask us to share a profile or score, or when required by law. We keep information only for as long as needed for these purposes and our legal obligations.
      </p>

      <h2>Your choices</h2>
      <p>
        You can request access to, correction of, or deletion of your personal information by emailing us. You can also unsubscribe from non-essential emails at any time.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organisational safeguards to protect information. No online service can guarantee absolute security, so please contact us promptly if you believe your account has been compromised.
      </p>
    </LegalPage>
  );
}
