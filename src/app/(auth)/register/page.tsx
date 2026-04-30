"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, Loader2, CheckCircle, QrCode, GraduationCap } from "lucide-react";
import Image from "next/image";

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (session.user.isActive) {
        router.push("/dashboard");
      } else if (session.user.hasPaid) {
        router.push("/pending");
      } else {
        setStep(2);
      }
    }
  }, [session, status, router]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registeredUserId, setRegisteredUserId] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

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

    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setRegisteredUserId(data.userId ?? null);
    setStep(2);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none bg-slate-50 border border-slate-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-colors";

  const handlePaymentConfirm = async () => {
    setPaymentError("");
    if (!transactionId.trim()) {
      setPaymentError("Please enter your transaction ID / UTR.");
      return;
    }
    
    const userIdToUse = registeredUserId || session?.user?.id;
    if (!userIdToUse) {
      setPaymentError("Registration details missing. Please reload and try again.");
      return;
    }

    setPaymentLoading(true);
    const res = await fetch("/api/users/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userIdToUse,
        transactionId: transactionId.trim(),
      }),
    });
    const data = await res.json();
    setPaymentLoading(false);

    if (!res.ok) {
      setPaymentError(data.error ?? "Unable to save transaction ID.");
      return;
    }

    await update({ hasPaid: true });
    setStep(3);
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
              <Image
                src="/shrutivanam.txt.png"
                alt="Shrutivanam"
                width={150}
                height={40}
                className="h-8 w-auto object-contain mb-1"
              />
              <p className="text-xs text-slate-500">Ancient Wisdom, Modern Learning</p>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            A calm, focused space for lifelong learning.
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed mb-8">
            Join a community devoted to spiritual education, guided practice, and timeless knowledge.
            Your journey starts with a simple registration.
          </p>
          <div className="relative max-w-sm">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Structured Courses</p>
                  <p className="text-xs text-slate-500">Guided steps, clear progress.</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-2/3 bg-orange-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="h-20 bg-orange-600 rounded-b-[2.5rem]" />
            <div className="absolute left-1/2 -translate-x-1/2 top-9 w-16 h-16 rounded-full bg-white border border-orange-100 shadow flex items-center justify-center text-orange-600">
              <GraduationCap size={28} />
            </div>
            <div className="pt-14 px-6 pb-6">
              <div className="text-center mb-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">Register</p>
                <h1 className="text-lg font-semibold text-slate-900">Begin Your Journey</h1>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
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

              {step === 1 && (
                <div>
                  <h2
                    className="text-base font-semibold text-slate-900 mb-1"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    Create Account
                  </h2>
                  <p className="text-slate-500 text-xs mb-5">Step 1 of 3 — Your details</p>

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
                      className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide mt-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
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

              {step === 2 && (
                <div>
                  <h2 className="text-base font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
                    Complete Payment
                  </h2>
                  <p className="text-slate-500 text-xs mb-5">Step 2 of 3 — Scan &amp; Pay</p>

                  <div className="w-48 h-48 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-white border border-slate-200 shadow-sm overflow-hidden p-2">
                    <div className="relative w-full h-full">
                      <Image
                        src="/qr-code.png"
                        alt="UPI QR Code"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl p-4 mb-4 text-left bg-orange-50 border border-orange-100">
                    <p className="text-orange-700 text-xs font-semibold uppercase tracking-widest mb-2">UPI Details</p>
                    <p className="text-slate-900 text-sm font-mono">
                      {process.env.NEXT_PUBLIC_UPI_ID ?? "shrutivanam@upi"}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      Pay using any UPI app — Google Pay, PhonePe, Paytm, etc.
                    </p>
                  </div>

                  <div className="mb-4 text-left">
                    <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">
                      Transaction ID / UTR *
                    </label>
                    <input
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. 1234567890"
                      className={inputClass}
                    />
                    <p className="text-[11px] text-slate-400 mt-2">
                      Enter the reference shown in your UPI app after payment.
                    </p>
                  </div>

                  {paymentError && (
                    <div className="rounded-xl px-4 py-3 text-sm text-red-700 bg-red-50 border border-red-200 mb-4">
                      {paymentError}
                    </div>
                  )}

                  <button
                    onClick={handlePaymentConfirm}
                    id="payment-done-btn"
                    disabled={paymentLoading}
                    className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white transition-colors"
                  >
                    {paymentLoading ? "Saving…" : "I've Made the Payment →"}
                  </button>
                </div>
              )}

              {/* ── STEP 3: Confirmation ── */}
              {step === 3 && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-orange-100">
                    <span className="text-3xl">🙏</span>
                  </div>

                  <h2 className="text-lg font-semibold text-slate-900 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                    Namaste, {form.name}!
                  </h2>
                  <p className="text-orange-600 italic mb-4 text-sm" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Your journey begins here.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Your registration is complete. We&apos;ve sent a confirmation to{" "}
                    <strong className="text-orange-700">{form.email}</strong>.
                    <br />
                    <br />
                    Our team will verify your payment and activate your account within 24 hours.
                  </p>

                  <button
                    onClick={() => router.push("/pending")}
                    id="goto-pending-btn"
                    className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                  >
                    Check Registration Status
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
