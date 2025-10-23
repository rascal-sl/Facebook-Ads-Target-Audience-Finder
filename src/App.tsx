import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/Header'
import { useThemeStore } from '@/stores/themeStore'
import Home from '@/pages/Home'

// Lazy load pages for better performance
const AudienceFinder = React.lazy(() => import('@/pages/AudienceFinder'))
const Dashboard = React.lazy(() => import('@/pages/Dashboard'))
const Login = React.lazy(() => import('@/pages/Login'))
const Register = React.lazy(() => import('@/pages/Register'))
const Profile = React.lazy(() => import('@/pages/Profile'))
const History = React.lazy(() => import('@/pages/History'))

// Loading component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
)

function App() {
  const { setTheme } = useThemeStore()

  useEffect(() => {
    // Initialize theme on app start
    setTheme('system')
  }, [setTheme])

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header />
        <main>
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/audience-finder" element={<AudienceFinder />} />
              <Route path="/finder" element={<AudienceFinder />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </React.Suspense>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--background)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App