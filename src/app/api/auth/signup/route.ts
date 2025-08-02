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

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, salt_to_mix);

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
      .select('*')
      .single();

    if (insertError) {
      return NextResponse.json({ error: 'User insert failed', details: insertError }, { status: 500 });
    }

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    return NextResponse.json({ token, user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
  }
}
