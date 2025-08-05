import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Validate email and password format (basic check)
    if (!email ||  !password) {
      return NextResponse.json({ error: 'Invalid input format.' }, { status: 400 });
    }

    // Check required env vars
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const jwtSecret = process.env.JWT_SECRET;

    if (!supabaseUrl || !supabaseKey || !jwtSecret) {
      console.error('[Server] Missing environment variables.');
      return NextResponse.json(
        { error: 'Server misconfiguration. for env variable' },
        { status: 500 }
      );
    }

    if (/\r|\n/.test(supabaseKey)) {
      console.error('[Env] Supabase API key contains newline characters.');
      return NextResponse.json(
        { error: 'Invalid Supabase API key.' },
        { status: 500 }
      );
    }

    // Lookup user in Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // Create JWT
    let token: string;
    try {
      token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        jwtSecret,
        { expiresIn: '1d' }
      );
    } catch (err) {
      console.error('[JWT] Error signing token:', err);
      return NextResponse.json({ error: 'JWT generation failed.' }, { status: 500 });
    }

    const { password: _, ...safeUser } = user;

    // Set cookie with token
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
    console.error('[Login API] Internal error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
