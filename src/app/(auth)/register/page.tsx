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

    // Move to payment step
    setStep(2);
  };

  const inputStyle = {
    background: "rgba(13, 11, 30, 0.6)",
    border: "1px solid rgba(201, 168, 76, 0.2)",
  };

  const cardStyle = {
    background: "rgba(26, 16, 64, 0.7)",
    border: "1px solid rgba(201, 168, 76, 0.2)",
    backdropFilter: "blur(12px)",
  };

  return (
    <div
      className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-20"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%), linear-gradient(180deg, #1A1040 0%, #0d0b1e 100%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
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
            Begin Your Journey
          </h1>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background:
                    step >= s
                      ? "linear-gradient(135deg, #C9A84C, #E2C97E)"
                      : "rgba(201,168,76,0.1)",
                  color: step >= s ? "#0d0b1e" : "#C9A84C",
                  border: step >= s
                    ? "none"
                    : "1px solid rgba(201,168,76,0.3)",
                }}
              >
                {step > s ? <CheckCircle size={14} /> : s}
              </div>
              {s < 3 && (
                <div
                  className="w-10 h-px transition-all duration-300"
                  style={{
                    background:
                      step > s
                        ? "linear-gradient(90deg, #C9A84C, #E2C97E)"
                        : "rgba(201,168,76,0.2)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Registration Form ── */}
        {step === 1 && (
          <div className="rounded-2xl p-8" style={cardStyle}>
            <h2
              className="text-lg font-semibold text-[#F5F0E8] mb-1"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Create Account
            </h2>
            <p className="text-[#C8BFAD]/50 text-sm mb-6">
              Step 1 of 3 — Your details
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="reg-name"
                  className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none"
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="reg-email"
                  className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
                >
                  Email *
                </label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none"
                  style={inputStyle}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="reg-password"
                  className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
                >
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="reg-password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none pr-12"
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C8BFAD]/40 hover:text-[#C9A84C] transition-colors"
                    aria-label="Toggle password"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="reg-confirm"
                  className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
                >
                  Confirm Password *
                </label>
                <input
                  id="reg-confirm"
                  name="confirmPassword"
                  type={showPass ? "text" : "password"}
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none"
                  style={inputStyle}
                />
              </div>

              {error && (
                <div
                  className="rounded-xl px-4 py-3 text-sm text-red-300"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                id="register-submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide mt-2"
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
                  <UserPlus size={16} />
                )}
                {loading ? "Creating account…" : "Create Account & Continue"}
              </button>
            </form>

            <p className="text-center text-[#C8BFAD]/50 text-xs mt-5">
              Already registered?{" "}
              <Link
                href="/login"
                className="text-[#C9A84C] hover:text-[#E2C97E] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}

        {/* ── STEP 2: Payment ── */}
        {step === 2 && (
          <div className="rounded-2xl p-8 text-center" style={cardStyle}>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(31,21,88,0.5))",
                border: "1px solid rgba(201,168,76,0.4)",
              }}
            >
              <QrCode size={24} className="text-[#C9A84C]" />
            </div>

            <h2
              className="text-xl font-bold text-[#F5F0E8] mb-1"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Complete Payment
            </h2>
            <p className="text-[#C8BFAD]/50 text-sm mb-6">
              Step 2 of 3 — Scan & Pay
            </p>

            {/* QR Placeholder — replace with real QR image */}
            <div
              className="w-48 h-48 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "2px dashed rgba(201,168,76,0.4)",
              }}
            >
              {/* Replace src with your actual QR code image in /public/qr-code.png */}
              <div className="text-[#C8BFAD]/40 text-xs text-center px-4">
                <QrCode size={48} className="mx-auto mb-2 text-[#C9A84C]/50" />
                Place your UPI QR code here
                <br />
                <span className="text-[10px]">(/public/qr-code.png)</span>
              </div>
            </div>

            <div
              className="rounded-xl p-4 mb-6 text-left"
              style={{
                background: "rgba(201,168,76,0.07)",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-2">
                UPI Details
              </p>
              <p className="text-[#F5F0E8] text-sm font-mono">
                {process.env.NEXT_PUBLIC_UPI_ID ?? "shrutivanam@upi"}
              </p>
              <p className="text-[#C8BFAD]/50 text-xs mt-1">
                Pay using any UPI app — Google Pay, PhonePe, Paytm, etc.
              </p>
            </div>

            <p className="text-[#C8BFAD]/60 text-xs leading-relaxed mb-6">
              After payment, our team will verify and activate your account
              within <strong className="text-[#C9A84C]">24 hours</strong>.
              You will receive a confirmation email.
            </p>

            <button
              onClick={() => setStep(3)}
              id="payment-done-btn"
              className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide"
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #E2C97E 100%)",
                color: "#0d0b1e",
              }}
            >
              I&apos;ve Made the Payment →
            </button>
          </div>
        )}

        {/* ── STEP 3: Confirmation ── */}
        {step === 3 && (
          <div className="rounded-2xl p-10 text-center" style={cardStyle}>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(31,21,88,0.5))",
                border: "1px solid rgba(201,168,76,0.4)",
              }}
            >
              <span className="text-4xl">🙏</span>
            </div>

            <h2
              className="text-2xl font-bold text-[#F5F0E8] mb-2"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Namaste, {form.name}!
            </h2>
            <p
              className="text-[#C9A84C] italic mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Your journey begins here.
            </p>
            <p className="text-[#C8BFAD]/70 text-sm leading-relaxed mb-8">
              Your registration is complete. We&apos;ve sent a confirmation to{" "}
              <strong className="text-[#C9A84C]">{form.email}</strong>.
              <br />
              <br />
              Our team will verify your payment and activate your account within
              24 hours.
            </p>

            <button
              onClick={() => router.push("/pending")}
              id="goto-pending-btn"
              className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide"
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #E2C97E 100%)",
                color: "#0d0b1e",
              }}
            >
              Check Registration Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
