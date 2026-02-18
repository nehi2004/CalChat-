"use client"

import { CalendarDays, Clock, MapPin, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const EVENTS = [
  { id: "1", title: "Tech Conference 2026", date: "Feb 15, 2026", time: "9:00 AM - 5:00 PM", location: "Convention Center", attendees: 250, type: "Conference", status: "Upcoming" },
  { id: "2", title: "Team Building Workshop", date: "Feb 18, 2026", time: "2:00 PM - 4:00 PM", location: "Office Floor 3", attendees: 20, type: "Workshop", status: "Upcoming" },
  { id: "3", title: "Product Launch Webinar", date: "Feb 20, 2026", time: "10:00 AM - 11:30 AM", location: "Online (Zoom)", attendees: 100, type: "Webinar", status: "Upcoming" },
  { id: "4", title: "Quarterly Review", date: "Feb 22, 2026", time: "3:00 PM - 5:00 PM", location: "Board Room", attendees: 15, type: "Review", status: "Upcoming" },
  { id: "5", title: "Networking Mixer", date: "Feb 25, 2026", time: "6:00 PM - 9:00 PM", location: "Downtown Lounge", attendees: 50, type: "Social", status: "Upcoming" },
  { id: "6", title: "Hackathon", date: "Feb 8, 2026", time: "9:00 AM - 9:00 PM", location: "Innovation Lab", attendees: 40, type: "Competition", status: "Completed" },
]

export function EventsView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Events</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage and view your upcoming events</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {EVENTS.map((event) => (
          <div key={event.id} className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold text-card-foreground">{event.title}</h3>
                <div className="mt-3 flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" /> {event.date}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> {event.time}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {event.location}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" /> {event.attendees} attendees
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={event.status === "Completed" ? "secondary" : "default"}>{event.status}</Badge>
                <Badge variant="outline" className="bg-transparent">{event.type}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
