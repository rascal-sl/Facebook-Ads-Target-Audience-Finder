import React, { useState } from 'react'
import { useSearchStore, SearchHistory } from '@/stores/searchStore'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  Filter,
  Trash2,
  Download,
  RefreshCw,
  Clock,
  TrendingUp,
  Eye
} from 'lucide-react'
import { formatDate, formatNumber } from '@/lib/utils'
import { toast } from 'sonner'

const History: React.FC = () => {
  const { history: searchHistory, deleteFromHistory: deleteSearchHistory, loadFromHistory: loadSearchHistory } = useSearchStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'query' | 'results'>('date')
  const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'popular'>('all')

  const filteredHistory = (searchHistory || [])
    .filter(item => 
      item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.filters.locations || []).some(loc => 
        loc.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(item => {
      if (filterBy === 'recent') {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        return new Date(item.timestamp) > oneWeekAgo
      }
      if (filterBy === 'popular') {
        return (item.resultCount || 0) > 1000000 // Mock popularity threshold
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        case 'query':
          return a.query.localeCompare(b.query)
        case 'results':
          return (b.resultCount || 0) - (a.resultCount || 0)
        default:
          return 0
      }
    })

  const handleLoadSearch = (historyItem: SearchHistory) => {
    loadSearchHistory(historyItem.id)
    toast.success('Search loaded successfully!')
  }

  const handleDeleteSearch = (id: string) => {
    if (window.confirm('Are you sure you want to delete this search?')) {
      deleteSearchHistory(id)
      toast.success('Search deleted successfully!')
    }
  }

  const exportHistory = () => {
    const data = {
      searchHistory: filteredHistory,
      exportedAt: new Date().toISOString(),
      totalSearches: filteredHistory.length,
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `search-history-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Search history exported successfully!')
  }

  const clearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all search history? This action cannot be undone.')) {
      searchHistory.forEach(item => deleteSearchHistory(item.id))
      toast.success('All search history cleared!')
    }
  }

  const getAgeRangeDisplay = (ageRange: [number, number]) => {
    return `${ageRange[0]}-${ageRange[1]}`
  }

  const getInterestsBadges = (interests: string[]) => {
    return interests.slice(0, 3).map((interest, index) => (
      <Badge key={index} variant="secondary" className="text-xs">
        {interest}
      </Badge>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Search History
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                View and manage your previous audience searches
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline" onClick={exportHistory}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="destructive" onClick={clearAllHistory}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Search className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Searches</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchHistory.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reach</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(searchHistory.reduce((sum, item) => sum + (item.resultCount || 0), 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Results</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchHistory.length > 0 
                      ? formatNumber(Math.round(searchHistory.reduce((sum, item) => sum + (item.resultCount || 0), 0) / searchHistory.length))
                      : '0'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search your history..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'query' | 'results')}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="date">Sort by Date</option>
                  <option value="query">Sort by Query</option>
                  <option value="results">Sort by Results</option>
                </select>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as 'all' | 'recent' | 'popular')}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">All Searches</option>
                  <option value="recent">Recent (7 days)</option>
                  <option value="popular">Popular (&gt;1M results)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search History List */}
        {filteredHistory.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchTerm ? 'No matching searches found' : 'No search history yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters'
                  : 'Start exploring audiences to build your search history'
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => window.location.href = '/audience-finder'}>
                  Start Searching
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          "{item.query}"
                        </h3>
                        <Badge variant="outline">
                          {formatNumber(item.resultCount || 0)} results
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(item.timestamp)}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          {(item.filters.locations || []).length} location{(item.filters.locations || []).length !== 1 ? 's' : ''}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-2" />
                          Age {getAgeRangeDisplay(item.filters.ageRange)}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Filter className="h-4 w-4 mr-2" />
                          {item.filters.gender || 'All genders'}
                        </div>
                      </div>

                      {/* Locations */}
                      {(item.filters.locations || []).length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Locations:</p>
                          <div className="flex flex-wrap gap-2">
                            {(item.filters.locations || []).slice(0, 5).map((location, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                            {(item.filters.locations || []).length > 5 && (
                              <Badge variant="secondary" className="text-xs">
                                +{(item.filters.locations || []).length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Interests */}
                      {item.filters.interests.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interests:</p>
                          <div className="flex flex-wrap gap-2">
                            {getInterestsBadges(item.filters.interests)}
                            {item.filters.interests.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{item.filters.interests.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleLoadSearch(item)}
                        className="whitespace-nowrap"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Load Search
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.location.href = '/dashboard'}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Results
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteSearch(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination would go here in a real app */}
        {filteredHistory.length > 10 && (
          <div className="mt-8 flex justify-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {Math.min(10, filteredHistory.length)} of {filteredHistory.length} searches
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default History