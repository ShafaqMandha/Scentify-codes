import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-muted/30 border-t dark:bg-muted/20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">SCENTIFY</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Discover luxury fragrances crafted with the finest ingredients from around the world.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/women"
                  className="text-muted-foreground hover:text-primary dark:hover:text-primary"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/men"
                  className="text-muted-foreground hover:text-primary dark:hover:text-primary"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/unisex"
                  className="text-muted-foreground hover:text-primary dark:hover:text-primary"
                >
                  Unisex
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary dark:hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SCENTIFY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

