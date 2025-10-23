import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  subscription: 'free' | 'pro' | 'enterprise'
  createdAt: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string) => {
        set({ isLoading: true, error: null })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock user data
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            subscription: 'pro',
            createdAt: new Date().toISOString(),
          }
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          })
        } catch {
          set({ 
            error: 'Invalid credentials', 
            isLoading: false 
          })
          throw new Error('Invalid credentials')
        }
      },

      register: async (name: string, email: string) => {
        set({ isLoading: true, error: null })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            subscription: 'free',
            createdAt: new Date().toISOString(),
          }
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          })
        } catch {
          set({ 
            error: 'Registration failed', 
            isLoading: false 
          })
          throw new Error('Registration failed')
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        })
      },

      updateProfile: async (updates: Partial<User>) => {
        const { user } = get()
        if (!user) return
        
        set({ isLoading: true, error: null })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const updatedUser = { ...user, ...updates }
          set({ 
            user: updatedUser, 
            isLoading: false 
          })
        } catch {
          set({ 
            error: 'Failed to update profile', 
            isLoading: false 
          })
          throw new Error('Failed to update profile')
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)