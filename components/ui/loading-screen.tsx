"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white dark:bg-slate-900 flex items-center justify-center z-50"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-20 h-20 border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 rounded-full"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Cpu className="w-8 h-8 text-blue-600" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-20 text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <img
            src="/lumen.jpeg"
            alt="LumenTech Logo"
            className="w-12 h-12 rounded-lg"
          />
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            LumenTech
          </div>
        </div>
        <div className="text-slate-600 dark:text-slate-400">
          Loading amazing experiences...
        </div>
        <motion.div
          animate={{ width: ["0%", "100%"] }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-48 h-1 bg-blue-600 rounded-full mt-4 mx-auto"
        />
      </motion.div>
    </motion.div>
  );
}
