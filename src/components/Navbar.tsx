"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  Users,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon?: LucideIcon;
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
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[94%] max-w-6xl ${
          scrolled ? "top-2" : "top-4"
        }`}
      >
        <div
          className={`relative w-full h-14 md:h-16 flex items-center justify-between px-4 md:px-8 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-white shadow-md border-slate-200"
              : "bg-white/95 border-slate-200"
          }`}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-bold transition-all duration-300 group-hover:scale-110">
              ॐ
            </div>
            <div className="flex flex-col -gap-1">
               <span className="font-[family-name:var(--font-cinzel)] text-sm md:text-base font-bold tracking-[0.2em] text-slate-900 leading-tight">
                SHRUTIVANAM
              </span>
              {navType !== "public" && (
                <span className="text-[10px] font-bold text-orange-600 tracking-[0.3em] uppercase ml-0.5">
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-widest uppercase transition-colors duration-200 ${
                    active 
                      ? "text-orange-600 bg-orange-50 border border-orange-100" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {Icon && <Icon size={14} className={active ? "text-orange-600" : "text-slate-400"} />}
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
                    className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest transition-colors hover:bg-orange-50 bg-slate-50 text-slate-700 border border-slate-200"
                  >
                    {isAdmin ? <Shield size={12} /> : <LayoutDashboard size={12} />}
                    {isAdmin ? "PANEL" : "DASHBOARD"}
                  </Link>
                )}

                {/* Profile Circle */}
                <div className="relative group cursor-pointer ml-1">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-sm font-bold transition-all duration-200 group-hover:border-slate-300">
                    {userInitial}
                  </div>
                  
                  {/* Tooltip/Mini Menu on Hover */}
                  <div className="absolute top-full right-0 mt-3 w-52 py-2 bg-white border border-slate-200 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50">
                    <div className="px-4 py-3 border-b border-slate-100 mb-1 bg-slate-50 rounded-t-2xl">
                      <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mb-0.5">Welcome Back</p>
                      <p className="text-[13px] text-slate-900 font-bold truncate">{session.user.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{session.user.email}</p>
                    </div>
                    
                    <div className="py-1">
                      {navType !== "public" && (
                         <Link
                         href="/"
                         className="flex items-center gap-3 px-4 py-2 text-[12px] text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                       >
                         <Menu size={14} />
                         Back to Website
                       </Link>
                      )}
                      
                      <Link
                        href={isAdmin ? "/admin" : "/dashboard"}
                        className="flex items-center gap-3 px-4 py-2 text-[12px] text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        {isAdmin ? <Shield size={14} /> : <LayoutDashboard size={14} />}
                        {isAdmin ? "Admin Overview" : "Student Dashboard"}
                      </Link>
                      
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 w-full px-4 py-2 text-[12px] text-red-600 hover:bg-red-50 transition-colors text-left"
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
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-widest text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  SIGN IN
                </Link>
                <Link
                  href="/register"
                  className="px-5 md:px-6 py-2 rounded-full text-[11px] font-bold tracking-widest bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                >
                  GET STARTED
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-slate-700 bg-slate-50 border border-slate-200"
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
        style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)" }}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] md:hidden w-72 bg-white border-l border-slate-200 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-20">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-500"
          >
            <X size={20} />
          </button>

          <div className="mb-10 text-center">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-2xl font-bold mx-auto mb-4">
              ॐ
            </div>
            <p className="font-[family-name:var(--font-cinzel)] text-slate-900 text-lg tracking-widest leading-none">
              SHRUTIVANAM
            </p>
            <p className="text-[10px] text-orange-600 tracking-[0.3em] uppercase mt-2 font-bold">
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
                  className={`flex items-center gap-4 text-sm font-bold tracking-[0.2em] uppercase py-4 px-4 rounded-xl transition-colors duration-200 ${
                    active 
                      ? "text-orange-600 bg-orange-50 border border-orange-100" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
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
               className="flex items-center gap-4 text-sm font-bold tracking-[0.2em] uppercase py-4 px-4 rounded-xl text-slate-400 hover:text-slate-900 mt-4 transition-colors"
             >
               <Menu size={16} />
               Public Website
             </Link>
            )}
          </nav>

          <div className="mt-auto space-y-4">
            {session ? (
              <>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 tracking-widest uppercase mb-1 font-bold">Signed in as</p>
                  <p className="text-sm font-bold text-slate-900 truncate">{session.user.name}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full py-4 rounded-2xl text-center text-[12px] font-bold tracking-widest text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  LOGOUT PROFILE
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="block w-full py-4 rounded-2xl text-center text-[12px] font-bold tracking-widest bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                >
                  GET STARTED
                </Link>
                <Link
                  href="/login"
                  className="block w-full py-4 rounded-2xl text-center text-[12px] font-bold tracking-widest border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
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
