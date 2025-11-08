# Fixx

A web application to help users discover local repair cafes and sustainable repair services in their area. Built with Next.js, Supabase, and MapBox.

## 🎯 Project Overview

Fixx is a mobile-responsive web application that allows users to:
- Search for nearby repair cafes and services
- View detailed information about repair locations
- Add new repair locations to the map
- Leave reviews and ratings
- Find services by type and location

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL with PostGIS)
- **Authentication**: Supabase Auth
- **Maps**: MapBox GL JS (integration pending)
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Deployment**: Vercel (ready)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- MapBox account (for maps functionality)

### Local Development Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo-url>
   cd fixx
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your actual API keys in `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
   ```

3. **Set up your Supabase database**:
   - Create a new Supabase project
   - Follow the instructions in `docs/database-setup.md`
   - Run the SQL scripts in your Supabase SQL editor

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 📁 Project Structure

```
fixx/
├── app/                    # Next.js App Router pages
│   ├── add/               # Add location page
│   ├── location/[id]/     # Location detail page
│   ├── login/             # Authentication page
│   ├── search/            # Search page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Layout.tsx         # Main layout wrapper
│   └── LocationCard.tsx   # Location display card
├── lib/                   # Utility libraries
│   └── supabase.ts        # Supabase client and types
├── docs/                  # Documentation
│   └── database-setup.md  # Database setup instructions
├── public/                # Static assets
└── ...                    # Config files
```

## 🎨 Features

### Completed Features
- ✅ Responsive design with Tailwind CSS
- ✅ Home page with hero section and features
- ✅ Search and filter locations
- ✅ Add new repair locations
- ✅ Location detail pages
- ✅ User authentication (login/signup)
- ✅ Supabase integration
- ✅ TypeScript support

### Pending Features
- 🔄 Interactive MapBox integration
- 🔄 Real-time location geocoding
- 🔄 Photo upload functionality
- 🔄 Review and rating system
- 🔄 User profiles
- 🔄 Admin dashboard

## 🗄 Database Schema

The app uses three main tables:

- **repair_locations**: Store repair cafe/shop information
- **reviews**: User reviews and ratings
- **photos**: Location photos

See `docs/database-setup.md` for detailed schema and setup instructions.

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect to GitHub**:
   - Push your code to GitHub
   - Connect your repository to Vercel

2. **Configure environment variables**:
   - Add all environment variables in Vercel dashboard
   - Ensure Supabase URLs are correctly set

3. **Deploy**:
   - Vercel will automatically deploy on every push to main branch

### Environment Variables for Production

```bash
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

## 📊 Data Seeding

To add sample data for testing:

1. Run the sample data SQL from `docs/database-setup.md`
2. Or use the "Add Location" form in the app
3. Manually add 15-20 repair cafes in your local area

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- JWT-based authentication via Supabase
- Environment variables for sensitive data
- CORS properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Next Steps

### High Priority
1. **MapBox Integration**: Add interactive maps with markers
2. **Geocoding**: Real address-to-coordinates conversion
3. **Photo Uploads**: Supabase Storage integration
4. **Mobile Optimization**: PWA features

### Medium Priority
1. **Reviews System**: Complete review functionality
2. **Search Improvements**: Geospatial search with PostGIS
3. **User Profiles**: User dashboard and profile management
4. **Admin Features**: Location moderation

### Future Enhancements
1. **Mobile App**: React Native version
2. **API**: Public API for third-party integrations
3. **Analytics**: Usage tracking and insights
4. **Internationalization**: Multi-language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built following the repair cafe movement principles
- Inspired by community-driven sustainability initiatives
- Design patterns from modern web development best practices

---

**Happy Repairing! 🔧♻️**
