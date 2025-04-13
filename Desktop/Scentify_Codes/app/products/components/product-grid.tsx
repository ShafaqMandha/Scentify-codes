"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { FilterState } from "./product-filters"
import { useWishlist } from "@/lib/wishlist-context"
import { formatCurrency } from "@/lib/format-currency"

// Update the allProducts array to include the specific perfumes
const allProducts = [
  // Unisex Perfumes (4)
  {
    id: 1,
    name: "Haramain Amber Oud", // Keeping as requested
    description:
      "A luxurious oriental fragrance with rich amber, oud, and spicy notes. This opulent scent combines precious woods with warm vanilla and saffron for a truly royal experience.",
    price: 159.99,
    image: "/Haramian Oud.jpg",
    category: "Unisex",
    scentFamily: ["Oriental", "Woody"],
    sizes: ["50ml", "100ml"],
    isNew: true,
  },
  {
    id: 2,
    name: "Ombre Nomad", // Keeping as requested
    description:
      "An exotic journey through the desert with notes of oud, benzoin, and date. This sophisticated fragrance evokes the mystique of Arabian nights with its warm, spicy character.",
    price: 189.99,
    image: "/Ombre Nomad.jpg",
    category: "Unisex",
    scentFamily: ["Oriental", "Spicy"],
    sizes: ["50ml", "100ml", "Travel Size"],
    isNew: true,
  },
  {
    id: 5,
    name: "Baccarat Rouge 540",
    description:
      "A luxurious, warm, and slightly sweet fragrance with amber, woody, and floral notes. This masterpiece by Maison Francis Kurkdjian works beautifully on all genders and has incredible longevity.",
    price: 299.99,
    image: "/Rouge.jpg",
    category: "Unisex",
    scentFamily: ["Oriental", "Woody", "Floral"],
    sizes: ["50ml", "70ml", "200ml"],
    isNew: true,
  },
  {
    id: 6,
    name: "Santal 33",
    description:
      "A modern, earthy fragrance with woody, spicy, and leathery notes. This cult favorite by Le Labo has a unique character that smells different on everyone—in a good way.",
    price: 189.99,
    image: "/Santal.jpg",
    category: "Unisex",
    scentFamily: ["Woody", "Spicy", "Leather"],
    sizes: ["50ml", "100ml"],
    isNew: false,
  },

  // Men's Perfumes (4)
  {
    id: 3,
    name: "I Am The King", // Keeping as requested
    description:
      "A bold and charismatic fragrance with notes of sandalwood, vetiver, and leather. This commanding scent exudes confidence and sophistication for the modern gentleman.",
    price: 129.99,
    image: "/I Am The King.jpg",
    category: "Men",
    scentFamily: ["Woody", "Aromatic"],
    sizes: ["50ml", "100ml"],
    isNew: false,
  },
  {
    id: 7,
    name: "Dior Sauvage",
    description:
      "A bold, rugged, and magnetic fragrance with fresh, spicy, and aromatic notes. This versatile crowd-pleaser combines bergamot and pepper with Sichuan pepper and lavender, finishing with ambroxan and cedar.",
    price: 149.99,
    image: "/Dior.jpg",
    category: "Men",
    scentFamily: ["Fresh", "Spicy", "Aromatic"],
    sizes: ["60ml", "100ml", "200ml"],
    isNew: false,
  },
  {
    id: 8,
    name: "Bleu de Chanel",
    description:
      "A sophisticated and clean woody aromatic fragrance ideal for both everyday wear and formal events. Features grapefruit and lemon top notes, ginger and jasmine heart, with incense, sandalwood, and patchouli base.",
    price: 159.99,
    image: "/Bleu.jpg",
    category: "Men",
    scentFamily: ["Woody", "Aromatic"],
    sizes: ["50ml", "100ml", "150ml"],
    isNew: false,
  },
  {
    id: 9,
    name: "Acqua di Giò Profumo",
    description:
      "An elegant, masculine, and refreshing fragrance with a fresh aquatic profile and smoky twist. Combines bergamot and sea notes with geranium, sage, and rosemary, finishing with incense and patchouli.",
    price: 139.99,
    image: "/ACQUA DI GIÒ.jpg",
    category: "Men",
    scentFamily: ["Fresh", "Aquatic", "Aromatic"],
    sizes: ["40ml", "75ml", "125ml"],
    isNew: false,
  },

  // Women's Perfumes (4)
  {
    id: 4,
    name: "Orchid White", // Keeping as requested
    description:
      "An elegant floral fragrance with delicate notes of white orchid, jasmine, and vanilla. This refined scent captures the pure essence of rare white orchids for a truly feminine experience.",
    price: 149.99,
    image: "/Orchid White.jpg",
    category: "Women",
    scentFamily: ["Floral", "Fresh"],
    sizes: ["30ml", "50ml", "100ml"],
    isNew: true,
  },
  {
    id: 10,
    name: "YSL Libre",
    description:
      "A confident, modern, and elegant floral fragrance perfect for both day and night. Features lavender and mandarin orange top notes, orange blossom and jasmine heart, with vanilla, musk, and cedar base.",
    price: 139.99,
    image: "/YSL Libre.jpg",
    category: "Women",
    scentFamily: ["Floral", "Aromatic"],
    sizes: ["30ml", "50ml", "90ml"],
    isNew: true,
  },
  {
    id: 11,
    name: "Coco Mademoiselle",
    description:
      "A feminine, classy, and timeless oriental floral fragrance great for formal or romantic occasions. Features orange and bergamot top notes, rose and jasmine heart, with patchouli, vetiver, and vanilla base.",
    price: 159.99,
    image: "/Coco.jpg",
    category: "Women",
    scentFamily: ["Oriental", "Floral"],
    sizes: ["35ml", "50ml", "100ml", "200ml"],
    isNew: false,
  },
  {
    id: 12,
    name: "Good Girl",
    description:
      "A glamorous and playful fragrance with a sexy twist in an iconic high heel bottle. Features almond and coffee top notes, tuberose and jasmine sambac heart, with tonka bean and cacao base.",
    price: 129.99,
    image: "/Good Girl.jpg",
    category: "Women",
    scentFamily: ["Floral", "Oriental", "Gourmand"],
    sizes: ["30ml", "50ml", "80ml"],
    isNew: false,
  },
]

