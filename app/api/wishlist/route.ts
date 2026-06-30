import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: wishlist, error } = await supabase
      .from('wishlist')
      .select('id, products(*)')
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ wishlist })
  } catch (error) {
    console.error('[v0] Error fetching wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
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

    const { product_id } = await request.json()

    const { data: item, error } = await supabase
      .from('wishlist')
      .insert([{ user_id: user.id, product_id }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Already in wishlist' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    console.error('[v0] Error adding to wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}
