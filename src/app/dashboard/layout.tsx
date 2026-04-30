"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Video, CalendarDays, LogOut, ChevronLeft, Menu, LayoutDashboard } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

const STUDENT_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/videos", label: "Videos", icon: Video },
  { href: "/dashboard/meetings", label: "Sessions", icon: CalendarDays },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    else if (status === "authenticated") {
      if (!session?.user?.isActive) router.push("/pending");
    }
  }, [session, status, router]);


  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 lg:hidden transition-opacity ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-slate-200 transition-all duration-300 fixed left-0 top-0 bottom-0 z-40 flex flex-col w-72 max-w-[85vw] lg:max-w-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${sidebarOpen ? "lg:w-64" : "lg:w-20"}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                <Image
                  src="/shrutivanam.logo.png"
                  alt="Shrutivanam logo"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <Image
                src="/shrutivanam.txt.png"
                alt="Shrutivanam"
                width={150}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {STUDENT_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-orange-100 text-orange-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-200 space-y-2">
          {sidebarOpen && (
            <div className="px-2 py-1">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Student</p>
              <p className="text-sm font-semibold text-slate-900 truncate">{session.user.name}</p>
            </div>
          )}
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
          <div className="px-4 sm:px-6 py-4 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              aria-label="Toggle sidebar"
            >
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>
                Student Dashboard
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Your Personal Learning Sanctuary</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
