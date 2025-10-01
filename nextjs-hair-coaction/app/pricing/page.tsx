'use client'

import { useState } from 'react'
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react'
import { getStripe } from '@/lib/stripe/client'
import { PRICING_PLANS } from '@/lib/stripe/config'

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month')

  const handleCheckout = async (plan: 'premium' | 'enterprise') => {
    try {
      setLoading(plan)

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      const { sessionId, url, error } = await response.json()

      if (error) {
        alert(error)
        return
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: Sparkles,
      price: 0,
      description: 'Perfect for getting started',
      features: PRICING_PLANS.free.features,
      cta: 'Get Started',
      popular: false,
      gradient: 'from-gray-600 to-gray-800',
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Zap,
      price: billingInterval === 'month' ? 29 : 290,
      description: 'For serious hair care professionals',
      features: PRICING_PLANS.premium.features,
      cta: 'Start Free Trial',
      popular: true,
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Crown,
      price: billingInterval === 'month' ? 99 : 990,
      description: 'For salons and teams',
      features: PRICING_PLANS.enterprise.features,
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-blue-600 to-purple-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-15%] w-[50vw] h-[50vw] rounded-full blur-3xl animate-blob-3d bg-gradient-to-br from-purple-600/20 via-pink-600/15 to-blue-600/20" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[45vw] h-[45vw] rounded-full blur-3xl animate-blob-3d-delay-2 bg-gradient-to-br from-blue-600/15 via-purple-600/20 to-pink-600/15" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your hair care journey. All plans include a 30-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm rounded-full p-2">
            <button
              onClick={() => setBillingInterval('month')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingInterval === 'month'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingInterval === 'year'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 px-2 py-1 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 ${
                plan.popular
                  ? 'bg-gray-800/80 border-2 border-purple-500 scale-105 shadow-2xl shadow-purple-500/20'
                  : 'bg-gray-800/50 border border-gray-700 hover:border-purple-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} mb-4`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-black text-white">${plan.price}</span>
                  <span className="text-gray-400">/{billingInterval === 'month' ? 'mo' : 'yr'}</span>
                </div>
                {billingInterval === 'year' && plan.price > 0 && (
                  <p className="text-sm text-green-400 mt-2">
                    Save ${plan.price * 12 * 0.2}/year
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  if (plan.id === 'free') {
                    window.location.href = '/signup'
                  } else if (plan.id === 'enterprise') {
                    window.location.href = 'mailto:sales@haircoaction.com'
                  } else {
                    handleCheckout(plan.id as 'premium')
                  }
                }}
                disabled={loading === plan.id}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.id ? (
                  'Processing...'
                ) : (
                  <>
                    {plan.cta}
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I switch plans later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! All paid plans include a 30-day free trial. No credit card required to start.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, American Express) and digital wallets through Stripe.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Absolutely! You can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your hair care business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals already using HairCoaction
          </p>
          <button
            onClick={() => window.location.href = '/signup'}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
          >
            Start Your Free Trial
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob-3d {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1) translate(30px, -40px); }
          66% { transform: scale(0.95) translate(-20px, 20px); }
        }
        .animate-blob-3d {
          animation: blob-3d 8s ease-in-out infinite;
        }
        .animate-blob-3d-delay-2 {
          animation: blob-3d 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
