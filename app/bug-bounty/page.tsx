export const metadata = {
  title: "Bug Bounty Program | Coinvote.cash",
  description: "Help us improve Coinvote.cash by finding and reporting security vulnerabilities",
}

export default function BugBountyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bug Bounty Program</h1>

        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Program Overview</h2>
            <p className="text-gray-300 mb-4">
              At Coinvote.cash, we take security seriously. Our Bug Bounty Program is designed to encourage security
              researchers to report security vulnerabilities they discover in our platform. We believe that working with
              the security community is crucial for keeping our platform secure.
            </p>
            <p className="text-gray-300 mb-4">
              We invite security researchers to help us identify and fix security issues in our platform. In return, we
              offer rewards based on the severity and impact of the vulnerabilities reported.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Scope</h2>
            <p className="text-gray-300 mb-4">
              The following domains and assets are in scope for our bug bounty program:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>coinvote.cash (main website)</li>
              <li>api.coinvote.cash (API endpoints)</li>
              <li>admin.coinvote.cash (admin panel)</li>
              <li>Mobile applications (iOS and Android)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Rewards</h2>
            <p className="text-gray-300 mb-4">
              Rewards are determined based on the severity and impact of the vulnerability. We use the CVSS (Common
              Vulnerability Scoring System) to assess the severity of reported vulnerabilities.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 px-4 py-2 text-left">Severity</th>
                    <th className="border border-gray-700 px-4 py-2 text-left">CVSS Score</th>
                    <th className="border border-gray-700 px-4 py-2 text-left">Reward Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 text-red-500">Critical</td>
                    <td className="border border-gray-700 px-4 py-2">9.0 - 10.0</td>
                    <td className="border border-gray-700 px-4 py-2">$1,000 - $5,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 text-orange-500">High</td>
                    <td className="border border-gray-700 px-4 py-2">7.0 - 8.9</td>
                    <td className="border border-gray-700 px-4 py-2">$500 - $1,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 text-yellow-500">Medium</td>
                    <td className="border border-gray-700 px-4 py-2">4.0 - 6.9</td>
                    <td className="border border-gray-700 px-4 py-2">$100 - $500</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 text-blue-500">Low</td>
                    <td className="border border-gray-700 px-4 py-2">0.1 - 3.9</td>
                    <td className="border border-gray-700 px-4 py-2">$50 - $100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Vulnerability Types</h2>
            <p className="text-gray-300 mb-4">
              We are particularly interested in the following types of vulnerabilities:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Remote Code Execution (RCE)</li>
              <li>SQL Injection</li>
              <li>Authentication Bypass</li>
              <li>Authorization Bypass</li>
              <li>Server-Side Request Forgery (SSRF)</li>
              <li>Cross-Site Scripting (XSS)</li>
              <li>Cross-Site Request Forgery (CSRF)</li>
              <li>Business Logic Vulnerabilities</li>
              <li>Sensitive Data Exposure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Out of Scope</h2>
            <p className="text-gray-300 mb-4">The following are considered out of scope for our bug bounty program:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Denial of Service (DoS) attacks</li>
              <li>Rate limiting issues</li>
              <li>Social engineering attacks</li>
              <li>Physical security issues</li>
              <li>Self-XSS</li>
              <li>Issues requiring physical access to a user's device</li>
              <li>Issues affecting outdated browsers or platforms</li>
              <li>Vulnerabilities in third-party applications or websites</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Reporting Process</h2>
            <p className="text-gray-300 mb-4">To report a vulnerability, please follow these steps:</p>
            <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-4">
              <li>
                Send an email to <span className="text-coin-yellow">security@coinvote.cash</span> with the subject line
                "Bug Bounty Submission"
              </li>
              <li>Include a detailed description of the vulnerability</li>
              <li>Provide steps to reproduce the vulnerability</li>
              <li>Include screenshots or videos if applicable</li>
              <li>Suggest a potential fix if possible</li>
            </ol>
            <p className="text-gray-300 mb-4">
              We will acknowledge receipt of your report within 24 hours and provide an initial assessment within 3
              business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Rules and Guidelines</h2>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Do not disclose the vulnerability publicly before it has been fixed</li>
              <li>Do not access, modify, or delete data that does not belong to you</li>
              <li>Do not perform actions that could harm the reliability or integrity of our services</li>
              <li>Do not use automated scanning tools without prior approval</li>
              <li>Only test against accounts you own or have explicit permission to test</li>
              <li>Do not attempt to access other users' data</li>
            </ul>
          </section>

          <div className="bg-[#121212] p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-4 text-center">Ready to help us improve our security?</h3>
            <div className="flex justify-center">
              <a
                href="mailto:security@coinvote.cash"
                className="bg-coin-green hover:bg-coin-green/90 text-white px-6 py-3 rounded-md"
              >
                Submit a Vulnerability
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

