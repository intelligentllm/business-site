"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// --- PARTICLE CONFIGURATION CONSTANTS (Copied from Hero) ---
const PARTICLE_COUNT = 160; 
const PARTICLE_MAX_SIZE = 5; 
const PARTICLE_OPACITY = 0.9; 
const REPULSE_DISTANCE = 150;
const BUBBLE_DISTANCE = 180;
const BUBBLE_SIZE = 60; 
const PARTICLE_CANVAS_ID = "video-particles-bg"; // Unique ID for this component's canvas

/**
 * Custom Particle Class to manage position, size, and movement.
 */
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * PARTICLE_MAX_SIZE + 0.5;
        
        // Velocity calculation for visible movement between -0.5 and 0.5 pixels/frame
        this.vx = Math.random() * 1 - 0.5; 
        this.vy = Math.random() * 1 - 0.5; 
    }

    draw() {
        this.ctx.fillStyle = `rgba(255, 255, 255, ${PARTICLE_OPACITY})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Boundary handling: bounce off edges
        if (this.x + this.size > this.canvas.width || this.x - this.size < 0) {
            this.vx *= -1;
        }
        if (this.y + this.size > this.canvas.height || this.y - this.size < 0) {
            this.vy *= -1;
        }
    }
}

/**
 * Main function to initialize and run the particle system on a canvas.
 */
const initializeParticles = (canvasId) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray;
    let animationFrameId;

    // State for mouse interaction
    let mouse = { x: null, y: null };
    let isHovering = false;

    // Resize canvas on window resize
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    };

    // Initialize particles array
    const init = () => {
        particlesArray = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particlesArray.push(new Particle(canvas));
        }
    };

    // Handle user interaction (Repulse and Bubble)
    const handleInteractivity = (p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repulse on Hover
        if (isHovering && distance < REPULSE_DISTANCE) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (REPULSE_DISTANCE - distance) / REPULSE_DISTANCE;
            const directionX = forceDirectionX * force * 1.5;
            const directionY = forceDirectionY * force * 1.5;

            // Apply slight push back (simulating repulsion without full physics)
            p.x += directionX * 0.5; 
            p.y += directionY * 0.5;
        }

        // Bubble on Click (Simulated by shrinking/growing size based on distance to click/mouse position)
        if (distance < BUBBLE_DISTANCE) {
            const scale = 1 - (distance / BUBBLE_DISTANCE); // Scale from 1 to 0
            // Uses BUBBLE_SIZE constant
            p.size = PARTICLE_MAX_SIZE + (BUBBLE_SIZE * scale * 0.1); 
        } else {
            // Restore original size if outside interaction distance
            p.size = Math.random() * PARTICLE_MAX_SIZE + 0.5;
        }
    };

    // Animation loop
    const animate = () => {
        // Clear the canvas, crucial for animation
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            const p = particlesArray[i];
            p.update();
            p.draw();
            if (mouse.x !== null && mouse.y !== null) {
                handleInteractivity(p);
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    };

    // --- Event Listeners Setup ---
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse movement/hover for Repulse
    canvas.addEventListener('mousemove', (event) => {
        // Correctly map client coordinates to canvas coordinates
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        isHovering = true;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
        isHovering = false;
    });

    // Mouse click (we rely on the hover/proximity effect for "bubble")
    canvas.addEventListener('click', (event) => {
        // Placeholder for future click-specific effects
    });


    // Start everything
    resizeCanvas(); // Set initial size and run init()
    animate();

    // Cleanup function
    return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
    };
};
// --- END PARTICLE LOGIC ---

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
  
  // Initialize particles on mount
  useEffect(() => {
    const cleanup = initializeParticles(PARTICLE_CANVAS_ID);
    return () => cleanup(); 
  }, []);

  // 2. Explicitly type the array using the defined interface
  const videos: Video[] = [
    {
      title: "Introduction to Minimal Design",
      description: "A deep dive into the philosophy and practice of minimalist aesthetics in web development.",
      youtubeLink: "", // Example YouTube Video ID (Rick Astley - Never Gonna Give You Up)
    },
    {
      title: "The Power of Brutalism in UI",
      description: "Exploring bold typography, raw elements, and a challenging design perspective.",
      youtubeLink: "", // Example YouTube Video ID (Tame Impala - The Less I Know The Better)
    },
    {
      title: "Building with Framer Motion",
      description: "Step-by-step tutorial on creating smooth, production-ready animations in React.",
      youtubeLink: "", // Example YouTube Video ID (Imagine Dragons - Believer)
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
        
      {/* BACKGROUND (Particles + Overlays) - New Addition */}
      <div className="absolute inset-0 z-0">
        {/* 1. Custom Canvas for Particles */}
        <canvas id={PARTICLE_CANVAS_ID} className="absolute inset-0"></canvas>
        
        {/* 2. Dark Overlay for Readability and Aesthetic (z-5) */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>
        
        {/* 3. Gradient Overlay to maintain the Indigo theme */}
        {/* NOTE: Swapping from bg-gray-900 to bg-indigo for visual consistency with Hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-indigo-900/15"></div>
      </div>
      {/* END BACKGROUND */}


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
            Our Latest <span className="text-indigo-400">Video Showcase</span>
          </h2>
        </motion.div>

        {/* Video Carousel Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative border-2 border-white/20 p-4 md:p-8 bg-white/5 backdrop-blur-sm shadow-2xl rounded-xl">
            
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
                  <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
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
                    className="h-px bg-indigo-400 absolute top-0 left-0"
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
                  className="p-3 border-2 border-white/20 hover:border-indigo-400/60 hover:bg-white/5 transition-all duration-300 group rounded-full"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-indigo-400 transition-colors" />
                </button>
                <button 
                  onClick={next} 
                  className="p-3 border-2 border-white/20 hover:border-indigo-400/60 hover:bg-white/5 transition-all duration-300 group rounded-full"
                  aria-label="Next video"
                >
                  <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-indigo-400 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Removed old accent elements as they clash with the particle canvas */}
      {/* <div className="absolute top-40 right-20 w-56 h-56 border border-white/5 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 border-2 border-white/10"></div> */}
    </section>
  )
}
