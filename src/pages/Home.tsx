import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAuthStore } from '@/stores/authStore'
import { 
  Search, 
  Target, 
  BarChart3, 
  Users, 
  Globe, 
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  TrendingUp,
  Filter
} from 'lucide-react'

const Home: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  const features = [
    {
      icon: <Search className="h-8 w-8 text-primary-500" />,
      title: 'Smart Location Discovery',
      description: 'Find the perfect audience locations using AI-powered search and advanced demographic filters.',
    },
    {
      icon: <Target className="h-8 w-8 text-primary-500" />,
      title: 'Precision Targeting',
      description: 'Target specific demographics, interests, and behaviors to maximize your ad performance.',
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary-500" />,
      title: 'Advanced Analytics',
      description: 'Get detailed insights on audience size, competition levels, and estimated CPM rates.',
    },
    {
      icon: <Globe className="h-8 w-8 text-primary-500" />,
      title: 'Global Coverage',
      description: 'Access audience data from over 190 countries with real-time demographic information.',
    },
    {
      icon: <Zap className="h-8 w-8 text-primary-500" />,
      title: 'Real-time Results',
      description: 'Get instant results with live data updates and competitive intelligence.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary-500" />,
      title: 'Audience Insights',
      description: 'Understand your audience better with detailed demographic and psychographic data.',
    },
  ]

  const benefits = [
    'Reduce ad spend by 40% with better targeting',
    'Increase conversion rates by up to 3x',
    'Save 10+ hours per campaign setup',
    'Access to 500M+ audience profiles',
    'Real-time competitive analysis',
    'Export data to Facebook Ads Manager',
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechStart Inc.',
      content: 'This tool revolutionized our Facebook advertising. We reduced our CPM by 45% and increased our ROAS significantly.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Digital Marketing Manager',
      company: 'E-commerce Plus',
      content: 'The audience insights are incredibly detailed. We discovered new markets we never knew existed.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Growth Marketer',
      company: 'SaaS Solutions',
      content: 'The time savings alone make this worth it. What used to take hours now takes minutes.',
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <Badge className="mb-4 animate-fade-in">
              🚀 New: AI-Powered Audience Discovery
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
              Find Your Perfect
              <span className="text-primary-500 block">Facebook Audience</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up animation-delay-200">
              Discover high-converting audience locations with advanced demographic targeting, 
              competitive analysis, and real-time insights to maximize your Facebook ad performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
              {isAuthenticated ? (
                <Link to="/finder">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Finding Audiences
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/finder">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Try Demo
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 transform w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/4 transform w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Better Targeting
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to find, analyze, and target the perfect audience for your Facebook ads.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of marketers who have transformed their Facebook advertising 
                with our advanced audience targeting platform.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-primary-500 mb-2">500M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Audience Profiles</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-primary-500 mb-2">190+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-primary-500 mb-2">40%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cost Reduction</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-primary-500 mb-2">3x</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Better ROAS</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">1. Search</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enter your target keywords or describe your ideal audience to start the search.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2. Filter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Apply advanced filters for demographics, interests, location, and competition level.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">3. Optimize</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Analyze results, compare audiences, and export data to Facebook Ads Manager.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real marketers are saying.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Facebook Ads?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of marketers who are already using our platform to find better audiences and reduce ad costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/finder">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Start Finding Audiences
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary-500">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home