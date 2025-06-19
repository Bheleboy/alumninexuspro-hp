"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-serif text-[#002366]">Payment Cancelled</CardTitle>
          <CardDescription>Your payment was cancelled. No charges have been made to your account.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">What would you like to do?</h3>
            <p className="text-sm text-gray-600 mb-4">
              You can try the payment again or return to your dashboard to continue using the free features.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/subscription">
              <Button className="w-full bg-[#002366] hover:bg-[#001a4d]">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Payment Again
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Dashboard
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Having trouble?{" "}
              <Link href="/support" className="text-[#002366] hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
