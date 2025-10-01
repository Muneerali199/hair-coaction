'use client'

import React from 'react'

interface BeautifulLoaderProps {
  darkMode: boolean
}

const BeautifulLoader: React.FC<BeautifulLoaderProps> = ({ darkMode }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100'}`}>
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-pink-200 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-pink-500 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-rose-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Loading HairCoaction...
        </h2>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Please wait</p>
      </div>
    </div>
  )
}

export default BeautifulLoader
