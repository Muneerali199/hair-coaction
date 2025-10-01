'use client'

import { Stethoscope, Calendar, Clock, Star, Video } from 'lucide-react'

export default function ConsultationPage() {
  const experts = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Certified Trichologist',
      rating: 4.9,
      reviews: 234,
      specialization: 'Hair Loss & Scalp Conditions',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=300&h=300&fit=crop',
      availability: 'Available Today',
    },
    {
      name: 'Emma Rodriguez',
      title: 'Master Hair Stylist',
      rating: 4.8,
      reviews: 189,
      specialization: 'Styling & Color Treatments',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=300&h=300&fit=crop',
      availability: 'Next Available: Tomorrow',
    },
    {
      name: 'Michael Chen',
      title: 'Hair Care Specialist',
      rating: 5.0,
      reviews: 156,
      specialization: 'Natural Hair Care',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=300&h=300&fit=crop',
      availability: 'Available Today',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
          Expert Consultations
        </h1>
        <p className="text-gray-600 text-lg">Book one-on-one sessions with certified hair care professionals</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {experts.map((expert, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl border border-pink-200/50 shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <div className="flex flex-col items-center mb-4">
                <img 
                  src={expert.image} 
                  alt={expert.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-pink-200 mb-3"
                />
                <h3 className="text-xl font-bold text-gray-800">{expert.name}</h3>
                <p className="text-pink-600 font-semibold">{expert.title}</p>
              </div>

              <div className="flex items-center justify-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(expert.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm">({expert.reviews} reviews)</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Stethoscope className="w-4 h-4 mr-2 text-pink-500" />
                  <span className="text-sm">{expert.specialization}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-pink-500" />
                  <span className="text-sm">{expert.availability}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Video className="w-5 h-5 mr-2" />
                  Book Video Call
                </button>
                <button className="w-full border-2 border-pink-500 text-pink-600 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Professional Consultation Benefits</h2>
          <p className="text-pink-100 text-lg mb-6">Get personalized advice from certified experts</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">Personalized Plans</h3>
              <p className="text-pink-100 text-sm">Customized hair care routines</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">Expert Guidance</h3>
              <p className="text-pink-100 text-sm">Professional recommendations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">Follow-up Support</h3>
              <p className="text-pink-100 text-sm">Ongoing care and monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
