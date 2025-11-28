"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";
import { CursorTrail } from "@/components/ui/cursor-trail";
import { StatusBar } from "@/components/ui/status-bar";
import { FloatingActions } from "@/components/ui/floating-actions";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Navigation } from "@/components/navigation";
import { links } from "./constants/navitems";

import Stat from "@/components/sections/stat";

export default function LumenTechWebsite() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] transition-colors duration-300">
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <>
          <CursorTrail />
          <StatusBar />
          <FloatingActions />
          <ScrollProgress />
          <ScrollToTop />

          <div className="space-y-0">
            <div className="relative">
              <Navigation scrollToSection={scrollToSection} />
              <HeroSection scrollToSection={scrollToSection} />
            </div>
            <div className="relative -mt-20 sm:-mt-32">
              <AboutSection />
            </div>
            <ServicesSection />
            <SolutionsSection />
            <TestimonialsSection />
            <TeamSection />
            <ContactSection scrollToSection={scrollToSection} />
            <FooterSection />
          </div>
          <FloatingDock
            items={links}
            mobileClassName="fixed bottom-0 left-0 right-0 lg:hidden"
          />
        </>
      )}
    </div>
  );
}
