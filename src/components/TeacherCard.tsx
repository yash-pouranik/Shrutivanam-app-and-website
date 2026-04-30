import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Teacher } from "@/data/teachers";

interface TeacherCardProps {
  teacher: Teacher;
  detailed?: boolean;
}

export default function TeacherCard({ teacher, detailed = false }: TeacherCardProps) {
  return (
    <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 border border-[#EBDBCD] hover:border-[#FF7F32] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center">
      {/* Photo */}
      <div className="relative mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] sm:rounded-[35px] overflow-hidden border-4 border-[#FEF7ED] shadow-lg shadow-orange-100 group">
          <Image
            src={teacher.photo}
            alt={`Photo of ${teacher.name}`}
            width={112}
            height={112}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Name & Subject */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-black text-[#3B2E2A] mb-1">
          {teacher.name}
        </h3>
        <p className="text-[#FF7F32] text-xs sm:text-sm font-black uppercase tracking-widest">
          {teacher.subject}
        </p>
        <p className="text-[#A89F9B] text-xs font-bold italic">
          {teacher.subjectHi}
        </p>
      </div>

      {/* Credentials */}
      <div className="px-4 py-2 bg-[#FEF7ED] rounded-2xl mb-6">
        <p className="text-xs text-[#635A56] font-bold">
          {teacher.credentials}
        </p>
      </div>

      {/* Bio */}
      <p className={`text-[#635A56] text-sm font-semibold leading-relaxed mb-6 sm:mb-8 ${detailed ? "" : "line-clamp-3"}`}>
        {teacher.bio}
      </p>

      {/* Course link */}
      <Link
        href={`/courses/${teacher.courseSlug}`}
        className="mt-auto group flex items-center gap-2 text-sm font-black text-[#FF7F32] hover:text-[#3B2E2A] transition-colors"
      >
        <span>View Course</span>
        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center transition-transform group-hover:translate-x-1">
          <ArrowRight size={14} />
        </div>
      </Link>
    </div>
  );
}
