"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

// --- PARTICLE CONFIGURATION CONSTANTS (Copied from VideoShowcase) ---
const PARTICLE_COUNT = 160; 
const PARTICLE_MAX_SIZE = 5; 
const PARTICLE_OPACITY = 0.9; 
const REPULSE_DISTANCE = 150;
const BUBBLE_DISTANCE = 180;
const BUBBLE_SIZE = 60; 
const PARTICLE_CANVAS_ID = "contact-particles-bg"; // Unique ID for this component's canvas

/**
 * Custom Particle Class to manage position, size, and movement.
 */
class Particle {
    canvas: any;
    ctx: any;
    x:any;
    y:any;
    size:any
    vx:any
    vy:any
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
    const canvas:any = document.getElementById(canvasId);
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


export default function Contact() {

    // Initialize particles on mount
    useEffect(() => {
        const cleanup = initializeParticles(PARTICLE_CANVAS_ID);
        return () => cleanup(); 
    }, []);

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black">
      
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


      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/40"></div>
            <div className="text-xs uppercase tracking-widest text-white/80">
              Contact
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Let's Work
            <br />
            <span className="text-indigo-400">Together</span>
          </h2>
        </motion.div>

        {/* Updated grid to center the single contact block */}
        <div className="grid grid-cols-1 gap-12 justify-items-center">
          
          {/* Contact Information Block */}
          <div className="border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8 h-full rounded-xl shadow-xl max-w-xl w-full">
            <h3 className="text-2xl font-bold mb-8 text-white">
              Direct Contact
            </h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-indigo-600/20 p-3 rounded-lg mr-4 flex-shrink-0">
                  <Mail className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest text-white/70 mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:intelligentllm1@gmail.com"
                    className="text-white text-lg hover:text-indigo-400 transition-colors font-medium"
                  >
                   intelligentllm1@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-600/20 p-3 rounded-lg mr-4 flex-shrink-0">
                  <Phone className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest text-white/70 mb-1">
                    Phone
                  </div>
                  <a
                    href="tel:+1234567890"
                    className="text-white text-lg hover:text-indigo-400 transition-colors font-medium"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-600/20 p-3 rounded-lg mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest text-white/70 mb-1">
                    Address
                  </div>
                  <address className="not-italic text-white text-lg font-medium">
                    123 Minimalist Street
                    <br />
                    New York, NY 10001
                  </address>
                </div>
              </div>

              <div>
                <div className="text-sm uppercase tracking-widest text-indigo-400 mb-4">
                  Connect With Us
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="bg-white/10 p-3 rounded-full hover:bg-indigo-600/40 transition-colors group border border-white/20"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-5 h-5 text-white/80 group-hover:text-indigo-400 transition-colors" />
                  </a>
                  <a
                    href="#"
                    className="bg-white/10 p-3 rounded-full hover:bg-indigo-600/40 transition-colors group border border-white/20"
                    aria-label="Follow us on Twitter"
                  >
                    <Twitter className="w-5 h-5 text-white/80 group-hover:text-indigo-400 transition-colors" />
                  </a>
                  <a
                    href="#"
                    className="bg-white/10 p-3 rounded-full hover:bg-indigo-600/40 transition-colors group border border-white/20"
                    aria-label="Connect with us on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white/80 group-hover:text-indigo-400 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
