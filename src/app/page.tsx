"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Footer from "@/components/Footer";
import LandingNavbar from "@/components/Navbar/LandingNavbar";

export default function Home() {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      router.push("/home"); // or /feed or whatever your authenticated home page is
    }
  }, [user, router]);

  return (
    <>
      {/* Show Landing Navbar only if not logged in */}
      <LandingNavbar onAuthChange={setAuthMode} />

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
          {authMode === "login" ? <Login /> : <Signup />}
        </div>
      </div>

      <Footer />
    </>
  );
}
