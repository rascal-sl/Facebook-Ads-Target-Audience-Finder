import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useSearchStore } from '@/stores/searchStore'
import { 
  Search, 
  Users, 
  TrendingUp, 
  DollarSign,
  Globe,
  Target,
  Download,
  Heart,
  Eye,
  Sliders,
  MapPin
} from 'lucide-react'
import { toast } from 'sonner'

const AudienceFinder: React.FC = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const {
    query,
    filters,
    results,
    isLoading,
    error,
    selectedLocations,
    setQuery,
    setFilters,
    search,
    clearResults,
    clearError,
    toggleLocationSelection,
    saveSearch,
  } = useSearchStore()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) {
      toast.error('Please enter a search query')
      return
    }
    
    clearError()
    await search(query, filters)
  }

  const handleSaveSearch = () => {
    if (results.length > 0) {
      saveSearch()
      toast.success('Search saved to history')
    }
  }

  const handleExportResults = () => {
    if (results.length > 0) {
      // Mock export functionality
      const dataStr = JSON.stringify(results, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = `audience-results-${new Date().toISOString().split('T')[0]}.json`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
      
      toast.success('Results exported successfully')
    }
  }

  const genderOptions = [
    { value: 'all', label: 'All Genders' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ]

  const competitionOptions = [
    { value: 'all', label: 'All Competition Levels' },
    { value: 'low', label: 'Low Competition' },
    { value: 'medium', label: 'Medium Competition' },
    { value: 'high', label: 'High Competition' },
  ]

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'low': return 'success'
      case 'medium': return 'secondary'
      case 'high': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Audience Finder
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover high-converting audience locations for your Facebook ads
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search and Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search &amp; Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Form */}
                <form onSubmit={handleSearch}>
                  <Input
                    placeholder="Enter keywords or describe your audience..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="mb-4"
                  />
                  <Button 
                    type="submit" 
                    className="w-full mb-4"
                    loading={isLoading}
                    disabled={!query.trim()}
                  >
                    {isLoading ? 'Searching...' : 'Find Audiences'}
                  </Button>
                </form>

                {/* Basic Filters */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Search Radius (miles)
                    </label>
                    <Input
                      type="number"
                      value={filters.radius}
                      onChange={(e) => setFilters({ radius: parseInt(e.target.value) || 25 })}
                      min="1"
                      max="100"
                    />
                  </div>

                  <Select
                    label="Gender"
                    options={genderOptions}
                    value={filters.gender}
                    onValueChange={(value) => setFilters({ gender: value as 'all' | 'male' | 'female' })}
                  />

                  <Select
                    label="Competition Level"
                    options={competitionOptions}
                    value={filters.competitionLevel}
                    onValueChange={(value) => setFilters({ competitionLevel: value as 'all' | 'low' | 'medium' | 'high' })}
                  />
                </div>

                {/* Advanced Filters Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="w-full"
                >
                  <Sliders className="h-4 w-4 mr-2" />
                  {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
                </Button>

                {/* Advanced Filters */}
                {showAdvancedFilters && (
                  <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Age Range
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filters.ageRange[0]}
                          onChange={(e) => setFilters({ 
                            ageRange: [parseInt(e.target.value) || 18, filters.ageRange[1]] 
                          })}
                          min="13"
                          max="65"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filters.ageRange[1]}
                          onChange={(e) => setFilters({ 
                            ageRange: [filters.ageRange[0], parseInt(e.target.value) || 65] 
                          })}
                          min="13"
                          max="65"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Population Range
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filters.minPopulation}
                          onChange={(e) => setFilters({ minPopulation: parseInt(e.target.value) || 10000 })}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filters.maxPopulation}
                          onChange={(e) => setFilters({ maxPopulation: parseInt(e.target.value) || 10000000 })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Income Range ($)
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filters.incomeRange[0]}
                          onChange={(e) => setFilters({ 
                            incomeRange: [parseInt(e.target.value) || 25000, filters.incomeRange[1]] 
                          })}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filters.incomeRange[1]}
                          onChange={(e) => setFilters({ 
                            incomeRange: [filters.incomeRange[0], parseInt(e.target.value) || 150000] 
                          })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {results.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="outline"
                      onClick={handleSaveSearch}
                      className="w-full"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Save Search
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleExportResults}
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Results
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearResults}
                      className="w-full"
                    >
                      Clear Results
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            {error && (
              <Card className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                <CardContent className="pt-6">
                  <div className="flex items-center text-red-600 dark:text-red-400">
                    <span>{error}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {isLoading && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <LoadingSpinner text="Searching for audience locations..." />
                </CardContent>
              </Card>
            )}

            {results.length > 0 && (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Found {results.length} locations
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedLocations.length} selected for comparison
                    </p>
                  </div>
                  {selectedLocations.length > 0 && (
                    <Button>
                      <Eye className="h-4 w-4 mr-2" />
                      Compare Selected ({selectedLocations.length})
                    </Button>
                  )}
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((location) => {
                    const isSelected = selectedLocations.some(loc => loc.id === location.id)
                    
                    return (
                      <Card 
                        key={location.id} 
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          isSelected ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''
                        }`}
                        onClick={() => toggleLocationSelection(location)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="flex items-center">
                                <MapPin className="h-5 w-5 mr-2 text-primary-500" />
                                {location.name}
                              </CardTitle>
                              <CardDescription>
                                {location.city}, {location.region}, {location.country}
                              </CardDescription>
                            </div>
                            <Badge variant={getCompetitionColor(location.competitionLevel)}>
                              {location.competitionLevel} competition
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-gray-500" />
                              <div>
                                <div className="text-sm font-medium">Population</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {location.population.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Target className="h-4 w-4 mr-2 text-gray-500" />
                              <div>
                                <div className="text-sm font-medium">Audience Size</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {location.audienceSize.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                              <div>
                                <div className="text-sm font-medium">Est. CPM</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  ${location.cpm.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                              <div>
                                <div className="text-sm font-medium">Reach</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {location.reach}%
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Demographics Preview */}
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Top Interests
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {location.demographics.interests.slice(0, 3).map((interest, index) => (
                                <Badge key={index} variant="outline" size="sm">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Age Distribution */}
                          <div className="mt-3">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Age Distribution
                            </div>
                            <div className="flex space-x-1">
                              {Object.entries(location.demographics.ageGroups).map(([age, percentage]) => (
                                <div key={age} className="flex-1">
                                  <div 
                                    className="bg-primary-200 dark:bg-primary-800 rounded-sm h-2"
                                    style={{ height: `${Math.max(percentage / 5, 2)}px` }}
                                    title={`${age}: ${percentage}%`}
                                  />
                                  <div className="text-xs text-center mt-1 text-gray-500">
                                    {age.split('-')[0]}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </>
            )}

            {!isLoading && !error && results.length === 0 && query && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search terms or filters to find more locations.
                  </p>
                </CardContent>
              </Card>
            )}

            {!query && !isLoading && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Start Your Search
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Enter keywords or describe your target audience to discover the best locations for your Facebook ads.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudienceFinder