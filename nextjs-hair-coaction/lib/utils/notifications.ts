import { createClient } from '@/lib/supabase/client'

export interface NotificationData {
  type: string
  title: string
  message: string
  link?: string
}

export async function createNotification(userId: string, data: NotificationData) {
  const supabase = createClient()
  
  const { data: notification, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      ...data
    })
    .select()
    .single()

  if (error) throw error
  return notification
}

export async function markAsRead(notificationId: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)

  if (error) throw error
}

export async function getUnreadCount(userId: string) {
  const supabase = createClient()
  
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false)

  if (error) throw error
  return count || 0
}
