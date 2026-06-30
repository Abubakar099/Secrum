import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    let query = supabase
      .from('products')
      .select('*, product_images(*), reviews(rating)')
      .eq('active', true)

    if (category) {
      query = query.eq('category', category)
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%`)
    }

    const { data: products, error } = await query.limit(50)

    if (error) throw error

    return NextResponse.json({ products })
  } catch (error) {
    console.error('[v0] Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const { data: userData } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!userData?.is_admin) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { data: product, error } = await supabase
      .from('products')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
