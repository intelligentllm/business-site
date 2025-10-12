"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="w-full px-8 lg:px-24 xl:px-32">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-2xl tracking-tighter">
            INTELLIGENT<span className="text-indigo-400">LLM</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-indigo-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Features
            </Link>
            {/* <Link
              href="#work"
              className="text-indigo-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Work
            </Link> */}
            <Link
              href="#process"
              className="text-indigo-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Process
            </Link>
            <Link
              href="#pricing"
              className="text-indigo-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Pricing
            </Link>
            <Link
              href="#invest"
              className="text-indigo-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Invest
            </Link>
          </nav>

          <div className="hidden md:block">
            <button className="border border-white px-5 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Contact
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black"
        >
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col space-y-6">
              <Link
                href="#features"
                className="text-indigo-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#work"
                className="text-indigo-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                Work
              </Link>
              <Link
                href="#process"
                className="text-indigo-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                Process
              </Link>
              <Link
                href="#pricing"
                className="text-indigo-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link href="#contact" className="border border-white px-5 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full mt-4">
                Contact
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
