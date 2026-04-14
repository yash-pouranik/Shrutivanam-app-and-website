import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Video from "@/models/Video";
import Meeting from "@/models/Meeting";
import { Video as VideoIcon, CalendarDays, BookOpen } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  await connectDB();

  const [totalVideos, upcomingMeetings] = await Promise.all([
    Video.countDocuments(),
    Meeting.countDocuments({ scheduledAt: { $gte: new Date() } }),
  ]);

  return (
    <div>
      <div className="mb-8">
        <p
          className="text-[#C9A84C] text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          🙏 Welcome back
        </p>
        <h1
          className="text-3xl font-bold text-[#F5F0E8] mb-2"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {session?.user?.name}
        </h1>
        <p
          className="text-[#C9A84C]/80 italic text-lg"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          &ldquo;सा विद्या या विमुक्तये&rdquo; — That which liberates is true knowledge.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          {
            label: "Videos Available",
            value: totalVideos,
            icon: VideoIcon,
            href: "/dashboard/videos",
          },
          {
            label: "Upcoming Sessions",
            value: upcomingMeetings,
            icon: CalendarDays,
            href: "/dashboard/meetings",
          },
          {
            label: "Account Status",
            value: "Active",
            icon: BookOpen,
            href: "#",
          },
        ].map(({ label, value, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            className="rounded-2xl p-6 block transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "rgba(26,16,64,0.6)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <Icon size={18} className="text-[#C9A84C]" />
            </div>
            <p className="text-3xl font-bold text-[#F5F0E8] mb-1">{value}</p>
            <p className="text-[#C8BFAD]/50 text-xs">{label}</p>
          </a>
        ))}
      </div>

      {/* Quick Links */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(31,21,88,0.3))",
          border: "1px solid rgba(201,168,76,0.2)",
        }}
      >
        <h2
          className="text-[#E2C97E] font-semibold text-sm uppercase tracking-widest mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Quick Access
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href="/dashboard/videos"
            className="flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 hover:scale-[1.01]"
            style={{
              background: "rgba(13,11,30,0.5)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <VideoIcon size={18} className="text-[#C9A84C]" />
            <div>
              <p className="text-[#F5F0E8] text-sm font-semibold">Watch Videos</p>
              <p className="text-[#C8BFAD]/40 text-xs">{totalVideos} lessons available</p>
            </div>
          </a>
          <a
            href="/dashboard/meetings"
            className="flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 hover:scale-[1.01]"
            style={{
              background: "rgba(13,11,30,0.5)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <CalendarDays size={18} className="text-[#C9A84C]" />
            <div>
              <p className="text-[#F5F0E8] text-sm font-semibold">Join Sessions</p>
              <p className="text-[#C8BFAD]/40 text-xs">{upcomingMeetings} upcoming</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
