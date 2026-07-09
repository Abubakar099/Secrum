import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@/lib/auth/jwt'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Build filter object
    const where: any = { active: true }

    if (category) {
      where.category = category
    }

    if (featured) {
      where.featured = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Fetch products with images and reviews
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: { orderBy: { order: 'asc' } },
          reviews: {
            where: { status: 'approved' },
            select: { rating: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ])

    // Calculate average rating for each product
    const productsWithRating = products.map((product) => {
      const avgRating =
        product.reviews.length > 0
          ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
          : 0

      return {
        ...product,
        rating: parseFloat(avgRating.toFixed(1)),
        reviewCount: product.reviews.length,
        reviews: undefined,
      }
    })

    // Check for products without images and add fallback indicators
    const productsWithImageStatus = productsWithRating.map((product) => ({
      ...product,
      imageStatus: {
        hasImages: product.images && product.images.length > 0,
        imageCount: product.images?.length || 0,
        usingFallback: !product.images || product.images.length === 0,
      },
    }))

    return NextResponse.json({
      success: true,
      message: `Successfully fetched ${productsWithRating.length} products`,
      products: productsWithImageStatus,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[v0] Error fetching products:', error)
    
    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
        details: errorMessage,
        message: 'Unable to load products at this time. Please try again later.',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Decode token
    const decoded = decodeToken(token)

    if (!decoded || !decoded.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, slug, description, tagline, price, originalPrice, stock, category, featured, images } = body

    // Validate required fields
    if (!name || !slug || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, slug, price, category' },
        { status: 400 }
      )
    }

    // Check if product with slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
        { status: 409 }
      )
    }

    // Validate images if provided
    if (images && Array.isArray(images)) {
      for (const img of images) {
        if (!img.imageUrl) {
          return NextResponse.json(
            { error: 'All images must have an imageUrl' },
            { status: 400 }
          )
        }
      }
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        tagline,
        price,
        originalPrice,
        stock: stock || 0,
        category,
        featured: featured || false,
        active: true,
        images: {
          create: images?.map((img: any, index: number) => ({
            imageUrl: img.imageUrl,
            alt: img.alt || name,
            order: index,
          })) || [],
        },
      },
      include: {
        images: true,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: `Product created successfully with ${product.images?.length || 0} images`,
        product,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error creating product:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    
    // Handle specific Prisma errors
    if (errorMessage.includes('Unique constraint failed')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product slug already exists',
          message: 'A product with this slug already exists. Please choose a different slug.',
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
        details: errorMessage,
        message: 'Unable to create product. Please check your input and try again.',
      },
      { status: 500 }
    )
  }
}
