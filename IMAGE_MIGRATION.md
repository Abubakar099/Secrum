# Image Migration Documentation

## Overview

This document describes the image migration from local assets to Supabase/Cloudinary URLs with Unsplash fallbacks. The system is designed to handle missing or broken images gracefully while maintaining optimal performance.

---

## Architecture

### Image Loading Flow

```
User Request
    ↓
ProductCard/Component
    ↓
getProductImageUrl(product)
    ↓
Has images array? → Yes → Return first valid image URL
    ↓ No
Has legacy image field? → Yes → Return image URL
    ↓ No
Return category-specific Unsplash fallback
    ↓
Image Component renders with error boundary
    ↓
Image loads successfully? → Yes → Display
                         → No → Use fallback CSS
```

### Image Sources (Priority Order)

1. **Primary**: Product images array from Supabase (`product.images[0].imageUrl`)
2. **Secondary**: Legacy image field (`product.image`)
3. **Fallback**: Category-specific Unsplash URLs

### Supported Image Sources

- **Cloudinary URLs**: Full optimization support (responsive sizing, format conversion)
- **Unsplash URLs**: Fallback support with query parameter optimization
- **Legacy URLs**: Any HTTPS URL (with basic error handling)

---

## Key Files

### Core Utilities

| File | Purpose |
|------|---------|
| `lib/types.ts` | Product and ProductImage interfaces |
| `lib/image-utils.ts` | Image loading and fallback logic |
| `lib/testing-utils.ts` | Comprehensive testing suite |

### Components Updated

| Component | Changes |
|-----------|---------|
| `components/product/product-card.tsx` | Uses `getProductImageUrl()`, lazy loading |
| `components/modals/product-detail-modal.tsx` | Primary image display with fallback |
| `components/cart/cart-drawer.tsx` | Cart item thumbnails with fallback |

### API Endpoints

| Endpoint | Changes |
|----------|---------|
| `GET /api/products` | Returns products with image status |
| `POST /api/products` | Validates images, includes image count in response |

### Testing & QA

| File | Purpose |
|------|---------|
| `app/testing/page.tsx` | Interactive testing dashboard |
| `QA_CHECKLIST.md` | Comprehensive QA checklist |
| `IMAGE_MIGRATION.md` | This documentation |

---

## Using the Image Utilities

### Getting Product Images

```typescript
import { getProductImageUrl, getProductImages } from '@/lib/image-utils'

const product = {
  id: 'product-1',
  name: 'Serum',
  category: 'serums',
  images: [
    {
      id: 'img-1',
      imageUrl: 'https://cloudinary.com/...',
      alt: 'Product front',
      displayOrder: 0,
    },
  ],
}

// Get primary image URL with fallback
const imageUrl = getProductImageUrl(product)

// Get all images
const allImages = getProductImages(product)
// Returns: [{ url: '...', alt: 'Product front' }, ...]
```

### In React Components

```tsx
import { getProductImageUrl } from '@/lib/image-utils'
import Image from 'next/image'

export function ProductCard({ product }) {
  return (
    <Image
      src={getProductImageUrl(product)}
      alt={product.images?.[0]?.alt || product.name}
      fill
      sizes="(max-width: 640px) 100vw, 50vw"
      loading="lazy"
      onError={(e) => {
        console.log('[v0] Image failed:', e)
        // Fallback already provided by getProductImageUrl
      }}
    />
  )
}
```

### Checking Image Validity

```typescript
import { isValidUrl, isUnsplashFallback } from '@/lib/image-utils'

const imageUrl = getProductImageUrl(product)

if (isValidUrl(imageUrl)) {
  // URL is valid
}

if (isUnsplashFallback(imageUrl)) {
  // Using Unsplash fallback, not database image
}
```

---

## Database Schema

### Products Table

```prisma
model Product {
  id        String         @id @default(uuid())
  name      String
  category  String
  featured  Boolean        @default(false)
  images    ProductImage[] // Array of images
  // ... other fields
}

model ProductImage {
  id           String  @id @default(uuid())
  productId    String
  imageUrl     String  // Cloudinary URL or any HTTPS URL
  alt          String  // Alt text for accessibility
  displayOrder Int     // Order in gallery
  product      Product @relation(fields: [productId], references: [id])
}
```

### Using ProductImage in Queries

```typescript
// Fetch product with all images
const product = await prisma.product.findUnique({
  where: { id: 'product-1' },
  include: {
    images: {
      orderBy: { displayOrder: 'asc' },
    },
  },
})

// product.images[0] is the primary image
const primaryImage = product.images[0]?.imageUrl
```

---

## API Integration

### Getting Products with Images

```typescript
// GET /api/products?featured=true&limit=10
const response = await fetch('/api/products?featured=true')
const data = await response.json()

// Response includes imageStatus for each product
data.products.forEach((product) => {
  console.log(`${product.name}:`)
  console.log(`  - Has images: ${product.imageStatus.hasImages}`)
  console.log(`  - Count: ${product.imageStatus.imageCount}`)
  console.log(`  - Using fallback: ${product.imageStatus.usingFallback}`)
})
```

### Creating Products with Images

```typescript
const newProduct = {
  name: 'New Serum',
  slug: 'new-serum',
  category: 'serums',
  price: 99,
  description: 'Amazing serum',
  images: [
    {
      imageUrl: 'https://cloudinary.com/.../image.jpg',
      alt: 'Product front view',
    },
    {
      imageUrl: 'https://cloudinary.com/.../image2.jpg',
      alt: 'Product back view',
    },
  ],
}

const response = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newProduct),
})

const { product, message } = await response.json()
// message: "Product created successfully with 2 images"
```

