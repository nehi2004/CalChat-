"use client"

import {
  LayoutDashboard, Users, Shield, Briefcase, BarChart3, Megaphone,
  GraduationCap, User, CheckCircle2, X,
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Role Management", href: "/dashboard/admin/roles", icon: Shield },
  { label: "Access Control", href: "/dashboard/admin/access", icon: Briefcase },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Announcements", href: "/dashboard/admin/announcements", icon: Megaphone },
]

const ROLES = [
  {
    name: "Student",
    icon: GraduationCap,
    count: 2450,
    permissions: [
      { name: "Calendar", enabled: true },
      { name: "AI Chat", enabled: true },
      { name: "Tasks", enabled: true },
      { name: "Focus Mode", enabled: true },
      { name: "Group Study", enabled: true },
      { name: "Events", enabled: true },
      { name: "Analytics", enabled: true },
      { name: "Team Management", enabled: false },
      { name: "Admin Panel", enabled: false },
    ],
  },
  {
    name: "Personal",
    icon: User,
    count: 1280,
    permissions: [
      { name: "Calendar", enabled: true },
      { name: "AI Chat", enabled: true },
      { name: "Tasks", enabled: true },
      { name: "Focus Mode", enabled: true },
      { name: "Group Study", enabled: false },
      { name: "Events", enabled: false },
      { name: "Analytics", enabled: true },
      { name: "Team Management", enabled: false },
      { name: "Admin Panel", enabled: false },
    ],
  },
  {
    name: "Professional",
    icon: Briefcase,
    count: 890,
    permissions: [
      { name: "Calendar", enabled: true },
      { name: "AI Chat", enabled: true },
      { name: "Tasks", enabled: true },
      { name: "Focus Mode", enabled: true },
      { name: "Group Study", enabled: false },
      { name: "Events", enabled: true },
      { name: "Analytics", enabled: true },
      { name: "Team Management", enabled: true },
      { name: "Admin Panel", enabled: false },
    ],
  },
  {
    name: "Admin",
    icon: Shield,
    count: 12,
    permissions: [
      { name: "Calendar", enabled: true },
      { name: "AI Chat", enabled: true },
      { name: "Tasks", enabled: true },
      { name: "Focus Mode", enabled: true },
      { name: "Group Study", enabled: true },
      { name: "Events", enabled: true },
      { name: "Analytics", enabled: true },
      { name: "Team Management", enabled: true },
      { name: "Admin Panel", enabled: true },
    ],
  },
]

export default function AdminRolesPage() {
  return (
    <DashboardShell navItems={navItems} role="Admin" title="Role Management">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Role Management</h2>
          <p className="mt-1 text-sm text-muted-foreground">Configure permissions for each user role</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {ROLES.map((role) => (
            <div key={role.name} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <role.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-card-foreground">{role.name}</h3>
                    <p className="text-xs text-muted-foreground">{role.count.toLocaleString()} users</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent">Edit</Button>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                {role.permissions.map((perm) => (
                  <div key={perm.name} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                    <span className="text-sm text-card-foreground">{perm.name}</span>
                    <div className="flex items-center gap-2">
                      {perm.enabled ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Switch checked={perm.enabled} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
