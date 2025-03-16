export const metadata = {
  title: "Terms and Conditions | Coinvote.cash",
  description: "Terms and conditions for using Coinvote.cash",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing and using Coinvote.cash ("the Site"), you accept and agree to be bound by the terms and
              provision of this agreement. Additionally, when using the Site's particular services, you shall be subject
              to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">2. Description of Service</h2>
            <p className="text-gray-300 mb-4">
              Coinvote.cash provides users with access to a collection of resources, including various cryptocurrency
              data, tools, and community features (the "Service"). The Service is subject to modification, restriction,
              or change at any time by Coinvote.cash.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">3. User Conduct</h2>
            <p className="text-gray-300 mb-4">
              You agree to use the Service only for lawful purposes. You are prohibited from posting or transmitting
              through the Service any material that:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Violates or infringes the rights of others</li>
              <li>Is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights</li>
              <li>Encourages conduct that would constitute a criminal offense</li>
              <li>Contains advertising or solicitation of any kind</li>
              <li>Impersonates others</li>
              <li>Contains viruses or other computer code designed to disrupt the functionality of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">4. Account Registration</h2>
            <p className="text-gray-300 mb-4">
              To access certain features of the Service, you may be required to register for an account. You agree to
              provide accurate, current, and complete information during the registration process and to update such
              information to keep it accurate, current, and complete.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">5. Privacy Policy</h2>
            <p className="text-gray-300 mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
              information when you use our Service. By using the Service, you agree to the collection and use of
              information in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">6. Intellectual Property</h2>
            <p className="text-gray-300 mb-4">
              The Service and its original content, features, and functionality are owned by Coinvote.cash and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual property or
              proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">7. Termination</h2>
            <p className="text-gray-300 mb-4">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice
              or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
              not limited to a breach of the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">8. Limitation of Liability</h2>
            <p className="text-gray-300 mb-4">
              In no event shall Coinvote.cash, nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">9. Changes to Terms</h2>
            <p className="text-gray-300 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material we will provide at least 30 days' notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">10. Governing Law</h2>
            <p className="text-gray-300">
              These Terms shall be governed and construed in accordance with the laws applicable in the jurisdiction
              where Coinvote.cash is registered, without regard to its conflict of law provisions.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

