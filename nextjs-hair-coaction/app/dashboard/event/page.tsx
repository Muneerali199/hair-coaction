'use client'

import { useState } from 'react'
import { Calendar, MapPin, Users, Clock, Heart } from 'lucide-react'

export default function EventPage() {
  const [darkMode] = useState(true)
  
  const events = [
    {
      title: 'Hair Care Workshop: Natural Treatments',
      date: 'March 15, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Virtual Event',
      attendees: 145,
      category: 'Workshop',
      gradient: 'from-purple-500 to-pink-500',
      price: 'Free',
    },
    {
      title: 'Professional Hair Styling Masterclass',
      date: 'March 22, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Los Angeles, CA',
      attendees: 89,
      category: 'Masterclass',
      gradient: 'from-pink-500 to-blue-500',
      price: '$99',
    },
    {
      title: 'Hair Health Summit 2025',
      date: 'April 5, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'New York, NY',
      attendees: 320,
      category: 'Conference',
      gradient: 'from-blue-500 to-purple-500',
      price: '$149',
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
          Upcoming Events
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Join workshops, masterclasses, and networking events</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <div key={index} className={`backdrop-blur-sm rounded-2xl overflow-hidden border shadow-lg hover:scale-105 transition-transform duration-300 ${
            darkMode ? 'bg-gray-800/50 border-purple-800/50' : 'bg-white/70 border-pink-200/50'
          }`}>
            <div className="relative">
              <div className={`w-full h-48 bg-gradient-to-br ${event.gradient} flex items-center justify-center`}>
                <Calendar className="w-24 h-24 text-white opacity-30" />
              </div>
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                darkMode ? 'bg-purple-600 text-white' : 'bg-pink-500 text-white'
              }`}>
                {event.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{event.title}</h3>
              
              <div className="space-y-3 mb-4">
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Calendar className={`w-5 h-5 mr-3 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
                  <span>{event.date}</span>
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Clock className={`w-5 h-5 mr-3 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
                  <span>{event.time}</span>
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <MapPin className={`w-5 h-5 mr-3 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
                  <span>{event.location}</span>
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Users className={`w-5 h-5 mr-3 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>

              <div className={`flex items-center justify-between pt-4 border-t ${
                darkMode ? 'border-purple-800/50' : 'border-pink-100'
              }`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-pink-600'}`}>{event.price}</div>
                <div className="flex space-x-2">
                  <button className={`p-2 border-2 rounded-lg transition-colors ${
                    darkMode ? 'border-purple-700 hover:bg-purple-900/50' : 'border-pink-300 hover:bg-pink-50'
                  }`}>
                    <Heart className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} />
                  </button>
                  <button className={`px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300 text-white bg-gradient-to-r ${event.gradient} shadow-lg`}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-2">Host Your Own Event</h2>
          <p className="text-purple-100 text-lg mb-6">Share your expertise with the community</p>
          <button className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-bold hover:bg-white/30 hover:scale-105 transition-all duration-300">
            Create Event
          </button>
        </div>
      </div>
    </div>
  )
}
