"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Chrome, Linkedin, ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [selectedRole, setSelectedRole] = useState("")
  const [institutionName, setInstitutionName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [showInstitutionField, setShowInstitutionField] = useState(false)

  const roleOptions = [
    { value: "high_school_student", label: "High School Student", requiresInstitution: true },
    { value: "tertiary_student", label: "University/College Student", requiresInstitution: true },
    { value: "recent_graduate", label: "Recent Graduate (0-2 years)", requiresInstitution: true },
    { value: "alumni", label: "Alumni (2+ years)", requiresInstitution: true },
    { value: "hr_practitioner", label: "HR Practitioner", requiresInstitution: true, isCompany: true },
    { value: "corporate_recruiter", label: "Corporate Recruiter", requiresInstitution: true, isCompany: true },
    { value: "university_admin", label: "University/College Admin", requiresInstitution: true, isAdmin: true },
    { value: "school_admin", label: "High School Admin", requiresInstitution: true, isAdmin: true },
    {
      value: "corporate_admin",
      label: "Corporate Alumni Admin",
      requiresInstitution: true,
      isAdmin: true,
      isCompany: true,
    },
    { value: "faculty", label: "Faculty/Professor", requiresInstitution: true },
    { value: "career_counselor", label: "Career Counselor", requiresInstitution: true },
    { value: "entrepreneur", label: "Entrepreneur/Founder", requiresInstitution: false },
    { value: "professional", label: "Working Professional", requiresInstitution: false },
  ]

import { signInWithGoogle } from "@/lib/firebase";

const handleGoogleAuth = () => {
  signInWithGoogle();
};


    const roleData = roleOptions.find((r) => r.value === selectedRole)
    const institutionValue = roleData?.isCompany ? companyName : institutionName

    if (roleData?.requiresInstitution && !institutionValue) {
      alert(`Please enter your ${roleData.isCompany ? "company" : "institution"} name`)
      return
    }

    console.log("Google OAuth with role:", {
      role: selectedRole,
      institution: institutionValue,
      isAdmin: roleData?.isAdmin || false,
    })
    // TODO: Pass role data to OAuth flow
    alert("Google OAuth integration with role data - would redirect to appropriate dashboard")
  }

  // Placeholder function for LinkedIn OAuth
  const handleLinkedInAuth = () => {
    console.log("LinkedIn OAuth integration would go here")
    // TODO: Integrate with LinkedIn OAuth API
    alert("LinkedIn OAuth integration placeholder - would redirect to profile creation")
  }

  // Placeholder function for email/password auth
  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedRole) {
      alert("Please select your role")
      return
    }

    const roleData = roleOptions.find((r) => r.value === selectedRole)
    const institutionValue = roleData?.isCompany ? companyName : institutionName

    if (roleData?.requiresInstitution && !institutionValue) {
      alert(`Please enter your ${roleData.isCompany ? "company" : "institution"} name`)
      return
    }

    console.log("Email auth:", {
      email,
      password,
      isSignUp,
      role: selectedRole,
      institution: institutionValue,
      isAdmin: roleData?.isAdmin || false,
      isCompany: roleData?.isCompany || false,
    })

    // TODO: Integrate with Firebase Auth and save role data
    // Redirect based on role
    if (roleData?.isAdmin) {
      alert("Admin account created! Redirecting to admin verification...")
      // Redirect to admin verification process
    } else {
      alert("Account created! Redirecting to profile creation...")
      // Redirect to regular profile creation
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002366] to-[#001a4d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-white mb-8 hover:text-[#D4AF37]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#002366] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AN</span>
              </div>
              <span className="text-2xl font-serif font-bold text-[#002366]">Alumni Nexus Pro</span>
            </div>
            <CardTitle className="text-2xl font-serif">{isSignUp ? "Join the Network" : "Welcome Back"}</CardTitle>
            <CardDescription>
              {isSignUp ? "Create your verified alumni profile" : "Sign in to your verified network"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-12 border-2" onClick={handleGoogleAuth}>
                <Chrome className="w-5 h-5 mr-3" />
                Continue with Google
              </Button>

              <Button variant="outline" className="w-full h-12 border-2" onClick={handleLinkedInAuth}>
                <Linkedin className="w-5 h-5 mr-3" />
                Continue with LinkedIn
              </Button>
            </div>

            {/* Role Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select
                  value={selectedRole}
                  onValueChange={(value) => {
                    setSelectedRole(value)
                    const role = roleOptions.find((r) => r.value === value)
                    setShowInstitutionField(role?.requiresInstitution || false)
                    setInstitutionName("")
                    setCompanyName("")
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {showInstitutionField && (
                <div className="space-y-2">
                  <Label htmlFor="institution">
                    {roleOptions.find((r) => r.value === selectedRole)?.isCompany ? "Company Name" : "Institution Name"}
                  </Label>
                  <Input
                    id="institution"
                    value={roleOptions.find((r) => r.value === selectedRole)?.isCompany ? companyName : institutionName}
                    onChange={(e) => {
                      if (roleOptions.find((r) => r.value === selectedRole)?.isCompany) {
                        setCompanyName(e.target.value)
                      } else {
                        setInstitutionName(e.target.value)
                      }
                    }}
                    placeholder={
                      roleOptions.find((r) => r.value === selectedRole)?.isCompany
                        ? "e.g., Google, Microsoft, Apple"
                        : "e.g., Stanford University, MIT, Harvard"
                    }
                    required
                  />
                </div>
              )}
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">or</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full h-12 bg-[#002366] hover:bg-[#001a4d]">
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#002366] hover:text-[#001a4d] font-medium"
              >
                {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
              </button>
            </div>

            {!isSignUp && (
              <div className="text-center">
                <Link href="#" className="text-sm text-gray-500 hover:text-[#002366]">
                  Forgot your password?
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-white text-sm">
          By continuing, you agree to our{" "}
          <Link href="#" className="underline hover:text-[#D4AF37]">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-[#D4AF37]">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
