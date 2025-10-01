'use client'

import { useState } from 'react'
import { Stethoscope, Calendar, Clock, Star, Video, UserCircle } from 'lucide-react'

export default function ConsultationPage() {
  const [darkMode] = useState(true)
  
  const experts = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Certified Trichologist',
      rating: 4.9,
      reviews: 234,
      specialization: 'Hair Loss & Scalp Conditions',
      gradient: 'from-purple-500 to-pink-500',
      availability: 'Available Today',
    },
    {
      name: 'Emma Rodriguez',
      title: 'Master Hair Stylist',
      rating: 4.8,
      reviews: 189,
      specialization: 'Styling & Color Treatments',
      gradient: 'from-pink-500 to-blue-500',
      availability: 'Next Available: Tomorrow',
    },
    {
      name: 'Michael Chen',
      title: 'Hair Care Specialist',
      rating: 5.0,
      reviews: 156,
      specialization: 'Natural Hair Care',
      gradient: 'from-blue-500 to-purple-500',
      availability: 'Available Today',
    },
  ]

  return (
    <div className="space-y-8">
      <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-xl ${
        darkMode ? 'bg-gray-800/50 border-purple-800/50' : 'bg-white/60 border-pink-200/50'
      }`}>
        <h1 className={`text-4xl font-bold mb-2 ${
          darkMode ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent'
        }`}>
          Expert Consultations
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Book one-on-one sessions with certified hair care professionals</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {experts.map((expert, index) => (
          <div key={index} className={`backdrop-blur-sm rounded-2xl border shadow-lg hover:scale-105 transition-transform duration-300 ${
            darkMode ? 'bg-gray-800/50 border-purple-800/50' : 'bg-white/70 border-pink-200/50'
          }`}>
            <div className="p-6">
              <div className="flex flex-col items-center mb-4">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${expert.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                  <UserCircle className="w-16 h-16 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{expert.name}</h3>
                <p className={`font-semibold ${darkMode ? 'text-purple-400' : 'text-pink-600'}`}>{expert.title}</p>
              </div>

              <div className="flex items-center justify-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(expert.rating) ? 'text-yellow-400 fill-current' : darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>({expert.reviews} reviews)</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Stethoscope className={`w-4 h-4 mr-2 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
                  <span className="text-sm">{expert.specialization}</span>
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Clock className={`w-4 h-4 mr-2 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
                  <span className="text-sm">{expert.availability}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button className={`w-full py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg bg-gradient-to-r ${expert.gradient} text-white`}>
                  <Video className="w-5 h-5 mr-2" />
                  Book Video Call
                </button>
                <button className={`w-full border-2 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                  darkMode ? 'border-purple-500 text-purple-400 hover:bg-purple-900/50' : 'border-pink-500 text-pink-600 hover:bg-pink-50'
                }`}>
                  <Calendar className="w-5 h-5 mr-2" />
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Professional Consultation Benefits</h2>
          <p className="text-purple-100 text-lg mb-6">Get personalized advice from certified experts</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">Personalized Plans</h3>
              <p className="text-purple-100 text-sm">Customized hair care routines</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">Expert Guidance</h3>
              <p className="text-purple-100 text-sm">Professional recommendations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">Follow-up Support</h3>
              <p className="text-purple-100 text-sm">Ongoing care and monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
