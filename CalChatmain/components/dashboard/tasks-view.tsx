"use client"

import { useState } from "react"
import {
  Plus, Trash2, Edit2, Check, X, Clock, AlertCircle, CheckCircle2, Circle,
  Flag, Calendar as CalendarIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  status: "Todo" | "In Progress" | "Completed"
  deadline: string
  category: string
}

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Finalize Q1 Report", description: "Complete and submit the quarterly report", priority: "High", status: "In Progress", deadline: "Feb 12", category: "Work" },
  { id: "2", title: "Review Marketing Strategy", description: "Analyze campaign performance and propose changes", priority: "Medium", status: "Todo", deadline: "Feb 15", category: "Work" },
  { id: "3", title: "Update Documentation", description: "Add new API endpoints to docs", priority: "Low", status: "Todo", deadline: "Feb 18", category: "Development" },
  { id: "4", title: "Prepare Team Demo", description: "Create slides and rehearse for Friday demo", priority: "High", status: "In Progress", deadline: "Feb 14", category: "Presentation" },
  { id: "5", title: "Fix Login Bug", description: "Resolve authentication issue on mobile devices", priority: "High", status: "Completed", deadline: "Feb 9", category: "Development" },
  { id: "6", title: "Design New Landing Page", description: "Create mockups for the redesign", priority: "Medium", status: "Todo", deadline: "Feb 20", category: "Design" },
  { id: "7", title: "Schedule Team Building", description: "Plan next team outing event", priority: "Low", status: "Completed", deadline: "Feb 8", category: "Social" },
  { id: "8", title: "Write Unit Tests", description: "Increase test coverage for core modules", priority: "Medium", status: "In Progress", deadline: "Feb 16", category: "Development" },
]

const PRIORITY_COLORS: Record<string, string> = {
  High: "destructive",
  Medium: "secondary",
  Low: "outline",
}

export function TasksView() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState({
    title: "", description: "", priority: "Medium" as Task["priority"], deadline: "", category: "Work",
  })

  const completedCount = tasks.filter((t) => t.status === "Completed").length
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length
  const todoCount = tasks.filter((t) => t.status === "Todo").length
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  function handleAddTask() {
    if (!newTask.title) return
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: "Todo",
      deadline: newTask.deadline || "No deadline",
      category: newTask.category,
    }
    setTasks([task, ...tasks])
    setNewTask({ title: "", description: "", priority: "Medium", deadline: "", category: "Work" })
    setDialogOpen(false)
  }

  function handleDeleteTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  function handleToggleStatus(id: string) {
    setTasks(tasks.map((t) => {
      if (t.id !== id) return t
      const nextStatus: Record<string, Task["status"]> = {
        "Todo": "In Progress",
        "In Progress": "Completed",
        "Completed": "Todo",
      }
      return { ...t, status: nextStatus[t.status] }
    }))
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "Completed": return <CheckCircle2 className="h-4 w-4 text-primary" />
      case "In Progress": return <Clock className="h-4 w-4 text-accent" />
      default: return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  function renderTaskList(filteredTasks: Task[]) {
    if (filteredTasks.length === 0) {
      return <p className="py-8 text-center text-sm text-muted-foreground">No tasks found</p>
    }
    return (
      <div className="flex flex-col gap-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md",
              task.status === "Completed" && "opacity-70"
            )}
          >
            <button onClick={() => handleToggleStatus(task.id)} className="shrink-0">
              {getStatusIcon(task.status)}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={cn(
                  "text-sm font-medium text-card-foreground",
                  task.status === "Completed" && "line-through"
                )}>
                  {task.title}
                </p>
                <Badge variant={PRIORITY_COLORS[task.priority] as "destructive" | "secondary" | "outline"} className="text-xs">
                  {task.priority}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground truncate">{task.description}</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarIcon className="h-3 w-3" /> {task.deadline}
                </span>
                <Badge variant="outline" className="text-xs bg-transparent">{task.category}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => handleDeleteTask(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress Overview */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Tasks</p>
          <p className="mt-1 font-heading text-2xl font-bold text-card-foreground">{tasks.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">To Do</p>
          <p className="mt-1 font-heading text-2xl font-bold text-card-foreground">{todoCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="mt-1 font-heading text-2xl font-bold text-accent">{inProgressCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="mt-1 font-heading text-2xl font-bold text-primary">{completedCount}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">Overall Progress</span>
          <span className="text-sm font-bold text-primary">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-3" />
      </div>

      {/* Header + Add Button */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-foreground">Task List</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Input
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Priority</Label>
                  <Select value={newTask.priority} onValueChange={(v) => setNewTask({ ...newTask, priority: v as Task["priority"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Deadline</Label>
                  <Input
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select value={newTask.category} onValueChange={(v) => setNewTask({ ...newTask, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Presentation">Presentation</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddTask} className="mt-2">Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
          <TabsTrigger value="todo">To Do ({todoCount})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({inProgressCount})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {renderTaskList(tasks)}
        </TabsContent>
        <TabsContent value="todo" className="mt-4">
          {renderTaskList(tasks.filter((t) => t.status === "Todo"))}
        </TabsContent>
        <TabsContent value="progress" className="mt-4">
          {renderTaskList(tasks.filter((t) => t.status === "In Progress"))}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {renderTaskList(tasks.filter((t) => t.status === "Completed"))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
