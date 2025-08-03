import React from "react";
import { useUserStore } from "@/stores/useUserStore";

const UserProfile = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  // Format join date if available
  const formattedDate =
    user.created_at
      ? new Date(user.created_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4 text-3xl font-semibold text-gray-600">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="mt-2 text-gray-700 text-center">
        {user.bio || <span className="italic text-gray-400">No bio available.</span>}
      </p>
      {formattedDate && (
        <p className="mt-4 text-sm text-gray-400">Joined: {formattedDate}</p>
      )}
    </div>
  );
};

export default UserProfile;
