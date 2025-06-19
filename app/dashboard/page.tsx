"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  Users,
  CheckCircle,
  Settings,
  Shield,
  Bell,
  TrendingUp,
  Briefcase,
  Eye,
  ExternalLink,
  Zap,
} from "lucide-react"

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock user data with enhanced tracking
  const user = {
    name: "Ntando Mbhele",
    email: "ntando.mbhele@uct.ac.za",
    role: "Alumni",
    verified: true,
    school: "University of Cape Town",
    company: "Standard Bank",
    messagesUsed: 2,
    messagesLimit: 3,
    isPremium: false,
    profileViews: 47,
    profileCompleteness: 85,
    joinedDate: "2024-01-15",
    lastActive: "2 hours ago",
    solanaAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  }

  // Mock connections data
  const connections = [
    {
      id: "1",
      name: "Michael Chen",
      role: "Student",
      school: "MIT",
      company: "Tesla Intern",
      verified: true,
      lastMessage: "Thanks for the advice!",
      lastMessageTime: "2 hours ago",
    },
    {
      id: "2",
      name: "Emily Rodriguez",
      role: "Alumni",
      school: "Stanford University",
      company: "Apple",
      verified: true,
      lastMessage: "Would love to connect!",
      lastMessageTime: "1 day ago",
    },
  ]

  // Mock opportunities data
  const opportunities = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Meta",
      location: "Menlo Park, CA",
      type: "Full-time",
      postedBy: "Alumni Network",
      isSponsored: true,
    },
    {
      id: "2",
      title: "Product Manager Internship",
      company: "Stripe",
      location: "San Francisco, CA",
      type: "Internship",
      postedBy: "Career Services",
      isSponsored: false,
    },
    {
      id: "3",
      title: "Annual Fundraiser Gala",
      company: "St Henry's Marist College",
      location: "Durban, KZN",
      type: "Fundraiser",
      postedBy: "Alumni Association",
      isSponsored: false,
    },
  ]

  // Mock recent activity
  const recentActivity = [
    { type: "profile_view", user: "John Doe (Google)", time: "2 hours ago" },
    { type: "connection_request", user: "Lisa Wang (Microsoft)", time: "5 hours ago" },
    { type: "message", user: "Michael Chen", time: "1 day ago" },
    { type: "profile_view", user: "Sarah Kim (Apple)", time: "2 days ago" },
  ]

  // Mock profile viewers
  const recentViewers = [
    { name: "Elon Musk", company: "X", role: "CEO", time: "1h" },
    { name: "Ayanda Bolani", company: "Knife Capital", role: "Investment Associate", time: "3h" },
    { name: "David Park", company: "Apple", role: "Senior Engineer", time: "1d" },
    { name: "Sarah Kim", company: "Tesla", role: "Data Scientist", time: "2d" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#002366] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AN</span>
                </div>
                <span className="text-xl font-serif font-bold text-[#002366]">Alumni Nexus Pro</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-[#002366] text-white">NM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#002366] mb-2">Welcome back, {user.name}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified {user.role}
                </Badge>
                <span className="text-gray-600">{user.school}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">{user.company}</span>
                <Badge variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                  <Eye className="w-3 h-3 mr-1" />
                  {user.profileViews} views
                </Badge>
              </div>
            </div>

            {/* Upgrade Card */}
            {!user.isPremium && (
              <Card className="border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-4 h-4 text-[#D4AF37] mr-1" />
                      <span className="font-semibold text-sm">
                        Messages: {user.messagesUsed}/{user.messagesLimit}
                      </span>
                    </div>
                    <Link href="/subscription">
                      <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                        Upgrade to Premium
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Profile Completeness */}
          <Card className="mt-6 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#002366]">Profile Completeness</span>
                <span className="text-sm text-gray-600">{user.profileCompleteness}%</span>
              </div>
              <Progress value={user.profileCompleteness} className="h-2 mb-2" />
              <p className="text-sm text-gray-600">
                Complete your profile to increase visibility and get more connection requests
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{connections.length}</p>
                  <p className="text-sm text-gray-600">Connections</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{user.profileViews}</p>
                  <p className="text-sm text-gray-600">Profile Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{user.messagesUsed}</p>
                  <p className="text-sm text-gray-600">Messages Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-gray-600">Verified Network</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Opportunities For You */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Opportunities For You
                </CardTitle>
                <CardDescription>Curated opportunities from your network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {opportunities.map((opp) => (
                  <div key={opp.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-[#002366]">{opp.title}</h3>
                        <p className="text-gray-600">
                          {opp.company} • {opp.location}
                        </p>
                      </div>
                      {opp.isSponsored && (
                        <Badge variant="secondary" className="bg-[#D4AF37] text-black text-xs">
                          Sponsored
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{opp.type}</span>
                        <span>•</span>
                        <span>Posted by {opp.postedBy}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Opportunities
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 py-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "profile_view"
                            ? "bg-green-500"
                            : activity.type === "connection_request"
                              ? "bg-blue-500"
                              : activity.type === "message"
                                ? "bg-purple-500"
                                : "bg-gray-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <span className="text-sm">
                          {activity.type === "profile_view" && `${activity.user} viewed your profile`}
                          {activity.type === "connection_request" && `${activity.user} sent you a connection request`}
                          {activity.type === "message" && `New message from ${activity.user}`}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Viewers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Recently Viewed By
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentViewers.map((viewer, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {viewer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{viewer.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {viewer.role} at {viewer.company}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">{viewer.time}</span>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Viewers
                </Button>
              </CardContent>
            </Card>

            {/* Sponsored Content */}
            <Card className="border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Featured Opportunity</CardTitle>
                  <Badge variant="secondary" className="bg-[#D4AF37] text-black text-xs">
                    Sponsored
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-[#002366]">Senior Product Manager</h3>
                    <p className="text-sm text-gray-600">Airbnb • San Francisco, CA</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    Join our team building the future of travel. Looking for Stanford alumni with 5+ years experience.
                  </p>
                  <Button size="sm" className="w-full bg-[#002366] hover:bg-[#001a4d]">
                    Apply Now
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/messages">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/invite">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Invite Alumni
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Blockchain Verification */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-800">Blockchain Verified</span>
                </div>
                <p className="text-xs text-green-700 mb-2">
                  Your credentials are permanently verified on Solana blockchain
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-green-700 border-green-300 hover:bg-green-100"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View on Explorer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
