import Image from "next/image";
import Link from "next/link";
import type { Teacher } from "@/data/teachers";

interface TeacherCardProps {
  teacher: Teacher;
  detailed?: boolean;
}

export default function TeacherCard({ teacher, detailed = false }: TeacherCardProps) {
  return (
    <div className="group rounded-2xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Photo */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-200 shadow-sm bg-slate-100">
          <Image
            src={teacher.photo}
            alt={`Photo of ${teacher.name}`}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(234,88,12,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Name & Subject */}
      <div>
        <h3 className="font-[family-name:var(--font-cinzel)] font-semibold text-slate-900 text-base mb-0.5">
          {teacher.name}
        </h3>
        <p className="text-orange-700 text-sm font-semibold">{teacher.subject}</p>
        <p className="text-slate-500 text-xs font-[family-name:var(--font-cormorant)] italic">
          {teacher.subjectHi}
        </p>
      </div>

      {/* Credentials */}
      <p className="text-xs text-slate-600 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
        {teacher.credentials}
      </p>

      {/* Bio */}
      {detailed ? (
        <p className="text-slate-600 text-sm leading-relaxed">{teacher.bio}</p>
      ) : (
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{teacher.bio}</p>
      )}

      {/* Course link */}
      <Link
        href={`/courses/${teacher.courseSlug}`}
        className="text-xs font-semibold tracking-wider text-orange-700 hover:text-orange-800 transition-colors duration-200 border-b border-orange-200 hover:border-orange-400 pb-0.5"
      >
        View Course →
      </Link>
    </div>
  );
}
