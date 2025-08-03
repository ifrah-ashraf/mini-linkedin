// app/home/layout.tsx
"use client";

import { useUserStore } from "@/stores/useUserStore";
import AppNavbar from "@/components/Navbar/AppNavbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);

  return (
    <>
      {user && <AppNavbar />}
      {children}
    </>
  );
}
