"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, Users, Mail, Copy, CheckCircle, Gift, Star } from "lucide-react"

export default function InvitePage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [bulkEmails, setBulkEmails] = useState("")
  const [invitesSent, setInvitesSent] = useState(0)

  // Mock referred users data
  const referredUsers = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@stanford.edu",
      status: "joined",
      joinedDate: "2024-01-10",
      reward: "0.1 SOL",
    },
    {
      id: "2",
      name: "Lisa Chen",
      email: "lisa.chen@mit.edu",
      status: "pending",
      invitedDate: "2024-01-12",
      reward: "Pending",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.j@harvard.edu",
      status: "joined",
      joinedDate: "2024-01-08",
      reward: "0.1 SOL",
    },
  ]

  const totalRewards = referredUsers.filter((user) => user.status === "joined").reduce((sum, user) => sum + 0.1, 0)

  const handleSingleInvite = () => {
    if (!email) return

    console.log("Sending invite to:", email, "with message:", message)
    // TODO: Send invite via email API
    setInvitesSent(invitesSent + 1)
    setEmail("")
    setMessage("")
    alert("Invite sent successfully!")
  }

  const handleBulkInvite = () => {
    const emails = bulkEmails.split("\n").filter((email) => email.trim())
    if (emails.length === 0) return

    console.log("Sending bulk invites to:", emails)
    // TODO: Send bulk invites via email API
    setInvitesSent(invitesSent + emails.length)
    setBulkEmails("")
    alert(`${emails.length} invites sent successfully!`)
  }

  const copyReferralLink = () => {
    const referralLink = `https://alumninexuspro.com/auth?ref=sarah_johnson_123`
    navigator.clipboard.writeText(referralLink)
    alert("Referral link copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="inline-flex items-center text-[#002366] hover:text-[#001a4d]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-[#002366] mb-4">Invite Alumni to Join</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Help grow the verified alumni network and earn SOL rewards for every successful referral
            </p>
          </div>

          {/* Rewards Summary */}
          <Card className="mb-8 border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <Gift className="w-6 h-6 text-[#D4AF37] mr-2" />
                    <span className="text-2xl font-bold text-[#002366]">{totalRewards.toFixed(1)} SOL</span>
                  </div>
                  <p className="text-gray-600">Total Rewards Earned</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-[#D4AF37] mr-2" />
                    <span className="text-2xl font-bold text-[#002366]">
                      {referredUsers.filter((u) => u.status === "joined").length}
                    </span>
                  </div>
                  <p className="text-gray-600">Successful Referrals</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <Send className="w-6 h-6 text-[#D4AF37] mr-2" />
                    <span className="text-2xl font-bold text-[#002366]">{invitesSent}</span>
                  </div>
                  <p className="text-gray-600">Invites Sent Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Invite Forms */}
            <div className="space-y-6">
              {/* Single Invite */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Send Personal Invite
                  </CardTitle>
                  <CardDescription>Invite one person with a personalized message</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="colleague@university.edu"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Personal Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi! I thought you'd be interested in joining this verified alumni network..."
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleSingleInvite} className="w-full bg-[#002366] hover:bg-[#001a4d]">
                    <Send className="w-4 h-4 mr-2" />
                    Send Invite
                  </Button>
                </CardContent>
              </Card>

              {/* Bulk Invite */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Bulk Invite
                  </CardTitle>
                  <CardDescription>Send invites to multiple people at once</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bulkEmails">Email Addresses (one per line)</Label>
                    <Textarea
                      id="bulkEmails"
                      value={bulkEmails}
                      onChange={(e) => setBulkEmails(e.target.value)}
                      placeholder="john@stanford.edu&#10;sarah@mit.edu&#10;mike@harvard.edu"
                      rows={6}
                    />
                  </div>
                  <Button onClick={handleBulkInvite} className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                    <Send className="w-4 h-4 mr-2" />
                    Send Bulk Invites
                  </Button>
                </CardContent>
              </Card>

              {/* Referral Link */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Copy className="w-5 h-5 mr-2" />
                    Share Referral Link
                  </CardTitle>
                  <CardDescription>Share your unique referral link on social media</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <code className="text-sm break-all">https://alumninexuspro.com/auth?ref=sarah_johnson_123</code>
                  </div>
                  <Button onClick={copyReferralLink} variant="outline" className="w-full">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Referral Link
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Referral Status */}
            <div className="space-y-6">
              {/* Referral Program Info */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Referral Rewards Program
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm text-green-700">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Earn 0.1 SOL for each successful referral</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Bonus 0.5 SOL for every 10 referrals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Rewards paid instantly to your wallet</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>No limit on referrals</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Referred Users */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Referrals</CardTitle>
                  <CardDescription>Track the status of people you've invited</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {referredUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={user.status === "joined" ? "default" : "secondary"}
                            className={user.status === "joined" ? "bg-green-100 text-green-800" : ""}
                          >
                            {user.status === "joined" ? "Joined" : "Pending"}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {user.status === "joined" ? `Joined ${user.joinedDate}` : `Invited ${user.invitedDate}`}
                          </p>
                          <p className="text-xs font-medium text-[#D4AF37]">{user.reward}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Invitation Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                      <p>Personalize your message to increase acceptance rates</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                      <p>Focus on alumni from your school or industry</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                      <p>Explain the benefits of blockchain verification</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0"></div>
                      <p>Share your referral link on LinkedIn and social media</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
