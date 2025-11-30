"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, BriefcaseBusiness, BookOpen, FolderKanban, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  scrollToSection?: (sectionId: string) => void;
}

export function Navigation({ scrollToSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    {
      id: "careers",
      label: "Careers",
      icon: BriefcaseBusiness,
      href: "/careers",
    },
    { id: "blog", label: "Blog", icon: BookOpen, href: "/blog" },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban,
      href: "/projects",
    },
  ];

  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <nav className="relative z-50 hidden lg:block bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              isScrolled ? "h-16" : "h-20"
            )}
          >
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <img
                  src="/lumen.jpeg"
                  alt="LumenTech Logo"
                  className="w-8 h-8 rounded-lg"
                />
                <span className="text-xl font-bold text-blue-900 dark:text-blue-400">
                  LumenTech
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;

                return (
                  <div
                    key={item.id}
                    className="flex items-center"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative font-medium text-sm flex items-center gap-2",
                        isActive
                          ? "text-blue-600 dark:text-blue-400 font-semibold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                    {index < navItems.length - 1 && (
                      <span className="mx-4 text-slate-300 dark:text-slate-600">
                        |
                      </span>
                    )}
                  </div>
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
      </nav>

      {/* Mobile Navigation - Top Bar */}
      <nav className="relative z-50 lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center space-x-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02]">
                <img
                  src="/lumen.jpeg"
                  alt="LumenTech Logo"
                  className="w-6 h-6 rounded"
                />
                <span className="text-lg font-bold text-slate-900 dark:text-blue-400">
                  LumenTech
                </span>
              </div>
            </Link>

            {/* Right side: Trust Indicators + Hamburger Menu */}
            <div className="flex items-center space-x-3">
              {/* Trust Indicators - Mobile */}
              <div className="hidden sm:flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                  <span>Available</span>
                </div>
              </div>

              {/* Hamburger Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Sheet */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
            <SheetHeader>
              <SheetTitle className="flex items-center space-x-2">
                <img
                  src="/lumen.jpeg"
                  alt="LumenTech Logo"
                  className="w-6 h-6 rounded"
                />
                <span>LumenTech</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-base">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            {/* Trust Indicator in Mobile Menu */}
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Available Now</span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}
