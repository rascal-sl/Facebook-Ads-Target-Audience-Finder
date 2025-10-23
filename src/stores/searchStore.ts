import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Location {
  id: string
  name: string
  country: string
  region: string
  city: string
  latitude: number
  longitude: number
  population: number
  demographics: {
    ageGroups: Record<string, number>
    gender: Record<string, number>
    interests: string[]
    income: Record<string, number>
  }
  audienceSize: number
  competitionLevel: 'low' | 'medium' | 'high'
  cpm: number
  reach: number
}

export interface SearchFilters {
  radius: number
  minPopulation: number
  maxPopulation: number
  ageRange: [number, number]
  gender: 'all' | 'male' | 'female'
  interests: string[]
  incomeRange: [number, number]
  competitionLevel: 'all' | 'low' | 'medium' | 'high'
}

export interface SearchHistory {
  id: string
  query: string
  filters: SearchFilters & { locations?: string[] }
  results: Location[]
  timestamp: string
  saved: boolean
  resultCount?: number
}

interface SearchState {
  // Current search
  query: string
  filters: SearchFilters
  results: Location[]
  isLoading: boolean
  error: string | null
  
  // Search history
  history: SearchHistory[]
  
  // Selected locations for comparison
  selectedLocations: Location[]
  
  // Actions
  setQuery: (query: string) => void
  setFilters: (filters: Partial<SearchFilters>) => void
  search: (query: string, filters?: Partial<SearchFilters>) => Promise<void>
  clearResults: () => void
  clearError: () => void
  
  // History actions
  saveSearch: (name?: string) => void
  deleteFromHistory: (id: string) => void
  loadFromHistory: (id: string) => void
  
  // Selection actions
  toggleLocationSelection: (location: Location) => void
  clearSelection: () => void
}

const defaultFilters: SearchFilters = {
  radius: 25,
  minPopulation: 10000,
  maxPopulation: 10000000,
  ageRange: [18, 65],
  gender: 'all',
  interests: [],
  incomeRange: [25000, 150000],
  competitionLevel: 'all',
}

// Mock data generator
const generateMockLocation = (name: string, country: string): Location => ({
  id: Math.random().toString(36).substr(2, 9),
  name,
  country,
  region: 'Mock Region',
  city: name,
  latitude: Math.random() * 180 - 90,
  longitude: Math.random() * 360 - 180,
  population: Math.floor(Math.random() * 1000000) + 50000,
  demographics: {
    ageGroups: {
      '18-24': Math.floor(Math.random() * 30) + 10,
      '25-34': Math.floor(Math.random() * 30) + 15,
      '35-44': Math.floor(Math.random() * 25) + 15,
      '45-54': Math.floor(Math.random() * 20) + 10,
      '55-64': Math.floor(Math.random() * 15) + 5,
      '65+': Math.floor(Math.random() * 10) + 5,
    },
    gender: {
      male: Math.floor(Math.random() * 20) + 40,
      female: Math.floor(Math.random() * 20) + 40,
    },
    interests: ['Technology', 'Sports', 'Travel', 'Food', 'Fashion'].slice(0, Math.floor(Math.random() * 3) + 2),
    income: {
      'Under $25k': Math.floor(Math.random() * 20) + 5,
      '$25k-$50k': Math.floor(Math.random() * 25) + 15,
      '$50k-$75k': Math.floor(Math.random() * 25) + 20,
      '$75k-$100k': Math.floor(Math.random() * 20) + 15,
      'Over $100k': Math.floor(Math.random() * 15) + 10,
    },
  },
  audienceSize: Math.floor(Math.random() * 500000) + 100000,
  competitionLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
  cpm: Math.random() * 5 + 1,
  reach: Math.floor(Math.random() * 80) + 20,
})

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      filters: defaultFilters,
      results: [],
      isLoading: false,
      error: null,
      history: [],
      selectedLocations: [],

      setQuery: (query: string) => set({ query }),

      setFilters: (newFilters: Partial<SearchFilters>) =>
        set(state => ({
          filters: { ...state.filters, ...newFilters }
        })),

      search: async (query: string, filters?: Partial<SearchFilters>) => {
        set({ isLoading: true, error: null, query })
        
        if (filters) {
          set(state => ({
            filters: { ...state.filters, ...filters }
          }))
        }

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          // Generate mock results
          const mockResults: Location[] = [
            generateMockLocation('New York', 'United States'),
            generateMockLocation('Los Angeles', 'United States'),
            generateMockLocation('London', 'United Kingdom'),
            generateMockLocation('Toronto', 'Canada'),
            generateMockLocation('Sydney', 'Australia'),
          ].slice(0, Math.floor(Math.random() * 3) + 2)
          
          set({ 
            results: mockResults, 
            isLoading: false 
          })
        } catch {
          set({ 
            error: 'Failed to search locations', 
            isLoading: false 
          })
        }
      },

      clearResults: () => set({ results: [], query: '', error: null }),

      clearError: () => set({ error: null }),

      saveSearch: (name?: string) => {
        const { query, filters, results } = get()
        if (!query || results.length === 0) return

        const searchHistory: SearchHistory = {
          id: Math.random().toString(36).substr(2, 9),
          query: name || query,
          filters: { ...filters, locations: [] },
          results,
          timestamp: new Date().toISOString(),
          saved: true,
          resultCount: results.length,
        }

        set(state => ({
          history: [searchHistory, ...state.history.slice(0, 49)] // Keep last 50
        }))
      },

      deleteFromHistory: (id: string) =>
        set(state => ({
          history: state.history.filter(item => item.id !== id)
        })),

      loadFromHistory: (id: string) => {
        const { history } = get()
        const searchItem = history.find(item => item.id === id)
        if (searchItem) {
          set({
            query: searchItem.query,
            filters: searchItem.filters,
            results: searchItem.results,
          })
        }
      },

      toggleLocationSelection: (location: Location) =>
        set(state => {
          const isSelected = state.selectedLocations.some(loc => loc.id === location.id)
          return {
            selectedLocations: isSelected
              ? state.selectedLocations.filter(loc => loc.id !== location.id)
              : [...state.selectedLocations, location]
          }
        }),

      clearSelection: () => set({ selectedLocations: [] }),
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({
        history: state.history,
        filters: state.filters,
      }),
    }
  )
)