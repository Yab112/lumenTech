"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Quote, Building2, User } from "lucide-react";
import { HeaderWithTitleLine } from "@/components/ui/header-with-title-line";

const testimonials = [
  {
    content:
      "LumenTech delivered an excellent web application for our startup. The team was responsive, professional, and delivered exactly what we needed. Their attention to detail and clean code made future updates easy.",
    rating: 5,
    client: "Sarah Johnson",
    position: "Founder",
    company: "StartupFlow",
    industry: "SaaS",
    project: "Web Application",
    results: "On-time delivery",
  },
  {
    content:
      "Working with LumenTech was a great experience. They built our mobile app quickly and efficiently. The team communicated well throughout the project and delivered a quality product that our users love.",
    rating: 5,
    client: "Michael Chen",
    position: "Product Manager",
    company: "AppVenture",
    industry: "Mobile",
    project: "Mobile App",
    results: "Great user feedback",
  },
  {
    content:
      "The team at LumenTech helped us modernize our backend systems. They were knowledgeable, easy to work with, and delivered a robust solution that scales with our business growth.",
    rating: 5,
    client: "Emily Rodriguez",
    position: "CTO",
    company: "TechStart",
    industry: "E-commerce",
    project: "Backend Development",
    results: "Improved performance",
  },
  {
    content:
      "LumenTech's cloud solutions helped us migrate to AWS smoothly. Their expertise and guidance made the transition seamless. We're very satisfied with the results and ongoing support.",
    rating: 5,
    client: "David Kim",
    position: "DevOps Lead",
    company: "CloudFirst",
    industry: "SaaS",
    project: "Cloud Migration",
    results: "Smooth migration",
  },
  {
    content:
      "Excellent work on our custom software solution. The team understood our requirements perfectly and delivered a solution that exceeded our expectations. Highly recommended for small to medium projects.",
    rating: 5,
    client: "Lisa Thompson",
    position: "Operations Manager",
    company: "BusinessPro",
    industry: "Services",
    project: "Custom Software",
    results: "Exceeded expectations",
  },
  {
    content:
      "LumenTech helped us build our MVP quickly and cost-effectively. Their team was professional, delivered on time, and provided great ongoing support. Perfect for startups and growing businesses.",
    rating: 5,
    client: "Robert Wilson",
    position: "CEO",
    company: "InnovateCorp",
    industry: "Technology",
    project: "MVP Development",
    results: "Fast delivery",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#000515]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge
            variant="secondary"
            className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 font-semibold rounded-xl"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Client Testimonials
          </Badge>

          <HeaderWithTitleLine titleLineColor="#2563eb" animationDelay={0.2}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl  text-neutral-900 dark:text-white mb-6 leading-tight">
              Trusted by Growing <br />
              <span className="text-blue-600">Businesses</span>
            </h2>
          </HeaderWithTitleLine>

          <p className="text-sm sm:text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            See what our clients say about working with LumenTech. We're proud
            to help businesses of all sizes succeed with technology.
          </p>
        </div>

        {/* Horizontal Infinite Scroll Testimonials */}
        <div className="relative overflow-hidden h-48">
          {/* Gradient Overlays for Smooth Edges */}
          <div className="absolute left-0 top-0 w-8 sm:w-20 h-48 bg-gradient-to-r from-slate-50 dark:from-[#000515] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-8 sm:w-20 h-48 bg-gradient-to-l from-slate-50 dark:from-[#000515] to-transparent z-10"></div>

          {/* Infinite Scroll Container */}
          <div className="flex space-x-2 sm:space-x-4 md:space-x-8 animate-scroll h-48">
            {/* First Set */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`first-${index}`}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-64 sm:w-80 md:w-96 h-48"
              >
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 h-full">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.rating}.0
                    </span>
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-2 sm:mb-6 text-xs sm:text-sm line-clamp-3 sm:line-clamp-none">
                    "{testimonial.content}"
                  </p>

                  {/* Client Information */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                          {testimonial.client}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span className="text-xs font-medium text-slate-900 dark:text-white">
                          {testimonial.company}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                        {testimonial.industry}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Second Set (for seamless loop) */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`second-${index}`}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-64 sm:w-80 md:w-96 h-48"
              >
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 h-full">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.rating}.0
                    </span>
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-sm">
                    "{testimonial.content}"
                  </p>

                  {/* Client Information */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                          {testimonial.client}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span className="text-xs font-medium text-slate-900 dark:text-white">
                          {testimonial.company}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                        {testimonial.industry}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-scroll {
            animation: scroll 60s linear infinite;
          }
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .line-clamp-none {
            display: block;
            -webkit-line-clamp: unset;
            -webkit-box-orient: unset;
            overflow: visible;
          }
        }
      `}</style>
    </section>
  );
}
