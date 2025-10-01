import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const CURRENCY = 'usd'

// Pricing Plans
export const PRICING_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Basic hair profile',
      '1 routine tracker',
      'Community access',
      'Limited progress photos',
      'Email support'
    ],
    stripePriceId: null,
  },
  premium: {
    name: 'Premium',
    price: 29,
    interval: 'month',
    features: [
      'Advanced hair profile',
      'Unlimited routines',
      'Expert consultations (2/month)',
      'Unlimited progress tracking',
      'Product recommendations',
      'Priority support',
      'Exclusive community content'
    ],
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
  },
  enterprise: {
    name: 'Enterprise',
    price: 99,
    interval: 'month',
    features: [
      'Everything in Premium',
      'Unlimited expert consultations',
      'White-label options',
      'Advanced analytics',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'Team collaboration (up to 10 users)'
    ],
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  },
}

export const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''
