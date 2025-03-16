"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function DisclaimerPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if the disclaimer has been accepted before
    const disclaimerAccepted = localStorage.getItem("disclaimerAccepted")

    if (!disclaimerAccepted) {
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("disclaimerAccepted", "true")
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0D1217] rounded-lg max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Disclaimer</h2>

        <div className="space-y-4 text-gray-300">
          <p>
            The information on coinvote.cash is user-generated and not verified. coinvote.cash does not provide
            financial advice or facilitate transactions.
          </p>

          <p>
            Also note that the cryptocurrencies listed on this website could potentially be scams, i.e. designed to
            induce you to invest financial resources that may be lost forever and not be recoverable once investments
            are made. You are responsible for conducting your own research (DYOR) before making any investments.
          </p>

          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle size={24} className="text-red-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-red-500 font-bold text-lg">WARNING: Scam Telegram Channels</h3>
                <p className="mt-2">
                  Our only legitimate Telegram channel for coinvote.cash is{" "}
                  <span className="font-medium">@coinvotecash</span>.
                </p>
                <p className="mt-1">Any other channel using the logo and brand name is a scam!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md">
            Okay, I understand
          </Button>
        </div>
      </div>
    </div>
  )
}

