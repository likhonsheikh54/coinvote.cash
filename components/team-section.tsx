import Image from "next/image"

export default function TeamSection() {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Blockchain enthusiast with 8+ years in cryptocurrency markets.",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Full-stack developer with expertise in blockchain technology.",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Marketing",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Digital marketing specialist with experience in crypto projects.",
    },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-[#0a0a0a] rounded-lg border border-gray-800 overflow-hidden">
              <div className="p-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                <p className="text-gray-400 text-center mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 text-center">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

