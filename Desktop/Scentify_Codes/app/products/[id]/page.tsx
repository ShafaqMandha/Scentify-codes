"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import RelatedProducts from "./components/related-products"
import { formatCurrency } from "@/lib/format-currency"

// Change the products object to use a single image instead of an array of images
const products = {
  // Unisex Perfumes
  1: {
    id: 1,
    name: "Haramain Amber Oud",
    description:
      "A luxurious oriental fragrance with rich amber, oud, and spicy notes. This opulent scent combines precious woods with warm vanilla and saffron for a truly royal experience. The opening is a captivating blend of saffron and bergamot, leading to a heart of rich amber and oud. The base notes of vanilla, sandalwood, and musk create a warm, lasting impression that's perfect for special occasions.",
    price: 159.99,
    image: "/Haramian Oud.jpg", // Single image instead of array
    category: "Unisex",
    sizes: ["50ml", "100ml"],
    notes: {
      top: ["Saffron", "Bergamot", "Cinnamon"],
      heart: ["Amber", "Oud", "Rose"],
      base: ["Vanilla", "Sandalwood", "Musk"],
    },
    rating: 4.9,
    reviews: 156,
    relatedProducts: [2, 5, 7, 9],
  },
  2: {
    id: 2,
    name: "Ombre Nomad",
    description:
      "An exotic journey through the desert with notes of oud, benzoin, and date. This sophisticated fragrance evokes the mystique of Arabian nights with its warm, spicy character. The opening is a captivating blend of spices and citrus, leading to a heart of rich oud and benzoin. The base notes of date, vanilla, and amber create a warm, lasting impression that's perfect for evening wear.",
    price: 189.99,
    image: "/Ombre Nomad.jpg", // Single image instead of array
    category: "Unisex",
    sizes: ["50ml", "100ml", "Travel Size"],
    notes: {
      top: ["Cardamom", "Ginger", "Bergamot"],
      heart: ["Oud", "Benzoin", "Incense"],
      base: ["Date", "Vanilla", "Amber"],
    },
    rating: 4.8,
    reviews: 124,
    relatedProducts: [1, 5, 7, 9],
  },
  5: {
    id: 5,
    name: "Baccarat Rouge 540",
    description:
      "A luxurious, warm, and slightly sweet fragrance with amber, woody, and floral notes. This masterpiece by Maison Francis Kurkdjian works beautifully on all genders and has incredible longevity. The opening reveals a delicate blend of saffron and jasmine, leading to a heart of rich amberwood and ambergris. The base notes of fir resin and cedar create a sophisticated, lasting impression that's perfect for special occasions and everyday luxury.",
    price: 299.99,
    image: "/Rouge.jpg", // Single image instead of array
    category: "Unisex",
    sizes: ["50ml", "70ml", "200ml"],
    notes: {
      top: ["Saffron", "Jasmine"],
      heart: ["Amberwood", "Ambergris"],
      base: ["Fir Resin", "Cedar"],
    },
    rating: 4.9,
    reviews: 245,
    relatedProducts: [1, 2, 7, 9],
  },
  6: {
    id: 6,
    name: "Santal 33",
    description:
      "A modern, earthy fragrance with woody, spicy, and leathery notes. This cult favorite by Le Labo has a unique character that smells different on everyone—in a good way. The opening features a distinctive blend of cardamom, iris, and violet, leading to a heart of rich sandalwood and papyrus. The base notes of leather, cedar, and musk create a signature scent that's instantly recognizable yet deeply personal.",
    price: 189.99,
    image: "/Santal.jpg", // Single image instead of array
    category: "Unisex",
    sizes: ["50ml", "100ml"],
    notes: {
      top: ["Cardamom", "Iris", "Violet"],
      heart: ["Sandalwood", "Papyrus"],
      base: ["Leather", "Cedar", "Musk"],
    },
    rating: 4.8,
    reviews: 187,
    relatedProducts: [2, 3, 7, 9],
  },

  // Men's Perfumes
  3: {
    id: 3,
    name: "I Am The King",
    description:
      "A bold and charismatic fragrance with notes of sandalwood, vetiver, and leather. This commanding scent exudes confidence and sophistication for the modern gentleman. The opening is a fresh blend of citrus and spices, leading to a heart of rich woods and leather. The base notes of vetiver, amber, and musk create a masculine, lasting impression that's perfect for the confident man.",
    price: 129.99,
    image: "/I Am The King.jpg", // Single image instead of array
    category: "Men",
    sizes: ["50ml", "100ml"],
    notes: {
      top: ["Bergamot", "Black Pepper", "Cardamom"],
      heart: ["Sandalwood", "Leather", "Cedar"],
      base: ["Vetiver", "Amber", "Musk"],
    },
    rating: 4.7,
    reviews: 98,
    relatedProducts: [7, 8, 9, 5],
  },
  7: {
    id: 7,
    name: "Dior Sauvage",
    description:
      "A bold, rugged, and magnetic fragrance that's a versatile crowd-pleaser. This fresh, spicy, and aromatic scent opens with vibrant bergamot and pepper, leading to a heart of Sichuan pepper and lavender. The base notes of ambroxan and cedar create a masculine, long-lasting impression that works for any occasion.",
    price: 149.99,
    image: "/Dior.jpg", // Single image instead of array
    category: "Men",
    sizes: ["60ml", "100ml", "200ml"],
    notes: {
      top: ["Bergamot", "Pepper"],
      heart: ["Sichuan Pepper", "Lavender"],
      base: ["Ambroxan", "Cedar"],
    },
    rating: 4.9,
    reviews: 312,
    relatedProducts: [3, 8, 9, 1],
  },
  8: {
    id: 8,
    name: "Bleu de Chanel",
    description:
      "A sophisticated and clean woody aromatic fragrance ideal for both everyday wear and formal events. This elegant scent opens with bright grapefruit and lemon, leading to a heart of spicy ginger and jasmine. The base notes of incense, sandalwood, and patchouli create a refined, lasting impression that's perfect for the modern gentleman.",
    price: 159.99,
    image: "/Bleu.jpg", // Single image instead of array
    category: "Men",
    sizes: ["50ml", "100ml", "150ml"],
    notes: {
      top: ["Grapefruit", "Lemon"],
      heart: ["Ginger", "Jasmine"],
      base: ["Incense", "Sandalwood", "Patchouli"],
    },
    rating: 4.8,
    reviews: 275,
    relatedProducts: [3, 7, 9, 6],
  },
  9: {
    id: 9,
    name: "Acqua di Giò Profumo",
    description:
      "An elegant, masculine, and refreshing fragrance with a fresh aquatic profile and smoky twist. This mature upgrade from the original Acqua di Giò opens with bergamot and sea notes, leading to a heart of geranium, sage, and rosemary. The base notes of incense and patchouli create a sophisticated, lasting impression that's perfect for the confident man.",
    price: 139.99,
    image: "/ACQUA DI GIÒ.jpg", // Single image instead of array
    category: "Men",
    sizes: ["40ml", "75ml", "125ml"],
    notes: {
      top: ["Bergamot", "Sea Notes"],
      heart: ["Geranium", "Sage", "Rosemary"],
      base: ["Incense", "Patchouli"],
    },
    rating: 4.8,
    reviews: 230,
    relatedProducts: [3, 7, 8, 5],
  },

  // Women's Perfumes
  4: {
    id: 4,
    name: "Orchid White",
    description:
      "An elegant floral fragrance with delicate notes of white orchid, jasmine, and vanilla. This refined scent captures the pure essence of rare white orchids for a truly feminine experience. The opening is a fresh blend of citrus and green notes, leading to a heart of white orchid and jasmine. The base notes of vanilla, musk, and sandalwood create a soft, lasting impression that's perfect for day or evening wear.",
    price: 149.99,
    image: "/Orchid White.jpg", // Single image instead of array
    category: "Women",
    sizes: ["30ml", "50ml", "100ml"],
    notes: {
      top: ["Bergamot", "Green Notes", "Peach"],
      heart: ["White Orchid", "Jasmine", "Lily of the Valley"],
      base: ["Vanilla", "Musk", "Sandalwood"],
    },
    rating: 4.8,
    reviews: 112,
    relatedProducts: [10, 11, 12, 6],
  },
  10: {
    id: 10,
    name: "YSL Libre",
    description:
      "A confident, modern, and elegant floral fragrance perfect for both day and night. This bold scent opens with lavender and mandarin orange, leading to a heart of orange blossom and jasmine. The base notes of vanilla, musk, and cedar create a sophisticated, lasting impression that embodies modern femininity.",
    price: 139.99,
    image: "/YSL Libre.jpg", // Single image instead of array
    category: "Women",
    sizes: ["30ml", "50ml", "90ml"],
    notes: {
      top: ["Lavender", "Mandarin Orange"],
      heart: ["Orange Blossom", "Jasmine"],
      base: ["Vanilla", "Musk", "Cedar"],
    },
    rating: 4.7,
    reviews: 185,
    relatedProducts: [4, 11, 12, 6],
  },
  11: {
    id: 11,
    name: "Coco Mademoiselle",
    description:
      "A feminine, classy, and timeless oriental floral fragrance great for formal or romantic occasions. This sophisticated scent opens with orange and bergamot, leading to a heart of rose and jasmine. The base notes of patchouli, vetiver, and vanilla create an elegant, lasting impression that's perfect for the confident woman.",
    price: 159.99,
    image: "/Coco.jpg", // Single image instead of array
    category: "Women",
    sizes: ["35ml", "50ml", "100ml", "200ml"],
    notes: {
      top: ["Orange", "Bergamot"],
      heart: ["Rose", "Jasmine"],
      base: ["Patchouli", "Vetiver", "Vanilla"],
    },
    rating: 4.9,
    reviews: 245,
    relatedProducts: [4, 10, 12, 1],
  },
  12: {
    id: 12,
    name: "Good Girl",
    description:
      "A glamorous and playful fragrance with a sexy twist in an iconic high heel bottle. This warm floral scent opens with almond and coffee, leading to a heart of tuberose and jasmine sambac. The base notes of tonka bean and cacao create a sensual, lasting impression that's perfect for evening wear and special occasions.",
    price: 129.99,
    image: "/Good Girl.jpg", // Single image instead of array
    category: "Women",
    sizes: ["30ml", "50ml", "80ml"],
    notes: {
      top: ["Almond", "Coffee"],
      heart: ["Tuberose", "Jasmine Sambac"],
      base: ["Tonka Bean", "Cacao"],
    },
    rating: 4.8,
    reviews: 198,
    relatedProducts: [4, 10, 11, 6],
  },
}

