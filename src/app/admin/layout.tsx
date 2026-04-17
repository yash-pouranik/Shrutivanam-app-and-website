"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session?.user?.role?.toLowerCase() !== "admin") {
      router.push("/dashboard");
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100">
      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-8">
            <div>
              <h1
                className="text-3xl font-bold tracking-tight text-slate-900"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Admin Management
              </h1>
              <p className="text-slate-500 text-sm mt-1 tracking-wider uppercase font-semibold">
                Control Center &amp; Organization
              </p>
            </div>
            <div className="flex items-center gap-3 text-right">
              <div className="hidden sm:block">
                <p className="text-slate-900 font-bold text-sm tracking-wide">{session.user.name}</p>
                <p className="text-orange-600 text-[10px] uppercase font-bold tracking-widest">
                  Master Administrator
                </p>
              </div>
            </div>
          </div>

          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
