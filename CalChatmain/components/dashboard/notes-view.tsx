"use client"

import { useState } from "react"
import { Plus, Search, StickyNote, Trash2, Edit2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface Note {
  id: string
  title: string
  content: string
  category: string
  date: string
  color: string
}

const INITIAL_NOTES: Note[] = [
  { id: "1", title: "Sprint Planning Notes", content: "Key takeaways from sprint planning:\n- Focus on user auth module\n- Complete API documentation\n- Fix mobile responsiveness issues\n- Review PR #234", category: "Work", date: "Feb 9", color: "border-l-primary" },
  { id: "2", title: "Client Requirements", content: "Client needs:\n1. Dashboard redesign\n2. Report export functionality\n3. Multi-language support\n4. SSO integration", category: "Client", date: "Feb 8", color: "border-l-accent" },
  { id: "3", title: "Architecture Ideas", content: "Consider microservices architecture for the new payment module. Benefits:\n- Better scalability\n- Independent deployments\n- Fault isolation", category: "Ideas", date: "Feb 7", color: "border-l-chart-4" },
  { id: "4", title: "Meeting Notes - Design Review", content: "Design team proposed:\n- New color scheme (green/teal)\n- Simplified navigation\n- Dark mode support\n- Accessibility improvements", category: "Meeting", date: "Feb 6", color: "border-l-chart-5" },
  { id: "5", title: "Learning Resources", content: "Useful links:\n- React Server Components docs\n- Next.js 16 migration guide\n- TypeScript best practices\n- Tailwind CSS v4 changes", category: "Learning", date: "Feb 5", color: "border-l-chart-3" },
  { id: "6", title: "Personal Goals Q1", content: "1. Complete AWS certification\n2. Contribute to 2 open source projects\n3. Launch side project\n4. Read 5 tech books", category: "Personal", date: "Feb 4", color: "border-l-primary" },
]

export function NotesView() {
  const [notes, setNotes] = useState(INITIAL_NOTES)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [newNote, setNewNote] = useState({ title: "", content: "", category: "Work" })

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  )

  function handleAddNote() {
    if (!newNote.title) return
    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      date: "Just now",
      color: "border-l-primary",
    }
    setNotes([note, ...notes])
    setNewNote({ title: "", content: "", category: "Work" })
    setDialogOpen(false)
  }

  function handleDeleteNote(id: string) {
    setNotes(notes.filter((n) => n.id !== id))
    if (selectedNote?.id === id) setSelectedNote(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Notes</h2>
          <p className="mt-1 text-sm text-muted-foreground">{notes.length} notes</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Note</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input
                  placeholder="Note title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Content</Label>
                <Textarea
                  placeholder="Write your note..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={6}
                />
              </div>
              <Button onClick={handleAddNote}>Save Note</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            onClick={() => setSelectedNote(note)}
            className={cn(
              "cursor-pointer rounded-xl border border-l-4 bg-card p-5 transition-all hover:shadow-md",
              note.color,
              selectedNote?.id === note.id && "ring-2 ring-primary"
            )}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-heading text-sm font-semibold text-card-foreground">{note.title}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id) }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground whitespace-pre-line">{note.content}</p>
            <div className="mt-3 flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">{note.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {note.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">No notes found</p>
      )}
    </div>
  )
}
