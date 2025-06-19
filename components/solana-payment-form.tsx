"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Wallet, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface SolanaPaymentFormProps {
  planType: "premium" | "fasttrack"
  userEmail: string
  userName: string
  amount: string
  itemName: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function SolanaPaymentForm({
  planType,
  userEmail,
  userName,
  amount,
  itemName,
  onSuccess,
  onError,
}: SolanaPaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "connecting" | "confirming" | "success" | "error">("idle")

  // Check if Phantom wallet is available
  const [phantomAvailable, setPhantomAvailable] = useState(false)

  useEffect(() => {
    // Check if Phantom wallet is installed
    const checkPhantom = () => {
      if (typeof window !== "undefined" && window.solana && window.solana.isPhantom) {
        setPhantomAvailable(true)
        // Check if already connected
        if (window.solana.isConnected) {
          setWalletConnected(true)
          setWalletAddress(window.solana.publicKey?.toString() || "")
        }
      }
    }

    checkPhantom()
  }, [])

  const connectWallet = async () => {
    if (!phantomAvailable) {
      onError?.("Phantom wallet not found. Please install Phantom wallet extension.")
      return
    }

    setIsLoading(true)
    setPaymentStatus("connecting")

    try {
      // TODO: Connect to Phantom wallet
      // const response = await window.solana.connect()
      // setWalletAddress(response.publicKey.toString())
      // setWalletConnected(true)

      // Placeholder for wallet connection
      setTimeout(() => {
        setWalletConnected(true)
        setWalletAddress("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU") // Mock address
        setPaymentStatus("idle")
        setIsLoading(false)
      }, 2000)

      console.log("Phantom wallet connected")
    } catch (error) {
      console.error("Wallet connection failed:", error)
      onError?.("Failed to connect wallet")
      setPaymentStatus("error")
      setIsLoading(false)
    }
  }

  const handleSolanaPayment = async () => {
    if (!walletConnected) {
      await connectWallet()
      return
    }

    setIsLoading(true)
    setPaymentStatus("confirming")

    try {
      // TODO: Create Solana Pay transaction
      // import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
      // import { createTransferInstruction } from '@solana/spl-token'

      const solAmount = planType === "premium" ? 0.05 : 0.1 // SOL amounts (discounted)
      const recipientAddress = process.env.NEXT_PUBLIC_SOLANA_RECIPIENT_ADDRESS

      console.log("Creating Solana transaction:", {
        amount: solAmount,
        recipient: recipientAddress,
        planType,
        userEmail,
      })

      // Create payment request to backend
      const response = await fetch("/api/solana/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType,
          userEmail,
          userName,
          walletAddress,
          amount: solAmount,
          itemName,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // TODO: Sign and send transaction
        // const transaction = Transaction.from(Buffer.from(result.transaction, 'base64'))
        // const signedTransaction = await window.solana.signTransaction(transaction)
        // const signature = await connection.sendRawTransaction(signedTransaction.serialize())

        // Simulate successful payment
        setTimeout(() => {
          setPaymentStatus("success")
          setIsLoading(false)
          onSuccess?.()
        }, 3000)

        console.log("Solana payment initiated successfully")
      } else {
        throw new Error(result.error || "Payment creation failed")
      }
    } catch (error) {
      console.error("Solana payment error:", error)
      onError?.(error instanceof Error ? error.message : "Payment failed")
      setPaymentStatus("error")
      setIsLoading(false)
    }
  }

  const getSolAmount = () => {
    return planType === "premium" ? "0.05 SOL" : "0.1 SOL"
  }

  const getUSDEquivalent = () => {
    return planType === "premium" ? "~$9.45" : "~$19.00"
  }

  if (!phantomAvailable) {
    return (
      <div className="space-y-3">
        <Button
          onClick={() => window.open("https://phantom.app/", "_blank")}
          variant="outline"
          className="w-full h-12 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Install Phantom Wallet
        </Button>
        <p className="text-xs text-gray-500 text-center">Phantom wallet required for SOL payments</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {walletConnected && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Wallet Connected</span>
          </div>
          <p className="text-xs text-green-600 mt-1 font-mono">
            {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
          </p>
        </div>
      )}

      <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-[#002366]">Solana Pay</span>
          <Badge variant="secondary" className="bg-[#D4AF37] text-black">
            5% Discount
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#002366]">{getSolAmount()}</span>
          <span className="text-sm text-gray-600">{getUSDEquivalent()}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Instant settlement • Low fees • Secure</p>
      </div>

      <Button
        onClick={walletConnected ? handleSolanaPayment : connectWallet}
        disabled={isLoading}
        className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black h-12 font-semibold"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {paymentStatus === "connecting" && "Connecting Wallet..."}
            {paymentStatus === "confirming" && "Confirming Payment..."}
          </>
        ) : paymentStatus === "success" ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Payment Successful!
          </>
        ) : paymentStatus === "error" ? (
          <>
            <AlertCircle className="w-4 h-4 mr-2" />
            Payment Failed - Retry
          </>
        ) : walletConnected ? (
          <>
            <Zap className="w-4 h-4 mr-2" />
            Pay {getSolAmount()} (Instant)
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4 mr-2" />
            Connect Phantom Wallet
          </>
        )}
      </Button>

      {!walletConnected && (
        <p className="text-xs text-gray-500 text-center">Secure payments powered by Solana blockchain</p>
      )}
    </div>
  )
}
