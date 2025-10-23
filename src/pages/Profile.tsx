import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAuthStore } from '@/stores/authStore'
import { 
  User, 
  Crown, 
  Shield, 
  CreditCard,
  Bell,
  Download,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react'
import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ProfileFormData = z.infer<typeof profileSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

const Profile: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing' | 'notifications'>('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: '',
      jobTitle: '',
      phone: '',
    },
  })

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data)
      toast.success('Profile updated successfully!')
    } catch {
      toast.error('Failed to update profile')
    }
  }

  const onPasswordSubmit = async () => {
    try {
      // Mock password update
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Password updated successfully!')
    } catch {
      toast.error('Failed to update password')
    }
  }

  const exportData = () => {
    const userData = {
      profile: {
        name: user?.name,
        email: user?.email,
        createdAt: user?.createdAt,
        subscription: user?.subscription,
      },
      exportedAt: new Date().toISOString(),
    }
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `profile-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Profile data exported successfully!')
  }

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion is not available in demo mode')
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ] as const

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Profile Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant={user.subscription === 'pro' ? 'default' : 'secondary'}>
                    <Crown className="h-3 w-3 mr-1" />
                    {user.subscription || 'Free'} Plan
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Member since {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full name"
                        {...profileForm.register('name')}
                        error={profileForm.formState.errors.name?.message}
                      />
                      <Input
                        label="Email address"
                        type="email"
                        {...profileForm.register('email')}
                        error={profileForm.formState.errors.email?.message}
                      />
                      <Input
                        label="Company"
                        {...profileForm.register('company')}
                        error={profileForm.formState.errors.company?.message}
                      />
                      <Input
                        label="Job title"
                        {...profileForm.register('jobTitle')}
                        error={profileForm.formState.errors.jobTitle?.message}
                      />
                      <Input
                        label="Phone number"
                        type="tel"
                        {...profileForm.register('phone')}
                        error={profileForm.formState.errors.phone?.message}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" loading={isLoading}>
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                      <div className="relative">
                        <Input
                          label="Current password"
                          type={showCurrentPassword ? 'text' : 'password'}
                          {...passwordForm.register('currentPassword')}
                          error={passwordForm.formState.errors.currentPassword?.message}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>

                      <div className="relative">
                        <Input
                          label="New password"
                          type={showNewPassword ? 'text' : 'password'}
                          {...passwordForm.register('newPassword')}
                          error={passwordForm.formState.errors.newPassword?.message}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>

                      <div className="relative">
                        <Input
                          label="Confirm new password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...passwordForm.register('confirmPassword')}
                          error={passwordForm.formState.errors.confirmPassword?.message}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" loading={isLoading}>
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data & Privacy</CardTitle>
                    <CardDescription>
                      Manage your data and account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Export Data</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Download a copy of your account data
                          </p>
                        </div>
                        <Button variant="outline" onClick={exportData}>
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                      <hr className="border-gray-200 dark:border-gray-700" />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <Button variant="destructive" onClick={deleteAccount}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'billing' && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            Current Plan: {user.subscription || 'Free'}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {user.subscription === 'pro' 
                              ? 'Unlimited searches and advanced analytics'
                              : 'Limited to 10 searches per month'
                            }
                          </p>
                        </div>
                        <Badge variant={user.subscription === 'pro' ? 'default' : 'secondary'}>
                          <Crown className="h-3 w-3 mr-1" />
                          {user.subscription || 'Free'}
                        </Badge>
                      </div>
                    </div>

                    {user.subscription !== 'pro' && (
                      <div className="text-center py-8">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Upgrade to Pro
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Get unlimited access to all features and advanced analytics
                        </p>
                        <Button size="lg">
                          Upgrade Now - $29/month
                        </Button>
                      </div>
                    )}

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">Billing History</h4>
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No billing history available
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to be notified about updates and activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive updates about your searches and account
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Marketing Updates</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Get notified about new features and promotions
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Weekly Reports</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive weekly summaries of your audience insights
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Save Preferences</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile