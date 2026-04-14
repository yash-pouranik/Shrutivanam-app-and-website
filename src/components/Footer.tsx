"use client";

import { usePathname } from "next/navigation";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard and admin pages
  const isInternalPage =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (isInternalPage) return null;

  return <CinematicFooter />;
}
