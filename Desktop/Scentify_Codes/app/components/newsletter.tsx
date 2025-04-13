"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your API
    setSubmitted(true)
  }

  return (
    <div className="text-center max-w-2xl mx-auto animate-fade-in">
      <h3 className="text-2xl font-bold mb-4 ombre-text">Join Our Newsletter</h3>
      <p className="text-muted-foreground mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>

      {submitted ? (
        <div className="bg-primary/10 p-4 rounded-lg animate-slide-up">
          <p className="text-primary font-medium">Thank you for subscribing! Check your email for a confirmation.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 hover-glow transition-all duration-300 focus:scale-[1.02]"
          />
          <Button type="submit" variant="ombre">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  )
}

