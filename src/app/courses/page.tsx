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
        className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FEF7ED]"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,127,50,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[#FF7F32] text-xs sm:text-sm font-black tracking-widest uppercase mb-4 sm:mb-6">
            हमारे कोर्स · Our Courses
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-[#3B2E2A] mb-6 sm:mb-8 leading-tight">
            Pathways to <br/>
            <span className="text-[#FF7F32]">Ancient Knowledge</span>
          </h1>
          <p className="text-[#635A56] text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
            Each course is crafted to honour both the depth of the tradition
            and the needs of the modern learner. Begin anywhere — every path
            leads inward.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EBDBCD]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-[#FEF7ED]">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-white border border-[#EBDBCD] rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center shadow-sm relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9D048]/10 rounded-full -mr-16 -mt-16" />
            <p className="italic text-[#FF7F32] text-lg sm:text-xl font-black mb-3 sm:mb-4">
              Not sure which course is right for you?
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#3B2E2A] mb-4 sm:mb-6">
              Let Us Guide You
            </h2>
            <p className="text-[#635A56] text-base sm:text-lg font-medium mb-8 sm:mb-10 max-w-md mx-auto opacity-80">
              Reach out on WhatsApp and our team will help you find the perfect
              starting point for your journey.
            </p>
            <a
              href="https://wa.me/9039457108?text=Namaste%2C%20I%20need%20help%20choosing%20a%20course%20at%20Shrutivanam."
              target="_blank"
              rel="noopener noreferrer"
              id="courses-whatsapp-guide"
              className="btn-primary inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base font-black shadow-xl shadow-orange-100 transition-transform hover:scale-105"
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
