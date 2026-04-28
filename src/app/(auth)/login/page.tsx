"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, Loader2, GraduationCap } from "lucide-react";
import Image from "next/image";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Image
                src="/shrutivanam.logo.png"
                alt="Shrutivanam logo"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Shrutivanam</p>
              <p className="text-xs text-slate-500">Ancient Wisdom, Modern Learning</p>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Welcome back to your learning sanctuary.
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed mb-8">
            Continue your path with guided lessons, live sessions, and mindful study designed for steady progress.
          </p>
          <div className="relative max-w-sm">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Personal Dashboard</p>
                  <p className="text-xs text-slate-500">Track videos &amp; sessions.</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-3/4 bg-orange-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="h-20 bg-orange-600 rounded-b-[2.5rem]" />
            <div className="absolute left-1/2 -translate-x-1/2 top-9 w-16 h-16 rounded-full bg-white border border-orange-100 shadow flex items-center justify-center text-orange-600">
              <LogIn size={26} />
            </div>
            <div className="pt-14 px-6 pb-6">
              <div className="text-center mb-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">Sign In</p>
                <h1 className="text-lg font-semibold text-slate-900">Welcome Back</h1>
                <p className="text-xs text-slate-500 mt-1">
                  &ldquo;ज्ञानं परमं बलम्&rdquo; — Knowledge is supreme strength
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-xs font-semibold tracking-wide text-slate-600 uppercase mb-2"
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
                    className="w-full px-4 py-3 rounded-lg text-sm text-slate-900 placeholder-slate-400 outline-none bg-slate-50 border border-slate-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-semibold tracking-wide text-slate-600 uppercase mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPass ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg text-sm text-slate-900 placeholder-slate-400 outline-none bg-slate-50 border border-slate-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-colors pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-600 transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg px-4 py-3 text-sm font-semibold text-red-700 bg-red-50 border border-red-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  id="login-submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide transition-all bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white cursor-pointer disabled:cursor-not-allowed shadow-md active:scale-95"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
                  {loading ? "Signing in…" : "Sign In"}
                </button>
              </form>

              <p className="text-center text-slate-600 text-xs font-medium mt-5">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
