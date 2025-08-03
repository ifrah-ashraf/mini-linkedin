type Props = {
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
};

export default function LandingNavbar({ authMode, setAuthMode }: Props) {
  const isLogin = authMode === "login";
  const isSignup = authMode === "signup";

  return (
    <nav className="w-full lg:w-[70%] mx-auto p-4 border-b-2 bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl flex justify-between items-center">
        <div className="text-xl font-bold">Linkedin</div>
        <div className="space-x-4">
          <button
            onClick={() => setAuthMode("login")}
            className={`text-lg px-4 py-2 rounded cursor-pointer transition-colors duration-200 ${
              isLogin
                ? "bg-[#0A66C2] text-white hover:bg-[#004182]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            className={`text-lg px-4 py-2 rounded cursor-pointer transition-colors duration-200 ${
              isSignup
                ? "bg-[#0A66C2] text-white hover:bg-[#004182]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
