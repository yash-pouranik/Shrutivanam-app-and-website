import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, BookOpen, Users, Sparkles, Globe, 
  Target, Zap, Trophy, Heart, Star
} from "lucide-react";
import { courses } from "@/data/courses";
import { teachers } from "@/data/teachers";
import CourseCard from "@/components/CourseCard";
import TeacherCard from "@/components/TeacherCard";
import WhatsAppStrip from "@/components/WhatsAppStrip";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Shrutivanam — Putting Ancient Wisdom into Motion",
  description:
    "Discover authentic Vedic education at Shrutivanam. Courses in Vedic Mathematics, Yoga, Sanskrit, and Indian Philosophy.",
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

const stats = [
  { icon: Trophy, label: "50+", desc: "Courses Completed" },
  { icon: Users, label: "12K+", desc: "Active Happy Students" },
  { icon: Target, label: "70+", desc: "Certified Expert Teachers" },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-0 md:pt-40 flex flex-col items-center overflow-hidden">
        {/* Floating Background Icons */}
        <div className="absolute top-20 left-[10%] floating-element opacity-20 text-[#FF7F32]">
          <Zap size={48} fill="currentColor" />
        </div>
        <div className="absolute top-40 right-[15%] floating-element delay-200 opacity-20 text-[#7BBD8B]">
          <Heart size={40} fill="currentColor" />
        </div>
        <div className="absolute bottom-40 left-[15%] floating-element delay-400 opacity-20 text-[#F9D048]">
          <Star size={56} fill="currentColor" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center z-10">
          <FadeIn direction="up">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#3B2E2A] leading-tight mb-6">
              Putting your <span className="title-underline">Tradition</span> in <br className="hidden md:block" />
              great motion
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm font-bold text-[#635A56]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                No Prior Prep
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                Authentic Texts
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                Expert Guidance
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
              <Link href="/courses" className="btn-primary px-10 py-5 text-lg shadow-2xl shadow-orange-200">
                Start Learning Now
              </Link>
              <p className="max-w-[280px] text-xs font-semibold text-[#A89F9B] leading-relaxed text-left sm:text-center">
                We just don't give our students only lecture but real life experiences.
              </p>
            </div>
          </FadeIn>

          {/* Hero Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto relative px-4">
            <FadeIn direction="right" className="hidden md:block">
              <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden bg-[#7BBD8B]/20 border-4 border-white shadow-2xl rotate-[-3deg]">
                <Image 
                  src="/student_maths_1775934560279.png" 
                  alt="Student Maths" 
                  fill 
                  className="object-cover"
                />
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.2}>
              <div className="relative aspect-[4/5] rounded-[80px] overflow-hidden bg-[#FF7F32]/10 border-4 border-white shadow-2xl z-20">
                <Image 
                  src="/student_yoga_1775934542751.png" 
                  alt="Student Yoga" 
                  fill 
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.4} className="hidden md:block">
              <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden bg-[#F9D048]/20 border-4 border-white shadow-2xl rotate-[3deg]">
                <Image 
                  src="/student_sanskrit_1775934575788.png" 
                  alt="Student Sanskrit" 
                  fill 
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="w-full bg-[#3B2E2A] mt-[-60px] pt-24 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap justify-between items-center gap-12">
            {stats.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF7F32] flex items-center justify-center text-white shadow-lg">
                    <Icon size={28} />
                  </div>
                  <div className="text-left">
                    <p className="text-3xl font-black text-white">{item.label}</p>
                    <p className="text-sm font-bold text-white/50">{item.desc}</p>
                  </div>
                </div>
              );
            })}
            <div className="flex -space-x-3 overflow-hidden p-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="inline-block h-10 w-10 rounded-full ring-2 ring-[#3B2E2A] bg-[#FF7F32] flex items-center justify-center text-[10px] font-bold text-white uppercase">
                  U{n}
                </div>
              ))}
              <div className="flex items-center justify-center h-10 w-10 text-xs font-bold text-white/50 pl-4 uppercase">
                +12k students
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT SECTION ────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right" className="relative">
              <div className="relative w-full aspect-square rounded-[100px] overflow-hidden bg-white p-4 shadow-xl">
                 <div className="absolute inset-0 bg-[#F9D048]/10 rounded-[100px]" />
                 <Image 
                  src="/student_sanskrit_1775934575788.png" 
                  alt="Our Mission" 
                  fill 
                  className="object-cover rounded-[80px]"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 bg-[#FF7F32] p-8 rounded-[40px] shadow-2xl text-white">
                <p className="text-5xl font-black mb-1">10+</p>
                <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Years Exp</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <p className="text-[#FF7F32] font-black uppercase tracking-widest text-sm mb-4">Shaping the future of kids</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#3B2E2A] mb-8 leading-tight">
                Authentic Vedic Wisdom <br />
                for the <span className="text-[#FF7F32]">Modern Mind</span>
              </h2>
              <div className="space-y-6 text-[#635A56] text-lg font-medium leading-relaxed mb-10">
                <p>
                  We focus on one impactful lesson at a time. Shrutivanam brings you the treasures of ancient Indian knowledge — pure, undiluted, and structured for today.
                </p>
                <p>
                  Our ecosystem is built for sincere seekers who want to explore Vedic Maths, Sanskrit, and Philosophy with academic rigor and spiritual depth.
                </p>
              </div>
              <Link href="/about" className="btn-outline px-10 py-5 text-base">
                Discover Our Story
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── COURSES PREVIEW ──────────────────────────────────────── */}
      <section className="py-24 bg-white border-y border-[#EBDBCD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <p className="text-[#7BBD8B] font-black uppercase tracking-widest text-sm mb-4">Our Programs</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#3B2E2A] mb-4">Foundation for Life</h2>
              <p className="text-[#635A56] text-lg font-medium">Four core subjects, deeply researched and mastery-focused.</p>
            </div>
            <Link href="/courses" className="btn-primary px-8 py-4 mb-2">View All Programs</Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, i) => (
              <FadeIn key={course.slug} delay={i * 0.1} direction="up">
                <CourseCard course={course} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ───────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FEF7ED]">
        <div className="max-w-7xl mx-auto text-center mb-16">
           <p className="text-[#F9D048] font-black uppercase tracking-widest text-sm mb-4">Why Shrutivanam</p>
           <h2 className="text-4xl md:text-5xl font-black text-[#3B2E2A]">Learning that sticks</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {whyPoints.map((point, i) => {
            const Icon = point.icon;
            const colors = ['bg-orange-100 text-orange-600', 'bg-green-100 text-green-600', 'bg-yellow-100 text-yellow-600', 'bg-blue-100 text-blue-600'];
            return (
              <FadeIn key={i} delay={i * 0.15} direction="up">
                <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all h-full border border-transparent hover:border-[#FF7F32]/10 group">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${colors[i % 4]}`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-black text-[#3B2E2A] mb-4">{point.title}</h3>
                  <p className="text-[#635A56] font-semibold text-sm leading-relaxed">{point.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ─── TEACHERS PREVIEW ────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <p className="text-[#FF7F32] font-black uppercase tracking-widest text-sm mb-4">Our Gurus</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#3B2E2A] mb-4">Learn from the Best</h2>
              <p className="text-[#635A56] text-lg font-medium">Scholars who bring academic rigor to traditional systems.</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, i) => (
              <FadeIn key={teacher.slug} delay={i * 0.15} direction="up">
                <TeacherCard teacher={teacher} />
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up">
            <div className="text-center mt-16">
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
