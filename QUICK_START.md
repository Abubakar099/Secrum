# Quick Start - Cloudinary & Resend Setup

## ⚡ 5-Minute Setup

### 1️⃣ Cloudinary Signup & Get Keys (2 min)
```
1. Go to: https://cloudinary.com/users/register/free
2. Sign up and verify email
3. Dashboard → Settings → API Keys
4. Copy: Cloud Name, API Key, API Secret
```

### 2️⃣ Upload Product Images (1 min)
```
1. Cloudinary Dashboard → Media Library → Upload
2. Select your product images
3. Right-click each image → Copy URL
4. Save the URLs (they look like: https://res.cloudinary.com/xyz/image/upload/...)
```

### 3️⃣ Add Environment Variables (1 min)

**Go to Vercel Project** → Settings → Environment Variables

Add these 5 variables:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = [your cloud name from step 1]
CLOUDINARY_API_KEY = [your api key from step 1]
CLOUDINARY_API_SECRET = [your api secret from step 1]
RESEND_API_KEY = [paste your resend key here]
RESEND_FROM_EMAIL = noreply@secrum.com
```

### 4️⃣ Update Supabase with Cloudinary URLs (1 min)
```
1. Open: https://supabase.com/dashboard/project/ikdvzhdhusdnnxjgxwwm/editor/18400?schema=public
2. Click 'products' table
3. For each product, paste Cloudinary URL in 'image' column
4. Click 'Save'
```

---

## 🧪 Testing

### Local Testing
```bash
# Add to .env.local first
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_value
CLOUDINARY_API_KEY=your_value
CLOUDINARY_API_SECRET=your_value
RESEND_API_KEY=your_value
RESEND_FROM_EMAIL=noreply@secrum.com

# Restart dev server
npm run dev

# Test on http://localhost:3000/shop (images should load)
```

### Production Testing (Vercel)
```
1. Environment variables are added to Vercel
2. Redeploy or wait for automatic deployment
3. Test on production URL
4. Images should load from Cloudinary
```

---

## ✅ Complete Checklist

- [ ] Created Cloudinary account
- [ ] Got API credentials from Cloudinary
- [ ] Uploaded images to Cloudinary
- [ ] Copied Cloudinary URLs for each product
- [ ] Updated Supabase product table with URLs
- [ ] Added environment variables to Vercel
- [ ] Restarted dev server (local)
- [ ] Verified images load on `/shop` page
- [ ] Tested complete checkout with COD
- [ ] Received order confirmation email
- [ ] Viewed order in profile → order history
- [ ] Viewed order in admin dashboard

---

## 🔗 Important Links

| Task | Link |
|------|------|
| Cloudinary Account | https://cloudinary.com/users/register/free |
| Cloudinary Dashboard | https://cloudinary.com/console |
| Supabase Products Table | https://supabase.com/dashboard/project/ikdvzhdhusdnnxjgxwwm/editor/18400 |
| Vercel Project Settings | https://vercel.com/dashboard |
| Resend API Keys | https://resend.com/api-keys |

---

## 🎯 Key URLs After Setup

| Page | URL | Purpose |
|------|-----|---------|
| Shop | `/shop` | Browse products (with Cloudinary images) |
| Cart | Click cart icon | View items, go to checkout |
| Checkout | Automatic | Select COD payment |
| Order Success | `/order/success?orderId=SR-XXX` | See order confirmation |
| Profile | `/profile` | View order history |
| Admin | `/admin` | View all orders (if admin) |
| Admin Orders | `/admin/orders` | Manage orders |

---

## 📧 Email Verification

After your first order:
1. Should receive email from: `noreply@secrum.com`
2. Email has order number, items, total, shipping address
3. Check spam folder if not in inbox
4. If not receiving, check:
   - `RESEND_API_KEY` is set correctly
   - Resend dashboard shows no errors

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Check `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set, restart dev server |
| Env vars not working locally | Add to `.env.local`, restart `npm run dev` |
| Env vars not working on Vercel | Redeploy or wait 5 min, check variables are visible in Vercel settings |
| Order emails not arriving | Check Resend dashboard, verify `RESEND_API_KEY`, check spam folder |
| Admin dashboard 403 error | Make sure logged in user has admin privileges |
| Can't find order in history | Make sure order was placed while logged in, check profile page |

---

## 📝 Example Cloudinary URL

Your URLs will look similar to:
```
https://res.cloudinary.com/dxyz1234/image/upload/v1234567890/secrum-products/rose-serum.jpg
```

You can simplify to:
```
https://res.cloudinary.com/dxyz1234/image/upload/secrum-products/rose-serum.jpg
```

---

## 🚀 After Everything Works

Your complete Secrum e-commerce flow is ready:
- ✅ Users can register/login
- ✅ Browse products (Cloudinary images)
- ✅ Add to cart
- ✅ Checkout with shipping details
- ✅ Select Cash on Delivery
- ✅ Orders created with "confirmed" status
- ✅ Stock auto-deducted
- ✅ Email confirmations sent
- ✅ Order history in profile
- ✅ Admin can view all orders

**Enjoy your live e-commerce platform! 🎉**
