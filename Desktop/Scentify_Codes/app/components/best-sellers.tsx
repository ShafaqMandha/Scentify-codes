"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/format-currency"

const bestSellers = [
  {
    id: 7,
    name: "Dior Sauvage",
    description:
      "A bold, rugged, and magnetic fragrance with fresh, spicy, and aromatic notes. A versatile crowd-pleaser.",
    price: 149.99,
    image: "/Dior.jpg",
    category: "Men",
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 11,
    name: "Coco Mademoiselle",
    description: "A feminine, classy, and timeless oriental floral fragrance great for formal or romantic occasions.",
    price: 159.99,
    image: "/Coco.jpg",
    category: "Women",
    rating: 4.9,
    reviews: 245,
  },
  {
    id: 5,
    name: "Baccarat Rouge 540",
    description:
      "A luxurious, warm, and slightly sweet fragrance with amber, woody, and floral notes by Maison Francis Kurkdjian",
    price: 299.99,
    image: "/Rouge.jpg",
    category: "Unisex",
    rating: 4.9,
    reviews: 245,
  },
  {
    id: 8,
    name: "Bleu de Chanel",
    description: "A sophisticated and clean woody aromatic fragrance ideal for both everyday wear and formal events.",
    price: 159.99,
    image: "/Bleu.jpg",
    category: "Men",
    rating: 4.8,
    reviews: 275,
  },
]

export default function BestSellers() {
  const { addItem } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof bestSellers)[0]) => {
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

  const handleToggleWishlist = (e: React.MouseEvent, product: (typeof bestSellers)[0]) => {
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
      {bestSellers.map((product) => (
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
              <Badge className="absolute top-2 left-2" variant="default">
                Best Seller
              </Badge>
            </div>
          </Link>
          <CardContent className="pt-4">
            <Link href={`/products/${product.id}`} className="hover:underline">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
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

