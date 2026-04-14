import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Video from "@/models/Video";
import Meeting from "@/models/Meeting";
import { Users, Video as VideoIcon, CalendarDays, Clock } from "lucide-react";

export default async function AdminOverviewPage() {
  const session = await auth();
  await connectDB();

  const [totalStudents, pendingStudents, totalVideos, upcomingMeetings] =
    await Promise.all([
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
      color: "#C9A84C",
    },
    {
      label: "Pending Approvals",
      value: pendingStudents,
      icon: Clock,
      color: pendingStudents > 0 ? "#f97316" : "#C9A84C",
    },
    {
      label: "Videos",
      value: totalVideos,
      icon: VideoIcon,
      color: "#C9A84C",
    },
    {
      label: "Upcoming Meetings",
      value: upcomingMeetings,
      icon: CalendarDays,
      color: "#C9A84C",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-[#F5F0E8] mb-1"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Command Center
        </h1>
        <p className="text-[#C8BFAD]/50 text-sm">
          Welcome back, {session?.user?.name}. Here&apos;s the platform overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl p-6"
            style={{
              background: "rgba(26,16,64,0.6)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: `${color}18`,
                border: `1px solid ${color}33`,
              }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <p className="text-3xl font-bold text-[#F5F0E8] mb-1">{value}</p>
            <p className="text-[#C8BFAD]/50 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Pending Alert */}
      {pendingStudents > 0 && (
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{
            background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.3)",
          }}
        >
          <Clock size={20} className="text-orange-400 flex-shrink-0" />
          <div>
            <p className="text-orange-300 font-semibold text-sm">
              {pendingStudents} student{pendingStudents > 1 ? "s" : ""} awaiting payment approval
            </p>
            <p className="text-orange-300/60 text-xs mt-0.5">
              Go to Users → review and approve/reject
            </p>
          </div>
          <a
            href="/admin/users"
            className="ml-auto text-xs font-semibold px-4 py-2 rounded-xl flex-shrink-0"
            style={{
              background: "rgba(249,115,22,0.2)",
              color: "#fb923c",
              border: "1px solid rgba(249,115,22,0.3)",
            }}
          >
            Review Now →
          </a>
        </div>
      )}
    </div>
  );
}
