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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `Namaste! My name is ${form.name}.\n\nInterested in: ${
        form.course || "General Inquiry"
      }\nEmail: ${form.email}${
        form.phone ? "\nPhone: " + form.phone : ""
      }\n\nMessage: ${form.message}`
    );

    const waUrl = `https://wa.me/917566585848?text=${message}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-5 py-4 rounded-2xl text-base text-[#3B2E2A] placeholder-[#A89F9B] outline-none bg-[#FEF7ED]/50 border border-[#EBDBCD] focus:border-[#FF7F32]/50 focus:ring-4 focus:ring-[#FF7F32]/10 transition-all font-medium";

  const labelClass =
    "block text-xs font-black tracking-widest text-[#635A56] uppercase mb-3 opacity-70";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FEF7ED]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,127,50,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[#FF7F32] text-sm font-black tracking-widest uppercase mb-6">
            संपर्क करें · Contact Us
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#3B2E2A] mb-8 leading-tight">
            Begin Your <span className="text-[#FF7F32]">Conversation</span>
          </h1>
          <p className="text-[#635A56] text-xl font-medium max-w-xl mx-auto leading-relaxed opacity-90">
            Have a question about our courses or want to find the right path? We
            are here. Reach out — we respond warmly and promptly.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* WhatsApp CTA */}
            <div className="rounded-[2.5rem] p-8 bg-white border border-[#EBDBCD] shadow-sm text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-[#7BBD8B]/10 border border-[#7BBD8B]/20 text-[#7BBD8B]">
                <MessageCircle size={28} />
              </div>
              <h2 className="font-black text-[#3B2E2A] text-xl mb-3">
                Chat on WhatsApp
              </h2>
              <p className="text-[#635A56] text-sm mb-8 leading-relaxed font-medium">
                The fastest way to reach us. Our team is available Mon–Sat,
                9am–7pm IST.
              </p>
              <a
                href="https://wa.me/917566585848?text=Namaste%2C%20I%20am%20interested%20in%20Shrutivanam%20courses."
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
            <div className="rounded-[2.5rem] p-8 space-y-6 bg-white border border-[#EBDBCD] shadow-sm">
              <h3 className="text-[#3B2E2A] text-xs font-black uppercase tracking-widest opacity-60">
                Other Contact
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF7F32]/10 flex items-center justify-center text-[#FF7F32] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[#A89F9B] text-[10px] font-black uppercase tracking-widest mb-1">Email</p>
                  <p className="text-[#3B2E2A] text-sm font-bold">shrutivanam108@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF7F32]/10 flex items-center justify-center text-[#FF7F32] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[#A89F9B] text-[10px] font-black uppercase tracking-widest mb-1">Location</p>
                  <p className="text-[#3B2E2A] text-sm font-bold">India (Online Classes)</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="rounded-[2.5rem] p-8 text-center bg-[#FEF7ED] border border-[#EBDBCD]">
              <p className="text-2xl font-black text-[#FF7F32] mb-2 italic">
                &ldquo;गुरुर्ब्रह्मा गुरुर्विष्णुः&rdquo;
              </p>
              <p className="text-[#635A56] text-xs font-black uppercase tracking-widest opacity-60">
                The Guru is Brahma, Vishnu, and Shiva
              </p>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-[3rem] p-16 text-center h-full flex flex-col items-center justify-center min-h-[400px] bg-white border border-[#EBDBCD] shadow-sm">
                  <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 bg-[#FF7F32]/10 border border-[#FF7F32]/20 shadow-lg shadow-orange-50 rotate-12">
                    <span className="text-4xl">🙏</span>
                  </div>
                  <h2 className="text-3xl font-black text-[#3B2E2A] mb-4">
                    Message Sent
                  </h2>
                  <p className="text-[#635A56] text-lg font-medium max-w-sm leading-relaxed opacity-80">
                    WhatsApp has opened with your message. Our team will respond
                    shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-10 px-8 py-3 rounded-full border-2 border-[#FF7F32] text-[#FF7F32] font-black text-sm hover:bg-[#FF7F32]/5 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="rounded-[3rem] p-10 md:p-14 bg-white border border-[#EBDBCD] shadow-sm">
                  <h2 className="text-3xl font-black text-[#3B2E2A] mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-[#635A56] text-lg font-medium mb-10 opacity-70">
                    Fill in the form below and your message will open directly in
                    WhatsApp.
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
                      className="btn-primary w-full py-5 rounded-[2rem] flex items-center justify-center gap-3 text-base font-black shadow-xl shadow-orange-100 transition-transform hover:scale-[1.02]"
                    >
                      <Send size={20} />
                      Send via WhatsApp
                    </button>

                    <p className="text-center text-slate-500 text-xs">
                      This will open WhatsApp with your message pre-filled.
                    </p>
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
