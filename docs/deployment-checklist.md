# Deployment Checklist

## Pre-Deployment Setup

### 1. External Services Setup
- [ ] **Supabase Project**
  - [ ] Create new Supabase project
  - [ ] Run all SQL scripts from `docs/database-setup.md`
  - [ ] Verify RLS policies are working
  - [ ] Test authentication flow
  - [ ] Note down project URL and anon key

- [ ] **MapBox Account**
  - [ ] Sign up for MapBox account
  - [ ] Create access token
  - [ ] Note down access token

### 2. GitHub Repository
- [ ] Push code to GitHub repository
- [ ] Ensure `.env.local` is in `.gitignore`
- [ ] Create repository description
- [ ] Add topics/tags for discoverability

### 3. Environment Variables
- [ ] Update `.env.local` with real API keys
- [ ] Test all functionality locally
- [ ] Verify app builds successfully (`npm run build`)

## Vercel Deployment

### 1. Project Setup
- [ ] Connect GitHub repository to Vercel
- [ ] Choose project name
- [ ] Select framework preset (Next.js)

### 2. Environment Variables
Add the following to Vercel dashboard:
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- [ ] `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`

### 3. Domain Configuration
- [ ] Configure custom domain (optional)
- [ ] Update Supabase site URL to production domain
- [ ] Test CORS settings

### 4. Deployment
- [ ] Deploy to production
- [ ] Test all pages load correctly
- [ ] Test authentication flow
- [ ] Test database operations (add location, search)

## Post-Deployment Testing

### Core Features
- [ ] Home page loads and displays correctly
- [ ] Search page shows locations (add sample data if needed)
- [ ] Add location form works
- [ ] User registration/login works
- [ ] Location detail pages display properly
- [ ] Mobile responsiveness

### Database Operations
- [ ] Can add new repair locations
- [ ] Search and filtering works
- [ ] Location details are displayed correctly
- [ ] Authentication is working

### Performance
- [ ] Page load times under 3 seconds
- [ ] Images optimize correctly
- [ ] Mobile performance is acceptable

## Data Seeding

### Sample Data
- [ ] Add 15-20 repair cafes in target geographic area
- [ ] Include variety of location types (cafes, shops, mobile)
- [ ] Add diverse services for each location
- [ ] Include contact information where appropriate

### Content
- [ ] Verify all location information is accurate
- [ ] Test search functionality with real data
- [ ] Ensure location cards display properly

## Marketing & Launch

### Content Preparation
- [ ] Prepare social media posts
- [ ] Write blog post about the project
- [ ] Document the build process
- [ ] Create screenshots for social sharing

### Community Outreach
- [ ] Contact local repair cafe organizers
- [ ] Post in relevant Reddit communities (r/fixit, r/sustainability)
- [ ] Share in local Facebook groups
- [ ] Reach out to environmental organizations

### Analytics Setup
- [ ] Set up Vercel Analytics
- [ ] Consider Google Analytics integration
- [ ] Monitor error rates and performance

## Success Metrics

### MVP Goals
- [ ] 50+ user sessions in first month
- [ ] 5+ user-contributed locations
- [ ] 20+ total repair locations
- [ ] Under 3 second average page load
- [ ] Working on both iOS and Android browsers

### Technical Metrics
- [ ] 99%+ uptime
- [ ] No critical errors in production
- [ ] Successful database operations
- [ ] Mobile usability score >90

## Maintenance Plan

### Regular Tasks
- [ ] Monitor for spam/inappropriate content
- [ ] Update location information as needed
- [ ] Respond to user feedback
- [ ] Keep dependencies updated

### Feature Development Pipeline
- [ ] MapBox integration for interactive maps
- [ ] Photo upload functionality
- [ ] Review system implementation
- [ ] User profile pages
- [ ] PWA features for mobile

---

## Quick Deployment Commands

```bash
# Final build test
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Test production build locally
npm start

# Deploy via Vercel CLI (optional)
npx vercel --prod
```

## Emergency Rollback Plan

If issues arise after deployment:
1. Check Vercel deployment logs
2. Verify environment variables are correct
3. Test database connectivity from production
4. Rollback to previous deployment if needed
5. Check Supabase project status

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs