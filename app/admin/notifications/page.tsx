"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, CheckCircle, Users, Zap, Eye, MessageSquare } from "lucide-react"

interface Notification {
  id: string
  type: "verification_request" | "fast_track" | "message_flag" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "high" | "medium" | "low"
  actionRequired: boolean
  relatedUser?: {
    name: string
    email: string
    institution: string
  }
}

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "verification_request",
      title: "New Verification Request",
      message: "Alex Chen from Stanford University has submitted documents for verification",
      timestamp: "2024-01-15T10:30:00Z",
      read: false,
      priority: "high",
      actionRequired: true,
      relatedUser: {
        name: "Alex Chen",
        email: "alex.chen@stanford.edu",
        institution: "Stanford University",
      },
    },
    {
      id: "2",
      type: "fast_track",
      title: "Fast-Track Verification Payment",
      message: "Maria Rodriguez paid for fast-track verification - requires priority review",
      timestamp: "2024-01-15T09:15:00Z",
      read: false,
      priority: "high",
      actionRequired: true,
      relatedUser: {
        name: "Maria Rodriguez",
        email: "maria.rodriguez@stanford.edu",
        institution: "Stanford University",
      },
    },
    {
      id: "3",
      type: "message_flag",
      title: "Message Flagged for Review",
      message: "A message between users has been flagged by our content filter",
      timestamp: "2024-01-14T16:45:00Z",
      read: true,
      priority: "medium",
      actionRequired: true,
    },
    {
      id: "4",
      type: "system",
      title: "SOL Reward Sent",
      message: "You earned 0.01 SOL for verifying Jennifer Wu's profile",
      timestamp: "2024-01-14T14:20:00Z",
      read: true,
      priority: "low",
      actionRequired: false,
    },
  ])

  const [filter, setFilter] = useState<"all" | "unread" | "action_required">("all")

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const handleAction = (notification: Notification) => {
    if (notification.type === "verification_request" || notification.type === "fast_track") {
      // Redirect to verification dashboard
      console.log("Redirecting to verification for:", notification.relatedUser?.name)
    } else if (notification.type === "message_flag") {
      // Redirect to message moderation
      console.log("Redirecting to message moderation")
    }
    markAsRead(notification.id)
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read
    if (filter === "action_required") return notif.actionRequired
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "verification_request":
        return <Users className="w-5 h-5 text-blue-500" />
      case "fast_track":
        return <Zap className="w-5 h-5 text-[#D4AF37]" />
      case "message_flag":
        return <MessageSquare className="w-5 h-5 text-red-500" />
      case "system":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-orange-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-6 h-6 text-[#002366]" />
              <h1 className="text-2xl font-serif font-bold text-[#002366]">Notifications</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="destructive" className="px-3 py-1">
                {unreadCount} unread
              </Badge>
              {actionRequiredCount > 0 && (
                <Badge className="bg-[#D4AF37] text-black px-3 py-1">{actionRequiredCount} require action</Badge>
              )}
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                Mark All Read
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-[#002366]" : ""}
          >
            All Notifications ({notifications.length})
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
            className={filter === "unread" ? "bg-[#002366]" : ""}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === "action_required" ? "default" : "outline"}
            onClick={() => setFilter("action_required")}
            className={filter === "action_required" ? "bg-[#002366]" : ""}
          >
            Action Required ({actionRequiredCount})
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.read ? "bg-blue-50 border-blue-200" : "bg-white"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${!notification.read ? "text-[#002366]" : "text-gray-900"}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {notification.actionRequired && (
                          <Badge variant="destructive" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3">{notification.message}</p>

                    {notification.relatedUser && (
                      <div className="flex items-center space-x-3 mb-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {notification.relatedUser.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{notification.relatedUser.name}</p>
                          <p className="text-xs text-gray-500">{notification.relatedUser.email}</p>
                          <p className="text-xs text-gray-500">{notification.relatedUser.institution}</p>
                        </div>
                      </div>
                    )}

                    {notification.actionRequired && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAction(notification)
                          }}
                          className="bg-[#002366] hover:bg-[#001a4d]"
                        >
                          {notification.type === "verification_request" && "Review Verification"}
                          {notification.type === "fast_track" && "Priority Review"}
                          {notification.type === "message_flag" && "Review Message"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(notification.id)
                          }}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Mark as Read
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredNotifications.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="text-gray-600">
                  {filter === "unread" && "You're all caught up! No unread notifications."}
                  {filter === "action_required" && "No notifications require action at the moment."}
                  {filter === "all" && "You don't have any notifications yet."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
