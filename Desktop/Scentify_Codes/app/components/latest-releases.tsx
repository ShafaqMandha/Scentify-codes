"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/format-currency"

const latestReleases = [
  {
    id: 5,
    name: "Baccarat Rouge 540",
    description:
      "A luxurious, warm, and slightly sweet fragrance with amber, woody, and floral notes by Maison Francis Kurkdjian",
    price: 299.99,
    image: "/Rouge.jpg",
    category: "Unisex",
    isNew: true,
  },
  {
    id: 6,
    name: "Santal 33",
    description: "A modern, earthy fragrance with woody, spicy, and leathery notes by Le Labo with a cult following",
    price: 189.99,
    image: "/Santal.jpg",
    category: "Unisex",
    isNew: true,
  },
  {
    id: 10,
    name: "YSL Libre",
    description: "A confident, modern, and elegant floral fragrance perfect for both day and night.",
    price: 139.99,
    image: "/YSL Libre.jpg",
    category: "Women",
    isNew: true,
  },
  {
    id: 9,
    name: "Acqua di Giò Profumo",
    description: "An elegant, masculine, and refreshing fragrance with a fresh aquatic profile and smoky twist.",
    price: 139.99,
    image: "/ACQUA DI GIÒ.jpg",
    category: "Men",
    isNew: true,
  },
]

export default function LatestReleases() {
  const { addItem } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof latestReleases)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "50ml", // Default size
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent, product: (typeof latestReleases)[0]) => {
    e.preventDefault()
    e.stopPropagation()

    const isCurrentlyInWishlist = isInWishlist(product.id)

    if (isCurrentlyInWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {latestReleases.map((product) => (
        <Card key={product.id} className="overflow-hidden border-0 shadow-sm">
          <Link href={`/products/${product.id}`}>
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm z-10"
                onClick={(e) => handleToggleWishlist(e, product)}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-primary text-primary" : ""}`} />
                <span className="sr-only">{isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}</span>
              </Button>
              {product.isNew && (
                <Badge className="absolute top-2 left-2" variant="secondary">
                  Just Launched
                </Badge>
              )}
            </div>
          </Link>
          <CardContent className="pt-4">
            <Link href={`/products/${product.id}`} className="hover:underline">
              <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
              <h3 className="font-medium text-lg mb-1">{product.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="font-semibold font-ui text-foreground dark:text-white">{formatCurrency(product.price)}</div>
            <Button size="sm" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

