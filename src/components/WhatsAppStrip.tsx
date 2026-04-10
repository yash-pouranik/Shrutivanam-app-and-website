import { MessageCircle } from "lucide-react";

interface WhatsAppStripProps {
  message?: string;
  title?: string;
  subtitle?: string;
}

export default function WhatsAppStrip({
  message = "Namaste%2C%20I%20am%20interested%20in%20learning%20more%20about%20Shrutivanam%20courses.",
  title = "Have Questions? We're Here to Help.",
  subtitle = "प्रश्न हैं? संपर्क करें",
}: WhatsAppStripProps) {
  const waUrl = `https://wa.me/917566585848?text=${message}`;

  return (
    <section
      className="relative overflow-hidden py-14 px-4"
      style={{
        background:
          "linear-gradient(135deg, #1A1040 0%, #1F1558 50%, #1A1040 100%)",
        borderTop: "1px solid rgba(201, 168, 76, 0.15)",
        borderBottom: "1px solid rgba(201, 168, 76, 0.15)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201, 168, 76, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="font-[family-name:var(--font-cormorant)] italic text-[#C9A84C]/70 text-lg mb-2">
          {subtitle}
        </p>
        <h2 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl font-semibold text-[#F5F0E8] mb-6">
          {title}
        </h2>
        <p className="text-[#C8BFAD]/70 text-sm mb-8 max-w-md mx-auto">
          Reach out to our team on WhatsApp for course information, scheduling,
          and any questions you may have.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-cta-strip"
          className="inline-flex items-center gap-3 btn-primary px-8 py-4 rounded-full text-base font-semibold tracking-wide"
        >
          <MessageCircle size={20} />
          <span>Chat with Us on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
