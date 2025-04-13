"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/format-currency"

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist, isLoading } = useWishlist()
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleRemoveItem = (id: number, name: string) => {
    removeFromWishlist(id)
    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist.`,
    })
  }

  const handleClearWishlist = () => {
    clearWishlist()
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  const handleAddToCart = (item: (typeof items)[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: "50ml", // Default size
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  // Empty wishlist state
  const isEmpty = items.length === 0

  if (isLoading) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
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
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

      {isEmpty ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any fragrances to your wishlist yet.
          </p>
          <Button size="lg" asChild>
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <Link href="/products" className="text-sm flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
            <Button variant="outline" size="sm" className="flex items-center" onClick={handleClearWishlist}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm">
                <div className="relative aspect-square">
                  <Link href={`/products/${item.id}`}>
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm"
                    onClick={() => handleRemoveItem(item.id, item.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>
                </div>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">{item.category}</div>
                  <Link href={`/products/${item.id}`} className="hover:underline">
                    <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                  </Link>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{formatCurrency(item.price)}</div>
                    <Button size="sm" onClick={() => handleAddToCart(item)}>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