// Update the product details section to use a single image instead of multiple images
// Remove the selectedImage state and the image gallery
export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = products[productId as keyof typeof products] || products[1]

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0])
  const { addItem } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (${selectedSize}) has been added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
    })
  }

  const handleToggleWishlist = () => {
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this amazing fragrance: ${product.name}`,
          url: window.location.href,
        })
      } catch (error) {
        toast({
          title: "Sharing failed",
          description: "Could not share this product.",
          variant: "destructive",
        })
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
      })
    }
  }

  return (
    <div className="container py-10">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/products" className="text-muted-foreground hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href={`/products/category/${product.category.toLowerCase()}`}
          className="text-muted-foreground hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span>{product.name}</span>
      </div>

      {/* Update the product image section to show only a single image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image - Single image instead of gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold font-ui text-foreground dark:text-white mb-6">
            {formatCurrency(product.price)}
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Size</h3>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className="rounded-full px-6"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="rounded-full" onClick={decreaseQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 font-medium">{quantity}</span>
              <Button variant="outline" size="icon" className="rounded-full" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={handleBuyNow} asChild>
              <Link href="/checkout">Buy Now</Link>
            </Button>
            <Button
              size="icon"
              variant={isInWishlist(product.id) ? "default" : "outline"}
              onClick={handleToggleWishlist}
            >
              <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
            </Button>
            <Button size="icon" variant="outline" onClick={handleShare}>
              <Share className="h-5 w-5" />
            </Button>
          </div>

          <Separator className="my-6" />

          <Tabs defaultValue="description">
            <TabsList className="w-full">
              <TabsTrigger value="description" className="flex-1">
                Description
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">
                Notes
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="notes" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Top Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.top.map((note) => (
                      <Badge key={note} variant="outline">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Heart Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.heart.map((note) => (
                      <Badge key={note} variant="outline">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Base Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.base.map((note) => (
                      <Badge key={note} variant="outline">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <p className="text-center text-muted-foreground py-8">Customer reviews will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <RelatedProducts productIds={product.relatedProducts} />
      </div>
    </div>
  )
}

