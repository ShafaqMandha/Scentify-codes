"use client"

import { useState, useEffect } from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export type FilterState = {
  categories: string[]
  scentFamilies: string[]
  sizes: string[]
  priceRange: [number, number]
}

type ProductFiltersProps = {
  onFilterChange: (filters: FilterState) => void
  initialFilters?: FilterState
}

export default function ProductFilters({ onFilterChange, initialFilters }: ProductFiltersProps) {
  const { toast } = useToast()
  const [expanded, setExpanded] = useState({
    category: true,
    scent: true,
    size: true,
    price: true,
  })

  const [filters, setFilters] = useState<FilterState>({
    categories: initialFilters?.categories || [],
    scentFamilies: initialFilters?.scentFamilies || [],
    sizes: initialFilters?.sizes || [],
    priceRange: initialFilters?.priceRange || [0, 300],
  })

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section],
    })
  }

  const toggleCategory = (category: string) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]

      return {
        ...prev,
        categories: newCategories,
      }
    })
  }

  const toggleScentFamily = (scent: string) => {
    setFilters((prev) => {
      const newScentFamilies = prev.scentFamilies.includes(scent)
        ? prev.scentFamilies.filter((s) => s !== scent)
        : [...prev.scentFamilies, scent]

      return {
        ...prev,
        scentFamilies: newScentFamilies,
      }
    })
  }

  const toggleSize = (size: string) => {
    setFilters((prev) => {
      const newSizes = prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size]

      return {
        ...prev,
        sizes: newSizes,
      }
    })
  }

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]] as [number, number],
    }))
  }

  const resetFilters = () => {
    setFilters({
      categories: [],
      scentFamilies: [],
      sizes: [],
      priceRange: [0, 300],
    })

    toast({
      title: "Filters reset",
      description: "All filters have been cleared.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("category")}
        >
          <h3 className="text-lg font-medium">Category</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {expanded.category ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        {expanded.category && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="women"
                checked={filters.categories.includes("Women")}
                onCheckedChange={() => toggleCategory("Women")}
              />
              <label htmlFor="women" className="text-sm cursor-pointer">
                Women
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="men"
                checked={filters.categories.includes("Men")}
                onCheckedChange={() => toggleCategory("Men")}
              />
              <label htmlFor="men" className="text-sm cursor-pointer">
                Men
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="unisex"
                checked={filters.categories.includes("Unisex")}
                onCheckedChange={() => toggleCategory("Unisex")}
              />
              <label htmlFor="unisex" className="text-sm cursor-pointer">
                Unisex
              </label>
            </div>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleSection("scent")}>
          <h3 className="text-lg font-medium">Scent Family</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {expanded.scent ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        {expanded.scent && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="floral"
                checked={filters.scentFamilies.includes("Floral")}
                onCheckedChange={() => toggleScentFamily("Floral")}
              />
              <label htmlFor="floral" className="text-sm cursor-pointer">
                Floral
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="woody"
                checked={filters.scentFamilies.includes("Woody")}
                onCheckedChange={() => toggleScentFamily("Woody")}
              />
              <label htmlFor="woody" className="text-sm cursor-pointer">
                Woody
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="oriental"
                checked={filters.scentFamilies.includes("Oriental")}
                onCheckedChange={() => toggleScentFamily("Oriental")}
              />
              <label htmlFor="oriental" className="text-sm cursor-pointer">
                Oriental
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fresh"
                checked={filters.scentFamilies.includes("Fresh")}
                onCheckedChange={() => toggleScentFamily("Fresh")}
              />
              <label htmlFor="fresh" className="text-sm cursor-pointer">
                Fresh
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="citrus"
                checked={filters.scentFamilies.includes("Citrus")}
                onCheckedChange={() => toggleScentFamily("Citrus")}
              />
              <label htmlFor="citrus" className="text-sm cursor-pointer">
                Citrus
              </label>
            </div>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleSection("size")}>
          <h3 className="text-lg font-medium">Size</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {expanded.size ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        {expanded.size && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="30ml" checked={filters.sizes.includes("30ml")} onCheckedChange={() => toggleSize("30ml")} />
              <label htmlFor="30ml" className="text-sm cursor-pointer">
                30ml
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="50ml" checked={filters.sizes.includes("50ml")} onCheckedChange={() => toggleSize("50ml")} />
              <label htmlFor="50ml" className="text-sm cursor-pointer">
                50ml
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="100ml"
                checked={filters.sizes.includes("100ml")}
                onCheckedChange={() => toggleSize("100ml")}
              />
              <label htmlFor="100ml" className="text-sm cursor-pointer">
                100ml
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="travel"
                checked={filters.sizes.includes("Travel Size")}
                onCheckedChange={() => toggleSize("Travel Size")}
              />
              <label htmlFor="travel" className="text-sm cursor-pointer">
                Travel Size
              </label>
            </div>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleSection("price")}>
          <h3 className="text-lg font-medium">Price Range</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {expanded.price ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        {expanded.price && (
          <div className="space-y-4">
            <Slider
              max={300}
              step={10}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceChange}
              className="mt-6"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">{filters.priceRange[0]} AED</span>
              <span className="text-sm">{filters.priceRange[1]} AED</span>
            </div>
          </div>
        )}
      </div>

      <Separator />

      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  )
}

