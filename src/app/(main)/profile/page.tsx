"use client";
import { useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { useUserStore } from "@/stores/useUserStore";
import UserProfile from "@/components/profile/UserProfile";
import PostList from "@/components/profile/PostList";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
   const { user, setUser } = useUserStore();
  const router = useRouter();

 useEffect(() => {
    if (!user) {
      axiosInstance
        .get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch((err) => {
          if (err.response?.status === 401) router.push("/");
          else console.error("Error loading user:", err);
        });
    }
  }, [user, setUser, router]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <UserProfile />
      <PostList />
    </div>
  );
};

export default ProfilePage;
