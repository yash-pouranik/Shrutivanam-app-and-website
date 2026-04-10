import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Sparkles, Globe } from "lucide-react";
import { courses } from "@/data/courses";
import { teachers } from "@/data/teachers";
import CourseCard from "@/components/CourseCard";
import TeacherCard from "@/components/TeacherCard";
import WhatsAppStrip from "@/components/WhatsAppStrip";
import SectionDivider from "@/components/SectionDivider";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Shrutivanam — Spiritual Learning Platform",
  description:
    "Discover authentic Vedic education at Shrutivanam. Courses in Vedic Mathematics, Yoga, Sanskrit, and Indian Philosophy by expert teachers.",
  keywords: [
    "spiritual education platform",
    "Vedic Maths course online",
    "Learn Sanskrit for beginners",
    "Yoga philosophy course India",
  ],
};

const whyPoints = [
  {
    icon: BookOpen,
    title: "Authentic Knowledge",
    titleHi: "प्रामाणिक ज्ञान",
    desc: "Rooted in unbroken Vedic tradition, taught with fidelity to original texts and time-tested methods.",
  },
  {
    icon: Users,
    title: "Expert Teachers",
    titleHi: "विशेषज्ञ शिक्षक",
    desc: "Our faculty hold degrees from India's premier institutions — IISc Bangalore, IIT Guwahati — combined with deep spiritual study.",
  },
  {
    icon: Sparkles,
    title: "Ancient Wisdom",
    titleHi: "प्राचीन विद्या",
    desc: "We bring you knowledge from the Vedas, Upanishads, Yoga Sutras, and Bhagavad Gita in its purest, undiluted form.",
  },
  {
    icon: Globe,
    title: "Modern Accessibility",
    titleHi: "आधुनिक सुलभता",
    desc: "Learn from anywhere. Our structured online format makes ancient wisdom available to every sincere seeker.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="hero-gradient relative pt-28 pb-16 md:pt-36 md:pb-20 flex items-center justify-center overflow-hidden">
        {/* Decorative circles */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
            border: "1px solid rgba(201,168,76,0.05)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(201,168,76,0.03)",
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 flex flex-col items-center">
          {/* Heading */}
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up animate-delay-200 leading-tight">
            <span className="gold-shimmer">Ancient Wisdom.</span>
            <br />
            <span className="text-[#F5F0E8]">Modern Path.</span>
          </h1>

          <p className="text-[#C8BFAD]/80 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-400">
            A space for sincere learning. We offer structured courses in Vedic Mathematics, Yoga, Sanskrit, and Indian Philosophy.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-600">
            <Link
              href="/courses"
              id="hero-explore-courses"
              className="btn-primary px-8 py-4 rounded-full text-base font-semibold tracking-wide inline-flex items-center gap-2"
            >
              <span>Explore Courses</span>
              <span className="font-[family-name:var(--font-cormorant)] text-sm">
                / कोर्स देखें
              </span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              id="hero-about-link"
              className="btn-outline px-8 py-4 rounded-full text-base font-semibold tracking-wide"
            >
              Our Story
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 opacity-40 animate-fade-in animate-delay-600">
            <div
              className="w-px h-12"
              style={{
                background:
                  "linear-gradient(180deg, transparent, #C9A84C, transparent)",
              }}
            />
            <p className="text-xs tracking-widest text-[#C9A84C] uppercase">
              Scroll
            </p>
          </div>
        </div>
      </section>

      {/* ─── ABOUT SNIPPET ────────────────────────────────────────── */}
      <section className="section-pad px-4 sm:px-6 lg:px-8 bg-ambient-indigo border-t border-[rgba(201,168,76,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2 font-[family-name:var(--font-cinzel)]">
                हमारे बारे में · About Us
              </p>
              <h2 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-4 leading-tight">
                Tradition for the <span className="gold-shimmer">Modern Mind</span>
              </h2>
              <p className="text-[#C8BFAD]/80 text-sm md:text-base leading-relaxed mb-4">
                Shrutivanam ("forest of sound") is a platform built to pass on traditional Indian knowledge without the fluff. We focus on the original texts and practices.
              </p>
              <p className="text-[#C8BFAD]/80 text-sm md:text-base leading-relaxed mb-8">
                Our classes are taught by practitioners who also have strong academic backgrounds, ensuring the material is grounded, practical, and highly accurate.
              </p>
              <Link
                href="/about"
                id="about-read-more"
                className="btn-outline px-6 py-2 rounded-full text-xs font-semibold tracking-wider inline-flex items-center gap-2"
              >
                Read More
                <ArrowRight size={14} />
              </Link>
            </FadeIn>
            <FadeIn direction="left" delay={0.2} className="relative">
              {/* Decorative stacked quote */}
              <div
                className="glass-card rounded-2xl p-6 text-center relative"
              >
                <p className="font-[family-name:var(--font-cormorant)] text-4xl text-[#C9A84C]/20 mb-2 leading-none">
                  &ldquo;
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-xl italic text-[#E2C97E] mb-2">
                  तमसो मा ज्योतिर्गमय
                </p>
                <p className="text-[#C8BFAD]/60 text-xs tracking-wide">
                  Lead me from darkness to light
                </p>
                <div className="gold-divider mt-4 mb-3" />
                <p className="text-[#C8BFAD]/50 text-[10px] tracking-widest uppercase">
                  Brihadaranyaka Upanishad
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── COURSES PREVIEW ──────────────────────────────────────── */}
      <section className="section-pad px-4 sm:px-6 lg:px-8 bg-ambient-gold border-t border-[rgba(201,168,76,0.1)] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-8">
              <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2 font-[family-name:var(--font-cinzel)]">
                हमारे कोर्स · Our Courses
              </p>
              <h2 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-3">
                Core Subjects
              </h2>
              <p className="text-[#C8BFAD]/70 max-w-lg mx-auto text-sm">
                Four foundational subjects, deeply researched and structured for clarity.
              </p>
            </div>
          </FadeIn>

          {/* Mobile: horizontal scroll; Desktop: grid */}
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 scrollbar-none">
            {courses.map((course, i) => (
              <FadeIn key={course.slug} delay={i * 0.1} direction="up" className="min-w-[280px] snap-start md:min-w-0">
                <CourseCard course={course} />
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up">
            <div className="text-center mt-10">
              <Link
                href="/courses"
                id="courses-view-all"
                className="btn-outline px-8 py-3 rounded-full text-sm font-semibold tracking-wider inline-flex items-center gap-2"
              >
                View All Courses
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── WHY SHRUTIVANAM ─────────────────────────────────────── */}
      <section className="section-pad px-4 sm:px-6 lg:px-8 bg-ambient-dark border-t border-[rgba(201,168,76,0.15)] shadow-[inset_0_20px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-8">
              <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2 font-[family-name:var(--font-cinzel)]">
                विशेषता · Why Choose Us
              </p>
              <h2 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl font-bold text-[#F5F0E8]">
                Why Look Here?
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <FadeIn key={i} delay={i * 0.15} direction="up" className="h-full">
                  <div
                    className="glass-card rounded-2xl p-6 text-center hover:border-[rgba(201,168,76,0.35)] transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(31,21,88,0.4) 100%)",
                        border: "1px solid rgba(201, 168, 76, 0.25)",
                      }}
                    >
                      <Icon size={24} className="text-[#C9A84C]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-cinzel)] font-semibold text-[#F5F0E8] mb-1 text-sm md:text-base">
                      {point.title}
                    </h3>
                    <p className="text-[#C9A84C]/60 text-xs italic font-[family-name:var(--font-cormorant)] mb-2">
                      {point.titleHi}
                    </p>
                    <p className="text-[#C8BFAD]/70 text-xs leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TEACHERS PREVIEW ────────────────────────────────────── */}
      <section className="section-pad px-4 sm:px-6 lg:px-8 bg-ambient-indigo border-t border-[rgba(201,168,76,0.1)]">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-8">
              <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2 font-[family-name:var(--font-cinzel)]">
                हमारे गुरु · Our Teachers
              </p>
              <h2 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-2">
                Learn from the Best
              </h2>
              <p className="text-[#C8BFAD]/70 max-w-lg mx-auto text-sm">
                Scholars who bring academic rigor to traditional systems.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher, i) => (
              <FadeIn key={teacher.slug} delay={i * 0.15} direction="up">
                <TeacherCard teacher={teacher} />
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up">
            <div className="text-center mt-10">
              <Link
                href="/about#teachers"
                id="teachers-view-all"
                className="btn-outline px-8 py-3 rounded-full text-sm font-semibold tracking-wider inline-flex items-center gap-2"
              >
                Meet All Teachers
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── WHATSAPP STRIP ──────────────────────────────────────── */}
      <WhatsAppStrip />
    </>
  );
}
