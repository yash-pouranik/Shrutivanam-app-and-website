"use client";

import { useEffect, useState } from "react";
import { Video, PlayCircle, Link2, Play } from "lucide-react";

interface VideoItem {
  _id: string;
  title: string;
  description?: string;
  type: "upload" | "youtube" | "link";
  url: string;
  thumbnail?: string;
  order: number;
}

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match?.[1] ?? null;
}

export default function DashboardVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    fetch("/api/videos")
      .then((r) => r.json())
      .then((d) => {
        setVideos(d.videos ?? []);
        setLoading(false);
      });
  }, []);

  const typeIcon = (type: string) => {
    if (type === "youtube") return <PlayCircle size={13} className="text-red-400" />;
    if (type === "upload") return <Video size={13} className="text-[#C9A84C]" />;
    return <Link2 size={13} className="text-blue-400" />;
  };

  const getEmbedUrl = (video: VideoItem): string | null => {
    if (video.type === "youtube") {
      const id = getYoutubeId(video.url);
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
    }
    if (video.type === "upload") return video.url;
    return null; // external links open in new tab
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
          Video Library
        </h1>
        <p className="text-[#C8BFAD]/50 text-sm">{videos.length} lessons available</p>
      </div>

      {/* Player */}
      {activeVideo && (
        <div className="mb-8">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(201,168,76,0.3)" }}
          >
            {activeVideo.type === "link" ? (
              <div
                className="p-8 text-center"
                style={{ background: "rgba(26,16,64,0.8)" }}
              >
                <p className="text-[#C8BFAD]/70 mb-4 text-sm">
                  This video is hosted externally. Click below to open it.
                </p>
                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #E2C97E)",
                    color: "#0d0b1e",
                  }}
                >
                  <Play size={16} />
                  Open Video
                </a>
              </div>
            ) : activeVideo.type === "youtube" ? (
              <iframe
                src={getEmbedUrl(activeVideo) ?? ""}
                title={activeVideo.title}
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={activeVideo.url}
                controls
                autoPlay
                className="w-full aspect-video bg-black"
              />
            )}
          </div>
          <div className="mt-4">
            <h2
              className="text-xl font-bold text-[#F5F0E8]"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {activeVideo.title}
            </h2>
            {activeVideo.description && (
              <p className="text-[#C8BFAD]/60 text-sm mt-2">{activeVideo.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Video Grid */}
      {videos.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: "rgba(26,16,64,0.5)", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <Video size={32} className="text-[#C9A84C]/40 mx-auto mb-3" />
          <p className="text-[#C8BFAD]/40">No videos available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => {
            const ytId = video.type === "youtube" ? getYoutubeId(video.url) : null;
            const isActive = activeVideo?._id === video._id;

            return (
              <button
                key={video._id}
                onClick={() => {
                  if (video.type === "link") {
                    window.open(video.url, "_blank");
                  } else {
                    setActiveVideo(isActive ? null : video);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="text-left rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "rgba(26,16,64,0.6)",
                  border: isActive
                    ? "1px solid rgba(201,168,76,0.5)"
                    : "1px solid rgba(201,168,76,0.12)",
                }}
              >
                {/* Thumbnail */}
                <div
                  className="w-full aspect-video flex items-center justify-center relative"
                  style={{
                    background: ytId
                      ? `url(https://img.youtube.com/vi/${ytId}/mqdefault.jpg) center/cover`
                      : "rgba(13,11,30,0.8)",
                  }}
                >
                  {!ytId && (
                    <div className="text-[#C9A84C]/50">{typeIcon(video.type)}</div>
                  )}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(201,168,76,0.9)",
                        boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
                      }}
                    >
                      <Play size={18} fill="#0d0b1e" className="text-[#0d0b1e] ml-0.5" />
                    </div>
                  </div>
                  {isActive && (
                    <div
                      className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-semibold"
                      style={{
                        background: "rgba(201,168,76,0.9)",
                        color: "#0d0b1e",
                      }}
                    >
                      Now Playing
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    {typeIcon(video.type)}
                    <span className="text-[#C8BFAD]/40 text-xs capitalize">{video.type}</span>
                  </div>
                  <p className="text-[#F5F0E8] font-semibold text-sm leading-snug">
                    {video.title}
                  </p>
                  {video.description && (
                    <p className="text-[#C8BFAD]/50 text-xs mt-1.5 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
