"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  color: string
  type: string
}

const MOCK_EVENTS: CalendarEvent[] = [
  { id: "1", title: "Sprint Planning", date: "2026-02-09", time: "09:00", color: "bg-primary", type: "Meeting" },
  { id: "2", title: "Team Standup", date: "2026-02-09", time: "10:00", color: "bg-accent", type: "Meeting" },
  { id: "3", title: "Design Review", date: "2026-02-10", time: "14:00", color: "bg-chart-4", type: "Review" },
  { id: "4", title: "Client Call", date: "2026-02-11", time: "11:00", color: "bg-chart-5", type: "Call" },
  { id: "5", title: "Project Deadline", date: "2026-02-12", time: "17:00", color: "bg-destructive", type: "Deadline" },
  { id: "6", title: "Lunch Meeting", date: "2026-02-13", time: "12:30", color: "bg-primary", type: "Meeting" },
  { id: "7", title: "Workshop", date: "2026-02-14", time: "09:00", color: "bg-accent", type: "Event" },
  { id: "8", title: "Team Retrospective", date: "2026-02-15", time: "15:00", color: "bg-chart-3", type: "Meeting" },
  { id: "9", title: "Hackathon", date: "2026-02-16", time: "09:00", color: "bg-chart-4", type: "Event" },
  { id: "10", title: "1-on-1", date: "2026-02-17", time: "10:00", color: "bg-primary", type: "Meeting" },
]

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1))
  const [view, setView] = useState<"monthly" | "weekly" | "daily">("monthly")
  const [events, setEvents] = useState(MOCK_EVENTS)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "", date: "", time: "", type: "Meeting", reminder: true,
  })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const today = new Date()

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1))
  }
  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  function getEventsForDate(dateStr: string) {
    return events.filter((e) => e.date === dateStr)
  }

  function handleAddEvent() {
    if (!newEvent.title || !newEvent.date) return
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time || "09:00",
      color: "bg-primary",
      type: newEvent.type,
    }
    setEvents([...events, event])
    setNewEvent({ title: "", date: "", time: "", type: "Meeting", reminder: true })
    setDialogOpen(false)
  }

  // Generate calendar grid
  const calendarDays = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d)
  }

  // Get current week days for weekly view
  const currentDay = today.getDate()
  const currentDayOfWeek = today.getDay()
  const weekStart = new Date(today)
  weekStart.setDate(currentDay - currentDayOfWeek)

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })

  const hours = Array.from({ length: 12 }, (_, i) => i + 7)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={prevMonth} className="bg-transparent">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-heading text-xl font-bold text-foreground">
            {MONTHS[month]} {year}
          </h2>
          <Button variant="outline" size="icon" onClick={nextMonth} className="bg-transparent">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={view} onValueChange={(v) => setView(v as "monthly" | "weekly" | "daily")}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex flex-col gap-2">
                  <Label>Event Title</Label>
                  <Input
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Type</Label>
                  <Select value={newEvent.type} onValueChange={(v) => setNewEvent({ ...newEvent, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Deadline">Deadline</SelectItem>
                      <SelectItem value="Call">Call</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Set Reminder</Label>
                  <Switch
                    checked={newEvent.reminder}
                    onCheckedChange={(c) => setNewEvent({ ...newEvent, reminder: c })}
                  />
                </div>
                <Button onClick={handleAddEvent} className="mt-2">Add Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Monthly View */}
      {view === "monthly" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-7">
            {DAYS.map((day) => (
              <div key={day} className="border-b border-border p-3 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarDays.map((day, i) => {
              const dateStr = day
                ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                : ""
              const dayEvents = day ? getEventsForDate(dateStr) : []
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

              return (
                <div
                  key={i}
                  className={cn(
                    "min-h-24 border-b border-r border-border p-2 transition-colors last:border-r-0",
                    day ? "hover:bg-muted/30" : "bg-muted/10",
                  )}
                >
                  {day && (
                    <>
                      <span
                        className={cn(
                          "inline-flex h-7 w-7 items-center justify-center rounded-full text-sm",
                          isToday ? "bg-primary text-primary-foreground font-bold" : "text-card-foreground",
                        )}
                      >
                        {day}
                      </span>
                      <div className="mt-1 flex flex-col gap-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={cn("truncate rounded px-1.5 py-0.5 text-xs font-medium text-primary-foreground", event.color)}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Weekly View */}
      {view === "weekly" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-8">
            <div className="border-b border-r border-border p-3" />
            {weekDays.map((d) => {
              const isToday = d.toDateString() === today.toDateString()
              return (
                <div
                  key={d.toISOString()}
                  className={cn(
                    "border-b border-r border-border p-3 text-center last:border-r-0",
                    isToday && "bg-primary/5"
                  )}
                >
                  <p className="text-xs text-muted-foreground">{DAYS[d.getDay()]}</p>
                  <p className={cn("text-lg font-semibold", isToday ? "text-primary" : "text-card-foreground")}>
                    {d.getDate()}
                  </p>
                </div>
              )
            })}
          </div>
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8">
              <div className="border-b border-r border-border p-2 text-right text-xs text-muted-foreground">
                {`${String(hour).padStart(2, "0")}:00`}
              </div>
              {weekDays.map((d) => {
                const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
                const hourEvents = getEventsForDate(dateStr).filter(
                  (e) => Number.parseInt(e.time.split(":")[0]) === hour
                )
                return (
                  <div key={d.toISOString()} className="border-b border-r border-border p-1 last:border-r-0 min-h-12">
                    {hourEvents.map((event) => (
                      <div
                        key={event.id}
                        className={cn("rounded px-1.5 py-1 text-xs font-medium text-primary-foreground", event.color)}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {/* Daily View */}
      {view === "daily" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border p-4">
            <h3 className="font-heading text-lg font-semibold text-card-foreground">
              {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </h3>
          </div>
          {hours.map((hour) => {
            const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
            const hourEvents = getEventsForDate(dateStr).filter(
              (e) => Number.parseInt(e.time.split(":")[0]) === hour
            )
            return (
              <div key={hour} className="flex border-b border-border last:border-b-0">
                <div className="w-20 shrink-0 border-r border-border p-3 text-right text-sm text-muted-foreground">
                  {`${String(hour).padStart(2, "0")}:00`}
                </div>
                <div className="flex-1 p-2 min-h-14">
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-3 rounded-lg bg-primary/10 p-3"
                    >
                      <div className={cn("h-10 w-1 rounded-full", event.color)} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">{event.title}</p>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {event.time}
                          </span>
                          <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
