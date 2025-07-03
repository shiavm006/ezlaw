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
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading or basic layout during hydration
  if (!isMounted) {
    return (
      <div suppressHydrationWarning={true}>
        {children}
      </div>
    );
  }
  
  // Check if we're on dashboard or admin routes
  const hideNavFooter = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  return (
    <div suppressHydrationWarning={true}>
      {!hideNavFooter && <Navbar />}
      {children}
      {!hideNavFooter && <Footer />}
    </div>
  );
} 