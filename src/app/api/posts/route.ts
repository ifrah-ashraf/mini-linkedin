import supabase from "@/lib/supabaseClient";
import { JwtPayload  , PostWithAuthor} from "@/types";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = req?.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized: Token missing" }, { status: 401 });
    }
    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err) {
        return NextResponse.json({ error: `Unauthorized: Invalid token ${err}` }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("posts")
        .select(`
      id,
      content,
      created_at,
      updated_at,
      user_id,
      users (
        name
      )
    `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const postsWithAuthor: PostWithAuthor[] = Array.isArray(data)
        ? data.map((post) => ({
            id: post.id,
            content: post.content,
            created_at: post.created_at,
            updated_at: post.updated_at,
            user_id: post.user_id,
            author_name:
                post.users && !Array.isArray(post.users)
                    ? post.users.name 
                    : "Unknown User",
        }))
        : [];

    return NextResponse.json({ posts: postsWithAuthor }, { status: 200 });
}
