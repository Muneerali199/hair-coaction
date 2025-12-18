# Production Deployment Checklist

## Pre-Deployment

### Environment Setup
- [ ] Copy `.env.example` to `.env`
- [ ] Configure all Firebase environment variables in `.env`
- [ ] Verify Firebase project is set up correctly
- [ ] Enable required Firebase Authentication providers (Email/Password, Google)

### Code Quality
- [ ] Run `npm run lint` - All checks should pass
- [ ] Run `npm run type-check` - No TypeScript errors
- [ ] Run `npm run build` - Build completes successfully
- [ ] Review build output for chunk sizes

### Security
- [ ] Verify no secrets are committed to repository
- [ ] Ensure `.env` file is in `.gitignore`
- [ ] Firebase API keys are stored in environment variables
- [ ] Review and update Firebase security rules

### Testing
- [ ] Test user authentication (Email/Password)
- [ ] Test Google Sign-in
- [ ] Test all protected routes
- [ ] Test dashboard functionality
- [ ] Test navigation between pages
- [ ] Test responsive design on mobile
- [ ] Test dark mode functionality

## Deployment Steps

### 1. Build Production Bundle
```bash
npm install
npm run build
```

### 2. Deploy to Hosting Platform

#### Vercel / Netlify
- Connect repository
- Set environment variables in platform settings
- Configure build command: `npm run build`
- Configure output directory: `dist`

#### Manual Deployment
- Upload contents of `dist/` directory to web server
- Ensure server is configured for SPA routing
- Set up environment variables on server

### 3. Post-Deployment Verification
- [ ] Verify site loads correctly
- [ ] Test authentication flows
- [ ] Check console for errors
- [ ] Verify all assets load (images, fonts, etc.)
- [ ] Test all major features
- [ ] Check mobile responsiveness

## Configuration Notes

### Firebase Setup
1. Create Firebase project at console.firebase.google.com
2. Enable Authentication with providers:
   - Email/Password
   - Google
3. Add authorized domains for production URL
4. Copy configuration to environment variables

### Environment Variables Required
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

### SPA Routing Configuration

For proper React Router functionality, configure your hosting platform:

**Netlify**: Create `netlify.toml`
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel**: Create `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Apache**: Add to `.htaccess`
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Monitoring & Maintenance

### Post-Launch
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Monitor Firebase usage and costs
- [ ] Set up uptime monitoring
- [ ] Configure backup strategy
- [ ] Document incident response procedures

### Regular Maintenance
- [ ] Update dependencies monthly
- [ ] Review and fix security vulnerabilities
- [ ] Monitor Firebase quota usage
- [ ] Review and optimize bundle sizes
- [ ] Update documentation as needed

## Rollback Plan

If issues occur after deployment:
1. Revert to previous build in hosting platform
2. Check Firebase configuration hasn't changed
3. Verify environment variables are correct
4. Review deployment logs for errors
5. Test locally with production build

## Support

For issues during deployment:
- Review README.md for setup instructions
- Check Firebase console for authentication issues
- Review browser console for client-side errors
- Check hosting platform logs for server-side issues
