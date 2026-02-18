"use client"

import { LayoutDashboard, Users, Shield, Briefcase, BarChart3, Megaphone, UserPlus, Activity, PiIcon as PieIcon } from "lucide-react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatCard } from "@/components/dashboard/stat-card"
import { Badge } from "@/components/ui/badge"
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts"

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Role Management", href: "/dashboard/admin/roles", icon: Shield },
  { label: "Access Control", href: "/dashboard/admin/access", icon: Briefcase },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Announcements", href: "/dashboard/admin/announcements", icon: Megaphone },
]

const roleData = [
  { name: "Students", value: 2450, color: "hsl(var(--chart-1))" },
  { name: "Personal", value: 1280, color: "hsl(var(--chart-2))" },
  { name: "Professional", value: 890, color: "hsl(var(--chart-3))" },
  { name: "Admin", value: 12, color: "hsl(var(--chart-4))" },
]

const recentRegistrations = [
  { name: "Sarah Miller", email: "sarah@example.com", role: "Student", date: "Feb 9, 2026" },
  { name: "James Wilson", email: "james@example.com", role: "Professional", date: "Feb 9, 2026" },
  { name: "Emily Brown", email: "emily@example.com", role: "Personal", date: "Feb 8, 2026" },
  { name: "Michael Chen", email: "michael@example.com", role: "Student", date: "Feb 8, 2026" },
  { name: "Anna Lopez", email: "anna@example.com", role: "Professional", date: "Feb 7, 2026" },
]

const activityLogs = [
  { action: "User role updated", details: "james@example.com -> Admin", time: "10 min ago", type: "Role" },
  { action: "New announcement posted", details: "System maintenance scheduled", time: "1h ago", type: "System" },
  { action: "User deactivated", details: "inactive_user@test.com", time: "2h ago", type: "User" },
  { action: "Bulk import completed", details: "45 new users added", time: "3h ago", type: "User" },
  { action: "Access policy changed", details: "Professional tier updated", time: "5h ago", type: "Policy" },
]

const registrationData = [
  { month: "Sep", users: 320 },
  { month: "Oct", users: 450 },
  { month: "Nov", users: 380 },
  { month: "Dec", users: 520 },
  { month: "Jan", users: 610 },
  { month: "Feb", users: 480 },
]

export default function AdminDashboard() {
  return (
    <DashboardShell navItems={navItems} role="Admin" title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} title="Total Users" value="4,632" trend="+128 this month" />
        <StatCard icon={UserPlus} title="New Registrations" value="48" description="This week" trend="+12%" />
        <StatCard icon={Activity} title="Active Sessions" value="312" description="Right now" />
        <StatCard icon={PieIcon} title="System Uptime" value="99.9%" description="Last 30 days" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Role Distribution Chart */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Role Distribution</h3>
          <div className="mt-4 flex items-center gap-6">
            <div className="h-56 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--card-foreground))',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3">
              {roleData.map((role) => (
                <div key={role.name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: role.color }} />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{role.name}</p>
                    <p className="text-xs text-muted-foreground">{role.value.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Registration Trends */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Registration Trends</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--card-foreground))',
                  }}
                />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Recent Registrations</h3>
          <div className="mt-4 flex flex-col gap-3">
            {recentRegistrations.map((user) => (
              <div key={user.email} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{user.role}</Badge>
                  <p className="mt-1 text-xs text-muted-foreground">{user.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity Logs */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">System Activity Logs</h3>
          <div className="mt-4 flex flex-col gap-3">
            {activityLogs.map((log, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                  <Activity className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.details}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{log.type}</Badge>
                  <p className="mt-1 text-xs text-muted-foreground">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
