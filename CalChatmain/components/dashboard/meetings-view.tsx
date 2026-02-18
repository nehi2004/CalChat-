"use client"

import { Video, Plus, Clock, Users, Calendar, Link as LinkIcon, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const UPCOMING_MEETINGS = [
  { id: "1", title: "Sprint Planning", date: "Feb 10, 2026", time: "9:00 AM - 10:00 AM", attendees: ["Alice", "Bob", "Carol", "David", "Eve", "Frank", "Grace", "Henry"], type: "Team", link: "#", organizer: "You" },
  { id: "2", title: "Client Presentation", date: "Feb 10, 2026", time: "11:30 AM - 12:30 PM", attendees: ["Client A", "Client B", "You", "Manager"], type: "Client", link: "#", organizer: "Manager" },
  { id: "3", title: "1-on-1 with Manager", date: "Feb 10, 2026", time: "2:00 PM - 2:30 PM", attendees: ["You", "Manager"], type: "Personal", link: "#", organizer: "Manager" },
  { id: "4", title: "Design Review", date: "Feb 11, 2026", time: "10:00 AM - 11:00 AM", attendees: ["Design Lead", "You", "Dev Lead", "PM", "QA"], type: "Review", link: "#", organizer: "Design Lead" },
  { id: "5", title: "All Hands", date: "Feb 12, 2026", time: "3:00 PM - 4:00 PM", attendees: ["Everyone"], type: "Company", link: "#", organizer: "CEO" },
]

const PAST_MEETINGS = [
  { id: "6", title: "Retrospective", date: "Feb 7, 2026", time: "3:00 PM - 4:00 PM", attendees: ["Team"], type: "Team", notes: "Discussed sprint velocity improvements" },
  { id: "7", title: "Budget Review", date: "Feb 6, 2026", time: "10:00 AM - 11:00 AM", attendees: ["Finance", "You", "Manager"], type: "Finance", notes: "Q1 budget approved" },
  { id: "8", title: "Project Kickoff", date: "Feb 5, 2026", time: "9:00 AM - 10:30 AM", attendees: ["New Team"], type: "Project", notes: "New project timeline established" },
]

export function MeetingsView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Meetings</h2>
          <p className="mt-1 text-sm text-muted-foreground">Schedule and manage your meetings</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Schedule Meeting
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="mt-1 font-heading text-2xl font-bold text-card-foreground">3</p>
          <p className="text-xs text-muted-foreground">meetings</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-sm text-muted-foreground">This Week</p>
          <p className="mt-1 font-heading text-2xl font-bold text-primary">8</p>
          <p className="text-xs text-muted-foreground">meetings</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-sm text-muted-foreground">Hours in Meetings</p>
          <p className="mt-1 font-heading text-2xl font-bold text-accent">12.5h</p>
          <p className="text-xs text-muted-foreground">this week</p>
        </div>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({UPCOMING_MEETINGS.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({PAST_MEETINGS.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <div className="flex flex-col gap-4">
            {UPCOMING_MEETINGS.map((meeting) => (
              <div key={meeting.id} className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading text-base font-semibold text-card-foreground">{meeting.title}</h3>
                      <Badge variant="secondary">{meeting.type}</Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" /> {meeting.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" /> {meeting.time}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" /> {meeting.attendees.length} attendees
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Organized by {meeting.organizer}</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Video className="h-4 w-4" /> Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <div className="flex flex-col gap-4">
            {PAST_MEETINGS.map((meeting) => (
              <div key={meeting.id} className="rounded-xl border border-border bg-card p-5 opacity-80">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading text-base font-semibold text-card-foreground">{meeting.title}</h3>
                      <Badge variant="outline" className="bg-transparent">{meeting.type}</Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" /> {meeting.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" /> {meeting.time}
                      </span>
                    </div>
                    {meeting.notes && (
                      <p className="mt-2 text-sm text-muted-foreground">Notes: {meeting.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
