import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// PayFast configuration
const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE
const PAYFAST_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.payfast.co.za/eng/process"
    : "https://sandbox.payfast.co.za/eng/process"

interface PaymentData {
  merchant_id: string
  merchant_key: string
  return_url: string
  cancel_url: string
  notify_url: string
  name_first: string
  name_last: string
  email_address: string
  amount: string
  item_name: string
  item_description: string
  custom_str1?: string
  custom_str2?: string
}

function generateSignature(data: PaymentData, passPhrase = ""): string {
  // Create parameter string
  let pfOutput = ""
  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key as keyof PaymentData] !== "") {
      pfOutput += `${key}=${encodeURIComponent(data[key as keyof PaymentData] || "")}&`
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1)

  if (passPhrase !== "") {
    getString += `&passphrase=${encodeURIComponent(passPhrase)}`
  }

  return crypto.createHash("md5").update(getString).digest("hex")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { planType, userEmail, userName, customData } = body

    // Determine payment amount based on plan
    const amount = planType === "premium" ? "9.99" : "20.00"
    const itemName =
      planType === "premium" ? "Alumni Nexus Pro Premium Subscription" : "Alumni Nexus Pro Fast-Track Verification"

    const paymentData: PaymentData = {
      merchant_id: PAYFAST_MERCHANT_ID!,
      merchant_key: PAYFAST_MERCHANT_KEY!,
      return_url: `${request.nextUrl.origin}/subscription/success`,
      cancel_url: `${request.nextUrl.origin}/subscription/cancel`,
      notify_url: `${request.nextUrl.origin}/api/payfast/notify`,
      name_first: userName.split(" ")[0] || "User",
      name_last: userName.split(" ").slice(1).join(" ") || "Name",
      email_address: userEmail,
      amount: amount,
      item_name: itemName,
      item_description: `${itemName} for ${userEmail}`,
      custom_str1: planType,
      custom_str2: JSON.stringify(customData || {}),
    }

    // Generate signature
    const signature = generateSignature(paymentData, PAYFAST_PASSPHRASE)

    // Return payment data with signature for frontend form submission
    return NextResponse.json({
      success: true,
      paymentData: {
        ...paymentData,
        signature,
      },
      payfast_url: PAYFAST_URL,
    })
  } catch (error) {
    console.error("PayFast payment creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create payment" }, { status: 500 })
  }
}
