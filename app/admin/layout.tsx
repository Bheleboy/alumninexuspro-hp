import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Users, Building2, Bell, Settings, LogOut, GraduationCap } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Get admin info from auth context
  const adminInfo = {
    type: "university", // or "company"
    institution: "Stanford University",
    unreadNotifications: 3,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#002366] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AN</span>
            </div>
            <span className="text-lg font-serif font-bold text-[#002366]">Admin Portal</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href={adminInfo.type === "university" ? "/admin/institutional" : "/admin/corporate"}>
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="w-4 h-4 mr-3" />
              Dashboard
            </Button>
          </Link>

          <Link href="/admin/notifications">
            <Button variant="ghost" className="w-full justify-start relative">
              <Bell className="w-4 h-4 mr-3" />
              Notifications
              {adminInfo.unreadNotifications > 0 && (
                <Badge variant="destructive" className="ml-auto text-xs">
                  {adminInfo.unreadNotifications}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          </Link>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Actions</p>

            {adminInfo.type === "university" ? (
              <Link href="/admin/institutional#verifications">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <GraduationCap className="w-4 h-4 mr-3" />
                  Review Verifications
                </Button>
              </Link>
            ) : (
              <Link href="/admin/corporate#verifications">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Building2 className="w-4 h-4 mr-3" />
                  Review Employment
                </Button>
              </Link>
            )}

            <Link href="/admin/invite">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Users className="w-4 h-4 mr-3" />
                Invite Alumni
              </Button>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
