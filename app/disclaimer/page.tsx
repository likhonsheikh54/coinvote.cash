export const metadata = {
  title: "Disclaimer | Coinvote.cash",
  description: "Legal disclaimer for Coinvote.cash",
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>

        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">General Information</h2>
            <p className="text-gray-300 mb-4">
              All content provided herein our website, hyperlinked sites, associated applications, forums, blogs, social
              media accounts and other platforms ("Site") is for your general information only, procured from third
              party sources. We make no warranties of any kind in relation to our content, including but not limited to
              accuracy and updatedness. No part of the content that we provide constitutes financial advice, legal
              advice or any other form of advice meant for your specific reliance for any purpose. Any use or reliance
              on our content is solely at your own risk and discretion. You should conduct your own research, review,
              analyse and verify our content before relying on them. Trading is a highly risky activity that can lead to
              major losses, please therefore consult your financial advisor before making any decision. No content on
              our Site is meant to be a solicitation or offer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">No Investment Advice</h2>
            <p className="text-gray-300 mb-4">
              The information provided on this website does not constitute investment advice, financial advice, trading
              advice, or any other sort of advice and you should not treat any of the website's content as such.
              Coinvote.cash does not recommend that any cryptocurrency should be bought, sold, or held by you. Do
              conduct your own due diligence and consult your financial advisor before making any investment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Accuracy of Information</h2>
            <p className="text-gray-300 mb-4">
              Coinvote.cash will strive to ensure accuracy of information listed on this website although it will not
              hold any responsibility for any missing or wrong information. Coinvote.cash provides all information as
              is. You understand that you are using any and all information available here at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Non-endorsement</h2>
            <p className="text-gray-300 mb-4">
              The appearance of third-party advertisements and hyperlinks on Coinvote.cash does not constitute an
              endorsement, guarantee, warranty, or recommendation by Coinvote.cash. Conduct your due diligence before
              deciding to use any third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Risk Statement</h2>
            <p className="text-gray-300 mb-4">
              The trading of cryptocurrencies has potential rewards, and it also has potential risks involved. Trading
              may not be suitable for all people. Anyone wishing to invest should seek his or her own independent
              financial or professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Changes to Disclaimer</h2>
            <p className="text-gray-300">
              Coinvote.cash reserves the right to change this disclaimer at any time. We will post any changes to this
              page and, where appropriate, notify users by email. We encourage users to frequently check this page for
              any changes. Your continued use of the Site after any change in this disclaimer will constitute your
              acceptance of such change.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

