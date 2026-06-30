import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params

    const { data: product, error: productError } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*),
        product_ingredients(*),
        product_usage(*),
        skin_concerns(*),
        reviews(
          id,
          rating,
          title,
          content,
          user_id,
          created_at,
          users(first_name)
        )
      `)
      .eq('id', id)
      .eq('active', true)
      .single()

    if (productError) {
      if (productError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      throw productError
    }

    const { data: inventory } = await supabase
      .from('inventory')
      .select('quantity')
      .eq('product_id', id)
      .single()

    return NextResponse.json({
      product: {
        ...product,
        inventory: inventory?.quantity || 0,
      },
    })
  } catch (error) {
    console.error('[v0] Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userData } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!userData?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { data: product, error } = await supabase
      .from('products')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ product })
  } catch (error) {
    console.error('[v0] Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userData } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!userData?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { error } = await supabase
      .from('products')
      .update({ active: false })
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
