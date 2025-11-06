# Repair Cafe Map - Tech Stack & Architecture

## 🎯 Project Overview
**Repair Cafe Map** is a mobile-responsive web application that helps users discover local repair cafes and repair services in their area. The platform allows users to search by location, view repair shop details, read reviews, and contribute new locations.

## 🛠 Technology Stack

### Frontend
- **Framework:** Next.js 14 (React-based)
- **Styling:** Tailwind CSS
- **TypeScript:** Full TypeScript implementation
- **Maps:** MapBox GL JS
- **State Management:** React Context + useState/useReducer
- **Form Handling:** React Hook Form
- **Icons:** Lucide React

### Backend & Database
- **Backend-as-a-Service:** Supabase
- **Database:** PostgreSQL with PostGIS extension
- **Authentication:** Supabase Auth
- **Real-time:** Supabase Realtime
- **File Storage:** Supabase Storage (for shop photos)
- **API:** Supabase auto-generated REST API

### Deployment & Hosting
- **Frontend Hosting:** Vercel (free tier)
- **Database:** Supabase (free tier - 500MB)
- **Domain:** Use Vercel's free subdomain initially
- **SSL:** Automatic via Vercel

### External Services
- **Maps & Geocoding:** MapBox (50k free map loads/month)
- **Image Optimization:** Next.js built-in image optimization
- **Analytics:** Vercel Analytics (free tier)

## 📊 Database Schema

### Core Tables
```sql
-- Repair locations
repair_locations (
  id: uuid (primary key)
  name: text
  description: text
  address: text
  latitude: decimal
  longitude: decimal
  phone: text
  website: text
  hours: jsonb
  services: text[]
  location_type: enum ('repair_cafe', 'commercial_shop', 'mobile_service')
  created_at: timestamp
  updated_at: timestamp
  created_by: uuid (foreign key to users)
)

-- User reviews
reviews (
  id: uuid (primary key)
  location_id: uuid (foreign key)
  user_id: uuid (foreign key)
  rating: integer (1-5)
  review_text: text
  created_at: timestamp
)

-- Photos
photos (
  id: uuid (primary key)
  location_id: uuid (foreign key)
  url: text
  caption: text
  uploaded_by: uuid (foreign key)
  created_at: timestamp
)
```

## 🏗 Architecture Decisions

### Why This Stack?
- **Zero hosting costs** during development and early validation
- **Rapid development** with pre-built backend services
- **Scalable** - can handle growth without immediate refactoring
- **Modern developer experience** with TypeScript and Next.js
- **Mobile-first** responsive design without native app complexity

### Performance Considerations
- **Static generation** for public pages (SEO-friendly)
- **Image optimization** via Next.js Image component
- **Lazy loading** for map markers and images
- **Caching** via Vercel Edge Network

### Security
- **Row Level Security (RLS)** in Supabase
- **JWT authentication** via Supabase Auth
- **Environment variables** for API keys
- **CORS** configured properly for frontend domain

## 📱 Progressive Web App (PWA)
- **Service Worker** for offline functionality
- **Web App Manifest** for install-to-home-screen
- **Responsive design** that works like a native app
- **Location services** for "find repairs near me"

## 🚀 Deployment Pipeline
- **Git-based deployment** via Vercel GitHub integration
- **Preview deployments** for every pull request
- **Environment management** (dev/staging/production)
- **Automatic SSL** and CDN via Vercel

## 💰 Cost Breakdown (Monthly)
- **Vercel Hosting:** $0 (free tier)
- **Supabase Database:** $0 (free tier - 500MB)
- **MapBox Maps:** $0 (50k loads free)
- **Domain:** $0 (use .vercel.app initially)
- **Total:** $0/month until you need to scale

## 🔄 Future Scaling Options
- **Vercel Pro:** $20/month for higher limits
- **Supabase Pro:** $25/month for 8GB database + more features
- **Custom domain:** $10-15/year
- **MapBox Pay-as-you-go:** ~$5 per 1000 additional requests