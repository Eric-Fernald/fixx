# Fixx - Getting Started Guide

## 🎯 Phase 1: Environment Setup (Day 1)

### 1. Create Accounts
- [ ] **GitHub** - For code repository
- [ ] **Vercel** - Connect with GitHub account for deployment
- [ ] **Supabase** - Sign up for database and backend services
- [ ] **MapBox** - Get API key for maps functionality

### 2. Local Development Setup
```bash
# Install Node.js (18+) and npm
# Create project directory
mkdir fixx
cd fixx

# Initialize Next.js project with TypeScript
npx create-next-app@latest . --typescript --tailwind --eslint --app

# Install additional dependencies
npm install @supabase/supabase-js
npm install mapbox-gl
npm install @types/mapbox-gl
npm install react-hook-form
npm install lucide-react
```

### 3. Environment Variables Setup
Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

## 🗄 Phase 2: Database Setup (Day 2)

### 1. Supabase Project Setup
- [ ] Create new Supabase project
- [ ] Enable PostGIS extension in SQL editor:
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### 2. Create Database Tables
```sql
-- Users table (handled by Supabase Auth automatically)

-- Repair locations table
CREATE TABLE repair_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone TEXT,
  website TEXT,
  hours JSONB,
  services TEXT[],
  location_type TEXT DEFAULT 'repair_cafe' CHECK (location_type IN ('repair_cafe', 'commercial_shop', 'mobile_service')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID REFERENCES repair_locations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Photos table
CREATE TABLE photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID REFERENCES repair_locations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Set Up Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE repair_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Policies (everyone can read, authenticated users can insert)
CREATE POLICY "Anyone can view repair locations" ON repair_locations FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert locations" ON repair_locations FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert their own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view photos" ON photos FOR SELECT USING (true);
CREATE POLICY "Authenticated users can upload photos" ON photos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## 💻 Phase 3: Core Development (Days 3-7)

### Day 3: Basic App Structure
- [ ] Set up Supabase client configuration
- [ ] Create basic layout components (Header, Footer, Navigation)
- [ ] Set up routing structure:
  - `/` - Home page with map
  - `/search` - Search/filter page
  - `/location/[id]` - Individual location page
  - `/add` - Add new location form
  - `/login` - Authentication

### Day 4: Map Integration
- [ ] Implement MapBox map component
- [ ] Add location markers for repair locations
- [ ] Implement "current location" functionality
- [ ] Add map clustering for dense areas

### Day 5: Location CRUD
- [ ] Create location listing component
- [ ] Build location detail page
- [ ] Implement "Add Location" form
- [ ] Add image upload functionality

### Day 6: Search & Filtering
- [ ] Implement geospatial search (nearby locations)
- [ ] Add service type filtering
- [ ] Create search by address/zip code
- [ ] Add sorting options (distance, rating, newest)

### Day 7: User Features
- [ ] Set up Supabase authentication
- [ ] Implement user registration/login
- [ ] Add review and rating system
- [ ] Create user profile pages

## 🚀 Phase 4: MVP Launch Prep (Days 8-10)

### Day 8: Data Seeding
- [ ] Research and manually add 15-20 repair cafes in your local area
- [ ] Add sample photos for each location
- [ ] Create a few test reviews

### Day 9: Polish & Testing
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] Error handling and loading states
- [ ] SEO optimization (meta tags, sitemap)

### Day 10: Deployment
- [ ] Connect GitHub repo to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Deploy to production
- [ ] Test live app functionality
- [ ] Set up basic analytics

## 📈 Phase 5: Initial Marketing (Days 11-14)

### Community Outreach
- [ ] Contact local repair cafe organizers
- [ ] Post in relevant Facebook/Reddit communities
- [ ] Reach out to sustainability/environmental groups
- [ ] Create simple landing page explaining the project

### Content Creation
- [ ] Write a blog post about the project
- [ ] Create social media accounts
- [ ] Document the build process for dev community

## 🔧 Development Tips

### Useful Commands
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Deploy to Vercel
vercel --prod
```

### Key Files to Create
- `lib/supabase.ts` - Supabase client configuration
- `components/Map.tsx` - MapBox map component
- `components/LocationCard.tsx` - Location display component
- `app/api/locations/route.ts` - API routes for locations
- `hooks/useLocation.ts` - Custom hook for geolocation

### Testing Strategy
- [ ] Test on mobile devices early and often
- [ ] Use different browsers (Chrome, Safari, Firefox)
- [ ] Test offline functionality (PWA features)
- [ ] Validate with real users (friends/family)

## 🎯 Success Metrics for MVP
- [ ] 20+ repair locations added
- [ ] 50+ user sessions in first month
- [ ] 5+ user-contributed locations
- [ ] Under 3 second page load times
- [ ] Works smoothly on iOS and Android browsers

---

**Remember:** Start simple and iterate quickly. It's better to have a working MVP with basic features than a complex app that never launches!