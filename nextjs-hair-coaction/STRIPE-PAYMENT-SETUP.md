# 💳 Complete Stripe Payment Gateway Setup Guide

## 🎯 Overview

This guide will help you set up a complete payment system with Stripe for your Hair Coaction platform.

### ✅ What's Included

- **Frontend**: Beautiful pricing page, checkout flow
- **Backend**: Secure payment processing, webhooks
- **Database**: Automatic subscription management
- **Features**: Free trial, plan switching, billing portal

---

## 📋 Prerequisites

1. **Stripe Account** - Sign up at https://stripe.com
2. **Supabase Setup** - Database must be configured
3. **Environment Variables** - `.env.local` file

---

## 🚀 Step 1: Create Stripe Account

### 1.1 Sign Up

1. Go to https://dashboard.stripe.com/register
2. Create your account
3. Verify your email
4. **Important**: Start in **Test Mode** (toggle in top right)

### 1.2 Get API Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Find your keys:
   - **Publishable key**: Starts with `pk_test_...`
   - **Secret key**: Starts with `sk_test_...` (click "Reveal")
3. Copy both keys

---

## 💰 Step 2: Create Products & Prices

### 2.1 Create Premium Plan

1. Go to https://dashboard.stripe.com/products
2. Click **"+ Add product"**
3. Fill in:
   ```
   Name: HairCoaction Premium
   Description: Professional hair care platform
   
   Pricing:
   - Type: Recurring
   - Price: $29.00
   - Billing period: Monthly
   - Currency: USD
   ```
4. Click **"Save product"**
5. **Copy the Price ID** (starts with `price_...`)

### 2.2 Create Enterprise Plan

1. Click **"+ Add product"** again
2. Fill in:
   ```
   Name: HairCoaction Enterprise
   Description: For salons and teams
   
   Pricing:
   - Type: Recurring
   - Price: $99.00
   - Billing period: Monthly
   - Currency: USD
   ```
3. Click **"Save product"**
4. **Copy the Price ID**

### 2.3 Optional: Add Free Trial

For each product:
1. Click on the product
2. Click on the price
3. Click **"Add another price"**
4. Enable **"Free trial"**
5. Set **"Trial period days": 30**

---

## 🔔 Step 3: Setup Webhooks

### 3.1 Create Webhook Endpoint

1. Go to https://dashboard.stripe.com/webhooks
2. Click **"+ Add endpoint"**
3. Enter your endpoint URL:
   ```
   https://your-domain.com/api/stripe/webhook
   
   # For local testing:
   http://localhost:3001/api/stripe/webhook
   ```

### 3.2 Select Events

Select these events:
- ✅ `checkout.session.completed`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`

4. Click **"Add endpoint"**

### 3.3 Get Webhook Secret

1. Click on your webhook endpoint
2. Click **"Reveal"** under "Signing secret"
3. **Copy the webhook secret** (starts with `whsec_...`)

---

## 🔐 Step 4: Configure Environment Variables

### 4.1 Update .env.local

Create or update `.env.local`:

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here

# Stripe Price IDs (from Step 2)
STRIPE_PREMIUM_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_ENTERPRISE_PRICE_ID=price_xxxxxxxxxxxxx

# Stripe Webhook Secret (from Step 3)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Supabase Service Role (for webhooks)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 4.2 Get Supabase Service Role Key

1. Go to https://app.supabase.com/project/_/settings/api
2. Find **"service_role"** key
3. Click "Reveal" and copy
4. **⚠️ NEVER expose this in frontend code!**

---

## 📦 Step 5: Install Dependencies

```bash
npm install stripe @stripe/stripe-js
```

Or if using yarn:
```bash
yarn add stripe @stripe/stripe-js
```

---

## 🧪 Step 6: Test Locally

### 6.1 Install Stripe CLI (for webhook testing)

**Mac/Linux:**
```bash
brew install stripe/stripe-cli/stripe
```

**Windows:**
Download from: https://github.com/stripe/stripe-cli/releases

### 6.2 Login to Stripe CLI

```bash
stripe login
```

### 6.3 Forward Webhooks to Local Server

```bash
stripe listen --forward-to localhost:3001/api/stripe/webhook
```

This will give you a webhook secret starting with `whsec_...`
Update your `.env.local` with this secret for local testing.

### 6.4 Start Development Server

```bash
npm run dev
```

### 6.5 Test the Flow

1. Go to http://localhost:3001/pricing
2. Click **"Start Free Trial"** on Premium plan
3. Use test card:
   ```
   Card: 4242 4242 4242 4242
   Expiry: Any future date
   CVC: Any 3 digits
   ZIP: Any 5 digits
   ```
4. Complete checkout
5. Check webhook events in Stripe CLI
6. Verify database updated in Supabase

---

## 🎨 Step 7: Access Payment Pages

Your payment system includes these pages:

### Pricing Page
```
http://localhost:3001/pricing
```
- Beautiful pricing cards
- Monthly/Yearly toggle
- Free trial information

### Payment Success
```
http://localhost:3001/payment/success
```
- Shown after successful payment
- Displays unlocked features

### Billing Portal
Users can manage their subscription via Stripe's billing portal:
- Update payment method
- View invoices
- Cancel subscription

---

## 🔍 Step 8: Test Different Scenarios

### Test Cards

Stripe provides test cards for various scenarios:

**Successful Payment:**
```
4242 4242 4242 4242
```

**Declined Payment:**
```
4000 0000 0000 0002
```

**Requires Authentication:**
```
4000 0025 0000 3155
```

**Insufficient Funds:**
```
4000 0000 0000 9995
```

More test cards: https://stripe.com/docs/testing

---

## 📊 Step 9: Monitor Payments

### Stripe Dashboard

Monitor your payments at:
- **Payments**: https://dashboard.stripe.com/payments
- **Customers**: https://dashboard.stripe.com/customers
- **Subscriptions**: https://dashboard.stripe.com/subscriptions

### Database

Check subscription status in Supabase:
```sql
SELECT 
  id, 
  email, 
  subscription_tier, 
  subscription_status, 
  subscription_end_date
