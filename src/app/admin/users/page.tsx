"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, UserCheck, Mail } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  paymentStatus: "pending" | "paid" | "rejected";
  isActive: boolean;
  createdAt: string;
  paymentScreenshot?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data.users ?? []);
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => { await fetchUsers(); };
    init();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionId(id);
    await fetch(`/api/users/${id}/${action}`, { method: "PATCH" });
    await fetchUsers();
    setActionId(null);
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: "rgba(251,191,36,0.1)", text: "#fbbf24", label: "Pending" },
      paid: { bg: "rgba(34,197,94,0.1)", text: "#4ade80", label: "Paid" },
      rejected: { bg: "rgba(239,68,68,0.1)", text: "#f87171", label: "Rejected" },
    };
    const s = styles[status] ?? styles.pending;
    return (
      <span
        className="text-xs font-semibold px-3 py-1 rounded-full capitalize"
        style={{ background: s.bg, color: s.text }}
      >
        {s.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-[#F5F0E8] mb-1"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Students
        </h1>
        <p className="text-[#C8BFAD]/50 text-sm">
          {users.length} registered · {users.filter((u) => u.paymentStatus === "pending").length} pending approval
        </p>
      </div>

      {users.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: "rgba(26,16,64,0.5)", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <UserCheck size={32} className="text-[#C9A84C]/40 mx-auto mb-3" />
          <p className="text-[#C8BFAD]/40">No students registered yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              style={{
                background: "rgba(26,16,64,0.6)",
                border: user.paymentStatus === "pending"
                  ? "1px solid rgba(251,191,36,0.25)"
                  : "1px solid rgba(201,168,76,0.12)",
              }}
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(31,21,88,0.5))",
                  color: "#C9A84C",
                  border: "1px solid rgba(201,168,76,0.3)",
                }}
              >
                {user.name[0].toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[#F5F0E8] font-semibold text-sm">{user.name}</p>
                <p className="text-[#C8BFAD]/50 text-xs flex items-center gap-1 mt-0.5">
                  <Mail size={11} />
                  {user.email}
                </p>
                <p className="text-[#C8BFAD]/30 text-xs mt-1">
                  Registered: {new Date(user.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>

              {/* Status badge */}
              <div>{statusBadge(user.paymentStatus)}</div>

              {/* Screenshot link */}
              {user.paymentScreenshot && (
                <a
                  href={user.paymentScreenshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C9A84C] hover:text-[#E2C97E] underline underline-offset-2"
                >
                  View Screenshot
                </a>
              )}

              {/* Actions */}
              {user.paymentStatus === "pending" && (
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleAction(user._id, "approve")}
                    disabled={actionId === user._id}
                    id={`approve-${user._id}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: "rgba(34,197,94,0.15)",
                      color: "#4ade80",
                      border: "1px solid rgba(34,197,94,0.3)",
                      opacity: actionId === user._id ? 0.5 : 1,
                    }}
                  >
                    <CheckCircle size={13} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(user._id, "reject")}
                    disabled={actionId === user._id}
                    id={`reject-${user._id}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      color: "#f87171",
                      border: "1px solid rgba(239,68,68,0.3)",
                      opacity: actionId === user._id ? 0.5 : 1,
                    }}
                  >
                    <XCircle size={13} />
                    Reject
                  </button>
                </div>
              )}

              {user.paymentStatus === "paid" && (
                <div className="flex items-center gap-1.5 text-xs text-green-400/70 flex-shrink-0">
                  <CheckCircle size={13} />
                  Active
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
