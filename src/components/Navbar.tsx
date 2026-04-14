"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LayoutDashboard, Shield, LogOut, Users, Video, CalendarDays } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon?: any;
}

// Link Configurations
const PUBLIC_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact" },
];

const ADMIN_LINKS: NavLink[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
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

  // Auth helper
  const isAdmin = session?.user?.role?.toLowerCase() === "admin";

  // Determine current link set
  let currentLinks: NavLink[] = PUBLIC_LINKS;
  let navType: "public" | "admin" | "student" = "public";

  if (pathname.startsWith("/admin")) {
    currentLinks = ADMIN_LINKS;
    navType = "admin";
  } else if (pathname.startsWith("/dashboard")) {
    currentLinks = STUDENT_LINKS;
    navType = "student";
  }

  // Sync menu state on path change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U";

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[94%] max-w-6xl ${
          scrolled ? "top-2" : "top-4"
        }`}
      >
        <div
          className={`relative w-full h-14 md:h-16 flex items-center justify-between px-4 md:px-8 rounded-full border transition-all duration-500 shadow-2xl ${
            scrolled
              ? "bg-[#0d0b1e]/85 backdrop-blur-xl border-[rgba(201,168,76,0.35)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-[#0d0b1e]/40 backdrop-blur-md border-[rgba(201,168,76,0.15)]"
          }`}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E2C97E] flex items-center justify-center text-[#0d0b1e] text-sm font-bold shadow-[0_0_15px_rgba(201,168,76,0.3)] transition-all duration-300 group-hover:scale-110">
              ॐ
            </div>
            <div className="flex flex-col -gap-1">
               <span className="font-[family-name:var(--font-cinzel)] text-sm md:text-base font-bold tracking-[0.2em] text-[#E2C97E] leading-tight">
                SHRUTIVANAM
              </span>
              {navType !== "public" && (
                <span className="text-[10px] font-bold text-[#C9A84C]/60 tracking-[0.3em] uppercase ml-0.5">
                  {navType === "admin" ? "Admin Panel" : "Student Hub"}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Nav - Centered Dynamic Links */}
          <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 gap-2 lg:gap-4">
            {currentLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-widest uppercase transition-all duration-300 relative group overflow-hidden ${
                    active 
                      ? "text-[#E2C97E] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)]" 
                      : "text-[#C8BFAD] hover:text-[#E2C97E] hover:bg-white/5"
                  }`}
                >
                  {Icon && <Icon size={14} className={active ? "text-[#E2C97E]" : "text-[#C8BFAD]/60"} />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Auth / Avatar */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-2">
                {/* Visual Indicator of Role (Desktop) */}
                {navType === "public" && (
                  <Link
                    href={isAdmin ? "/admin" : "/dashboard"}
                    className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest transition-all hover:bg-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.1)] text-[#E2C97E] border border-[rgba(201,168,76,0.3)]"
                  >
                    {isAdmin ? <Shield size={12} /> : <LayoutDashboard size={12} />}
                    {isAdmin ? "PANEL" : "DASHBOARD"}
                  </Link>
                )}

                {/* Profile Circle */}
                <div className="relative group cursor-pointer ml-1">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-[#1F1558] to-[#0d0b1e] border border-[rgba(201,168,76,0.4)] flex items-center justify-center text-[#E2C97E] text-sm font-bold shadow-lg overflow-hidden group-hover:border-[#E2C97E] transition-all duration-300">
                    {userInitial}
                  </div>
                  
                  {/* Tooltip/Mini Menu on Hover */}
                  <div className="absolute top-full right-0 mt-3 w-52 py-2 bg-[#0d0b1e]/95 backdrop-blur-xl border border-[rgba(201,168,76,0.2)] rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl z-50">
                    <div className="px-4 py-3 border-b border-white/5 mb-1 bg-white/5 rounded-t-2xl">
                      <p className="text-[10px] text-[#C9A84C] font-bold tracking-[0.2em] uppercase mb-0.5">Welcome Back</p>
                      <p className="text-[13px] text-[#F5F0E8] font-bold truncate">{session.user.name}</p>
                      <p className="text-[10px] text-[#C8BFAD]/40 truncate">{session.user.email}</p>
                    </div>
                    
                    <div className="py-1">
                      {navType !== "public" && (
                         <Link
                         href="/"
                         className="flex items-center gap-3 px-4 py-2 text-[12px] text-[#C8BFAD] hover:text-[#E2C97E] hover:bg-white/5 transition-all"
                       >
                         <Menu size={14} />
                         Back to Website
                       </Link>
                      )}
                      
                      <Link
                        href={isAdmin ? "/admin" : "/dashboard"}
                        className="flex items-center gap-3 px-4 py-2 text-[12px] text-[#C8BFAD] hover:text-[#E2C97E] hover:bg-white/5 transition-all"
                      >
                        {isAdmin ? <Shield size={14} /> : <LayoutDashboard size={14} />}
                        {isAdmin ? "Admin Overview" : "Student Dashboard"}
                      </Link>
                      
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 w-full px-4 py-2 text-[12px] text-red-400 hover:bg-red-400/10 transition-all text-left"
                      >
                        <LogOut size={14} />
                        Logout Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 md:gap-2">
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-widest text-[#E2C97E] hover:bg-[rgba(201,168,76,0.1)] transition-all"
                >
                  SIGN IN
                </Link>
                <Link
                  href="/register"
                  className="px-5 md:px-6 py-2 rounded-full text-[11px] font-bold tracking-widest bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] text-[#0d0b1e] hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all"
                >
                  GET STARTED
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-[#E2C97E] bg-white/5 border border-white/10"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
        style={{ background: "rgba(13, 11, 30, 0.9)", backdropFilter: "blur(6px)" }}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] md:hidden w-72 transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "linear-gradient(180deg, #1A1040 0%, #0D0B1E 100%)",
          borderLeft: "1px solid rgba(201, 168, 76, 0.2)",
        }}
      >
        <div className="flex flex-col h-full p-8 pt-20">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(201,168,76,0.2)] text-[#E2C97E]"
          >
            <X size={20} />
          </button>

          <div className="mb-10 text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E2C97E] flex items-center justify-center text-[#0d0b1e] text-2xl font-bold mx-auto mb-4 shadow-[0_0_20px_rgba(201,168,76,0.3)]">
              ॐ
            </div>
            <p className="font-[family-name:var(--font-cinzel)] text-[#E2C97E] text-lg tracking-widest leading-none">
              SHRUTIVANAM
            </p>
            <p className="text-[10px] text-[#C9A84C]/60 tracking-[0.3em] uppercase mt-2">
               {navType === "public" ? "Wisdom Hub" : navType === "admin" ? "Admin Panel" : "Student Hub"}
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            {currentLinks.map((link) => {
               const Icon = link.icon;
               const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

               return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-4 text-sm font-bold tracking-[0.2em] uppercase py-4 px-4 rounded-xl transition-all duration-300 ${
                    active 
                      ? "text-[#E2C97E] bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.2)]" 
                      : "text-[#C8BFAD] hover:bg-white/5"
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  {link.label}
                </Link>
               );
            })}
            
            {navType !== "public" && (
               <Link
               href="/"
               className="flex items-center gap-4 text-sm font-bold tracking-[0.2em] uppercase py-4 px-4 rounded-xl text-[#C8BFAD]/40 hover:text-[#E2C97E] mt-4"
             >
               <Menu size={16} />
               Public Website
             </Link>
            )}
          </nav>

          <div className="mt-auto space-y-4">
            {session ? (
              <>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] text-[#C9A84C]/60 tracking-widest uppercase mb-1">Signed in as</p>
                  <p className="text-sm font-bold text-[#F5F0E8] truncate">{session.user.name}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full py-4 rounded-2xl text-center text-[12px] font-bold tracking-widest text-red-400 bg-red-400/5 border border-red-400/20"
                >
                  LOGOUT PROFILE
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="block w-full py-4 rounded-2xl text-center text-[12px] font-bold tracking-widest bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] text-[#0d0b1e]"
                >
                  GET STARTED
                </Link>
                <Link
                  href="/login"
                  className="block w-full py-4 rounded-2xl text-center text-[12px] font-bold tracking-widest border border-[rgba(201,168,76,0.3)] text-[#E2C97E]"
                >
                  LOGIN
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
