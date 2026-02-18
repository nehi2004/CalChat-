"use client"

import {
  LayoutDashboard, Calendar, MessageSquare, Video, CalendarDays, Users, StickyNote, BarChart3,
  Briefcase, Clock, TrendingUp, CheckCircle2,
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatCard } from "@/components/dashboard/stat-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const navItems = [
  { label: "Dashboard", href: "/dashboard/professional", icon: LayoutDashboard },
  { label: "Calendar", href: "/dashboard/professional/calendar", icon: Calendar },
  { label: "AI Chat", href: "/dashboard/professional/chat", icon: MessageSquare },
  { label: "Meetings", href: "/dashboard/professional/meetings", icon: Video },
  { label: "Events", href: "/dashboard/professional/events", icon: CalendarDays },
  { label: "Team", href: "/dashboard/professional/team", icon: Users },
  { label: "Notes", href: "/dashboard/professional/notes", icon: StickyNote },
  { label: "Analytics", href: "/dashboard/professional/analytics", icon: BarChart3 },
]

const meetings = [
  { time: "09:00", title: "Sprint Planning", attendees: 8, type: "Team" },
  { time: "11:30", title: "Client Presentation", attendees: 4, type: "Client" },
  { time: "14:00", title: "1-on-1 with Manager", attendees: 2, type: "Personal" },
  { time: "16:00", title: "Design Review", attendees: 5, type: "Team" },
]

const teamActivity = [
  { name: "Alice Johnson", task: "Completed API integration", time: "2h ago", avatar: "AJ" },
  { name: "Bob Smith", task: "Submitted PR for auth module", time: "3h ago", avatar: "BS" },
  { name: "Carol White", task: "Updated design mockups", time: "5h ago", avatar: "CW" },
  { name: "David Lee", task: "Fixed critical bug #342", time: "6h ago", avatar: "DL" },
]

const workTasks = [
  { title: "Finalize Q1 Report", priority: "High", progress: 85 },
  { title: "Review Marketing Strategy", priority: "Medium", progress: 60 },
  { title: "Update Documentation", priority: "Low", progress: 30 },
  { title: "Prepare Team Demo", priority: "High", progress: 45 },
]

const productivityData = [
  { week: "W1", hours: 38, tasks: 12 },
  { week: "W2", hours: 42, tasks: 15 },
  { week: "W3", hours: 35, tasks: 10 },
  { week: "W4", hours: 45, tasks: 18 },
  { week: "W5", hours: 40, tasks: 14 },
  { week: "W6", hours: 43, tasks: 16 },
]

export default function ProfessionalDashboard() {
  return (
    <DashboardShell navItems={navItems} role="Professional" title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Video} title="Meetings Today" value="4" description="Next: 9:00 AM" />
        <StatCard icon={Briefcase} title="Active Projects" value="6" trend="+1 new" />
        <StatCard icon={Clock} title="Hours This Week" value="32h" description="Target: 40h" />
        <StatCard icon={TrendingUp} title="Productivity" value="92%" trend="+8% vs last week" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Meeting Schedule */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Meeting Schedule</h3>
          <div className="mt-4 flex flex-col gap-3">
            {meetings.map((item) => (
              <div key={item.time} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <span className="w-14 text-sm font-medium text-primary">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.attendees} attendees</p>
                </div>
                <Badge variant="secondary">{item.type}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Team Activity */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Team Activity</h3>
          <div className="mt-4 flex flex-col gap-3">
            {teamActivity.map((member) => (
              <div key={member.name} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.task}</p>
                </div>
                <span className="text-xs text-muted-foreground">{member.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Work Tasks */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Work Tasks</h3>
          <div className="mt-4 flex flex-col gap-4">
            {workTasks.map((task) => (
              <div key={task.title}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-card-foreground">{task.title}</span>
                  <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>{task.priority}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={task.progress} className="h-2 flex-1" />
                  <span className="text-xs font-medium text-primary">{task.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity Analytics Graph */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Productivity Analytics</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="week" tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--card-foreground))',
                  }}
                />
                <Area type="monotone" dataKey="hours" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.15)" strokeWidth={2} />
                <Area type="monotone" dataKey="tasks" stroke="hsl(var(--accent))" fill="hsl(var(--accent)/0.15)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
