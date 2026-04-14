"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Clock, LogOut, RefreshCw } from "lucide-react";

export default function PendingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  // Auto-redirect if somehow activated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (session?.user?.isActive) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  const handleCheckStatus = async () => {
    setChecking(true);
    await update(); // Refresh session from server
    setChecking(false);
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0d0b1e]">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
      </main>
    );
  }

  const statusColor =
    session?.user?.paymentStatus === "rejected"
      ? "rgba(239,68,68,0.15)"
      : "rgba(201,168,76,0.08)";
  const statusBorder =
    session?.user?.paymentStatus === "rejected"
      ? "rgba(239,68,68,0.3)"
      : "rgba(201,168,76,0.2)";

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%), linear-gradient(180deg, #1A1040 0%, #0d0b1e 100%)",
      }}
    >
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{
            background: statusColor,
            border: `2px solid ${statusBorder}`,
          }}
        >
          {session?.user?.paymentStatus === "rejected" ? (
            <span className="text-4xl">❌</span>
          ) : (
            <Clock size={40} className="text-[#C9A84C]" />
          )}
        </div>

        <h1
          className="text-3xl font-bold text-[#F5F0E8] mb-3"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {session?.user?.paymentStatus === "rejected"
            ? "Payment Rejected"
            : "Verification Pending"}
        </h1>

        <p
          className="text-[#C9A84C] italic text-lg mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {session?.user?.paymentStatus === "rejected"
            ? "Please contact us for assistance"
            : "Your account is under review"}
        </p>

        <div
          className="rounded-2xl p-6 mb-6 text-left"
          style={{
            background: "rgba(26,16,64,0.7)",
            border: "1px solid rgba(201,168,76,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#C8BFAD]/50">Name</span>
              <span className="text-[#F5F0E8]">{session?.user?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#C8BFAD]/50">Email</span>
              <span className="text-[#F5F0E8]">{session?.user?.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#C8BFAD]/50">Payment Status</span>
              <span
                className={`font-semibold capitalize ${
                  session?.user?.paymentStatus === "rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {session?.user?.paymentStatus ?? "Pending"}
              </span>
            </div>
          </div>
        </div>

        {session?.user?.paymentStatus === "rejected" ? (
          <p className="text-[#C8BFAD]/60 text-sm mb-6">
            Your payment could not be verified. Please contact us on WhatsApp for
            assistance.
          </p>
        ) : (
          <p className="text-[#C8BFAD]/60 text-sm mb-6">
            Our team will verify your payment and activate your account within{" "}
            <strong className="text-[#C9A84C]">24 hours</strong>. You will
            receive an email once approved.
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleCheckStatus}
            disabled={checking}
            id="check-status-btn"
            className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #E2C97E 100%)",
              color: "#0d0b1e",
              opacity: checking ? 0.6 : 1,
            }}
          >
            <RefreshCw size={16} className={checking ? "animate-spin" : ""} />
            {checking ? "Checking…" : "Check Activation Status"}
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            id="pending-signout-btn"
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm text-[#C8BFAD]/60 hover:text-[#C8BFAD] transition-colors"
            style={{
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
