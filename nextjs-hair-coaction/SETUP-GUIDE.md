# 🚀 Complete Setup Guide - HairCoaction Next.js + Supabase

This guide will walk you through setting up your Hair Coaction platform from scratch.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Supabase Setup](#supabase-setup)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Authentication Setup](#authentication-setup)
7. [Running the Application](#running-the-application)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
  - Check: `node --version`
  - Download: https://nodejs.org/

- **npm** or **yarn**
  - Check: `npm --version`
  - Comes with Node.js

- **Git** (optional, for version control)
  - Check: `git --version`
  - Download: https://git-scm.com/

---

## Installation

### Step 1: Navigate to Project Directory

```bash
cd "c:/Users/Muneer Ali Subzwari/Downloads/Hair-Coaction-main/Hair-Coaction-main/nextjs-hair-coaction"
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Supabase Client
- Tailwind CSS
- TypeScript
- Lucide Icons
- And more...

**Wait for completion** - This may take a few minutes.

---

## Supabase Setup

### Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with GitHub, Google, or Email

### Step 2: Create New Project

1. Click **"New Project"** button
2. Fill in the details:
   - **Name**: `hair-coaction` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free tier is sufficient for development

3. Click **"Create new project"**
4. **Wait 2-3 minutes** for project setup

### Step 3: Get Your API Keys

1. In your project dashboard, click **"Settings"** (gear icon)
2. Go to **"API"** section
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (starts with `eyJhbG...`)

**Keep these safe!** You'll need them in the next step.

---

## Environment Configuration

### Step 1: Create Environment File

In your project root folder, create a file named `.env.local`:

**Windows Command:**
```bash
copy .env.local.example .env.local
```

**Or manually create the file** with this content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 2: Add Your Keys

Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ Important:** Never commit `.env.local` to version control!

---

## Database Setup

### Step 1: Open Supabase SQL Editor

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**

### Step 2: Run Database Schema

1. Open the file `supabase-schema.sql` in your project
2. Copy ALL the SQL code
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** (or press Ctrl/Cmd + Enter)

You should see a success message: **"Success. No rows returned"**

### Step 3: Verify Tables Created

1. Click **"Table Editor"** in the left sidebar
2. You should see a table named **"profiles"**
3. Click on it to view the structure

---

## Authentication Setup

### Step 1: Enable Email Authentication

1. In Supabase dashboard, go to **"Authentication"** → **"Providers"**
2. **Email** should be enabled by default
3. If not, toggle it ON

### Step 2: Configure Email Templates (Optional)

1. Go to **"Authentication"** → **"Email Templates"**
2. Customize confirmation and password reset emails (optional)

### Step 3: Enable Google OAuth (Optional)

#### Get Google OAuth Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to **"APIs & Services"** → **"Credentials"**
4. Click **"Create Credentials"** → **"OAuth 2.0 Client ID"**
5. Application type: **Web application**
6. Add authorized redirect URIs:
   ```
   https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
   ```
   (Replace with your Supabase project URL)
7. Copy your **Client ID** and **Client Secret**

#### Configure in Supabase:

1. In Supabase, go to **"Authentication"** → **"Providers"**
2. Find **"Google"** and toggle it ON
3. Paste your **Client ID** and **Client Secret**
4. Click **"Save"**

### Step 4: Configure Site URL

1. Go to **"Authentication"** → **"URL Configuration"**
2. Set **Site URL** to:
   - Development: `http://localhost:3000`
   - Production: Your actual domain
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - Your production URL + `/auth/callback`

---

## Running the Application

### Step 1: Start Development Server

```bash
npm run dev
```

You should see:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

### Step 2: Open in Browser

1. Open your browser
2. Go to: `http://localhost:3000`
3. You should see the Hair Coaction landing page!

### Step 3: Test the Application

1. Click **"Get Started"** or **"Sign Up"**
2. Create an account with email/password
3. Check your email for confirmation (if enabled)
4. Or try **"Continue with Google"** if configured
5. After login, you'll be redirected to the dashboard

---

## Deployment

### Option 1: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **"Deploy"**

### Option 2: Deploy to Netlify

1. Push your code to GitHub
2. Go to [https://netlify.com](https://netlify.com)
3. Click **"Add new site"** → **"Import existing project"**
4. Connect your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Click **"Deploy"**

### Update Supabase URLs

After deployment, update your Supabase authentication URLs:

1. Go to Supabase **"Authentication"** → **"URL Configuration"**
2. Add your production URL
3. Add redirect URL: `https://yourdomain.com/auth/callback`

---

## Troubleshooting

### Issue: "npm install" fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: "Module not found" error

**Solution:**
```bash
# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

### Issue: Can't connect to Supabase

**Check:**
1. ✅ `.env.local` file exists in root directory
2. ✅ Environment variables are correct (no extra spaces)
3. ✅ Supabase project is running (check dashboard)
4. ✅ Restart dev server after changing `.env.local`

### Issue: Authentication not working

**Check:**
1. ✅ Database tables created (run `supabase-schema.sql`)
2. ✅ Email provider enabled in Supabase
3. ✅ Site URL configured correctly
4. ✅ Redirect URLs added

### Issue: Google OAuth not working

**Check:**
1. ✅ Google credentials are correct
2. ✅ Authorized redirect URI matches exactly
3. ✅ Google OAuth enabled in Supabase
4. ✅ OAuth consent screen configured in Google Cloud

### Issue: Page shows "Loading..." forever

**Solution:**
- Check browser console (F12) for errors
- Verify Supabase connection
- Check if user session exists

### Need More Help?

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Create an issue in the repository

---

## 🎉 Congratulations!

Your Hair Coaction platform is now set up and running!

### Next Steps:

1. ✅ Customize the branding and colors
2. ✅ Add more features to dashboard pages
3. ✅ Configure email templates
4. ✅ Set up custom domain
5. ✅ Invite team members

### Features Available:

- 🏠 Dashboard with stats and analytics
- 👤 User profile management
- 📚 Education hub with courses
- 🩺 Expert consultations
- 📅 Event management
- 👥 Community forum
- 🔒 Secure authentication
- 🌙 Dark mode support
- 📱 Fully responsive design

Enjoy building your hair care platform! 💇‍♀️✨
