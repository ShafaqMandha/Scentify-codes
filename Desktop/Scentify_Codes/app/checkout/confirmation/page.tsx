"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle, Package, Truck, CreditCard, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/format-currency"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState("")
  // Add user to the destructured values from useAuth
  const { isAuthenticated, isLoading: authLoading, user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in or create an account to view order confirmation.",
      })
      router.push("/login?returnUrl=/checkout/confirmation")
    }
  }, [isAuthenticated, authLoading, router, toast])

  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderNumber(randomOrderNumber)
  }, [])

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

  return (
    <div className="container py-10 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
      </div>

      <div className="bg-background rounded-lg border p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Order Details</h2>
            <p className="text-muted-foreground">Order #{orderNumber}</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="text-sm text-muted-foreground">A confirmation email has been sent to your email address.</p>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-start mb-2">
                <Home className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <h3 className="font-medium">Shipping Address</h3>
              </div>
              {/* Update the shipping address section to use the user's information */}
              <p className="text-sm text-muted-foreground">
                {user?.firstName} {user?.lastName}
                <br />
                {user?.address || "123 Main Street"}
                <br />
                {user?.city || "New York"}, {user?.state || "NY"} {user?.zip || "10001"}
                <br />
                {user?.country || "United States"}
              </p>
            </div>

            <div>
              <div className="flex items-start mb-2">
                <CreditCard className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <h3 className="font-medium">Payment Method</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Credit Card ending in 3456
                <br />
                Billing address same as shipping
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-start mb-4">
              <Truck className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <h3 className="font-medium">Shipping Method</h3>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-medium">Standard Shipping</h4>
                  <p className="text-sm text-muted-foreground">Estimated delivery: 3-5 business days</p>
                </div>
                <span className="text-sm font-medium">{formatCurrency(12.99)}</span>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="ml-2 text-sm font-medium">Order Placed</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
                <div className="ml-3 h-6 w-px bg-border"></div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="ml-2 text-sm">Processing</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1-2 days</span>
                </div>
                <div className="ml-3 h-6 w-px bg-border"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="ml-2 text-sm">Shipped</span>
                  </div>
                  <span className="text-xs text-muted-foreground">3-5 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/profile">View Order History</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}

