export type JwtPayload = {
  id: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  dob: string; 
  bio: string;
};

//the correct type that matches Supabase response
export type SupabasePostResponse = {
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    users: { name: string; }[] | null; // Supabase returns array
};


// Final response shape
export type PostWithAuthor = {
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    author_name: string;
};