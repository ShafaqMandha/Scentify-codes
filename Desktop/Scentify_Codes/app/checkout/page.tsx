"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/format-currency"
import { useAuth } from "@/lib/auth-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, isLoading } = useCart()
  const { toast } = useToast()
  const { isAuthenticated, isLoading: authLoading, user } = useAuth()

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in or create an account to proceed with checkout.",
      })
      router.push("/login?returnUrl=/checkout")
    } else if (user) {
      // Pre-fill the form with user data
      setShippingInfo((prevState) => ({
        ...prevState,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zip: user.zip || "",
        country: user.country || "",
        phone: user.phone || "",
      }))
    }
  }, [isAuthenticated, authLoading, router, toast, user])

  const shipping = items.length > 0 ? 12.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [id]: value }))
  }

  const handleContinueToPayment = () => {
    // Validate form
    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.email ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zip ||
      !shippingInfo.country
    ) {
      toast({
        title: "Please fill in all required fields",
        description: "All fields except phone number are required.",
        variant: "destructive",
      })
      return
    }

    // Save shipping info to session storage
    sessionStorage.setItem("shippingInfo", JSON.stringify(shippingInfo))

    // Navigate to payment page
    router.push("/checkout/payment")
  }

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-muted-foreground">Verifying your account...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, the useEffect will redirect
  // Don't render anything while redirecting
  if (!isAuthenticated) {
    return null
  }

  // Redirect if cart is empty
  if (!isLoading && items.length === 0) {
    return (
      <div className="container py-10">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Button size="lg" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-muted mb-4"></div>
            <div className="h-4 w-48 bg-muted rounded mb-2"></div>
            <div className="h-3 w-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      {/* Checkout Steps */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
              <span>1</span>
            </div>
            <span className="text-sm mt-1">Shipping</span>
          </div>
          <div className="flex-1 h-1 bg-muted"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
              <span>2</span>
            </div>
            <span className="text-sm mt-1">Payment</span>
          </div>
          <div className="flex-1 h-1 bg-muted"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
              <span>3</span>
            </div>
            <span className="text-sm mt-1">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-background rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  className="mt-1"
                  value={shippingInfo.firstName}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  className="mt-1"
                  value={shippingInfo.lastName}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                className="mt-1"
                value={shippingInfo.email}
                onChange={handleShippingInfoChange}
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                className="mt-1"
                value={shippingInfo.address}
                onChange={handleShippingInfoChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  className="mt-1"
                  value={shippingInfo.city}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  id="state"
                  className="mt-1"
                  value={shippingInfo.state}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="zip">Zip/Postal Code *</Label>
                <Input
                  id="zip"
                  className="mt-1"
                  value={shippingInfo.zip}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                className="mt-1"
                value={shippingInfo.country}
                onChange={handleShippingInfoChange}
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" className="mt-1" value={shippingInfo.phone} onChange={handleShippingInfoChange} />
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={handleContinueToPayment}>Continue to Payment</Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-background rounded-lg border p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-summary`} className="flex items-center">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

