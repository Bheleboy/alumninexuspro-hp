"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Loader2 } from "lucide-react"

interface PayFastPaymentFormProps {
  planType: "premium" | "fasttrack"
  userEmail: string
  userName: string
  amount: string
  itemName: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function PayFastPaymentForm({
  planType,
  userEmail,
  userName,
  amount,
  itemName,
  onSuccess,
  onError,
}: PayFastPaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      // Create payment with backend
      const response = await fetch("/api/payfast/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType,
          userEmail,
          userName,
          customData: {
            timestamp: new Date().toISOString(),
            planType,
          },
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Create and submit form to PayFast
        const form = document.createElement("form")
        form.method = "POST"
        form.action = result.payfast_url
        form.style.display = "none"

        // Add all payment data as hidden inputs
        Object.entries(result.paymentData).forEach(([key, value]) => {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = key
          input.value = value as string
          form.appendChild(input)
        })

        document.body.appendChild(form)
        form.submit()

        onSuccess?.()
      } else {
        throw new Error(result.error || "Payment creation failed")
      }
    } catch (error) {
      console.error("PayFast payment error:", error)
      onError?.(error instanceof Error ? error.message : "Payment failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading} className="w-full bg-[#002366] hover:bg-[#001a4d] h-12">
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4 mr-2" />
          Pay {amount} with PayFast
        </>
      )}
    </Button>
  )
}
