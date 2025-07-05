"use client"

import Image from "next/image";
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Shield,
  Users,
  CheckCircle,
  GraduationCap,
  Building,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Briefcase,
  Calendar,
  UserCheck,
  Mail,
} from "lucide-react"
import Link from "next/link"

const userTypes = [
  {
    id: "highschool",
    name: "High School Student",
    grade: "Grade 10",
    school: "Bishops Diocesan College",
    email: "john.smith@bishops.co.za",
    color: "bg-green-500",
    icon: <GraduationCap className="w-5 h-5" />,
    onboardingType: "bulk_school",
  },
  {
    id: "tertiary",
    name: "University Student",
    grade: "2nd Year Computer Science",
    school: "University of Cape Town",
    email: "sarah.jones@myuct.ac.za",
    color: "bg-blue-500",
    icon: <GraduationCap className="w-5 h-5" />,
    onboardingType: "individual",
  },
  {
    id: "alumni",
    name: "Recent Alumni",
    grade: "Class of 2022",
    school: "University of Cape Town",
    email: "mike.wilson@gmail.com",
    color: "bg-purple-500",
    icon: <Users className="w-5 h-5" />,
    onboardingType: "individual",
  },
  {
    id: "corporate",
    name: "Corporate Alumni",
    grade: "Senior Manager",
    school: "Standard Bank",
    email: "lisa.adams@standardbank.co.za",
    color: "bg-orange-500",
    icon: <Building className="w-5 h-5" />,
    onboardingType: "bulk_corporate",
  },
]

const demoScreens = [
  { id: 1, title: "Landing Page", duration: 3000 },
  { id: 2, title: "Onboarding Process", duration: 4000 },
  { id: 3, title: "Profile Creation", duration: 5000 },
  { id: 4, title: "Plan Selection", duration: 4000 },
  { id: 5, title: "Verification Process", duration: 4000 },
  { id: 6, title: "Dashboard Welcome", duration: 4000 },
  { id: 7, title: "Networking Features", duration: 4000 },
]

