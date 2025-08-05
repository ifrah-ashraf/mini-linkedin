import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log('[Login] Request for:', email);

    if (!email || !password) {
      console.warn('[Login] Missing email or password');
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // ENV check
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const jwtSecret = process.env.JWT_SECRET;

    if (!supabaseUrl || !supabaseKey || !jwtSecret) {
      console.error('[Env Check] Missing one or more required env vars');
      return NextResponse.json(
        {
          error: 'Server misconfiguration',
          hint: {
            NEXT_PUBLIC_SUPABASE_URL: !!supabaseUrl,
            NEXT_PUBLIC_SUPABASE_ANON_KEY: !!supabaseKey,
            JWT_SECRET: !!jwtSecret,
          },
        },
        { status: 500 }
      );
    }

    if (/\r|\n/.test(supabaseKey)) {
      console.error('[Env Check] Supabase key contains newline characters. Clean your .env.');
      return NextResponse.json(
        { error: 'Invalid Supabase API key: contains newline characters' },
        { status: 500 }
      );
    }

    // Query Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('[Supabase] Query error:', error.message);
      return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
    }

    if (!user) {
      console.warn('[Login] User not found:', email);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Password check
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('[Login] Password match:', passwordMatch);

    if (!passwordMatch) {
      console.warn('[Login] Incorrect password');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // JWT sign
    let token: string;
    try {
      token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        jwtSecret,
        { expiresIn: '1d' }
      );
    } catch (err) {
      console.error('[JWT] Signing failed:', err);
      return NextResponse.json({ error: 'JWT creation failed' }, { status: 500 });
    }

    const { password: _, ...safeUser } = user;

    console.log('[Login] Success. Setting cookie.');

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
    console.error('[Login] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
  }
}
