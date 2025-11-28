"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Award,
  DollarSign,
  Globe,
} from "lucide-react";
import { HeaderWithTitleLine } from "@/components/ui/header-with-title-line";

const trustFactors = [
  {
    icon: CheckCircle,
    title: "On-Time Delivery",
    description: "We meet deadlines and deliver projects on schedule",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-white dark:bg-slate-800/50",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous testing and code reviews for reliable solutions",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-white dark:bg-slate-800/50",
  },
  {
    icon: Clock,
    title: "Responsive Support",
    description: "Quick response times and ongoing maintenance",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-white dark:bg-slate-800/50",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Built to grow with your business needs",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-white dark:bg-slate-800/50",
  },
  {
    icon: DollarSign,
    title: "Cost-Effective",
    description: "Competitive pricing without compromising quality",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-white dark:bg-slate-800/50",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Successfully delivered projects",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-white dark:bg-slate-800/50",
  },
  {
    icon: Users,
    title: "Direct Communication",
    description: "Work directly with developers, no middlemen",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-white dark:bg-slate-800/50",
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description: "Experience working with international clients",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-white dark:bg-slate-800/50",
  },
];

export function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#000515]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge
            variant="secondary"
            className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 font-semibold rounded-xl"
          >
            Trusted Partners
          </Badge>

          <HeaderWithTitleLine titleLineColor="#2563eb" animationDelay={0.2}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl  text-neutral-900 dark:text-white mb-6 leading-tight">
              Trusted by Growing <br />
              <span className="text-blue-600">Businesses</span>
            </h2>
          </HeaderWithTitleLine>

          <p className="text-sm sm:text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            We're proud to help businesses of all sizes succeed with technology.
            Partner with LumenTech for reliable, scalable software solutions.
          </p>
        </div>

        {/* Trust Factors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {trustFactors.map((factor, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div
                className={`${factor.bgColor} rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 h-full`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`${factor.color}  w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <factor.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {factor.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {factor.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
