# Social Posting App (Next.js + Supabase)

This is a basic full-stack social posting application built with Next.js, Supabase, and JWT authentication. Users can sign up, log in, create posts, and view a feed of posts from all users.

## Tech Stack

- Next.js (App Router)
- Supabase (PostgreSQL and Auth)
- JWT (Authentication)
- Zustand (State Management)
- Tailwind CSS (Styling)

## Features

- Signup and login with JWT stored in HttpOnly cookies
- Create posts
- View all posts in a feed
- Automatically refresh feed after new post
- Skeleton loaders while loading content

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ifrah-ashraf/mini-linkedin
cd mini-linkedin
npm install
```

### 2. Create Environment File
Create a .env file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
```
### 3. Run the Development Server
```bash
npm run dev
```

