"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, SlidersHorizontal, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ProductFilters, { type FilterState } from "../../components/product-filters"
import ProductGrid from "../../components/product-grid"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    categories: [category === "Women" ? "Women" : category === "Men" ? "Men" : "Unisex"],
    scentFamilies: [],
    sizes: [],
    priceRange: [0, 300],
  })
  const [isSearching, setIsSearching] = useState(false)

  const handleFilterChange = (newFilters: FilterState) => {
    // Ensure the category filter remains applied
    newFilters.categories = [category === "Women" ? "Women" : category === "Men" ? "Men" : "Unisex"]
    setFilters(newFilters)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 300)
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/products" className="text-sm flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Products
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">{category}'s Fragrances</h1>
          <p className="text-muted-foreground">Discover our collection of luxury {category.toLowerCase()}'s perfumes</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <div className="relative w-full">
              <Input
                placeholder="Search fragrances..."
                className="w-full md:w-[250px] pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearching ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <Button type="submit" variant="outline" size="icon" className="hidden md:flex">
              <SearchIcon className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <ProductFilters onFilterChange={handleFilterChange} initialFilters={filters} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <div className="hidden md:block">
          <ProductFilters onFilterChange={handleFilterChange} initialFilters={filters} />
        </div>

        <div>
          <ProductGrid filters={filters} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  )
}

