'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, Star, Users, Award, Sparkles, Play, CheckCircle, 
  Calendar, BookOpen, MessageCircle, TrendingUp, Shield, Zap,
  Mail, Linkedin, Twitter, Instagram, Quote, ChevronRight,
  Heart, Target, Globe, Lightbulb, Check, X, Menu, Moon, Sun
} from 'lucide-react'

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true) // Dark mode enabled by default

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: 'Jessica Martinez',
      role: 'Professional Hair Stylist, Los Angeles',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'HairCoaction transformed my career! The education platform and community support helped me grow my salon by 300% in just 6 months.',
      rating: 5
    },
    {
      name: 'David Thompson',
      role: 'Certified Trichologist, New York',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'The expert consultation feature connects me with clients worldwide. The platform is intuitive, professional, and has everything I need.',
      rating: 5
    },
    {
      name: 'Aisha Patel',
      role: 'Natural Hair Specialist, London',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      content: 'Best platform for hair care professionals! The community is amazing, and the resources have helped me master new techniques.',
      rating: 5
    }
  ]

  const founders = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=400&h=400&fit=crop',
      bio: 'With over 15 years in the hair care industry, Sarah is a certified trichologist and passionate advocate for hair health education.',
      credentials: ['PhD in Trichology', 'Licensed Cosmetologist', '15+ Years Experience']
    },
    {
      name: 'Michael Chen',
      title: 'Co-Founder & CTO',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400&h=400&fit=crop',
      bio: 'A tech visionary with expertise in AI and platform development, Michael brings cutting-edge technology to hair care.',
      credentials: ['MS in Computer Science', 'AI Specialist', 'Former Tech Lead at Google']
    }
  ]

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50'
    }`}>
      {/* 3D Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {darkMode ? (
          <>
            <div className="absolute top-[-20%] left-[-15%] w-[50vw] h-[50vw] rounded-full blur-3xl animate-blob-3d bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-blue-600/30" />
            <div className="absolute bottom-[-20%] right-[-15%] w-[45vw] h-[45vw] rounded-full blur-3xl animate-blob-3d-delay-2 bg-gradient-to-br from-blue-600/20 via-purple-600/30 to-pink-600/20" />
            <div className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] rounded-full blur-3xl animate-blob-3d-delay-4 bg-gradient-to-br from-pink-500/15 via-purple-500/20 to-blue-500/15" />
          </>
        ) : (
          <>
            <div className="absolute top-[-20%] left-[-15%] w-[50vw] h-[50vw] rounded-full blur-3xl animate-blob-3d bg-gradient-to-br from-pink-400/30 via-rose-500/20 to-orange-400/30" />
            <div className="absolute bottom-[-20%] right-[-15%] w-[45vw] h-[45vw] rounded-full blur-3xl animate-blob-3d-delay-2 bg-gradient-to-br from-orange-400/20 via-pink-400/30 to-rose-500/20" />
            <div className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] rounded-full blur-3xl animate-blob-3d-delay-4 bg-gradient-to-br from-rose-300/15 via-pink-300/20 to-orange-300/15" />
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 backdrop-blur-xl shadow-xl border-b transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900/95 border-purple-800/50' 
          : 'bg-white/95 border-pink-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className={`text-3xl font-extrabold bg-gradient-to-r ${
              darkMode 
                ? 'from-purple-400 via-pink-400 to-blue-400' 
                : 'from-pink-500 via-orange-500 to-rose-500'
            } bg-clip-text text-transparent`}>
              HairCoaction
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`font-semibold transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:text-purple-400' 
                  : 'text-gray-700 hover:text-pink-600'
              }`}>Features</a>
              <a href="#testimonials" className={`font-semibold transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:text-purple-400' 
                  : 'text-gray-700 hover:text-pink-600'
              }`}>Testimonials</a>
              <a href="#team" className={`font-semibold transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:text-purple-400' 
                  : 'text-gray-700 hover:text-pink-600'
              }`}>Team</a>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-purple-900/50 hover:bg-purple-800/50 text-purple-300' 
                    : 'bg-pink-100 hover:bg-pink-200 text-pink-600'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <Link href="/login">
                <button className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                  darkMode 
                    ? 'text-purple-400 hover:bg-purple-900/50' 
                    : 'text-pink-600 hover:bg-pink-50'
                }`}>
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className={`px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg ${
                  darkMode 
                    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white' 
                    : 'bg-gradient-to-r from-pink-500 via-orange-400 to-rose-500 text-white'
                }`}>
                  Get Started Free
                </button>
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                darkMode ? 'hover:bg-purple-900/50' : 'hover:bg-pink-50'
              }`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg font-semibold ${
                  darkMode 
                    ? 'text-purple-400 hover:bg-purple-900/50' 
                    : 'text-pink-600 hover:bg-pink-50'
                }`}
              >
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <a href="#features" className={`block px-4 py-2 rounded-lg ${
                darkMode 
                  ? 'text-gray-300 hover:bg-purple-900/50' 
                  : 'text-gray-700 hover:bg-pink-50'
              }`}>Features</a>
              <a href="#testimonials" className={`block px-4 py-2 rounded-lg ${
                darkMode 
                  ? 'text-gray-300 hover:bg-purple-900/50' 
                  : 'text-gray-700 hover:bg-pink-50'
              }`}>Testimonials</a>
              <a href="#team" className={`block px-4 py-2 rounded-lg ${
                darkMode 
                  ? 'text-gray-300 hover:bg-purple-900/50' 
                  : 'text-gray-700 hover:bg-pink-50'
              }`}>Team</a>
              <Link href="/login" className="block">
                <button className={`w-full px-4 py-2 rounded-lg text-left font-semibold ${
                  darkMode 
                    ? 'text-purple-400 hover:bg-purple-900/50' 
                    : 'text-pink-600 hover:bg-pink-50'
                }`}>
                  Sign In
                </button>
              </Link>
              <Link href="/signup" className="block">
                <button className={`w-full px-4 py-2 rounded-lg font-semibold ${
                  darkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                }`}>
                  Get Started Free
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-purple-300 border-purple-700/50' 
                  : 'bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 border-pink-200'
              }`}>
                <Sparkles className="h-4 w-4 mr-2" />
                Trusted by 50,000+ Hair Care Professionals Worldwide
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className={`block text-transparent bg-gradient-to-r ${
                  darkMode 
                    ? 'from-purple-400 via-pink-400 to-blue-400' 
                    : 'from-pink-500 via-orange-500 to-rose-500'
                } bg-clip-text drop-shadow-sm`}>
                  Transform Your
                </span>
                <span className={`block mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Hair Care Business
                </span>
              </h1>
              
              <p className={`text-xl lg:text-2xl max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Join the world&apos;s leading platform connecting hair care professionals with clients, education, and a thriving community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/signup">
                  <button className={`group px-8 py-4 rounded-2xl font-bold text-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${
                    darkMode 
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:shadow-purple-500/50' 
                      : 'bg-gradient-to-r from-pink-500 via-orange-400 to-rose-500 text-white hover:shadow-pink-200/50'
                  }`}>
                    <span>Start Free 30-Day Trial</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className={`group px-8 py-4 backdrop-blur-sm border-2 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${
                  darkMode 
                    ? 'bg-white/10 border-purple-500 text-purple-300 hover:bg-white/20' 
                    : 'bg-white/80 border-pink-300 text-pink-700 hover:bg-white'
                }`}>
                  <Play className="h-6 w-6" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-3">
                    {['https://randomuser.me/api/portraits/women/1.jpg',
                      'https://randomuser.me/api/portraits/men/2.jpg',
                      'https://randomuser.me/api/portraits/women/3.jpg',
                      'https://randomuser.me/api/portraits/men/4.jpg'].map((img, i) => (
                      <img key={i} src={img} alt="" className={`w-12 h-12 rounded-full border-4 object-cover ${
                        darkMode ? 'border-gray-800' : 'border-white'
                      }`} />
                    ))}
                  </div>
                  <div className="text-left">
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>50,000+</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Professionals</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                  <div className="ml-2 text-left">
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>4.9/5</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>12K Reviews</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative perspective-1000">
              <div className="relative transform-gpu hover:rotate-y-6 transition-all duration-700">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop" 
                    alt="Professional Hair Care"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-pink-100 animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">300%</div>
                      <div className="text-sm text-gray-600">Revenue Growth</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-pink-100 animate-float-delay">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">24/7</div>
                      <div className="text-sm text-gray-600">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 backdrop-blur-xl relative z-10 ${
        darkMode ? 'bg-gray-800/30' : 'bg-white/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50,000+', label: 'Active Professionals', icon: Users, color: darkMode ? 'from-purple-500 to-pink-500' : 'from-pink-500 to-rose-500' },
              { value: '99.9%', label: 'Customer Satisfaction', icon: Heart, color: darkMode ? 'from-pink-500 to-blue-500' : 'from-rose-500 to-orange-500' },
              { value: '24/7', label: 'Expert Support', icon: Shield, color: darkMode ? 'from-blue-500 to-purple-500' : 'from-orange-500 to-pink-500' },
              { value: '500+', label: 'Certified Specialists', icon: Award, color: darkMode ? 'from-purple-600 to-pink-600' : 'from-pink-600 to-rose-600' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-xl border hover:scale-110 hover:shadow-2xl transition-all duration-500 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-purple-800/50' 
                    : 'bg-white/90 border-pink-100'
                }`}>
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                    <div className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl lg:text-6xl font-black mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Everything You Need to <span className={`text-transparent bg-gradient-to-r ${
                darkMode ? 'from-purple-400 via-pink-400 to-blue-400' : 'from-pink-500 via-orange-500 to-rose-500'
              } bg-clip-text`}>Succeed</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive tools and resources designed for hair care professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Expert Consultations',
                description: 'Connect with certified trichologists and specialists for personalized advice.',
                gradient: 'from-pink-500 to-rose-500',
                stats: '10,000+ Consultations/Month'
              },
              {
                icon: BookOpen,
                title: 'Professional Education',
                description: 'Access comprehensive courses and certifications from industry leaders.',
                gradient: 'from-rose-500 to-orange-500',
                stats: '200+ Courses Available'
              },
              {
                icon: Users,
                title: 'Thriving Community',
                description: 'Network with 50,000+ professionals and grow together.',
                gradient: 'from-orange-500 to-pink-500',
                stats: '50,000+ Members'
              },
              {
                icon: MessageCircle,
                title: 'Live Events & Workshops',
                description: 'Attend virtual and in-person events with industry experts.',
                gradient: 'from-pink-600 to-rose-600',
                stats: '100+ Events/Year'
              },
              {
                icon: TrendingUp,
                title: 'Business Analytics',
                description: 'Track your growth and optimize your hair care business.',
                gradient: 'from-rose-600 to-pink-600',
                stats: 'Real-time Insights'
              },
              {
                icon: Zap,
                title: 'AI-Powered Recommendations',
                description: 'Get personalized suggestions powered by advanced AI.',
                gradient: 'from-pink-500 to-orange-500',
                stats: '99% Accuracy Rate'
              }
            ].map((feature, index) => (
              <div key={index} className="group perspective-1000">
                <div className={`relative backdrop-blur-sm rounded-3xl p-8 shadow-xl border hover:shadow-2xl hover:scale-105 transition-all duration-500 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-purple-800/50' 
                    : 'bg-white/80 border-pink-100'
                }`}>
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                  <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
                  <div className={`flex items-center text-sm font-semibold ${darkMode ? 'text-purple-400' : 'text-pink-600'}`}>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {feature.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className={`py-20 px-4 sm:px-6 lg:px-8 relative z-10 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 to-purple-900/30' 
          : 'bg-gradient-to-br from-white to-pink-50/50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl lg:text-6xl font-black mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Loved by <span className={`text-transparent bg-gradient-to-r ${
                darkMode ? 'from-purple-400 to-pink-400' : 'from-pink-500 to-rose-500'
              } bg-clip-text`}>Professionals</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              See what our community members say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`group ${activeTestimonial === index ? 'scale-105' : 'scale-100'} transition-all duration-500`}>
                <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-xl border hover:shadow-2xl hover:scale-105 transition-all duration-500 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-purple-800/50' 
                    : 'bg-white/90 border-pink-100'
                }`}>
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className={`w-16 h-16 rounded-full border-4 object-cover ${
                        darkMode ? 'border-purple-700' : 'border-pink-200'
                      }`}
                    />
                    <div className="ml-4">
                      <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className={`h-8 w-8 mb-4 ${darkMode ? 'text-purple-700' : 'text-pink-200'}`} />
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl lg:text-6xl font-black mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Meet Our <span className={`text-transparent bg-gradient-to-r ${
                darkMode ? 'from-purple-400 to-pink-400' : 'from-pink-500 to-rose-500'
              } bg-clip-text`}>Founders</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Passionate experts dedicated to revolutionizing the hair care industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <div key={index} className="group">
                <div className={`backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border hover:shadow-3xl hover:scale-105 transition-all duration-500 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-purple-800/50' 
                    : 'bg-white/90 border-pink-100'
                }`}>
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                      darkMode ? 'from-purple-900/80' : 'from-pink-900/60'
                    }`}></div>
                  </div>
                  <div className="p-8">
                    <h3 className={`text-3xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{founder.name}</h3>
                    <p className={`text-xl font-bold mb-4 ${darkMode ? 'text-purple-400' : 'text-pink-600'}`}>{founder.title}</p>
                    <p className={`leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{founder.bio}</p>
                    
                    <div className="space-y-2">
                      {founder.credentials.map((cred, i) => (
                        <div key={i} className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {cred}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className={`rounded-3xl p-12 md:p-16 shadow-2xl text-center text-white ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600' 
              : 'bg-gradient-to-r from-pink-500 via-orange-400 to-rose-500'
          }`}>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className={`text-xl md:text-2xl mb-8 ${darkMode ? 'text-purple-100' : 'text-pink-100'}`}>
              Join 50,000+ professionals growing their careers with HairCoaction
            </p>
            <Link href="/signup">
              <button className={`px-10 py-5 rounded-2xl font-bold text-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 shadow-lg ${
                darkMode 
                  ? 'bg-white text-purple-600' 
                  : 'bg-white text-pink-600'
              }`}>
                Start Free 30-Day Trial
              </button>
            </Link>
            <p className={`mt-6 ${darkMode ? 'text-purple-100' : 'text-pink-100'}`}>
              No credit card required • Cancel anytime • 24/7 support
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob-3d {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1) translate(30px, -40px); }
          66% { transform: scale(0.95) translate(-20px, 20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-blob-3d {
          animation: blob-3d 8s ease-in-out infinite;
        }
        .animate-blob-3d-delay-2 {
          animation: blob-3d 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-blob-3d-delay-4 {
          animation: blob-3d 8s ease-in-out infinite;
          animation-delay: 4s;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}
