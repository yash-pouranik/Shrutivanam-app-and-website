import type { Metadata } from "next";
import { teachers } from "@/data/teachers";
import TeacherCard from "@/components/TeacherCard";
import SectionDivider from "@/components/SectionDivider";
import WhatsAppStrip from "@/components/WhatsAppStrip";
import { Star, Heart, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About Shrutivanam",
  description:
    "Learn about Shrutivanam's mission to bring authentic Vedic knowledge to modern learners. Meet our expert teachers from IISc Bangalore and IIT Guwahati.",
};

const values = [
  {
    icon: Star,
    title: "Authenticity First",
    desc: "Everything we teach is grounded in the original scriptural tradition, without dilution or commercial distortion.",
  },
  {
    icon: Heart,
    title: "Knowledge as Service",
    desc: "We view the transmission of Vedic wisdom as a sacred act of service — not a transaction, but a gift passed from teacher to student.",
  },
  {
    icon: Lightbulb,
    title: "Ancient & Accessible",
    desc: "Ancient wisdom in a language and format that the modern seeker can understand, apply, and genuinely benefit from.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%), linear-gradient(180deg, #1A1040 0%, #0d0b1e 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-6 font-[family-name:var(--font-cinzel)]">
            हमारे बारे में · About Us
          </p>
          <h1 className="font-[family-name:var(--font-cinzel)] text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-6 leading-tight">
            Preserving the <span className="gold-shimmer">Sacred Flame</span>
            <br />
            of Vedic Knowledge
          </h1>
          <p className="text-[#C8BFAD]/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Shrutivanam was born from a simple conviction: that the wisdom of
            the Vedas is not merely historical — it is eternally relevant, and
            every sincere seeker deserves access to it.
          </p>
        </div>
      </section>

      <SectionDivider withSymbol className="max-w-lg mx-auto px-8" />

      {/* ─── MISSION ──────────────────────────────────────────────── */}
      <section className="section-pad px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4 font-[family-name:var(--font-cinzel)]">
                हमारा उद्देश्य · Our Mission
              </p>
              <h2 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-6">
                Spiritual Knowledge Over Material Gain
              </h2>
              <p className="text-[#C8BFAD]/80 leading-relaxed mb-5">
                In an age of information overload, Shrutivanam is an oasis of
                depth. Our mission is to create a space where knowledge is
                approached with reverence — where students slow down, inquire
                deeply, and allow ancient wisdom to genuinely transform their
                understanding.
              </p>
              <p className="text-[#C8BFAD]/80 leading-relaxed mb-5">
                We teach Vedic Mathematics, Yoga, Sanskrit, and Indian
                Philosophy not as isolated subjects, but as facets of a unified
                vision of life — one that sees consciousness, nature, and
                purpose as deeply interconnected.
              </p>
              <p className="text-[#C8BFAD]/80 leading-relaxed">
                Our approach is accessible to modern learners without
                compromising the integrity and depth of the tradition. We honor
                the lineage, while speaking to the present moment.
              </p>
            </div>

            <div className="space-y-5">
              {values.map((val, i) => {
                const Icon = val.icon;
                return (
                  <div
                    key={i}
                    className="glass-card rounded-xl p-5 flex gap-4 items-start hover:border-[rgba(201,168,76,0.35)] transition-all duration-300"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(201,168,76,0.2) 0%, rgba(31,21,88,0.5) 100%)",
                        border: "1px solid rgba(201, 168, 76, 0.2)",
                      }}
                    >
                      <Icon size={18} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-cinzel)] font-semibold text-[#F5F0E8] text-sm mb-2">
                        {val.title}
                      </h3>
                      <p className="text-[#C8BFAD]/70 text-sm leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider withSymbol className="max-w-lg mx-auto px-8" />

      {/* ─── TEACHERS ─────────────────────────────────────────────── */}
      <section
        id="teachers"
        className="section-pad px-4 sm:px-6 lg:px-8"
        style={{ scrollMarginTop: "80px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4 font-[family-name:var(--font-cinzel)]">
              हमारे गुरु · Our Teachers
            </p>
            <h2 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-4">
              The Faces Behind the Knowledge
            </h2>
            <p className="text-[#C8BFAD]/70 max-w-2xl mx-auto">
              Each of our teachers has walked the dual path of rigorous
              academic training and sincere spiritual practice — a rare
              combination that yields teaching of exceptional quality and depth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.slug} teacher={teacher} detailed />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider withSymbol className="max-w-lg mx-auto px-8" />

      {/* ─── VISION ───────────────────────────────────────────────── */}
      <section className="section-pad px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-6 font-[family-name:var(--font-cinzel)]">
            हमारी दृष्टि · Our Vision
          </p>
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-6">
            A World Illumined by Vedic Wisdom
          </h2>
          <p className="text-[#C8BFAD]/80 text-lg leading-relaxed mb-8">
            We envision a future where the profound knowledge of the Vedas —
            tested across millennia — becomes accessible to every sincere
            seeker, regardless of background, location, or prior knowledge.
            Shrutivanam will grow into a living community of learners,
            teachers, and practitioners — a digital gurukul for the modern age.
          </p>
          <div className="glass-card rounded-2xl p-8 inline-block">
            <p className="font-[family-name:var(--font-cormorant)] text-2xl italic text-[#E2C97E] mb-3">
              &ldquo;ज्ञानेन तु तदज्ञानं येषां नाशितमात्मनः&rdquo;
            </p>
            <p className="text-[#C8BFAD]/60 text-sm">
              &ldquo;But for those whose ignorance is destroyed by knowledge of the
              Self...&rdquo; — Bhagavad Gita 5.16
            </p>
          </div>
        </div>
      </section>

      <WhatsAppStrip />
    </>
  );
}
