"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import PostItem from "./PostItem";
import { useUserStore } from "@/stores/useUserStore";
import { getMyPosts } from "@/lib/post_api";
import SkeletonPost from "../layout/SkeletonPost";

type Post = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading , setLoading] = useState(true)
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await getMyPosts() ;
        setPosts(res.posts);
      } catch (error) {
        console.error("Error fetching user's posts", error);
      }finally{
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  if (!user) return null;

  if (loading) {
      return (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonPost key={i} />
          ))}
        </div>
      );
    }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.id}
            content={post.content}
            timestamp={post.created_at}
            authorName={user.name}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
