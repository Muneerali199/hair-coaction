'use client'

import { useState } from 'react'
import { BookOpen, Play, Award, Clock, Star, CheckCircle } from 'lucide-react'

export default function EducationPage() {
  const [darkMode] = useState(true)
  
  const courses = [
    {
      title: 'Hair Care Fundamentals',
      description: 'Learn the basics of professional hair care',
      duration: '4 weeks',
      level: 'Beginner',
      icon: BookOpen,
      gradient: 'from-purple-500 to-pink-500',
      progress: 45,
      lessons: 12,
    },
    {
      title: 'Advanced Styling Techniques',
      description: 'Master advanced styling and cutting methods',
      duration: '6 weeks',
      level: 'Advanced',
      icon: Award,
      gradient: 'from-pink-500 to-blue-500',
      progress: 20,
      lessons: 18,
    },
    {
      title: 'Hair Health & Treatments',
      description: 'Deep dive into hair health and treatment options',
      duration: '5 weeks',
      level: 'Intermediate',
      icon: Star,
      gradient: 'from-blue-500 to-purple-500',
      progress: 0,
      lessons: 15,
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
          Education Hub
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Advance your hair care knowledge with expert courses</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div key={index} className={`backdrop-blur-sm rounded-2xl overflow-hidden border shadow-lg hover:scale-105 transition-transform duration-300 ${
            darkMode ? 'bg-gray-800/50 border-purple-800/50' : 'bg-white/70 border-pink-200/50'
          }`}>
            <div className={`h-48 bg-gradient-to-br ${course.gradient} flex items-center justify-center`}>
              <course.icon className="h-24 w-24 text-white opacity-50" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-pink-100 text-pink-700'
                }`}>
                  {course.level}
                </span>
                <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{course.title}</h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{course.description}</p>
              
              <div className={`flex items-center gap-2 mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <BookOpen className="w-4 h-4" />
                <span>{course.lessons} lessons</span>
              </div>

              {course.progress > 0 && (
                <div className="mb-4">
                  <div className={`flex justify-between text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className={`bg-gradient-to-r ${course.gradient} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button className={`w-full py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center bg-gradient-to-r ${course.gradient} text-white shadow-lg hover:shadow-xl`}>
                <Play className="w-5 h-5 mr-2" />
                {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`backdrop-blur-sm rounded-2xl p-8 text-white shadow-xl bg-gradient-to-r ${
        darkMode ? 'from-purple-600 via-pink-600 to-blue-600' : 'from-pink-500 to-rose-500'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Get Certified</h2>
            <p className="text-purple-100 text-lg">Complete courses and earn professional certificates</p>
          </div>
          <Award className="w-24 h-24 opacity-50" />
        </div>
      </div>
    </div>
  )
}
