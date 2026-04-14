"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Video, PlayCircle, Link2, Loader2, X, GripVertical } from "lucide-react";

interface VideoItem {
  _id: string;
  title: string;
  description?: string;
  type: "upload" | "youtube" | "link";
  url: string;
  thumbnail?: string;
  order: number;
  createdAt: string;
}

const typeIcon = (type: string) => {
  if (type === "youtube") return <PlayCircle size={14} className="text-red-400" />;
  if (type === "upload") return <Video size={14} className="text-[#C9A84C]" />;
  return <Link2 size={14} className="text-blue-400" />;
};

const inputStyle = {
  background: "rgba(13, 11, 30, 0.6)",
  border: "1px solid rgba(201, 168, 76, 0.2)",
};

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "youtube" as "upload" | "youtube" | "link",
    url: "",
    order: 0,
  });
  const [file, setFile] = useState<File | null>(null);

  const fetchVideos = async () => {
    const res = await fetch("/api/videos");
    const data = await res.json();
    setVideos(data.videos ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const uploadToCloudinary = async (): Promise<string> => {
    if (!file) throw new Error("No file selected");

    // Get signed params from server
    const sigRes = await fetch("/api/upload");
    const { timestamp, signature, apiKey, cloudName, folder } = await sigRes.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("api_key", apiKey);
    formData.append("folder", folder);

    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          setUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        if (response.secure_url) resolve(response.secure_url);
        else reject(new Error("Upload failed"));
      });
      xhr.addEventListener("error", () => reject(new Error("Upload failed")));
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`);
      xhr.send(formData);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setUploadProgress(0);

    try {
      let url = form.url;

      if (form.type === "upload") {
        url = await uploadToCloudinary();
      }

      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, url }),
      });

      if (res.ok) {
        setShowForm(false);
        setForm({ title: "", description: "", type: "youtube", url: "", order: 0 });
        setFile(null);
        await fetchVideos();
      }
    } finally {
      setSaving(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    setDeletingId(id);
    await fetch(`/api/videos/${id}`, { method: "DELETE" });
    await fetchVideos();
    setDeletingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold text-[#F5F0E8] mb-1"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Videos
          </h1>
          <p className="text-[#C8BFAD]/50 text-sm">{videos.length} videos available</p>
        </div>
        <button
          onClick={() => setShowForm((p) => !p)}
          id="add-video-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{
            background: "linear-gradient(135deg, #C9A84C, #E2C97E)",
            color: "#0d0b1e",
          }}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancel" : "Add Video"}
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
            Add New Video
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
                  placeholder="Video title"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
                  min={0}
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] outline-none"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={2}
                placeholder="Brief description..."
                className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none resize-none"
                style={inputStyle}
              />
            </div>

            {/* Type selector */}
            <div>
              <label className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2">
                Video Source *
              </label>
              <div className="flex gap-3">
                {(["youtube", "link", "upload"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, type: t }))}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all"
                    style={{
                      background: form.type === t
                        ? "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(31,21,88,0.5))"
                        : "rgba(13,11,30,0.6)",
                      color: form.type === t ? "#E2C97E" : "rgba(200,191,173,0.5)",
                      border: form.type === t
                        ? "1px solid rgba(201,168,76,0.4)"
                        : "1px solid rgba(201,168,76,0.15)",
                    }}
                  >
                    {t === "youtube" && <PlayCircle size={13} />}
                    {t === "link" && <Link2 size={13} />}
                    {t === "upload" && <Video size={13} />}
                    {t === "youtube" ? "YouTube" : t === "link" ? "External Link" : "Upload File"}
                  </button>
                ))}
              </div>
            </div>

            {/* URL or File input */}
            {form.type === "upload" ? (
              <div>
                <label className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2">
                  Video File *
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  required
                  className="w-full text-sm text-[#C8BFAD]/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:text-[#0d0b1e] file:cursor-pointer"
                  style={{
                    ...inputStyle,
                    padding: "10px 16px",
                    borderRadius: "12px",
                    ["--file-bg" as string]: "rgba(201,168,76,1)",
                  }}
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden bg-[rgba(201,168,76,0.1)]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${uploadProgress}%`,
                        background: "linear-gradient(90deg, #C9A84C, #E2C97E)",
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase mb-2">
                  {form.type === "youtube" ? "YouTube URL *" : "Video URL *"}
                </label>
                <input
                  required
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
                  placeholder={
                    form.type === "youtube"
                      ? "https://youtube.com/watch?v=..."
                      : "https://..."
                  }
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F5F0E8] placeholder-[#C8BFAD]/30 outline-none"
                  style={inputStyle}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              id="save-video-btn"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #E2C97E)",
                color: "#0d0b1e",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              {saving
                ? form.type === "upload"
                  ? `Uploading ${uploadProgress}%…`
                  : "Saving…"
                : "Save Video"}
            </button>
          </form>
        </div>
      )}

      {/* Video List */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
        </div>
      ) : videos.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: "rgba(26,16,64,0.5)", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <Video size={32} className="text-[#C9A84C]/40 mx-auto mb-3" />
          <p className="text-[#C8BFAD]/40">No videos added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {videos.map((video) => (
            <div
              key={video._id}
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{
                background: "rgba(26,16,64,0.6)",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              <GripVertical size={16} className="text-[#C8BFAD]/20 flex-shrink-0" />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                {typeIcon(video.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#F5F0E8] font-semibold text-sm truncate">{video.title}</p>
                {video.description && (
                  <p className="text-[#C8BFAD]/40 text-xs mt-0.5 truncate">{video.description}</p>
                )}
                <p className="text-[#C8BFAD]/30 text-xs mt-1 capitalize">{video.type} · Order: {video.order}</p>
              </div>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C9A84C] hover:text-[#E2C97E] underline underline-offset-2 flex-shrink-0"
              >
                Preview
              </a>
              <button
                onClick={() => handleDelete(video._id)}
                disabled={deletingId === video._id}
                className="p-2 rounded-xl flex-shrink-0 transition-colors hover:bg-red-500/10"
                style={{ color: "rgba(248,113,113,0.5)" }}
              >
                {deletingId === video._id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
