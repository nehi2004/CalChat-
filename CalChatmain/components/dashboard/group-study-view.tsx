"use client"

import { useState } from "react"
import { Users, MessageSquare, Plus, Video, BookOpen, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const GROUPS = [
  { id: "1", name: "Data Structures Study Group", members: 8, topic: "Trees & Graphs", active: true },
  { id: "2", name: "Physics Lab Partners", members: 4, topic: "Quantum Mechanics", active: false },
  { id: "3", name: "Algorithm Challenge", members: 12, topic: "Dynamic Programming", active: true },
  { id: "4", name: "Database Design Team", members: 6, topic: "Normalization", active: false },
]

const CHAT_MESSAGES = [
  { id: "1", sender: "Alice", message: "Has anyone finished the binary tree assignment?", time: "10:30 AM", avatar: "A" },
  { id: "2", sender: "Bob", message: "I'm stuck on the AVL rotation part. Can someone explain?", time: "10:32 AM", avatar: "B" },
  { id: "3", sender: "Carol", message: "Here's a great resource: check the lecture notes from week 5", time: "10:35 AM", avatar: "C" },
  { id: "4", sender: "You", message: "I found that drawing it out really helps with rotations", time: "10:38 AM", avatar: "Y" },
  { id: "5", sender: "David", message: "Can we schedule a video call tonight to go through it together?", time: "10:40 AM", avatar: "D" },
  { id: "6", sender: "Alice", message: "Sure! 8 PM works for me", time: "10:42 AM", avatar: "A" },
]

export function GroupStudyView() {
  const [activeGroup, setActiveGroup] = useState("1")
  const [message, setMessage] = useState("")

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-border bg-card">
      {/* Groups List */}
      <div className="flex w-72 shrink-0 flex-col border-r border-border">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="font-heading text-sm font-semibold text-foreground">Study Groups</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1 p-2">
            {GROUPS.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
                className={cn(
                  "flex flex-col gap-1 rounded-lg p-3 text-left transition-colors",
                  activeGroup === group.id
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{group.name}</span>
                  {group.active && <span className="flex h-2 w-2 rounded-full bg-primary" />}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" /> {group.members} members
                </div>
                <Badge variant="secondary" className="mt-1 w-fit text-xs">{group.topic}</Badge>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Data Structures Study Group</h3>
            <p className="text-xs text-muted-foreground">8 members online</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Video className="h-4 w-4" /> Video Call
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <BookOpen className="h-4 w-4" /> Resources
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-4">
            {CHAT_MESSAGES.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.sender === "You" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  msg.sender === "You" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                )}>
                  {msg.avatar}
                </div>
                <div className={cn(
                  "flex max-w-[70%] flex-col gap-1",
                  msg.sender === "You" ? "items-end" : "items-start"
                )}>
                  <span className="text-xs font-medium text-muted-foreground">{msg.sender}</span>
                  <div className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm",
                    msg.sender === "You"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}>
                    {msg.message}
                  </div>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button size="icon" disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
