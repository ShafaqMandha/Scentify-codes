"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader2, ArrowRight, RefreshCw, Wind, Droplets, FlaskRoundIcon as Flask } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

// Helper function to format prices consistently
const formatPrice = (price: number): string => {
  return `${price.toFixed(2)} AED`
}

// Replace the existing detectedScent constant with this array of perfumes
const perfumeSequence = [
  {
    id: 1,
    name: "Haramain Amber Oud",
    description:
      "A luxurious oriental fragrance with rich amber, oud, and spicy notes. This opulent scent combines precious woods with warm vanilla and saffron for a truly royal experience.",
    price: 159.99,
    image: "/Haramian Oud.jpg",
    category: "Unisex",
    notes: {
      top: ["Saffron", "Bergamot", "Cinnamon"],
      heart: ["Amber", "Oud", "Rose"],
      base: ["Vanilla", "Sandalwood", "Musk"],
    },
    sizes: ["50ml", "100ml"],
    similarityScore: 98,
  },
  {
    id: 3,
    name: "I Am The King",
    description:
      "A bold and charismatic fragrance with notes of sandalwood, vetiver, and leather. This commanding scent exudes confidence and sophistication for the modern gentleman.",
    price: 129.99,
    image: "/I Am The King.jpg",
    category: "Men",
    notes: {
      top: ["Bergamot", "Black Pepper", "Cardamom"],
      heart: ["Sandalwood", "Leather", "Cedar"],
      base: ["Vetiver", "Amber", "Musk"],
    },
    sizes: ["50ml", "100ml"],
    similarityScore: 96,
  },
  {
    id: 2,
    name: "Ombre Nomad",
    description:
      "An exotic journey through the desert with notes of oud, benzoin, and date. This sophisticated fragrance evokes the mystique of Arabian nights with its warm, spicy character.",
    price: 189.99,
    image: "/Ombre Nomad.jpg",
    category: "Unisex",
    notes: {
      top: ["Cardamom", "Ginger", "Bergamot"],
      heart: ["Oud", "Benzoin", "Incense"],
      base: ["Date", "Vanilla", "Amber"],
    },
    sizes: ["50ml", "100ml", "Travel Size"],
    similarityScore: 95,
  },
  {
    id: 4,
    name: "Orchid White",
    description:
      "An elegant floral fragrance with delicate notes of white orchid, jasmine, and vanilla. This refined scent captures the pure essence of rare white orchids for a truly feminine experience.",
    price: 149.99,
    image: "/Orchid White.jpg",
    category: "Women",
    notes: {
      top: ["Bergamot", "Green Notes", "Peach"],
      heart: ["White Orchid", "Jasmine", "Lily of the Valley"],
      base: ["Vanilla", "Musk", "Sandalwood"],
    },
    sizes: ["30ml", "50ml", "100ml"],
    similarityScore: 94,
  },
]

