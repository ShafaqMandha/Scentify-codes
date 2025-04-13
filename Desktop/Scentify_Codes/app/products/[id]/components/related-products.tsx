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

// Replace the existing allProducts object with this updated one that matches the store inventory
const allProducts = {
  // Unisex Perfumes
  1: {
    id: 1,
    name: "Haramain Amber Oud",
    description: "A luxurious oriental fragrance with rich amber, oud, and spicy notes",
    price: 159.99,
    image: "/Haramian Oud.jpg",
    category: "Unisex",
    isNew: true,
  },
  2: {
    id: 2,
    name: "Ombre Nomad",
    description: "An exotic journey through the desert with notes of oud, benzoin, and date",
    price: 189.99,
    image: "/Ombre Nomad.jpg",
    category: "Unisex",
    isNew: true,
  },
  3: {
    id: 3,
    name: "I Am The King",
    description: "A bold and charismatic fragrance with notes of sandalwood, vetiver, and leather",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=300&text=I+Am+The+King",
    category: "Men",
    isNew: false,
  },
  4: {
    id: 4,
    name: "Orchid White",
    description: "An elegant floral fragrance with delicate notes of white orchid, jasmine, and vanilla",
    price: 149.99,
    image: "/Orchid White.jpg",
    category: "Women",
    isNew: true,
  },
  5: {
    id: 5,
    name: "Baccarat Rouge 540",
    description: "A luxurious, warm, and slightly sweet fragrance with amber, woody, and floral notes",
    price: 299.99,
    image: "/Rouge.jpg",
    category: "Unisex",
    isNew: true,
  },
  6: {
    id: 6,
    name: "Santal 33",
    description: "A modern, earthy fragrance with woody, spicy, and leathery notes with a cult following",
    price: 189.99,
    image: "/Santal.jpg",
    category: "Unisex",
    isNew: false,
  },
  7: {
    id: 7,
    name: "Dior Sauvage",
    description: "A bold, rugged, and magnetic fragrance with fresh, spicy, and aromatic notes",
    price: 149.99,
    image: "/Dior.jpg",
    category: "Men",
    isNew: false,
  },
  8: {
    id: 8,
    name: "Bleu de Chanel",
    description: "A sophisticated and clean woody aromatic fragrance ideal for both everyday wear and formal events",
    price: 159.99,
    image: "/Bleu.jpg",
    category: "Men",
    isNew: false,
  },
  9: {
    id: 9,
    name: "Acqua di Giò Profumo",
    description: "An elegant, masculine, and refreshing fragrance with a fresh aquatic profile and smoky twist",
    price: 139.99,
    image: "/ACQUA DI GIÒ.jpg",
    category: "Men",
    isNew: false,
  },
  10: {
    id: 10,
    name: "YSL Libre",
    description: "A confident, modern, and elegant floral fragrance perfect for both day and night",
    price: 139.99,
    image: "/YSL Libre.jpg",
    category: "Women",
    isNew: true,
  },
  11: {
    id: 11,
    name: "Coco Mademoiselle",
    description: "A feminine, classy, and timeless oriental floral fragrance great for formal or romantic occasions",
    price: 159.99,
    image: "/Coco.jpg",
    category: "Women",
    isNew: false,
  },
  12: {
    id: 12,
    name: "Good Girl",
    description: "A glamorous and playful fragrance with a sexy twist in an iconic high heel bottle",
    price: 129.99,
    image: "/Good Girl.jpg",
    category: "Women",
    isNew: false,
  },
}

type RelatedProductsProps = {
  productIds: number[]
}

export default function RelatedProducts({ productIds }: RelatedProductsProps) {
  const { addItem } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  const relatedProducts = productIds.map((id) => allProducts[id as keyof typeof allProducts]).filter(Boolean)

  const handleAddToCart = (product: (typeof allProducts)[keyof typeof allProducts]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "50ml", // Default size
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = (product: (typeof allProducts)[keyof typeof allProducts], e: React.MouseEvent) => {
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
      {relatedProducts.map((product) => (
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
                variant={isInWishlist(product.id) ? "default" : "ghost"}
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm z-10"
                onClick={(e) => handleToggleWishlist(product, e)}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              {product.isNew && <Badge className="absolute top-2 left-2">New</Badge>}
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

