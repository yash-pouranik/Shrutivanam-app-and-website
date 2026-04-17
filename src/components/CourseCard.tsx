import Link from "next/link";
import { ArrowRight, BarChart2, Clock } from "lucide-react";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export default function CourseCard({ course, featured = false }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      aria-label={`Learn more about ${course.title.en}`}
      className={`group h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-100 ${
        featured ? "lg:p-8" : ""
      }`}
    >
      {/* Icon + Badge */}
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex items-center justify-center rounded-xl bg-gradient-to-br ${course.color} text-3xl ring-1 ring-slate-200/70 ${
            featured ? "w-16 h-16" : "w-12 h-12"
          }`}
        >
          {course.icon}
        </div>
        <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600">
          {course.level}
        </span>
      </div>

      {/* Title */}
      <div className="mt-4">
        <h3
          className={`font-[family-name:var(--font-cinzel)] font-semibold text-slate-900 group-hover:text-orange-700 transition-colors ${
            featured ? "text-xl mb-1" : "text-base mb-1"
          }`}
        >
          {course.title.en}
        </h3>
        <p className="text-slate-500 text-xs font-[family-name:var(--font-cormorant)] italic tracking-wide">
          {course.title.hi}
        </p>
      </div>

      {/* Description */}
      <p className="mt-3 text-slate-600 text-sm leading-relaxed line-clamp-3">
        {course.description}
      </p>

      {/* Meta */}
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Clock size={12} className="text-orange-600/70" />
          {course.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <BarChart2 size={12} className="text-orange-600/70" />
          {course.level}
        </span>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-orange-700 pt-3 border-t border-slate-100">
          <span>Learn More</span>
          <ArrowRight
            size={16}
            className="transform group-hover:translate-x-1 transition-transform duration-200"
          />
        </div>
      </div>
    </Link>
  );
}
