"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, Phone, BookOpen, Loader2, MailOpen, Mail as MailIcon } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  course?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data.messages ?? []);
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      await fetchMessages();
    };
    init();
  }, []);

  const handleToggleRead = async (id: string, isRead: boolean) => {
    setActionId(id);
    await fetch(`/api/messages/${id}/read`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead }),
    });
    await fetchMessages();
    setActionId(null);
  };

  const unreadCount = useMemo(
    () => messages.filter((m) => !m.isRead).length,
    [messages]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
          Messages
        </h2>
        <p className="text-slate-500 text-sm">
          {messages.length} total · {unreadCount} unread
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-2xl p-12 text-center bg-white border border-slate-200 shadow-sm">
          <MailIcon size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`rounded-2xl p-5 bg-white border shadow-sm flex flex-col gap-4 ${
                msg.isRead ? "border-slate-200" : "border-orange-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 bg-orange-50 text-orange-700 border border-orange-100">
                  {msg.name?.[0]?.toUpperCase() ?? "?"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-slate-900 font-semibold text-sm">{msg.name}</p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${
                        msg.isRead
                          ? "bg-slate-50 text-slate-500 border-slate-200"
                          : "bg-orange-50 text-orange-700 border-orange-200"
                      }`}
                    >
                      {msg.isRead ? "Read" : "Unread"}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs flex items-center gap-1 mt-1 break-words">
                    <Mail size={11} />
                    <span className="break-words">{msg.email}</span>
                  </p>
                  {msg.phone && (
                    <p className="text-slate-500 text-xs flex items-center gap-1 mt-1 break-words">
                      <Phone size={11} />
                      <span className="break-words">{msg.phone}</span>
                    </p>
                  )}
                  {msg.course && (
                    <p className="text-slate-500 text-xs flex items-center gap-1 mt-1">
                      <BookOpen size={11} />
                      {msg.course}
                    </p>
                  )}
                  <p className="text-slate-400 text-xs mt-2">
                    {new Date(msg.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <button
                  onClick={() => handleToggleRead(msg._id, !msg.isRead)}
                  disabled={actionId === msg._id}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed self-start"
                >
                  {actionId === msg._id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : msg.isRead ? (
                    <MailIcon size={13} />
                  ) : (
                    <MailOpen size={13} />
                  )}
                  {msg.isRead ? "Mark Unread" : "Mark Read"}
                </button>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700 leading-relaxed break-words">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
