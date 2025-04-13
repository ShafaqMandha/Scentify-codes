"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, User, CreditCard, LogOut, ChevronRight, Edit2, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/format-currency"
import { useAuth } from "@/lib/auth-context"
import ProtectedRoute from "@/components/protected-route"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Replace the existing mock order data with this updated version
// Mock order data
const orders = [
  {
    id: "ORD-12345",
    date: "March 15, 2025",
    status: "Delivered",
    total: 349.98,
    items: [
      {
        id: 1,
        name: "Haramain Amber Oud",
        price: 159.99,
        quantity: 1,
        size: "50ml",
        image: "/Haramian Oud.jpg",
      },
      {
        id: 5,
        name: "Baccarat Rouge 540",
        price: 299.99,
        quantity: 1,
        size: "50ml",
        image: "/Rouge.jpg",
      },
    ],
  },
  {
    id: "ORD-12346",
    date: "February 28, 2025",
    status: "Delivered",
    total: 189.99,
    items: [
      {
        id: 2,
        name: "Ombre Nomad",
        price: 189.99,
        quantity: 1,
        size: "50ml",
        image: "/Ombre Nomad.jpg",
      },
    ],
  },
  {
    id: "ORD-12347",
    date: "January 10, 2025",
    status: "Delivered",
    total: 269.98,
    items: [
      {
        id: 7,
        name: "Dior Sauvage",
        price: 149.99,
        quantity: 1,
        size: "100ml",
        image: "/Dior.jpg",
      },
      {
        id: 10,
        name: "YSL Libre",
        price: 139.99,
        quantity: 1,
        size: "50ml",
        image: "/YSL Libre",
      },
    ],
  },
]

// Payment method type
type PaymentMethod = {
  id: string
  type: "credit" | "debit"
  cardNumber: string
  cardName: string
  expiryDate: string
  isDefault: boolean
}

