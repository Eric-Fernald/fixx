# Database Setup Instructions

This document contains the SQL scripts needed to set up your Supabase database for the Fixx application.

## Prerequisites

1. Create a new project in [Supabase](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the following scripts in order

## Step 1: Enable PostGIS Extension

First, enable the PostGIS extension for geographic data support:

```sql
-- Enable PostGIS extension for geographic data
CREATE EXTENSION IF NOT EXISTS postgis;
```

## Step 2: Create Database Tables

Run this script to create all the required tables:

```sql
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

## Step 3: Set Up Row Level Security (RLS)

Enable RLS on all tables for data security:

```sql
-- Enable Row Level Security
ALTER TABLE repair_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
```

## Step 4: Create Security Policies

Set up policies for data access:

```sql
-- Repair locations policies
CREATE POLICY "Anyone can view repair locations" 
ON repair_locations FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert locations" 
ON repair_locations FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own locations" 
ON repair_locations FOR UPDATE 
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own locations" 
ON repair_locations FOR DELETE 
USING (auth.uid() = created_by);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" 
ON reviews FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own reviews" 
ON reviews FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
ON reviews FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" 
ON reviews FOR DELETE 
USING (auth.uid() = user_id);

-- Photos policies
CREATE POLICY "Anyone can view photos" 
ON photos FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can upload photos" 
ON photos FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own photos" 
ON photos FOR UPDATE 
USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete their own photos" 
ON photos FOR DELETE 
USING (auth.uid() = uploaded_by);
```

## Step 5: Create Useful Functions

Add some helpful database functions:

```sql
-- Function to calculate distance between two points
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DECIMAL, lon1 DECIMAL, 
  lat2 DECIMAL, lon2 DECIMAL
) 
RETURNS DECIMAL AS $$
BEGIN
  RETURN (
    6371 * acos(
      cos(radians(lat1)) * cos(radians(lat2)) * 
      cos(radians(lon2) - radians(lon1)) + 
      sin(radians(lat1)) * sin(radians(lat2))
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Function to get nearby locations
CREATE OR REPLACE FUNCTION get_nearby_locations(
  user_lat DECIMAL, 
  user_lon DECIMAL, 
  radius_km DECIMAL DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  address TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  phone TEXT,
  website TEXT,
  hours JSONB,
  services TEXT[],
  location_type TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  distance_km DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rl.*,
    calculate_distance(user_lat, user_lon, rl.latitude, rl.longitude) as distance_km
  FROM repair_locations rl
  WHERE calculate_distance(user_lat, user_lon, rl.latitude, rl.longitude) <= radius_km
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;
```

## Step 6: Create Indexes for Performance

Add indexes to improve query performance:

```sql
-- Indexes for better performance
CREATE INDEX idx_repair_locations_type ON repair_locations(location_type);
CREATE INDEX idx_repair_locations_created_at ON repair_locations(created_at);
CREATE INDEX idx_reviews_location_id ON reviews(location_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_photos_location_id ON photos(location_id);

-- Geographic index for location queries
CREATE INDEX idx_repair_locations_location ON repair_locations USING GIST (
  ST_Point(longitude, latitude)
);
```

## Step 7: Insert Sample Data (Optional)

Add some sample data for testing:

```sql
-- Sample repair locations
INSERT INTO repair_locations (name, description, address, latitude, longitude, phone, website, services, location_type) VALUES
('Downtown Repair Cafe', 'Community-run repair cafe in the heart of downtown', '123 Main St, City, ST 12345', 40.7128, -74.0060, '(555) 123-4567', 'https://example.com', ARRAY['Electronics', 'Clothing', 'Small Appliances'], 'repair_cafe'),
('TechFix Pro', 'Professional electronics repair shop', '456 Tech Ave, City, ST 12345', 40.7589, -73.9851, '(555) 987-6543', 'https://techfixpro.com', ARRAY['Smartphones', 'Laptops', 'Tablets'], 'commercial_shop'),
('Mobile Repair Service', 'We come to you for repairs', 'Citywide Service', 40.7505, -73.9934, '(555) 555-0123', NULL, ARRAY['Bicycles', 'Small Electronics'], 'mobile_service');

-- Sample reviews
INSERT INTO reviews (location_id, rating, review_text) VALUES
((SELECT id FROM repair_locations WHERE name = 'Downtown Repair Cafe'), 5, 'Amazing community space! Fixed my toaster for free and learned how to do it myself.'),
((SELECT id FROM repair_locations WHERE name = 'TechFix Pro'), 4, 'Fast and professional service. A bit pricey but worth it.');
```

## Configuration Notes

### Environment Variables

After setting up your database, update your `.env.local` file with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under "API".

### Authentication Setup

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your site URL (e.g., `http://localhost:3000` for development)
3. Set up email templates if needed
4. Configure any social login providers you want to use

### Storage Setup (for photo uploads)

1. Go to Storage in your Supabase dashboard
2. Create a bucket named "photos"
3. Set up policies for the bucket:

```sql
-- Allow authenticated users to upload photos
CREATE POLICY "Users can upload photos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- Allow anyone to view photos
CREATE POLICY "Anyone can view photos" ON storage.objects
FOR SELECT USING (bucket_id = 'photos');
```

## Verification

After running all scripts, verify your setup:

1. Check that all tables exist in the Table Editor
2. Verify RLS is enabled on all tables
3. Test inserting a sample location through the app
4. Confirm authentication works by signing up a test user

## Troubleshooting

- If you get permission errors, make sure RLS policies are correctly set up
- For geographic queries not working, ensure PostGIS extension is enabled
- If authentication fails, check your environment variables and site URL configuration