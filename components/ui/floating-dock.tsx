"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
    isActive?: boolean;
  }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      {desktopClassName && <FloatingDockDesktop items={items} className={desktopClassName} />}
      {mobileClassName && <FloatingDockMobile items={items} className={mobileClassName} />}
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
    isActive?: boolean;
  }[];
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
      className={cn(
        "fixed bottom-0 left-0 right-0 lg:hidden h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-white/30 dark:border-slate-700/30 px-4 py-2 rounded-full z-50",
        className
      )}
    >
      <div className="flex items-center justify-center w-full max-w-md mx-auto">
        {items.map((item, index) => (
          <motion.a
            key={item.title}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector(item.href);
              if (element) {
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.5,
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex flex-col items-center justify-center p-3 mb-2  rounded-2xl transition-all duration-200 flex-1"
          >
            {/* Background highlight */}
            <motion.div
              className={`absolute inset-0 rounded-2xl ${
                item.isActive
                  ? "bg-gradient-to-t from-blue-500/30 to-purple-500/30"
                  : "bg-gradient-to-t from-blue-500/20 to-purple-500/20"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: item.isActive ? 1 : 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              whileTap={{ opacity: 1, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />

            {/* Icon */}
            <motion.div
              className={`relative z-10 h-6 w-6 transition-colors duration-200  ${
                item.isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.icon}
            </motion.div>

            {/* Label */}
            <span
              className={`relative z-10 text-xs font-medium transition-colors duration-200 text-center leading-tight ${
                item.isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
              }`}
            >
              {item.title}
            </span>

            {/* Active indicator */}
            <motion.div
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
              animate={{
                opacity: item.isActive ? 1 : 0,
                scale: item.isActive ? 1.5 : 1,
              }}
              whileHover={{ opacity: 1, scale: 1.5 }}
              transition={{ duration: 0.2 }}
            />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
    isActive?: boolean;
  }[];
  className?: string;
}) => {
  const mouseY = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => mouseY.set(Number.POSITIVE_INFINITY)}
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
      className={cn(
        "mx-auto hidden lg:flex w-18 flex-col items-center gap-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border dark:border-slate-700/30 px-3 py-4 z-50",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseY={mouseY} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseY,
  title,
  icon,
  href,
  isActive,
}: {
  mouseY: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds || val === Number.POSITIVE_INFINITY) {
      return Number.POSITIVE_INFINITY;
    }

    const containerBounds = ref.current?.offsetParent?.getBoundingClientRect();
    if (!containerBounds) return Number.POSITIVE_INFINITY;

    const elementCenter = bounds.top - containerBounds.top + bounds.height / 2;
    return Math.abs(val - elementCenter);
  });

  // Simplified scaling with better performance
  const scale = useTransform(distance, [0, 40, 80, 120], [1.3, 1.15, 1.05, 1]);

  // Single spring animation for better performance
  const animatedScale = useSpring(scale, {
    stiffness: 400,
    damping: 35,
    mass: 0.1,
  });

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }}
    >
      <motion.div
        ref={ref}
        style={{
          scale: animatedScale,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{
          scale: 0.95,
          transition: {
            type: "spring",
            stiffness: 600,
            damping: 30,
            mass: 0.2,
          },
        }}
        className="relative flex h-11 w-11 items-center justify-center cursor-pointer group will-change-transform rounded-full transition-all duration-200"
      >
        {/* Simplified background - no complex gradients */}
        <motion.div
          className={`absolute inset-0 rounded-xl ${
            isActive ? "bg-blue-500/30" : "bg-blue-500/20"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive || hovered ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />

        {/* Simple border */}
        <div className="absolute inset-0 border rounded-full border-white/20 dark:border-slate-600/20 group-hover:border-white/40 dark:group-hover:border-slate-400/40 transition-colors duration-150" />

        {/* Tooltip - simplified */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -5, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, x: -3, y: "-50%" }}
              transition={{
                type: "spring",
                stiffness: 600,
                damping: 35,
                mass: 0.3,
              }}
              className="absolute left-full ml-3 top-1/2 px-2 py-1 bg-slate-900/95 dark:bg-slate-100/95 text-white dark:text-slate-900 text-xs font-medium rounded-lg whitespace-nowrap shadow-lg z-50 will-change-transform"
            >
              {title}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-slate-900/95 dark:bg-slate-100/95 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon - simplified */}
        <div
          className={`relative z-10 flex h-5 w-5 items-center justify-center transition-colors duration-150 ${
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
          }`}
        >
          {icon}
        </div>

        {/* Simple ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{
            scale: 1.1,
            opacity: [0, 0.5, 0],
            transition: { duration: 0.2 },
          }}
        />
      </motion.div>
    </a>
  );
}
