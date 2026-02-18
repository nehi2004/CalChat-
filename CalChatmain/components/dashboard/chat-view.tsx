"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, Clock, Trash2, Plus, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your CalChat+ AI assistant. I can help you manage your calendar, create tasks, analyze your productivity, and more. How can I help you today?",
    timestamp: "10:00 AM",
  },
]

const SUGGESTED_PROMPTS = [
  "Schedule a meeting for tomorrow at 2 PM",
  "What's on my calendar today?",
  "Create a task list for my project",
  "Analyze my productivity this week",
  "Help me plan a study schedule",
  "Set a reminder for next Monday",
]

const CHAT_HISTORY: ChatSession[] = [
  { id: "1", title: "Calendar Planning", lastMessage: "Here's your schedule for next week...", timestamp: "Today" },
  { id: "2", title: "Task Organization", lastMessage: "I've created 5 tasks for your project...", timestamp: "Yesterday" },
  { id: "3", title: "Study Schedule", lastMessage: "Based on your exams, I recommend...", timestamp: "Feb 7" },
  { id: "4", title: "Meeting Notes", lastMessage: "Summary of your team standup...", timestamp: "Feb 6" },
  { id: "5", title: "Productivity Tips", lastMessage: "Here are 5 ways to improve...", timestamp: "Feb 5" },
]

const AI_RESPONSES: Record<string, string> = {
  "schedule": "I'd be happy to help you schedule that! I've added a new event to your calendar. You can view it in the Calendar tab. Would you like me to set a reminder as well?",
  "calendar": "Looking at your calendar for today, you have:\n\n- 9:00 AM: Sprint Planning\n- 10:00 AM: Team Standup\n- 2:00 PM: Design Review\n- 4:00 PM: Client Call\n\nYou have a free slot from 11:00 AM to 2:00 PM. Would you like to schedule something?",
  "task": "I've organized your tasks by priority:\n\n**High Priority:**\n- Finalize Q1 Report (due Feb 12)\n- Prepare Team Demo (due Feb 14)\n\n**Medium Priority:**\n- Review Marketing Strategy\n- Update Documentation\n\nWould you like me to set deadlines and reminders for these?",
  "productivity": "Here's your productivity analysis for this week:\n\n- Tasks Completed: 12/15 (80%)\n- Focus Time: 18 hours\n- Meetings Attended: 6\n- Productivity Score: 85%\n\nYou're doing great! Your most productive hours are between 9 AM and 12 PM. I recommend scheduling deep work during those hours.",
  "study": "Based on your upcoming exams and deadlines, here's a suggested study plan:\n\n**Monday:** Data Structures (2 hrs)\n**Tuesday:** Database Design (2 hrs)\n**Wednesday:** Physics Review (1.5 hrs)\n**Thursday:** Algorithm Practice (2 hrs)\n**Friday:** Mock Tests (3 hrs)\n\nWould you like me to add these to your calendar?",
  "reminder": "I've set a reminder for next Monday. You'll receive a notification at 9:00 AM. Is there anything specific you'd like the reminder to say?",
}

function getAIResponse(message: string): string {
  const lower = message.toLowerCase()
  for (const [key, response] of Object.entries(AI_RESPONSES)) {
    if (lower.includes(key)) return response
  }
  return "That's a great question! Let me help you with that. Based on your calendar and tasks, I recommend focusing on your highest priority items first. Would you like me to help you organize your schedule, create tasks, or analyze your productivity patterns?"
}

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeChatId, setActiveChatId] = useState("new")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSend(text?: string) {
    const content = text || input
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(content),
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1200)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-border bg-card">
      {/* Chat History Sidebar */}
      <div className={cn(
        "flex w-64 shrink-0 flex-col border-r border-border bg-muted/30 transition-all",
        sidebarOpen ? "translate-x-0" : "-translate-x-full absolute lg:relative lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="font-heading text-sm font-semibold text-foreground">Chat History</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
            setMessages(INITIAL_MESSAGES)
            setActiveChatId("new")
          }}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1 p-2">
            {CHAT_HISTORY.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={cn(
                  "flex flex-col gap-1 rounded-lg p-3 text-left transition-colors",
                  activeChatId === chat.id
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate text-sm font-medium">{chat.title}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{chat.lastMessage}</p>
                <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  msg.role === "assistant" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                )}>
                  {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={cn(
                  "flex max-w-[75%] flex-col gap-1",
                  msg.role === "user" ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}>
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                  <span className="px-1 text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl bg-muted px-4 py-3">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Suggested Prompts */}
        {messages.length <= 1 && (
          <div className="border-t border-border px-4 py-3">
            <div className="mx-auto flex max-w-3xl flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping} size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
