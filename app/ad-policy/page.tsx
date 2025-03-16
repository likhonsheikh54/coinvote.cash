export const metadata = {
  title: "Advertising Policy | Coinvote.cash",
  description: "Learn about our advertising policies and guidelines for promoting your project on Coinvote.cash",
}

export default function AdPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Advertising Policy</h1>

        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Overview</h2>
            <p className="text-gray-300 mb-4">
              Coinvote.cash offers various advertising opportunities for cryptocurrency projects, exchanges, wallets,
              and other blockchain-related businesses. This policy outlines our guidelines for advertisements on our
              platform to ensure transparency, quality, and compliance with regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Advertising Options</h2>
            <p className="text-gray-300 mb-4">We offer the following advertising options:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>
                <strong>Banner Ads</strong> - Displayed on various pages of our website
              </li>
              <li>
                <strong>Promoted Listings</strong> - Featured placement for your cryptocurrency or NFT project
              </li>
              <li>
                <strong>Sponsored Content</strong> - Articles and reviews about your project
              </li>
              <li>
                <strong>Newsletter Mentions</strong> - Inclusion in our regular newsletter
              </li>
              <li>
                <strong>Social Media Promotions</strong> - Mentions on our social media channels
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Content Guidelines</h2>
            <p className="text-gray-300 mb-4">All advertisements must comply with the following guidelines:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Content must be accurate and not misleading</li>
              <li>Claims must be substantiated and verifiable</li>
              <li>No guarantees of profits or investment returns</li>
              <li>No promotion of pump and dump schemes or market manipulation</li>
              <li>No excessive use of terms like "guaranteed," "risk-free," or similar phrases</li>
              <li>Clear disclosure of risks associated with cryptocurrency investments</li>
              <li>No promotion of illegal activities or scams</li>
              <li>No offensive, discriminatory, or inappropriate content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Prohibited Content</h2>
            <p className="text-gray-300 mb-4">We do not accept advertisements for:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Projects with a history of fraudulent activities</li>
              <li>Ponzi or pyramid schemes</li>
              <li>Unregistered securities offerings</li>
              <li>Projects that violate applicable laws and regulations</li>
              <li>Adult content or gambling services</li>
              <li>Projects that promote hate speech or discrimination</li>
              <li>Projects with known security vulnerabilities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Disclosure</h2>
            <p className="text-gray-300 mb-4">
              All advertisements on Coinvote.cash are clearly labeled as "Sponsored" or "Advertisement" to maintain
              transparency with our users. Sponsored content will include a disclosure at the beginning of the article.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Review Process</h2>
            <p className="text-gray-300 mb-4">
              All advertisements undergo a review process before being published on our platform:
            </p>
            <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-4">
              <li>Submission of advertisement materials and project information</li>
              <li>Initial review by our team for compliance with our advertising policy</li>
              <li>Background check on the project and team</li>
              <li>Final approval or rejection</li>
              <li>Publication of approved advertisements</li>
            </ol>
            <p className="text-gray-300 mb-4">
              We reserve the right to reject any advertisement that does not comply with our policies or that we believe
              may be harmful to our users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Termination</h2>
            <p className="text-gray-300 mb-4">We reserve the right to remove any advertisement at any time if:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>The project is found to be engaged in fraudulent activities</li>
              <li>The advertisement violates our policies</li>
              <li>We receive legitimate complaints from users</li>
              <li>The project undergoes significant changes that affect its compliance with our policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Contact Information</h2>
            <p className="text-gray-300 mb-4">For inquiries about advertising opportunities, please contact us at:</p>
            <p className="text-coin-yellow">advertising@coinvote.cash</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Changes to This Policy</h2>
            <p className="text-gray-300">
              We may update this advertising policy from time to time. We will notify advertisers of any significant
              changes to this policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

