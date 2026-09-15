import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using Crack The Campus learning and assessment tools.",
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Platform rules" title="Terms of use" updated="September 15, 2026">
      <h2>Using the platform</h2>
      <p>
        Crack The Campus provides learning, practice, assessment, and career-readiness tools for students. You agree to provide accurate account information, keep your login details secure, and use the platform for lawful educational purposes.
      </p>

      <h2>Your work and account</h2>
      <p>
        You retain ownership of work you submit. You give us permission to process that work only as needed to provide, secure, and improve the service. Do not share an account, impersonate another person, or access features without permission.
      </p>

      <h2>Assessments and scores</h2>
      <p>
        PR Scores, rankings, and assessment results are educational indicators, not guarantees of interviews, offers, or employment. Proctored assessments must be completed honestly and according to the instructions shown at the time.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not upload malicious code, misuse another student&apos;s information, attempt to bypass assessment controls, copy protected course material, or disrupt the platform. We may suspend access when these rules are breached.
      </p>

      <h2>Service changes</h2>
      <p>
        We may improve, change, or temporarily pause features as the platform evolves. We will take reasonable care to keep the service useful and communicate material changes when appropriate.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about these terms or an account issue, contact us before continuing to use the service.
      </p>
    </LegalPage>
  );
}
