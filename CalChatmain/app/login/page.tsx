"use client"

import React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const roleMap: Record<string, string> = {
      student: "/dashboard/student",
      personal: "/dashboard/personal",
      professional: "/dashboard/professional",
      admin: "/dashboard/admin",
    }
    router.push(roleMap[role] || "/dashboard/student")
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 items-center justify-center bg-primary/5 lg:flex">
        <div className="mx-auto max-w-md px-8 text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <Calendar className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground">Welcome back to CalChat+</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Your AI-powered productivity hub. Pick up right where you left off.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">CalChat+</span>
          </div>

          <h1 className="font-heading text-2xl font-bold text-foreground">Sign in to your account</h1>
          <p className="mt-2 text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/register" className="text-primary hover:underline">Create one</Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="professional">Working Professional</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" size="lg" className="mt-2 w-full">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
