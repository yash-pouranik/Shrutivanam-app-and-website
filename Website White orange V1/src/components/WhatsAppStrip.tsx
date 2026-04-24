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
    <section className="relative overflow-hidden py-24 px-4 bg-[#3B2E2A]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF7F32]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#7BBD8B]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-[#FF7F32] font-black uppercase tracking-widest text-sm mb-4">
          {subtitle}
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
          {title}
        </h2>
        <p className="text-white/60 text-lg font-medium mb-10 max-w-xl mx-auto">
          Reach out to our team on WhatsApp for course information, scheduling,
          and any questions you may have.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-cta-strip"
          className="inline-flex items-center gap-3 btn-primary px-10 py-5 text-lg shadow-2xl shadow-orange-900/20"
        >
          <MessageCircle size={24} />
          <span>Chat with Us on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
