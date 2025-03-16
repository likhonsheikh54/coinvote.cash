import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contact Us | Coinvote.cash",
  description: "Get in touch with the Coinvote.cash team. We're here to help with any questions or feedback.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-moon-night text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-400 mb-8">Get in touch with our team. We're here to help!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-[#0D1217] border-gray-800 text-white">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input id="name" className="bg-gray-800/50 border-gray-700" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" className="bg-gray-800/50 border-gray-700" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <Input id="subject" className="bg-gray-800/50 border-gray-700" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea id="message" rows={5} className="bg-gray-800/50 border-gray-700" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="bg-coin-yellow text-black hover:bg-coin-yellow/90 w-full">
                Send Message
              </Button>
            </CardFooter>
          </Card>

          <div>
            <Card className="bg-[#0D1217] border-gray-800 text-white mb-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-coin-yellow mb-1">Email</h3>
                    <p className="text-gray-300">support@coinvote.cash</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-coin-yellow mb-1">Location</h3>
                    <p className="text-gray-300">Remote team - Worldwide</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-coin-yellow mb-1">Response Time</h3>
                    <p className="text-gray-300">We aim to respond within 24-48 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0D1217] border-gray-800 text-white">
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="border-gray-700 hover:border-coin-yellow">
                    Twitter
                  </Button>
                  <Button variant="outline" className="border-gray-700 hover:border-coin-yellow">
                    Telegram
                  </Button>
                  <Button variant="outline" className="border-gray-700 hover:border-coin-yellow">
                    Discord
                  </Button>
                  <Button variant="outline" className="border-gray-700 hover:border-coin-yellow">
                    Reddit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 