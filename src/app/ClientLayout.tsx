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
  
  // Only show Navbar and Footer on home, about, and contact pages
  const showNavFooter =
    currentPathname === "/" ||
    currentPathname === "/about" ||
    currentPathname === "/contact";

  return (
    <div suppressHydrationWarning={true}>
      {showNavFooter && <Navbar />}
      {children}
      {showNavFooter && <Footer />}
    </div>
  );
} 