import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
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

    const { data: order, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('[v0] Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
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

    // Check if admin
    const { data: userData } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!userData?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { data: order, error } = await supabase
      .from('orders')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ order })
  } catch (error) {
    console.error('[v0] Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
