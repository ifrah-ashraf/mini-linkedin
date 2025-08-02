import { useState } from "react";

type NavbarProps = {
  onAuthChange: (mode: "login" | "signup") => void;
};

export default function Navbar({ onAuthChange }: NavbarProps) {
  const [selected, setSelected] = useState<"login" | "signup">("login");

  const handleAuthChange = (mode: "login" | "signup") => {
    setSelected(mode);
    onAuthChange(mode);
  };

  return (
    <nav className="w-full lg:w-[70%] mx-auto p-4 border-b-2 bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl flex justify-between items-center">
        <div className="text-2xl font-bold">Linkedin</div>
        <div className="space-x-4">
          <button
            onClick={() => handleAuthChange("login")}
            className={`text-lg px-4 py-2 rounded transition-colors duration-350 cursor pointer ${
              selected === "login"
                ? "bg-[#0A66C2] hover:bg-[#004182] text-white"
                : "text-gray-500 hover:text-black"
            }`}
            aria-pressed={selected === "login"}
          >
            Login
          </button>
          <button
            onClick={() => handleAuthChange("signup")}
            className={`text-lg px-4 py-2 rounded transition-colors duration-350 cursor-pointer ${
              selected === "signup"
                ? "bg-[#0A66C2] hover:bg-[#004182] text-white"
                : "text-gray-700 hover:text-black"
            }`}
            aria-pressed={selected === "signup"}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
