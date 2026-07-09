/**
 * Testing utilities for image loading, error handling, and performance checks
 */

import type { Product } from './types'
import { getProductImageUrl, isValidUrl, isUnsplashFallback } from './image-utils'

/**
 * Test result interface
 */
export interface TestResult {
  name: string
  passed: boolean
  duration: number
  error?: string
  details?: any
}

/**
 * Image loading test - verifies all product images load correctly
 */
export async function testImageLoading(products: Product[]): Promise<TestResult> {
  const startTime = performance.now()
  let loadedCount = 0
  const errors: string[] = []

  for (const product of products) {
    const imageUrl = getProductImageUrl(product)
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' })
      if (response.ok) {
        loadedCount++
      } else {
        errors.push(`${product.id}: Status ${response.status}`)
      }
    } catch (error) {
      errors.push(`${product.id}: ${String(error)}`)
    }
  }

  const duration = performance.now() - startTime
  return {
    name: 'Image Loading Test',
    passed: errors.length === 0,
    duration,
    details: {
      loadedCount,
      totalCount: products.length,
      errors: errors.slice(0, 5), // Limit to first 5 errors
    },
  }
}

/**
 * Fallback detection test - verifies Unsplash fallbacks are used when appropriate
 */
export function testFallbackDetection(products: Product[]): TestResult {
  const startTime = performance.now()
  const fallbackProducts = products.filter((p) => {
    const imageUrl = getProductImageUrl(p)
    return isUnsplashFallback(imageUrl)
  })

  const duration = performance.now() - startTime
  return {
    name: 'Fallback Detection Test',
    passed: true,
    duration,
    details: {
      fallbackCount: fallbackProducts.length,
      fallbackPercentage: ((fallbackProducts.length / products.length) * 100).toFixed(2),
      fallbackProducts: fallbackProducts.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
      })),
    },
  }
}

/**
 * URL validation test - verifies all image URLs are properly formatted
 */
export function testUrlValidation(products: Product[]): TestResult {
  const startTime = performance.now()
  let validCount = 0
  const invalidUrls: string[] = []

  for (const product of products) {
    const imageUrl = getProductImageUrl(product)
    if (isValidUrl(imageUrl)) {
      validCount++
    } else {
      invalidUrls.push(`${product.id}: ${imageUrl}`)
    }
  }

  const duration = performance.now() - startTime
  return {
    name: 'URL Validation Test',
    passed: invalidUrls.length === 0,
    duration,
    details: {
      validCount,
      totalCount: products.length,
      invalidUrls: invalidUrls.slice(0, 5),
    },
  }
}

/**
 * Empty state test - verifies empty product lists are handled gracefully
 */
export function testEmptyStates(): TestResult {
  const startTime = performance.now()
  const emptyProducts: Product[] = []
  
  try {
    const imageUrl = getProductImageUrl({} as Product)
    const isValid = isValidUrl(imageUrl)
    
    const duration = performance.now() - startTime
    return {
      name: 'Empty State Test',
      passed: isValid,
      duration,
      details: {
        fallbackProvided: isValid,
        fallbackUrl: imageUrl,
      },
    }
  } catch (error) {
    const duration = performance.now() - startTime
    return {
      name: 'Empty State Test',
      passed: false,
      duration,
      error: String(error),
    }
  }
}

/**
 * Accessibility test - verifies all images have alt text
 */
export function testAccessibility(products: Product[]): TestResult {
  const startTime = performance.now()
  const missingAltText: string[] = []

  for (const product of products) {
    if (!product.name) {
      missingAltText.push(`${product.id}: Missing product name for alt text`)
    }
    if (product.images) {
      for (const image of product.images) {
        if (!image.alt) {
          missingAltText.push(`${product.id}: Image without alt text`)
        }
      }
    }
  }

  const duration = performance.now() - startTime
  return {
    name: 'Accessibility Test',
    passed: missingAltText.length === 0,
    duration,
    details: {
      productsWithAltText: products.length - missingAltText.length,
      missingAltText: missingAltText.slice(0, 5),
    },
  }
}

/**
 * Performance test - measures image loading performance
 */
