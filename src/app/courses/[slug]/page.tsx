import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { courses, getCourseBySlug } from "@/data/courses";
import { teachers } from "@/data/teachers";
import WhatsAppStrip from "@/components/WhatsAppStrip";
import SectionDivider from "@/components/SectionDivider";
import { CheckCircle, MessageCircle, ArrowLeft, Clock, BarChart2 } from "lucide-react";

// Generate static paths for all 4 courses
export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

// Dynamic per-course SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};

  return {
    title: `${course.title.en} Course — ${course.seoKeyword}`,
    description: `${course.description} Taught by ${course.teacher} at Shrutivanam.`,
    keywords: [
      course.seoKeyword,
      course.title.en,
      course.teacher,
      "Vedic learning",
      "spiritual education India",
    ],
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const teacher = teachers.find((t) => t.slug === course.teacherSlug);
  const waMessage = encodeURIComponent(
    `Namaste, I am interested in the ${course.title.en} course at Shrutivanam. Please provide more information.`
  );
  const waUrl = `https://wa.me/917566585848?text=${waMessage}`;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 60%), linear-gradient(180deg, #1A1040 0%, #0d0b1e 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-[#C9A84C]/70 hover:text-[#C9A84C] text-sm mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            All Courses
          </Link>

          <div className="flex items-start gap-6 mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(31,21,88,0.5) 100%)",
                border: "1px solid rgba(201, 168, 76, 0.3)",
              }}
            >
              {course.icon}
            </div>
            <div>
              <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-2 font-[family-name:var(--font-cinzel)]">
                {course.seoKeyword}
              </p>
              <h1 className="font-[family-name:var(--font-cinzel)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F0E8] leading-tight mb-1">
                {course.title.en}
              </h1>
              <p className="font-[family-name:var(--font-cormorant)] italic text-xl text-[#C9A84C]">
                {course.title.hi}
              </p>
            </div>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#C8BFAD]"
              style={{
                background: "rgba(31, 21, 88, 0.5)",
                border: "1px solid rgba(201, 168, 76, 0.2)",
              }}
            >
              <Clock size={14} className="text-[#C9A84C]" />
              {course.duration}
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#C8BFAD]"
              style={{
                background: "rgba(31, 21, 88, 0.5)",
                border: "1px solid rgba(201, 168, 76, 0.2)",
              }}
            >
              <BarChart2 size={14} className="text-[#C9A84C]" />
              {course.level}
            </span>
          </div>

          <p className="text-[#C8BFAD]/80 text-lg leading-relaxed max-w-3xl">
            {course.longDescription}
          </p>
        </div>
      </section>

      {/* ─── CONTENT ─────────────────────────────────────────────── */}
      <section className="section-pad px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Modules + Description */}
            <div className="lg:col-span-2 space-y-10">
              {/* Modules */}
              <div>
                <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-[#F5F0E8] mb-6">
                  Course Modules
                </h2>
                <div className="space-y-3">
                  {course.modules.map((module, i) => (
                    <div
                      key={i}
                      className="glass-card rounded-xl px-5 py-4 flex items-center gap-4 hover:border-[rgba(201,168,76,0.35)] transition-all duration-200"
                    >
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(201,168,76,0.2) 0%, rgba(31,21,88,0.4) 100%)",
                          border: "1px solid rgba(201, 168, 76, 0.3)",
                          color: "#C9A84C",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[#C8BFAD]/90 text-sm font-medium">
                        {module.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-[#F5F0E8] mb-6">
                  Course Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="glass-card rounded-xl p-4 flex items-start gap-3"
                    >
                      <CheckCircle
                        size={18}
                        className="text-[#C9A84C] flex-shrink-0 mt-0.5"
                      />
                      <p className="text-[#C8BFAD]/80 text-sm leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Teacher + CTA sidebar */}
            <div className="space-y-6">
              {/* Teacher card */}
              {teacher && (
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-[family-name:var(--font-cinzel)] font-semibold text-[#E2C97E] text-sm tracking-widest uppercase mb-5">
                    Your Teacher
                  </h3>
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2"
                      style={{ borderColor: "rgba(201, 168, 76, 0.4)" }}
                    >
                      <Image
                        src={teacher.photo}
                        alt={teacher.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-cinzel)] font-semibold text-[#F5F0E8] text-sm mb-1">
                        {teacher.name}
                      </p>
                      <p className="text-[#C9A84C] text-xs">{teacher.subject}</p>
                      <p className="text-[#C8BFAD]/50 text-xs mt-1">
                        {teacher.credentials}
                      </p>
                    </div>
                  </div>
                  <SectionDivider className="mb-4" />
                  <p className="text-[#C8BFAD]/70 text-xs leading-relaxed line-clamp-4">
                    {teacher.bio}
                  </p>
                </div>
              )}

              {/* Inquiry CTA */}
              <div className="glass-card rounded-2xl p-6 text-center">
                <p className="font-[family-name:var(--font-cormorant)] italic text-[#C9A84C] text-lg mb-2">
                  Ready to Begin?
                </p>
                <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-[#F5F0E8] text-xl mb-4">
                  Ask on WhatsApp
                </h3>
                <p className="text-[#C8BFAD]/60 text-xs mb-6 leading-relaxed">
                  Have questions about this course? Schedule, fees, or content?
                  We respond promptly on WhatsApp.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`course-whatsapp-${course.slug}`}
                  className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide"
                >
                  <MessageCircle size={18} />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppStrip
        message={waMessage}
        title={`Start Your ${course.title.en} Journey`}
        subtitle="आज ही शुरू करें"
      />
    </>
  );
}
