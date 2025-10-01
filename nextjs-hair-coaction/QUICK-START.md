# ⚡ Quick Start Guide - Hair Coaction

Get your Hair Coaction platform running in **5 minutes**!

---

## 🎯 Prerequisites Check

Open PowerShell/Command Prompt and verify:

```bash
node --version    # Should be 18.0.0 or higher
npm --version     # Should be 9.0.0 or higher
```

If not installed, download from: https://nodejs.org/

---

## 🚀 Step-by-Step Setup

### 1️⃣ Navigate to Project

```bash
cd "c:/Users/Muneer Ali Subzwari/Downloads/Hair-Coaction-main/Hair-Coaction-main/nextjs-hair-coaction"
```

### 2️⃣ Install Dependencies

```bash
npm install
```

⏱️ **Wait 2-3 minutes** for installation to complete.

### 3️⃣ Create Supabase Account

1. Go to: https://supabase.com
2. Click **"Start your project"**
3. Sign up with GitHub/Google/Email

### 4️⃣ Create Project in Supabase

1. Click **"New Project"**
2. Name: `hair-coaction`
3. Password: **Create strong password** (save it!)
4. Region: **Choose closest to you**
5. Click **"Create new project"**
6. ⏱️ **Wait 2-3 minutes**

### 5️⃣ Get API Keys

1. Click **Settings** (gear icon) → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGci...`

### 6️⃣ Create Environment File

Create file: `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

**Replace with your actual keys from Step 5!**

### 7️⃣ Set Up Database

1. In Supabase dashboard, click **"SQL Editor"**
2. Click **"New query"**
3. Open `supabase-schema.sql` file
4. Copy **all content** and paste in SQL Editor
5. Click **"Run"** (or Ctrl+Enter)
6. ✅ Should see: **"Success. No rows returned"**

### 8️⃣ Configure Authentication

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `http://localhost:3000`
3. Add **Redirect URL**: `http://localhost:3000/auth/callback`
4. Click **"Save"**

### 9️⃣ Start Development Server

```bash
npm run dev
```

✅ Should see:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

### 🔟 Open in Browser

1. Open: http://localhost:3000
2. Click **"Sign Up"**
3. Create account
4. Start using! 🎉

---

## 🧪 Test Your Setup

### Create Account
- Go to: http://localhost:3000/signup
- Fill in details
- Click **"Create Account"**

### Login
- Go to: http://localhost:3000/login
- Enter credentials
- Click **"Login"**

### Check Dashboard
- After login, you should see dashboard
- Navigate between pages using sidebar
- Test dark mode toggle

### Update Profile
- Click **"Profile"** in sidebar
- Click **"Edit Profile"**
- Add your information
- Click **"Save Changes"**

---

## 🎨 Optional: Enable Google OAuth

### Get Google Credentials

1. Go to: https://console.cloud.google.com
2. Create project or select existing
3. Go to **"APIs & Services"** → **"Credentials"**
4. Click **"Create Credentials"** → **"OAuth 2.0 Client ID"**
5. Application type: **Web application**
6. Authorized redirect URIs:
   ```
   https://xxxxx.supabase.co/auth/v1/callback
   ```
7. Copy **Client ID** and **Client Secret**

### Configure in Supabase

1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Paste **Client ID** and **Client Secret**
4. Click **"Save"**

### Test Google Login

1. Go to: http://localhost:3000/login
2. Click **"Continue with Google"**
3. Sign in with Google account

---

## 📱 Features to Test

- ✅ Landing page responsive design
- ✅ User authentication (Email & Google)
- ✅ Dashboard with stats
- ✅ Profile management
- ✅ Education courses
- ✅ Expert consultations
- ✅ Event listings
- ✅ Community feed
- ✅ Dark mode toggle
- ✅ Mobile responsive layout

---

## 🐛 Common Issues

### "Cannot find module"
```bash
npm install
npm run dev
```

### "Invalid Supabase URL"
- Check `.env.local` file exists in root
- Verify no extra spaces in keys
- Restart dev server after changes

### "Auth error"
- Verify database schema is created
- Check Supabase redirect URLs
- Ensure Site URL is set correctly

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

---

## 📚 Next Steps

### 1. Customize Branding
- Replace logo in `public/` folder
- Update colors in `tailwind.config.ts`
- Modify text in landing page

### 2. Add Features
- Implement booking system
- Add payment integration
- Create admin panel
- Add email notifications

### 3. Deploy to Production
- See `SETUP-GUIDE.md` for deployment
- Recommended: Vercel (easiest)
- Update Supabase URLs after deployment

### 4. Monitor & Scale
- Use Supabase dashboard for analytics
- Monitor user growth
- Upgrade plan as needed

---

## 📖 Documentation

- **Detailed Setup**: `SETUP-GUIDE.md`
- **Migration Info**: `MIGRATION-SUMMARY.md`
- **Remove Old Files**: `DELETE-OLD-FILES.md`
- **Project Overview**: `README.md`

---

## 🆘 Need Help?

### Resources
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

### Check These First
1. Browser console (F12) for errors
2. Terminal output for error messages
3. Supabase dashboard for database issues
4. Environment variables are correct

---

## 🎉 Success Checklist

- [ ] Node.js installed
- [ ] Project dependencies installed
- [ ] Supabase account created
- [ ] Database schema created
- [ ] Environment variables set
- [ ] Dev server running
- [ ] Can access landing page
- [ ] Can sign up/login
- [ ] Dashboard loads correctly
- [ ] All pages accessible
- [ ] Dark mode works
- [ ] Profile can be edited

---

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🚀 You're Ready!

Your Hair Coaction platform is now set up and running!

**What you have:**
✨ Modern Next.js 14 application
✨ Secure Supabase authentication
✨ PostgreSQL database
✨ Beautiful, responsive UI
✨ Dark mode support
✨ All features working

**Time to build something amazing!** 💇‍♀️✨

---

## 📞 Support

If you get stuck:
1. Check documentation files
2. Review error messages carefully
3. Search Supabase/Next.js docs
4. Check GitHub issues

**Happy coding!** 🎊