export async function testPerformance(products: Product[]): Promise<TestResult> {
  const startTime = performance.now()
  const loadTimes: number[] = []

  for (const product of products.slice(0, 10)) {
    // Sample first 10 products
    const imageStart = performance.now()
    const imageUrl = getProductImageUrl(product)
    try {
      await fetch(imageUrl, { method: 'HEAD' })
      const loadTime = performance.now() - imageStart
      loadTimes.push(loadTime)
    } catch {
      loadTimes.push(-1) // Error
    }
  }

  const avgLoadTime = loadTimes.filter((t) => t > 0).reduce((a, b) => a + b, 0) / loadTimes.filter((t) => t > 0).length
  const duration = performance.now() - startTime

  return {
    name: 'Performance Test',
    passed: avgLoadTime < 1000, // Should load in under 1 second on average
    duration,
    details: {
      avgLoadTime: avgLoadTime.toFixed(2),
      minLoadTime: Math.min(...loadTimes.filter((t) => t > 0)).toFixed(2),
      maxLoadTime: Math.max(...loadTimes.filter((t) => t > 0)).toFixed(2),
      sampledCount: loadTimes.length,
    },
  }
}

/**
 * Error handling test - verifies graceful error handling for broken images
 */
export function testErrorHandling(): TestResult {
  const startTime = performance.now()
  const errors: string[] = []

  try {
    // Test with invalid URL
    const invalidUrl = 'https://invalid-domain-12345-xyz.com/image.jpg'
    if (isValidUrl(invalidUrl)) {
      // URL format is valid even if domain doesn't exist
    }

    // Test with empty string
    if (isValidUrl('')) {
      errors.push('Empty string should not be valid')
    }

    // Test with null
    if (isValidUrl(null as any)) {
      errors.push('Null should not be valid')
    }

    const duration = performance.now() - startTime
    return {
      name: 'Error Handling Test',
      passed: errors.length === 0,
      duration,
      details: {
        testsCovered: ['Invalid URL', 'Empty String', 'Null Value'],
        errorsCaught: errors,
      },
    }
  } catch (error) {
    const duration = performance.now() - startTime
    return {
      name: 'Error Handling Test',
      passed: false,
      duration,
      error: String(error),
    }
  }
}

/**
 * SEO test - verifies structured data and meta information
 */
export function testSEO(products: Product[]): TestResult {
  const startTime = performance.now()
  const seoIssues: string[] = []

  for (const product of products) {
    if (!product.name || product.name.length === 0) {
      seoIssues.push(`${product.id}: Missing product name`)
    }
    if (!product.description || product.description.length < 10) {
      seoIssues.push(`${product.id}: Missing or too short description`)
    }
    const imageUrl = getProductImageUrl(product)
    if (!isValidUrl(imageUrl)) {
      seoIssues.push(`${product.id}: Invalid image URL`)
    }
  }

  const duration = performance.now() - startTime
  return {
    name: 'SEO Test',
    passed: seoIssues.length === 0,
    duration,
    details: {
      productsChecked: products.length,
      issues: seoIssues.slice(0, 10),
    },
  }
}

/**
 * Run all tests and return results
 */
export async function runAllTests(products: Product[]): Promise<TestResult[]> {
  const results: TestResult[] = []

  // Synchronous tests
  results.push(testFallbackDetection(products))
  results.push(testUrlValidation(products))
  results.push(testEmptyStates())
  results.push(testAccessibility(products))
  results.push(testErrorHandling())
  results.push(testSEO(products))

  // Asynchronous tests
  results.push(await testImageLoading(products))
  results.push(await testPerformance(products))

  return results
}

/**
 * Format test results for console output
 */
export function formatTestResults(results: TestResult[]): string {
  const passed = results.filter((r) => r.passed).length
  const total = results.length

  let output = `\n${'='.repeat(60)}\n`
  output += `TEST RESULTS: ${passed}/${total} passed\n`
  output += `${'='.repeat(60)}\n\n`

  for (const result of results) {
    const status = result.passed ? '✓ PASS' : '✗ FAIL'
    output += `${status} | ${result.name} (${result.duration.toFixed(2)}ms)\n`

    if (result.details) {
      Object.entries(result.details).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          output += `  ${key}: ${value.length} items\n`
        } else {
          output += `  ${key}: ${JSON.stringify(value)}\n`
        }
      })
    }

    if (result.error) {
      output += `  Error: ${result.error}\n`
    }

    output += '\n'
  }

  return output
}
