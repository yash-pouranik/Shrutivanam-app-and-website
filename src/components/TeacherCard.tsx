import Image from "next/image";
import Link from "next/link";
import type { Teacher } from "@/data/teachers";

interface TeacherCardProps {
  teacher: Teacher;
  detailed?: boolean;
}

export default function TeacherCard({ teacher, detailed = false }: TeacherCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-[rgba(201,168,76,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
      {/* Photo */}
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full overflow-hidden border-2 shadow-[0_0_20px_rgba(201,168,76,0.2)]"
          style={{ borderColor: "rgba(201, 168, 76, 0.4)" }}
        >
          <Image
            src={teacher.photo}
            alt={`Photo of ${teacher.name}`}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Gold ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(201,168,76,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Name & Subject */}
      <div>
        <h3 className="font-[family-name:var(--font-cinzel)] font-semibold text-[#F5F0E8] text-base mb-0.5">
          {teacher.name}
        </h3>
        <p className="text-[#C9A84C] text-sm font-medium">
          {teacher.subject}
        </p>
        <p className="text-[#C9A84C]/50 text-xs font-[family-name:var(--font-cormorant)] italic">
          {teacher.subjectHi}
        </p>
      </div>

      {/* Credentials */}
      <p
        className="text-xs text-[#C8BFAD]/60 px-2 py-1 rounded-full"
        style={{
          background: "rgba(201, 168, 76, 0.06)",
          border: "1px solid rgba(201, 168, 76, 0.15)",
        }}
      >
        {teacher.credentials}
      </p>

      {/* Bio */}
      {detailed ? (
        <p className="text-[#C8BFAD]/75 text-sm leading-relaxed">
          {teacher.bio}
        </p>
      ) : (
        <p className="text-[#C8BFAD]/75 text-sm leading-relaxed line-clamp-3">
          {teacher.bio}
        </p>
      )}

      {/* Course link */}
      <Link
        href={`/courses/${teacher.courseSlug}`}
        className="text-xs font-semibold tracking-wider text-[#C9A84C] hover:text-[#E2C97E] transition-colors duration-200 border-b border-[rgba(201,168,76,0.3)] hover:border-[#C9A84C] pb-0.5"
      >
        View Course →
      </Link>
    </div>
  );
}
