

import React from "react";
import { ChevronLeft, Calendar, User } from "lucide-react";

interface VideoDetailViewProps {
  selectedVideo: any;
  videoData: any[];
  onBack: () => void;
  onVideoClick: (video: any) => void;
}

const VideoDetailView: React.FC<VideoDetailViewProps> = ({
  selectedVideo,
  videoData,
  onBack,
  onVideoClick,
}) => {
  const relatedVideos = videoData.filter((v) =>
    selectedVideo.relatedVideos?.includes(v.id)
  );
  return (
    <div className="p-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-1xl mb-4 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Videos
      </button>

      {/* Two-column responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Video Player + Details */}
        <div className="lg:col-span-2">
          <div className="aspect-video mb-4">
            <iframe
              src={selectedVideo.videoUrl}
              title={selectedVideo.title}
              allowFullScreen
              className="w-full h-full rounded-md"
            />
          </div>

          {/* Info */}
        <div className="rounded-xl p-6 shadow-sm border">
          <h1 className="text-2xl font-bold mb-4">{selectedVideo.title}</h1>
          <div className="flex items-center gap-6 text-sm mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {selectedVideo.postedDate}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {selectedVideo.postedBy}
            </span>
          </div>
          <p className="mb-6">{selectedVideo.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedVideo.tags.map((tag: string) => (
              <span
                key={tag}
                className="border px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Insights */}
          <h3 className="font-semibold mb-3">What to Expect:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {selectedVideo.insights.map((insight: string, idx: number) => (
              <li key={idx}>{insight}</li>
            ))}
          </ul>
        </div>

        </div>

        {/* Right: Related Videos */}
        <div className="rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
        <div className="space-y-4">
          {relatedVideos.map((video) => (
            <div
              key={video.id}
              className="flex gap-3 cursor-pointer p-2 rounded"
              onClick={() => onVideoClick(video)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-24 h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-medium text-sm">{video.title}</h4>
                <p className="text-xs text-gray-500">{video.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default VideoDetailView;
