"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// 1. Define a TypeScript interface for the video data structure
interface Video {
  title: string
  description: string
  // Use a string for the YouTube identifier (can be ID or full URL)
  youtubeLink: string
}

// Function to convert a standard YouTube link or video ID into an embed URL
const getEmbedUrl = (youtubeIdentifier: string): string => {
  if (youtubeIdentifier.includes("watch?v=")) {
    // Extract the video ID from a full watch URL
    const videoId = youtubeIdentifier.split("watch?v=")[1].split("&")[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  // Assume it's just the video ID if it doesn't contain the watch?v= format
  return `https://www.youtube.com/embed/${youtubeIdentifier}`
}

export default function VideoShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  // 2. Explicitly type the array using the defined interface
  const videos: Video[] = [
    {
      title: "Introduction to Minimal Design",
      description: "A deep dive into the philosophy and practice of minimalist aesthetics in web development.",
      youtubeLink: "dQw4w9WgXcQ", // Example YouTube Video ID (Rick Astley - Never Gonna Give You Up)
    },
    {
      title: "The Power of Brutalism in UI",
      description: "Exploring bold typography, raw elements, and a challenging design perspective.",
      youtubeLink: "L-K6hQ92oB0", // Example YouTube Video ID (Tame Impala - The Less I Know The Better)
    },
    {
      title: "Building with Framer Motion",
      description: "Step-by-step tutorial on creating smooth, production-ready animations in React.",
      youtubeLink: "lTRiuFIWV54", // Example YouTube Video ID (Imagine Dragons - Believer)
    },
  ]

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length)
  }

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }
  
  const currentVideo = videos[activeIndex]
  const embedUrl = getEmbedUrl(currentVideo.youtubeLink)

  return (
    <section className="py-24 relative overflow-hidden bg-gray-900">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/40"></div>
            <div className="text-xs uppercase tracking-widest text-white/80">Featured Content</div>
            <div className="h-px w-12 bg-white/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Our Latest <span className="text-white/70">Video Showcase</span>
          </h2>
        </motion.div>

        {/* Video Carousel Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative border-2 border-white/20 p-4 md:p-8 bg-white/5 backdrop-blur-sm shadow-2xl">
            
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* YouTube Video Embed (Responsive 16:9 Aspect Ratio) */}
                  <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                      src={`${embedUrl}?autoplay=0&rel=0&modestbranding=1`}
                      title={currentVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Video Details */}
                  <div className="mt-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h3>
                    <p className="text-white/70">{currentVideo.description}</p>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls and Indicator */}
            <div className="mt-10 flex items-center justify-between">
              {/* Pagination indicator */}
              <div className="flex items-center">
                <div className="text-white/60 text-sm mr-4">
                  {activeIndex + 1} / {videos.length}
                </div>
                <div className="flex-1 h-px bg-white/20 relative w-24 md:w-40">
                  <motion.div 
                    className="h-px bg-white absolute top-0 left-0"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: `${((activeIndex + 1) / videos.length) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={prev} 
                  className="p-2 border-2 border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-300 group"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </button>
                <button 
                  onClick={next} 
                  className="p-2 border-2 border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-300 group"
                  aria-label="Next video"
                >
                  <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual accent elements */}
      <div className="absolute top-40 right-20 w-56 h-56 border border-white/5 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 border-2 border-white/10"></div>
    </section>
  )
}