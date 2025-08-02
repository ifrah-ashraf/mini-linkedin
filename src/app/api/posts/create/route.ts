import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/types';

export async function POST(req: NextRequest) {
  try {
    // Get token from cookies
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Token missing' }, { status: 401 });
    }

    // Verify token and get user ID
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err) {
      return NextResponse.json({ error: `Unauthorized: Invalid token ${err}` }, { status: 401 });
    }

    const userId = decoded.id;

    // Parse body
    const body = await req.json();
    const { content } = body;

    if (!content || content.trim() === '') {
      return NextResponse.json({ error: 'Post content cannot be empty' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to create post', details: error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Post created successfully', post: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', details: err }, { status: 500 });
  }
}
