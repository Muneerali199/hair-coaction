'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  BookOpen,
  User,
  Settings,
  Heart,
  Calendar,
  Star,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Stethoscope,
  Users,
} from 'lucide-react'

interface SidebarProps {
  user?: { email?: string | null }
  darkMode?: boolean
  onSignOut?: () => void
}

export default function Sidebar({ user, darkMode, onSignOut }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'from-pink-500 to-rose-400', path: '/dashboard' },
    { id: 'education', label: 'Education', icon: BookOpen, color: 'from-orange-400 to-pink-400', path: '/dashboard/education' },
    { id: 'consultation', label: 'Consultation', icon: Stethoscope, color: 'from-pink-500 to-rose-400', path: '/dashboard/consultation' },
    { id: 'event', label: 'Event', icon: Calendar, color: 'from-orange-400 to-pink-500', path: '/dashboard/event' },
    { id: 'community', label: 'Community', icon: Users, color: 'from-purple-500 to-pink-500', path: '/dashboard/community' },
  ]

  const stats = [
    { label: 'Health Score', value: '8.5/10', icon: Heart, gradient: 'from-pink-400 to-rose-400' },
    { label: 'Streak Days', value: '12', icon: Calendar, gradient: 'from-rose-400 to-pink-500' },
    { label: 'Products Used', value: '24', icon: Star, gradient: 'from-pink-500 to-orange-400' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-pink-500 to-rose-400 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full ${darkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700' : 'bg-gradient-to-b from-pink-50 via-rose-50 to-orange-50 border-r border-pink-100'} shadow-2xl z-40 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-80'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 flex flex-col`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700 bg-gray-900/70' : 'border-pink-100 bg-white/50'} backdrop-blur-sm`}>
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-gray-300' : 'bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent'}`}>
                  Hair Coaction
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hair Care</p>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`hidden lg:flex p-2 rounded-lg transition-all duration-200 hover:scale-110 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-pink-100'}`}
            >
              <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {/* Quick Stats */}
          {!isCollapsed && (
            <div className="p-6">
              <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-4 uppercase tracking-wide`}>Quick Stats</h3>
              <div className="space-y-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 hover:scale-105 transition-transform">
                    <div className="flex items-center space-x-3">
                      <div className={`bg-gradient-to-r ${stat.gradient} w-10 h-10 rounded-lg flex items-center justify-center shadow-md`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="font-bold text-gray-800">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="px-6 py-4">
            <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-4 uppercase tracking-wide ${isCollapsed ? 'text-center' : ''}`}>
              {isCollapsed ? '•••' : 'Navigation'}
            </h3>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    pathname === item.path
                      ? darkMode 
                        ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg' 
                        : `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-700 hover:bg-white/70 hover:text-gray-900'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Actions */}
          <div className="px-6 py-4 border-t border-pink-100 mt-auto">
            <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-4 uppercase tracking-wide ${isCollapsed ? 'text-center' : ''}`}>
              {isCollapsed ? '•••' : 'Quick Actions'}
            </h3>
            <div className="space-y-2">
              <Link
                href="/dashboard/profile"
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  darkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-white/70 hover:text-gray-900'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <User className="w-5 h-5" />
                {!isCollapsed && <span>Profile</span>}
              </Link>
              <button
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  darkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-white/70 hover:text-gray-900'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Settings className="w-5 h-5" />
                {!isCollapsed && <span>Settings</span>}
              </button>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className={`p-6 border-t ${darkMode ? 'border-gray-700 bg-gray-900/70' : 'border-pink-100 bg-white/30'} backdrop-blur-sm`}>
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-900' : 'bg-gradient-to-r from-pink-500 to-rose-400'}`}>
              <User className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1">
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user?.email?.split('@')[0] || 'User'}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Premium Member</p>
                </div>
                <button 
                  onClick={onSignOut}
                  className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-pink-100'}`}
                >
                  <LogOut className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Spacer */}
      <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-80'}`} />
    </>
  )
}
