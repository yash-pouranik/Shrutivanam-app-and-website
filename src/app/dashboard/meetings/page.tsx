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
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const MeetingCard = ({ meeting, showPast = false }: { meeting: Meeting; showPast?: boolean }) => {
    const live = isNow(meeting.scheduledAt, meeting.duration);
    return (
      <div
        className={`rounded-2xl p-6 bg-white border shadow-sm transition-opacity ${
          live ? "border-green-300" : showPast ? "border-slate-100 opacity-60" : "border-slate-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                live ? "bg-green-100" : "bg-orange-100"
              }`}
            >
              <Video size={18} className={live ? "text-green-600" : "text-orange-600"} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {live && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 bg-green-100 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    LIVE NOW
                  </span>
                )}
                {showPast && !live && (
                  <span className="text-xs px-2 py-0.5 rounded-full text-slate-400 bg-slate-100 font-bold uppercase">
                    Ended
                  </span>
                )}
              </div>
              <h3 className="text-slate-900 font-semibold text-base" style={{ fontFamily: "var(--font-cinzel)" }}>
                {meeting.title}
              </h3>
              {meeting.description && (
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{meeting.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="text-slate-400 text-xs flex items-center gap-1.5">
                  <CalendarDays size={12} />
                  {new Date(meeting.scheduledAt).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                </span>
                <span className="text-slate-400 text-xs flex items-center gap-1.5">
                  <Clock size={12} />
                  {new Date(meeting.scheduledAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="text-slate-400 text-xs">{meeting.duration} min</span>
              </div>
            </div>
          </div>

          {/* Join Button */}
          {!showPast && (
            <a
              href={meeting.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors w-full sm:w-auto ${
                live
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-sm"
                  : "bg-orange-600 hover:bg-orange-700 text-white"
              }`}
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
        <h1 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
          Live Sessions
        </h1>
        <p className="text-slate-500 text-sm">
          {upcoming.length} upcoming · {past.length} past
        </p>
      </div>

      {/* Upcoming */}
      {upcoming.length === 0 ? (
        <div className="rounded-2xl p-12 text-center mb-8 bg-white border border-slate-200 shadow-sm">
          <CalendarDays size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400">No upcoming sessions scheduled yet.</p>
          <p className="text-slate-300 text-xs mt-1">Check back soon!</p>
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
          <h2 className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-cinzel)" }}>
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
