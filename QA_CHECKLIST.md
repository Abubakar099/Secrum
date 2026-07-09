# Image Migration & Testing QA Checklist

## Overview
Comprehensive QA checklist for the image migration from local assets to Supabase/Cloudinary with Unsplash fallbacks.

---

## 1. Error Handling

### API Errors
- [ ] API returns 500 error with descriptive message when database connection fails
- [ ] API returns 400 error for invalid product data
- [ ] API returns 409 error for duplicate product slugs
- [ ] Error messages include helpful details for debugging

### Image Loading Errors
- [ ] Broken Cloudinary URLs fallback to Unsplash gracefully
- [ ] Missing image arrays use category-specific Unsplash URLs
- [ ] Image load failures don't crash the component
- [ ] Error boundaries catch and display image loading failures

### Network Errors
- [ ] Fetch timeout is handled with fallback
- [ ] Slow network doesn't block UI rendering
- [ ] Offline mode shows cached or fallback images

### Test Coverage
- [ ] Run `npm run test` and verify error handling tests pass
- [ ] Check `/testing` page for "Error Handling Test" results

---

## 2. Success Messages

### API Responses
- [ ] POST /api/products returns success message with product ID
- [ ] GET /api/products returns success message with product count
- [ ] Product creation includes image count in response
- [ ] Response includes `imageStatus` object with fallback indicators

### User Feedback
- [ ] "Image loading..." state displays while fetching
- [ ] "Image loaded successfully" confirmed in console logs
- [ ] Toast notifications show for successful operations
- [ ] Loading states cleared after image loads

### Test Coverage
- [ ] Verify success messages in API responses
- [ ] Check browser console for "[v0] Image loaded successfully" logs

---

## 3. Empty States

### No Products
- [ ] Homepage displays "No products available" message when empty
- [ ] Product grid shows placeholder cards
- [ ] Shop page displays helpful message instead of blank space
- [ ] Empty state is accessible and properly labeled

### No Images
- [ ] Products without images show Unsplash fallback
- [ ] Fallback images are appropriately sized
- [ ] Product details still visible even without images
- [ ] No console errors for missing images

### Empty Search Results
- [ ] Search returns "No results found" message
- [ ] Suggestions to modify search terms provided
- [ ] Filters remain accessible

### Test Coverage
- [ ] Run "Empty State Test" from `/testing` page
- [ ] Manually verify empty states in different scenarios

---

## 4. Image Loading

### Loading Performance
- [ ] Images load within 2 seconds on 4G connection
- [ ] Images don't block page rendering
- [ ] Lazy loading active for below-fold images
- [ ] Progressive image loading (blur to full) implemented

### Image Optimization
- [ ] Next.js Image component properly configured
- [ ] Srcset attributes working for responsive images
- [ ] WebP format served where supported
- [ ] Images optimized for different viewport sizes

### Multiple Image Formats
- [ ] Cloudinary URLs load (primary)
- [ ] Unsplash URLs load (fallback)
- [ ] Legacy image field still works
- [ ] Images array properly ordered

### Test Coverage
- [ ] Run "Image Loading Test" from `/testing` page
- [ ] Check DevTools Network tab for image load times
- [ ] Test on slow 3G network using DevTools throttling
- [ ] Verify responsive images with device emulation

---

## 5. Performance

### Metrics to Track
- [ ] **LCP (Largest Contentful Paint)**: < 2.5s (good)
- [ ] **INP (Interaction to Next Paint)**: < 200ms (good)
- [ ] **CLS (Cumulative Layout Shift)**: < 0.1 (good)
- [ ] **TTFB (Time to First Byte)**: < 600ms

### Image Performance
- [ ] Average image load time: < 1s
- [ ] Total image size < 500KB per page
- [ ] No layout shift when images load
- [ ] Image cache headers properly set

### Optimization
- [ ] Use `next/image` Image component
- [ ] Images use `loading="lazy"` for offscreen images
- [ ] Images use `loading="eager"` for above-fold
- [ ] Proper `sizes` attributes for responsive images

### Test Coverage
- [ ] Run "Performance Test" from `/testing` page
- [ ] Use Lighthouse audit (DevTools)
- [ ] Use PageSpeed Insights
- [ ] Check WebVitals with Web Vitals library

```bash
# Commands to check performance
npm run build
npm run start
# Then open DevTools and run Lighthouse audit
```

---

## 6. Accessibility

### Alt Text
- [ ] All images have descriptive alt text
- [ ] Alt text includes product name
- [ ] Alt text is not just "image" or "photo"
- [ ] Empty alt (`alt=""`) only for decorative images

### ARIA Labels
- [ ] Image buttons have `aria-label`
- [ ] Loading states announced to screen readers
- [ ] Error messages are announcements
- [ ] Skip to content links work

### Keyboard Navigation
- [ ] All image interactions keyboard accessible
- [ ] Tab order makes sense
- [ ] Focus indicators visible
- [ ] No keyboard traps

### Color Contrast
- [ ] Image overlays have sufficient contrast
- [ ] Text over images readable (WCAG AA)
- [ ] Loading spinners visible on all backgrounds

### Test Coverage
- [ ] Run "Accessibility Test" from `/testing` page
- [ ] Use axe DevTools browser extension
- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader (NVDA or JAWS)

---

## 7. SEO

### Meta Tags
- [ ] og:image set for products
- [ ] twitter:image set for products
- [ ] Image alt text optimized for SEO
- [ ] Product schema.org structured data includes image URLs

