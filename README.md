# Hair Coaction

A comprehensive hair care platform that provides education, professional consultation, community support, and event management for hair care enthusiasts and professionals.

## Features

- 🏠 **Dashboard**: Personalized hair care dashboard with health tracking
- 📚 **Education**: Learn about hair care techniques, products, and best practices
- 🩺 **Consultation**: Connect with professional hair care specialists
- 📅 **Events**: Discover and attend hair care workshops and events
- 👥 **Community**: Engage with a community of hair care enthusiasts
- 👤 **Profile Management**: Manage your profile and track your hair care journey

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Animations**: GSAP, Lenis

## Prerequisites

- Node.js 18+ and npm
- Firebase account for authentication

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Muneerali199/hair-coaction.git
cd hair-coaction
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and update with your Firebase credentials:

```bash
cp .env.example .env
```

Edit `.env` file and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### 4. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Project Structure

```
hair-coaction/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── api/                # Backend API (Express server)
├── public/             # Static assets
├── firebase.ts         # Firebase configuration
└── index.html          # HTML template
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Google provider
3. Copy your Firebase config credentials
4. Add credentials to `.env` file

## Security

- Firebase credentials should never be committed to the repository
- Always use environment variables for sensitive configuration
- The `.env` file is gitignored by default

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, please open an issue in the GitHub repository.