---

## Testing

### Running Comprehensive Tests

Navigate to `/testing` page to run all tests:

1. **Image Loading Test** - Verifies all images load successfully
2. **Fallback Detection Test** - Checks which images use Unsplash fallback
3. **URL Validation Test** - Validates all image URLs are properly formatted
4. **Empty State Test** - Tests handling of missing images
5. **Accessibility Test** - Verifies alt text coverage
6. **Error Handling Test** - Tests error scenarios
7. **Performance Test** - Measures image load times
8. **SEO Test** - Validates structured data

### Manual Testing

1. **Verify Cloudinary Images Load**
   - Check browser DevTools Network tab
   - Confirm images display correctly
   - Test on different network speeds

2. **Test Fallback Functionality**
   - Temporarily disable Cloudinary domain
   - Verify Unsplash fallback appears
   - Check console for fallback logs

3. **Performance Testing**
   - Open DevTools Lighthouse
   - Run Lighthouse audit
   - Check LCP, CLS, INP metrics
   - Compare before/after migration

4. **Accessibility Testing**
   - Use axe DevTools extension
   - Verify alt text on all images
   - Test keyboard navigation
   - Test with screen reader

---

## Fallback URLs by Category

The system automatically provides category-specific Unsplash fallbacks:

| Category | Fallback URL |
|----------|-------------|
| serums | Serum-focused cosmetic photo |
| moisturizers | Moisturizer cream photo |
| cleansers | Cleanser product photo |
| exfoliants | Exfoliant product photo |
| elixirs | Elixir/potion photo |
| oils | Oil product photo |
| clays | Clay mask photo |
| essences | Essence/toner photo |
| (default) | Generic cosmetic photo |

---

## Performance Optimization

### Image Loading Best Practices

```tsx
// DO: Use lazy loading for below-fold images
<Image src={url} loading="lazy" alt="..." />

// DO: Use priority for above-fold images
<Image src={url} priority={true} alt="..." />

// DO: Provide proper sizes attribute
<Image src={url} sizes="(max-width: 640px) 100vw, 50vw" alt="..." />

// DON'T: Don't skip alt text
// BAD: <Image src={url} alt="" />
// GOOD: <Image src={url} alt="Product serum" />
```

### Cloudinary URL Optimization

```typescript
import { getOptimizedImageUrl } from '@/lib/image-utils'

// Get optimized URL with width parameter
const optimized = getOptimizedImageUrl(imageUrl, 800)
// Cloudinary URLs: adds w_800,q_auto,f_auto transformations
```

### Response Time Targets

- **Hero images**: < 2 seconds
- **Product cards**: < 1 second
- **Thumbnails**: < 500ms
- **Fallback activation**: Immediate

---

## Troubleshooting

### Images Not Loading

1. **Check browser console** for error messages
2. **Verify URL validity** using `isValidUrl(url)`
3. **Check Cloudinary configuration** if using Cloudinary URLs
4. **Inspect image in DevTools** to see actual URL being requested
5. **Test fallback manually** by blocking Cloudinary domain

### Fallback Not Activating

1. **Ensure product has category** - used for fallback selection
2. **Verify alt text exists** - required for accessibility
3. **Check image array order** - primary image should be first
4. **Review console logs** for "[v0]" debug messages

### Performance Issues

1. **Check image file sizes** - should be < 100KB each
2. **Verify lazy loading** is applied correctly
3. **Test on slow network** using DevTools throttling
4. **Profile with Lighthouse** to identify bottlenecks
5. **Check CDN caching headers** for images

### Accessibility Issues

1. **Validate alt text** with axe DevTools
2. **Test with screen reader** (NVDA, JAWS)
3. **Check color contrast** on image overlays
4. **Verify keyboard navigation** works
5. **Test focus indicators** are visible

---

## Migration Checklist

Before going live with image migration:

- [ ] All product images uploaded to Supabase/Cloudinary
- [ ] Database ProductImage records created for all products
- [ ] Image URLs validated in test environment
- [ ] Fallback images tested for all categories
- [ ] Performance tested (Lighthouse score > 90)
- [ ] Accessibility verified (WCAG 2.1 AA)
- [ ] Mobile responsiveness verified on multiple devices
- [ ] Error handling tested with broken URLs
- [ ] CDN caching configured for optimal performance
- [ ] Backup of old image data created
- [ ] Monitoring setup for image load failures
- [ ] Team trained on new image system

---

## Support & Documentation

### Key Utilities Reference

```typescript
// Image utility functions
getProductImageUrl(product: Product): string
getProductImages(product: Product): { url: string; alt: string }[]
isValidUrl(url?: string): boolean
getImageWithFallback(url?: string, fallback?: string): string
getOptimizedImageUrl(url: string, width?: number): string
isUnsplashFallback(url: string): boolean

// Testing utilities
runAllTests(products: Product[]): Promise<TestResult[]>
testImageLoading(products: Product[]): Promise<TestResult>
testAccessibility(products: Product[]): TestResult
testSEO(products: Product[]): TestResult
```

### Related Documentation

- `/QA_CHECKLIST.md` - Comprehensive QA checklist
- `/app/testing/page.tsx` - Interactive testing dashboard
- `/lib/image-utils.ts` - Source code with detailed comments
- Product Database Schema - Prisma schema documentation

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024 | Initial image migration implementation |

---

**Last Updated:** 2024
**Maintained By:** Development Team
**Status:** Active
