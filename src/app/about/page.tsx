import type { Metadata } from "next";
import Image from "next/image";
import { teachers } from "@/data/teachers";
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
      {/* HERO */}
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
            हमारे बारे में · About Us
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#3B2E2A] mb-8 leading-tight">
            Preserving the <span className="text-[#FF7F32]">Sacred Flame</span>
            <br />
            of Vedic Knowledge
          </h1>
          <p className="text-[#635A56] text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
            Shrutivanam was born from a simple conviction: that the wisdom of the
            Vedas is not merely historical — it is eternally relevant, and every
            sincere seeker deserves access to it.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EBDBCD]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#7BBD8B] text-sm font-black tracking-widest uppercase mb-4">
                हमारा उद्देश्य · Our Mission
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-[#3B2E2A] mb-8 leading-tight">
                Spiritual Knowledge Over <br/>
                <span className="text-[#FF7F32]">Material Gain</span>
              </h2>
              <div className="space-y-6 text-[#635A56] text-lg font-medium leading-relaxed opacity-90">
                <p>
                  In an age of information overload, Shrutivanam is an oasis of
                  depth. Our mission is to create a space where knowledge is
                  approached with reverence — where students slow down, inquire
                  deeply, and allow ancient wisdom to genuinely transform their
                  understanding.
                </p>
                <p>
                  We teach Vedic Mathematics, Yoga, Sanskrit, and Indian
                  Philosophy not as isolated subjects, but as facets of a unified
                  vision of life — one that sees consciousness, nature, and
                  purpose as deeply interconnected.
                </p>
                <p>
                  Our approach is accessible to modern learners without
                  compromising the integrity and depth of the tradition. We honor
                  the lineage, while speaking to the present moment.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {values.map((val, i) => {
                const Icon = val.icon;
                const colors = ['bg-orange-100 text-orange-600', 'bg-green-100 text-green-600', 'bg-yellow-100 text-yellow-600'];
                return (
                  <div
                    key={i}
                    className="rounded-[2.5rem] p-8 bg-[#FEF7ED]/50 border border-[#EBDBCD] flex gap-6 items-start transition-all duration-300 hover:shadow-xl hover:bg-white group"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 transition-transform group-hover:scale-110 ${colors[i % 3]}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-[#3B2E2A] text-xl mb-3">
                        {val.title}
                      </h3>
                      <p className="text-[#635A56] text-base font-semibold leading-relaxed opacity-80">
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

      {/* TEACHERS */}
      <section id="teachers" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#FEF7ED] scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#FF7F32] text-sm font-black tracking-widest uppercase mb-4">
              हमारे गुरु · Our Teachers
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#3B2E2A] mb-4">
              The Faces Behind the Knowledge
            </h2>
            <p className="text-[#635A56] text-xl font-medium max-w-2xl mx-auto opacity-80">
              Each of our teachers has walked the dual path of rigorous academic
              training and sincere spiritual practice — a rare combination.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl bg-white border border-[#EBDBCD] shadow-sm p-8">
              <p className="text-[#3B2E2A] text-xs font-black uppercase tracking-widest mb-6">
                Faculty Designations
              </p>
              <ul className="space-y-3">
                {teachers.map((teacher) => (
                  <li key={teacher.slug} className="text-[#635A56] text-sm md:text-base font-semibold">
                    <span className="text-[#3B2E2A]">{teacher.name}</span> — {teacher.credentials}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F9D048] text-sm font-black tracking-widest uppercase mb-6">
            हमारी दृष्टि · Our Vision
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#3B2E2A] mb-8 leading-tight">
            A World Illumined by <br/>
            <span className="text-[#FF7F32]">Vedic Wisdom</span>
          </h2>
          <p className="text-[#635A56] text-xl font-medium leading-relaxed mb-12 opacity-90">
            We envision a future where the profound knowledge of the Vedas —
            tested across millennia — becomes accessible to every sincere seeker,
            regardless of background, location, or prior knowledge.
          </p>
          <div className="rounded-[3rem] p-12 bg-[#FEF7ED] border border-[#EBDBCD] shadow-sm inline-block relative group">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#FF7F32] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg transition-transform group-hover:scale-110 rotate-12">
              <Image
                src="/shrutivanam.logo.png"
                alt="Shrutivanam logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
            </div>
            <p className="text-3xl font-black text-[#FF7F32] mb-4 tracking-tight italic">
              &ldquo;ज्ञानेन तु तदज्ञानं येषां नाशितमात्मनः&rdquo;
            </p>
            <p className="text-[#635A56] text-sm font-black uppercase tracking-widest opacity-60">
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
