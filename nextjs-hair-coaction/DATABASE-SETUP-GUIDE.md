# 🗄️ Complete Database Setup Guide

## 📋 Overview

This guide will walk you through setting up the complete backend database for your Hair Coaction platform using Supabase.

### Database Features
- ✅ 18 Complete Tables
- ✅ Row Level Security (RLS)
- ✅ Automated Triggers
- ✅ Indexes for Performance
- ✅ RESTful API Routes
- ✅ TypeScript Support

---

## 🚀 Step 1: Create Supabase Project

### 1.1 Sign Up & Create Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Create a new organization (if you don't have one)
4. Click "New Project"
5. Fill in:
   - **Project Name**: hair-coaction
   - **Database Password**: (save this securely!)
   - **Region**: Choose closest to your users
6. Click "Create new project"

**Wait 2-3 minutes** for your project to be created.

---

## 🗃️ Step 2: Run Database Schema

### 2.1 Open SQL Editor

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**

### 2.2 Run Schema File

1. Open the file: `database/schema.sql`
2. **Copy ALL the content**
3. Paste into the SQL Editor
4. Click **"Run"** button (or press Ctrl/Cmd + Enter)

✅ You should see: **"Success. No rows returned"**

This creates:
- 18 tables (profiles, routines, courses, events, etc.)
- All indexes for performance
- Automated triggers for `updated_at` fields

---

## 🔒 Step 3: Setup Row Level Security

### 3.1 Run RLS Policies

1. Click **"New query"** again in SQL Editor
2. Open the file: `database/rls-policies.sql`
3. **Copy ALL the content**
4. Paste into the SQL Editor
5. Click **"Run"**

✅ You should see: **"Success. No rows returned"**

This enables:
- User-specific data access
- Public/private content control
- Secure multi-user support

---

## 🔑 Step 4: Get Your API Keys

### 4.1 Find Your Keys

1. Go to **"Project Settings"** (gear icon in sidebar)
2. Click **"API"** tab
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)

### 4.2 Update .env File

Create `.env.local` in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Replace** with your actual values!

---

## 🎯 Step 5: Enable Authentication

### 5.1 Setup Auth Providers

1. Go to **"Authentication"** → **"Providers"**
2. Enable **"Email"**:
   - Toggle ON
   - Enable "Confirm email" (optional)
3. Enable **"Google"** (optional):
   - Toggle ON
   - Add Client ID & Secret from Google Console

### 5.2 Configure Auth Settings

1. Go to **"Authentication"** → **"URL Configuration"**
2. Add these URLs:
   ```
   Site URL: http://localhost:3001
   Redirect URLs:
   - http://localhost:3001
   - http://localhost:3001/auth/callback
   - https://your-domain.vercel.app
   - https://your-domain.vercel.app/auth/callback
   ```

---

## 📊 Step 6: Create Initial Profile Trigger

This automatically creates a profile when a user signs up.

### 6.1 Run Profile Trigger

In SQL Editor, run:

```sql
-- Create profile automatically on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

✅ **Success!** New users will automatically get a profile.

---

## 🧪 Step 7: Test Your Database

### 7.1 Create Test User

1. Run your app: `npm run dev`
2. Go to http://localhost:3001
3. Click "Sign Up"
4. Create an account

### 7.2 Verify in Supabase

1. Go to **"Table Editor"**
2. Open **"profiles"** table
3. You should see your new user!

### 7.3 Test API Routes

Open your browser console and try:

```javascript
// Get profile
fetch('/api/profile')
  .then(r => r.json())
  .then(console.log)

// Get courses
fetch('/api/courses')
  .then(r => r.json())
  .then(console.log)
```

---

## 📦 Step 8: Seed Sample Data (Optional)

### 8.1 Add Sample Courses

```sql
INSERT INTO courses (
  instructor_id,
  title,
  description,
  level,
  category,
  duration_weeks,
  total_lessons,
  price,
  is_published
) VALUES
  (
    (SELECT id FROM profiles LIMIT 1),
    'Hair Care Fundamentals',
    'Learn the basics of professional hair care',
    'beginner',
    'foundations',
    4,
    12,
    0,
    true
  ),
  (
    (SELECT id FROM profiles LIMIT 1),
    'Advanced Styling Techniques',
    'Master advanced styling methods',
    'advanced',
    'styling',
    6,
    18,
    99,
    true
  );
