import type { Metadata } from "next";
import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import WhatsAppStrip from "@/components/WhatsAppStrip";

export const metadata: Metadata = {
  title: "All Courses",
  description:
    "Explore Shrutivanam's courses: Vedic Mathematics online, Yoga and philosophy, Sanskrit for beginners, and Indian philosophy. Authentic Vedic learning.",
  keywords: [
    "Vedic Maths course online",
    "Yoga philosophy course India",
    "Learn Sanskrit for beginners",
    "Indian philosophy course",
    "spiritual education platform",
  ],
};

export default function CoursesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%), linear-gradient(180deg, #1A1040 0%, #0d0b1e 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4 font-[family-name:var(--font-cinzel)]">
            हमारे कोर्स · Our Courses
          </p>
          <h1 className="font-[family-name:var(--font-cinzel)] text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-4 leading-tight">
            Pathways to <span className="gold-shimmer">Ancient Knowledge</span>
          </h1>
          <p className="text-[#C8BFAD]/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Each course is crafted to honour both the depth of the tradition
            and the needs of the modern learner. Begin anywhere — every path
            leads inward.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="section-pad px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div
            className="glass-card rounded-2xl p-8 md:p-12 text-center"
          >
            <p className="font-[family-name:var(--font-cormorant)] italic text-[#C9A84C] text-lg mb-3">
              Not sure which course is right for you?
            </p>
            <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-[#F5F0E8] mb-4">
              Let Us Guide You
            </h2>
            <p className="text-[#C8BFAD]/70 mb-8 max-w-md mx-auto">
              Reach out on WhatsApp and our team will help you find the perfect
              starting point for your journey.
            </p>
            <a
              href="https://wa.me/917566585848?text=Namaste%2C%20I%20need%20help%20choosing%20a%20course%20at%20Shrutivanam."
              target="_blank"
              rel="noopener noreferrer"
              id="courses-whatsapp-guide"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold tracking-wide"
            >
              Get Course Guidance
            </a>
          </div>
        </div>
      </section>

      <WhatsAppStrip />
    </>
  );
}
