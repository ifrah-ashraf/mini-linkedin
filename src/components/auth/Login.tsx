"use client";

import { loginUser } from "@/lib/auth_api";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* type Props = {
  onSwitch: () => void;
}; */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
        const data = await loginUser({email , password})
        if(data){
            console.log("The data is ", data)
            router.push("/home")
        }
    } catch (error) {
        alert(error || "Login failed");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0A66C2] text-white py-2 px-4 rounded-md hover:bg-[#004182] transition-colors duration-200 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
} 