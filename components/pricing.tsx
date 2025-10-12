"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function Pricing() {
  // true for Annual, false for Monthly
  const [annual, setAnnual] = useState(true)

  // NOTE: Prices are in cents to match your original component's structure (e.g., 1999 for $19.99)
  // Monthly prices: Basic $19.99, Pro $49.99, Extreme $199.99
  // Annual prices: Basic $199.99, Pro $499.99, Extreme $1999.99
  const plans = [
    {
      name: "Basic",
      description: "Ideal for small teams and limited knowledge bases.",
      price: annual ? 19999 : 1999, // $199.99 / $19.99
      features: [
        "Basic Chat Features",
        "5 PDFs (up to 7 MB each)",
        "1 Workspace Allowed",
        "5 Members per Workspace",
        "1 Workflow Automation",
      ],
      cta: "Get Started",
      popular: false,
      isEnterprise: false,
    },
    {
      name: "Pro",
      description: "Best for growing teams needing more scale and features.",
      price: annual ? 49999 : 4999, // $499.99 / $49.99
      features: [
        "Unlimited Chat Features",
        "50 PDF Knowledge Base",
        "Up to 5 Workspaces",
        "Up to 10 Members",
        "Up to 5 Workflow Automations",
      ],
      cta: "Start 7-Day Trial",
      popular: true, // Marked Pro as popular
      isEnterprise: false,
    },
    {
      name: "Extreme",
      description: "For large organizations with extensive needs.",
      price: annual ? 199999 : 19999, // $1999.99 / $199.99
      features: [
        "Unlimited Chat",
        "Unlimited PDF Knowledge Base",
        "Up to 50 Workspaces",
        "100 Members Allowed",
        "20 Workflow Automations",
      ],
      cta: "Request Demo",
      popular: false,
      isEnterprise: false,
    },
    {
      name: "Enterprise",
      description: "Custom solutions, dedicated support, and SLA guarantees.",
      price: null,
      features: [
        "Custom Feature Integration",
        "Unlimited Scale & Capacity",
        "Dedicated Account Manager",
        "Custom Memberships & Roles",
        "Advanced Security & Compliance",
        "Priority 24/7 Support",
      ],
      cta: "Let's Discuss",
      popular: false,
      isEnterprise: true,
    },
  ]

  // Calculate the annual saving percentage for the toggle display
  // We'll base this on the Basic plan for a representative number: (19.99 * 12 - 199.99) / (19.99 * 12) * 100
  // (239.88 - 199.99) / 239.88 * 100 ≈ 16.6%
  const annualSavings = Math.round(((19.99 * 12) - 199.99) / (19.99 * 12) * 100);

  // Helper function to format cents to dollars
  const formatPrice = (priceInCents) => (priceInCents / 100).toFixed(2);


  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-indigo-900">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/40"></div>
            <div className="text-xs uppercase tracking-widest text-white/80">Pricing</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Simple Pricing
            <br />
            <span className="text-white/70">No Hidden Fees</span>
          </h2>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="border-2 border-white/20 p-1 inline-flex rounded-sm backdrop-blur-sm bg-white/5">
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 text-sm transition-all duration-300 ${
                annual ? "bg-white text-black font-medium" : "text-white/70 hover:text-white"
              }`}
            >
              Annual <span className="text-xs opacity-80">(Save {annualSavings}%)</span>
            </button>
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 text-sm transition-all duration-300 ${
                !annual ? "bg-white text-black font-medium" : "text-white/70 hover:text-white"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Updated grid for 4 columns on large screens (lg:grid-cols-4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border-2 ${
                plan.popular ? "border-white" : "border-white/20"
              } p-8 relative bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-white text-black text-xs uppercase tracking-widest py-1 px-3 -mt-3 -mr-3 font-medium">
                  Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
              <p className="text-white/70 mb-6">{plan.description}</p>
              
              {/* Conditional rendering for price or 'Contact Us' */}
              <div className="mb-6 flex items-baseline">
                {plan.isEnterprise ? (
                  <span className="text-4xl font-bold text-white">Custom</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-white">${formatPrice(plan.price)}</span>
                    <span className="text-white/70 ml-2">{annual ? "/year" : "/month"}</span>
                  </>
                )}
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start group">
                    <Check className="w-5 h-5 mr-2 text-white/60 group-hover:text-white flex-shrink-0 mt-0.5 transition-colors duration-300" />
                    <span className="text-white/80 group-hover:text-white transition-colors duration-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-3 text-sm uppercase tracking-widest transition-all duration-300 ${
                  plan.popular || plan.isEnterprise 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "border-2 border-white/30 text-white hover:border-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </button>
              
              {/* Add subtle highlight for popular plan */}
              {plan.popular && (
                <div className="absolute inset-0 border-b-2 border-white opacity-20"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-40 left-10 w-32 h-32 border border-white/10"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-white/5"></div>
    </section>
  )
}