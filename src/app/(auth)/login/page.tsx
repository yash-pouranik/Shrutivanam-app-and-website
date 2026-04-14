"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    // Fetch updated session to check role & status
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    if (session?.user?.role?.toLowerCase() === "admin") {
      router.push("/admin");
    } else if (session?.user?.isActive) {
      router.push("/dashboard");
    } else {
      router.push("/pending");
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%), linear-gradient(180deg, #1A1040 0%, #0d0b1e 100%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <p
            className="text-[#C9A84C] text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Shrutivanam
          </p>
          <h1
            className="text-3xl font-bold text-[#F5F0E8]"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Welcome Back
          </h1>
          <p
            className="text-[#C8BFAD]/60 mt-2 italic"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            &ldquo;ज्ञानं परमं बलम्&rdquo; — Knowledge is supreme strength
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(26, 16, 64, 0.7)",
            border: "1px solid rgba(201, 168, 76, 0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none"
                style={{
                  background: "rgba(13, 11, 30, 0.6)",
                  border: "1px solid rgba(201, 168, 76, 0.2)",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none pr-12"
                  style={{
                    background: "rgba(13, 11, 30, 0.6)",
                    border: "1px solid rgba(201, 168, 76, 0.2)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C8BFAD]/40 hover:text-[#C9A84C] transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-xl px-4 py-3 text-sm text-red-300"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide transition-all duration-200"
              style={{
                background: loading
                  ? "rgba(201,168,76,0.4)"
                  : "linear-gradient(135deg, #C9A84C 0%, #E2C97E 100%)",
                color: "#0d0b1e",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-[#C8BFAD]/50 text-xs mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#C9A84C] hover:text-[#E2C97E] transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
