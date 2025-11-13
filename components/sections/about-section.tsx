"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  Globe,
  Sparkles,
  Users,
  Award,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { HeaderWithTitleLine } from "@/components/ui/header-with-title-line";

export function AboutSection() {
  const stats = [
    { label: "Years Experience", value: "3+", icon: Award },
    { label: "Projects Delivered", value: "25+", icon: CheckCircle },
    { label: "Team Members", value: "4", icon: Users },
    { label: "Technologies", value: "10+", icon: Zap },
  ];

  const values = [
    {
      icon: Target,
      title: "Quality Focus",
      description:
        "We prioritize clean code, best practices, and thorough testing to deliver reliable solutions that stand the test of time.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "As a distributed team, we bring diverse perspectives and work across time zones to serve clients worldwide.",
    },
    {
      icon: Users,
      title: "Personal Touch",
      description:
        "With a small team, every client gets direct access to our developers and personalized attention to their project.",
    },
  ];

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
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="about"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 relative overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <Badge
            variant="secondary"
            className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 font-semibold rounded-xl"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            About LumenTech
          </Badge>

          <HeaderWithTitleLine titleLineColor="#2563eb" animationDelay={0.2}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl  text-neutral-900 dark:text-white mb-6 leading-tight">
              Building Software
              <br />
              <span className="text-blue-600">Solutions</span>
            </h2>
          </HeaderWithTitleLine>

          <p className="text-base sm:text-base text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            We are a global team of passionate developers creating custom
            software solutions. Our mission is to help businesses grow with
            reliable, scalable technology that adapts to their needs.
          </p>
        </div>

        {/* Main Content - Image and Content Side by Side */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <img
                  src="/aboutus.jpg"
                  alt="LumenTech Team"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Achievement Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      3+
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Years of Experience
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Rating Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xl border border-slate-200 dark:border-slate-700"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    5.0
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Client Rating
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            {/* Mission Statement */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl  text-slate-900 dark:text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                To create high-quality software solutions that help businesses
                grow and succeed. We believe in building lasting relationships
                with our clients through reliable, scalable technology and
                personalized service.
              </p>
            </div>

            {/* Core Values */}
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl  text-slate-900 dark:text-white">
                Core Values
              </h3>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                        {value.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upwork Agency Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              onClick={() => window.open("https://www.upwork.com/agencies/1960387200481392711/", "_blank")}
              className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 border-2 border-blue-400 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 group"
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors border-2 border-white/30 shadow-lg">
                      <ExternalLink className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h4 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                          Verified Upwork Agency
                          <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
                        </h4>
                        <Badge className="bg-green-500 text-white text-xs sm:text-sm px-3 py-1 border-0 shadow-lg">
                          ✓ Verified
                        </Badge>
                      </div>
                      <p className="text-white/90 text-sm sm:text-base mb-2 max-w-2xl">
                        Check out our verified Upwork agency profile to see our ratings, reviews, and completed projects.
                      </p>
                      <div className="flex items-center gap-4 text-white/80 text-xs sm:text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          Top Rated
                        </span>
                        <span>•</span>
                        <span>100% Job Success</span>
                        <span>•</span>
                        <span>25+ Projects</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">View Profile</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
