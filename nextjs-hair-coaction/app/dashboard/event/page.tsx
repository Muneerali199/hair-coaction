'use client'

import { Calendar, MapPin, Users, Clock, Heart } from 'lucide-react'

export default function EventPage() {
  const events = [
    {
      title: 'Hair Care Workshop: Natural Treatments',
      date: 'March 15, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Virtual Event',
      attendees: 145,
      category: 'Workshop',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      price: 'Free',
    },
    {
      title: 'Professional Hair Styling Masterclass',
      date: 'March 22, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Los Angeles, CA',
      attendees: 89,
      category: 'Masterclass',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      price: '$99',
    },
    {
      title: 'Hair Health Summit 2025',
      date: 'April 5, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'New York, NY',
      attendees: 320,
      category: 'Conference',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
      price: '$149',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
          Upcoming Events
        </h1>
        <p className="text-gray-600 text-lg">Join workshops, masterclasses, and networking events</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-pink-200/50 shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-pink-500 text-white rounded-full text-sm font-semibold">
                {event.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-pink-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-pink-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-pink-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3 text-pink-500" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                <div className="text-2xl font-bold text-pink-600">{event.price}</div>
                <div className="flex space-x-2">
                  <button className="p-2 border-2 border-pink-300 rounded-lg hover:bg-pink-50 transition-colors">
                    <Heart className="w-5 h-5 text-pink-500" />
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
        <div className="text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-2">Host Your Own Event</h2>
          <p className="text-pink-100 text-lg mb-6">Share your expertise with the community</p>
          <button className="px-8 py-3 bg-white text-pink-600 rounded-xl font-bold hover:scale-105 transition-all duration-300">
            Create Event
          </button>
        </div>
      </div>
    </div>
  )
}
