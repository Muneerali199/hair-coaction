-- =============================================
-- HAIR COACTION - COMPLETE DATABASE SCHEMA
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. PROFILES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'professional', 'admin')),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled')),
  subscription_end_date TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT false,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. HAIR PROFILES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS hair_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  hair_type TEXT CHECK (hair_type IN ('straight', 'wavy', 'curly', 'coily')),
  hair_texture TEXT CHECK (hair_texture IN ('fine', 'medium', 'thick')),
  scalp_type TEXT CHECK (scalp_type IN ('dry', 'normal', 'oily', 'combination')),
  hair_length TEXT CHECK (hair_length IN ('short', 'medium', 'long')),
  hair_color TEXT,
  natural_color TEXT,
  chemically_treated BOOLEAN DEFAULT false,
  treatment_history TEXT[],
  concerns TEXT[],
  goals TEXT[],
  allergies TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- =============================================
-- 3. ROUTINES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS routines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  routine_type TEXT CHECK (routine_type IN ('daily', 'weekly', 'monthly', 'custom')),
  frequency TEXT,
  duration_minutes INTEGER,
  steps JSONB DEFAULT '[]',
  products_used UUID[],
  is_active BOOLEAN DEFAULT true,
  is_public BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 4. PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT CHECK (category IN ('shampoo', 'conditioner', 'treatment', 'oil', 'serum', 'mask', 'styling', 'other')),
  product_type TEXT,
  ingredients TEXT[],
  benefits TEXT[],
  usage_instructions TEXT,
  price DECIMAL(10,2),
  where_to_buy TEXT,
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  reviews_count INTEGER DEFAULT 0,
  image_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 5. USER PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS user_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  purchase_date DATE,
  expiry_date DATE,
  status TEXT DEFAULT 'in_use' CHECK (status IN ('in_use', 'finished', 'discontinued')),
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  review TEXT,
  would_recommend BOOLEAN,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- =============================================
-- 6. PROGRESS TRACKING TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS progress_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  photo_url TEXT,
  notes TEXT,
  measurements JSONB DEFAULT '{}',
  hair_health_score INTEGER CHECK (hair_health_score >= 0 AND hair_health_score <= 100),
  mood TEXT CHECK (mood IN ('excellent', 'good', 'fair', 'poor')),
  tags TEXT[],
  is_milestone BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- =============================================
-- 7. GOALS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('not_started', 'in_progress', 'completed', 'abandoned')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  milestones JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- =============================================
-- 8. CONSULTATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  expert_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  consultation_type TEXT CHECK (consultation_type IN ('video', 'chat', 'in_person')),
  scheduled_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  meeting_url TEXT,
  notes TEXT,
  price DECIMAL(10,2),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 9. EXPERTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS experts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  title TEXT NOT NULL,
  specialization TEXT[],
  certification TEXT[],
  years_experience INTEGER,
  bio TEXT,
  availability JSONB DEFAULT '{}',
  hourly_rate DECIMAL(10,2),
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  total_consultations INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  is_accepting_clients BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 10. COURSES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  category TEXT,
  duration_weeks INTEGER,
  total_lessons INTEGER,
  price DECIMAL(10,2),
  thumbnail_url TEXT,
  video_url TEXT,
  syllabus JSONB DEFAULT '[]',
  prerequisites TEXT[],
  what_you_learn TEXT[],
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  enrolled_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 11. ENROLLMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMPTZ DEFAULT NOW(),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  completed_lessons INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  certificate_url TEXT,
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  review TEXT,
  UNIQUE(user_id, course_id)
);

-- =============================================
-- 12. EVENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT CHECK (event_type IN ('workshop', 'masterclass', 'conference', 'webinar', 'networking')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  is_virtual BOOLEAN DEFAULT false,
  meeting_url TEXT,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0,
  image_url TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('draft', 'upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 13. EVENT REGISTRATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  attendance_status TEXT DEFAULT 'registered' CHECK (attendance_status IN ('registered', 'attended', 'no_show', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- =============================================
-- 14. COMMUNITY POSTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  images TEXT[],
  tags TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  is_hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 15. POST COMMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES post_comments(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 16. POST LIKES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- =============================================
-- 17. NOTIFICATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 18. ACTIVITY LOG TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Profiles
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_subscription_tier ON profiles(subscription_tier);

-- Hair Profiles
CREATE INDEX idx_hair_profiles_user_id ON hair_profiles(user_id);

-- Routines
CREATE INDEX idx_routines_user_id ON routines(user_id);
CREATE INDEX idx_routines_is_public ON routines(is_public);

-- Products
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_rating ON products(rating);

-- Progress Tracking
CREATE INDEX idx_progress_user_date ON progress_tracking(user_id, date);

-- Consultations
CREATE INDEX idx_consultations_client_id ON consultations(client_id);
CREATE INDEX idx_consultations_expert_id ON consultations(expert_id);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_scheduled_date ON consultations(scheduled_date);

-- Courses
CREATE INDEX idx_courses_instructor_id ON courses(instructor_id);
CREATE INDEX idx_courses_is_published ON courses(is_published);

-- Events
CREATE INDEX idx_events_organizer_id ON events(organizer_id);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_status ON events(status);

-- Community Posts
CREATE INDEX idx_community_posts_author_id ON community_posts(author_id);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);

-- Notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(user_id, is_read);

-- Activity Log
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hair_profiles_updated_at BEFORE UPDATE ON hair_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routines_updated_at BEFORE UPDATE ON routines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_products_updated_at BEFORE UPDATE ON user_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experts_updated_at BEFORE UPDATE ON experts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON community_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_post_comments_updated_at BEFORE UPDATE ON post_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
