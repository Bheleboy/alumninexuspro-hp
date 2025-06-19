import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE

function validateSignature(data: any, signature: string, passPhrase = ""): boolean {
  const { signature: _, ...dataWithoutSignature } = data

  let pfOutput = ""
  for (const key in dataWithoutSignature) {
    if (dataWithoutSignature.hasOwnProperty(key) && dataWithoutSignature[key] !== "") {
      pfOutput += `${key}=${encodeURIComponent(dataWithoutSignature[key])}&`
    }
  }

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

    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    console.log("PayFast Fast-Track Verification IPN received:", data)

    // Validate signature
    const isValidSignature = validateSignature(data, data.signature, PAYFAST_PASSPHRASE)

    if (!isValidSignature) {
      console.error("Invalid PayFast signature for verification payment")
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Validate merchant details
    if (data.merchant_id !== PAYFAST_MERCHANT_ID) {
      console.error("Invalid merchant ID for verification payment")
      return NextResponse.json({ error: "Invalid merchant" }, { status: 400 })
    }

    const paymentStatus = data.payment_status
    const userEmail = data.email_address
    const amount = Number.parseFloat(data.amount_gross)

    if (paymentStatus === "COMPLETE") {
      console.log("Fast-track verification payment completed successfully")

      // TODO: Priority queue the user for verification
      // await prioritizeUserVerification(userEmail)

      // TODO: Notify admin team about priority verification
      // await notifyAdminTeam('priority_verification', { userEmail, amount })

      // TODO: Send confirmation email to user
      // await sendFastTrackConfirmationEmail(userEmail)

      console.log(`Fast-track verification activated for ${userEmail}`)
    }

    return NextResponse.json({ status: "OK" })
  } catch (error) {
    console.error("PayFast verification IPN processing error:", error)
    return NextResponse.json({ error: "Processing failed" }, { status: 500 })
  }
}
