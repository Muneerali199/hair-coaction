import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () => {
  return createClientComponentClient()
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          location: string | null
          date_of_birth: string | null
          bio: string | null
          title: string | null
          organization: string | null
          specialization: string | null
          experience: string | null
          education: string | null
          certifications: string[] | null
          profile_image: string | null
          social_links: {
            linkedin?: string
            twitter?: string
            instagram?: string
            facebook?: string
            website?: string
          } | null
          show_email: boolean
          show_phone: boolean
          show_location: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          location?: string | null
          date_of_birth?: string | null
          bio?: string | null
          title?: string | null
          organization?: string | null
          specialization?: string | null
          experience?: string | null
          education?: string | null
          certifications?: string[] | null
          profile_image?: string | null
          social_links?: {
            linkedin?: string
            twitter?: string
            instagram?: string
            facebook?: string
            website?: string
          } | null
          show_email?: boolean
          show_phone?: boolean
          show_location?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          location?: string | null
          date_of_birth?: string | null
          bio?: string | null
          title?: string | null
          organization?: string | null
          specialization?: string | null
          experience?: string | null
          education?: string | null
          certifications?: string[] | null
          profile_image?: string | null
          social_links?: {
            linkedin?: string
            twitter?: string
            instagram?: string
            facebook?: string
            website?: string
          } | null
          show_email?: boolean
          show_phone?: boolean
          show_location?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
