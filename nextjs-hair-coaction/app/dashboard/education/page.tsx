'use client'

import { BookOpen, Play, Award, Clock } from 'lucide-react'

export default function EducationPage() {
  const courses = [
    {
      title: 'Hair Care Fundamentals',
      description: 'Learn the basics of professional hair care',
      duration: '4 weeks',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      progress: 45,
    },
    {
      title: 'Advanced Styling Techniques',
      description: 'Master advanced styling and cutting methods',
      duration: '6 weeks',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      progress: 20,
    },
    {
      title: 'Hair Health & Treatments',
      description: 'Deep dive into hair health and treatment options',
      duration: '5 weeks',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=300&fit=crop',
      progress: 0,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
          Education Hub
        </h1>
        <p className="text-gray-600 text-lg">Advance your hair care knowledge with expert courses</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-pink-200/50 shadow-lg hover:scale-105 transition-transform duration-300">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                  {course.level}
                </span>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              {course.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Get Certified</h2>
            <p className="text-pink-100 text-lg">Complete courses and earn professional certificates</p>
          </div>
          <Award className="w-24 h-24 opacity-50" />
        </div>
      </div>
    </div>
  )
}