export default function ScentFinderPage() {
  const [sensingState, setSensingState] = useState<"initial" | "sensing" | "processing" | "results">("initial")
  const [sensorReadings, setSensorReadings] = useState<{ [key: string]: number }>({
    "MQ-3": 0, // Alcohol sensor
    "MQ-4": 0, // Methane/combustible gases sensor
    "MQ-135": 0, // Air quality/VOC sensor
  })
  const [sensingProgress, setSensingProgress] = useState(0)
  const { toast } = useToast()
  const { addItem } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  // Add this state to track the current perfume index
  const [currentPerfumeIndex, setCurrentPerfumeIndex] = useState(0)

  // Get the current perfume from the sequence
  const detectedScent = perfumeSequence[currentPerfumeIndex]

  // Update the recommended scents based on the current perfume
  const getRecommendedScents = (currentId: number) => {
    // Filter out the current perfume and get up to 3 others
    return perfumeSequence
      .filter((perfume) => perfume.id !== currentId)
      .map((perfume) => ({
        id: perfume.id,
        name: perfume.name,
        description: perfume.description,
        price: perfume.price,
        image: perfume.image || "/placeholder.svg?height=400&width=300",
        category: perfume.category,
        similarityScore: Math.floor(Math.random() * 15) + 80, // Random score between 80-95
      }))
      .slice(0, 3)
  }

  // Update the recommended scents to include the new perfumes
  const recommendedScents = getRecommendedScents(detectedScent.id)

  // Simulate starting the sensing process
  const startSensing = async () => {
    setSensingState("sensing")
    setSensingProgress(0)

    try {
      // In a real implementation, this would connect to IoT sensors
      // For the dummy version, we'll simulate the sensing process
      const simulatedSensingInterval = setInterval(() => {
        setSensingProgress((prev) => {
          const newProgress = prev + 1

          // Simulate changing sensor readings
          if (newProgress % 10 === 0) {
            setSensorReadings((prevReadings) => ({
              "MQ-3": Math.min(100, prevReadings["MQ-3"] + Math.floor(Math.random() * 15)),
              "MQ-4": Math.min(100, prevReadings["MQ-4"] + Math.floor(Math.random() * 10)),
              "MQ-135": Math.min(100, prevReadings["MQ-135"] + Math.floor(Math.random() * 20)),
            }))
          }

          if (newProgress >= 100) {
            clearInterval(simulatedSensingInterval)
            setSensingState("processing")

            // Simulate processing time
            setTimeout(() => {
              setSensingState("results")
            }, 2000)
            return 100
          }
          return newProgress
        })
      }, 50)
    } catch (error) {
      console.error("Error connecting to sensors:", error)
      toast({
        title: "Sensor connection error",
        description: "We couldn't connect to our scent sensors. Please try again.",
        variant: "destructive",
      })
      setSensingState("initial")
    }
  }

  // Replace the resetSensor function with this updated version
  const resetSensor = () => {
    setSensingState("initial")
    setSensingProgress(0)
    setSensorReadings({
      "MQ-3": 0,
      "MQ-4": 0,
      "MQ-135": 0,
    })
  }

  // Add this new function to handle cycling to the next perfume
  const senseAnotherFragrance = () => {
    // First reset to initial state
    setSensingState("initial")
    setSensingProgress(0)
    setSensorReadings({
      "MQ-3": 0,
      "MQ-4": 0,
      "MQ-135": 0,
    })

    // Then update the perfume index to the next one in the sequence
    setCurrentPerfumeIndex((prevIndex) => (prevIndex + 1) % perfumeSequence.length)

    // Automatically start the sensing process for the new perfume
    setTimeout(() => {
      startSensing()
    }, 500)
  }

  const handleAddToCart = (product: typeof detectedScent) => {
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

  const handleToggleWishlist = (product: typeof detectedScent) => {
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
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-4 text-center ombre-text">Scent Finder</h1>

      {sensingState === "initial" && (
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="mb-8">
            <div className="relative h-64 w-64 mx-auto mb-6">
              <Image
                src="/Scent_finder.jpg"
                alt="Scent finder illustration"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Confused about finding your next favorite scent?</h2>
            <p className="text-muted-foreground mb-6">
              Our IoT-driven smart system can help! Simply present your favorite perfume near our specialized MQ gas
              sensors (MQ-3, MQ-4, and MQ-135), and we'll analyze its molecular composition to recommend similar
              fragrances from our collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={startSensing} className="ombre-button">
                <Wind className="mr-2 h-5 w-5" /> Start Sensing
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/products" className="flex items-center">
                  Browse All Fragrances
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="bg-muted/30 p-6 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mb-4 mx-auto">
                <span className="font-bold text-primary">1</span>
              </div>
              <h3 className="font-medium text-lg mb-2 text-center">Present Your Perfume</h3>
              <p className="text-sm text-muted-foreground">
                Hold your favorite perfume bottle near our sensor array. A gentle spray or open bottle works best for
                accurate readings.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mb-4 mx-auto">
                <span className="font-bold text-primary">2</span>
              </div>
              <h3 className="font-medium text-lg mb-2 text-center">Sensor Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our MQ gas sensors will detect the fragrance molecules and our ML algorithm will analyze the scent
                profile.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mb-4 mx-auto">
                <span className="font-bold text-primary">3</span>
              </div>
              <h3 className="font-medium text-lg mb-2 text-center">Discover Matches</h3>
              <p className="text-sm text-muted-foreground">
                We'll show you the closest matches from our collection, along with detailed information about each
                fragrance.
              </p>
            </div>
          </div>
        </div>
      )}

      {sensingState === "sensing" && (
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="relative mb-8">
            <div className="aspect-video bg-muted/50 rounded-lg overflow-hidden relative p-6">
              {/* IoT Sensor Visualization */}
              <div className="grid grid-cols-3 gap-4 h-full">
                <div className="col-span-1 flex flex-col justify-center items-center">
                  <div className="text-center mb-6">
                    <Flask className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">Scent Sensor Array</p>
                  </div>

                  <div className="space-y-4 w-full">
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span>MQ-3</span>
                        <span className="text-xs ml-2">{sensorReadings["MQ-3"]}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300 rounded-full"
                          style={{ width: `${sensorReadings["MQ-3"]}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Detects alcohol compounds</p>
                    </div>

                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span>MQ-4</span>
                        <span className="text-xs ml-2">{sensorReadings["MQ-4"]}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300 rounded-full"
                          style={{ width: `${sensorReadings["MQ-4"]}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Detects methane & hydrocarbons</p>
                    </div>

                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span>MQ-135</span>
                        <span className="text-xs ml-2">{sensorReadings["MQ-135"]}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300 rounded-full"
                          style={{ width: `${sensorReadings["MQ-135"]}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Detects VOCs & aromatics</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex flex-col justify-center items-center">
                  <div className="relative w-40 h-40 mx-auto">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30 animate-spin"
                      style={{ animationDuration: "10s" }}
                    ></div>
                    <div
                      className="absolute inset-4 rounded-full border-4 border-dashed border-primary/50 animate-spin"
                      style={{ animationDuration: "8s", animationDirection: "reverse" }}
                    ></div>
                    <div
                      className="absolute inset-8 rounded-full border-4 border-dashed border-primary/70 animate-spin"
                      style={{ animationDuration: "6s" }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Droplets className="h-12 w-12 text-primary animate-pulse" />
                    </div>
                  </div>
                  <p className="mt-6 text-sm font-medium">Sensing fragrance molecules...</p>
                  <p className="text-xs text-muted-foreground mt-2">Hold your perfume near the sensor</p>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${sensingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Sensing... {sensingProgress}%</p>
            </div>
          </div>

          <Button variant="outline" onClick={resetSensor}>
            Cancel
          </Button>
        </div>
      )}

      {sensingState === "processing" && (
        <div className="max-w-md mx-auto text-center py-12 animate-fade-in">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-semibold mb-2">Analyzing Fragrance Profile</h2>
          <p className="text-muted-foreground mb-4">
            Our ML algorithm is processing the sensor data to identify notes, accords, and composition...
          </p>
          <div className="space-y-2 max-w-xs mx-auto text-left">
            <div className="flex justify-between items-center">
              <span className="text-sm">Processing MQ-3 (alcohol content)</span>
              <span className="text-sm text-primary">Complete</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Processing MQ-4 (hydrocarbon gases)</span>
              <span className="text-sm text-primary">Complete</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Processing MQ-135 (VOCs & aromatics)</span>
              <span className="text-sm text-primary">Complete</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Analyzing molecular composition</span>
              <span className="text-sm text-primary">Complete</span>
            </div>
            <div className="mt-4 pt-4 border-t border-muted">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Detected Fragrance:</span>
                <span className="text-sm font-medium text-primary">{detectedScent.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {sensingState === "results" && (
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="bg-muted/30 p-6 rounded-lg mb-10 text-center">
            <Badge className="mb-4">Match Found!</Badge>
            <h2 className="text-2xl font-semibold mb-2">We've identified your fragrance</h2>
            <p className="text-muted-foreground">
              Based on our sensor analysis, we've found a match in our collection along with similar fragrances you
              might enjoy.
            </p>
          </div>

          {/* Detected scent */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 ombre-text">Your Fragrance Match</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={detectedScent.image || "/placeholder.svg"}
                  alt={detectedScent.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-primary text-white">
                    {detectedScent.similarityScore}% Match
                  </Badge>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-1">{detectedScent.category}</div>
                  <h2 className="text-3xl font-bold mb-2 ombre-text">{detectedScent.name}</h2>
                  <p className="text-muted-foreground mb-4">{detectedScent.description}</p>
                  <div className="text-2xl font-bold font-ui mb-6 text-foreground dark:text-white">
                    {formatPrice(detectedScent.price)}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium mb-2">Top Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {detectedScent.notes.top.map((note) => (
                        <Badge key={note} variant="outline">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Heart Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {detectedScent.notes.heart.map((note) => (
                        <Badge key={note} variant="outline">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Base Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {detectedScent.notes.base.map((note) => (
                        <Badge key={note} variant="outline">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="ombre-button" onClick={() => handleAddToCart(detectedScent)}>
                    Add to Cart
                  </Button>
                  <Button
                    variant={isInWishlist(detectedScent.id) ? "default" : "outline"}
                    onClick={() => handleToggleWishlist(detectedScent)}
                  >
                    {isInWishlist(detectedScent.id) ? "In Wishlist" : "Add to Wishlist"}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/products/${detectedScent.id}`} className="flex items-center">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended scents */}
          <div>
            <h3 className="text-xl font-semibold mb-6 ombre-text">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recommendedScents.map((scent) => (
                <Card key={scent.id} className="overflow-hidden border-0 shadow-sm hover-lift">
                  <Link href={`/products/${scent.id}`}>
                    <div className="relative aspect-square">
                      <Image
                        src={scent.image || "/placeholder.svg"}
                        alt={scent.name}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-700"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-primary/80 text-white">
                          {scent.similarityScore}% Similar
                        </Badge>
                      </div>
                    </div>
                  </Link>
                  <CardContent className="pt-4">
                    <Link href={`/products/${scent.id}`} className="hover:underline">
                      <div className="text-sm text-muted-foreground mb-1">{scent.category}</div>
                      <h3 className="font-medium text-lg mb-1 ombre-text">{scent.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2">{scent.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="font-semibold font-ui text-foreground dark:text-white">
                      {formatPrice(scent.price)}
                    </div>
                    <Button
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => {
                        addItem({
                          id: scent.id,
                          name: scent.name,
                          price: scent.price,
                          image: scent.image,
                          size: "50ml",
                          quantity: 1,
                        })
                        toast({
                          title: "Added to cart",
                          description: `${scent.name} has been added to your cart.`,
                        })
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={senseAnotherFragrance}>
              <RefreshCw className="mr-2 h-4 w-4" /> Sense Another Fragrance
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products" className="flex items-center">
                Browse All Fragrances
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

