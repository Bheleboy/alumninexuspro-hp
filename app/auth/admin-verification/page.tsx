"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Shield, Clock, CheckCircle } from "lucide-react"

export default function AdminVerificationPage() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || ""
  const institution = searchParams.get("institution") || ""

  const [verificationData, setVerificationData] = useState({
    officialEmail: "",
    position: "",
    department: "",
    employeeId: "",
    phoneNumber: "",
    linkedinProfile: "",
    additionalInfo: "",
    documents: [] as File[],
  })

  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "submitted">("idle")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setVerificationData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...newFiles],
      }))
    }
  }

  const removeFile = (index: number) => {
    setVerificationData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionStatus("submitting")

    // TODO: Submit admin verification request
    console.log("Admin verification submission:", {
      role,
      institution,
      ...verificationData,
    })

    // Simulate API call
    setTimeout(() => {
      setSubmissionStatus("submitted")
    }, 2000)
  }

  const getRoleDisplayName = (roleValue: string) => {
    const roleMap: Record<string, string> = {
      university_admin: "University Administrator",
      school_admin: "School Administrator",
      corporate_admin: "Corporate Alumni Administrator",
    }
    return roleMap[roleValue] || roleValue
  }

  const getRequiredDocuments = (roleValue: string) => {
    const docMap: Record<string, string[]> = {
      university_admin: [
        "Official university email verification",
        "Employee ID or staff directory listing",
        "Department authorization letter",
        "LinkedIn profile or professional references",
      ],
      school_admin: [
        "Official school email verification",
        "Employee ID or staff directory listing",
        "Administrative role confirmation",
        "Professional references",
      ],
      corporate_admin: [
        "Official company email verification",
        "Employee ID or HR directory listing",
        "HR department authorization",
        "LinkedIn profile showing current role",
      ],
    }
    return docMap[roleValue] || []
  }

  if (submissionStatus === "submitted") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#002366] to-[#001a4d] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-serif text-[#002366]">Verification Submitted!</CardTitle>
            <CardDescription>Your admin verification request has been received</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Our team will review your credentials within 24-48 hours</li>
                <li>• We'll verify your role with your institution</li>
                <li>• You'll receive email updates on your verification status</li>
                <li>• Once approved, you'll get access to the admin dashboard</li>
              </ul>
            </div>
            <Link href="/dashboard">
              <Button className="w-full bg-[#002366] hover:bg-[#001a4d]">Continue to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/auth" className="inline-flex items-center text-[#002366] mb-6 hover:text-[#001a4d]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign Up
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[#002366] rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif">Admin Verification Required</CardTitle>
                <CardDescription>Verify your administrative role to access admin features</CardDescription>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-[#002366]">{getRoleDisplayName(role)}</Badge>
                <span className="text-sm text-gray-600">at {institution}</span>
              </div>
              <p className="text-sm text-gray-600">
                As an administrator, you'll have access to verify alumni, manage your institution's network, and earn
                SOL rewards for maintaining network integrity.
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Official Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#002366]">Official Contact Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="officialEmail">Official Email Address *</Label>
                    <Input
                      id="officialEmail"
                      type="email"
                      value={verificationData.officialEmail}
                      onChange={(e) => setVerificationData((prev) => ({ ...prev, officialEmail: e.target.value }))}
                      placeholder="your.name@institution.edu"
                      required
                    />
                    <p className="text-xs text-gray-500">Must be your official institutional email</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={verificationData.phoneNumber}
                      onChange={(e) => setVerificationData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Your Position/Title *</Label>
                    <Input
                      id="position"
                      value={verificationData.position}
                      onChange={(e) => setVerificationData((prev) => ({ ...prev, position: e.target.value }))}
                      placeholder="e.g., Alumni Relations Director"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      value={verificationData.department}
                      onChange={(e) => setVerificationData((prev) => ({ ...prev, department: e.target.value }))}
                      placeholder="e.g., Student Affairs, HR"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID (if applicable)</Label>
                    <Input
                      id="employeeId"
                      value={verificationData.employeeId}
                      onChange={(e) => setVerificationData((prev) => ({ ...prev, employeeId: e.target.value }))}
                      placeholder="Employee ID or staff number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                    <Input
                      id="linkedinProfile"
                      value={verificationData.linkedinProfile}
                      onChange={(e) => setVerificationData((prev) => ({ ...prev, linkedinProfile: e.target.value }))}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
              </div>

              {/* Required Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#002366]">Required Documentation</h3>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Please provide the following:</h4>
                  <ul className="text-sm space-y-1">
                    {getRequiredDocuments(role).map((doc, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documents">Upload Documents *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to select</p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Select Files
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)
                    </p>
                  </div>

                  {verificationData.documents.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Uploaded Files:</p>
                      {verificationData.documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#002366]">Additional Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Context (Optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    value={verificationData.additionalInfo}
                    onChange={(e) => setVerificationData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                    placeholder="Any additional information that would help verify your administrative role..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Verification Timeline */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Verification Timeline</h4>
                </div>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>
                    • <strong>Standard Review:</strong> 24-48 hours (Free)
                  </p>
                  <p>
                    • <strong>Priority Review:</strong> 2-6 hours ($20 via SOL or PayFast)
                  </p>
                  <p>• You'll receive email updates throughout the process</p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={submissionStatus === "submitting" || verificationData.documents.length === 0}
                className="w-full bg-[#002366] hover:bg-[#001a4d] h-12"
              >
                {submissionStatus === "submitting" ? "Submitting..." : "Submit for Verification"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
