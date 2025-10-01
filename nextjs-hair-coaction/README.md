# HairCoaction - Next.js + Supabase

A modern hair care platform built with Next.js 14, Supabase, and TypeScript.

## 🚀 Features

- **Authentication**: Email/Password and Google OAuth via Supabase
- **User Profiles**: Comprehensive profile management
- **Dashboard**: Beautiful, animated dashboard with hair care tracking
- **Community**: Connect with hair care professionals
- **Education**: Access courses and resources
- **Consultations**: Book sessions with experts
- **Events**: Join hair care workshops and seminars
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first, fully responsive UI

## 📋 Prerequisites

- Node.js 18+ 
- A Supabase account (free tier available at [supabase.com](https://supabase.com))

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase-schema.sql` 
4. Run the SQL to create tables and policies

### 5. Configure Google OAuth (Optional)

1. In Supabase Dashboard, go to Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth credentials
4. Add authorized redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://your-domain.com/auth/callback` (production)

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
nextjs-hair-coaction/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── signup/
│   │   └── page.tsx        # Signup page
│   ├── dashboard/
│   │   ├── layout.tsx      # Dashboard layout
│   │   ├── page.tsx        # Dashboard home
│   │   ├── profile/        # Profile page
│   │   ├── education/      # Education page
│   │   ├── consultation/   # Consultation page
│   │   ├── event/          # Events page
│   │   └── community/      # Community page
│   └── auth/
│       └── callback/
│           └── route.ts    # OAuth callback
├── components/
│   ├── BeautifulLoader.tsx # Loading component
│   ├── LandingPage.tsx     # Landing page component
│   └── Sidebar.tsx         # Dashboard sidebar
├── lib/
│   └── supabase.ts         # Supabase client
├── supabase-schema.sql     # Database schema
└── package.json
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: GSAP

## 🔒 Security Features

- Row Level Security (RLS) policies
- Secure authentication with Supabase
- Protected routes
- Environment variable protection
- HTTPS enforcement in production

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Touch-friendly interactions

## 🎯 Key Pages

### Landing Page (`/`)
- Hero section with CTA
- Features showcase
- Stats section
- Responsive navigation

### Authentication
- `/login` - Email/Password and Google OAuth
- `/signup` - User registration

### Dashboard (`/dashboard`)
- Home - Overview and quick stats
- Profile - User profile management
- Education - Courses and resources
- Consultation - Book expert sessions
- Events - Workshops and seminars
- Community - Connect with professionals

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Digital Ocean
- AWS Amplify

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
- Check the [Supabase Documentation](https://supabase.com/docs)
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Open an issue in the repository

## 🎉 Acknowledgments

- Original Hair Coaction project
- Supabase team for the amazing platform
- Next.js team for the framework
- Tailwind CSS for styling utilities