FROM profiles
WHERE subscription_tier != 'free';
```

---

## 🚀 Step 10: Go Live (Production)

### 10.1 Activate Stripe Account

1. Complete business verification in Stripe
2. Add bank account for payouts
3. Switch from **Test Mode** to **Live Mode**

### 10.2 Get Live API Keys

1. Toggle to **Live Mode** in Stripe Dashboard
2. Go to https://dashboard.stripe.com/apikeys
3. Get your **Live** keys (start with `pk_live_...` and `sk_live_...`)

### 10.3 Create Live Products

Repeat Step 2 in **Live Mode** to create:
- Premium Plan ($29/month)
- Enterprise Plan ($99/month)

### 10.4 Setup Live Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint for your production URL:
   ```
   https://your-production-domain.vercel.app/api/stripe/webhook
   ```
3. Select same events as before
4. Get the **live** webhook secret

### 10.5 Update Production Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add these with **LIVE** values:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PREMIUM_PRICE_ID=price_live_...
   STRIPE_ENTERPRISE_PRICE_ID=price_live_...
   STRIPE_WEBHOOK_SECRET=whsec_live_...
   SUPABASE_SERVICE_ROLE_KEY=your_service_role
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

### 10.6 Deploy

```bash
git add .
git commit -m "feat: add Stripe payment gateway"
git push origin main
```

Vercel will auto-deploy with your production environment variables.

---

## 🔧 Troubleshooting

### Issue: Webhook not receiving events

**Solution:**
1. Check webhook URL is correct
2. Verify webhook secret in `.env.local`
3. Check Stripe webhook logs: https://dashboard.stripe.com/webhooks
4. For local testing, ensure Stripe CLI is running

### Issue: Payment succeeds but database not updating

**Solution:**
1. Check webhook logs in Stripe Dashboard
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is set
3. Check server logs for errors
4. Ensure webhook handler is running

### Issue: "This price requires a customer" error

**Solution:**
1. Make sure you're using the correct Price ID
2. Price must be set to "Recurring" type
3. Recreate the price if necessary

### Issue: Test mode vs Live mode confusion

**Solution:**
- Test mode keys start with `pk_test_` and `sk_test_`
- Live mode keys start with `pk_live_` and `sk_live_`
- Always match mode between dashboard and your code

---

## 📁 Files Created

```
✅ package.json                          - Added Stripe dependencies
✅ lib/stripe/config.ts                  - Stripe configuration
✅ lib/stripe/client.ts                  - Client-side Stripe
✅ app/api/stripe/checkout/route.ts      - Create checkout session
✅ app/api/stripe/webhook/route.ts       - Handle webhook events
✅ app/api/stripe/portal/route.ts        - Billing portal
✅ app/pricing/page.tsx                  - Pricing page UI
✅ app/payment/success/page.tsx          - Success page
✅ .env.local.example                    - Environment template
```

---

## 🎯 Features Implemented

### Frontend
- ✅ Beautiful responsive pricing page
- ✅ Monthly/Yearly billing toggle
- ✅ Secure checkout flow
- ✅ Payment success page
- ✅ Loading states & error handling

### Backend
- ✅ Secure payment processing
- ✅ Webhook event handling
- ✅ Database integration
- ✅ Automatic subscription management
- ✅ Notification system

### User Experience
- ✅ 30-day free trial
- ✅ No credit card required for free tier
- ✅ Easy plan switching
- ✅ Self-service billing portal
- ✅ Automatic renewal
- ✅ Email confirmations

---

## 🔐 Security Best Practices

1. ✅ **Never expose secret keys** - Keep in server-side only
2. ✅ **Verify webhook signatures** - Already implemented
3. ✅ **Use HTTPS in production** - Required by Stripe
4. ✅ **Validate amounts server-side** - Prices set in backend
5. ✅ **Use idempotency keys** - Stripe handles this
6. ✅ **Rate limiting** - Consider adding to API routes

---

## 📚 Additional Resources

- **Stripe Docs**: https://stripe.com/docs
- **Stripe Testing**: https://stripe.com/docs/testing
- **Webhooks Guide**: https://stripe.com/docs/webhooks
- **Stripe CLI**: https://stripe.com/docs/stripe-cli
- **API Reference**: https://stripe.com/docs/api

---

## 🎉 Success Checklist

Before going live:

- [ ] Stripe account activated
- [ ] Products created (Premium & Enterprise)
- [ ] Prices configured with correct amounts
- [ ] Webhook endpoint created
- [ ] Environment variables set
- [ ] Dependencies installed
- [ ] Test payment completed successfully
- [ ] Webhook events received
- [ ] Database updates working
- [ ] Email notifications sent
- [ ] Tested plan switching
- [ ] Tested cancellation
- [ ] Business verification complete
- [ ] Bank account added for payouts
- [ ] Live mode configured
- [ ] Production deployment successful

---

## 💡 Tips

1. **Start in Test Mode** - Perfect your flow before going live
2. **Use Stripe CLI** - Essential for local webhook testing  
3. **Monitor Webhooks** - Check logs regularly
4. **Test Edge Cases** - Failed payments, cancellations, etc.
5. **Enable Email Receipts** - Configure in Stripe settings
6. **Add Tax Collection** - If required for your location
7. **Set Up Invoicing** - Configure invoice settings

---

**Your complete payment gateway is ready!** 🚀💳✨

Need help? Check Stripe's excellent documentation or contact support at https://support.stripe.com
