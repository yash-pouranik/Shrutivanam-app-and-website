import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 border border-[#EBDBCD] hover:border-[#FF7F32] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
      aria-label={`Learn more about ${course.title.en}`}
    >
      {/* Icon */}
      <div 
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 flex items-center justify-center text-3xl sm:text-4xl shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3"
        style={{ background: "#FEF7ED" }}
      >
        {course.icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-orange-50 text-[#FF7F32] text-[10px] font-black uppercase tracking-widest rounded-full">
            {course.level}
          </span>
          <span className="text-[10px] font-bold text-[#A89F9B] uppercase tracking-wider">
            {course.duration}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-[#3B2E2A] mb-2 group-hover:text-[#FF7F32] transition-colors">
          {course.title.en}
        </h3>
        <p className="text-[#FF7F32]/60 text-xs font-bold italic mb-4">
          {course.title.hi}
        </p>
        
        <p className="text-[#635A56] text-sm font-semibold leading-relaxed line-clamp-3 mb-6 sm:mb-8">
          {course.description}
        </p>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between pt-6 border-t border-[#FEF7ED]">
        <span className="text-sm font-black text-[#FF7F32]">Learn More</span>
        <div className="w-10 h-10 rounded-full bg-[#3B2E2A] text-white flex items-center justify-center group-hover:bg-[#FF7F32] transition-colors">
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
