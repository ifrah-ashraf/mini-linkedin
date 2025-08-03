"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { signupUser } from "@/lib/auth_api";
import { SignupPayload } from "@/types";

export default function Signup({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (val: boolean) => void;
}) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [formData, setFormData] = useState<SignupPayload>({
    name: "",
    email: "",
    password: "",
    dob: "",
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signupUser(formData);
      setUser(data.user); 
      router.push("/home");
    } catch (err) {
      alert( `Signup failed ${err}`);
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      <form onSubmit={handleSignup} className="space-y-4">

        {["name", "email", "password", "dob"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {field === "dob" ? "Date of Birth" : field}
            </label>
            <input
              type={field === "password" ? "password" : field === "dob" ? "date" : "text"}
              name={field}
              value={formData[field as keyof SignupPayload]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 px-4 py-2 rounded-md resize-none"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0A66C2] text-white py-2 px-4 rounded-md hover:bg-[#004182] transition-colors duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
