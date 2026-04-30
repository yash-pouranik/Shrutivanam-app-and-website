"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Send, ChevronRight } from "lucide-react";

const courseOptions = [
  "Vedic Mathematics",
  "Yoga",
  "Sanskrit",
  "Indian Philosophy",
  "General Inquiry",
];

export default function ContactPageClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Unable to send message. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", course: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Unable to send message. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-5 py-4 rounded-2xl text-base text-[#3B2E2A] placeholder-[#A89F9B] outline-none bg-[#FEF7ED]/50 border border-[#EBDBCD] focus:border-[#FF7F32]/50 focus:ring-4 focus:ring-[#FF7F32]/10 transition-all font-medium";

  const labelClass =
    "block text-xs font-black tracking-widest text-[#635A56] uppercase mb-3 opacity-70";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FEF7ED]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,127,50,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[#FF7F32] text-xs sm:text-sm font-black tracking-widest uppercase mb-4 sm:mb-6">
            संपर्क करें · Contact Us
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-[#3B2E2A] mb-6 sm:mb-8 leading-tight">
            Begin Your <span className="text-[#FF7F32]">Conversation</span>
          </h1>
          <p className="text-[#635A56] text-base sm:text-xl font-medium max-w-xl mx-auto leading-relaxed opacity-90">
            Have a question about our courses or want to find the right path? We
            are here. Reach out — we respond warmly and promptly.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
            {/* Left Sidebar for Contact Cards */}
            <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
              {/* WhatsApp CTA */}
              <div className="w-full max-w-full rounded-[2.5rem] p-6 sm:p-8 bg-white border border-[#EBDBCD] shadow-sm text-center min-w-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-[#7BBD8B]/10 border border-[#7BBD8B]/20 text-[#7BBD8B]">
                  <MessageCircle size={28} />
                </div>
                <h2 className="font-black text-[#3B2E2A] text-lg sm:text-xl mb-3">
                  Chat on WhatsApp
                </h2>
                <p className="text-[#635A56] text-sm mb-8 leading-relaxed font-medium break-words">
                  The fastest way to reach us. Our team is available Mon–Sat,
                  9am–7pm IST.
                </p>
                <a
                  href="https://wa.me/9039457108?text=Namaste%2C%20I%20am%20interested%20in%20Shrutivanam%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp-direct"
                  className="w-full py-4 rounded-full flex items-center justify-center gap-3 text-sm font-black tracking-wide bg-[#7BBD8B] hover:bg-[#68a679] text-white transition-all shadow-lg shadow-green-100"
                >
                  <MessageCircle size={18} />
                  Open WhatsApp
                </a>
              </div>

              {/* Contact info */}
              <div className="w-full max-w-full rounded-[2.5rem] p-6 sm:p-8 space-y-6 bg-white border border-[#EBDBCD] shadow-sm min-w-0">
                <h3 className="text-[#3B2E2A] text-xs font-black uppercase tracking-widest opacity-60">
                  Other Contact
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7F32]/10 flex items-center justify-center text-[#FF7F32] shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[#A89F9B] text-[10px] font-black uppercase tracking-widest mb-1">Email</p>
                    <p className="text-[#3B2E2A] text-sm font-bold break-all">shrutivanam108@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7F32]/10 flex items-center justify-center text-[#FF7F32] shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[#A89F9B] text-[10px] font-black uppercase tracking-widest mb-1">Location</p>
                    <p className="text-[#3B2E2A] text-sm font-bold break-words">India (Online Classes)</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="w-full max-w-full rounded-[2.5rem] p-6 sm:p-8 text-center bg-[#FEF7ED] border border-[#EBDBCD] min-w-0">
                <p className="text-xl sm:text-2xl font-black text-[#FF7F32] mb-2 italic">
                  &ldquo;गुरुर्ब्रह्मा गुरुर्विष्णुः&rdquo;
                </p>
                <p className="text-[#635A56] text-xs font-black uppercase tracking-widest opacity-60 break-words">
                  The Guru is Brahma, Vishnu, and Shiva
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 w-full max-w-full min-w-0">
              {submitted ? (
                <div className="rounded-[3rem] p-10 sm:p-16 text-center h-full flex flex-col items-center justify-center min-h-[360px] sm:min-h-[400px] bg-white border border-[#EBDBCD] shadow-sm">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 bg-[#FF7F32]/10 border border-[#FF7F32]/20 shadow-lg shadow-orange-50 rotate-12">
                    <span className="text-4xl">🙏</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#3B2E2A] mb-3 sm:mb-4">
                    Message Sent
                  </h2>
                  <p className="text-[#635A56] text-base sm:text-lg font-medium max-w-sm leading-relaxed opacity-80">
                    We have received your message. Our team will respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 sm:mt-10 px-8 py-3 rounded-full border-2 border-[#FF7F32] text-[#FF7F32] font-black text-sm hover:bg-[#FF7F32]/5 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="rounded-[3rem] p-8 sm:p-10 md:p-14 bg-white border border-[#EBDBCD] shadow-sm">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#3B2E2A] mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-[#635A56] text-base sm:text-lg font-medium mb-8 sm:mb-10 opacity-70">
                    Fill in the form below and our team will get back to you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-name" className={labelClass}>
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelClass}>
                          Email *
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-phone" className={labelClass}>
                          Phone (Optional)
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 00000 00000"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-course" className={labelClass}>
                          Interested In
                        </label>
                        <div className="relative">
                          <select
                            id="contact-course"
                            name="course"
                            value={form.course}
                            onChange={handleChange}
                            className={`${inputClass} appearance-none cursor-pointer pr-10`}
                          >
                            <option value="">Select a course…</option>
                            {courseOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A89F9B]">
                            <ChevronRight size={18} className="rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className={labelClass}>
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about yourself and what you're looking to learn..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      id="contact-submit"
                      disabled={submitting}
                      className="btn-primary w-full py-5 rounded-[2rem] flex items-center justify-center gap-3 text-base font-black shadow-xl shadow-orange-100 transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                      {submitting ? "Sending…" : "Send Message"}
                    </button>

                    {error && (
                      <p className="text-center text-red-500 text-xs font-semibold">
                        {error}
                      </p>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
