import supabase from "@/lib/supabaseClient";
import { JwtPayload } from "@/types";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const token = req?.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized: Token missing' }, { status: 401 })
    }

    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err) {
        return NextResponse.json({ error: `Unauthorized: Invalid token ${err}` }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('posts')
        .select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post : data }, { status: 200 });
}