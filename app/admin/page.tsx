"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Zap,
  Shield,
  UserCheck,
  Building,
} from "lucide-react"

interface PendingVerification {
  id: string
  name: string
  email: string
  role: string
  userType: "individual" | "bulk_school" | "bulk_corporate"
  education: Array<{ school: string; degree: string; field: string; years: string }>
  workExperience: Array<{ company: string; title: string; years: string }>
  submittedAt: string
  requiresBackgroundCheck: boolean
}

export default function AdminDashboard() {
  const [pendingVerifications, setPendingVerifications] = useState<PendingVerification[]>([
    {
      id: "1",
      name: "Ntando Mbhele",
      email: "ntando.mbhele@uct.ac.za",
      role: "Alumni",
      userType: "individual",
      education: [{ school: "University of Cape Town", degree: "MS", field: "Computer Science", years: "2018-2020" }],
      workExperience: [{ company: "Standard Bank", title: "Software Engineer", years: "2020-Present" }],
      submittedAt: "2024-01-15T10:30:00Z",
      requiresBackgroundCheck: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "m.chen@mit.edu",
      role: "University Student",
      userType: "individual",
      education: [{ school: "MIT", degree: "BS", field: "Electrical Engineering", years: "2021-2025" }],
      workExperience: [{ company: "Tesla", title: "Intern", years: "2023-2023" }],
      submittedAt: "2024-01-14T15:45:00Z",
      requiresBackgroundCheck: false,
    },
    {
      id: "3",
      name: "Sarah Williams",
      email: "sarah.williams@standardbank.co.za",
      role: "Corporate Alumni",
      userType: "bulk_corporate",
      education: [{ school: "Wits University", degree: "MBA", field: "Business Administration", years: "2015-2017" }],
      workExperience: [{ company: "Standard Bank", title: "Senior Manager", years: "2017-Present" }],
      submittedAt: "2024-01-13T09:15:00Z",
      requiresBackgroundCheck: true,
    },
  ])

  const handleApprove = (id: string) => {
    const user = pendingVerifications.find((v) => v.id === id)
    console.log("Approving verification for user:", id)

    // TODO: Integrate with Solana blockchain for verification logging
    // import { Connection, PublicKey, Transaction } from '@solana/web3.js'
    // const connection = new Connection('https://api.devnet.solana.com')
    // Log verification to blockchain with user metadata

    // TODO: Reward verifier with SOL tokens
    // Send SOL reward to admin wallet for completing verification

    setPendingVerifications((prev) => prev.filter((v) => v.id !== id))

    if (user?.requiresBackgroundCheck) {
      alert("User approved with background check verification logged to blockchain! Verifier reward sent.")
    } else {
      alert("User approved and verification logged to blockchain! Verifier reward sent.")
    }
  }

  const handleReject = (id: string) => {
    console.log("Rejecting verification for user:", id)
    setPendingVerifications((prev) => prev.filter((v) => v.id !== id))
    alert("User verification rejected.")
  }

  // Mock analytics data
  const analytics = {
    totalUsers: 1247,
    pendingVerifications: pendingVerifications.length,
    monthlyRevenue: 12450,
    flaggedMessages: 3,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#002366] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AN</span>
              </div>
              <span className="text-xl font-serif font-bold text-[#002366]">Admin Dashboard</span>
            </div>
            <Badge variant="secondary" className="bg-[#D4AF37] text-black">
              Super Admin
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="verifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="verifications">Verifications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Verifications Tab */}
          <TabsContent value="verifications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{pendingVerifications.length}</p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-gray-600">Approved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">89</p>
                      <p className="text-sm text-gray-600">Background Checks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-2xl font-bold">$340</p>
                      <p className="text-sm text-gray-600">SOL Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-[#002366]">Pending Verifications</h2>

              {pendingVerifications.map((verification) => (
                <Card key={verification.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {verification.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{verification.name}</CardTitle>
                          <CardDescription>{verification.email}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{verification.role}</Badge>
                        {verification.userType === "bulk_school" && (
                          <Badge className="bg-green-100 text-green-800">
                            <UserCheck className="w-3 h-3 mr-1" />
                            School Bulk
                          </Badge>
                        )}
                        {verification.userType === "bulk_corporate" && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Building className="w-3 h-3 mr-1" />
                            Corporate Bulk
                          </Badge>
                        )}
                        {verification.requiresBackgroundCheck && (
                          <Badge className="bg-red-100 text-red-800">
                            <Shield className="w-3 h-3 mr-1" />
                            Background Check Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Education</h4>
                      {verification.education.map((edu, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {edu.degree} in {edu.field} - {edu.school} ({edu.years})
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Work Experience</h4>
                      {verification.workExperience.map((work, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {work.title} at {work.company} ({work.years})
                        </div>
                      ))}
                    </div>

                    {verification.requiresBackgroundCheck && (
                      <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">Background Verification Required</h4>
                        <div className="space-y-1 text-sm text-red-700">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Criminal background check completed</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Predator verification passed</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {!verification.requiresBackgroundCheck && verification.role.includes("Student") && (
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Student Protection Active</h4>
                        <p className="text-sm text-green-700">
                          Students are exempt from background checks. All alumni who can contact this student have been
                          verified.
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-2 pt-4">
                      <Button
                        onClick={() => handleApprove(verification.id)}
                        className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {verification.requiresBackgroundCheck
                          ? "Approve with Background Check"
                          : "Approve & Earn SOL Reward"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleReject(verification.id)}
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pendingVerifications.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                    <p className="text-gray-600">No pending verifications at the moment.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{analytics.totalUsers}</p>
                      <p className="text-sm text-gray-600">Total Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{analytics.pendingVerifications}</p>
                      <p className="text-sm text-gray-600">Pending Verifications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">${analytics.monthlyRevenue}</p>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-2xl font-bold text-[#D4AF37]">2.4 SOL</p>
                      <p className="text-sm text-gray-600">Earned ($340)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    User Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    {/* TODO: Integrate with charting library like Chart.js or Recharts */}
                    <p>User growth chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Ntando Mbhele verified with background check</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Corporate bulk upload: 25 users</span>
                      <span className="text-xs text-gray-500">4 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">School bulk upload: 150 students</span>
                      <span className="text-xs text-gray-500">6 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Messages</CardTitle>
                <CardDescription>Messages that require admin review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold">John Doe → Sarah Smith</span>
                        <Badge variant="destructive" className="ml-2">
                          Flagged
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      "Hey, I saw your profile and was wondering if you'd be interested in..."
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Remove
                      </Button>
                      <Button size="sm" variant="ghost">
                        View Full Conversation
                      </Button>
                    </div>
                  </div>

                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No other flagged messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
