"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- PARTICLE CONFIGURATION CONSTANTS ---
const PARTICLE_COUNT = 160; 
const PARTICLE_COLOR = "#ffffff";
const PARTICLE_MAX_SIZE = 5; 
const PARTICLE_OPACITY = 0.9; 
const REPULSE_DISTANCE = 150;
const BUBBLE_DISTANCE = 180;
const BUBBLE_SIZE = 60; 
const PARTICLE_CANVAS_ID = "hero-particles-bg";

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


/**
 * Inline implementation of TextGenerateEffect to ensure the file is self-contained.
 * Animates the full word block simultaneously after a staggered delay.
 */
const TextGenerateEffect = ({ words, className, duration = 0.5, initialDelay = 0 }) => {
    return (
      <motion.div
        className={className}
        // Animate the whole word block instantly after the delay
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: duration,
            delay: initialDelay,
            ease: "easeOut",
        }}
      >
        {words}
      </motion.div>
    );
};


export default function Hero() {
  const shapeRef = useRef(null);

  useEffect(() => {
    // --- 1. MOUSE MOVE LOGIC (Existing) ---
    const handleMouseMove = (e) => {
      if (!shapeRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // 1. Calculate normalized position (-0.5 to 0.5)
      const xNorm = clientX / innerWidth - 0.5;
      const yNorm = clientY / innerHeight - 0.5;

      // 2. Adjust the sensitivity multipliers here
      const rotationSensitivity = 3.0; // Controls how much the shape rotates
      const translationSensitivity = 35; // Controls how much the shape translates

      // Calculate Rotation (in degrees)
      const rotateX = -yNorm * 10 * rotationSensitivity; // More rotation based on Y position
      const rotateY = xNorm * 10 * rotationSensitivity;  // More rotation based on X position

      // Calculate Translation (in pixels)
      const translateX = xNorm * translationSensitivity; // More translation based on X position
      const translateY = yNorm * translationSensitivity; // More translation based on Y position

      // Apply the transformation
      shapeRef.current.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translate3d(${translateX}px, ${translateY}px, 0)
      `;
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // --- 2. PARTICLE LOGIC INITIATION (New) ---
    const cleanupParticles = initializeParticles(PARTICLE_CANVAS_ID);
    
    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cleanupParticles(); // Clean up particle animation loop and event listeners
    };

  }, []);

  const shapeAnimationDelay = 0.6;

  return (
    <section className=" flex items-center py-[100px] sm:py-[110px] overflow-hidden">
      
      {/* BACKGROUND (Particles + Overlays) */}
      <div className="absolute inset-0 z-0">
        {/* 1. Custom Canvas for Particles */}
        <canvas id={PARTICLE_CANVAS_ID} className="absolute inset-0"></canvas>
        
        {/* 2. Dark Overlay for Readability and Aesthetic (z-5) */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>
        
        {/* 3. Gradient Overlay to maintain the Indigo theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-indigo-900/15"></div>
      </div>
      {/* END BACKGROUND */}

      <div className="w-full relative z-10 px-8 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="mb-6"
            >
              <div className="inline-block border border-indigo-800 px-3 py-1 text-xs uppercase tracking-widest text-indigo-400">
                AI ECO SYSTEM
              </div>
            </motion.div>
            <h1>
              <TextGenerateEffect
                words="UNIFIED"
                className="text-5xl md:text-5xl lg:text-7xl font-bold m-0 leading-tight tracking-tighter"
                duration={0.6}
                speed={0.2}
                initialDelay={0.2}
              />
              <TextGenerateEffect
                words="INTELLIGENT"
                className="text-4xl md:text-5xl lg:text-7xl font-bold m-0 leading-tight tracking-tighter text-indigo-400"
                duration={0.5}
                speed={0.2}
                initialDelay={0.4}
              />
              <TextGenerateEffect
                words="SYSTEM"
                className="text-5xl md:text-5xl lg:text-7xl font-bold m-0 leading-tight tracking-tighter"
                duration={0.5}
                speed={0.6}
                initialDelay={0.8}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-indigo-400 mb-8 max-w-md text-lg"
            >
          ORCHESTRATING SOLUTIONS FOR EVERYONE
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="border border-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center">
                View Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="border border-indigo-800 px-8 py-3 text-sm uppercase tracking-widest text-indigo-400 hover:border-indigo-600 hover:text-white transition-colors">
                About Us
              </button>
            </motion.div>
          </div>
          {/* shape with professional animation sequence */}
          <div className="relative">
            <motion.div
              ref={shapeRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: shapeAnimationDelay,
                ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth appearance
              }}
              className="relative transition-transform duration-200 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background shape - appears first */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-2/3 h-2/3 border border-indigo-800 bg-indigo-950 z-[-1]"
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: shapeAnimationDelay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ transform: "translateZ(-20px)" }}
              ></motion.div>

              {/* Main square container */}
              <motion.div
                className="aspect-square relative overflow-hidden border border-indigo-800"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: shapeAnimationDelay + 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                {/* Background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-indigo-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: shapeAnimationDelay + 0.2 }}
                ></motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-3/4 h-3/4 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: shapeAnimationDelay + 0.3 }}
                  >
                    {/* Four lines - animate in sequence */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-white"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.4 }}
                    ></motion.div>
                    <motion.div
                      className="absolute bottom-0 right-0 w-full h-1 bg-white"
                      initial={{ scaleX: 0, originX: 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.5 }}
                    ></motion.div>
                    <motion.div
                      className="absolute top-0 right-0 h-full w-1 bg-white"
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.6 }}
                    ></motion.div>
                    <motion.div
                      className="absolute bottom-0 left-0 h-full w-1 bg-white"
                      initial={{ scaleY: 0, originY: 1 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.7 }}
                    ></motion.div>

                    {/* Center square - last to appear */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-indigo-700 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: shapeAnimationDelay + 0.8,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                    >
                      <motion.div
                        className="w-3/4 h-3/4 bg-indigo-900 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.9 }}
                      >
                        <motion.div
                          className="w-1/2 h-1/2 bg-white"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: shapeAnimationDelay + 1.0,
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                        ></motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          {/* <div className="flex items-center gap-8 border border-indigo-800 px-8 py-4">
            <div className="text-xs uppercase tracking-widest text-indigo-400">
              Scroll
            </div>
            <div className="h-px w-10 bg-indigo-800"></div>
            <div className="text-xs uppercase tracking-widest text-indigo-400">
              Discover
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
