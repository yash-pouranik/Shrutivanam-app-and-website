"use client";

import { useEffect, useMemo, useState } from "react";
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
    const init = async () => {
      await fetchUsers();
    };
    init();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionId(id);
    await fetch(`/api/users/${id}/${action}`, { method: "PATCH" });
    await fetchUsers();
    setActionId(null);
  };

  const pendingCount = useMemo(
    () => users.filter((u) => u.paymentStatus === "pending").length,
    [users],
  );

  const statusBadge = (status: User["paymentStatus"]) => {
    const styles: Record<User["paymentStatus"], { cls: string; label: string }> = {
      pending: { cls: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending" },
      paid: { cls: "bg-green-50 text-green-700 border-green-200", label: "Paid" },
      rejected: { cls: "bg-red-50 text-red-700 border-red-200", label: "Rejected" },
    };

    const s = styles[status];
    return (
      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${s.cls}`}>
        {s.label}
      </span>
    );
  };

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
        <h2 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
          Students
        </h2>
        <p className="text-slate-500 text-sm">
          {users.length} registered · {pendingCount} pending approval
        </p>
      </div>

      {users.length === 0 ? (
        <div className="rounded-2xl p-12 text-center bg-white border border-slate-200 shadow-sm">
          <UserCheck size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No students registered yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => {
            const isPending = user.paymentStatus === "pending";
            const isBusy = actionId === user._id;

            return (
              <div
                key={user._id}
                className={`rounded-2xl p-5 bg-white border shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 ${
                  isPending ? "border-amber-200" : "border-slate-200"
                }`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-orange-50 text-orange-700 border border-orange-100">
                  {user.name?.[0]?.toUpperCase() ?? "?"}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 font-semibold text-sm">{user.name}</p>
                  <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5 truncate">
                    <Mail size={11} />
                    <span className="truncate">{user.email}</span>
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    Registered: {new Date(user.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>

                {/* Status badge */}
                <div className="flex-shrink-0">{statusBadge(user.paymentStatus)}</div>

                {/* Screenshot link */}
                {user.paymentScreenshot && (
                  <a
                    href={user.paymentScreenshot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orange-700 hover:text-orange-800 underline underline-offset-2 flex-shrink-0"
                  >
                    View Screenshot
                  </a>
                )}

                {/* Actions */}
                {isPending ? (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleAction(user._id, "approve")}
                      disabled={isBusy}
                      id={`approve-${user._id}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-green-600 hover:bg-green-700 text-white shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <CheckCircle size={13} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(user._id, "reject")}
                      disabled={isBusy}
                      id={`reject-${user._id}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <XCircle size={13} />
                      Reject
                    </button>
                  </div>
                ) : user.paymentStatus === "paid" ? (
                  <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full flex-shrink-0">
                    <CheckCircle size={13} />
                    Active
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 flex-shrink-0">—</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
