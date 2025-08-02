"use client";

import { useState } from "react";

/* type Props = {
  onSwitch: () => void;
}; */

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call signup API
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          Sign Up
        </button>
      </form>

      {/* <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <button onClick={onSwitch} className="text-blue-600 hover:underline">
          Login
        </button>
      </p> */}
    </div>
  );
}
