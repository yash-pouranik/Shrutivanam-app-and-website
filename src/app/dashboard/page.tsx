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

  const stats = [
    {
      label: "Videos Available",
      value: totalVideos,
      icon: VideoIcon,
      href: "/dashboard/videos",
      tone: "orange" as const,
    },
    {
      label: "Upcoming Sessions",
      value: upcomingMeetings,
      icon: CalendarDays,
      href: "/dashboard/meetings",
      tone: "orange" as const,
    },
    {
      label: "Account Status",
      value: "Active",
      icon: BookOpen,
      href: undefined,
      tone: "green" as const,
    },
  ];

  const toneStyles = {
    orange: {
      wrap: "bg-orange-50 border-orange-100",
      icon: "text-orange-600",
    },
    green: {
      wrap: "bg-green-50 border-green-100",
      icon: "text-green-600",
    },
  } as const;

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p
          className="text-slate-500 text-xs tracking-widest uppercase font-semibold"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Welcome back
        </p>
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>
          {session?.user?.name}
        </h2>
        <p className="text-slate-600 italic text-sm" style={{ fontFamily: "var(--font-cormorant)" }}>
          &ldquo;सा विद्या या विमुक्तये&rdquo; — That which liberates is true knowledge.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, href, tone }) => {
          const cardClass =
            "rounded-2xl p-6 block bg-white border border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-orange-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-100";

          const inner = (
            <>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${toneStyles[tone].wrap}`}
              >
                <Icon size={18} className={toneStyles[tone].icon} />
              </div>
              <p
                className={`text-xl font-bold mb-1 ${
                  label === "Account Status" ? "text-green-700" : "text-slate-900"
                }`}
              >
                {value}
              </p>
              <p className="text-slate-500 text-xs">{label}</p>
            </>
          );

          return href ? (
            <a key={label} href={href} className={cardClass}>
              {inner}
            </a>
          ) : (
            <div key={label} className={cardClass}>
              {inner}
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm">
        <h3
          className="text-slate-900 font-semibold text-sm uppercase tracking-widest mb-4"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Quick Access
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href="/dashboard/videos"
            className="flex items-center gap-3 px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-orange-200 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-orange-50 border border-orange-100">
              <VideoIcon size={16} className="text-orange-600" />
            </div>
            <div>
              <p className="text-slate-900 text-sm font-semibold">Watch Videos</p>
              <p className="text-slate-500 text-xs">{totalVideos} lessons available</p>
            </div>
          </a>

          <a
            href="/dashboard/meetings"
            className="flex items-center gap-3 px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-orange-200 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-orange-50 border border-orange-100">
              <CalendarDays size={16} className="text-orange-600" />
            </div>
            <div>
              <p className="text-slate-900 text-sm font-semibold">Join Sessions</p>
              <p className="text-slate-500 text-xs">{upcomingMeetings} upcoming</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
