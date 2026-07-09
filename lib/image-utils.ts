import type { Product, ProductImage } from './types'

// Unsplash fallback URLs by category
const UNSPLASH_FALLBACKS: Record<string, string> = {
  serums: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800&h=800',
  moisturizers: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800&h=800',
  cleansers: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800&h=800',
  exfoliants: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=800&h=800',
  elixirs: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=800&h=800',
  oils: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800&h=800',
  clays: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800&h=800',
  essences: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=800&h=800',
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=800&h=800'

/**
 * Get the primary image URL for a product with fallback logic
 * @param product - The product object
 * @returns The image URL or fallback if unavailable
 */
export function getProductImageUrl(product: Product): string {
  // Try to get image from images array first
  if (product.images && product.images.length > 0) {
    const primaryImage = product.images[0]
    if (isValidUrl(primaryImage.imageUrl)) {
      return primaryImage.imageUrl
    }
  }

  // Fall back to legacy image field
  if (product.image && isValidUrl(product.image)) {
    return product.image
  }

  // Use category-specific Unsplash fallback
  const fallback = UNSPLASH_FALLBACKS[product.category] || DEFAULT_FALLBACK
  return fallback
}

/**
 * Get all images for a product with fallback
 * @param product - The product object
 * @returns Array of image URLs
 */
export function getProductImages(product: Product): { url: string; alt: string }[] {
  const images: { url: string; alt: string }[] = []

  // Add images from database
  if (product.images && product.images.length > 0) {
    product.images.forEach((img) => {
      if (isValidUrl(img.imageUrl)) {
        images.push({
          url: img.imageUrl,
          alt: img.alt || product.name,
        })
      }
    })
  }

  // Add legacy image field if valid
  if (product.image && isValidUrl(product.image) && !images.some((img) => img.url === product.image)) {
    images.push({
      url: product.image,
      alt: product.name,
    })
  }

  // If no valid images, add fallback
  if (images.length === 0) {
    const fallback = UNSPLASH_FALLBACKS[product.category] || DEFAULT_FALLBACK
    images.push({
      url: fallback,
      alt: product.name,
    })
  }

  return images
}

/**
 * Validate if a URL is properly formatted
 * @param url - The URL to validate
 * @returns True if URL is valid
 */
export function isValidUrl(url?: string): boolean {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Get image with error handling and fallback
 * @param imageUrl - The primary image URL
 * @param fallbackUrl - The fallback URL if primary fails
 * @returns The image URL to use
 */
export function getImageWithFallback(imageUrl?: string, fallbackUrl?: string): string {
  if (imageUrl && isValidUrl(imageUrl)) {
    return imageUrl
  }
  return fallbackUrl || DEFAULT_FALLBACK
}

/**
 * Generate responsive image srcset for Next.js Image component
 * @param imageUrl - The image URL
 * @returns Srcset string for different viewport sizes
 */
export function getImageSrcSet(imageUrl: string): string {
  // For Cloudinary URLs, we can append transformation params
  if (imageUrl.includes('cloudinary')) {
    return `
      ${imageUrl.replace('upload/', 'upload/w_400/')} 400w,
      ${imageUrl.replace('upload/', 'upload/w_600/')} 600w,
      ${imageUrl.replace('upload/', 'upload/w_800/')} 800w,
      ${imageUrl.replace('upload/', 'upload/w_1000/')} 1000w
    `
  }

  // For other URLs, return as-is
  return imageUrl
}

/**
 * Get optimized image URL with width and quality params
 * @param imageUrl - The image URL
 * @param width - Desired width in pixels
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(imageUrl: string, width: number = 800): string {
  if (!isValidUrl(imageUrl)) return DEFAULT_FALLBACK

  // Handle Cloudinary URLs
  if (imageUrl.includes('cloudinary')) {
    return imageUrl.replace('upload/', `upload/w_${width},q_auto,f_auto/`)
  }

  // Handle Unsplash URLs
  if (imageUrl.includes('unsplash')) {
    const separator = imageUrl.includes('?') ? '&' : '?'
    return `${imageUrl}${separator}w=${width}&q=80&fit=crop`
  }

  return imageUrl
}

/**
 * Check if an image is from Unsplash (fallback)
 * @param imageUrl - The image URL
 * @returns True if from Unsplash
 */
export function isUnsplashFallback(imageUrl: string): boolean {
  return imageUrl.includes('unsplash.com')
}
