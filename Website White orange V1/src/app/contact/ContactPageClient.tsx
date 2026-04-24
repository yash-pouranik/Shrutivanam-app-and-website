"use client";

import { useState } from "react";
import { MessageCircle, Mail, MapPin, Send } from "lucide-react";

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
      `Namaste! My name is ${form.name}.\n\nInterested in: ${form.course || "General Inquiry"}\nEmail: ${form.email}${form.phone ? "\nPhone: " + form.phone : ""}\n\nMessage: ${form.message}`
    );
    const waUrl = `https://wa.me/917566585848?text=${message}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%), linear-gradient(180deg, #1A1040 0%, #0d0b1e 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-6 font-[family-name:var(--font-cinzel)]">
            संपर्क करें · Contact Us
          </p>
          <h1 className="font-[family-name:var(--font-cinzel)] text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-6 leading-tight">
            Begin Your <span className="gold-shimmer">Conversation</span>
          </h1>
          <p className="text-[#C8BFAD]/80 text-lg max-w-xl mx-auto leading-relaxed">
            Have a question about our courses or want to find the right path?
            We are here. Reach out — we respond warmly and promptly.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info column */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp CTA — prominent */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(31,21,88,0.4) 100%)",
                  border: "1px solid rgba(201, 168, 76, 0.3)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #C9A84C 0%, #E2C97E 100%)",
                  }}
                >
                  <MessageCircle size={24} className="text-[#0d0b1e]" />
                </div>
                <h2 className="font-[family-name:var(--font-cinzel)] font-bold text-[#F5F0E8] text-lg mb-2">
                  Chat on WhatsApp
                </h2>
                <p className="text-[#C8BFAD]/70 text-sm mb-5 leading-relaxed">
                  The fastest way to reach us. Our team is available Mon–Sat,
                  9am–7pm IST.
                </p>
                <a
                  href="https://wa.me/917566585848?text=Namaste%2C%20I%20am%20interested%20in%20Shrutivanam%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp-direct"
                  className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide"
                >
                  <MessageCircle size={16} />
                  Open WhatsApp
                </a>
              </div>

              {/* Contact info */}
              <div className="glass-card rounded-2xl p-6 space-y-5">
                <h3 className="font-[family-name:var(--font-cinzel)] font-semibold text-[#E2C97E] text-sm tracking-widest uppercase">
                  Other Contact
                </h3>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#C8BFAD]/50 text-xs mb-0.5">Email</p>
                    <p className="text-[#C8BFAD]/80 text-sm">
                      shrutivanam@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#C8BFAD]/50 text-xs mb-0.5">Location</p>
                    <p className="text-[#C8BFAD]/80 text-sm">
                      India (Online Classes)
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="glass-card rounded-2xl p-6 text-center">
                <p className="font-[family-name:var(--font-cormorant)] italic text-xl text-[#E2C97E] mb-2">
                  &ldquo;गुरुर्ब्रह्मा गुरुर्विष्णुः&rdquo;
                </p>
                <p className="text-[#C8BFAD]/50 text-xs">
                  The Guru is Brahma, Vishnu, and Shiva
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="glass-card rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(201,168,76,0.2) 0%, rgba(31,21,88,0.4) 100%)",
                      border: "1px solid rgba(201, 168, 76, 0.3)",
                    }}
                  >
                    <span className="text-3xl">🙏</span>
                  </div>
                  <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-[#F5F0E8] mb-4">
                    Namaste! Message Sent.
                  </h2>
                  <p className="text-[#C8BFAD]/70 max-w-sm leading-relaxed">
                    WhatsApp has opened with your message. Our team will respond
                    shortly. Your journey begins now.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 btn-outline px-6 py-2 rounded-full text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-8">
                  <h2 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-[#F5F0E8] mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-[#C8BFAD]/60 text-sm mb-8">
                    Fill in the form below and your message will open directly
                    in WhatsApp.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
                        >
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
                          className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none transition-all duration-200"
                          style={{
                            background: "rgba(13, 11, 30, 0.6)",
                            border: "1px solid rgba(201, 168, 76, 0.2)",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
                        >
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
                          className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none transition-all duration-200"
                          style={{
                            background: "rgba(13, 11, 30, 0.6)",
                            border: "1px solid rgba(201, 168, 76, 0.2)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
                        >
                          Phone (Optional)
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 00000 00000"
                          className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none transition-all duration-200"
                          style={{
                            background: "rgba(13, 11, 30, 0.6)",
                            border: "1px solid rgba(201, 168, 76, 0.2)",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-course"
                          className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
                        >
                          Interested In
                        </label>
                        <select
                          id="contact-course"
                          name="course"
                          value={form.course}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] outline-none transition-all duration-200 appearance-none cursor-pointer"
                          style={{
                            background: "rgba(13, 11, 30, 0.6)",
                            border: "1px solid rgba(201, 168, 76, 0.2)",
                          }}
                        >
                          <option value="" className="bg-[#1A1040]">
                            Select a course...
                          </option>
                          {courseOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#1A1040]">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2"
                      >
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
                        className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none resize-none transition-all duration-200"
                        style={{
                          background: "rgba(13, 11, 30, 0.6)",
                          border: "1px solid rgba(201, 168, 76, 0.2)",
                        }}
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

                    <p className="text-center text-[#C8BFAD]/40 text-xs">
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
