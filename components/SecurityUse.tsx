"use client"

import { motion } from "framer-motion"
import { Users, Briefcase, Building2, Lock, ShieldCheck, Factory } from "lucide-react"
import React from "react"

// 1. Define the structure for the audience data using a TypeScript interface
interface Audience {
  title: string
  description: string
  icon: React.ElementType // Type for the Lucide React icon component
}

export default function SecurityAndUse() {
  const audiences: Audience[] = [
    {
      title: "Individuals",
      description:
        "Students, researchers, writers, and developers requiring a powerful personal AI assistant for brainstorming, accelerating learning, and enhancing content creation.",
      icon: Users,
    },
    {
      title: "Professional Teams",
      description:
        "Marketing, legal, support, and R&D teams leveraging collaborative workspaces and custom knowledge bases for consistent, context-aware answers from internal documentation or project briefs.",
      icon: Briefcase,
    },
    {
      title: "Small to Medium-Sized Businesses (SMBs)",
      description:
        "Companies seeking to deploy a private, customized AI solution for employees without incurring significant overhead and complexity of building from scratch.",
      icon: Building2,
    },
    {
      title: "Large Enterprise",
      description:
        "Global corporations requiring dedicated infrastructure, custom compliance features, single sign-on (SSO), and large-scale, fine-tuned model deployment for thousands of users.",
      icon: Factory, // Using Factory icon for Enterprise
    },
  ]

  // Animation variants for the audience cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    // Section Container: Ensure a dark/consistent background
    <section className="py-24 relative overflow-hidden min-h-screen bg-gradient-to-b from-black to-indigo-900">
      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* ------------------------------------------- */}
        {/* Section 1: Hero & Security Title */}
        {/* ------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center max-w-4xl mx-auto"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <ShieldCheck className="w-6 h-6 text-white/80" />
            <div className="text-sm uppercase tracking-widest text-white/80 font-medium">Trust & Integration</div>
            <Lock className="w-6 h-6 text-white/80" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-4">
            Security and <span className="text-indigo-400 hover:text-white">Seamless Use</span>
          </h1>
          <p className="text-xl text-white/70 mt-6">
            Understanding who benefits and how we ensure your data and processes are protected while utilizing our powerful AI tool.
          </p>
        </motion.div>

        {/* ------------------------------------------- */}
        {/* Section 2: Target Audience & Use Cases */}
        {/* ------------------------------------------- */}
        
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-12 text-center"
          >
            Target Audience & Use Cases
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {audiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                variants={itemVariants}
                className="p-8 border-2 border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10"
              >
                {/* Icon */}
                <audience.icon className="w-10 h-10 text-white mb-4 p-1 border border-white/40" />
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{audience.title}</h3>
                
                {/* Content/Description */}
                <p className="text-white/70 leading-relaxed text-base">{audience.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ------------------------------------------- */}
        {/* Call to Action / Security Placeholder (Optional) */}
        {/* ------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 p-10 text-center border-t border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4">How We Ensure Security</h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            This section is where you would add details about **data encryption, privacy policies, compliance, and user authentication methods** to complete the security narrative.
          </p>
        </motion.div>

      </div>
    </section>
  )
}