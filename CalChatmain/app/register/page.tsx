"use client"

import React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState("")
  const [agreed, setAgreed] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!agreed) return
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
          <h2 className="font-heading text-3xl font-bold text-foreground">Join CalChat+</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Start your journey to smarter productivity. Set up your account in seconds.
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

          <h1 className="font-heading text-2xl font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create password" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" placeholder="Confirm password" required />
              </div>
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
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
              />
              <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                I agree to the <Link href="#" className="text-primary hover:underline">Terms & Conditions</Link> and{" "}
                <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>
            <Button type="submit" size="lg" className="mt-2 w-full" disabled={!agreed}>
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
