import React from "react";

type PostItemProps = {
  content: string;
  timestamp: string;
  authorName: string;
};

const PostItem: React.FC<PostItemProps> = ({ content, timestamp, authorName }) => {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{authorName}</h4>
        <span className="text-sm text-gray-500">{new Date(timestamp).toLocaleString()}</span>
      </div>
      <p className="mt-2 text-gray-800">{content}</p>
    </div>
  );
};

export default PostItem;
