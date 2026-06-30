import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const product_id = searchParams.get('product_id')

    let query = supabase
      .from('reviews')
      .select('id, rating, title, content, user_id, created_at, users(first_name)')
      .eq('status', 'approved')

    if (product_id) {
      query = query.eq('product_id', product_id)
    }

    const { data: reviews, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('[v0] Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
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

    const { product_id, rating, title, content } = await request.json()

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const { data: review, error } = await supabase
      .from('reviews')
      .insert([{
        product_id,
        user_id: user.id,
        rating,
        title,
        content,
        status: 'pending',
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'You have already reviewed this product' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
