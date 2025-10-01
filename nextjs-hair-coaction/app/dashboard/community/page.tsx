'use client'

import { useState } from 'react'
import { Users, MessageCircle, ThumbsUp, Share2, TrendingUp, UserCircle } from 'lucide-react'

export default function CommunityPage() {
  const [darkMode] = useState(true)
  
  const posts = [
    {
      author: 'Sarah Mitchell',
      gradient: 'from-purple-500 to-pink-500',
      role: 'Hair Stylist',
      time: '2 hours ago',
      content: 'Just tried a new deep conditioning treatment on a client with damaged hair. The results were amazing! Has anyone else tried protein treatments for heat damage?',
      likes: 45,
      comments: 12,
      hasImage: true,
    },
    {
      author: 'Michael Rodriguez',
      gradient: 'from-pink-500 to-blue-500',
      role: 'Trichologist',
      time: '5 hours ago',
      content: 'Reminder: Scalp health is just as important as hair health! Make sure to massage your scalp regularly to improve circulation. 💆‍♀️',
      likes: 89,
      comments: 23,
      hasImage: false,
    },
    {
      author: 'Emma Johnson',
      gradient: 'from-blue-500 to-purple-500',
      role: 'Natural Hair Specialist',
      time: '1 day ago',
      content: 'Tutorial coming soon on protective styling for natural hair! What styles would you like to see? Drop your suggestions below! 👇',
      likes: 156,
      comments: 47,
      hasImage: true,
    },
  ]

  const trendingTopics = [
    { tag: '#HairCareRoutine', posts: 1234 },
    { tag: '#NaturalHair', posts: 987 },
    { tag: '#HairTreatments', posts: 756 },
    { tag: '#StylingTips', posts: 645 },
    { tag: '#ScalpHealth', posts: 523 },
  ]

  return (
    <div className="space-y-8">
      <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-xl ${
        darkMode ? 'bg-gray-800/50 border-purple-800/50' : 'bg-white/60 border-pink-200/50'
      }`}>
        <h1 className={`text-4xl font-bold mb-2 ${
          darkMode ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent'
        }`}>
          Community Hub
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Connect, share, and learn with hair care professionals</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/50 border-purple-800/50' : 'bg-white/70 border-pink-200/50'
          }`}>
            <textarea
              placeholder="Share your hair care tips and experiences..."
              className={`w-full p-4 border-2 rounded-xl outline-none resize-none ${
                darkMode ? 'bg-gray-900/50 border-purple-800/50 text-white placeholder-gray-500 focus:border-purple-500' : 'border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200'
              }`}
              rows={3}
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <button className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-purple-900/50' : 'hover:bg-pink-50'
                }`}>
                  <MessageCircle className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
                </button>
                <button className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-purple-900/50' : 'hover:bg-pink-50'
                }`}>
                  <Share2 className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
                </button>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                Post
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {posts.map((post, index) => (
            <div key={index} className={`backdrop-blur-sm rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-shadow ${
              darkMode ? 'bg-gray-800/50 border-purple-800/50' : 'bg-white/70 border-pink-200/50'
            }`}>
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                  <UserCircle className="w-8 h-8 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{post.author}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.role} • {post.time}</p>
                </div>
              </div>

              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.content}</p>

              {post.hasImage && (
                <div className={`w-full h-48 rounded-xl mb-4 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                  <MessageCircle className="w-16 h-16 text-white opacity-20" />
                </div>
              )}

              <div className={`flex items-center justify-between pt-4 border-t ${
                darkMode ? 'border-purple-800/50' : 'border-pink-100'
              }`}>
                <button className={`flex items-center space-x-2 transition-colors ${
                  darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-pink-600'
                }`}>
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-semibold">{post.likes}</span>
                </button>
                <button className={`flex items-center space-x-2 transition-colors ${
                  darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-pink-600'
                }`}>
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">{post.comments} Comments</span>
                </button>
                <button className={`flex items-center space-x-2 transition-colors ${
                  darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-pink-600'
                }`}>
                  <Share2 className="w-5 h-5" />
                  <span className="font-semibold">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Stats */}
          <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/50 border-purple-800/50' : 'bg-white/70 border-pink-200/50'
          }`}>
            <h3 className={`text-xl font-bold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Users className={`w-5 h-5 mr-2 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
              Community Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Members</span>
                <span className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-pink-600'}`}>50,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Posts Today</span>
                <span className={`text-2xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>342</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Active Now</span>
                <span className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-pink-600'}`}>1,543</span>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/50 border-purple-800/50' : 'bg-white/70 border-pink-200/50'
          }`}>
            <h3 className={`text-xl font-bold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <TrendingUp className={`w-5 h-5 mr-2 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
              Trending Topics
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <button key={index} className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left ${
                  darkMode ? 'hover:bg-purple-900/50' : 'hover:bg-pink-50'
                }`}>
                  <span className={`font-semibold ${darkMode ? 'text-purple-400' : 'text-pink-600'}`}>{topic.tag}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{topic.posts} posts</span>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Connections */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-2">Join the Conversation</h3>
            <p className="text-purple-100 text-sm mb-4">Connect with 50,000+ hair care professionals</p>
            <button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 rounded-xl font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300">
              Find Connections
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
