"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className=" mx-auto md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
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
            <span className="text-white/70">Together</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm uppercase tracking-widest text-white/70 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-white/5 border-2 border-white/20 p-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm uppercase tracking-widest text-white/70 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-white/5 border-2 border-white/20 p-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm uppercase tracking-widest text-white/70 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full bg-white/5 border-2 border-white/20 p-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <button className="w-full bg-white text-black py-3 text-sm uppercase tracking-widest hover:bg-white/90 transition-colors relative group overflow-hidden">
              <span className="relative z-10">Send Message</span>
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </button>
          </form>
          <div className="border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8 h-full">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Contact Information
            </h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-sm mr-4">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest text-white/70 mb-2">
                    Email
                  </div>
                  <a
                    href="mailto:hello@mono.design"
                    className="text-white hover:text-white/70 transition-colors"
                  >
                    hello@mono.design
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-sm mr-4">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest text-white/70 mb-2">
                    Phone
                  </div>
                  <a
                    href="tel:+1234567890"
                    className="text-white hover:text-white/70 transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-sm mr-4">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest text-white/70 mb-2">
                    Address
                  </div>
                  <address className="not-italic text-white/80">
                    123 Minimalist Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </address>
                </div>
              </div>

              <div>
                <div className="text-sm uppercase tracking-widest text-white/70 mb-3">
                  Social
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="bg-white/10 p-2 rounded-sm hover:bg-white/20 transition-colors group"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="#"
                    className="bg-white/10 p-2 rounded-sm hover:bg-white/20 transition-colors group"
                    aria-label="Follow us on Twitter"
                  >
                    <Twitter className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="#"
                    className="bg-white/10 p-2 rounded-sm hover:bg-white/20 transition-colors group"
                    aria-label="Connect with us on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-32 h-32 border-2 border-white/10"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 border border-white/5"></div>
    </section>
  );
}
