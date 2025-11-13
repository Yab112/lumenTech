"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Shield,
  Users,
  Award,
  Clock,
  Globe,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { HeaderWithTitleLine } from "@/components/ui/header-with-title-line";

const features = [
  {
    icon: Zap,
    title: "Fast Development",
    description:
      "Quick turnaround times with modern development practices. We deliver quality solutions efficiently without compromising on code quality.",
    metric: "2-4 weeks",
  },
  {
    icon: Shield,
    title: "Secure Solutions",
    description:
      "Built-in security best practices and regular updates. We ensure your applications are secure and follow industry standards.",
    metric: "Security First",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "Our team of experienced developers works closely with you. Direct communication and personalized attention for every project.",
    metric: "Expert Team",
  },
  {
    icon: Award,
    title: "Quality Code",
    description:
      "Clean, maintainable code with comprehensive testing. We follow best practices to ensure your software is reliable and scalable.",
    metric: "Clean Code",
  },
  {
    icon: Clock,
    title: "Responsive Support",
    description:
      "Quick response times and ongoing maintenance. We're here to help you succeed with your software solutions.",
    metric: "Quick Response",
  },
  {
    icon: Globe,
    title: "Global Team",
    description:
      "Distributed team working across time zones to serve clients worldwide. We bring diverse perspectives to every project.",
    metric: "Worldwide",
  },
];

// Duplicate features to ensure we always have 3 slides visible
const extendedFeatures = [...features, ...features, ...features];

export function SolutionsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-advance functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index % features.length); // Keep within original features range
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section
      id="solutions"
      className="py-16 sm:py-24 px-4 sm:px-6 bg-white dark:bg-[#000515] relative overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url(/wave.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <Badge
            variant="secondary"
            className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 font-semibold rounded-xl"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Why Choose LumenTech
          </Badge>

          <HeaderWithTitleLine titleLineColor="#2563eb" animationDelay={0.2}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl  text-neutral-900 dark:text-white mb-6 leading-tight">
              Why Businesses
              <br />
              <span className="text-blue-600">Choose LumenTech</span>
            </h2>
          </HeaderWithTitleLine>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            We combine modern technology with practical solutions to deliver
            software that helps your business grow and succeed.
          </p>
        </div>

        {/* Three-Slide Carousel */}
        <div className="relative max-w-full">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-400" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-lg"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-400" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex"
              animate={{
                x: `-${currentIndex * (isMobile ? 100 : 33.333)}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {extendedFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/3 flex-shrink-0 px-1 sm:px-4"
                >
                  <div className="group relative text-center bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-sm sm:shadow-md h-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105">
                    {/* Background Lumen Image - Shows on Hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-cover bg-center bg-no-repeat rounded-xl sm:rounded-2xl"
                      style={{ backgroundImage: "url(/lumen.jpeg)" }}
                    ></div>

                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/90 dark:from-slate-800/90 dark:via-slate-800/80 dark:to-slate-800/90 group-hover:from-white/95 group-hover:via-white/85 group-hover:to-white/95 dark:group-hover:from-slate-800/95 dark:group-hover:via-slate-800/85 dark:group-hover:to-slate-800/95 transition-all duration-500 rounded-xl sm:rounded-2xl"></div>

                    {/* Content - Relative positioning to stay above background */}
                    <div className="relative z-10">
                      {/* Icon - Hidden on small screens */}
                      <div className="sm:block w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-transparent dark:bg-slate-800 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300" />
                      </div>

                      {/* Content */}
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-4 px-1 sm:px-0 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors duration-300">
                        {feature.title}
                      </h3>

                      <p className="text-sm sm:text-sm text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 leading-relaxed px-2 sm:px-0 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                        {feature.description}
                      </p>

                      {/* Metric Tag */}
                      <div className="inline-block bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 sm:px-3 py-1.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium border border-blue-200 dark:border-blue-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:border-blue-300 dark:group-hover:border-blue-700 group-hover:scale-105 transition-all duration-300">
                        {feature.metric}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-slate-900 dark:bg-white scale-125"
                    : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-3 sm:mt-4">
            <div className="inline-flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  isAutoPlaying ? "bg-slate-900 dark:bg-white" : "bg-slate-400"
                }`}
              />
              <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
