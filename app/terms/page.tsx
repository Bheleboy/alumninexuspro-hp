import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-4xl font-serif font-bold text-[#002366] mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: January 15, 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Alumni Nexus Pro ("the Platform"), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">2. Platform Description</h2>
              <p className="text-gray-700 leading-relaxed">
                Alumni Nexus Pro is a blockchain-verified alumni networking platform that connects verified alumni and
                professionals through secure, authenticated channels. The platform uses Solana blockchain technology to
                ensure the authenticity of user credentials and maintain network integrity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">3. User Verification</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All users must undergo verification to access the platform's full features. By submitting verification
                documents, you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Warrant that all information provided is accurate and truthful</li>
                <li>Consent to verification of your educational and professional credentials</li>
                <li>Agree to blockchain logging of your verified status</li>
                <li>Understand that false information may result in permanent account suspension</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">4. Blockchain Technology</h2>
              <p className="text-gray-700 leading-relaxed">
                The platform utilizes Solana blockchain technology to create immutable records of user verifications. By
                using the platform, you acknowledge and consent to your verification data being recorded on the
                blockchain, which creates a permanent, public record of your verified status.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">5. User Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Users agree to maintain professional conduct and not to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Share inappropriate, offensive, or unprofessional content</li>
                <li>Attempt to circumvent verification processes</li>
                <li>Harass, spam, or abuse other users</li>
                <li>Use the platform for unauthorized commercial purposes</li>
                <li>Attempt to compromise platform security or user privacy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">6. Payment and Subscriptions</h2>
              <p className="text-gray-700 leading-relaxed">
                Premium subscriptions are billed monthly and automatically renew unless cancelled. We accept payments
                through Solana Pay and traditional payment methods via PayFast. All payments are processed securely, and
                refunds are subject to our refund policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The platform and its original content, features, and functionality are owned by Alumni Nexus Pro and are
                protected by international copyright, trademark, patent, trade secret, and other intellectual property
                laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">8. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                platform, to understand our practices regarding the collection and use of your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Alumni Nexus Pro shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from your use of the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">10. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account and bar access to the platform immediately, without prior
                notice or liability, under our sole discretion, for any reason whatsoever, including without limitation
                if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#002366] mb-4">12. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at legal@alumninexuspro.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
