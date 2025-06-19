import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-[#002366] hover:text-[#001a4d]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-[#002366] mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: January 15, 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, complete your
                profile, or communicate with us. This includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Personal information (name, email address, phone number)</li>
                <li>Educational background and credentials</li>
                <li>Professional experience and employment history</li>
                <li>Profile photos and biographical information</li>
                <li>Messages and communications on the platform</li>
                <li>Payment information for premium subscriptions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">2. Blockchain Data</h2>
              <p className="text-gray-700 leading-relaxed">
                When your profile is verified, certain information is recorded on the Solana blockchain to create an
                immutable record of your verified status. This blockchain data is public and permanent by design. We
                only record verification status and timestamps, not personal identifying information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Verify your educational and professional credentials</li>
                <li>Facilitate connections between verified alumni</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send you technical notices and support messages</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibent text-[#002366] mb-4">4. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>With other verified users as part of the networking platform</li>
                <li>With educational institutions for verification purposes</li>
                <li>With service providers who assist in platform operations</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. All messages are encrypted, and
                sensitive data is stored securely using industry-standard practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account (subject to blockchain record permanence)</li>
                <li>Control who can see your profile information</li>
                <li>Opt out of non-essential communications</li>
                <li>Request a copy of your personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to collect information about your browsing activities
                and to provide personalized experiences. You can control cookie settings through your browser
                preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">8. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place to protect your personal information in accordance with applicable
                data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform is not intended for users under the age of 16. We do not knowingly collect personal
                information from children under 16. If we become aware that we have collected such information, we will
                take steps to delete it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">11. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@alumninexuspro.com or
                through our support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
