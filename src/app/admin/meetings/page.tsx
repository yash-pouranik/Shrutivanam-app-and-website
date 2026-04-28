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

const inputClass =
  "w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none bg-slate-50 border border-slate-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-colors";

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
          <h1 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
            Meetings
          </h1>
          <p className="text-slate-500 text-sm">
            {meetings.filter((m) => !isPast(m.scheduledAt)).length} upcoming
          </p>
        </div>
        <button
          onClick={() => setShowForm((p) => !p)}
          id="add-meeting-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-700 text-white transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancel" : "Add Meeting"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="rounded-2xl p-6 mb-6 bg-white border border-slate-200 shadow-sm">
          <h2 className="text-slate-900 font-semibold mb-5 text-sm uppercase tracking-widest">
            Schedule New Meeting
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">
                  Title *
                </label>
                <input required type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Yoga Session — Week 3" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">
                  Duration (minutes) *
                </label>
                <input required type="number" value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: Number(e.target.value) }))} min={15} max={480} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">Date &amp; Time *</label>
              <input required type="datetime-local" value={form.scheduledAt} onChange={(e) => setForm((p) => ({ ...p, scheduledAt: e.target.value }))} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">Zoom Join Link *</label>
              <input required type="url" value={form.joinUrl} onChange={(e) => setForm((p) => ({ ...p, joinUrl: e.target.value }))} placeholder="https://zoom.us/j/..." className={inputClass} />
              <p className="text-slate-400 text-xs mt-1.5">Create the meeting in Zoom app → Copy invite link → Paste here</p>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">Description</label>
              <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} placeholder="Topics covered, preparation needed..." className={`${inputClass} resize-none`} />
            </div>

            <button
              type="submit"
              disabled={saving}
              id="save-meeting-btn"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white transition-colors"
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
          <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
        </div>
      ) : meetings.length === 0 ? (
        <div className="rounded-2xl p-12 text-center bg-white border border-slate-200 shadow-sm">
          <CalendarDays size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400">No meetings scheduled yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {meetings.map((meeting) => {
            const past = isPast(meeting.scheduledAt);
            return (
              <div
                key={meeting._id}
                className={`rounded-2xl p-5 flex items-center gap-4 bg-white border transition-opacity shadow-sm ${
                  past ? "border-slate-100 opacity-60" : "border-slate-200"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${past ? "bg-slate-100" : "bg-orange-100"}`}>
                  <CalendarDays size={16} className={past ? "text-slate-400" : "text-orange-600"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-900 font-semibold text-sm truncate">{meeting.title}</p>
                    {past && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-bold uppercase">
                        Past
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <CalendarDays size={11} />
                      {new Date(meeting.scheduledAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Clock size={11} />
                      {new Date(meeting.scheduledAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="text-slate-400 text-xs">{meeting.duration} min</span>
                  </div>
                </div>
                <a href={meeting.joinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 flex-shrink-0 font-semibold">
                  <ExternalLink size={12} />
                  Open Link
                </a>
                <button onClick={() => handleDelete(meeting._id)} disabled={deletingId === meeting._id} className="p-2 rounded-xl flex-shrink-0 hover:bg-red-50 transition-colors text-red-400 hover:text-red-600">
                  {deletingId === meeting._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
