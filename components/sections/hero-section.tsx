"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Code,
  Database,
  Cloud,
  Cpu,
  Globe,
  Lock,
  Zap,
  Shield,
  Users,
  Star,
} from "lucide-react";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = [
    "Web Applications",
    "Mobile Apps",
    "Cloud Solutions",
    "Custom Software",
  ];
  const fullText = words[currentWordIndex];

  // Typing effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typedText.length < fullText.length) {
      timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 120);
    } else {
      timeout = setTimeout(() => {
        setTypedText("");
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [typedText, fullText, currentWordIndex]);

  return (
    <section
      id="home"
      className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden pb-8 sm:pb-0 "
    >
      {/* Hero Background SVG */}
      <div className="absolute top-0 left-0 hidden h-full w-full md:block">
        <svg
          style={{ transform: "scaleX(1.7)" }}
          className="h-full w-full"
          viewBox="0 20 1439 996"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 893.5V0L1438.5 1.5V891C1320.5 917.833 930.5 996 719.5 996C499 996 165.5 936 0 893.5Z"
            fill="currentColor"
            className="text-slate-50 dark:text-slate-800"
          />
        </svg>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Elements - Simplified for Mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Circle */}
        <motion.div
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          style={{ top: "10%", left: "5%" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Medium Circle */}
        <motion.div
          className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-purple-400/8 to-blue-400/8 rounded-full blur-3xl"
          style={{ top: "60%", right: "10%" }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Small Accent */}
        <motion.div
          className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-emerald-400/8 to-cyan-400/8 rounded-full blur-2xl"
          style={{ top: "30%", right: "30%" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-14 sm:pt-0">
        <div className="text-center ">
          {/* Company Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <Badge
              variant="secondary"
              className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 backdrop-blur-sm text-sm sm:text-base font-medium"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Global Software Solutions
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-slate-900 dark:text-white mb-6 leading-tight ">
              Build Your Digital
              <br />
              <div
                className="relative z-10 inline-block bg-white rounded-lg text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold "
                style={{
                  transform: "skew(-6deg)",
                  padding: "0.25rem 1.5rem 0.5rem",
                }}
              >
                <span
                  className="inline-block text-blue-600"
                  style={{ transform: "skew(6deg)" }}
                >
                  Future
                </span>
              </div>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 sm:mb-12"
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto ">
              We specialize in engineering scalable software tailored for
              ambitious startups and visionary teams, focusing on delivering
              real business outcomes. We excel in building high-impact digital
              platforms, moving products from MVPs to fully scalable SaaS
              solutions.
            </p>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <div className="flex items-center text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                <Star className="w-4 h-4 text-blue-600 mr-2" />
                Custom Solutions
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                <Zap className="w-4 h-4 text-blue-600 mr-2" />
                Fast Delivery
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                <Shield className="w-4 h-4 text-blue-600 mr-2" />
                Secure & Reliable
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons - Mobile First */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12"
          >
            <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                className="hover:bg-blue-700 w-full sm:w-auto bg-blue-600 cursor-pointer text-white  px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base  transition-all duration-300 "
                onClick={() => scrollToSection("contact")}
              >
                Get Started
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 fx px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base  transition-all duration-300"
                onClick={() => scrollToSection("about")}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
