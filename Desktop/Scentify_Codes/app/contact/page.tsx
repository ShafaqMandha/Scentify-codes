"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon!",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Have questions about our products or need assistance? We're here to help. Fill out the form below and our team
        will get back to you as soon as possible.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-muted/30 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1" />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1" />
            </div>

            <div>
              <Label>Subject</Label>
              <RadioGroup value={formData.subject} onValueChange={handleRadioChange} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="general" />
                  <Label htmlFor="general" className="font-normal">
                    General Inquiry
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="product" id="product" />
                  <Label htmlFor="product" className="font-normal">
                    Product Question
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="order" id="order" />
                  <Label htmlFor="order" className="font-normal">
                    Order Support
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="font-normal">
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 min-h-[150px]"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2">Sending...</span>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Visit Our Store</h3>
                <p className="text-muted-foreground mt-1">
                  Middlesex University Dubai
                  <br />
                  Knowledge Village, Dubai
                  <br />
                  Block 16
                </p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Opening Hours:</span>
                  <br />
                  Monday - Friday: 10:00 AM - 8:00 PM
                  <br />
                  Saturday: 10:00 AM - 6:00 PM
                  <br />
                  Sunday: 12:00 PM - 5:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Call Us</h3>
                <p className="text-muted-foreground mt-1">
                  Customer Service: +971 (50) 123-4567
                  <br />
                  Order Support: +971 (50) 987-6543
                </p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Hours of Operation:</span>
                  <br />
                  Monday - Friday: 9:00 AM - 6:00 PM 
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Email Us</h3>
                <p className="text-muted-foreground mt-1">
                  General Inquiries: info@scentify.com
                  <br />
                  Customer Support: support@scentify.com
                  <br />
                  Wholesale: wholesale@scentify.com
                </p>
                <p className="text-sm mt-2">We aim to respond to all emails within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