```

### 8.2 Add Sample Events

```sql
INSERT INTO events (
  organizer_id,
  title,
  description,
  event_type,
  start_date,
  end_date,
  location,
  is_virtual,
  price,
  status
) VALUES
  (
    (SELECT id FROM profiles LIMIT 1),
    'Hair Care Workshop: Natural Treatments',
    'Learn natural hair treatments',
    'workshop',
    NOW() + INTERVAL '7 days',
    NOW() + INTERVAL '7 days' + INTERVAL '3 hours',
    'Virtual Event',
    true,
    0,
    'upcoming'
  );
```

---

## 🔧 Step 9: Setup Storage (For Images)

### 9.1 Create Storage Buckets

1. Go to **"Storage"** in sidebar
2. Click **"Create a new bucket"**
3. Create these buckets:

**Bucket: avatars**
- Name: `avatars`
- Public: ✅ Yes
- File size limit: 2MB
- Allowed MIME types: `image/*`

**Bucket: progress-photos**
- Name: `progress-photos`
- Public: ✅ Yes
- File size limit: 5MB
- Allowed MIME types: `image/*`

**Bucket: course-content**
- Name: `course-content`
- Public: ✅ Yes
- File size limit: 50MB
- Allowed MIME types: `image/*, video/*`

### 9.2 Set Storage Policies

For each bucket, add policies:

```sql
-- Allow users to upload their own files
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to update their own files
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Allow everyone to view files
CREATE POLICY "Files are publicly accessible"
ON storage.objects FOR SELECT
USING (true);
```

---

## 📊 Step 10: Database Tables Overview

### Core Tables

1. **profiles** - User profiles and settings
2. **hair_profiles** - Hair-specific information
3. **routines** - Hair care routines
4. **products** - Hair care products catalog
5. **user_products** - Products users own/use
6. **progress_tracking** - Hair progress photos & notes
7. **goals** - User hair goals

### Professional Features

8. **consultations** - Expert consultations
9. **experts** - Expert profiles
10. **courses** - Educational courses
11. **enrollments** - Course enrollments
12. **events** - Workshops, conferences
13. **event_registrations** - Event signups

### Community Features

14. **community_posts** - User posts
15. **post_comments** - Comments on posts
16. **post_likes** - Post likes
17. **notifications** - User notifications
18. **activity_log** - Activity tracking

---

## 🎯 Step 11: API Routes Overview

Your backend includes these API routes:

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Routines
- `GET /api/routines` - List routines
- `POST /api/routines` - Create routine

### Consultations
- `GET /api/consultations` - List consultations
- `POST /api/consultations` - Book consultation

### Courses
- `GET /api/courses` - List courses
- `POST /api/courses` - Create course

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event

### Community
- `GET /api/community/posts` - List posts
- `POST /api/community/posts` - Create post

---

## 🔍 Step 12: Verify Everything Works

### 12.1 Check Tables

```sql
-- Count tables
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';
-- Should return: 18

-- List all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

### 12.2 Check RLS

```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
-- All should show 't' (true)
```

### 12.3 Check Triggers

```sql
-- List triggers
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';
-- Should see updated_at triggers
```

---

## 🚨 Troubleshooting

### Issue: Tables not created
**Solution**: Make sure you ran the entire `schema.sql` file. Check for error messages.

### Issue: RLS errors
**Solution**: Verify you ran `rls-policies.sql` after creating tables.

### Issue: Can't insert data
**Solution**: Check if you're logged in. RLS requires authentication.

### Issue: API routes return 401
**Solution**: Verify `.env.local` has correct Supabase keys.

### Issue: Profile not created
**Solution**: Run the profile trigger (Step 6.1) again.

---

## 📚 Additional Resources

### Supabase Docs
- https://supabase.com/docs
- https://supabase.com/docs/guides/database

### Query Builder
```typescript
// Example: Get user routines
const { data, error } = await supabase
  .from('routines')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
```

### Realtime Subscriptions
```typescript
// Example: Listen for new posts
supabase
  .channel('posts')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'community_posts' },
    (payload) => console.log('New post:', payload)
  )
  .subscribe()
```

---

## ✅ Final Checklist

Before going to production:

- [x] All 18 tables created
- [x] RLS policies applied
- [x] Profile trigger setup
- [x] Auth providers configured
- [x] Storage buckets created
- [x] Environment variables set
- [x] Test user created
- [x] API routes tested
- [x] Sample data added (optional)

---

## 🎉 Success!

Your complete backend database is now setup and ready! 

**Next Steps:**
1. Start building your features
2. Test all API routes
3. Add more sample data
4. Deploy to production

**Need Help?**
- Supabase Discord: https://discord.supabase.com
- Supabase Docs: https://supabase.com/docs

---

**Your Hair Coaction backend is now PRODUCTION READY!** 🚀💜✨
