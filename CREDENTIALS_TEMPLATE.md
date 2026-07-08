# Secrum E-Commerce - Credentials & Environment Variables

**⚠️ IMPORTANT: Keep this file private. Do NOT commit to Git.**

---

## 🔑 Environment Variables for Vercel

Add these to your **Vercel Project Settings → Environment Variables**:

```
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = [your_cloud_name]
CLOUDINARY_API_KEY = [your_api_key]
CLOUDINARY_API_SECRET = [your_api_secret]

# Email Service (Resend)
RESEND_API_KEY = [your_resend_api_key]
RESEND_FROM_EMAIL = noreply@secrum.com

# Database (should already be set)
DATABASE_URL = [your_supabase_connection_string]

# API Configuration (optional)
NEXT_PUBLIC_API_URL = https://your-domain.com
```

---

## 📋 Cloudinary Credentials

**Sign up:** https://cloudinary.com/users/register/free

### Where to find in Cloudinary:
- Go to **Dashboard** → **Settings** → **API Keys**

```
Cloud Name:        [PASTE_FROM_CLOUDINARY]
API Key:           [PASTE_FROM_CLOUDINARY]
API Secret:        [PASTE_FROM_CLOUDINARY]
```

**Steps:**
1. Go to Cloudinary Dashboard
2. Click Settings (gear icon)
3. Click API Keys tab
4. Copy Cloud Name, API Key, API Secret

---

## 📧 Resend Email Credentials

**Sign up:** https://resend.com

### Where to find in Resend:
- Go to **API Keys** section

```
RESEND_API_KEY:    [PASTE_FROM_RESEND]
From Email:        noreply@secrum.com
```

**Steps:**
1. Go to Resend Dashboard
2. Click API Keys (left sidebar)
3. Create new API key
4. Copy the key

---

## 🗄️ Supabase Credentials

**Dashboard:** https://supabase.com/dashboard/project/ikdvzhdhusdnnxjgxwwm

```
Project URL:       https://ikdvzhdhusdnnxjgxwwm.supabase.co
API Key:           [Already configured in DATABASE_URL]
Database Host:     ikdvzhdhusdnnxjgxwwm.supabase.co
Products Table:    products
Orders Table:      orders
```

**Update Products Table with Cloudinary URLs:**
- Open: https://supabase.com/dashboard/project/ikdvzhdhusdnnxjgxwwm/editor/18400
- Click on "products" table
- Update "image" column for each product

---

## 🚀 Vercel Project

**Project Name:** Secrum
**Project URL:** https://vercel.com/dashboard

**Steps to add environment variables:**
1. Go to Vercel Dashboard
2. Click on your project (Secrum)
3. Settings → Environment Variables
4. Add the variables above
5. Redeploy project

---

## 🔐 Local Development (.env.local)

Create a `.env.local` file in the project root:

```bash
# .env.local

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=noreply@secrum.com

# Database (if not using Vercel's version)
DATABASE_URL=your_supabase_connection_string

# API
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**⚠️ IMPORTANT:** Add `.env.local` to `.gitignore` - it should NOT be committed!

---

## 📝 Credential Collection Checklist

Use this to collect all credentials before setup:

### Cloudinary
- [ ] Cloud Name: ________________
- [ ] API Key: ________________
- [ ] API Secret: ________________
- [ ] Test upload successful? (yes/no)

### Resend  
- [ ] API Key: ________________
- [ ] From Email: noreply@secrum.com
- [ ] Test email sent? (yes/no)

### Supabase
- [ ] Project URL: ________________
- [ ] Database URL: ________________
- [ ] Products table updated? (yes/no)

### Vercel
- [ ] Environment variables added? (yes/no)
- [ ] Project redeployed? (yes/no)
- [ ] Production URL: ________________

---

## 🧪 Testing Credentials

### Test Cloudinary:
```bash
# These test URLs should work:
https://res.cloudinary.com/[YOUR_CLOUD_NAME]/image/upload/v1/cld-sample-5.jpg
```

### Test Resend:
```bash
# After first order, check:
1. Check your email inbox for order confirmation
2. Check Resend dashboard for delivery status
```

### Test Supabase:
```bash
# Products should show Cloudinary images:
1. Go to /shop page
2. Images should load from https://res.cloudinary.com/...
```

---

## 🔄 Credential Rotation

If you need to change credentials:

### For Cloudinary:
1. Create new API Key in Cloudinary
2. Update CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET
3. Redeploy on Vercel
4. Old key will stop working

### For Resend:
1. Create new API Key in Resend
2. Update RESEND_API_KEY
3. Redeploy on Vercel
4. Old key will stop working

### For Supabase:
1. Use Vercel's Supabase integration for automatic updates
2. Or manually update DATABASE_URL

---

## 🆘 Troubleshooting Credentials

### "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is undefined"
- [ ] Variable added to Vercel? Yes/No
- [ ] Project redeployed? Yes/No
- [ ] Locally: Added to .env.local? Yes/No
- [ ] Locally: Restarted npm run dev? Yes/No

### "RESEND_API_KEY invalid"
- [ ] Key is correct? Double-check for typos
- [ ] Key starts with "re_"? Should look like: re_123456789
- [ ] Key copied completely? Sometimes truncates

### "CLOUDINARY_API_SECRET not working"
- [ ] Make sure it's the SECRET, not just the KEY
- [ ] SECRET starts with letters like "abc"
- [ ] No extra spaces in credentials

---

## 📱 Production Deployment Checklist

Before deploying to production:

- [ ] All 5 environment variables added to Vercel
- [ ] Tested locally with .env.local
- [ ] Project redeployed on Vercel
- [ ] Cloudinary images loading on production
- [ ] Test order placed on production
- [ ] Confirmation email received
- [ ] Order appears in /profile
- [ ] Order appears in /admin
- [ ] Admin can send notifications
- [ ] No console errors
- [ ] No broken links

---

## 🔒 Security Notes

1. **Never commit credentials to Git**
2. **Use .env.local locally only**
3. **Add .env.local to .gitignore**
4. **Regenerate keys if accidentally exposed**
5. **Keep API secrets private**
6. **Use Vercel's built-in secrets manager**

---

## 🗑️ Cleanup

After setup, delete this file or store securely:

```bash
# Option 1: Delete locally (keep backed up elsewhere)
rm CREDENTIALS_TEMPLATE.md

# Option 2: Keep but add to .gitignore
echo "CREDENTIALS_TEMPLATE.md" >> .gitignore
```

---

## ✅ Final Verification

After adding all credentials:

```bash
# 1. Run development server
npm run dev

# 2. Check all variables loaded
# Open http://localhost:3000/shop
# Images should load from Cloudinary

# 3. Test complete flow
# - Add to cart
# - Checkout
# - Place order
# - Check email

# 4. Verify production
# - Go to production URL
# - Same tests as above

# All working? You're ready for production! 🚀
```

---

**Last Updated:** Ready for Implementation
**Status:** ✅ Setup Template Ready
