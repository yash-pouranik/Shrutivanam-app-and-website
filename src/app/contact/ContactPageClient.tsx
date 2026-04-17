"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";

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
    "w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none bg-slate-50 border border-slate-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-colors";

  const labelClass =
    "block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 border-b border-slate-200">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(234,88,12,0.10) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-orange-600 text-sm font-semibold tracking-widest uppercase mb-6 font-[family-name:var(--font-cinzel)]">
            संपर्क करें · Contact Us
          </p>
          <h1 className="font-[family-name:var(--font-cinzel)] text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Begin Your <span className="text-orange-600">Conversation</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed">
            Have a question about our courses or want to find the right path? We
            are here. Reach out — we respond warmly and promptly.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info column */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp CTA */}
              <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-50 border border-green-200 text-green-700">
                  <MessageCircle size={24} />
                </div>
                <h2 className="font-[family-name:var(--font-cinzel)] font-bold text-slate-900 text-lg mb-2">
                  Chat on WhatsApp
                </h2>
                <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                  The fastest way to reach us. Our team is available Mon–Sat,
                  9am–7pm IST.
                </p>
                <a
                  href="https://wa.me/917566585848?text=Namaste%2C%20I%20am%20interested%20in%20Shrutivanam%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp-direct"
                  className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide bg-green-600 hover:bg-green-700 text-white transition-colors"
                >
                  <MessageCircle size={16} />
                  Open WhatsApp
                </a>
              </div>

              {/* Contact info */}
              <div className="rounded-2xl p-6 space-y-5 bg-slate-50 border border-slate-200">
                <h3 className="font-[family-name:var(--font-cinzel)] font-semibold text-slate-900 text-sm tracking-widest uppercase">
                  Other Contact
                </h3>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Email</p>
                    <p className="text-slate-700 text-sm">shrutivanam@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Location</p>
                    <p className="text-slate-700 text-sm">India (Online Classes)</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="rounded-2xl p-6 text-center bg-slate-50 border border-slate-200">
                <p className="font-[family-name:var(--font-cormorant)] italic text-xl text-orange-700 mb-2">
                  &ldquo;गुरुर्ब्रह्मा गुरुर्विष्णुः&rdquo;
                </p>
                <p className="text-slate-500 text-xs">
                  The Guru is Brahma, Vishnu, and Shiva
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px] bg-white border border-slate-200 shadow-sm">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-orange-50 border border-orange-200">
                    <span className="text-3xl">🙏</span>
                  </div>
                  <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-slate-900 mb-4">
                    Message Sent
                  </h2>
                  <p className="text-slate-600 max-w-sm leading-relaxed">
                    WhatsApp has opened with your message. Our team will respond
                    shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 btn-outline px-6 py-2 rounded-full text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                  <h2 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-slate-900 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-slate-600 text-sm mb-8">
                    Fill in the form below and your message will open directly in
                    WhatsApp.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
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

                    <div className="grid sm:grid-cols-2 gap-5">
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
                        <select
                          id="contact-course"
                          name="course"
                          value={form.course}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="">Select a course…</option>
                          {courseOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
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
                      className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide"
                    >
                      <Send size={16} />
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
