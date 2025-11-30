"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  { name: "Web", logo: "🌐" },
  { name: "Mobile", logo: "📱" },
  { name: "Cloud Solutions", logo: "☁️" },
  { name: "AI & ML", logo: "🤖" },
  { name: "ERP", logo: "📊" },
  { name: "Automations", logo: "⚙️" },
  { name: "Desktop App", logo: "💻" },
  { name: "UI", logo: "🎨" },
  { name: "Consultation", logo: "💼" },
];

export function TestimonialsSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Darker Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900" />

      {/* Grid Pattern Overlay - More visible */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Trusted by Growing <br />
              <span className="text-white/90">Businesses</span>
            </h2>
            <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed max-w-lg">
              We deliver comprehensive solutions across all platforms and technologies.
              From web and mobile applications to cloud infrastructure and AI-powered
              systems, we've got you covered with scalable solutions that drive
              business growth.
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm rounded-lg px-6 py-5 text-base font-semibold transition-all duration-300 group"
            >
              Connect With Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Side - Services Grid */}
          <div className="grid grid-cols-3 gap-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/20 hover:border-white/40 transition-all duration-200 h-full flex flex-col items-center justify-center aspect-square">
                  <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {service.logo}
                  </div>
                  <div className="text-white font-semibold text-xs sm:text-sm text-center">
                    {service.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
