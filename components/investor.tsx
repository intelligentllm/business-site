"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { DollarSign, Zap, Rocket, Users, Target } from "lucide-react";
// Removed: import Particles from "@tsparticles/react"; (External dependency caused error)

// --- CONFIGURATION CONSTANTS (Derived from user's JSON) ---
const PARTICLE_COUNT = 160; // **UPDATED: Increased for higher density**
const PARTICLE_COLOR = "#ffffff";
const PARTICLE_MAX_SIZE = 3; // **UPDATED: Increased for better visibility**
// Removed PARTICLE_SPEED_SCALE as it was ineffective for visible movement
const PARTICLE_OPACITY = 0.9; 
const REPULSE_DISTANCE = 150;
const BUBBLE_DISTANCE = 180;
const BUBBLE_SIZE = 60; // **UPDATED: Increased for stronger interaction**

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
        
        // FIXED MOVEMENT: Calculating velocity to guarantee visible movement between -0.5 and 0.5 pixels/frame
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


// This component is designed to be a high-impact section for appealing to early-stage investors.
export default function Investor() {
  const PARTICLE_CANVAS_ID = "investor-particles-bg";
  
  // --- STATE MANAGEMENT FOR LOADING ---
  const [isLoading, setIsLoading] = useState(true);

  // Set up the particle canvas when the component mounts
  useEffect(() => {
    // 1. Initialize the custom particle system
    const cleanup = initializeParticles(PARTICLE_CANVAS_ID);
    
    // 2. Set the loading timer (content visibility)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second delay

    return () => {
        clearTimeout(timer);
        cleanup(); // Cleanup particle animation loop and event listeners
    };
  }, []);
  // ------------------------------------

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -25% 0px", 
  });

  // Define the core pillars of the investment pitch
  const investmentPillars = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Massive Market Opportunity",
      description:
        "We are addressing a rapidly growing, multi-billion dollar segment currently underserved by legacy solutions.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Proven Early Traction",
      description:
        "Our MVP has secured X paying customers, demonstrating 50% month-over-month growth and strong product-market fit.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Exceptional Founding Team",
      description:
        "A dedicated team with decades of combined expertise in AI, enterprise software, and successful exits.",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Clear Path to Profitability",
      description:
        "A highly efficient GTM strategy and low CAC/high LTV model projecting cash-flow positivity within 18 months.",
    },
  ];

  // Animation variants copied from the original Features component for consistency
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 45,
        damping: 15,
        mass: 0.85,
        duration: 0.7,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="investor-pitch"
      ref={sectionRef}
      className="py-16 sm:py-24 relative overflow-hidden font-inter min-h-screen flex items-center bg-black" 
    >
        
        {/* LOADING OVERLAY (Shows if isLoading is true, hidden on load completion) */}
        {isLoading && (
            <div className="absolute inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center transition-opacity duration-300">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-4 border-indigo-500 border-t-transparent mb-4"></div>
                <p className="text-white/70 text-lg font-medium tracking-wide">
                    Securing the pitch deck...
                </p>
            </div>
        )}

        {/* 1. Particle Canvas Background Container (z-0) */}
        <div className="absolute inset-0 z-0">
            {/* Custom Canvas for Particles - replaces the external library */}
            <canvas id={PARTICLE_CANVAS_ID} className="absolute inset-0"></canvas>
            
            {/* 2. Dark Overlay for Readability and Aesthetic (z-5) */}
            {/* Reduced opacity to bg-black/5 */}
            <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>
            {/* 3. Gradient Overlay to maintain the Indigo theme */}
            {/* Reduced gradient opacities to be much lighter */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-indigo-900/15"></div>
        </div>

      {/* Main Content Container (Fades in when not loading) */}
      <div className={`container mx-auto px-4 md:px-8 relative z-10 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Main Title Block */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 max-w-3xl"
          transition={{ duration: 0.9 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/40"></div>
            <div className="text-xs uppercase tracking-widest text-white/80">
              Funding Round
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            <span className="text-indigo-400">Join the Ground Floor.</span> 
            <br />
            Be Our First Investor.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            We are building the future of enterprise intelligence. This is a unique opportunity to secure outsized returns by partnering with a pre-seed company operating in an explosive market.
          </p>
        </motion.div>

        {/* Investment Pillars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {investmentPillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8 hover:border-indigo-400/50 hover:bg-white/10 transition-all duration-300 group rounded-xl shadow-lg"
            >
              <div className="mb-6 text-indigo-400 group-hover:text-white transition-colors">
                <div className="bg-white/10 p-3 inline-block rounded-lg group-hover:bg-indigo-400/20 transition-all duration-300">
                  {pillar.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {pillar.title}
              </h3>
              <p className="text-white/70 group-hover:text-white/90 transition-colors">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button Block */}
        <div className="mt-16 text-center">
            <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] shadow-xl shadow-indigo-500/50"
            >
                Schedule a Deep Dive Meeting
            </a>
            <p className="mt-4 text-sm text-white/50">
                Serious inquiries only. Full pitch deck available upon request.
            </p>
        </div>

      </div>
    </section>
  );
}
