import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: 1,
    name: "Women's Fragrances",
    image: "/womens-fragrance.jpg",
    link: "/products/category/women",
  },
  {
    id: 2,
    name: "Men's Fragrances",
    image: "/mens-fragrance.jpg",
    link: "/products/category/men",
  },
  {
    id: 3,
    name: "Unisex Collections",
    image: "/unisex-collections.jpg",
    link: "/products/category/unisex",
  },
]

export default function CategoryShowcase() {
  // Simplify the animation approach
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.link}
          className="group relative overflow-hidden rounded-lg hover-lift animate-fade-in ombre-overlay"
        >
          <div className="aspect-[4/3] w-full">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 group-hover:from-black/20 group-hover:to-black/70 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold transform transition-transform duration-500 group-hover:scale-110">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

