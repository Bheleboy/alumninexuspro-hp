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
  Briefcase,
  TrendingUp,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Award,
  Zap,
  UserPlus,
  GraduationCap,
  Shield,
} from "lucide-react"
import Link from "next/link"

interface PendingVerification {
  id: string
  name: string
  email: string
  role: string
  department?: string
  position?: string
  startDate?: string
  endDate?: string
  submittedAt: string
  priority: "standard" | "fasttrack"
  documents: string[]
}

interface EmployeeAlumni {
  id: string
  name: string
  email: string
  department: string
  position: string
  startDate: string
  endDate?: string
  university: string
  degree: string
  graduationYear: string
  verifiedAt: string
  connectionCount: number
  lastActive: string
  status: "current" | "former"
}

export default function CorporateAdminDashboard() {
  const [adminInfo] = useState({
    name: "Michael Thompson",
    company: "Google",
    type: "company",
    role: "HR Director",
    department: "People Operations",
  })

  const [pendingVerifications, setPendingVerifications] = useState<PendingVerification[]>([
    {
      id: "1",
      name: "Lisa Park",
      email: "lisa.park@google.com",
      role: "Current Employee",
      department: "Engineering",
      position: "Senior Software Engineer",
      startDate: "2022-03-15",
      submittedAt: "2024-01-15T10:30:00Z",
      priority: "fasttrack",
      documents: ["employment_verification.pdf", "id_document.pdf"],
    },
    {
      id: "2",
      name: "James Wilson",
      email: "james.wilson@gmail.com",
      role: "Former Employee",
      department: "Product Management",
      position: "Product Manager",
      startDate: "2019-06-01",
      endDate: "2023-12-31",
      submittedAt: "2024-01-14T15:45:00Z",
      priority: "standard",
      documents: ["employment_verification.pdf", "reference_letter.pdf"],
    },
  ])

  const [employeeAlumni, setEmployeeAlumni] = useState<EmployeeAlumni[]>([
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@google.com",
      department: "Engineering",
      position: "Staff Software Engineer",
      startDate: "2020-01-15",
      university: "Stanford University",
      degree: "MS Computer Science",
      graduationYear: "2019",
      verifiedAt: "2024-01-10T14:20:00Z",
      connectionCount: 67,
      lastActive: "1 hour ago",
      status: "current",
    },
    {
      id: "2",
      name: "David Rodriguez",
      email: "david.rodriguez@gmail.com",
      department: "Product",
      position: "Senior Product Manager",
      startDate: "2018-03-01",
      endDate: "2023-08-15",
      university: "MIT",
      degree: "MBA",
      graduationYear: "2017",
      verifiedAt: "2024-01-08T11:30:00Z",
      connectionCount: 89,
      lastActive: "2 days ago",
      status: "former",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const handleApprove = async (id: string) => {
    console.log("Approving verification for employee:", id)

    // TODO: Send approval to backend
    // TODO: Log verification to Solana blockchain
    // TODO: Send SOL reward to admin

    setPendingVerifications((prev) => prev.filter((v) => v.id !== id))
    alert("Employee verified! Verification logged to blockchain and SOL reward sent.")
  }

  const handleReject = async (id: string) => {
    console.log("Rejecting verification for employee:", id)
    setPendingVerifications((prev) => prev.filter((v) => v.id !== id))
    alert("Employee verification rejected.")
  }

  // Filter employee alumni
  const filteredEmployees = employeeAlumni.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.university.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Analytics data
  const analytics = {
    totalEmployees: employeeAlumni.length + 156,
    currentEmployees: employeeAlumni.filter((e) => e.status === "current").length + 98,
    formerEmployees: employeeAlumni.filter((e) => e.status === "former").length + 58,
    pendingVerifications: pendingVerifications.length,
    thisMonthVerifications: 18,
    solEarned: 1.8,
    averageResponseTime: "3.1 hours",
    networkGrowth: "+8%",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#002366] rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-[#002366]">{adminInfo.company}</h1>
                <p className="text-sm text-gray-600">Corporate Alumni Admin Portal</p>
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
                  <AvatarFallback>MT</AvatarFallback>
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
                  <p className="text-2xl font-bold text-[#002366]">{analytics.totalEmployees}</p>
                  <p className="text-sm text-gray-600">Total Employee Alumni</p>
                  <p className="text-xs text-green-600">{analytics.networkGrowth} this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xl font-bold">{analytics.currentEmployees}</p>
                  <p className="text-xs text-gray-600">Current</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xl font-bold">{analytics.formerEmployees}</p>
                  <p className="text-xs text-gray-600">Alumni</p>
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
                <Zap className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <p className="text-xl font-bold text-[#D4AF37]">{analytics.solEarned}</p>
                  <p className="text-xs text-gray-600">SOL Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="verifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="verifications" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Employment Verifications</span>
              {pendingVerifications.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingVerifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Employee Alumni</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Employment Verifications Tab */}
          <TabsContent value="verifications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-[#002366]">Employment Verification Requests</h2>
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
                            <Badge variant={verification.role === "Current Employee" ? "default" : "secondary"}>
                              {verification.role}
                            </Badge>
                          </div>
                          <CardDescription>{verification.email}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Submitted {new Date(verification.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-[#002366]">Employment Details</h4>
                        <div className="space-y-1 text-sm">
                          {verification.department && (
                            <p>
                              <strong>Department:</strong> {verification.department}
                            </p>
                          )}
                          {verification.position && (
                            <p>
                              <strong>Position:</strong> {verification.position}
                            </p>
                          )}
                          {verification.startDate && (
                            <p>
                              <strong>Start Date:</strong> {new Date(verification.startDate).toLocaleDateString()}
                            </p>
                          )}
                          {verification.endDate && (
                            <p>
                              <strong>End Date:</strong> {new Date(verification.endDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-[#002366]">Submitted Documents</h4>
                      <div className="flex flex-wrap gap-2">
                        {verification.documents.map((doc, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => console.log("View document:", doc)}
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
                    <p className="text-gray-600">No pending employment verifications at the moment.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Employee Alumni Tab */}
          <TabsContent value="employees" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-[#002366]">
                {adminInfo.company} Employee Alumni Network
              </h2>
              <Button className="bg-[#002366] hover:bg-[#001a4d]">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Employees
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name or university..."
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
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="former">Alumni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Employee Grid */}
            <div className="grid gap-4">
              {filteredEmployees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-[#002366] text-white">
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{employee.name}</h3>
                          <p className="text-gray-600">
                            {employee.position} • {employee.department}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>
                              {employee.university} • {employee.degree}
                            </span>
                            <span>•</span>
                            <span>Class of {employee.graduationYear}</span>
                            <span>•</span>
                            <span>{employee.connectionCount} connections</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant={employee.status === "current" ? "default" : "secondary"}>
                          {employee.status === "current" ? "Current Employee" : "Alumni"}
                        </Badge>
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
            <h2 className="text-2xl font-serif font-bold text-[#002366]">{adminInfo.company} Analytics Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Employee Verification Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <p>Verification trends chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Department Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Engineering</span>
                      <span className="font-semibold">52%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Product</span>
                      <span className="font-semibold">23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sales</span>
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
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Top Universities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Stanford University</span>
                      <Badge variant="secondary">34 employees</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">MIT</span>
                      <Badge variant="secondary">28 employees</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">UC Berkeley</span>
                      <Badge variant="secondary">22 employees</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Carnegie Mellon</span>
                      <Badge variant="secondary">19 employees</Badge>
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
