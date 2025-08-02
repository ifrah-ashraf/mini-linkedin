import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import supabase from '@/lib/supabaseClient';
import { JwtPayload } from '@/types';


export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
  }

  let decodedToken: JwtPayload ;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch (error) {
    return NextResponse.json({ error: `Unauthorized: Invalid token ${error}` }, { status: 401 });
  }

  const userId = decodedToken.id;

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch posts', details: error }, { status: 500 });
  }

  return NextResponse.json({ posts }, { status: 200 });
}
