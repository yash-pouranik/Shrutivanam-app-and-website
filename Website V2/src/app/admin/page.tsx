import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Video from "@/models/Video";
import Meeting from "@/models/Meeting";
import { Users, Video as VideoIcon, CalendarDays, Clock } from "lucide-react";

export default async function AdminOverviewPage() {
  const session = await auth();
  await connectDB();

  const [totalStudents, pendingStudents, totalVideos, upcomingMeetings] = await Promise.all([
    User.countDocuments({ role: "student" }),
    User.countDocuments({ role: "student", paymentStatus: "pending" }),
    Video.countDocuments(),
    Meeting.countDocuments({ scheduledAt: { $gte: new Date() } }),
  ]);

  const stats = [
    {
      label: "Total Students",
      value: totalStudents,
      icon: Users,
      tone: "slate" as const,
    },
    {
      label: "Pending Approvals",
      value: pendingStudents,
      icon: Clock,
      tone: pendingStudents > 0 ? ("orange" as const) : ("slate" as const),
    },
    {
      label: "Videos",
      value: totalVideos,
      icon: VideoIcon,
      tone: "slate" as const,
    },
    {
      label: "Upcoming Meetings",
      value: upcomingMeetings,
      icon: CalendarDays,
      tone: "slate" as const,
    },
  ];

  const toneStyles = {
    slate: {
      wrap: "bg-slate-100 border-slate-200",
      icon: "text-slate-700",
    },
    orange: {
      wrap: "bg-orange-50 border-orange-100",
      icon: "text-orange-600",
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
        <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>
          Command Center
        </h2>
        <p className="text-slate-600 text-sm">
          {session?.user?.name ? `Hello, ${session.user.name}. ` : ""}Here&apos;s the platform overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div
            key={label}
            className={`rounded-2xl p-6 bg-white border shadow-sm ${
              label === "Pending Approvals" && pendingStudents > 0
                ? "border-orange-200 ring-4 ring-orange-50"
                : "border-slate-200"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${toneStyles[tone].wrap}`}>
              <Icon size={18} className={toneStyles[tone].icon} />
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
            <p className="text-slate-500 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Pending Alert */}
      {pendingStudents > 0 && (
        <div className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 bg-orange-50 border border-orange-200">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-orange-100 flex-shrink-0">
            <Clock size={18} className="text-orange-600" />
          </div>
          <div className="min-w-0">
            <p className="text-orange-900 font-semibold text-sm">
              {pendingStudents} student{pendingStudents > 1 ? "s" : ""} awaiting payment approval
            </p>
            <p className="text-orange-800/80 text-xs mt-0.5">Go to Users → review and approve/reject</p>
          </div>
          <a
            href="/admin/users"
            className="sm:ml-auto text-xs font-semibold px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-sm transition-colors flex-shrink-0"
          >
            Review Now →
          </a>
        </div>
      )}
    </div>
  );
}
