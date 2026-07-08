# Cloudinary Setup Guide for Secrum

## Quick Setup Steps

### 1. Create Cloudinary Account
- Visit: https://cloudinary.com/users/register/free
- Sign up with your email
- Verify your email
- Go to Dashboard

### 2. Get Your API Credentials
1. Click **Settings** (gear icon) → **API Keys**
2. Copy these three values:
   ```
   Cloud Name: dxyz1234
   API Key: 123456789012345
   API Secret: abcd_EFGH_ijkl_MNOP
   ```

### 3. Add Environment Variables

**In Vercel Console** (Recommended):
1. Go to your Vercel project settings
2. Click **Environment Variables**
3. Add these variables:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloud_name
   CLOUDINARY_API_KEY = your_api_key
   CLOUDINARY_API_SECRET = your_api_secret
   RESEND_API_KEY = your_resend_key
   RESEND_FROM_EMAIL = noreply@secrum.com
   ```

**Locally** (`.env.local` file):
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=noreply@secrum.com
```

### 4. Upload Product Images to Cloudinary

**Method A: Web UI (Easiest)**
1. Go to your Cloudinary Dashboard → **Media Library**
2. Click **Upload** button
3. Select your product images
4. Right-click each image → **Copy URL**
5. The URL will look like:
   ```
   https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/secrum-products/product-name.jpg
   ```

**Method B: Direct Link
If you already have image URLs hosted elsewhere, you can use them directly in Supabase:
```
https://res.cloudinary.com/your_cloud_name/image/upload/w_500,h_600,c_fill/your-image-name.jpg
```

### 5. Update Supabase with Cloudinary URLs

1. Go to: https://supabase.com/dashboard/project/ikdvzhdhusdnnxjgxwwm/editor/18400?schema=public
2. Open the **products** table
3. For each product, update the **image** column with the Cloudinary URL
4. Example:
   ```
   https://res.cloudinary.com/dxyz1234/image/upload/v1234567890/secrum-products/rose-serum.jpg
   ```

### 6. Test the Integration

1. Run your development server: `npm run dev`
2. Go to `/shop` page
3. Check if product images load correctly
4. If not, check:
   - Environment variables are set
   - Cloudinary URLs are correct in Supabase
   - Cloud Name matches your Cloudinary account

### 7. Remove Local Images Folder (Optional)

Once all Cloudinary URLs are set up:
```bash
rm -rf public/images
```

## Troubleshooting

**Images not loading?**
- Check if `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set correctly
- Verify the image URLs in Supabase start with `https://res.cloudinary.com`
- Check browser DevTools → Network tab to see the actual URL being loaded

**Can't see upload button in Cloudinary?**
- Make sure you're logged in
- Go to Media Library (not Assets)
- Click blue "Upload" button in top-right

**URLs copied from Cloudinary are too long?**
- You can shorten them by removing the version parameter (v123456789/)
- Example: `https://res.cloudinary.com/dxyz1234/image/upload/secrum-products/product.jpg`

## Image URL Format Examples

**Full URL with transformations:**
```
https://res.cloudinary.com/dxyz1234/image/upload/w_500,h_600,c_fill,q_auto/secrum-products/serum.jpg
```

**Simple URL (what you'll usually use):**
```
https://res.cloudinary.com/dxyz1234/image/upload/secrum-products/serum.jpg
```

Parameters:
- `w_500` = width 500px
- `h_600` = height 600px
- `c_fill` = crop and fill
- `q_auto` = auto quality

## Need Help?

- Cloudinary Docs: https://cloudinary.com/documentation
- Check `/lib/cloudinary/upload.ts` for upload utilities
- Check `/components/product/product-card.tsx` for image display

## After Setup

1. Environment variables take effect after deployment
2. For local testing, restart `npm run dev` after adding `.env.local`
3. All product images should now load from Cloudinary
