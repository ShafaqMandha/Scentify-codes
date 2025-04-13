"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/format-currency"
import { useAuth } from "@/lib/auth-context"

export default function CheckoutPaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const { clearCart, subtotal } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const { isAuthenticated, isLoading: authLoading, user } = useAuth()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in or create an account to proceed with checkout.",
      })
      router.push("/login?returnUrl=/checkout/payment")
    }
  }, [isAuthenticated, authLoading, router, toast])

  // Form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    billingAddress: "same",
  })

  const shipping = 12.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setPaymentInfo((prev) => ({ ...prev, [id]: value }))
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      router.push("/checkout/confirmation")
    }, 2000)
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

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/checkout">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shipping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Payment</h1>
      </div>

      {/* Checkout Steps */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
              <Check className="h-5 w-5" />
            </div>
            <span className="text-sm mt-1">Shipping</span>
          </div>
          <div className="flex-1 h-1 bg-primary"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
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
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

            <Tabs defaultValue="card">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="apple">Apple Pay</TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="pt-6">
                <div className="mb-4">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    className="mt-1"
                    value={paymentInfo.cardName}
                    onChange={handlePaymentInfoChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative mt-1">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentInfoChange}
                      required
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="expiry">Expiration Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="mt-1"
                      value={paymentInfo.expiry}
                      onChange={handlePaymentInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      className="mt-1"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentInfoChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <RadioGroup
                    defaultValue="same"
                    className="mt-2"
                    value={paymentInfo.billingAddress}
                    onValueChange={(value) => setPaymentInfo((prev) => ({ ...prev, billingAddress: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="same" id="same" />
                      <Label htmlFor="same" className="font-normal">
                        Same as shipping address
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="different" id="different" />
                      <Label htmlFor="different" className="font-normal">
                        Use a different billing address
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="paypal" className="pt-6">
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                  <Button>Continue with PayPal</Button>
                </div>
              </TabsContent>

              <TabsContent value="apple" className="pt-6">
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">Complete your purchase with Apple Pay.</p>
                  <Button>Pay with Apple Pay</Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handlePlaceOrder}
                disabled={
                  isProcessing ||
                  !paymentInfo.cardName ||
                  !paymentInfo.cardNumber ||
                  !paymentInfo.expiry ||
                  !paymentInfo.cvv
                }
              >
                {isProcessing ? (
                  <>
                    <span className="mr-2">Processing...</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  </>
                ) : (
                  `Pay ${formatCurrency(total)}`
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-background rounded-lg border p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

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

