"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Clock, LogOut, RefreshCw } from "lucide-react";

export default function PendingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (session?.user?.isActive) router.push("/dashboard");
  }, [session, status, router]);

  const handleCheckStatus = async () => {
    setChecking(true);
    await update();
    setChecking(false);
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </main>
    );
  }

  const isRejected = session?.user?.paymentStatus === "rejected";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${
            isRejected ? "bg-red-50 border-2 border-red-200" : "bg-orange-50 border-2 border-orange-200"
          }`}
        >
          {isRejected ? (
            <span className="text-4xl">❌</span>
          ) : (
            <Clock size={40} className="text-orange-600" />
          )}
        </div>

        <h1
          className="text-2xl font-bold text-slate-900 mb-3"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {isRejected ? "Payment Rejected" : "Verification Pending"}
        </h1>

        <p
          className="text-orange-600 italic text-lg mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {isRejected ? "Please contact us for assistance" : "Your account is under review"}
        </p>

        {/* Info Card */}
        <div className="rounded-2xl p-6 mb-6 text-left bg-white border border-slate-200 shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Name</span>
              <span className="text-slate-900 font-semibold">{session?.user?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Email</span>
              <span className="text-slate-900 font-semibold">{session?.user?.email}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Payment Status</span>
              <span
                className={`font-bold capitalize ${
                  isRejected ? "text-red-600" : "text-amber-600"
                }`}
              >
                {session?.user?.paymentStatus ?? "Pending"}
              </span>
            </div>
          </div>
        </div>

        {isRejected ? (
          <p className="text-slate-500 text-sm mb-6">
            Your payment could not be verified. Please contact us on WhatsApp for assistance.
          </p>
        ) : (
          <p className="text-slate-500 text-sm mb-6">
            Our team will verify your payment and activate your account within{" "}
            <strong className="text-orange-600">24 hours</strong>. You will receive an email once approved.
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleCheckStatus}
            disabled={checking}
            id="check-status-btn"
            className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} className={checking ? "animate-spin" : ""} />
            {checking ? "Checking…" : "Check Activation Status"}
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            id="pending-signout-btn"
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors border border-slate-200 hover:bg-slate-50"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
