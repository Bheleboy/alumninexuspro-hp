"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Building2,
  GraduationCap,
  TrendingUp,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Award,
  Zap,
  Shield,
} from "lucide-react"
import Link from "next/link"

interface PendingVerification {
  id: string
  name: string
  email: string
  role: string
  graduationYear?: string
  degree?: string
  department?: string
  currentPosition?: string
  submittedAt: string
  priority: "standard" | "fasttrack"
  documents: string[]
}

interface AlumniMember {
  id: string
  name: string
  email: string
  graduationYear: string
  degree: string
  department: string
  currentCompany: string
  currentPosition: string
  verifiedAt: string
  connectionCount: number
  lastActive: string
}

export default function InstitutionalAdminDashboard() {
  const [adminInfo] = useState({
    name: "Dr. Sarah Mitchell",
    institution: "Stanford University",
    type: "university", // "university" or "company"
    role: "Alumni Relations Director",
    department: "Computer Science",
  })

  const [pendingVerifications, setPendingVerifications] = useState<PendingVerification[]>([
    {
      id: "1",
      name: "Alex Chen",
      email: "alex.chen@stanford.edu",
      role: "Alumni",
      graduationYear: "2020",
      degree: "MS Computer Science",
      department: "Computer Science",
      currentPosition: "Senior Software Engineer at Google",
      submittedAt: "2024-01-15T10:30:00Z",
      priority: "fasttrack",
      documents: ["diploma.pdf", "transcript.pdf"],
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@stanford.edu",
      role: "Alumni",
      graduationYear: "2019",
      degree: "PhD Computer Science",
      department: "Computer Science",
      currentPosition: "Research Scientist at Meta",
      submittedAt: "2024-01-14T15:45:00Z",
      priority: "standard",
      documents: ["diploma.pdf", "employment_verification.pdf"],
    },
    {
      id: "3",
      name: "David Kim",
      email: "david.kim@stanford.edu",
      role: "Student",
      graduationYear: "2025",
      degree: "BS Computer Science",
      department: "Computer Science",
      submittedAt: "2024-01-13T09:15:00Z",
      priority: "standard",
      documents: ["enrollment_verification.pdf"],
    },
  ])

  const [alumniNetwork, setAlumniNetwork] = useState<AlumniMember[]>([
    {
      id: "1",
      name: "Jennifer Wu",
      email: "jennifer.wu@stanford.edu",
      graduationYear: "2018",
      degree: "MS Computer Science",
      department: "Computer Science",
      currentCompany: "Apple",
      currentPosition: "Principal Engineer",
      verifiedAt: "2024-01-10T14:20:00Z",
      connectionCount: 45,
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Robert Johnson",
      email: "robert.johnson@stanford.edu",
      graduationYear: "2017",
      degree: "PhD Computer Science",
      department: "Computer Science",
      currentCompany: "OpenAI",
      currentPosition: "Research Lead",
      verifiedAt: "2024-01-08T11:30:00Z",
      connectionCount: 78,
      lastActive: "1 day ago",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterYear, setFilterYear] = useState("all")

  const handleApprove = async (id: string) => {
    console.log("Approving verification for user:", id)

    // TODO: Send approval to backend
    // await fetch('/api/admin/approve-verification', {
    //   method: 'POST',
    //   body: JSON.stringify({ verificationId: id, adminId: adminInfo.id })
    // })

    // TODO: Log verification to Solana blockchain
    // await logVerificationToBlockchain(id, adminInfo.institution)

    // TODO: Send SOL reward to admin
    // await sendSOLReward(adminInfo.walletAddress, 0.01) // Small reward for verification

    setPendingVerifications((prev) => prev.filter((v) => v.id !== id))

    // TODO: Send notification to user
    alert("User approved! Verification logged to blockchain and SOL reward sent to your wallet.")
  }

  const handleReject = async (id: string) => {
    console.log("Rejecting verification for user:", id)

    // TODO: Send rejection to backend with reason
    setPendingVerifications((prev) => prev.filter((v) => v.id !== id))
    alert("User verification rejected. Notification sent to user.")
  }

  const handleViewDocuments = (documents: string[]) => {
    console.log("Viewing documents:", documents)
    // TODO: Open document viewer modal
    alert("Document viewer would open here")
  }

  // Filter alumni network
  const filteredAlumni = alumniNetwork.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.currentCompany.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = filterDepartment === "all" || alumni.department === filterDepartment
    const matchesYear = filterYear === "all" || alumni.graduationYear === filterYear

    return matchesSearch && matchesDepartment && matchesYear
  })

  // Analytics data
  const analytics = {
    totalAlumni: alumniNetwork.length + 234, // Mock additional alumni
    pendingVerifications: pendingVerifications.length,
    thisMonthVerifications: 23,
    solEarned: 2.4,
    averageResponseTime: "4.2 hours",
    networkGrowth: "+12%",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#002366] rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-[#002366]">{adminInfo.institution}</h1>
                <p className="text-sm text-gray-600">{adminInfo.department} Admin Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {pendingVerifications.length}
                </span>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm font-medium">{adminInfo.name}</p>
                  <p className="text-xs text-gray-500">{adminInfo.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#002366]">{analytics.totalAlumni}</p>
                  <p className="text-sm text-gray-600">Total Alumni Network</p>
                  <p className="text-xs text-green-600">{analytics.networkGrowth} this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-xl font-bold">{analytics.pendingVerifications}</p>
                  <p className="text-xs text-gray-600">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xl font-bold">{analytics.thisMonthVerifications}</p>
                  <p className="text-xs text-gray-600">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <p className="text-xl font-bold text-[#D4AF37]">{analytics.solEarned}</p>
                  <p className="text-xs text-gray-600">SOL Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xl font-bold">{analytics.averageResponseTime}</p>
                  <p className="text-xs text-gray-600">Avg Response</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="verifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="verifications" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Pending Verifications</span>
              {pendingVerifications.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingVerifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Alumni Network</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Pending Verifications Tab */}
          <TabsContent value="verifications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-[#002366]">
                Verification Requests for {adminInfo.institution}
              </h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {pendingVerifications.map((verification) => (
                <Card key={verification.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-[#002366] text-white">
                            {verification.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-lg">{verification.name}</CardTitle>
                            {verification.priority === "fasttrack" && (
                              <Badge className="bg-[#D4AF37] text-black">
                                <Zap className="w-3 h-3 mr-1" />
                                Fast-Track
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="flex items-center space-x-4">
                            <span>{verification.email}</span>
                            <span>•</span>
                            <span>{verification.role}</span>
                            {verification.graduationYear && (
                              <>
                                <span>•</span>
                                <span>Class of {verification.graduationYear}</span>
                              </>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Submitted {new Date(verification.submittedAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(verification.submittedAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-[#002366]">Academic Information</h4>
                        <div className="space-y-1 text-sm">
                          {verification.degree && (
                            <p>
                              <strong>Degree:</strong> {verification.degree}
                            </p>
                          )}
                          {verification.department && (
                            <p>
                              <strong>Department:</strong> {verification.department}
                            </p>
                          )}
                          {verification.graduationYear && (
                            <p>
                              <strong>Year:</strong> {verification.graduationYear}
                            </p>
                          )}
                        </div>
                      </div>

                      {verification.currentPosition && (
                        <div>
                          <h4 className="font-semibold mb-2 text-[#002366]">Current Position</h4>
                          <p className="text-sm">{verification.currentPosition}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-[#002366]">Submitted Documents</h4>
                      <div className="flex flex-wrap gap-2">
                        {verification.documents.map((doc, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDocuments([doc])}
                            className="text-xs"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            {doc}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex space-x-2 pt-4">
                        <Link href={`/admin/verify/${verification.id}`}>
                          <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                            <Shield className="w-4 h-4 mr-2" />
                            Verify on Blockchain
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleApprove(verification.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Quick Approve
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

                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Applicant
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pendingVerifications.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
                    <p className="text-gray-600">No pending verifications for {adminInfo.institution} at the moment.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Alumni Network Tab */}
          <TabsContent value="network" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-[#002366]">{adminInfo.institution} Alumni Network</h2>
              <Button className="bg-[#002366] hover:bg-[#001a4d]">
                <Users className="w-4 h-4 mr-2" />
                Invite Alumni
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search alumni by name or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alumni Grid */}
            <div className="grid gap-4">
              {filteredAlumni.map((alumni) => (
                <Card key={alumni.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-[#002366] text-white">
                            {alumni.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{alumni.name}</h3>
                          <p className="text-gray-600">
                            {alumni.currentPosition} at {alumni.currentCompany}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>
                              {alumni.degree} • Class of {alumni.graduationYear}
                            </span>
                            <span>•</span>
                            <span>{alumni.connectionCount} connections</span>
                            <span>•</span>
                            <span>Active {alumni.lastActive}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#002366]">
              {adminInfo.institution} Analytics Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Verification Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    {/* TODO: Integrate with charting library */}
                    <p>Verification trends chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Alumni Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Computer Science</span>
                      <span className="font-semibold">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Engineering</span>
                      <span className="font-semibold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Business</span>
                      <span className="font-semibold">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other</span>
                      <span className="font-semibold">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Top Employers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Google</span>
                      <Badge variant="secondary">23 alumni</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Apple</span>
                      <Badge variant="secondary">18 alumni</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Meta</span>
                      <Badge variant="secondary">15 alumni</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Microsoft</span>
                      <Badge variant="secondary">12 alumni</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Your Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Verifications This Month</span>
                      <span className="font-semibold text-[#002366]">{analytics.thisMonthVerifications}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Response Time</span>
                      <span className="font-semibold text-green-600">{analytics.averageResponseTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SOL Rewards Earned</span>
                      <span className="font-semibold text-[#D4AF37]">{analytics.solEarned} SOL</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Network Growth</span>
                      <span className="font-semibold text-blue-600">{analytics.networkGrowth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
