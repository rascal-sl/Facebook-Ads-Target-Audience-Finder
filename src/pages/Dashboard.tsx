import React, { useState } from 'react'
import { useSearchStore } from '@/stores/searchStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts'
import {
  Target,
  Users,
  DollarSign,
  MapPin,
  Download,
  Share2,
  Heart,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'
import { formatNumber, formatCurrency } from '@/lib/utils'

const Dashboard: React.FC = () => {
  const { results, isLoading, selectedLocations } = useSearchStore()
  const [selectedMetric, setSelectedMetric] = useState<'reach' | 'engagement' | 'conversion'>('reach')

  // Mock analytics data
  const [analyticsData] = useState({
    totalReach: 2450000,
    avgEngagement: 3.2,
    estimatedCPM: 8.50,
    competitorAnalysis: [
      { name: 'Nike', reach: 1200000, engagement: 4.1, cpm: 12.30 },
      { name: 'Adidas', reach: 980000, engagement: 3.8, cpm: 10.50 },
      { name: 'Puma', reach: 750000, engagement: 2.9, cpm: 9.20 },
      { name: 'Under Armour', reach: 650000, engagement: 3.5, cpm: 11.80 },
    ],
    demographics: {
      age: [
        { range: '18-24', percentage: 25, count: 612500 },
        { range: '25-34', percentage: 35, count: 857500 },
        { range: '35-44', percentage: 22, count: 539000 },
        { range: '45-54', percentage: 12, count: 294000 },
        { range: '55+', percentage: 6, count: 147000 },
      ],
      gender: [
        { name: 'Female', value: 58, count: 1421000 },
        { name: 'Male', value: 42, count: 1029000 },
      ],
      devices: [
        { name: 'Mobile', value: 72, count: 1764000 },
        { name: 'Desktop', value: 20, count: 490000 },
        { name: 'Tablet', value: 8, count: 196000 },
      ],
    },
    performance: [
      { date: '2024-01-01', reach: 2100000, engagement: 2.8, conversions: 1250 },
      { date: '2024-01-08', reach: 2200000, engagement: 3.1, conversions: 1380 },
      { date: '2024-01-15', reach: 2350000, engagement: 3.0, conversions: 1420 },
      { date: '2024-01-22', reach: 2400000, engagement: 3.3, conversions: 1580 },
      { date: '2024-01-29', reach: 2450000, engagement: 3.2, conversions: 1650 },
    ],
    topLocations: [
      { city: 'New York', state: 'NY', reach: 450000, engagement: 3.8 },
      { city: 'Los Angeles', state: 'CA', reach: 380000, engagement: 3.5 },
      { city: 'Chicago', state: 'IL', reach: 290000, engagement: 3.2 },
      { city: 'Houston', state: 'TX', reach: 250000, engagement: 2.9 },
      { city: 'Phoenix', state: 'AZ', reach: 220000, engagement: 3.1 },
    ]
  })

  const COLORS = ['#1877F2', '#42A5F5', '#66BB6A', '#FFA726', '#EF5350']

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile': return <Smartphone className="h-4 w-4" />
      case 'Desktop': return <Monitor className="h-4 w-4" />
      case 'Tablet': return <Tablet className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  const exportData = () => {
    const data = {
      summary: {
        totalReach: analyticsData.totalReach,
        avgEngagement: analyticsData.avgEngagement,
        estimatedCPM: analyticsData.estimatedCPM,
        exportedAt: new Date().toISOString(),
      },
      demographics: analyticsData.demographics,
      topLocations: analyticsData.topLocations,
      performance: analyticsData.performance,
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audience-analytics-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard analytics..." />
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No data available</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Perform a search to see detailed analytics and insights.
            </p>
            <div className="mt-6">
              <Button onClick={() => window.location.href = '/audience-finder'}>
                Start Audience Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Comprehensive insights for your target audience
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reach</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(analyticsData.totalReach)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Engagement</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.avgEngagement}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Est. CPM</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(analyticsData.estimatedCPM)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MapPin className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Locations</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedLocations.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Track your audience metrics over time</CardDescription>
              </div>
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <Button
                  variant={selectedMetric === 'reach' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMetric('reach')}
                >
                  Reach
                </Button>
                <Button
                  variant={selectedMetric === 'engagement' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMetric('engagement')}
                >
                  Engagement
                </Button>
                <Button
                  variant={selectedMetric === 'conversion' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMetric('conversion')}
                >
                  Conversions
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.performance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis tickFormatter={(value) => formatNumber(value)} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value: number) => [formatNumber(value), selectedMetric]}
                  />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric === 'conversion' ? 'conversions' : selectedMetric}
                    stroke="#1877F2"
                    fill="#1877F2"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Demographics - Age */}
          <Card>
            <CardHeader>
              <CardTitle>Age Demographics</CardTitle>
              <CardDescription>Audience distribution by age groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.demographics.age}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Bar dataKey="percentage" fill="#1877F2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Demographics - Gender */}
          <Card>
            <CardHeader>
              <CardTitle>Gender Distribution</CardTitle>
              <CardDescription>Audience breakdown by gender</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.demographics.gender}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.demographics.gender.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Device Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Device Usage</CardTitle>
              <CardDescription>How your audience accesses content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.demographics.devices.map((device) => (
                  <div key={device.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getDeviceIcon(device.name)}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {device.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${device.value}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">
                        {device.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Locations</CardTitle>
              <CardDescription>Cities with highest engagement rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topLocations.map((location, index) => (
                  <div key={`${location.city}-${location.state}`} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {location.city}, {location.state}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatNumber(location.reach)} reach
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {location.engagement}% engagement
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competitor Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
            <CardDescription>Compare your performance with industry leaders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.competitorAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatNumber(value)} />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'reach' ? formatNumber(value) : 
                      name === 'cpm' ? formatCurrency(value) : 
                      `${value}%`,
                      name === 'reach' ? 'Reach' : 
                      name === 'engagement' ? 'Engagement' : 'CPM'
                    ]}
                  />
                  <Bar dataKey="reach" fill="#1877F2" name="reach" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard