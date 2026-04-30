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
  const waUrl = `https://wa.me/9039457108?text=${waMessage}`;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 text-sm mb-8 transition-colors duration-200 font-semibold"
          >
            <ArrowLeft size={16} />
            All Courses
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 bg-white border border-slate-200 shadow-sm text-orange-600">
              {course.icon}
            </div>
            <div>
              <p className="text-orange-600 text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 font-[family-name:var(--font-cinzel)]">
                {course.seoKeyword}
              </p>
              <h1 className="font-[family-name:var(--font-cinzel)] text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-1">
                {course.title.en}
              </h1>
              <p className="font-[family-name:var(--font-cormorant)] italic text-lg sm:text-xl text-slate-600">
                {course.title.hi}
              </p>
            </div>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 shadow-sm">
              <Clock size={12} className="text-orange-600 sm:hidden" />
              <Clock size={14} className="text-orange-600 hidden sm:block" />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 shadow-sm">
              <BarChart2 size={12} className="text-orange-600 sm:hidden" />
              <BarChart2 size={14} className="text-orange-600 hidden sm:block" />
              {course.level}
            </span>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            {course.longDescription}
          </p>
        </div>
      </section>

      {/* ─── CONTENT ─────────────────────────────────────────────── */}
      <section className="section-pad px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Left: Modules + Description */}
            <div className="lg:col-span-2 space-y-10">
              {/* Modules */}
              <div>
                <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
                  Course Modules
                </h2>
                <div className="space-y-3">
                  {course.modules.map((module, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-200 rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-start sm:items-center gap-3 sm:gap-4 hover:border-orange-300 hover:shadow-sm transition-all duration-200"
                    >
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-orange-100 text-orange-700 border border-orange-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-slate-700 text-sm font-medium break-words">
                        {module.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
                  Course Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.highlights?.length > 0 && course.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3 shadow-sm"
                    >
                      <CheckCircle
                        size={18}
                        className="text-green-600 flex-shrink-0 mt-0.5"
                      />
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
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
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-slate-900 text-sm tracking-widest uppercase mb-5 border-b border-slate-100 pb-2">
                    Your Teacher
                  </h3>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-orange-200">
                      <Image
                        src={teacher.photo}
                        alt={teacher.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-cinzel)] font-bold text-slate-900 text-sm mb-1">
                        {teacher.name}
                      </p>
                      <p className="text-orange-600 font-semibold text-xs">{teacher.subject}</p>
                      <p className="text-slate-500 text-xs mt-1 font-medium">
                        {teacher.credentials}
                      </p>
                    </div>
                  </div>
                  <SectionDivider className="mb-4" />
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-4 font-medium">
                    {teacher.bio}
                  </p>
                </div>
              )}

              {/* Inquiry CTA */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
                <p className="font-[family-name:var(--font-cormorant)] italic text-orange-600 font-bold text-lg mb-2">
                  Ready to Begin?
                </p>
                <h3 className="font-[family-name:var(--font-cinzel)] font-black text-slate-900 text-xl mb-4">
                  Ask on WhatsApp
                </h3>
                <p className="text-slate-500 font-medium text-xs mb-6 leading-relaxed">
                  Have questions about this course? Schedule, fees, or content?
                  We respond promptly on WhatsApp.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`course-whatsapp-${course.slug}`}
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold tracking-wide bg-green-600 hover:bg-green-700 text-white transition-colors"
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
