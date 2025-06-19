"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function RoleRedirectPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const role = searchParams.get("role")
  const institution = searchParams.get("institution")
  const isAdmin = searchParams.get("isAdmin") === "true"

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      if (isAdmin) {
        // Redirect admin roles to verification
        router.push(`/auth/admin-verification?role=${role}&institution=${encodeURIComponent(institution || "")}`)
      } else {
        // Redirect regular users to profile creation
        router.push(`/profile?role=${role}&institution=${encodeURIComponent(institution || "")}`)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [role, institution, isAdmin, router])

  const getRoleDisplayName = (roleValue: string | null) => {
    const roleMap: Record<string, string> = {
      high_school_student: "High School Student",
      tertiary_student: "University/College Student",
      recent_graduate: "Recent Graduate",
      alumni: "Alumni",
      hr_practitioner: "HR Practitioner",
      corporate_recruiter: "Corporate Recruiter",
      university_admin: "University Administrator",
      school_admin: "School Administrator",
      corporate_admin: "Corporate Alumni Administrator",
      faculty: "Faculty/Professor",
      career_counselor: "Career Counselor",
      entrepreneur: "Entrepreneur/Founder",
      professional: "Working Professional",
    }
    return roleMap[roleValue || ""] || roleValue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002366] to-[#001a4d] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#002366] mx-auto mb-4" />
          <h2 className="text-xl font-serif font-bold text-[#002366] mb-2">Setting up your account...</h2>
          <p className="text-gray-600 mb-4">
            Preparing your {getRoleDisplayName(role)} profile
            {institution && <span className="block text-sm mt-1">at {institution}</span>}
          </p>
          {isAdmin && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                As an administrator, you'll need to complete additional verification steps.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
