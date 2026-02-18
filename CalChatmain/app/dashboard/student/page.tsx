"use client"

import {
  LayoutDashboard, Calendar, MessageSquare, CheckCircle2, Focus, CalendarDays, Users, BarChart3,
  BookOpen, FileText, Clock
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatCard } from "@/components/dashboard/stat-card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const navItems = [
  { label: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
  { label: "Calendar", href: "/dashboard/student/calendar", icon: Calendar },
  { label: "AI Chat", href: "/dashboard/student/chat", icon: MessageSquare },
  { label: "Tasks", href: "/dashboard/student/tasks", icon: CheckCircle2 },
  { label: "Focus Mode", href: "/dashboard/student/focus", icon: Focus },
  { label: "Events", href: "/dashboard/student/events", icon: CalendarDays },
  { label: "Group Study", href: "/dashboard/student/group", icon: Users },
  { label: "Analytics", href: "/dashboard/student/analytics", icon: BarChart3 },
]

const schedule = [
  { time: "09:00", title: "Data Structures Lecture", type: "Class" },
  { time: "11:00", title: "Team Project Meeting", type: "Meeting" },
  { time: "14:00", title: "Physics Lab", type: "Lab" },
  { time: "16:00", title: "Study Group - Math", type: "Study" },
]

const assignments = [
  { title: "Algorithm Analysis Report", due: "Feb 12", status: "In Progress" },
  { title: "Database Design Project", due: "Feb 15", status: "Not Started" },
  { title: "Physics Problem Set 5", due: "Feb 10", status: "Completed" },
]

const studyData = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 7 },
  { day: "Sat", hours: 2 },
  { day: "Sun", hours: 4 },
]

export default function StudentDashboard() {
  return (
    <DashboardShell navItems={navItems} role="Student" title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} title="Classes Today" value="4" description="Next: Data Structures" />
        <StatCard icon={FileText} title="Pending Assignments" value="5" trend="-2 this week" />
        <StatCard icon={Clock} title="Study Hours" value="31h" description="This week" trend="+12%" />
        <StatCard icon={CheckCircle2} title="Task Completion" value="78%" description="7 of 9 done" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">{"Today's Schedule"}</h3>
          <div className="mt-4 flex flex-col gap-3">
            {schedule.map((item) => (
              <div key={item.time} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <span className="w-14 text-sm font-medium text-primary">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{item.title}</p>
                </div>
                <Badge variant="secondary">{item.type}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Upcoming Assignments</h3>
          <div className="mt-4 flex flex-col gap-3">
            {assignments.map((item) => (
              <div key={item.title} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">Due: {item.due}</p>
                </div>
                <Badge variant={item.status === "Completed" ? "default" : "secondary"}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Study Progress Chart */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Study Progress</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--card-foreground))',
                  }}
                />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion Status */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Task Completion Status</h3>
          <div className="mt-6 flex flex-col gap-5">
            {[
              { label: "Assignments", value: 75 },
              { label: "Projects", value: 60 },
              { label: "Reading", value: 90 },
              { label: "Lab Reports", value: 45 },
            ].map((task) => (
              <div key={task.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-card-foreground">{task.label}</span>
                  <span className="font-medium text-primary">{task.value}%</span>
                </div>
                <Progress value={task.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
