'use client'

import { Users, MessageCircle, ThumbsUp, Share2, TrendingUp } from 'lucide-react'

export default function CommunityPage() {
  const posts = [
    {
      author: 'Sarah Mitchell',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
      role: 'Hair Stylist',
      time: '2 hours ago',
      content: 'Just tried a new deep conditioning treatment on a client with damaged hair. The results were amazing! Has anyone else tried protein treatments for heat damage?',
      likes: 45,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
    },
    {
      author: 'Michael Rodriguez',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop',
      role: 'Trichologist',
      time: '5 hours ago',
      content: 'Reminder: Scalp health is just as important as hair health! Make sure to massage your scalp regularly to improve circulation. 💆‍♀️',
      likes: 89,
      comments: 23,
    },
    {
      author: 'Emma Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop',
      role: 'Natural Hair Specialist',
      time: '1 day ago',
      content: 'Tutorial coming soon on protective styling for natural hair! What styles would you like to see? Drop your suggestions below! 👇',
      likes: 156,
      comments: 47,
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
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
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
          Community Hub
        </h1>
        <p className="text-gray-600 text-lg">Connect, share, and learn with hair care professionals</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg">
            <textarea
              placeholder="Share your hair care tips and experiences..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5 text-pink-500" />
                </button>
                <button className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-pink-500" />
                </button>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300">
                Post
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {posts.map((post, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover border-2 border-pink-200" />
                <div className="ml-3">
                  <h3 className="font-bold text-gray-800">{post.author}</h3>
                  <p className="text-sm text-gray-600">{post.role} • {post.time}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{post.content}</p>

              {post.image && (
                <img src={post.image} alt="Post" className="w-full rounded-xl mb-4" />
              )}

              <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-semibold">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">{post.comments} Comments</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors">
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
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-pink-500" />
              Community Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Members</span>
                <span className="text-2xl font-bold text-pink-600">50,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Posts Today</span>
                <span className="text-2xl font-bold text-pink-600">342</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Now</span>
                <span className="text-2xl font-bold text-pink-600">1,543</span>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-pink-500" />
              Trending Topics
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <button key={index} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-pink-50 transition-colors text-left">
                  <span className="font-semibold text-pink-600">{topic.tag}</span>
                  <span className="text-sm text-gray-600">{topic.posts} posts</span>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Connections */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Join the Conversation</h3>
            <p className="text-pink-100 text-sm mb-4">Connect with 50,000+ hair care professionals</p>
            <button className="w-full bg-white text-pink-600 py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
              Find Connections
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
