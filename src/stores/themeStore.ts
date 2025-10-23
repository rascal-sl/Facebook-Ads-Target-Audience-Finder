import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  isDark: boolean
  
  // Actions
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const getSystemTheme = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  
  if (theme === 'system') {
    const systemIsDark = getSystemTheme()
    root.classList.toggle('dark', systemIsDark)
    return systemIsDark
  } else {
    root.classList.toggle('dark', theme === 'dark')
    return theme === 'dark'
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      isDark: getSystemTheme(),

      setTheme: (theme: Theme) => {
        const isDark = applyTheme(theme)
        set({ theme, isDark })
      },

      toggleTheme: () => {
        const { theme } = get()
        let newTheme: Theme
        if (theme === 'system') {
          newTheme = getSystemTheme() ? 'light' : 'dark'
        } else {
          newTheme = theme === 'dark' ? 'light' : 'dark'
        }
        const isDark = applyTheme(newTheme)
        set({ theme: newTheme, isDark })
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme on hydration
          const isDark = applyTheme(state.theme)
          state.isDark = isDark
        }
      },
    }
  )
)

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const { theme, setTheme } = useThemeStore.getState()
    if (theme === 'system') {
      setTheme('system') // This will re-apply the system theme
    }
  })
}