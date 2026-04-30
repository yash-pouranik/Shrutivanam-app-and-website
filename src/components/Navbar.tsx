"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import type { LucideIcon } from "lucide-react";
import {
  Menu,
  X,
  LayoutDashboard,
  Shield,
  LogOut,
  BookOpen,
  CalendarDays,
  Video,
} from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  labelHi?: string;
  icon?: LucideIcon;
}

const PUBLIC_LINKS: NavLink[] = [
  { href: "/", label: "Home", labelHi: "होम" },
  { href: "/about", label: "About", labelHi: "हमारे बारे में" },
  { href: "/courses", label: "Courses", labelHi: "कोर्स" },
  { href: "/contact", label: "Contact", labelHi: "संपर्क" },
];

const ADMIN_LINKS: NavLink[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: BookOpen },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/meetings", label: "Meetings", icon: CalendarDays },
];

const STUDENT_LINKS: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/videos", label: "Videos", icon: Video },
  { href: "/dashboard/meetings", label: "Meetings", icon: CalendarDays },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hideNavbar =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  const isAdmin = session?.user?.role?.toLowerCase() === "admin";
  let currentLinks: NavLink[] = PUBLIC_LINKS;
  let navType: "public" | "admin" | "student" = "public";

  if (pathname.startsWith("/admin")) {
    currentLinks = ADMIN_LINKS;
    navType = "admin";
  } else if (pathname.startsWith("/dashboard")) {
    currentLinks = STUDENT_LINKS;
    navType = "student";
  }

  useEffect(() => {
    if (hideNavbar) return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideNavbar]);

  useEffect(() => {
    if (hideNavbar) return;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen, hideNavbar]);

  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U";

  if (hideNavbar) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FEF7ED]/95 backdrop-blur-md border-b border-[#EBDBCD] shadow-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#FF7F32] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-orange-200 transition-transform group-hover:scale-110">
                <Image
                  src="/shrutivanam.logo.png"
                  alt="Shrutivanam logo"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <Image
                  src="/shrutivanam.txt.png"
                  alt="Shrutivanam"
                  width={292}
                  height={78}
                  className="h-9 md:h-10 w-auto object-contain"
                />
                {navType !== "public" && (
                   <span className="text-[10px] font-bold text-[#FF7F32] tracking-[0.2em] uppercase">
                   {navType === "admin" ? "Admin Panel" : "Student Hub"}
                 </span>
                )}
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-8 absolute left-1/2 -translate-x-1/2">
              {currentLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-bold tracking-wide transition-all duration-200 flex items-center gap-2 rounded-xl ${
                    pathname === link.href
                      ? "text-[#FF7F32] bg-[#FF7F32]/5"
                      : "text-[#3B2E2A] hover:text-[#FF7F32] hover:bg-[#FF7F32]/5"
                  }`}
                >
                  {link.icon && <link.icon size={16} />}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {session ? (
                <div className="flex items-center gap-3">
                  {/* Dashboard Link for Desktop (only on public pages) */}
                  {navType === "public" && (
                    <Link
                      href={isAdmin ? "/admin" : "/dashboard"}
                      className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-[#FF7F32]/10 text-[#FF7F32] border border-[#FF7F32]/20 hover:bg-[#FF7F32] hover:text-white transition-all"
                    >
                      {isAdmin ? <Shield size={14} /> : <LayoutDashboard size={14} />}
                      {isAdmin ? "ADMIN" : "DASHBOARD"}
                    </Link>
                  )}

                  {/* Profile Dropdown */}
                  <div className="relative group">
                    <button className="w-10 h-10 rounded-xl bg-white border border-[#EBDBCD] flex items-center justify-center text-[#3B2E2A] font-bold shadow-sm transition-all group-hover:border-[#FF7F32]/30">
                      {userInitial}
                    </button>
                    
                    <div className="absolute top-full right-0 mt-3 w-64 py-2 bg-white border border-[#EBDBCD] rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl z-50">
                      <div className="px-5 py-4 border-b border-[#FEF7ED] mb-2 bg-[#FEF7ED]/50 rounded-t-2xl">
                        <p className="text-[10px] text-[#A89F9B] font-bold tracking-widest uppercase mb-1">Authenticated</p>
                        <p className="text-sm font-black text-[#3B2E2A] truncate">{session.user.name}</p>
                        <p className="text-[11px] text-[#635A56] truncate opacity-70">{session.user.email}</p>
                      </div>
                      
                      <div className="px-2 space-y-1">
                        {navType !== "public" && (
                           <Link
                           href="/"
                           className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-[#635A56] hover:text-[#FF7F32] hover:bg-[#FF7F32]/5 rounded-xl transition-all"
                         >
                           <Menu size={14} />
                           Public Website
                         </Link>
                        )}
                        <Link
                          href={isAdmin ? "/admin" : "/dashboard"}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-[#635A56] hover:text-[#FF7F32] hover:bg-[#FF7F32]/5 rounded-xl transition-all"
                        >
                          {isAdmin ? <Shield size={14} /> : <LayoutDashboard size={14} />}
                          {isAdmin ? "Admin Overview" : "Student Dashboard"}
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all text-left"
                        >
                          <LogOut size={14} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center px-5 py-2.5 text-sm font-bold text-[#3B2E2A] hover:text-[#FF7F32] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="btn-primary px-6 py-2.5 text-sm shadow-lg shadow-orange-100"
                  >
                    Join Us
                  </Link>
                </div>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#EBDBCD] text-[#3B2E2A] shadow-sm"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
        style={{ background: "rgba(59, 46, 42, 0.4)", backdropFilter: "blur(4px)" }}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] md:hidden w-80 bg-[#FEF7ED] border-l-2 border-[#EBDBCD] transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-24">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#EBDBCD] text-[#3B2E2A]"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#FF7F32] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg shadow-orange-200">
              <Image
                src="/shrutivanam.logo.png"
                alt="Shrutivanam logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
            </div>
            <Image
              src="/shrutivanam.txt.png"
              alt="Shrutivanam"
              width={270}
              height={72}
              className="h-12 w-auto object-contain mx-auto"
            />
            <p className="text-[10px] text-[#FF7F32] tracking-[0.2em] uppercase mt-2 font-bold opacity-80">
               {navType === "public" ? "Wisdom Hub" : navType === "admin" ? "Admin Panel" : "Student Hub"}
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {currentLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-[#FF7F32] text-white shadow-lg shadow-orange-100"
                    : "text-[#3B2E2A] hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon && <link.icon size={18} />}
                  <span>{link.label}</span>
                </div>
                {link.labelHi && (
                  <span className={pathname === link.href ? "text-white/70" : "text-[#FF7F32]"}>
                    {link.labelHi}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            {session ? (
              <>
                <div className="p-5 rounded-2xl bg-white border border-[#EBDBCD] shadow-sm">
                  <p className="text-[10px] text-[#A89F9B] tracking-widest uppercase mb-1 font-bold">Profile</p>
                  <p className="text-sm font-black text-[#3B2E2A] truncate">{session.user.name}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full py-4 flex items-center justify-center gap-2 rounded-2xl font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full py-4 flex items-center justify-center text-base shadow-xl shadow-orange-100"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-4 flex items-center justify-center rounded-2xl border-2 border-[#EBDBCD] text-[#3B2E2A] font-bold hover:bg-white transition-all"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
