"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, Loader2, CheckCircle, QrCode } from "lucide-react";

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Registration failed. Please try again.");
      return;
    }

    setStep(2);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none bg-slate-50 border border-slate-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-colors";

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-20 bg-slate-50">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <p
            className="text-orange-600 text-xs tracking-widest uppercase mb-3 font-bold"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Shrutivanam
          </p>
          <h1
            className="text-3xl font-bold text-slate-900"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Begin Your Journey
          </h1>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step >= s
                    ? "bg-orange-600 text-white shadow-sm"
                    : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                {step > s ? <CheckCircle size={14} /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-10 h-px transition-all duration-300 ${
                    step > s ? "bg-orange-400" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Registration Form ── */}
        {step === 1 && (
          <div className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
            <h2
              className="text-lg font-semibold text-slate-900 mb-1"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Create Account
            </h2>
            <p className="text-slate-500 text-sm mb-6">Step 1 of 3 — Your details</p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="reg-name" className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">
                  Full Name *
                </label>
                <input id="reg-name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
              </div>
              <div>
                <label htmlFor="reg-email" className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">
                  Email *
                </label>
                <input id="reg-email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
              </div>
              <div>
                <label htmlFor="reg-password" className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input id="reg-password" name="password" type={showPass ? "text" : "password"} required value={form.password} onChange={handleChange} placeholder="Min 6 characters" className={`${inputClass} pr-12`} />
                  <button type="button" onClick={() => setShowPass((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-600 transition-colors" aria-label="Toggle password">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="reg-confirm" className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">
                  Confirm Password *
                </label>
                <input id="reg-confirm" name="confirmPassword" type={showPass ? "text" : "password"} required value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" className={inputClass} />
              </div>

              {error && (
                <div className="rounded-xl px-4 py-3 text-sm text-red-700 bg-red-50 border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                id="register-submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide mt-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
                {loading ? "Creating account…" : "Create Account & Continue"}
              </button>
            </form>

            <p className="text-center text-slate-500 text-xs mt-5">
              Already registered?{" "}
              <Link href="/login" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        )}

        {/* ── STEP 2: Payment ── */}
        {step === 2 && (
          <div className="rounded-2xl p-8 text-center bg-white border border-slate-200 shadow-sm">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-orange-100 text-orange-600">
              <QrCode size={24} />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
              Complete Payment
            </h2>
            <p className="text-slate-500 text-sm mb-6">Step 2 of 3 — Scan &amp; Pay</p>

            {/* QR Placeholder */}
            <div className="w-48 h-48 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300">
              <div className="text-slate-400 text-xs text-center px-4">
                <QrCode size={48} className="mx-auto mb-2 text-slate-300" />
                Place your UPI QR code here
                <br />
                <span className="text-[10px]">(/public/qr-code.png)</span>
              </div>
            </div>

            <div className="rounded-xl p-4 mb-6 text-left bg-orange-50 border border-orange-100">
              <p className="text-orange-700 text-xs font-semibold uppercase tracking-widest mb-2">UPI Details</p>
              <p className="text-slate-900 text-sm font-mono">
                {process.env.NEXT_PUBLIC_UPI_ID ?? "shrutivanam@upi"}
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Pay using any UPI app — Google Pay, PhonePe, Paytm, etc.
              </p>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              After payment, our team will verify and activate your account within{" "}
              <strong className="text-orange-600">24 hours</strong>. You will receive a confirmation email.
            </p>

            <button
              onClick={() => setStep(3)}
              id="payment-done-btn"
              className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide bg-orange-600 hover:bg-orange-700 text-white transition-colors"
            >
              I&apos;ve Made the Payment →
            </button>
          </div>
        )}

        {/* ── STEP 3: Confirmation ── */}
        {step === 3 && (
          <div className="rounded-2xl p-10 text-center bg-white border border-slate-200 shadow-sm">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-orange-100">
              <span className="text-4xl">🙏</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
              Namaste, {form.name}!
            </h2>
            <p className="text-orange-600 italic mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
              Your journey begins here.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Your registration is complete. We&apos;ve sent a confirmation to{" "}
              <strong className="text-orange-700">{form.email}</strong>.
              <br />
              <br />
              Our team will verify your payment and activate your account within 24 hours.
            </p>

            <button
              onClick={() => router.push("/pending")}
              id="goto-pending-btn"
              className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide bg-orange-600 hover:bg-orange-700 text-white transition-colors"
            >
              Check Registration Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
