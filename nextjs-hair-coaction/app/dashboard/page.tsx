'use client'

import { useState, useEffect } from 'react'
import { 
  Users, Play, Sparkles, Scissors, Plus, UserCheck, Upload, Video,
  TrendingUp, Calendar, Award, Heart, Target, Zap, CheckCircle,
  BarChart3, Clock, Star, ArrowUp, Activity
} from 'lucide-react'
import { createClient } from '@/lib/supabase'

const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&h=500&fit=crop',
      title: 'Healthy Hair Transformation',
      description: 'Beautiful, nourished hair with professional care',
      category: 'Success Story'
    },
    {
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&h=500&fit=crop',
      title: 'Professional Treatment',
      description: 'Deep conditioning and restoration therapy',
      category: 'Treatment'
    },
    {
      url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&h=500&fit=crop',
      title: 'Natural Hair Excellence',
      description: 'Embracing natural texture and beauty',
      category: 'Natural Care'
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [photos.length])

  return (
    <div className="relative h-[500px] overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 rounded-3xl border border-pink-200/50 shadow-2xl mb-8 group">
      <div className="relative h-full">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-4xl">
                <span className="inline-block px-4 py-1 bg-pink-500 text-white rounded-full text-sm font-semibold mb-4">
                  {photo.category}
                </span>
                <h3 className="text-4xl font-black text-white mb-3">{photo.title}</h3>
                <p className="text-xl text-white/90">{photo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 right-8 flex space-x-3">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-12' : 'bg-white/50 w-2 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <button 
        onClick={() => setCurrentIndex((currentIndex - 1 + photos.length) % photos.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
      >
        <span className="text-white text-2xl">‹</span>
      </button>
      <button 
        onClick={() => setCurrentIndex((currentIndex + 1) % photos.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
      >
        <span className="text-white text-2xl">›</span>
      </button>
    </div>
  )
}

const VideoDemo = () => {
  const [hasVideo, setHasVideo] = useState(false)

  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-3xl p-8 border border-pink-200/50 shadow-xl mb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center space-x-3">
          <Video className="w-8 h-8 text-pink-500" />
          <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            HairCare Tutorial
          </span>
        </h2>
        <p className="text-gray-600 text-lg">Learn professional hair care techniques</p>
      </div>

      {!hasVideo ? (
        <div className="group relative h-96 bg-gradient-to-br from-pink-100/50 to-rose-100/50 rounded-2xl border-2 border-dashed border-pink-300/50 flex flex-col items-center justify-center">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">Upload Your Hair Tutorial</h3>
              <p className="text-gray-600 mb-6 text-lg">Share your hair care routine</p>
              <button
                onClick={() => setHasVideo(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-110 transition-all duration-300 shadow-xl"
              >
                Choose Video File
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="w-10 h-10 text-white ml-1" />
            </button>
          </div>
          <div className="w-full h-full bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 opacity-90"></div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Play,
            title: 'Hair Care Routine',
            description: 'Step-by-step daily guide',
            color: 'from-pink-400 to-rose-400',
          },
          {
            icon: Scissors,
            title: 'Styling Techniques',
            description: 'Professional styling tips',
            color: 'from-rose-400 to-pink-400',
          },
          {
            icon: Sparkles,
            title: 'Hair Treatments',
            description: 'Deep conditioning methods',
            color: 'from-pink-500 to-rose-500',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl hover:scale-110 transition-all duration-500 border border-pink-200/50"
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user)
    }
    getUser()
  }, [supabase.auth])

  return (
    <div className="space-y-8">
      {/* Welcome Header with Quick Actions */}
      <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-rose-500 rounded-3xl p-8 shadow-2xl text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-4xl font-black mb-2">
              Welcome back, {user?.email?.split('@')[0] || 'User'}! 👋
            </h2>
            <p className="text-pink-100 text-lg">Your hair is looking amazing! Here's your dashboard overview.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Goal
            </button>
            <button className="px-6 py-3 bg-white text-pink-600 hover:scale-105 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg">
              <Calendar className="h-5 w-5" />
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: 'Routine Days', 
            value: '45', 
            change: '+12%',
            trend: 'up',
            icon: Calendar, 
            color: 'from-pink-400 to-rose-400',
            bgColor: 'bg-pink-50'
          },
          { 
            label: 'Products Used', 
            value: '12', 
            change: '+3',
            trend: 'up',
            icon: Sparkles, 
            color: 'from-rose-400 to-pink-500',
            bgColor: 'bg-rose-50'
          },
          { 
            label: 'Goals Achieved', 
            value: '8/10', 
            change: '80%',
            trend: 'up',
            icon: Target, 
            color: 'from-pink-500 to-orange-400',
            bgColor: 'bg-orange-50'
          },
          { 
            label: 'Health Score', 
            value: '8.5', 
            change: '+0.5',
            trend: 'up',
            icon: Heart, 
            color: 'from-orange-400 to-pink-500',
            bgColor: 'bg-pink-50'
          },
        ].map((stat, index) => (
          <div key={index} className="group">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-sm font-bold`}>
                  <ArrowUp className={`h-4 w-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <PhotoCarousel />

      {/* Activity Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-pink-500" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            {[
              { icon: Upload, label: 'Upload Progress Photo', color: 'from-pink-500 to-rose-500' },
              { icon: Video, label: 'Record Hair Tutorial', color: 'from-rose-500 to-orange-500' },
              { icon: Users, label: 'Join Community Chat', color: 'from-orange-500 to-pink-500' },
              { icon: BarChart3, label: 'View Full Analytics', color: 'from-pink-600 to-rose-600' },
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-pink-50 transition-colors group">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-pink-600 transition-colors">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="h-6 w-6 text-pink-500" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { 
                action: 'Completed "Hair Growth Fundamentals" course', 
                time: '2 hours ago',
                icon: CheckCircle,
                color: 'text-green-500'
              },
              { 
                action: 'Booked consultation with Dr. Sarah Johnson', 
                time: '5 hours ago',
                icon: Calendar,
                color: 'text-blue-500'
              },
              { 
                action: 'Joined "Natural Hair Care" community group', 
                time: '1 day ago',
                icon: Users,
                color: 'text-purple-500'
              },
              { 
                action: 'Achieved "30-Day Streak" milestone', 
                time: '2 days ago',
                icon: Award,
                color: 'text-orange-500'
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-pink-50 transition-colors">
                <div className={`p-2 rounded-lg bg-gray-100`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <VideoDemo />

      {/* Progress Overview */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-pink-100 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="h-7 w-7 text-pink-500" />
          Your Progress Overview
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: 'Hair Health', progress: 85, color: 'from-pink-500 to-rose-500' },
            { label: 'Learning Progress', progress: 65, color: 'from-rose-500 to-orange-500' },
            { label: 'Community Engagement', progress: 92, color: 'from-orange-500 to-pink-500' },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">{item.label}</span>
                <span className="font-bold text-gray-900">{item.progress}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
