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
  if (type === "youtube") return <PlayCircle size={14} className="text-red-500" />;
  if (type === "upload") return <Video size={14} className="text-orange-600" />;
  return <Link2 size={14} className="text-blue-500" />;
};

const inputClass =
  "w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none bg-slate-50 border border-slate-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-colors";

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
          <h1 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
            Videos
          </h1>
          <p className="text-slate-500 text-sm">{videos.length} videos available</p>
        </div>
        <button
          onClick={() => setShowForm((p) => !p)}
          id="add-video-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-700 text-white transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancel" : "Add Video"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="rounded-2xl p-6 mb-6 bg-white border border-slate-200 shadow-sm">
          <h2 className="text-slate-900 font-semibold mb-5 text-sm uppercase tracking-widest">
            Add New Video
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">Title *</label>
                <input required type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Video title" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">Order</label>
                <input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))} min={0} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">Description</label>
              <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} placeholder="Brief description..." className={`${inputClass} resize-none`} />
            </div>

            {/* Type selector */}
            <div>
              <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">Video Source *</label>
              <div className="flex gap-3">
                {(["youtube", "link", "upload"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, type: t }))}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all border ${
                      form.type === t
                        ? "bg-orange-50 border-orange-200 text-orange-700 shadow-sm"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {t === "youtube" && <PlayCircle size={13} className={form.type === t ? "text-red-500" : ""} />}
                    {t === "link" && <Link2 size={13} className={form.type === t ? "text-blue-500" : ""} />}
                    {t === "upload" && <Video size={13} className={form.type === t ? "text-orange-600" : ""} />}
                    {t === "youtube" ? "YouTube" : t === "link" ? "External Link" : "Upload File"}
                  </button>
                ))}
              </div>
            </div>

            {/* URL or File input */}
            {form.type === "upload" ? (
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">Video File *</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  required
                  className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 file:cursor-pointer p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden bg-slate-100">
                    <div className="h-full rounded-full transition-all bg-orange-500" style={{ width: `${uploadProgress}%` }} />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-600 uppercase mb-2">
                  {form.type === "youtube" ? "YouTube URL *" : "Video URL *"}
                </label>
                <input required type="url" value={form.url} onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))} placeholder={form.type === "youtube" ? "https://youtube.com/watch?v=..." : "https://..."} className={inputClass} />
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              id="save-video-btn"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white transition-colors"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              {saving ? (form.type === "upload" ? `Uploading ${uploadProgress}%…` : "Saving…") : "Save Video"}
            </button>
          </form>
        </div>
      )}

      {/* Video List */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-2xl p-12 text-center bg-white border border-slate-200 shadow-sm">
          <Video size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400">No videos added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {videos.map((video) => (
            <div key={video._id} className="rounded-2xl p-5 flex items-center gap-4 bg-white border border-slate-200 shadow-sm">
              <GripVertical size={16} className="text-slate-300 flex-shrink-0" />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 border border-slate-100">
                {typeIcon(video.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 font-semibold text-sm truncate">{video.title}</p>
                {video.description && (
                  <p className="text-slate-500 text-xs mt-0.5 truncate">{video.description}</p>
                )}
                <p className="text-slate-400 text-xs mt-1 capitalize">{video.type} · Order: {video.order}</p>
              </div>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-2 flex-shrink-0">
                Preview
              </a>
              <button onClick={() => handleDelete(video._id)} disabled={deletingId === video._id} className="p-2 rounded-xl flex-shrink-0 transition-colors hover:bg-red-50 text-red-400 hover:text-red-600">
                {deletingId === video._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
