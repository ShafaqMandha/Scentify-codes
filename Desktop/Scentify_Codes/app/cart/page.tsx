"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/format-currency"
import { useAuth } from "@/lib/auth-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, isLoading } = useCart()
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  // Calculate totals
  const shipping = items.length > 0 ? 12.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Empty cart state
  const isEmpty = items.length === 0

  const handleRemoveItem = (id: number, size: string, name: string) => {
    removeItem(id, size)
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const handleApplyPromo = () => {
    setIsApplyingPromo(true)
    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false)
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive",
      })
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
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
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {isEmpty ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any fragrances to your cart yet.</p>
          <Button size="lg" asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-background rounded-lg border p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-6 text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <Separator className="mb-6 md:hidden" />

              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-muted-foreground md:hidden flex items-center mt-1"
                          onClick={() => handleRemoveItem(item.id, item.size, item.name)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-center">
                      <div className="flex items-center border rounded-full">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="col-span-2 text-center hidden md:block">{formatCurrency(item.price)}</div>

                    <div className="col-span-2 flex justify-between md:justify-end items-center">
                      <span className="md:hidden">Total:</span>
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>

                  <div className="flex justify-end mt-2 hidden md:flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-muted-foreground"
                      onClick={() => handleRemoveItem(item.id, item.size, item.name)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>

                  <Separator className="my-6" />
                </div>
              ))}

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" asChild className="flex items-center">
                  <Link href="/products">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>

                <Button variant="outline" size="sm" className="flex items-center" onClick={handleClearCart}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
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

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Promo Code</div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      className="h-9"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9"
                      onClick={handleApplyPromo}
                      disabled={!promoCode || isApplyingPromo}
                    >
                      {isApplyingPromo ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">{isAuthenticated ? "Proceed to Checkout" : "Sign in to Checkout"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

