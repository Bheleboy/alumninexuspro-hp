"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Download, Eye } from "lucide-react"
import SolanaVerificationPanel from "@/components/solana-verification-panel"

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
  documents: string[]
  additionalInfo?: string
}

export default function VerifyUserPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch user data from API
    // const fetchUser = async () => {
    //   const response = await fetch(`/api/admin/users/${userId}`)
    //   const userData = await response.json()
    //   setUser(userData)
    //   setLoading(false)
    // }
    // fetchUser()

    // Mock user data for demonstration
    setTimeout(() => {
      setUser({
        id: userId,
        name: "Jane Doe",
        email: "jane.doe@harvard.edu",
        role: "Corporate Alumni",
        education: "Harvard Business School – MBA (2016)",
        employment: "Google – Product Lead (2017–2025)",
        institution: "Harvard Business School",
        verificationStatus: "pending",
        submittedAt: "2024-01-15T10:30:00Z",
        documents: ["diploma.pdf", "transcript.pdf", "employment_verification.pdf"],
        additionalInfo:
          "Currently leading product initiatives for Google Cloud Platform. Previously worked at McKinsey & Company as a management consultant.",
      })
      setLoading(false)
    }, 1000)
  }, [userId])

  const handleVerificationComplete = async (txSignature: string) => {
    console.log("Verification completed with signature:", txSignature)

    // TODO: Update user status in database
    // await fetch(`/api/admin/users/${userId}/verify`, {
    //   method: 'POST',
    //   body: JSON.stringify({ transactionSignature: txSignature })
    // })

    // Update local state
    if (user) {
      setUser({ ...user, verificationStatus: "verified" })
    }

    // TODO: Send SOL reward to admin wallet
    // TODO: Send notification to user

    setTimeout(() => {
      router.push("/admin/institutional")
    }, 3000)
  }

  const handleVerificationFailed = (error: string) => {
    console.error("Verification failed:", error)
    // TODO: Log error and show user-friendly message
  }

  const viewDocument = (document: string) => {
    console.log("Viewing document:", document)
    // TODO: Open document viewer modal or new tab
    alert(`Document viewer would open: ${document}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002366] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user verification data...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
            <p className="text-gray-600 mb-4">The requested user verification could not be found.</p>
            <Link href="/admin/institutional">
              <Button>Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/institutional"
            className="inline-flex items-center text-[#002366] hover:text-[#001a4d] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#002366]">Alumni Verification</h1>
              <p className="text-gray-600">Review and verify alumni credentials on the blockchain</p>
            </div>
            <Badge
              variant={user.verificationStatus === "verified" ? "default" : "secondary"}
              className={user.verificationStatus === "verified" ? "bg-green-600" : "bg-orange-500"}
            >
              {user.verificationStatus.charAt(0).toUpperCase() + user.verificationStatus.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Supporting Documents */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Supporting Documents</span>
                </CardTitle>
                <CardDescription>Review submitted verification documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{doc}</span>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => viewDocument(doc)} className="h-8 w-8 p-0">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log("Download:", doc)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {user.additionalInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{user.additionalInfo}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Verification Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Application Submitted</p>
                    <p className="text-xs text-gray-500">{new Date(user.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Under Review</p>
                    <p className="text-xs text-gray-500">In progress</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${user.verificationStatus === "verified" ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                  <div>
                    <p className="text-sm font-medium">Blockchain Verification</p>
                    <p className="text-xs text-gray-500">
                      {user.verificationStatus === "verified" ? "Completed" : "Pending"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Verification Panel */}
          <div className="lg:col-span-2">
            <SolanaVerificationPanel
              user={user}
              onVerificationComplete={handleVerificationComplete}
              onVerificationFailed={handleVerificationFailed}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
