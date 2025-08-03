import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import supabase from '@/lib/supabaseClient';
import { JwtPayload } from '@/types';

export async function GET() {
  try {
    // Read the token from HttpOnly cookie o server side
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded?.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Fetch full user data from Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, dob, bio, profile_image_url, created_at')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user :user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: `Unauthorized - Invalid token ${err} ` }, { status: 401 });
  }
}