import { createClient } from '@/lib/supabase/client'

export interface ActivityLogData {
  activity_type: string
  description: string
  metadata?: Record<string, any>
}

export async function logActivity(userId: string, data: ActivityLogData) {
  const supabase = createClient()
  
  const { data: activity, error } = await supabase
    .from('activity_log')
    .insert({
      user_id: userId,
      ...data
    })
    .select()
    .single()

  if (error) throw error
  return activity
}

export async function getRecentActivity(userId: string, limit = 10) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}