type ProductGridProps = {
  filters: FilterState
  searchQuery?: string
}

export default function ProductGrid({ filters, searchQuery = "" }: ProductGridProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [isFiltering, setIsFiltering] = useState(false)
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()

  // Apply filters whenever they change
  useEffect(() => {
    setIsFiltering(true)

    // Simulate a slight delay for filtering to show loading state
    const timer = setTimeout(() => {
      const filtered = allProducts.filter((product) => {
        // Filter by search query
        if (
          searchQuery &&
          !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false
        }

        // Filter by category
        if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
          return false
        }

        // Filter by scent family
        if (
          filters.scentFamilies.length > 0 &&
          !product.scentFamily.some((scent) => filters.scentFamilies.includes(scent))
        ) {
          return false
        }

        // Filter by size
        if (filters.sizes.length > 0 && !product.sizes.some((size) => filters.sizes.includes(size))) {
          return false
        }

        // Filter by price range
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
          return false
        }

        return true
      })

      setFilteredProducts(filtered)
      setIsFiltering(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [filters, searchQuery])

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[1] || product.sizes[0], // Default to 50ml or first available size
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (isFiltering) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden border-0 shadow-sm">
            <div className="animate-pulse">
              <div className="aspect-square bg-muted"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="h-9 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search query to find what you're looking for.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reset All Filters
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
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
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()

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
                }}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-primary text-primary" : ""}`} />
                <span className="sr-only">{isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}</span>
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

