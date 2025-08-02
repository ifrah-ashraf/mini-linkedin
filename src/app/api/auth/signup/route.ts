import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const salt_to_mix = 10;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, dob, bio } = body;

    if (!name || !email || !password || !dob || !bio) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt_to_mix);

    // Insert new user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        dob,
        bio,
        profile_image_url: null,
        created_at: new Date().toISOString(),
      })
      .select('id, name, email, dob, bio, profile_image_url, created_at')
      .single();

    if (insertError) {
      return NextResponse.json({ error: 'User insert failed', details: insertError }, { status: 500 });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // Create response 
    const response = NextResponse.json({ message: 'Signup successful', 'user_data': newUser }, { status: 201 });

    // set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
  }
}
