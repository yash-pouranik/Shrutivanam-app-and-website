"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    else if (status === "authenticated") {
      if (!session?.user?.isActive) router.push("/pending");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0b1e]">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0b1e] text-[#F5F0E8] selection:bg-[#C9A84C]/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1F1558]/30 blur-[120px] rounded-full" />
         <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#C9A84C]/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-8">
            <div>
               <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#F5F0E8] to-[#C8BFAD] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-cinzel)" }}>
                Student Dashboard
               </h1>
               <p className="text-[#C8BFAD]/60 text-sm mt-1 tracking-wider uppercase font-medium">Your Personal Learning Sanctuary</p>
            </div>
            <div className="flex items-center gap-3 text-right">
               <div className="hidden sm:block">
                  <p className="text-[#F5F0E8] font-bold text-sm tracking-wide">{session.user.name}</p>
                  <p className="text-[#C9A84C]/60 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)]">Enrolled Student</p>
               </div>
            </div>
          </div>

          <main className="w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
