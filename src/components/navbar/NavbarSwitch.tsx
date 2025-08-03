"use client";

import { useUserStore } from "@/stores/useUserStore";
import AppNavbar from "./AppNavbar";
import LandingNavbar from "./LandingNavbar";
import { useState } from "react";
import { useAuthModeStore } from "@/stores/useAuthModeStore";

export default function NavbarSwitch() {
  const user = useUserStore((state) => state.user);
  const { authMode, setAuthMode } = useAuthModeStore();
  const [loading , setLoading] = useState(false)

  return user ? (
    <AppNavbar loading={loading} setLoading={setLoading} />
  ) : (
    <LandingNavbar authMode={authMode} setAuthMode={setAuthMode} />
  );
}
