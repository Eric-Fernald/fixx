import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      repair_locations: {
        Row: {
          id: string
          name: string
          description: string | null
          address: string
          latitude: number
          longitude: number
          phone: string | null
          website: string | null
          hours: Json | null
          services: string[] | null
          location_type: 'repair_cafe' | 'commercial_shop' | 'mobile_service'
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          address: string
          latitude: number
          longitude: number
          phone?: string | null
          website?: string | null
          hours?: Json | null
          services?: string[] | null
          location_type?: 'repair_cafe' | 'commercial_shop' | 'mobile_service'
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          address?: string
          latitude?: number
          longitude?: number
          phone?: string | null
          website?: string | null
          hours?: Json | null
          services?: string[] | null
          location_type?: 'repair_cafe' | 'commercial_shop' | 'mobile_service'
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          location_id: string
          user_id: string | null
          rating: number | null
          review_text: string | null
          created_at: string
        }
        Insert: {
          id?: string
          location_id: string
          user_id?: string | null
          rating?: number | null
          review_text?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          location_id?: string
          user_id?: string | null
          rating?: number | null
          review_text?: string | null
          created_at?: string
        }
      }
      photos: {
        Row: {
          id: string
          location_id: string
          url: string
          caption: string | null
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          location_id: string
          url: string
          caption?: string | null
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          location_id?: string
          url?: string
          caption?: string | null
          uploaded_by?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}