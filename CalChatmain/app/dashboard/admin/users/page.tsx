"use client"

import { useState } from "react"
import {
  LayoutDashboard, Users, Shield, Briefcase, BarChart3, Megaphone,
  Search, MoreHorizontal, UserX, Edit2, Mail,
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Role Management", href: "/dashboard/admin/roles", icon: Shield },
  { label: "Access Control", href: "/dashboard/admin/access", icon: Briefcase },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Announcements", href: "/dashboard/admin/announcements", icon: Megaphone },
]

const USERS = [
  { id: "1", name: "Sarah Miller", email: "sarah@example.com", role: "Student", status: "Active", joined: "Jan 15, 2026" },
  { id: "2", name: "James Wilson", email: "james@example.com", role: "Professional", status: "Active", joined: "Jan 20, 2026" },
  { id: "3", name: "Emily Brown", email: "emily@example.com", role: "Personal", status: "Active", joined: "Feb 1, 2026" },
  { id: "4", name: "Michael Chen", email: "michael@example.com", role: "Student", status: "Inactive", joined: "Dec 10, 2025" },
  { id: "5", name: "Anna Lopez", email: "anna@example.com", role: "Professional", status: "Active", joined: "Feb 5, 2026" },
  { id: "6", name: "David Kim", email: "david@example.com", role: "Student", status: "Active", joined: "Jan 28, 2026" },
  { id: "7", name: "Jessica Lee", email: "jessica@example.com", role: "Personal", status: "Suspended", joined: "Nov 15, 2025" },
  { id: "8", name: "Robert Taylor", email: "robert@example.com", role: "Admin", status: "Active", joined: "Oct 1, 2025" },
]

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Active: "default",
  Inactive: "secondary",
  Suspended: "destructive",
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredUsers = USERS.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === "all" || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <DashboardShell navItems={navItems} role="Admin" title="Manage Users">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Joined</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{user.role}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANTS[user.status]}>{user.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.joined}</td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Edit2 className="mr-2 h-4 w-4" /> Edit User</DropdownMenuItem>
                          <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /> Send Email</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><UserX className="mr-2 h-4 w-4" /> Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">Showing {filteredUsers.length} of {USERS.length} users</p>
      </div>
    </DashboardShell>
  )
}
