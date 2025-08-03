"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface Post {
  id: string;
  content: string;
  created_at: string;
  author_name: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts");
      setPosts(res.data.posts);
    } catch (err) {
      console.error("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded shadow-md">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div>
              <p className="font-semibold">{post.author_name}</p>
              <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
            </div>
          </div>
          <p className="mb-2">{post.content}</p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <button>Like</button>
            <button>Comment</button>
            <button>Share</button>
          </div>
        </div>
      ))}
    </div>
  );
}