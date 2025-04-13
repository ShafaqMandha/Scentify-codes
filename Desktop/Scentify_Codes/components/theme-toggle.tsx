"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the theme toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-300",
          resolvedTheme === "dark" ? "text-muted-foreground" : "text-primary",
        )}
      />
      <Switch
        checked={resolvedTheme === "dark"}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-primary"
        aria-label="Toggle theme"
      />
      <Moon
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-300",
          resolvedTheme === "dark" ? "text-primary" : "text-muted-foreground",
        )}
      />
    </div>
  )
}