export default function ProfilePage() {
  const { toast } = useToast()
  const { user, logout, updateUserProfile } = useAuth()
  const [activeTab, setActiveTab] = useState("orders")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [newPaymentMethod, setNewPaymentMethod] = useState<Omit<PaymentMethod, "id">>({
    type: "credit",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    isDefault: false,
  })
  const [isAddingPayment, setIsAddingPayment] = useState(false)
  const [paymentFormErrors, setPaymentFormErrors] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
  })

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zip: user.zip || "",
        country: user.country || "",
      })
    }
  }, [user])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setProfileData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSaveProfile = () => {
    updateUserProfile(profileData)
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleLogout = () => {
    logout()
  }

  // Payment method handlers
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPaymentMethod((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (paymentFormErrors[name as keyof typeof paymentFormErrors]) {
      setPaymentFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCardTypeChange = (value: "credit" | "debit") => {
    setNewPaymentMethod((prev) => ({ ...prev, type: value }))
  }

  const handleDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPaymentMethod((prev) => ({ ...prev, isDefault: e.target.checked }))
  }

  const validatePaymentForm = (): boolean => {
    const errors = {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
    }

    let isValid = true

    if (!newPaymentMethod.cardNumber) {
      errors.cardNumber = "Card number is required"
      isValid = false
    } else if (!/^\d{16}$/.test(newPaymentMethod.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Please enter a valid 16-digit card number"
      isValid = false
    }

    if (!newPaymentMethod.cardName) {
      errors.cardName = "Name on card is required"
      isValid = false
    }

    if (!newPaymentMethod.expiryDate) {
      errors.expiryDate = "Expiry date is required"
      isValid = false
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(newPaymentMethod.expiryDate)) {
      errors.expiryDate = "Please use MM/YY format"
      isValid = false
    }

    setPaymentFormErrors(errors)
    return isValid
  }

  const handleAddPaymentMethod = () => {
    if (!validatePaymentForm()) return

    // Format card number to show only last 4 digits
    const maskedCardNumber = `•••• •••• •••• ${newPaymentMethod.cardNumber.slice(-4)}`

    const newMethod: PaymentMethod = {
      id: `card-${Date.now()}`,
      ...newPaymentMethod,
      cardNumber: maskedCardNumber,
    }

    // If this is set as default, update other cards
    let updatedMethods = [...paymentMethods]
    if (newMethod.isDefault) {
      updatedMethods = updatedMethods.map((method) => ({
        ...method,
        isDefault: false,
      }))
    }

    // If this is the first card, make it default
    if (updatedMethods.length === 0) {
      newMethod.isDefault = true
    }

    setPaymentMethods([...updatedMethods, newMethod])

    // Reset form
    setNewPaymentMethod({
      type: "credit",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      isDefault: false,
    })

    setIsAddingPayment(false)

    toast({
      title: "Payment method added",
      description: "Your payment method has been saved successfully.",
    })
  }

  const handleRemovePaymentMethod = (id: string) => {
    const methodToRemove = paymentMethods.find((method) => method.id === id)
    const wasDefault = methodToRemove?.isDefault

    let updatedMethods = paymentMethods.filter((method) => method.id !== id)

    // If we removed the default method and there are other methods, make the first one default
    if (wasDefault && updatedMethods.length > 0) {
      updatedMethods = [{ ...updatedMethods[0], isDefault: true }, ...updatedMethods.slice(1)]
    }

    setPaymentMethods(updatedMethods)

    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully.",
    })
  }

  const handleSetDefaultPaymentMethod = (id: string) => {
    const updatedMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }))

    setPaymentMethods(updatedMethods)

    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully.",
    })
  }

  // Format card number with spaces as user types
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  return (
    <ProtectedRoute>
      <div className="container py-10 bg-background">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col items-center p-6 bg-muted/30 rounded-lg">
              <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 bg-muted">
                <Image
                  src="/Shafaq_Pic.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <h2 className="font-semibold text-lg">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{profileData.email}</p>
            </div>

            <nav className="flex flex-col space-y-1">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "orders"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Package className="h-4 w-4 mr-3 flex-shrink-0" />
                My Orders
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "profile"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <User className="h-4 w-4 mr-3 flex-shrink-0" />
                Personal Information
              </button>

              <button
                onClick={() => setActiveTab("payment")}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "payment"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <CreditCard className="h-4 w-4 mr-3 flex-shrink-0" />
                Payment Methods
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors mt-4"
              >
                <LogOut className="h-4 w-4 mr-3 flex-shrink-0" />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div>
            {activeTab === "orders" && (
              <div className="bg-background rounded-lg border">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order History</h2>

                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                      <Button asChild>
                        <Link href="/products">Start Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-muted/30 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">Order {order.id}</h3>
                                <span
                                  className={`ml-3 text-xs px-2 py-1 rounded-full ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                      : order.status === "Processing"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">Placed on {order.date}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 flex items-center">
                              <span className="font-medium mr-4">{formatCurrency(order.total)}</span>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/orders/${order.id}`}>
                                  View Details
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {order.items.map((item) => (
                                <div key={`${order.id}-${item.id}`} className="flex items-center">
                                  <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <h4 className="font-medium text-sm">{item.name}</h4>
                                    <p className="text-xs text-muted-foreground">
                                      {item.size} • Qty: {item.quantity}
                                    </p>
                                    <p className="text-sm mt-1">{formatCurrency(item.price)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-background rounded-lg border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? (
                      "Cancel"
                    ) : (
                      <>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>

                {isEditing ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSaveProfile()
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="mt-1"
                      />
                    </div>

                    <Separator className="my-4" />

                    <h3 className="font-medium">Shipping Address</h3>

                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={profileData.city}
                          onChange={handleProfileChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          name="state"
                          value={profileData.state}
                          onChange={handleProfileChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">Zip/Postal Code</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={profileData.zip}
                          onChange={handleProfileChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={profileData.country}
                        onChange={handleProfileChange}
                        className="mt-1"
                      />
                    </div>

                    <div className="pt-4">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                        <p>
                          {profileData.firstName} {profileData.lastName}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
                        <p>{profileData.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                        <p>{profileData.phone}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3">Shipping Address</h3>
                      <p className="text-muted-foreground">
                        {profileData.address}
                        <br />
                        {profileData.city}, {profileData.state} {profileData.zip}
                        <br />
                        {profileData.country}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "payment" && (
              <div className="bg-background rounded-lg border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                  <Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardType">Card Type</Label>
                          <RadioGroup
                            value={newPaymentMethod.type}
                            onValueChange={(value) => handleCardTypeChange(value as "credit" | "debit")}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="credit" id="credit" />
                              <Label htmlFor="credit">Credit Card</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="debit" id="debit" />
                              <Label htmlFor="debit">Debit Card</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={newPaymentMethod.cardName}
                            onChange={handlePaymentMethodChange}
                          />
                          {paymentFormErrors.cardName && (
                            <p className="text-sm text-destructive">{paymentFormErrors.cardName}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={newPaymentMethod.cardNumber}
                            onChange={(e) => {
                              const formattedValue = formatCardNumber(e.target.value)
                              setNewPaymentMethod((prev) => ({ ...prev, cardNumber: formattedValue }))

                              // Clear error when user types
                              if (paymentFormErrors.cardNumber) {
                                setPaymentFormErrors((prev) => ({ ...prev, cardNumber: "" }))
                              }
                            }}
                            maxLength={19} // 16 digits + 3 spaces
                            placeholder="1234 5678 9012 3456"
                          />
                          {paymentFormErrors.cardNumber && (
                            <p className="text-sm text-destructive">{paymentFormErrors.cardNumber}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={newPaymentMethod.expiryDate}
                            onChange={handlePaymentMethodChange}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {paymentFormErrors.expiryDate && (
                            <p className="text-sm text-destructive">{paymentFormErrors.expiryDate}</p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <input
                            type="checkbox"
                            id="isDefault"
                            checked={newPaymentMethod.isDefault}
                            onChange={handleDefaultChange}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor="isDefault" className="font-normal">
                            Set as default payment method
                          </Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleAddPaymentMethod}>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {paymentMethods.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No payment methods saved</h3>
                    <p className="text-muted-foreground mb-4">You haven't saved any payment methods yet.</p>
                    <Button onClick={() => setIsAddingPayment(true)}>Add Payment Method</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-2 rounded-full mr-3">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium">{method.type === "credit" ? "Credit Card" : "Debit Card"}</p>
                                {method.isDefault && (
                                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{method.cardNumber}</p>
                              <p className="text-sm">
                                {method.cardName} • Expires {method.expiryDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {!method.isDefault && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetDefaultPaymentMethod(method.id)}
                              >
                                Set as Default
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => handleRemovePaymentMethod(method.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

