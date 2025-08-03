"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { FaUserCircle } from "react-icons/fa"; // React icon for avatar
import { IoIosArrowDown } from "react-icons/io";

export default function AppNavbar() {
  const { user, clearUser } = useUserStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  
   if (!user) return null;

  const handleLogout = () => {
    clearUser();
    router.push("/");
  };

  return (
    <nav className="w-full lg:w-[70%] mx-auto p-4 border-b bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl flex justify-between items-center">
        <div className="text-2xl font-bold text-[#0A66C2]">Linkedin</div>

        <div className="relative flex items-center space-x-2 cursor-pointer">
          <FaUserCircle
            size={28}
            className="text-gray-600 hover:text-black"
            onClick={() => setDropdownOpen((prev) => !prev)}
          />
          <IoIosArrowDown
            className={`transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setDropdownOpen((prev) => !prev)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 top-10 z-50 w-40 bg-white border rounded-xl shadow-lg py-2">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/profile");
                }}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
