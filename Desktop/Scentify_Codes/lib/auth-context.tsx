"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  country?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (user: Omit<User, "id">, password: string) => Promise<boolean>
  logout: () => void
  updateUserProfile: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "user-1",
    email: "Shafaqmandha@scentify.com",
    password: "password123", // In a real app, this would be hashed
    firstName: "Shafaq",
    lastName: "Mandha",
    phone: "+1 (555) 987-6543",
    address: "456 Park Avenue",
    city: "New York",
    state: "NY",
    zip: "10002",
    country: "United States",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("scentify-user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Failed to restore auth state:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user with matching credentials
      const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

      if (foundUser) {
        // Create a user object without the password
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)

        // Store in localStorage
        localStorage.setItem("scentify-user", JSON.stringify(userWithoutPassword))

        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.firstName}!`,
        })

        return true
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (userData: Omit<User, "id">, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const userExists = MOCK_USERS.some((u) => u.email.toLowerCase() === userData.email.toLowerCase())

      if (userExists) {
        toast({
          title: "Registration failed",
          description: "An account with this email already exists.",
          variant: "destructive",
        })
        return false
      }

      // In a real app, you would send this to your API
      // For demo, we'll just create a new user object
      const newUser = {
        id: `user-${Date.now()}`,
        ...userData,
      }

      // Add to mock users (in a real app, this would be saved to a database)
      MOCK_USERS.push({ ...newUser, password })

      // Set the current user (without password)
      setUser(newUser)

      // Store in localStorage
      localStorage.setItem("scentify-user", JSON.stringify(newUser))

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully!",
      })

      return true
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("scentify-user")
    router.push("/login")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  // Update user profile
  const updateUserProfile = (userData: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem("scentify-user", JSON.stringify(updatedUser))

    // Update the mock user data (in a real app, this would update the database)
    const userIndex = MOCK_USERS.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...userData }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

