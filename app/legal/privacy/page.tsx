export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy-base">
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <h1 className="text-32 font-display font-bold text-text-primary mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-14 text-text-secondary space-y-6">
          <p><em>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</em></p>

          <h2 className="text-20 font-semibold text-text-primary font-sans">1. Information We Collect</h2>
          <p>
            When you use VelaBeam, we collect information you provide directly: your name, email address,
            workspace name, and password (stored as a secure hash). We also collect usage data such as
            pages visited, features used, and API calls made.
          </p>

          <h2 className="text-20 font-semibold text-text-primary font-sans">2. How We Use Your Information</h2>
          <p>
            We use your information to provide and improve the VelaBeam service, process transactions,
            send administrative communications, and ensure platform security. We do not sell your personal
            information to third parties.
          </p>

          <h2 className="text-20 font-semibold text-text-primary font-sans">3. Data Storage</h2>
          <p>
            Your data is stored securely using industry-standard encryption. We use Prisma with SQLite
            for development and recommend PostgreSQL for production deployments.
          </p>

          <h2 className="text-20 font-semibold text-text-primary font-sans">4. Third-Party Services</h2>
          <p>
            We may use third-party services (such as OpenAI for site generation) to provide features.
            These services have their own privacy policies. Data sent to third-party services is limited
            to what is necessary for the specific feature.
          </p>

          <h2 className="text-20 font-semibold text-text-primary font-sans">5. Data Retention</h2>
          <p>
            We retain your data for as long as your account is active. If you delete your workspace,
            associated data is retained for 30 days before permanent deletion.
          </p>

          <h2 className="text-20 font-semibold text-text-primary font-sans">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. Contact us at
            privacy@velabeam.app to exercise these rights.
          </p>

          <h2 className="text-20 font-semibold text-text-primary font-sans">7. Contact</h2>
          <p>
            For questions about this privacy policy, contact us at privacy@velabeam.app.
          </p>
        </div>
      </div>
    </div>
  );
}
