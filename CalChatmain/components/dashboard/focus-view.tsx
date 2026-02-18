"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Coffee, Brain, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const FOCUS_MODES = [
  { label: "Pomodoro", focusMinutes: 25, breakMinutes: 5, icon: Brain },
  { label: "Deep Work", focusMinutes: 50, breakMinutes: 10, icon: Brain },
  { label: "Short Sprint", focusMinutes: 15, breakMinutes: 3, icon: Brain },
]

const AMBIENT_SOUNDS = [
  "Rain", "Forest", "Ocean", "Cafe", "White Noise", "Silence",
]

export function FocusView() {
  const [mode, setMode] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [seconds, setSeconds] = useState(FOCUS_MODES[0].focusMinutes * 60)
  const [sessions, setSessions] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [activeSound, setActiveSound] = useState("Rain")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentMode = FOCUS_MODES[mode]
  const totalSeconds = isBreak ? currentMode.breakMinutes * 60 : currentMode.focusMinutes * 60
  const progressPercent = ((totalSeconds - seconds) / totalSeconds) * 100

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s - 1)
      }, 1000)
    } else if (seconds === 0) {
      if (!isBreak) {
        setSessions((s) => s + 1)
        setIsBreak(true)
        setSeconds(currentMode.breakMinutes * 60)
      } else {
        setIsBreak(false)
        setSeconds(currentMode.focusMinutes * 60)
        setIsRunning(false)
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, seconds, isBreak, currentMode])

  function handleReset() {
    setIsRunning(false)
    setIsBreak(false)
    setSeconds(currentMode.focusMinutes * 60)
  }

  function handleModeChange(index: number) {
    setMode(index)
    setIsRunning(false)
    setIsBreak(false)
    setSeconds(FOCUS_MODES[index].focusMinutes * 60)
  }

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="flex flex-col gap-6">
      {/* Mode Selection */}
      <div className="grid gap-4 sm:grid-cols-3">
        {FOCUS_MODES.map((m, i) => (
          <button
            key={m.label}
            onClick={() => handleModeChange(i)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-6 transition-all",
              mode === i
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card hover:border-primary/30"
            )}
          >
            <m.icon className={cn("h-6 w-6", mode === i ? "text-primary" : "text-muted-foreground")} />
            <span className="font-heading text-sm font-semibold text-card-foreground">{m.label}</span>
            <span className="text-xs text-muted-foreground">{m.focusMinutes}min focus / {m.breakMinutes}min break</span>
          </button>
        ))}
      </div>

      {/* Timer */}
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 rounded-2xl border border-border bg-card p-10">
        <div className="text-center">
          <span className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium",
            isBreak
              ? "bg-accent/10 text-accent"
              : "bg-primary/10 text-primary"
          )}>
            {isBreak ? <><Coffee className="h-4 w-4" /> Break Time</> : <><Brain className="h-4 w-4" /> Focus Time</>}
          </span>
        </div>

        <div className="relative flex h-56 w-56 items-center justify-center">
          <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="4"
            />
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke={isBreak ? "hsl(var(--accent))" : "hsl(var(--primary))"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercent / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="text-center">
            <span className="font-heading text-5xl font-bold tabular-nums text-card-foreground">
              {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="h-12 w-12 rounded-full bg-transparent"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button
            size="lg"
            onClick={() => setIsRunning(!isRunning)}
            className="h-14 w-14 rounded-full p-0"
          >
            {isRunning ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="h-12 w-12 rounded-full bg-transparent"
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sessions Counter */}
        <div className="flex items-center gap-6 text-center">
          <div>
            <p className="font-heading text-2xl font-bold text-card-foreground">{sessions}</p>
            <p className="text-xs text-muted-foreground">Sessions</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="font-heading text-2xl font-bold text-card-foreground">{sessions * currentMode.focusMinutes}m</p>
            <p className="text-xs text-muted-foreground">Total Focus</p>
          </div>
        </div>
      </div>

      {/* Ambient Sounds */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-semibold text-card-foreground">Ambient Sounds</h3>
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {AMBIENT_SOUNDS.map((sound) => (
            <button
              key={sound}
              onClick={() => { setActiveSound(sound); setSoundEnabled(true) }}
              className={cn(
                "rounded-lg border p-3 text-center text-sm transition-all",
                activeSound === sound && soundEnabled
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              {sound}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
