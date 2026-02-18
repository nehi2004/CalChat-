"use client"

import {
  LayoutDashboard, Calendar, MessageSquare, CheckCircle2, Focus, BarChart3,
  Sun, Target, TrendingUp, Bell
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatCard } from "@/components/dashboard/stat-card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const navItems = [
  { label: "Dashboard", href: "/dashboard/personal", icon: LayoutDashboard },
  { label: "Calendar", href: "/dashboard/personal/calendar", icon: Calendar },
  { label: "AI Chat", href: "/dashboard/personal/chat", icon: MessageSquare },
  { label: "Tasks", href: "/dashboard/personal/tasks", icon: CheckCircle2 },
  { label: "Focus Mode", href: "/dashboard/personal/focus", icon: Focus },
  { label: "Analytics", href: "/dashboard/personal/analytics", icon: BarChart3 },
]

const dailyPlan = [
  { time: "06:30", title: "Morning Exercise", category: "Health" },
  { time: "08:00", title: "Breakfast & Journal", category: "Wellness" },
  { time: "10:00", title: "Grocery Shopping", category: "Errand" },
  { time: "14:00", title: "Read 30 pages", category: "Learning" },
  { time: "17:00", title: "Cook Dinner", category: "Health" },
]

const habits = [
  { name: "Meditation", streak: 14, completed: true },
  { name: "Exercise", streak: 7, completed: true },
  { name: "Reading", streak: 21, completed: false },
  { name: "Journaling", streak: 10, completed: false },
  { name: "Hydration", streak: 30, completed: true },
]

const productivityData = [
  { day: "Mon", score: 72 },
  { day: "Tue", score: 85 },
  { day: "Wed", score: 68 },
  { day: "Thu", score: 91 },
  { day: "Fri", score: 79 },
  { day: "Sat", score: 55 },
  { day: "Sun", score: 60 },
]

const reminders = [
  { title: "Dentist Appointment", date: "Feb 11, 2:00 PM", priority: "High" },
  { title: "Pay Electricity Bill", date: "Feb 14", priority: "Medium" },
  { title: "Call Mom", date: "Feb 10, 6:00 PM", priority: "Low" },
  { title: "Renew Gym Membership", date: "Feb 16", priority: "Medium" },
]

export default function PersonalDashboard() {
  return (
    <DashboardShell navItems={navItems} role="Personal" title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Sun} title="Daily Tasks" value="6/9" description="On track" trend="+2 ahead" />
        <StatCard icon={Target} title="Habits Streak" value="14 days" description="Longest: 30 days" />
        <StatCard icon={TrendingUp} title="Productivity Score" value="82%" trend="+5% vs last week" />
        <StatCard icon={Bell} title="Reminders" value="4" description="2 today" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Daily Planner */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Daily Planner</h3>
          <div className="mt-4 flex flex-col gap-3">
            {dailyPlan.map((item) => (
              <div key={item.time} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <span className="w-14 text-sm font-medium text-primary">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{item.title}</p>
                </div>
                <Badge variant="secondary">{item.category}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Habit Tracker */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Habit Tracker</h3>
          <div className="mt-4 flex flex-col gap-3">
            {habits.map((habit) => (
              <div key={habit.name} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${habit.completed ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{habit.name}</p>
                  <p className="text-xs text-muted-foreground">{habit.streak} day streak</p>
                </div>
                <Badge variant={habit.completed ? "default" : "secondary"}>
                  {habit.completed ? "Done" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity Score */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Productivity Score</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--card-foreground))',
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Upcoming Reminders</h3>
          <div className="mt-4 flex flex-col gap-3">
            {reminders.map((reminder) => (
              <div key={reminder.title} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{reminder.title}</p>
                  <p className="text-xs text-muted-foreground">{reminder.date}</p>
                </div>
                <Badge variant={reminder.priority === "High" ? "destructive" : "secondary"}>
                  {reminder.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
