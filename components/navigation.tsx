"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Layers,
  Mail,
  ArrowRight,
  Users,
} from "lucide-react";

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

export function Navigation({ scrollToSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["home", "about", "services", "solutions", "team", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "solutions", label: "Solutions", icon: Layers },
    { id: "team", label: "Team", icon: Users },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 hidden lg:block bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              isScrolled ? "h-16" : "h-20"
            )}
          >
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3"
            >
              <img
                src="/lumen.jpeg"
                alt="LumenTech Logo"
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold text-blue-900 dark:text-blue-400">
                LumenTech
              </span>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "relative font-medium transition-all duration-300 text-sm",
                      isActive
                        ? "text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {item.label}
                    {index < navItems.length - 1 && (
                      <span className="mx-4 text-slate-300 dark:text-slate-600">
                        |
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Available Now</span>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Top Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700"
      >
        <div className="px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2"
            >
              <img
                src="/lumen.jpeg"
                alt="LumenTech Logo"
                className="w-6 h-6 rounded"
              />
              <span className="text-lg font-bold text-slate-900 dark:text-blue-400">
                LumenTech
              </span>
            </motion.div>

            {/* Trust Indicators - Mobile */}
            <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Floating Dock (Keep as is) */}
      {/* This will be handled by the existing FloatingDock component */}
    </>
  );
}
