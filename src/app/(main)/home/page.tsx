"use client";

import CreatePost from "@/components/posts/CreatePost";
import PostList from "@/components/posts/PostList";
import { useState } from "react";

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CreatePost onPostCreated={handleRefresh} />
      <PostList key={refresh.toString()} />
    </div>
  );
}