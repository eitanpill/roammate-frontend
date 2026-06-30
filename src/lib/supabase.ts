import { createClient } from '@supabase/supabase-js'

// The anon public key is safe to ship in the client bundle — it is designed to
// be public and is protected by Row Level Security policies in Supabase.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nogtnanqtolawylmtfxb.supabase.co'

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZ3RuYW5xdG9sYXd5bG10ZnhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NDA5NTYsImV4cCI6MjA5ODExNjk1Nn0.K1j7bGEpXYhJyhjjDal34rzX1Ct61ULYUQp_ggVk6hs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type DbProperty = {
  id: string
  created_at: string
  host_id: string | null
  host_name: string | null
  name: string
  description: string | null
  type: string | null
  address: string | null
  max_guests: number
  price_per_night: number
  amenities: string[]
  rating: number
  image_emoji: string
}
