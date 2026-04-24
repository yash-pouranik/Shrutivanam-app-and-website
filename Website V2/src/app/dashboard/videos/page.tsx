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
    if (type === "youtube") return <PlayCircle size={13} className="text-red-500" />;
    if (type === "upload") return <Video size={13} className="text-orange-600" />;
    return <Link2 size={13} className="text-blue-500" />;
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
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
          Video Library
        </h1>
        <p className="text-slate-500 text-sm">{videos.length} lessons available</p>
      </div>

      {/* Player */}
      {activeVideo && (
        <div className="mb-8 p-1 bg-white rounded-[20px] shadow-sm border border-slate-200">
          <div className="rounded-2xl overflow-hidden border border-slate-100 relative">
            {activeVideo.type === "link" ? (
              <div className="p-8 text-center bg-slate-50">
                <p className="text-slate-500 mb-4 text-sm">
                  This video is hosted externally. Click below to open it.
                </p>
                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-700 text-white transition-colors"
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
              <video src={activeVideo.url} controls autoPlay className="w-full aspect-video bg-black" />
            )}
          </div>
          <div className="p-4 mt-2">
            <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>
              {activeVideo.title}
            </h2>
            {activeVideo.description && (
              <p className="text-slate-600 text-sm mt-2">{activeVideo.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Video Grid */}
      {videos.length === 0 ? (
        <div className="rounded-2xl p-12 text-center bg-white border border-slate-200 shadow-sm">
          <Video size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400">No videos available yet. Check back soon!</p>
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
                className={`text-left rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 bg-white border shadow-sm ${
                  isActive ? "border-orange-400 ring-4 ring-orange-50" : "border-slate-200 hover:border-orange-200 hover:shadow-md"
                }`}
              >
                {/* Thumbnail */}
                <div
                  className="w-full aspect-video flex items-center justify-center relative bg-slate-100"
                  style={{
                    background: ytId ? `url(https://img.youtube.com/vi/${ytId}/mqdefault.jpg) center/cover` : undefined,
                  }}
                >
                  {!ytId && <div className="text-slate-300">{typeIcon(video.type)}</div>}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/90 backdrop-blur shadow-lg">
                      <Play size={18} fill="currentColor" className="text-orange-600 ml-0.5" />
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute top-2 right-2 text-xs px-2.5 py-1 rounded-full font-bold bg-orange-600 text-white shadow-sm tracking-wide uppercase">
                      Now Playing
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    {typeIcon(video.type)}
                    <span className="text-slate-500 text-xs capitalize font-semibold tracking-wide">
                      {video.type}
                    </span>
                  </div>
                  <p className="text-slate-900 font-bold text-sm leading-snug">{video.title}</p>
                  {video.description && (
                    <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">{video.description}</p>
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
