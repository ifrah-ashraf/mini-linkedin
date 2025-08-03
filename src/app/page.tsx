"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useAuthModeStore } from "@/stores/useAuthModeStore";

import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Loader from "@/components/layout/Loader";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const { authMode } = useAuthModeStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user, router]);

  if (loading) return <Loader />;

  return (
    <div className="w-full lg:w-[70%] min-h-screen mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Left side */}
      <div className="hidden md:flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md h-full">
        <h1 className="text-3xl font-bold text-[#0A66C2] mb-4">LinkedIn</h1>
        <p className="text-gray-600 text-lg mb-6">
          Connect, share, and grow with a vibrant community of professionals and innovators.
        </p>
      </div>

      {/* Right side */}
      <div className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-6 h-full justify-center">
        {authMode === "login" ? (
          <Login loading={loading} setLoading={setLoading} />
        ) : (
          <Signup loading={loading} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
}
