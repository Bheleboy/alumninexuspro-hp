import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE

function validateSignature(data: any, signature: string, passPhrase = ""): boolean {
  // Remove signature from data
  const { signature: _, ...dataWithoutSignature } = data

  // Create parameter string
  let pfOutput = ""
  for (const key in dataWithoutSignature) {
    if (dataWithoutSignature.hasOwnProperty(key) && dataWithoutSignature[key] !== "") {
      pfOutput += `${key}=${encodeURIComponent(dataWithoutSignature[key])}&`
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1)

  if (passPhrase !== "") {
    getString += `&passphrase=${encodeURIComponent(passPhrase)}`
  }

  const calculatedSignature = crypto.createHash("md5").update(getString).digest("hex")
  return calculatedSignature === signature
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const data: any = {}

    // Convert FormData to object
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    console.log("PayFast IPN received:", data)

    // Validate signature
    const isValidSignature = validateSignature(data, data.signature, PAYFAST_PASSPHRASE)

    if (!isValidSignature) {
      console.error("Invalid PayFast signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Validate merchant details
    if (data.merchant_id !== PAYFAST_MERCHANT_ID) {
      console.error("Invalid merchant ID")
      return NextResponse.json({ error: "Invalid merchant" }, { status: 400 })
    }

    // Process payment based on status
    const paymentStatus = data.payment_status
    const customStr1 = data.custom_str1 // Plan type: 'premium' or 'fasttrack'
    const customStr2 = data.custom_str2 // Additional custom data
    const userEmail = data.email_address
    const amount = Number.parseFloat(data.amount_gross)

    switch (paymentStatus) {
      case "COMPLETE":
        console.log("Payment completed successfully")

        // TODO: Update user subscription in database
        if (customStr1 === "premium") {
          // Activate premium subscription
          console.log(`Activating premium subscription for ${userEmail}`)
          // await updateUserSubscription(userEmail, 'premium', true)
        } else if (customStr1 === "fasttrack") {
          // Process fast-track verification
          console.log(`Processing fast-track verification for ${userEmail}`)
          // await prioritizeUserVerification(userEmail)
        }

        // TODO: Send confirmation email
        // await sendPaymentConfirmationEmail(userEmail, customStr1, amount)

        break

      case "FAILED":
        console.log("Payment failed")
        // TODO: Handle failed payment
        // await handleFailedPayment(userEmail, customStr1)
        break

      case "CANCELLED":
        console.log("Payment cancelled")
        // TODO: Handle cancelled payment
        break

      default:
        console.log("Unknown payment status:", paymentStatus)
    }

    // Return success response to PayFast
    return NextResponse.json({ status: "OK" })
  } catch (error) {
    console.error("PayFast IPN processing error:", error)
    return NextResponse.json({ error: "Processing failed" }, { status: 500 })
  }
}
