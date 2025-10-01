# 🚀 Quick Backend Reference

## 📝 Setup in 5 Minutes

### 1. Create Supabase Project
- Go to supabase.com
- Create new project
- Save database password

### 2. Run SQL Files
```sql
-- In Supabase SQL Editor:
-- 1. Run database/schema.sql (creates all tables)
-- 2. Run database/rls-policies.sql (adds security)
```

### 3. Add Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

### 4. Start Development
```bash
npm run dev
```

## 🔑 API Endpoints Quick Reference

### Profile
```typescript
// Get profile
GET /api/profile

// Update profile
PUT /api/profile
Body: { full_name, bio, phone, ... }
```

### Routines
```typescript
// List routines
GET /api/routines?userId=xxx&public=true

// Create routine
POST /api/routines
Body: { title, description, steps, ... }
```

### Consultations
```typescript
// List consultations
GET /api/consultations?type=client

// Book consultation
POST /api/consultations
Body: { expert_id, scheduled_date, ... }
```

### Courses
```typescript
// Browse courses
GET /api/courses?category=xxx&level=beginner

// Create course
POST /api/courses
Body: { title, description, price, ... }
```

### Events
```typescript
// List events
GET /api/events?status=upcoming&type=workshop

// Create event
POST /api/events
Body: { title, start_date, location, ... }
```

### Community
```typescript
// Get posts
GET /api/community/posts?limit=20&offset=0

// Create post
POST /api/community/posts
Body: { content, tags, images }
```

## 📊 Database Tables Quick Guide

### User Data
- `profiles` - User info
- `hair_profiles` - Hair details
- `user_products` - Products owned
- `progress_tracking` - Photo progress
- `goals` - User goals

### Content
- `routines` - Care routines
- `products` - Product catalog
- `courses` - Educational content
- `events` - Events & workshops

### Social
- `community_posts` - Posts
- `post_comments` - Comments
- `post_likes` - Likes

### Professional
- `consultations` - Bookings
- `experts` - Expert profiles
- `enrollments` - Course signups
- `event_registrations` - Event signups

### System
- `notifications` - Alerts
- `activity_log` - Activity tracking

## 💡 Common Queries

### Get User Profile
```typescript
const { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

### List User Routines
```typescript
const { data } = await supabase
  .from('routines')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
```

### Get Courses with Instructor
```typescript
const { data } = await supabase
  .from('courses')
  .select(`
    *,
    instructor:profiles(full_name, avatar_url)
  `)
  .eq('is_published', true)
```

### Create Post
```typescript
const { data } = await supabase
  .from('community_posts')
  .insert({
    author_id: userId,
    content: 'My hair journey...',
    tags: ['natural', 'growth']
  })
  .select()
  .single()
```

## 🔒 Security (RLS)

All tables have Row Level Security enabled:

- ✅ Users see only their own data
- ✅ Public content visible to all
- ✅ Authentication required
- ✅ Automatic access control

## 🛠️ Utility Functions

### Notifications
```typescript
import { createNotification } from '@/lib/utils/notifications'

await createNotification(userId, {
  type: 'booking_confirmed',
  title: 'Consultation Booked!',
  message: 'Your session with Dr. Smith is confirmed',
  link: '/dashboard/consultations'
})
```

### Activity Logging
```typescript
import { logActivity } from '@/lib/utils/activity'

await logActivity(userId, {
  activity_type: 'course_completed',
  description: 'Completed Hair Care Fundamentals',
  metadata: { course_id: '123' }
})
```

## 🔄 Realtime Features

### Subscribe to Posts
```typescript
supabase
  .channel('posts')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'community_posts'
  }, (payload) => {
    console.log('New post!', payload.new)
  })
  .subscribe()
```

### Subscribe to Notifications
```typescript
supabase
  .channel('notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    showNotification(payload.new)
  })
  .subscribe()
```

## 📦 File Uploads

### Upload Avatar
```typescript
const file = event.target.files[0]
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.png`, file, {
    cacheControl: '3600',
    upsert: true
  })
```

### Get Public URL
```typescript
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/avatar.png`)

console.log(data.publicUrl)
```

## 🎯 Next Steps

1. **Follow** `DATABASE-SETUP-GUIDE.md`
2. **Test** API routes
3. **Build** features
4. **Deploy** to production

## 📚 Full Documentation

- **Complete Setup**: `DATABASE-SETUP-GUIDE.md`
- **Backend Overview**: `BACKEND-COMPLETE.md`
- **Database Schema**: `database/schema.sql`
- **Security Policies**: `database/rls-policies.sql`

**Your backend is ready to use!** 🚀💜
