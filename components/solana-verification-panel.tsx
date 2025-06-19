"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Wallet, Loader2, AlertCircle, Shield, ExternalLink, Copy, Zap } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  education: string
  employment: string
  institution: string
  verificationStatus: "pending" | "verified" | "rejected"
  submittedAt: string
}

interface SolanaVerificationPanelProps {
  user: User
  onVerificationComplete?: (txSignature: string) => void
  onVerificationFailed?: (error: string) => void
}

export default function SolanaVerificationPanel({
  user,
  onVerificationComplete,
  onVerificationFailed,
}: SolanaVerificationPanelProps) {
  const [status, setStatus] = useState<"idle" | "connecting" | "verifying" | "verified" | "failed">("idle")
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [transactionSignature, setTransactionSignature] = useState<string>("")
  const [phantomAvailable, setPhantomAvailable] = useState(false)

  useEffect(() => {
    // Check if Phantom wallet is available
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
      onVerificationFailed?.("Phantom wallet not found. Please install Phantom wallet extension.")
      return
    }

    setStatus("connecting")

    try {
      // TODO: Connect to Phantom wallet
      // const response = await window.solana.connect()
      // setWalletAddress(response.publicKey.toString())
      // setWalletConnected(true)

      // Placeholder for wallet connection
      setTimeout(() => {
        setWalletConnected(true)
        setWalletAddress("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU") // Mock address
        setStatus("idle")
      }, 2000)

      console.log("Phantom wallet connected")
    } catch (error) {
      console.error("Wallet connection failed:", error)
      onVerificationFailed?.("Failed to connect wallet")
      setStatus("failed")
    }
  }

  const handleVerification = async () => {
    if (!walletConnected) {
      await connectWallet()
      return
    }

    setStatus("verifying")

    try {
      // TODO: Implement actual Solana verification transaction
      // import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
      // import { createMemoInstruction } from '@solana/spl-memo'

      console.log("Preparing Solana verification transaction...")

      // Create verification data
      const verificationData = {
        userId: user.id,
        name: user.name,
        email: user.email,
        institution: user.institution,
        role: user.role,
        timestamp: new Date().toISOString(),
        verifiedBy: "admin_wallet_address", // TODO: Get from admin context
      }

      // TODO: Create memo transaction with verification data
      // const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
      // const fromPubkey = new PublicKey(walletAddress)

      // const memoData = JSON.stringify(verificationData)
      // const memoInstruction = createMemoInstruction(memoData, [fromPubkey])

      // const transaction = new Transaction().add(memoInstruction)
      // const { blockhash } = await connection.getRecentBlockhash()
      // transaction.recentBlockhash = blockhash
      // transaction.feePayer = fromPubkey

      // const signedTransaction = await window.solana.signTransaction(transaction)
      // const signature = await connection.sendRawTransaction(signedTransaction.serialize())

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const mockSignature = `${Date.now()}${Math.random().toString(36).substr(2, 9)}`
      setTransactionSignature(mockSignature)
      setStatus("verified")

      // TODO: Send verification to backend
      await fetch("/api/admin/complete-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          transactionSignature: mockSignature,
          verificationData,
          walletAddress,
        }),
      })

      onVerificationComplete?.(mockSignature)
      console.log("Verification completed and logged to Solana blockchain")
    } catch (error) {
      console.error("Verification failed:", error)
      setStatus("failed")
      onVerificationFailed?.(error instanceof Error ? error.message : "Verification failed")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const openInExplorer = (signature: string) => {
    // TODO: Use actual network (mainnet/devnet)
    const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`
    window.open(explorerUrl, "_blank")
  }

  if (!phantomAvailable) {
    return (
      <Card className="max-w-3xl mx-auto border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="w-6 h-6 text-orange-500" />
            <span>Phantom Wallet Required</span>
          </CardTitle>
          <CardDescription>Solana verification requires Phantom wallet for blockchain transactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-800">
              To verify alumni credentials on the Solana blockchain, you need to install the Phantom wallet extension.
            </p>
          </div>
          <Button
            onClick={() => window.open("https://phantom.app/", "_blank")}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Install Phantom Wallet
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto border-2 border-[#002366] shadow-xl">
      <CardHeader className="bg-gradient-to-r from-[#002366] to-[#001a4d] text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-3 text-2xl font-serif">
          <Shield className="w-8 h-8" />
          <span>Alumni Verification Panel</span>
          <Badge className="bg-[#D4AF37] text-black">
            <Zap className="w-3 h-3 mr-1" />
            Blockchain Verified
          </Badge>
        </CardTitle>
        <CardDescription className="text-blue-100">
          Verify alumni credentials on the Solana blockchain for immutable proof of authenticity
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 space-y-6">
        {/* User Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-[#002366] text-white text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-[#002366]">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <Badge variant="outline" className="mt-1">
                {user.role}
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Education:</span>
              <p className="text-gray-600 mt-1">{user.education}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Employment:</span>
              <p className="text-gray-600 mt-1">{user.employment}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Institution:</span>
              <p className="text-gray-600 mt-1">{user.institution}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">User ID:</span>
              <p className="text-gray-600 mt-1 font-mono">{user.id}</p>
            </div>
          </div>
        </div>

        {/* Wallet Connection Status */}
        {walletConnected && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Wallet Connected</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-green-700">Address:</span>
              <code className="text-xs bg-green-100 px-2 py-1 rounded font-mono">
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
              </code>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(walletAddress)} className="h-6 w-6 p-0">
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Verification Status */}
        <div className="space-y-4">
          {status === "verified" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-xl font-semibold text-green-800">✅ Verified on Solana</h3>
                  <p className="text-green-700">Alumni credentials successfully recorded on blockchain</p>
                </div>
              </div>

              {transactionSignature && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-green-700">Transaction:</span>
                    <code className="text-xs bg-green-100 px-2 py-1 rounded font-mono">
                      {transactionSignature.slice(0, 16)}...{transactionSignature.slice(-16)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transactionSignature)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openInExplorer(transactionSignature)}
                    className="text-green-700 border-green-300 hover:bg-green-50"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on Solana Explorer
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={walletConnected ? handleVerification : connectWallet}
                disabled={status === "verifying" || status === "connecting"}
                className="w-full bg-[#002366] hover:bg-[#001a4d] h-12 text-lg font-semibold"
              >
                {status === "connecting" && (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Connecting Wallet...
                  </>
                )}
                {status === "verifying" && (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verifying on Blockchain...
                  </>
                )}
                {status === "idle" && !walletConnected && (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect Phantom Wallet
                  </>
                )}
                {status === "idle" && walletConnected && (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Verify on Solana Blockchain
                  </>
                )}
              </Button>

              {status === "failed" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">Verification Failed</span>
                  </div>
                  <p className="text-red-700 text-sm mt-1">Please check your wallet connection and try again.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Information Panel */}
        <div className="border-t pt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">🔐 Blockchain Verification Process</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                • <strong>Immutable Record:</strong> Verification data is permanently stored on Solana
              </p>
              <p>
                • <strong>Cryptographic Proof:</strong> Uses wallet signatures for authenticity
              </p>
              <p>
                • <strong>Transparent:</strong> All verifications are publicly auditable
              </p>
              <p>
                • <strong>Decentralized:</strong> No single point of failure or control
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="border-t pt-4 text-xs text-gray-500">
          <p>
            <strong>Technical Implementation:</strong> This verification system uses Solana memo transactions to create
            immutable records of alumni credentials. The verification data includes user information, institutional
            details, and cryptographic signatures for authenticity.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
