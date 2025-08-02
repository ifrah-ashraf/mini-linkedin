/* create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password text not null,
  dob date,
  bio text,
  profile_image_url text,  -- to store image link from storage
  created_at timestamptz default now()
); */


// posts table

/* 
create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
*/