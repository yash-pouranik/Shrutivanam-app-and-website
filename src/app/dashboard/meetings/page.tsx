"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, ExternalLink, Video } from "lucide-react";

interface Meeting {
  _id: string;
  title: string;
  description?: string;
  joinUrl: string;
  scheduledAt: string;
  duration: number;
}

export default function DashboardMeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/meetings")
      .then((r) => r.json())
      .then((d) => {
        setMeetings(d.meetings ?? []);
        setLoading(false);
      });
  }, []);

  const isPast = (dateStr: string) => new Date(dateStr) < new Date();
  const isNow = (dateStr: string, duration: number) => {
    const start = new Date(dateStr);
    const end = new Date(start.getTime() + duration * 60000);
    const now = new Date();
    return now >= start && now <= end;
  };

  const upcoming = meetings.filter((m) => !isPast(m.scheduledAt));
  const past = meetings.filter((m) => isPast(m.scheduledAt));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
      </div>
    );
  }

  const MeetingCard = ({ meeting, showPast = false }: { meeting: Meeting; showPast?: boolean }) => {
    const live = isNow(meeting.scheduledAt, meeting.duration);
    return (
      <div
        className="rounded-2xl p-6"
        style={{
          background: live
            ? "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(26,16,64,0.6))"
            : "rgba(26,16,64,0.6)",
          border: live
            ? "1px solid rgba(34,197,94,0.3)"
            : showPast
            ? "1px solid rgba(201,168,76,0.08)"
            : "1px solid rgba(201,168,76,0.2)",
          opacity: showPast ? 0.6 : 1,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: live ? "rgba(34,197,94,0.15)" : "rgba(201,168,76,0.1)",
                border: live
                  ? "1px solid rgba(34,197,94,0.3)"
                  : "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <Video size={18} className={live ? "text-green-400" : "text-[#C9A84C]"} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {live && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
                    style={{ background: "rgba(34,197,94,0.2)", color: "#4ade80" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    LIVE NOW
                  </span>
                )}
                {showPast && !live && (
                  <span className="text-xs px-2 py-0.5 rounded-full text-[#C8BFAD]/30 bg-[rgba(201,168,76,0.05)]">
                    Ended
                  </span>
                )}
              </div>
              <h3
                className="text-[#F5F0E8] font-semibold text-base"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {meeting.title}
              </h3>
              {meeting.description && (
                <p className="text-[#C8BFAD]/50 text-xs mt-1 leading-relaxed">
                  {meeting.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-3">
                <span className="text-[#C8BFAD]/50 text-xs flex items-center gap-1.5">
                  <CalendarDays size={12} />
                  {new Date(meeting.scheduledAt).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="text-[#C8BFAD]/50 text-xs flex items-center gap-1.5">
                  <Clock size={12} />
                  {new Date(meeting.scheduledAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="text-[#C8BFAD]/40 text-xs">{meeting.duration} min</span>
              </div>
            </div>
          </div>

          {/* Join Button */}
          {!showPast && (
            <a
              href={meeting.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: live
                  ? "linear-gradient(135deg, #4ade80, #22c55e)"
                  : "linear-gradient(135deg, #C9A84C, #E2C97E)",
                color: "#0d0b1e",
                boxShadow: live ? "0 4px 20px rgba(34,197,94,0.3)" : "none",
              }}
            >
              <ExternalLink size={14} />
              {live ? "Join Now" : "Join Link"}
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-[#F5F0E8] mb-1"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Live Sessions
        </h1>
        <p className="text-[#C8BFAD]/50 text-sm">
          {upcoming.length} upcoming · {past.length} past
        </p>
      </div>

      {/* Upcoming */}
      {upcoming.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center mb-8"
          style={{ background: "rgba(26,16,64,0.5)", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <CalendarDays size={32} className="text-[#C9A84C]/40 mx-auto mb-3" />
          <p className="text-[#C8BFAD]/40">No upcoming sessions scheduled yet.</p>
          <p className="text-[#C8BFAD]/30 text-xs mt-1">Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-4 mb-10">
          {upcoming.map((m) => (
            <MeetingCard key={m._id} meeting={m} />
          ))}
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h2
            className="text-[#C8BFAD]/30 text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Past Sessions
          </h2>
          <div className="space-y-3">
            {past.map((m) => (
              <MeetingCard key={m._id} meeting={m} showPast />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
