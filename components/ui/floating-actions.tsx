"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, Bookmark, Share2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function FloatingActions() {
  const [likes, setLikes] = useState(89);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTooltip, setShowTooltip] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "OctopusTech - Global Software Solutions",
          text: "Check out OctopusTech for amazing software solutions!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed right-2 sm:right-3 md:right-6 bottom-16 sm:bottom-20 md:bottom-24 z-40 flex flex-col space-y-2 sm:space-y-3">
      {/* Theme Toggle - Top */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip("theme")}
        onMouseLeave={() => setShowTooltip("")}
        className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
      >
        <ThemeToggle />
        {showTooltip === "theme" && (
          <div className="absolute right-12 sm:right-14 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap hidden sm:block">
            Toggle Theme
          </div>
        )}
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleLike}
        onMouseEnter={() => setShowTooltip("like")}
        onMouseLeave={() => setShowTooltip("")}
        className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
          isLiked
            ? "bg-red-500 text-white"
            : "bg-white dark:bg-white text-slate-600 dark:text-slate-900"
        }`}
      >
        <ThumbsUp
          className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
            isLiked ? "fill-current" : ""
          }`}
        />
        {showTooltip === "like" && (
          <div className="absolute right-12 sm:right-14 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap hidden sm:block">
            {likes} likes
          </div>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBookmark}
        onMouseEnter={() => setShowTooltip("bookmark")}
        onMouseLeave={() => setShowTooltip("")}
        className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
          isBookmarked
            ? "bg-blue-500 text-white"
            : "bg-white dark:bg-white text-slate-600 dark:text-slate-900"
        }`}
      >
        <Bookmark
          className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
            isBookmarked ? "fill-current" : ""
          }`}
        />
        {showTooltip === "bookmark" && (
          <div className="absolute right-12 sm:right-14 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap hidden sm:block">
            Bookmark
          </div>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
        onMouseEnter={() => setShowTooltip("share")}
        onMouseLeave={() => setShowTooltip("")}
        className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white dark:bg-white text-slate-600 dark:text-slate-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
      >
        <Share2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        {showTooltip === "share" && (
          <div className="absolute right-12 sm:right-14 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap hidden sm:block">
            Share
          </div>
        )}
      </motion.button>
    </div>
  );
}
