import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import VideoDetailView from "./VideoDetailView";
import { ChevronLeft, ChevronRight, Play, Clock } from "lucide-react";

// Mock breadcrumbs
const breadcrumbs = [
  { title: "Videos", href: "/videos" },
];

export default function Index() {
  // Mock video data
  const videoData = [
    {
      id: 1,
      title: "Telecounseling Service",
      description:
        "Comprehensive telecounseling service for students featuring professional mental health support through virtual sessions.",
      thumbnail: "/images/eagle1.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoType: "youtube",
      duration: "15:30",
      category: "Mental Health",
      postedDate: "October 27th, 2023",
      postedBy: "usegnews10",
      tags: ["telecounseling", "mental health", "students"],
      insights: [
        "Insights on the importance of mental health, specifically about parenting and family dynamics.",
        "How to identify early warning signs of mental health issues in children.",
        "Practical tips for reducing stress and improving mental well-being.",
      ],
      relatedVideos: [2, 3, 4],
    },
    {
      id: 2,
      title: "USeP Wellness Month October 2023",
      description:
        "University wellness initiatives and programs designed to promote student well-being throughout the month.",
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=K_t1-r6RDhA&ab_channel=SHAMCEYTV",
      videoType: "youtube",
      duration: "22:15",
      category: "Wellness",
      postedDate: "October 15th, 2023",
      postedBy: "usepofficial",
      tags: ["wellness", "university", "health"],
      insights: [
        "Overview of wellness programs available to students.",
        "Tips for maintaining physical and mental health during academic stress.",
        "Community building activities for student engagement.",
      ],
      relatedVideos: [1, 3, 5],
    },
  ];

  const [currentView, setCurrentView] = useState<"dashboard" | "detail">(
    "dashboard"
  );
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const videosPerPage = 6;
  const categories = ["All", ...new Set(videoData.map((v) => v.category))];

  const filteredVideos =
    selectedCategory === "All"
      ? videoData
      : videoData.filter((v) => v.category === selectedCategory);

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredVideos.slice(
    startIndex,
    startIndex + videosPerPage
  );

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setCurrentView("detail");
  };

  const handleBackClick = () => {
    setCurrentView("dashboard");
    setSelectedVideo(null);
  };

  // --- Dashboard View ---
  const VideoDashboard = () => (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Latest Videos</h2>
          <p className="text-gray-600 text-sm">
            Know the latest videos that would support your well being
          </p>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border border-sidebar-border rounded-lg text-sm"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {currentVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleVideoClick(video)}
            className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200"
          >
            <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center gap-1 z-10">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border border-sidebar-border"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-lg disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Videos" />
      {currentView === "dashboard" ? (
        <VideoDashboard />
      ) : (
        <VideoDetailView
          selectedVideo={selectedVideo}
          videoData={videoData}
          onBack={handleBackClick}
          onVideoClick={handleVideoClick}
        />
      )}
    </AppLayout>
  );
}
