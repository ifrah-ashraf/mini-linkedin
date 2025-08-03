"use client";

import { useState } from "react";
import { createPost } from "@/lib/post_api";

export default function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePost = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      await createPost(content)
      setContent("");
      setMessage("Post created successfully!");
      onPostCreated();
    } catch (err) {
      setMessage("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2 resize-none"
        rows={3}
      ></textarea>
      <button
        onClick={handlePost}
        className="mt-2 px-4 py-2 bg-[#0A66C2] text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Posting..." : "Create Post"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
