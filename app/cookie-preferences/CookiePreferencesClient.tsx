"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function CookiePreferencesClient() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
    advertising: false,
  })

  const handleToggle = (category: keyof typeof preferences) => {
    if (category === "necessary") return // Necessary cookies can't be disabled

    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const savePreferences = () => {
    // In a real implementation, this would save to cookies/localStorage
    // and potentially trigger some analytics event
    alert("Your cookie preferences have been saved.")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cookie Preferences</h1>

        <div className="bg-[#0D1217] rounded-lg border border-gray-800 p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">About Cookies</h2>
            <p className="text-gray-300 mb-4">
              Cookies are small text files that are stored on your device when you visit a website. They are widely used
              to make websites work more efficiently and provide information to the website owners. At Coinvote.cash, we
              use cookies for various purposes, including to enhance your experience, analyze site usage, and assist in
              our marketing efforts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">Manage Your Preferences</h2>
            <p className="text-gray-300 mb-6">
              You can choose which categories of cookies you allow. Click on the different category headings to learn
              more and change your default settings. Please note that blocking some types of cookies may impact your
              experience of the site and the services we are able to offer.
            </p>

            <div className="space-y-6">
              <div className="bg-[#121212] p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Strictly Necessary Cookies</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      These cookies are essential for the website to function properly and cannot be disabled.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.necessary}
                    disabled={true}
                    className="data-[state=checked]:bg-coin-green"
                  />
                </div>
                <div className="text-xs text-gray-400">
                  <p>
                    These cookies are necessary for the website to function and cannot be switched off in our systems.
                    They are usually only set in response to actions made by you which amount to a request for services,
                    such as setting your privacy preferences, logging in or filling in forms.
                  </p>
                </div>
              </div>

              <div className="bg-[#121212] p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Functional Cookies</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      These cookies enable the website to provide enhanced functionality and personalization.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.functional}
                    onCheckedChange={() => handleToggle("functional")}
                    className="data-[state=checked]:bg-coin-green"
                  />
                </div>
                <div className="text-xs text-gray-400">
                  <p>
                    These cookies enable the website to provide enhanced functionality and personalization. They may be
                    set by us or by third party providers whose services we have added to our pages. If you do not allow
                    these cookies then some or all of these services may not function properly.
                  </p>
                </div>
              </div>

              <div className="bg-[#121212] p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Analytics Cookies</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      These cookies help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={() => handleToggle("analytics")}
                    className="data-[state=checked]:bg-coin-green"
                  />
                </div>
                <div className="text-xs text-gray-400">
                  <p>
                    These cookies allow us to count visits and traffic sources so we can measure and improve the
                    performance of our site. They help us to know which pages are the most and least popular and see how
                    visitors move around the site. All information these cookies collect is aggregated and therefore
                    anonymous.
                  </p>
                </div>
              </div>

              <div className="bg-[#121212] p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Advertising Cookies</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      These cookies may be used to build a profile of your interests and show you relevant
                      advertisements.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.advertising}
                    onCheckedChange={() => handleToggle("advertising")}
                    className="data-[state=checked]:bg-coin-green"
                  />
                </div>
                <div className="text-xs text-gray-400">
                  <p>
                    These cookies may be set through our site by our advertising partners. They may be used by those
                    companies to build a profile of your interests and show you relevant adverts on other sites. They do
                    not store directly personal information, but are based on uniquely identifying your browser and
                    internet device.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-4">
            <Button onClick={savePreferences} className="bg-coin-yellow text-black hover:bg-coin-yellow/90 px-8">
              Save Preferences
            </Button>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-coin-yellow">More Information</h2>
            <p className="text-gray-300 mb-4">
              For more information about how we use cookies and your personal data, please read our{" "}
              <a href="/privacy" className="text-coin-yellow hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <p className="text-gray-300">
              If you have any questions about our use of cookies, please contact us at{" "}
              <span className="text-coin-yellow">privacy@coinvote.cash</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

