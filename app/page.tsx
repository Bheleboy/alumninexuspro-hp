import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Coins, Star, ArrowRight, CheckCircle, TrendingUp, Globe } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#002366] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AN</span>
            </div>
            <span className="text-xl font-serif font-bold text-[#002366]">Alumni Nexus Pro</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-[#002366] transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-[#002366] transition-colors">
              How It Works
            </Link>
            <Link href="/subscription" className="text-gray-600 hover:text-[#002366] transition-colors">
              Pricing
            </Link>
            <Link href="/invite" className="text-gray-600 hover:text-[#002366] transition-colors">
              Invite Alumni
            </Link>
          </nav>
          <Link href="/auth">
            <Button variant="outline" className="border-[#002366] text-[#002366] hover:bg-[#002366] hover:text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#002366] to-[#001a4d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <Badge className="bg-[#D4AF37] text-black mb-6 px-4 py-2">🚀 Now Live: Blockchain-Verified Networking</Badge>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Verified Connections
            <br />
            <span className="text-[#D4AF37]">for Life</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with verified alumni and professionals through blockchain-secured networking. Where trust meets
            opportunity in the digital age.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 text-lg">
                Join Network
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-[#002366] px-8 py-4 text-lg"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex justify-center items-center space-x-8 text-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm">Verified Alumni</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-sm">Verification Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#002366] mb-4">Connection With Integrity</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience networking built on trust, transparency, and blockchain verification
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#002366] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Safe Messaging</h3>
                <p className="text-gray-600 leading-relaxed">
                  Encrypted, admin-moderated communications ensure professional and secure networking with real-time
                  content filtering.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#002366] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Verified Connections</h3>
                <p className="text-gray-600 leading-relaxed">
                  Blockchain-verified alumni status eliminates fake profiles and ensures authentic networking with
                  cryptographic proof.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#002366] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Crypto Rewards</h3>
                <p className="text-gray-600 leading-relaxed">
                  Verifiers earn SOL tokens for maintaining network integrity and trust. Referrals unlock additional
                  rewards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#002366] mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to join the most trusted alumni network</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Sign Up", desc: "Create your profile with education and work history" },
              { step: 2, title: "Get Verified", desc: "Admin verification ensures authentic alumni status" },
              { step: 3, title: "Connect", desc: "Send connection requests to verified alumni" },
              { step: 4, title: "Network", desc: "Engage in secure, moderated conversations" },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#D4AF37] transform -translate-y-1/2 z-0"></div>
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#002366] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#002366] mb-4">Trusted by Leading Institutions</h2>
            <p className="text-xl text-gray-600">Join thousands of verified professionals worldwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Finally, a platform where we can trust the connections our alumni are making. The verification process gives us confidence in the network's integrity.",
                author: "Dr. Ntando Mbhele",
                role: "Alumni Relations Director, University of Cape Town",
                avatar: "NM",
              },
              {
                quote:
                  "The blockchain verification eliminates the noise and fake profiles we see on other platforms. Our corporate alumni network has never been stronger.",
                author: "Michael Chen",
                role: "Head of Talent, Google",
                avatar: "MC",
              },
              {
                quote:
                  "As a recent graduate, knowing that every connection is verified gives me confidence in reaching out to senior alumni for mentorship.",
                author: "Emily Rodriguez",
                role: "MIT Class of 2023",
                avatar: "ER",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#002366] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#002366]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,247", label: "Verified Alumni", icon: <Users className="w-8 h-8" /> },
              { number: "500+", label: "Universities", icon: <Globe className="w-8 h-8" /> },
              { number: "99.9%", label: "Verification Rate", icon: <CheckCircle className="w-8 h-8" /> },
              { number: "2.4M", label: "SOL Rewards Earned", icon: <TrendingUp className="w-8 h-8" /> },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="flex justify-center mb-4 text-[#D4AF37]">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#002366] to-[#001a4d]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-6">Ready to Build Verified Connections?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of verified alumni and professionals in the most trusted network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold px-8 py-4 text-lg">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/invite">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-[#002366] px-8 py-4 text-lg"
              >
                Invite Your Alumni
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">AN</span>
                </div>
                <span className="text-xl font-serif font-bold">Alumni Nexus Pro</span>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Verified connections for life. Building trust in professional networking through blockchain technology.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Discord
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/subscription" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white transition-colors">
                    For Admins
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="/invite" className="hover:text-white transition-colors">
                    Invite Alumni
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Alumni Nexus Pro. All rights reserved. Built on Solana blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
