"use client";

import { useState } from "react";
import { UserCircle2, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { createPost } from "@/lib/post_api";

export default function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<"" | "success" | "error">("");

  const handlePost = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      await createPost(content)
      setContent("");
      setMessage("success");
      onPostCreated();
    } catch {
      setMessage("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
      <header className="flex items-center mb-4">
        <UserCircle2 className="w-10 h-10 text-gray-500" />
        <h2 className="ml-3 text-lg font-semibold text-gray-700">Create Post</h2>
      </header>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
        rows={4}
        maxLength={280}
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">{content.length}/280</span>
        <button
          onClick={handlePost}
          className="flex items-center px-5 py-2 bg-[#0A66C2] text-white font-medium rounded-lg hover:bg-[#004182] disabled:opacity-50"
          disabled={loading || !content.trim()}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" /> Posting
            </>
          ) : (
            "Post"
          )}
        </button>
      </div>
      {message === "success" && (
        <p className="mt-3 text-sm text-green-600">Your post has been created!</p>
      )}
      {message === "error" && (
        <p className="mt-3 text-sm text-red-600">Failed to create post. Please try again.</p>
      )}
    </div>
  );
}