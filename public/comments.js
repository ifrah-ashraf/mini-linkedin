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