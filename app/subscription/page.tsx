"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft, Zap, Crown, Users, Building2 } from "lucide-react"
import PayFastPaymentForm from "@/components/payfast-payment-form"
import SolanaPaymentForm from "@/components/solana-payment-form"

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium" | "enterprise">("premium")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const [userData] = useState({
    email: "user@example.com", // TODO: Get from auth context
    name: "John Doe", // TODO: Get from auth context
  })

  const plans = [
    {
      id: "free",
      name: "Free",
      icon: Users,
      price: "$0",
      yearlyPrice: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "3 messages per month",
        "Basic profile verification",
        "Access to verified network",
        "Standard support",
        "Basic search filters",
      ],
      limitations: ["Limited messaging", "No priority verification", "Basic analytics"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      icon: Crown,
      price: "$9.99",
      yearlyPrice: "$99.99",
      period: "per month",
      description: "Unlimited networking power",
      features: [
        "Unlimited messages",
        "Priority verification ($20 fast-track)",
        "Advanced search filters",
        "Analytics dashboard",
        "Priority support",
        "Early access to new features",
        "Crypto rewards for referrals",
        "Profile boost visibility",
        "Custom profile themes",
      ],
      popular: true,
      cta: "Upgrade to Premium",
      savings: "Save $20/year",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: Building2,
      price: "$2",
      yearlyPrice: "$20",
      period: "per seat/month",
      description: "For institutions and large organizations",
      features: [
        "Everything in Premium",
        "Bulk user management",
        "Custom branding",
        "Advanced analytics",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "Priority onboarding",
        "Custom verification workflows",
      ],
      popular: false,
      cta: "Contact Sales",
      savings: "Save $4/seat/year",
    },
  ]

  const getPrice = (plan: (typeof plans)[0]) => {
    return billingCycle === "yearly" ? plan.yearlyPrice : plan.price
  }

  const getPeriod = (plan: (typeof plans)[0]) => {
    if (plan.id === "free") return "forever"
    if (plan.id === "enterprise") {
      return billingCycle === "yearly" ? "per seat/year" : "per seat/month"
    }
    return billingCycle === "yearly" ? "per year" : "per month"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="inline-flex items-center text-[#002366] hover:text-[#001a4d]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#002366] mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Unlock the full potential of verified alumni networking with our premium features
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "monthly" ? "bg-[#002366] text-white" : "text-gray-600 hover:text-[#002366]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "yearly" ? "bg-[#002366] text-white" : "text-gray-600 hover:text-[#002366]"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-[#D4AF37] text-black px-2 py-1 rounded-full">Save up to 17%</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const PlanIcon = plan.icon
            return (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.popular ? "border-[#D4AF37] border-2 shadow-lg scale-105" : "border-gray-200"
                } ${selectedPlan === plan.id ? "ring-2 ring-[#002366]" : ""} transition-all duration-200`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-black">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 w-12 h-12 bg-[#002366] rounded-lg flex items-center justify-center">
                    <PlanIcon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-serif">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#002366]">{getPrice(plan)}</span>
                    <span className="text-gray-600 ml-2">{getPeriod(plan)}</span>
                  </div>
                  {billingCycle === "yearly" && plan.savings && (
                    <div className="text-sm text-[#D4AF37] font-semibold">{plan.savings}</div>
                  )}
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}

                    {plan.limitations?.map((limitation, index) => (
                      <div key={index} className="flex items-center space-x-3 opacity-60">
                        <div className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm line-through">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  {plan.id === "free" ? (
                    <Button variant="outline" className="w-full h-12" disabled>
                      Current Plan
                    </Button>
                  ) : plan.id === "enterprise" ? (
                    <Button
                      className="w-full h-12 bg-[#002366] hover:bg-[#001a4d]"
                      onClick={() => window.open("mailto:sales@alumninexuspro.com?subject=Enterprise Plan Inquiry")}
                    >
                      {plan.cta}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <SolanaPaymentForm
                        planType="premium"
                        userEmail={userData.email}
                        userName={userData.name}
                        amount={billingCycle === "yearly" ? "0.5" : "0.05"}
                        itemName={`Alumni Nexus Pro Premium Subscription (${billingCycle})`}
                        onSuccess={() => console.log("Solana payment successful")}
                        onError={(error) => console.error("Solana payment error:", error)}
                      />

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">or pay with traditional methods</span>
                        </div>
                      </div>

                      <PayFastPaymentForm
                        planType="premium"
                        userEmail={userData.email}
                        userName={userData.name}
                        amount={billingCycle === "yearly" ? "99.99" : "9.99"}
                        itemName={`Alumni Nexus Pro Premium Subscription (${billingCycle})`}
                        onSuccess={() => console.log("PayFast payment initiated")}
                        onError={(error) => console.error("PayFast payment error:", error)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Fast-Track Verification */}
        <Card className="max-w-2xl mx-auto mt-12 border-[#D4AF37]">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5 text-[#D4AF37]" />
              <span>Fast-Track Verification</span>
            </CardTitle>
            <CardDescription>Skip the queue and get verified in 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-3xl font-bold text-[#002366]">$20</div>
            <p className="text-gray-600">
              Get your profile verified within 24 hours instead of the standard 3-5 business days
            </p>
            <div className="flex flex-col space-y-3 justify-center">
              <div className="space-y-4">
                <SolanaPaymentForm
                  planType="fasttrack"
                  userEmail={userData.email}
                  userName={userData.name}
                  amount="0.1"
                  itemName="Alumni Nexus Pro Fast-Track Verification"
                  onSuccess={() => console.log("Solana fast-track payment successful")}
                  onError={(error) => console.error("Solana fast-track payment error:", error)}
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <PayFastPaymentForm
                  planType="fasttrack"
                  userEmail={userData.email}
                  userName={userData.name}
                  amount="20.00"
                  itemName="Alumni Nexus Pro Fast-Track Verification"
                  onSuccess={() => console.log("PayFast fast-track payment initiated")}
                  onError={(error) => console.error("PayFast fast-track payment error:", error)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Comparison Table */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-center text-[#002366] mb-8">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold">Features</th>
                  <th className="text-center p-4 font-semibold">Free</th>
                  <th className="text-center p-4 font-semibold">Premium</th>
                  <th className="text-center p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-4">Monthly Messages</td>
                  <td className="text-center p-4">3</td>
                  <td className="text-center p-4">Unlimited</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4">Profile Verification</td>
                  <td className="text-center p-4">Basic</td>
                  <td className="text-center p-4">Priority</td>
                  <td className="text-center p-4">Custom Workflow</td>
                </tr>
                <tr>
                  <td className="p-4">Analytics Dashboard</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">Advanced</td>
                </tr>
                <tr>
                  <td className="p-4">API Access</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">✓</td>
                </tr>
                <tr>
                  <td className="p-4">Support</td>
                  <td className="text-center p-4">Standard</td>
                  <td className="text-center p-4">Priority</td>
                  <td className="text-center p-4">Dedicated Manager</td>
                </tr>
                <tr>
                  <td className="p-4">Pricing</td>
                  <td className="text-center p-4">Free</td>
                  <td className="text-center p-4">$9.99/month</td>
                  <td className="text-center p-4">$2/seat/month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto mt-16">
          <h2 className="text-2xl font-serif font-bold text-center text-[#002366] mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access to premium features
                until the end of your billing period.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We primarily accept SOL payments through Solana Pay for instant, secure transactions. We also support
                all major South African payment methods through PayFast, including credit cards, EFT, and instant EFT as
                an alternative option.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How does Enterprise pricing work?</h3>
              <p className="text-gray-600">
                Enterprise pricing is $2 per seat per month for organizations with less than 100 users. For larger
                organizations or custom requirements, please contact our sales team for a personalized quote.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How does verification work?</h3>
              <p className="text-gray-600">
                Our admin team manually reviews each profile against official records. Standard verification takes 3-5
                business days, while fast-track verification is completed within 24 hours.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-gray-600">
                Yes, all messages are encrypted end-to-end, and verification data is stored on the blockchain for
                immutable proof of authenticity.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What's included in Enterprise?</h3>
              <p className="text-gray-600">
                Enterprise includes everything in Premium plus bulk user management, custom branding, API access,
                dedicated support, and custom integrations. Perfect for universities and large corporations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
