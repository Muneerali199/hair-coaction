'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, Camera, Edit3, Save, X, Check } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const supabase = createClient()

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    bio: '',
    title: '',
    organization: '',
    specialization: '',
    experience: '',
    education: '',
    certifications: [] as string[],
    profileImage: '',
    showEmail: true,
    showPhone: true,
    showLocation: true,
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        setProfileData(prev => ({ ...prev, email: session.user.email || '' }))
        
        // Fetch profile from database
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setProfileData({
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            email: profile.email || '',
            phone: profile.phone || '',
            location: profile.location || '',
            dateOfBirth: profile.date_of_birth || '',
            bio: profile.bio || '',
            title: profile.title || '',
            organization: profile.organization || '',
            specialization: profile.specialization || '',
            experience: profile.experience || '',
            education: profile.education || '',
            certifications: profile.certifications || [],
            profileImage: profile.profile_image || '',
            showEmail: profile.show_email ?? true,
            showPhone: profile.show_phone ?? true,
            showLocation: profile.show_location ?? true,
          })
        }
      }
    }
    getUser()
  }, [supabase])

  const handleSave = async () => {
    if (!user?.id) return
    
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: profileData.email,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
          location: profileData.location,
          date_of_birth: profileData.dateOfBirth,
          bio: profileData.bio,
          title: profileData.title,
          organization: profileData.organization,
          specialization: profileData.specialization,
          experience: profileData.experience,
          education: profileData.education,
          certifications: profileData.certifications,
          profile_image: profileData.profileImage,
          show_email: profileData.showEmail,
          show_phone: profileData.showPhone,
          show_location: profileData.showLocation,
        })

      if (error) throw error

      setIsEditing(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <Check className="h-5 w-5 mr-2" />
          Profile updated successfully!
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-orange-500 to-pink-600 bg-clip-text text-transparent mb-4">
          My Profile
        </h1>
        <p className="text-lg text-gray-700">Manage your personal and professional information</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100 sticky top-8">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 flex items-center justify-center text-white text-4xl font-bold">
                  {profileData.firstName?.[0] || 'U'}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full shadow-lg hover:bg-pink-600">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-4">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-pink-600 font-semibold">{profileData.title}</p>
              <p className="text-gray-600">{profileData.organization}</p>
            </div>

            <div className="space-y-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                  <Edit3 className="h-5 w-5 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    ) : (
                      <Save className="h-5 w-5 mr-2" />
                    )}
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Profile Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
              <User className="h-6 w-6 mr-3 text-pink-500" />
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="Enter first name"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.firstName || '-'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="Enter last name"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.lastName || '-'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-pink-500" />
                  {profileData.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="Enter phone"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-pink-500" />
                    {profileData.phone || '-'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="Enter location"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-pink-500" />
                    {profileData.location || '-'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                    {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : '-'}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.bio || '-'}</div>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
              <Briefcase className="h-6 w-6 mr-3 text-pink-500" />
              Professional Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.title}
                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="Enter title"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.title || '-'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Organization</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.organization}
                    onChange={(e) => setProfileData({ ...profileData, organization: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="Enter organization"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.organization || '-'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.specialization}
                    onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="Enter specialization"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.specialization || '-'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="Years of experience"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{profileData.experience || '-'}</div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.education}
                  onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                  placeholder="Enter education background"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2 text-pink-500" />
                  {profileData.education || '-'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
