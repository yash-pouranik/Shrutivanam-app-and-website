"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, CalendarDays, Clock, Loader2, X, ExternalLink } from "lucide-react";

interface Meeting {
  _id: string;
  title: string;
  description?: string;
  joinUrl: string;
  scheduledAt: string;
  duration: number;
  createdAt: string;
}

const inputStyle = {
  background: "rgba(13, 11, 30, 0.6)",
  border: "1px solid rgba(201, 168, 76, 0.2)",
};

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    joinUrl: "",
    scheduledAt: "",
    duration: 60,
  });

  const fetchMeetings = async () => {
    const res = await fetch("/api/meetings");
    const data = await res.json();
    setMeetings(data.meetings ?? []);
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => { await fetchMeetings(); };
    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setShowForm(false);
      setForm({ title: "", description: "", joinUrl: "", scheduledAt: "", duration: 60 });
      await fetchMeetings();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this meeting?")) return;
    setDeletingId(id);
    await fetch(`/api/meetings/${id}`, { method: "DELETE" });
    await fetchMeetings();
    setDeletingId(null);
  };

  const isPast = (dateStr: string) => new Date(dateStr) < new Date();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold text-[#F5F0E8] mb-1"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Meetings
          </h1>
          <p className="text-[#C8BFAD]/50 text-sm">
            {meetings.filter((m) => !isPast(m.scheduledAt)).length} upcoming
          </p>
        </div>
        <button
          onClick={() => setShowForm((p) => !p)}
          id="add-meeting-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{
            background: "linear-gradient(135deg, #C9A84C, #E2C97E)",
            color: "#0d0b1e",
          }}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancel" : "Add Meeting"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: "rgba(26,16,64,0.7)",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          <h2 className="text-[#E2C97E] font-semibold mb-5 text-sm uppercase tracking-widest">
            Schedule New Meeting
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2">
                  Title *
                </label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Yoga Session — Week 3"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2">
                  Duration (minutes) *
                </label>
                <input
                  required
                  type="number"
                  value={form.duration}
                  onChange={(e) => setForm((p) => ({ ...p, duration: Number(e.target.value) }))}
                  min={15}
                  max={480}
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] outline-none"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2">
                Date & Time *
              </label>
              <input
                required
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) => setForm((p) => ({ ...p, scheduledAt: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] outline-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2">
                Zoom Join Link *
              </label>
              <input
                required
                type="url"
                value={form.joinUrl}
                onChange={(e) => setForm((p) => ({ ...p, joinUrl: e.target.value }))}
                placeholder="https://zoom.us/j/..."
                className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none"
                style={inputStyle}
              />
              <p className="text-[#C8BFAD]/30 text-xs mt-1.5">
                Create the meeting in Zoom app → Copy invite link → Paste here
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={2}
                placeholder="Topics covered, preparation needed..."
                className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none resize-none"
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              id="save-meeting-btn"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #E2C97E)",
                color: "#0d0b1e",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              {saving ? "Saving…" : "Schedule Meeting"}
            </button>
          </form>
        </div>
      )}

      {/* Meeting List */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
        </div>
      ) : meetings.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: "rgba(26,16,64,0.5)", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <CalendarDays size={32} className="text-[#C9A84C]/40 mx-auto mb-3" />
          <p className="text-[#C8BFAD]/40">No meetings scheduled yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {meetings.map((meeting) => {
            const past = isPast(meeting.scheduledAt);
            return (
              <div
                key={meeting._id}
                className="rounded-2xl p-5 flex items-center gap-4"
                style={{
                  background: "rgba(26,16,64,0.6)",
                  border: `1px solid ${past ? "rgba(201,168,76,0.08)" : "rgba(201,168,76,0.2)"}`,
                  opacity: past ? 0.6 : 1,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: past ? "rgba(201,168,76,0.05)" : "rgba(201,168,76,0.12)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  <CalendarDays size={16} className="text-[#C9A84C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[#F5F0E8] font-semibold text-sm truncate">{meeting.title}</p>
                    {past && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(201,168,76,0.08)] text-[#C8BFAD]/40">
                        Past
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[#C8BFAD]/50 text-xs flex items-center gap-1">
                      <CalendarDays size={11} />
                      {new Date(meeting.scheduledAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                    <span className="text-[#C8BFAD]/50 text-xs flex items-center gap-1">
                      <Clock size={11} />
                      {new Date(meeting.scheduledAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                    <span className="text-[#C8BFAD]/40 text-xs">{meeting.duration} min</span>
                  </div>
                </div>
                <a
                  href={meeting.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-[#C9A84C] hover:text-[#E2C97E] flex-shrink-0"
                >
                  <ExternalLink size={12} />
                  Open Link
                </a>
                <button
                  onClick={() => handleDelete(meeting._id)}
                  disabled={deletingId === meeting._id}
                  className="p-2 rounded-xl flex-shrink-0 hover:bg-red-500/10 transition-colors"
                  style={{ color: "rgba(248,113,113,0.5)" }}
                >
                  {deletingId === meeting._id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
