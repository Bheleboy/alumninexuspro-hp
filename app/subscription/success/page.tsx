"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  useEffect(() => {
    // Get payment details from URL parameters (PayFast returns these)
    const paymentId = searchParams.get("pf_payment_id")
    const paymentStatus = searchParams.get("payment_status")

    if (paymentId && paymentStatus) {
      setPaymentDetails({
        paymentId,
        paymentStatus,
        timestamp: new Date().toISOString(),
      })
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-serif text-[#002366]">Payment Successful!</CardTitle>
          <CardDescription>Your payment has been processed successfully through PayFast</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {paymentDetails && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-mono">{paymentDetails.paymentId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold">{paymentDetails.paymentStatus}</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your premium features are now active</li>
                <li>• You'll receive a confirmation email shortly</li>
                <li>• Unlimited messaging is now available</li>
                <li>• Access to advanced search filters</li>
              </ul>
            </div>

            <Link href="/dashboard">
              <Button className="w-full bg-[#002366] hover:bg-[#001a4d]">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <Link href="/support" className="text-[#002366] hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
