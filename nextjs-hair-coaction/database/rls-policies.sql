-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hair_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PROFILES POLICIES
-- =============================================

-- Users can view all profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- =============================================
-- HAIR PROFILES POLICIES
-- =============================================

-- Users can view their own hair profile
CREATE POLICY "Users can view own hair profile"
  ON hair_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own hair profile
CREATE POLICY "Users can insert own hair profile"
  ON hair_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own hair profile
CREATE POLICY "Users can update own hair profile"
  ON hair_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- ROUTINES POLICIES
-- =============================================

-- Users can view their own routines and public routines
CREATE POLICY "Users can view own and public routines"
  ON routines FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

-- Users can insert their own routines
CREATE POLICY "Users can insert own routines"
  ON routines FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own routines
CREATE POLICY "Users can update own routines"
  ON routines FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own routines
CREATE POLICY "Users can delete own routines"
  ON routines FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- PRODUCTS POLICIES
-- =============================================

-- Everyone can view products
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

-- Authenticated users can insert products
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own products
CREATE POLICY "Users can update own products"
  ON products FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- USER PRODUCTS POLICIES
-- =============================================

-- Users can view their own products
CREATE POLICY "Users can view own user products"
  ON user_products FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own products
CREATE POLICY "Users can insert own user products"
  ON user_products FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own products
CREATE POLICY "Users can update own user products"
  ON user_products FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own products
CREATE POLICY "Users can delete own user products"
  ON user_products FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- PROGRESS TRACKING POLICIES
-- =============================================

-- Users can view their own progress
CREATE POLICY "Users can view own progress"
  ON progress_tracking FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert own progress"
  ON progress_tracking FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress"
  ON progress_tracking FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own progress
CREATE POLICY "Users can delete own progress"
  ON progress_tracking FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- GOALS POLICIES
-- =============================================

-- Users can view their own goals
CREATE POLICY "Users can view own goals"
  ON goals FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own goals
CREATE POLICY "Users can insert own goals"
  ON goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own goals
CREATE POLICY "Users can update own goals"
  ON goals FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own goals
CREATE POLICY "Users can delete own goals"
  ON goals FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- CONSULTATIONS POLICIES
-- =============================================

-- Users can view consultations they're involved in
CREATE POLICY "Users can view own consultations"
  ON consultations FOR SELECT
  USING (auth.uid() = client_id OR auth.uid() = expert_id);

-- Users can insert consultations as client
CREATE POLICY "Users can create consultations"
  ON consultations FOR INSERT
  WITH CHECK (auth.uid() = client_id);

-- Participants can update consultations
CREATE POLICY "Participants can update consultations"
  ON consultations FOR UPDATE
  USING (auth.uid() = client_id OR auth.uid() = expert_id);

-- =============================================
-- EXPERTS POLICIES
-- =============================================

-- Everyone can view verified experts
CREATE POLICY "Everyone can view experts"
  ON experts FOR SELECT
  USING (true);

-- Users can insert their own expert profile
CREATE POLICY "Users can create expert profile"
  ON experts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own expert profile
CREATE POLICY "Users can update own expert profile"
  ON experts FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- COURSES POLICIES
-- =============================================

-- Everyone can view published courses
CREATE POLICY "Everyone can view published courses"
  ON courses FOR SELECT
  USING (is_published = true OR auth.uid() = instructor_id);

-- Instructors can insert courses
CREATE POLICY "Instructors can create courses"
  ON courses FOR INSERT
  WITH CHECK (auth.uid() = instructor_id);

-- Instructors can update their own courses
CREATE POLICY "Instructors can update own courses"
  ON courses FOR UPDATE
  USING (auth.uid() = instructor_id);

-- Instructors can delete their own courses
CREATE POLICY "Instructors can delete own courses"
  ON courses FOR DELETE
  USING (auth.uid() = instructor_id);

-- =============================================
-- ENROLLMENTS POLICIES
-- =============================================

-- Users can view their own enrollments
CREATE POLICY "Users can view own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = user_id);

-- Users can enroll in courses
CREATE POLICY "Users can enroll in courses"
  ON enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own enrollments
CREATE POLICY "Users can update own enrollments"
  ON enrollments FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- EVENTS POLICIES
-- =============================================

-- Everyone can view upcoming events
CREATE POLICY "Everyone can view events"
  ON events FOR SELECT
  USING (status != 'draft' OR auth.uid() = organizer_id);

-- Users can create events
CREATE POLICY "Users can create events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);

-- Organizers can update their events
CREATE POLICY "Organizers can update own events"
  ON events FOR UPDATE
  USING (auth.uid() = organizer_id);

-- Organizers can delete their events
CREATE POLICY "Organizers can delete own events"
  ON events FOR DELETE
  USING (auth.uid() = organizer_id);

-- =============================================
-- EVENT REGISTRATIONS POLICIES
-- =============================================

-- Users can view their own registrations
CREATE POLICY "Users can view own registrations"
  ON event_registrations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can register for events
CREATE POLICY "Users can register for events"
  ON event_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own registrations
CREATE POLICY "Users can update own registrations"
  ON event_registrations FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- COMMUNITY POSTS POLICIES
-- =============================================

-- Everyone can view non-hidden posts
CREATE POLICY "Everyone can view posts"
  ON community_posts FOR SELECT
  USING (is_hidden = false OR auth.uid() = author_id);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
  ON community_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);

-- Authors can update their posts
CREATE POLICY "Authors can update own posts"
  ON community_posts FOR UPDATE
  USING (auth.uid() = author_id);

-- Authors can delete their posts
CREATE POLICY "Authors can delete own posts"
  ON community_posts FOR DELETE
  USING (auth.uid() = author_id);

-- =============================================
-- POST COMMENTS POLICIES
-- =============================================

-- Everyone can view comments
CREATE POLICY "Everyone can view comments"
  ON post_comments FOR SELECT
  USING (true);

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments"
  ON post_comments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);

-- Authors can update their comments
CREATE POLICY "Authors can update own comments"
  ON post_comments FOR UPDATE
  USING (auth.uid() = author_id);

-- Authors can delete their comments
CREATE POLICY "Authors can delete own comments"
  ON post_comments FOR DELETE
  USING (auth.uid() = author_id);

-- =============================================
-- POST LIKES POLICIES
-- =============================================

-- Users can view all likes
CREATE POLICY "Users can view likes"
  ON post_likes FOR SELECT
  USING (true);

-- Users can like posts
CREATE POLICY "Users can like posts"
  ON post_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can unlike posts
CREATE POLICY "Users can unlike posts"
  ON post_likes FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- NOTIFICATIONS POLICIES
-- =============================================

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own notifications
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own notifications
CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- ACTIVITY LOG POLICIES
-- =============================================

-- Users can view their own activity
CREATE POLICY "Users can view own activity"
  ON activity_log FOR SELECT
  USING (auth.uid() = user_id);

-- System can insert activity (through backend)
CREATE POLICY "Authenticated users can log activity"
  ON activity_log FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);