### Sitemaps
- [ ] Image sitemap generated with image URLs
- [ ] Product sitemap includes image information
- [ ] Sitemaps submitted to Google Search Console

### Structured Data
- [ ] Product schema includes image URLs
- [ ] Image schema includes alt text
- [ ] Valid JSON-LD format
- [ ] Validated with Google's Structured Data Tool

### URL Structure
- [ ] Cloudinary URLs include image metadata
- [ ] URLs are permanent and stable
- [ ] CDN URLs are correct format
- [ ] Fallback URLs are crawlable

### Test Coverage
- [ ] Run "SEO Test" from `/testing` page
- [ ] Validate with Google Structured Data Tool
- [ ] Check Open Graph tags with Facebook Debugger
- [ ] Test Twitter Card with Twitter Card Validator
- [ ] Verify image sitemaps in Search Console

---

## 8. Browser & Device Testing

### Desktop Browsers
- [ ] Chrome/Edge - Latest 2 versions
- [ ] Firefox - Latest 2 versions
- [ ] Safari - Latest 2 versions

### Mobile Devices
- [ ] iPhone 12/13/14/15 (Safari)
- [ ] iPhone SE (older device test)
- [ ] Android devices (Chrome)
- [ ] Tablet (iPad, Android tablet)

### Network Conditions
- [ ] Fast 4G (fast network)
- [ ] 4G (standard network)
- [ ] 3G (slow network)
- [ ] Offline mode

### Test Cases Per Device
- [ ] Product grid loads correctly
- [ ] Images display at proper aspect ratio
- [ ] Modal opens and displays images
- [ ] Cart shows product images
- [ ] Fallback images load when needed

---

## 9. Database Integration Tests

### Supabase Connection
- [ ] Can connect to Supabase database
- [ ] Can query product images
- [ ] Can insert new products with images
- [ ] Can update product images
- [ ] Can delete products and their images

### Data Validation
- [ ] Images with valid URLs stored correctly
- [ ] Images with invalid URLs handled gracefully
- [ ] Alt text stored and retrieved properly
- [ ] Image order maintained (displayOrder field)

### Test Commands
```bash
# Test database operations
npm run test:db

# Check Supabase connection
psql -h db.supabaseproject.com -U postgres -d postgres
```

---

## 10. Component-Specific Tests

### ProductCard
- [ ] Displays product image
- [ ] Shows fallback on image error
- [ ] Image responds to hover
- [ ] Image loads lazily when scrolled into view
- [ ] Alt text matches product name

### ProductDetailModal
- [ ] Shows primary image
- [ ] Multiple images work (if available)
- [ ] Image carousel functional (if implemented)
- [ ] Zoom functionality works (if implemented)
- [ ] Close button works without issues

### CartDrawer
- [ ] Shows product thumbnail
- [ ] Image loads without blocking checkout
- [ ] Multiple items display images correctly
- [ ] Fallback works when image fails

### HeroCarousel
- [ ] Hero images load and cycle
- [ ] Navigation arrows work
- [ ] Autoplay functions correctly
- [ ] Images display at full viewport size

---

## Manual Testing Checklist

### Homepage Flow
- [ ] Load homepage
- [ ] Verify hero images load
- [ ] Scroll to products section
- [ ] Verify product images load
- [ ] Hover over product (check zoom effect)
- [ ] Click product to open modal
- [ ] Verify modal image loads

### Shopping Flow
- [ ] Browse products
- [ ] Add product to cart
- [ ] Open cart drawer
- [ ] Verify cart images display
- [ ] Click checkout
- [ ] Complete order (admin testing)

### Admin Flow (if applicable)
- [ ] Create new product with images
- [ ] Upload images via API
- [ ] Verify images appear on product
- [ ] Edit product images
- [ ] Delete product and verify cleanup

### Error Scenarios
- [ ] Disable internet - verify offline handling
- [ ] Block CDN - verify fallback works
- [ ] Slow 3G - verify progress feedback
- [ ] Large image files - verify performance

---

## 11. Deployment Checklist

### Pre-Deployment
- [ ] All tests passing (run `npm run test`)
- [ ] No console errors or warnings
- [ ] Lighthouse audit score > 90
- [ ] Images optimized and cached
- [ ] Environment variables configured

### Staging Deployment
- [ ] Deploy to staging environment
- [ ] Run full test suite on staging
- [ ] Verify database connection
- [ ] Test image loading from CDN
- [ ] Performance tested on real network

### Production Deployment
- [ ] Backup database before deployment
- [ ] Deploy to production
- [ ] Verify all product images load
- [ ] Monitor error rates
- [ ] Check Web Vitals metrics
- [ ] Verify no 404s for images

---

## 12. Monitoring & Maintenance

### Ongoing Checks
- [ ] Image URLs validity check (weekly)
- [ ] Broken image rate monitoring
- [ ] CDN performance monitoring
- [ ] Fallback usage rate tracking

### Metrics to Monitor
- [ ] Image load failure rate (should be < 1%)
- [ ] Fallback usage rate (track against expectations)
- [ ] Average image load time (should improve over time)
- [ ] User complaints about images

### Logs to Check
```bash
# View image loading errors
tail -f /var/log/next.log | grep "image failed"

# Check fallback usage
tail -f /var/log/next.log | grep "unsplash"
```

---

## Sign-Off

After completing all sections above:

- [ ] All tests passing
- [ ] No critical issues found
- [ ] Performance meets targets
- [ ] Accessibility compliant (WCAG 2.1 AA)
- [ ] SEO optimization complete

**QA Tested By:** ___________________
**Date:** ___________________
**Notes:** ___________________________________________________
