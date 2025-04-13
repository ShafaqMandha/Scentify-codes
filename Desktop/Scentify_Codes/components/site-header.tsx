"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Menu, Search, ShoppingBag, User, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "./theme-toggle"

export default function SiteHeader() {
  const pathname = usePathname()
  const { itemCount: cartItemCount, isLoading: isCartLoading } = useCart()
  const { itemCount: wishlistItemCount, isLoading: isWishlistLoading } = useWishlist()
  const { isAuthenticated } = useAuth()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/products",
      label: "Shop",
      active: pathname === "/products" || pathname.startsWith("/products/"),
    },
    {
      href: "/scent-finder",
      label: "Scent Finder",
      active: pathname === "/scent-finder",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 dark:supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-lg font-ui font-medium transition-colors hover:text-leaf-green dark:hover:text-moss-green flex items-center",
                    route.active
                      ? "text-leaf-green dark:text-moss-green"
                      : "text-muted-foreground dark:text-muted-foreground",
                  )}
                >
                  {route.icon && route.icon}
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2 group">
          <Leaf className="h-6 w-6 text-leaf-green dark:text-moss-green transition-transform group-hover:rotate-12 group-hover:scale-110 duration-300" />
          <span className="font-heading font-bold text-xl tracking-wide ombre-text">SCENTIFY</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-ui font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-all duration-300 hover:text-leaf-green dark:hover:text-moss-green flex items-center hover:-translate-y-1",
                route.active
                  ? "text-leaf-green dark:text-moss-green"
                  : "text-muted-foreground dark:text-muted-foreground",
              )}
            >
              {route.icon && route.icon}
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4 ml-auto">
          <div className="hidden md:flex relative w-full max-w-sm items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] rounded-full bg-muted dark:bg-muted font-ui transition-all duration-300 focus:w-[250px] hover:shadow-md"
            />
          </div>

          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
            <Link href="/wishlist" className="relative hover:scale-110 transition-transform duration-300">
              <Heart className={`h-5 w-5 ${wishlistItemCount > 0 ? "fill-primary text-primary" : ""}`} />
              {!isWishlistLoading && wishlistItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-leaf-green dark:bg-moss-green text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-ui">
                  {wishlistItemCount > 99 ? "99+" : wishlistItemCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account" asChild>
            <Link
              href={isAuthenticated ? "/profile" : "/login"}
              className="hover:scale-110 transition-transform duration-300"
            >
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart" asChild>
            <Link href="/cart" className="relative hover:scale-110 transition-transform duration-300">
              <ShoppingBag className="h-5 w-5" />
              {!isCartLoading && cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-leaf-green dark:bg-moss-green text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-ui">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

