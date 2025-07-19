"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPathname, setCurrentPathname] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    setCurrentPathname(pathname);
  }, [pathname]);

  // Show loading or basic layout during hydration
  if (!isMounted) {
    return (
      <div suppressHydrationWarning={true}>
        {children}
      </div>
    );
  }
  
  // Check if we're on dashboard, admin, login, or signup routes
  const hideNavFooter = currentPathname?.startsWith("/dashboard") || 
                       currentPathname?.startsWith("/admin") || 
                       currentPathname?.startsWith("/login") || 
                       currentPathname?.startsWith("/signup");

  return (
    <div suppressHydrationWarning={true}>
      {!hideNavFooter && <Navbar />}
      {children}
      {!hideNavFooter && <Footer />}
    </div>
  );
} 