export default function DemoPage() {
  const [currentUser, setCurrentUser] = useState(0)
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true) // Auto-start
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      const screenDuration = demoScreens[currentScreen]?.duration || 3000
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentScreen < demoScreens.length - 1) {
              setCurrentScreen((prev) => prev + 1)
              return 0
            } else if (currentUser < userTypes.length - 1) {
              setCurrentUser((prev) => prev + 1)
              setCurrentScreen(0)
              return 0
            } else {
              // Loop back to start
              setCurrentUser(0)
              setCurrentScreen(0)
              return 0
            }
          }
          return prev + 100 / (screenDuration / 100)
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentScreen, currentUser])

  const resetDemo = () => {
    setCurrentUser(0)
    setCurrentScreen(0)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const renderScreen = () => {
    const user = userTypes[currentUser]
    const screen = demoScreens[currentScreen]

    switch (screen.id) {
      case 1: // Landing Page
        return (
          <Image
  src="/alumni-nexus-pro-logo.png"
  alt="Alumni Nexus Pro Logo"
  width={40}
  height={40}
  className="rounded-full object-contain"
/>
              <h1 className="text-3xl font-serif font-bold mb-4">Alumni Nexus Pro</h1>
              <p className="text-xl mb-6">Verified Connections for Life</p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">Join the Network</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#002366]">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        )

      case 2: // Onboarding Process
        return (
          <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-center">Onboarding Process</h2>

            {user.onboardingType === "bulk_school" && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">School Admin Bulk Upload</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>School admin uploads student details in bulk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>Parent acknowledgment email sent automatically</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>No criminal/predator checks required for students</span>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Parent Acknowledgment Required:</strong> Parents must digitally sign acknowledgment before
                    student access is granted.
                  </p>
                </div>
              </div>
            )}

            {user.onboardingType === "bulk_corporate" && (
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Building className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-orange-800">Corporate Bulk Upload</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>HR admin uploads employee details in bulk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>Individual T&C acceptance emails sent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      <span>Criminal & predator verification required</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Auto-Verified Employment:</strong> All enterprise users have pre-verified employment status.
                  </p>
                </div>
              </div>
            )}

            {user.onboardingType === "individual" && (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">Individual Registration</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Self-registration with email verification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Document verification required</span>
                    </div>
                    {user.id === "alumni" && (
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-red-500" />
                        <span>Criminal & predator verification required</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 3: // Profile Creation
        return (
          <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-center">Complete Your Profile</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" value={user.school} readOnly />
              </div>
              <div>
                <Label htmlFor="level">Current Level/Position</Label>
                <Input id="level" value={user.grade} readOnly />
              </div>

              {user.onboardingType === "bulk_school" && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Student Safety Protocols</span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    As a school student, you have access to moderated group chats with verified mentors only. All alumni
                    interacting with students undergo comprehensive background checks.
                  </p>
                </div>
              )}

              {user.onboardingType === "bulk_corporate" && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Enterprise Account</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    Your employment is pre-verified through your organization. Complete your profile to access the full
                    network.
                  </p>
                </div>
              )}

              <Button className="w-full bg-[#002366] hover:bg-[#001a4d]">Save Profile</Button>
            </div>
          </div>
        )

      case 4: // Plan Selection
        return (
          <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Plan</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Free Plan */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Free</h3>
                <div className="text-2xl font-bold mb-2">$0</div>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• 3 messages/month</li>
                  <li>• Basic verification</li>
                  <li>• Network access</li>
                </ul>
                <Button
                  variant={user.id === "highschool" ? "default" : "outline"}
                  className={`w-full ${user.id === "highschool" ? "bg-[#002366]" : ""}`}
                  size="sm"
                >
                  {user.id === "highschool" ? "Selected" : "Choose"}
                </Button>
              </div>

              {/* Premium Plan */}
              <div className="border-2 border-[#D4AF37] rounded-lg p-4 relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-black">
                  Popular
                </Badge>
                <h3 className="font-semibold mb-2">Premium</h3>
                <div className="text-2xl font-bold mb-2">$9.99</div>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Unlimited messages</li>
                  <li>• Priority verification</li>
                  <li>• Advanced features</li>
                </ul>
                <Button
                  variant={user.id !== "highschool" && user.id !== "corporate" ? "default" : "outline"}
                  className={`w-full ${user.id !== "highschool" && user.id !== "corporate" ? "bg-[#002366]" : ""}`}
                  size="sm"
                >
                  {user.id !== "highschool" && user.id !== "corporate" ? "Selected" : "Choose"}
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Enterprise</h3>
                <div className="text-2xl font-bold mb-2">$2</div>
                <div className="text-xs text-gray-600 mb-2">per seat/month</div>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Bulk management</li>
                  <li>• Custom branding</li>
                  <li>• API access</li>
                </ul>
                <Button
                  variant={user.id === "corporate" ? "default" : "outline"}
                  className={`w-full ${user.id === "corporate" ? "bg-[#002366]" : ""}`}
                  size="sm"
                >
                  {user.id === "corporate" ? "Selected" : "Contact Sales"}
                </Button>
              </div>
            </div>
          </div>
        )

      case 5: // Verification Process
        return (
          <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-center">Verification in Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Document verification complete</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Institution confirmation received</span>
              </div>

              {/* Only show background checks for alumni and corporate users */}
              {(user.id === "alumni" || user.id === "corporate") && (
                <>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Criminal background check complete</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Predator verification passed</span>
                  </div>
                </>
              )}

              {/* Special message for school students */}
              {user.id === "highschool" && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Student Protection Active</span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    As a school student, you are exempt from background checks. All alumni who can contact you have been
                    thoroughly verified.
                  </p>
                </div>
              )}

              {/* Special message for tertiary students */}
              {user.id === "tertiary" && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">University Student Verification</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    Background checks not required for university students. Full verification will be required upon
                    graduation.
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Blockchain verification logging...</span>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Verification Complete!</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 6: // Dashboard Welcome
        return (
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="bg-white rounded-lg p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">Welcome, {user.name.split(" ")[0]}!</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified {user.name.split(" ")[0]}
                    </Badge>
                    <span className="text-gray-600">{user.school}</span>
                  </div>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-[#002366] text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">12</div>
                  <div className="text-sm text-gray-600">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">47</div>
                  <div className="text-sm text-gray-600">Profile Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">8</div>
                  <div className="text-sm text-gray-600">Messages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#D4AF37]">100%</div>
                  <div className="text-sm text-gray-600">Verified</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 7: // Networking Features
        return (
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="space-y-4">
              {/* Opportunities */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Opportunities For You
                </h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Senior Software Engineer</h4>
                        <p className="text-sm text-gray-600">Meta • Menlo Park, CA</p>
                      </div>
                      <Badge className="bg-[#D4AF37] text-black text-xs">Sponsored</Badge>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Annual Fundraiser Gala</h4>
                        <p className="text-sm text-gray-600">St Henry's Marist College • Durban</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">March 15, 2024</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Event
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Recent Activity
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Elon Musk viewed your profile</span>
                    <span className="text-gray-500">2h ago</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>New connection request from Ayanda Bolani</span>
                    <span className="text-gray-500">5h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#002366] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AN</span>
            </div>
            <span className="text-xl font-serif font-bold text-[#002366]">Alumni Nexus Pro</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-[#002366] text-[#002366] hover:bg-[#002366] hover:text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Demo Screen */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl">
            <CardContent className="p-0">
              <div className="bg-gray-800 px-4 py-2 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white text-sm ml-4">alumni-nexus-pro.com</span>
                </div>
              </div>
              <div className="min-h-[500px]">{renderScreen()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Demo Controls */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border mt-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Demo Controls</h3>
            <div className="flex items-center space-x-2">
              <Button onClick={togglePlayPause} className="bg-[#002366] hover:bg-[#001a4d]">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button onClick={resetDemo} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <Badge className="bg-[#D4AF37] text-black">Auto-playing at normal speed</Badge>
            <Badge variant="outline">Loops continuously</Badge>
          </div>
          <Progress value={progress} className="mb-2" />
          <div className="text-sm text-gray-600">
            {userTypes[currentUser].name} - Screen {currentScreen + 1} of {demoScreens.length}:{" "}
            {demoScreens[currentScreen]?.title}
          </div>
        </div>

        {/* User Type Indicator */}
        <div className="grid md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          {userTypes.map((user, index) => (
            <Card
              key={user.id}
              className={`transition-all ${
                currentUser === index ? "ring-2 ring-[#002366] shadow-lg scale-105" : "opacity-60"
              }`}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 ${user.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  {user.icon}
                </div>
                <h4 className="font-semibold text-sm mb-1">{user.name}</h4>
                <p className="text-xs text-gray-600">{user.grade}</p>
                <p className="text-xs text-gray-500">{user.school}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {user.onboardingType === "bulk_school" && "School Bulk"}
                  {user.onboardingType === "bulk_corporate" && "Corporate Bulk"}
                  {user.onboardingType === "individual" && "Individual"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Updated Safety Features Highlight */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8 border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-800">Comprehensive Safety & Verification</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-700">For School Students (Protected)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No background checks required (exempt until graduation)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Bulk onboarding by school admin</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Parent acknowledgment required</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>School-specific alumni connections only</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Moderated group chats only</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-red-700">For Alumni & Corporate (Verified)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span>Criminal background checks mandatory</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span>Predator verification as standard</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Corporate bulk onboarding available</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Auto-verified employment (Enterprise)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Individual T&C acceptance required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process Overview */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-xl font-semibold mb-4 text-[#002366]">User Journey Overview</h3>
          <div className="grid md:grid-cols-7 gap-2">
            {demoScreens.map((screen, index) => (
              <div
                key={screen.id}
                className={`text-center p-3 rounded-lg transition-all ${
                  index === currentScreen
                    ? "bg-[#002366] text-white"
                    : index < currentScreen
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mx-auto mb-2 ${
                    index === currentScreen
                      ? "bg-white text-[#002366]"
                      : index < currentScreen
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index < currentScreen ? <CheckCircle className="w-4 h-4" /> : screen.id}
                </div>
                <span className="text-xs font-medium">{screen.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
