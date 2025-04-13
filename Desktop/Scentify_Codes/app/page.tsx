import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/app/components/featured-products"
import CategoryShowcase from "@/app/components/category-showcase"
import Newsletter from "@/app/components/newsletter"
import LatestReleases from "@/app/components/latest-releases"
import BestSellers from "@/app/components/best-sellers"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <Image
          src="/Luxury Perfume Collection.jpg"
          alt="Luxury perfume collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            Discover Your Signature Scent
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl animate-fade-in">
            Explore our curated collection of luxury fragrances for every occasion
          </p>
          <Button size="lg" className="ombre-button text-white hover:text-white animate-fade-in" asChild>
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold ombre-text">Featured Fragrances</h2>
          <Link href="/products" className="text-sm font-medium flex items-center hover-lift">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <FeaturedProducts />
      </section>

      {/* Latest Releases */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full bg-muted/30">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold ombre-text">Latest Releases</h2>
          <Link href="/products/new" className="text-sm font-medium flex items-center hover-lift">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <LatestReleases />
      </section>

      {/* Best Sellers */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold ombre-text">Best Sellers</h2>
          <Link href="/products/best-sellers" className="text-sm font-medium flex items-center hover-lift">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <BestSellers />
      </section>

      {/* Category Showcase */}
      <section className="py-16 bg-muted/30">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center ombre-text">Shop By Category</h2>
          <CategoryShowcase />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <Newsletter />
      </section>
    </main>
  )
}

