import Link from "next/link";
import { Clock, BarChart2, ArrowRight } from "lucide-react";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export default function CourseCard({ course, featured = false }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`group glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-[rgba(201,168,76,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] ${
        featured ? "lg:p-8" : ""
      }`}
      aria-label={`Learn more about ${course.title.en}`}
    >
      {/* Icon + Badge */}
      <div className="flex items-start justify-between">
        <div
          className={`flex items-center justify-center rounded-xl bg-gradient-to-br ${course.color} text-3xl ${
            featured ? "w-16 h-16" : "w-12 h-12"
          }`}
          style={{ border: "1px solid rgba(201,168,76,0.2)" }}
        >
          {course.icon}
        </div>
        <span
          className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(201, 168, 76, 0.1)",
            border: "1px solid rgba(201, 168, 76, 0.3)",
            color: "#C9A84C",
          }}
        >
          {course.level}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3
          className={`font-[family-name:var(--font-cinzel)] font-semibold text-[#F5F0E8] group-hover:text-[#E2C97E] transition-colors duration-300 ${
            featured ? "text-xl mb-1" : "text-base mb-1"
          }`}
        >
          {course.title.en}
        </h3>
        <p className="text-[#C9A84C]/70 text-xs font-[family-name:var(--font-cormorant)] italic tracking-wide">
          {course.title.hi}
        </p>
      </div>

      {/* Description */}
      <p className="text-[#C8BFAD]/80 text-sm leading-relaxed line-clamp-3">
        {course.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-[#C8BFAD]/60 mt-auto">
        <span className="flex items-center gap-1.5">
          <Clock size={12} className="text-[#C9A84C]/60" />
          {course.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <BarChart2 size={12} className="text-[#C9A84C]/60" />
          {course.level}
        </span>
      </div>

      {/* CTA */}
      <div
        className="flex items-center gap-2 text-sm font-semibold text-[#C9A84C] group-hover:text-[#E2C97E] transition-colors duration-300 pt-2 border-t"
        style={{ borderColor: "rgba(201, 168, 76, 0.1)" }}
      >
        <span>Learn More</span>
        <ArrowRight
          size={16}
          className="transform group-hover:translate-x-1 transition-transform duration-300"
        />
      </div>
    </Link>
  );
}
