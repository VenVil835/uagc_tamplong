import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Calendar, User, Clock } from 'lucide-react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Videos',
        href: '/videos',
    },
];

export default function Index() {
    // Mock video data - This will be your JSON array that can be fetched from backend
    const videoData = [
        {
            id: 1,
            title: "Telecounseling Service",
            description: "Comprehensive telecounseling service for students featuring professional mental health support through virtual sessions.",
            // LOCAL IMAGE OPTIONS (choose one):
            thumbnail: "/images/eagle1.jpg", // Public folder
            // ONLINE IMAGE (fallback):
            // thumbnail: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop",
            
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
                "Practical tips for reducing stress and improving mental well-being."
            ],
            relatedVideos: [2, 3, 4]
        },
        {
            id: 2,
            title: "USeP Wellness Month October 2023",
            description: "University wellness initiatives and programs designed to promote student well-being throughout the month.",
            thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
            duration: "22:15",
            category: "Wellness",
            postedDate: "October 15th, 2023",
            postedBy: "usepofficial",
            tags: ["wellness", "university", "health"],
            insights: [
                "Overview of wellness programs available to students.",
                "Tips for maintaining physical and mental health during academic stress.",
                "Community building activities for student engagement."
            ],
            relatedVideos: [1, 3, 5]
        },
        {
            id: 3,
            title: "Seminar on Psycho-Spirituality 2023",
            description: "Educational seminar exploring the intersection of psychology and spirituality for graduating students.",
            thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
            duration: "45:20",
            category: "Education",
            postedDate: "September 30th, 2023",
            postedBy: "usepacademics",
            tags: ["psychology", "spirituality", "seminar", "graduation"],
            insights: [
                "Understanding the connection between mental health and spiritual well-being.",
                "Practical applications of psycho-spiritual concepts in daily life.",
                "Preparation strategies for post-graduation life transitions."
            ],
            relatedVideos: [1, 2, 4]
        },
        {
            id: 4,
            title: "Podcast: Parenting, Family Dynamics, and Mental Health",
            description: "In-depth discussion about parenting strategies, family relationships, and their impact on mental health outcomes.",
            thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop",
            duration: "38:45",
            category: "Podcast",
            postedDate: "October 20th, 2023",
            postedBy: "usegnews10",
            tags: ["parenting", "family", "mental health", "podcast"],
            insights: [
                "Effective communication strategies within families.",
                "Understanding developmental psychology in parenting.",
                "Building resilient family relationships during challenging times."
            ],
            relatedVideos: [1, 2, 3]
        },
        {
            id: 5,
            title: "Student Stress Management Workshop",
            description: "Interactive workshop focusing on stress management techniques specifically designed for university students.",
            thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
            duration: "28:10",
            category: "Workshop",
            postedDate: "November 5th, 2023",
            postedBy: "usepwellness",
            tags: ["stress management", "students", "workshop"],
            insights: [
                "Proven techniques for managing academic stress.",
                "Time management strategies for busy students.",
                "Building healthy study habits and routines."
            ],
            relatedVideos: [1, 2, 6]
        },
        {
            id: 6,
            title: "Mental Health Awareness Campaign",
            description: "University-wide campaign promoting mental health awareness and destigmatizing mental health support.",
            thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
            duration: "18:55",
            category: "Campaign",
            postedDate: "October 10th, 2023",
            postedBy: "usepofficial",
            tags: ["mental health", "awareness", "campaign"],
            insights: [
                "Breaking down mental health stigmas in academic settings.",
                "Available resources for students seeking mental health support.",
                "Creating inclusive environments for mental health discussions."
            ],
            relatedVideos: [1, 4, 5]
        },
         {
            id: 7,
            title: "Mental Health Shit Campaign",
            description: "University-wide campaign promoting mental health awareness and destigmatizing mental health support.",
            thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
            duration: "18:55",
            category: "Campaign",
            postedDate: "October 10th, 2023",
            postedBy: "usepofficial",
            tags: ["mental health", "awareness", "campaign"],
            insights: [
                "Breaking down mental health stigmas in academic settings.",
                "Available resources for students seeking mental health support.",
                "Creating inclusive environments for mental health discussions."
            ],
            relatedVideos: [1, 4, 5]
        }
    ];

    // State management
    const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'detail'
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const videosPerPage = 6;
    const categories = ['All', ...new Set(videoData.map(video => video.category))];
    
    const filteredVideos = selectedCategory === 'All' 
        ? videoData 
        : videoData.filter(video => video.category === selectedCategory);
    
    const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
    const startIndex = (currentPage - 1) * videosPerPage;
    const currentVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setCurrentView('detail');
    };

    const handleBackClick = () => {
        setCurrentView('dashboard');
        setSelectedVideo(null);
    };

    // Video Card Component
    const VideoCard = ({ video }) => (
        <div 
            className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200"
            onClick={() => handleVideoClick(video)}
        >
            <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    style={{ 
                        display: 'block',
                        minHeight: '192px', // h-48 = 12rem = 192px
                        backgroundColor: '#f3f4f6' // gray-200 fallback
                    }}
                    // onError={(e) => {
                    //     console.log('Image failed to load:', video.thumbnail);
                    //     console.log('Image element:', e.target);
                    //     // Add red border to see if container is there
                    //     e.target.style.border = '2px solid red';
                    //     e.target.style.backgroundColor = '#fef2f2';
                    // }}
                    // onLoad={(e) => {
                    //     console.log('Image loaded successfully:', video.thumbnail);
                    //     console.log('Image dimensions:', e.target.naturalWidth, 'x', e.target.naturalHeight);
                    //     console.log('Image element:', e.target);
                    //     // Add green border to confirm image is visible
                    //     e.target.style.border = '2px solid green';
                    // }}
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center pointer-events-none">
                    <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center gap-1 z-10">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                </div>
                {/* Debug info - remove this after fixing
                <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs z-10">
                    {video.thumbnail ? 'IMG' : 'NO IMG'}
                </div> */}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {video.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {video.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {video.category}
                    </span>
                    <span>{video.postedDate}</span>
                </div>
            </div>
        </div>
    );

    // Dashboard View
    const VideoDashboard = () => (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Latest Videos</h2>
                    <p className="text-gray-600 text-sm">Know the latest videos that would support your well being</p>
                </div>
                <select 
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="px-3 py-2 border border-sidebar-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {currentVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-sidebar-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-2 rounded-lg text-sm ${
                                    currentPage === page 
                                        ? 'bg-primary text-white cursor-pointer' 
                                        : 'border border-sidebar-border hover:bg-gray-50 cursor-pointer'
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                    
                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-sidebar-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );

    // Video Detail View
    const VideoDetailPage = () => {
        const relatedVideos = videoData.filter(v => selectedVideo.relatedVideos.includes(v.id));

        return (
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Back Button */}
                <button 
                    onClick={handleBackClick}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors self-start"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Videos
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Video Section */}
                    <div className="lg:col-span-2">
                        {/* Video Player */}
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-6 border border-sidebar-border">
                            {selectedVideo.videoUrl ? (
                                // Dynamic Video Player based on video type
                                selectedVideo.videoType === 'youtube' ? (
                                    <iframe
                                        src={selectedVideo.videoUrl}
                                        title={selectedVideo.title}
                                        className="w-full h-full"
                                        allowFullScreen
                                        frameBorder="0"
                                    />
                                ) : selectedVideo.videoType === 'vimeo' ? (
                                    <iframe
                                        src={`https://player.vimeo.com/video/${selectedVideo.vimeoId}`}
                                        title={selectedVideo.title}
                                        className="w-full h-full"
                                        allowFullScreen
                                        frameBorder="0"
                                    />
                                ) : selectedVideo.videoType === 'mp4' ? (
                                    <video 
                                        controls 
                                        className="w-full h-full"
                                        poster={selectedVideo.thumbnail}
                                    >
                                        <source src={selectedVideo.videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    // Generic embed
                                    <iframe
                                        src={selectedVideo.videoUrl}
                                        title={selectedVideo.title}
                                        className="w-full h-full"
                                        allowFullScreen
                                        frameBorder="0"
                                    />
                                )
                            ) : (
                                // Fallback placeholder if no video URL
                                <>
                                    <img 
                                        src={selectedVideo.thumbnail} 
                                        alt={selectedVideo.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <Play className="w-16 h-16 text-white" />
                                    </div>
                                </>
                            )}
                            {/* <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {selectedVideo.duration}
                            </div> */}
                        </div>

                        {/* Video Info */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-sidebar-border">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedVideo.title}</h1>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Posted on: {selectedVideo.postedDate}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    Posted by: {selectedVideo.postedBy}
                                </div>
                            </div>

                            <p className="text-gray-700 mb-6 leading-relaxed">{selectedVideo.description}</p>

                            {/* Tags */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-2">Tags:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedVideo.tags.map(tag => (
                                        <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* What to Expect */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">What to Expect:</h3>
                                <ul className="space-y-2">
                                    {selectedVideo.insights.map((insight, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-700">{insight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Related Videos Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-sidebar-border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Videos</h2>
                            <div className="space-y-4">
                                {relatedVideos.map(relatedVideo => (
                                    <div 
                                        key={relatedVideo.id}
                                        className="group cursor-pointer p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                        onClick={() => handleVideoClick(relatedVideo)}
                                    >
                                        <div className="flex gap-3">
                                            <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                                                <img 
                                                    src={relatedVideo.thumbnail} 
                                                    alt={relatedVideo.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                                                    <Play className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm line-clamp-2 mb-1">
                                                    {relatedVideo.title}
                                                </h4>
                                                <div className="text-xs text-gray-500 flex items-center gap-2 ">
                                                    <span>{relatedVideo.duration}</span>
                                                    <span>•</span>
                                                    <span>{relatedVideo.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Videos" />
            {currentView === 'dashboard' ? <VideoDashboard /> : <VideoDetailPage />}
        </AppLayout>
    );
}