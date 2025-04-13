"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type WishlistItem = {
  id: number
  name: string
  price: number
  image: string
  category: string
}

type WishlistContextType = {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  clearWishlist: () => void
  isInWishlist: (id: number) => boolean
  itemCount: number
  isLoading: boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load wishlist from localStorage on client side
  useEffect(() => {
    try {
      setIsLoading(true)
      const savedWishlist = localStorage.getItem("scentify-wishlist")
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist))
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("scentify-wishlist", JSON.stringify(items))
      } catch (error) {
        console.error("Failed to save wishlist to localStorage:", error)
      }
    }
  }, [items, isLoading])

  const addToWishlist = (newItem: WishlistItem) => {
    setItems((prevItems) => {
      // Check if item already exists in wishlist
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex >= 0) {
        // Item already exists, return unchanged array
        return prevItems
      } else {
        // Add new item to wishlist
        return [...prevItems, newItem]
      }
    })
  }

  const removeFromWishlist = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setItems([])
  }

  const isInWishlist = (id: number) => {
    return items.some((item) => item.id === id)
  }

  const itemCount = items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        itemCount,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

