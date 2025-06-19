"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Search, MoreVertical, CheckCircle } from "lucide-react"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState("1")
  const [newMessage, setNewMessage] = useState("")

  // Mock conversations data
  const conversations = [
    {
      id: "1",
      name: "Michael Chen",
      role: "Student",
      school: "MIT",
      lastMessage: "Thanks for the advice!",
      lastMessageTime: "2 hours ago",
      unread: 0,
      verified: true,
    },
    {
      id: "2",
      name: "Emily Rodriguez",
      role: "Alumni",
      school: "Stanford University",
      lastMessage: "Would love to connect!",
      lastMessageTime: "1 day ago",
      unread: 2,
      verified: true,
    },
  ]

  // Mock messages for selected conversation
  const messages = [
    {
      id: "1",
      senderId: "1",
      senderName: "Michael Chen",
      content:
        "Hi Sarah! I saw your profile and I'm really interested in learning about your experience transitioning from Stanford to Google. I'm currently a CS student at MIT and considering similar paths.",
      timestamp: "2024-01-15T10:30:00Z",
      isCurrentUser: false,
    },
    {
      id: "2",
      senderId: "current",
      senderName: "You",
      content:
        "Hi Michael! I'd be happy to share my experience. The transition was definitely challenging but rewarding. What specific aspects are you most curious about?",
      timestamp: "2024-01-15T11:00:00Z",
      isCurrentUser: true,
    },
    {
      id: "3",
      senderId: "1",
      senderName: "Michael Chen",
      content:
        "Thanks for responding! I'm particularly interested in how you prepared for technical interviews and what skills were most valuable in your first year at Google.",
      timestamp: "2024-01-15T11:30:00Z",
      isCurrentUser: false,
    },
    {
      id: "4",
      senderId: "current",
      senderName: "You",
      content:
        "Great questions! For technical interviews, I focused heavily on algorithms and system design. LeetCode was invaluable, but I also recommend understanding Google's specific culture and values. The most valuable skills in my first year were definitely collaboration and being comfortable with ambiguity.",
      timestamp: "2024-01-15T12:00:00Z",
      isCurrentUser: true,
    },
    {
      id: "5",
      senderId: "1",
      senderName: "Michael Chen",
      content: "Thanks for the advice!",
      timestamp: "2024-01-15T14:00:00Z",
      isCurrentUser: false,
    },
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    console.log("Sending message:", newMessage)
    // TODO: Integrate with real-time messaging system
    // - Send message through WebSocket or Firebase Realtime Database
    // - Apply content filtering and keyword flagging
    // - Encrypt message content using libsignal or similar

    setNewMessage("")
    alert("Message sent! (In production, this would be sent through encrypted channels)")
  }

  const selectedConv = conversations.find((c) => c.id === selectedConversation)

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Conversations Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-serif font-bold text-[#002366] mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search conversations..." className="pl-10" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation === conversation.id ? "bg-blue-50 border-l-4 border-l-[#002366]" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                      {conversation.verified && <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                      {conversation.unread > 0 && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {conversation.role} • {conversation.school}
                  </p>
                  <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {selectedConv.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="font-semibold">{selectedConv.name}</h2>
                      {selectedConv.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedConv.role} • {selectedConv.school}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isCurrentUser ? "bg-[#002366] text-white" : "bg-white border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isCurrentUser ? "text-blue-200" : "text-gray-500"}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-[#002366] hover:bg-[#001a4d]">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                All messages are encrypted and monitored for safety. Be professional and respectful.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
