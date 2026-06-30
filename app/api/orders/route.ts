import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(name, price))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('[v0] Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      shipping_address,
      billing_address,
      customer_email,
      customer_phone,
      items,
      subtotal,
      tax,
      shipping_cost,
    } = body

    // Calculate total
    const total_amount = parseFloat(subtotal) + parseFloat(tax) + parseFloat(shipping_cost)

    // Generate unique order number
    const order_number = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: user.id,
        order_number,
        status: 'pending',
        shipping_address,
        billing_address,
        customer_email,
        customer_phone,
        subtotal,
        tax,
        shipping_cost,
        total_amount,
      }])
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.product_price,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    // Clear cart
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
