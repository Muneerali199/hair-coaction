import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe, WEBHOOK_SECRET } from '@/lib/stripe/config'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Initialize Supabase with service role for webhook
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log(`Received event: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error(`Webhook handler error: ${error.message}`)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  const plan = session.metadata?.plan

  if (!userId || !plan) {
    console.error('Missing userId or plan in session metadata')
    return
  }

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  )

  // Update user profile
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({
      subscription_tier: plan,
      subscription_status: 'active',
      subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) {
    console.error('Error updating profile:', error)
  }

  // Create notification
  await supabaseAdmin.from('notifications').insert({
    user_id: userId,
    type: 'subscription_activated',
    title: 'Subscription Activated!',
    message: `Your ${plan} subscription is now active. Enjoy your premium features!`,
    link: '/dashboard',
  })

  // Log activity
  await supabaseAdmin.from('activity_log').insert({
    user_id: userId,
    activity_type: 'subscription_started',
    description: `Subscribed to ${plan} plan`,
    metadata: {
      plan,
      subscription_id: subscription.id,
    },
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId

  if (!userId) {
    console.error('Missing userId in subscription metadata')
    return
  }

  const status = subscription.status === 'active' ? 'active' : 'inactive'

  await supabaseAdmin
    .from('profiles')
    .update({
      subscription_status: status,
      subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId

  if (!userId) {
    console.error('Missing userId in subscription metadata')
    return
  }

  await supabaseAdmin
    .from('profiles')
    .update({
      subscription_tier: 'free',
      subscription_status: 'cancelled',
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  // Create notification
  await supabaseAdmin.from('notifications').insert({
    user_id: userId,
    type: 'subscription_cancelled',
    title: 'Subscription Cancelled',
    message: 'Your subscription has been cancelled. You still have access until the end of your billing period.',
    link: '/dashboard',
  })
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const userId = invoice.subscription_details?.metadata?.userId

  if (!userId) return

  await supabaseAdmin.from('notifications').insert({
    user_id: userId,
    type: 'payment_succeeded',
    title: 'Payment Successful',
    message: `Your payment of $${(invoice.amount_paid / 100).toFixed(2)} was successful.`,
    link: '/dashboard/billing',
  })
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const userId = invoice.subscription_details?.metadata?.userId

  if (!userId) return

  await supabaseAdmin.from('notifications').insert({
    user_id: userId,
    type: 'payment_failed',
    title: 'Payment Failed',
    message: 'Your payment failed. Please update your payment method to continue your subscription.',
    link: '/dashboard/billing',
  })
}
