"use client"

import { TrendingUp, Clock, CheckCircle2, Target } from "lucide-react"
import { StatCard } from "./stat-card"
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, Radar,
} from "recharts"

const productivityData = [
  { day: "Mon", score: 72, tasks: 8, hours: 6.5 },
  { day: "Tue", score: 85, tasks: 12, hours: 7.2 },
  { day: "Wed", score: 68, tasks: 6, hours: 5.8 },
  { day: "Thu", score: 91, tasks: 14, hours: 8.1 },
  { day: "Fri", score: 79, tasks: 10, hours: 6.9 },
  { day: "Sat", score: 55, tasks: 4, hours: 3.2 },
  { day: "Sun", score: 60, tasks: 5, hours: 3.8 },
]

const timeUsageData = [
  { name: "Meetings", value: 25, color: "hsl(var(--chart-1))" },
  { name: "Deep Work", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Communication", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Planning", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Break", value: 15, color: "hsl(var(--chart-5))" },
]

const weeklyPerformance = [
  { week: "W1", completed: 18, total: 22 },
  { week: "W2", completed: 24, total: 28 },
  { week: "W3", completed: 15, total: 20 },
  { week: "W4", completed: 28, total: 30 },
  { week: "W5", completed: 22, total: 25 },
  { week: "W6", completed: 30, total: 32 },
]

const taskCompletionData = [
  { month: "Sep", rate: 72 },
  { month: "Oct", rate: 78 },
  { month: "Nov", rate: 82 },
  { month: "Dec", rate: 75 },
  { month: "Jan", rate: 88 },
  { month: "Feb", rate: 92 },
]

const skillsData = [
  { subject: "Focus", A: 85 },
  { subject: "Speed", A: 72 },
  { subject: "Quality", A: 90 },
  { subject: "Teamwork", A: 78 },
  { subject: "Planning", A: 82 },
  { subject: "Creativity", A: 68 },
]

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--card-foreground))',
}

export function AnalyticsView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} title="Productivity Score" value="85%" trend="+7% vs last month" />
        <StatCard icon={Clock} title="Avg. Focus Time" value="5.8h" description="Per day" trend="+0.5h" />
        <StatCard icon={CheckCircle2} title="Task Completion" value="92%" trend="+4% this week" />
        <StatCard icon={Target} title="Weekly Goal" value="28/30" description="Tasks completed" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Productivity Score */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Productivity Score</h3>
          <p className="mt-1 text-sm text-muted-foreground">Daily productivity score this week</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.15)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Usage */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Time Usage Graph</h3>
          <p className="mt-1 text-sm text-muted-foreground">How your time is distributed</p>
          <div className="mt-4 flex items-center gap-6">
            <div className="h-56 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {timeUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3">
              {timeUsageData.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Completion Rate */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Task Completion Rate</h3>
          <p className="mt-1 text-sm text-muted-foreground">Monthly task completion trend</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Performance */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground">Weekly Performance Summary</h3>
          <p className="mt-1 text-sm text-muted-foreground">Completed vs total tasks each week</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyPerformance}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="week" tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} className="text-xs" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="total" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Total" />
                <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
