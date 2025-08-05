import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log('Login request for email:', email);

    if (!email || !password) {
      console.warn('Email or password not provided');
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Check environment variables
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key present:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log('JWT_SECRET present:', !!process.env.JWT_SECRET);

    // Query Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Supabase query error:', error.message);
    }

    if (!user) {
      console.warn('No user found for email:', email);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      console.warn('Incorrect password for email:', email);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Sign JWT
    let token: string;
    try {
      token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      );
    } catch (err) {
      console.error('JWT signing failed:', err);
      return NextResponse.json({ error: 'JWT creation failed' }, { status: 500 });
    }

    const { password: _, ...safeUser } = user;

    console.log('Login successful, setting cookie');

    const response = NextResponse.json({ user: safeUser }, { status: 200 });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Unexpected login error:', error );
    return NextResponse.json({ error: 'Internal server error', details:  error }, { status: 500 });
  }
}
