"use client";

import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  ExternalLink,
  Crown,
  Link as LinkIcon,
  Star,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { HeaderWithTitleLine } from "@/components/ui/header-with-title-line";

const teamMembers = [
  {
    name: "Biniyam Haile",
    role: "Senior Developer & Project Manager",
    description:
      "Senior developer and project manager with extensive experience working with big companies. Leading our team with technical expertise and proven project management skills.",
    upworkUrl: "https://www.upwork.com/freelancers/~01f09f188a94709c1d",
    imageUrl: "/bini_updated.png",
    isManager: true,
    degree: "BSc in Software Engineering / AI stream",
    upworkBadge: "Top Rated Plus",
    badgeIcon: Star,
    badgeColor: "text-pink-500",
    jobSuccess: "100% Job Success",
  },
  {
    name: "Sosina Esayas",
    role: "Developer",
    description: "Experienced developer delivering quality software solutions",
    upworkUrl: "https://www.upwork.com/freelancers/~01da1ecb0665ff6f4f",
    imageUrl:
      "https://www.upwork.com/profile-portraits/c1rwYiK2RQYdtVQIF9Czyu5EKQKefj4mgZysLmlHk4bzCmBlfEtRucobIUidtjVtl3",
    isManager: false,
    degree: "BSc in Software Engineering / AI stream",
    upworkBadge: "Top Rated",
    badgeIcon: Star,
    badgeColor: "text-blue-500",
    jobSuccess: "100% Job Success",
  },
  {
    name: "Yabibal Eshetie",
    role: "Developer",
    description: "Skilled developer creating innovative software solutions",
    upworkUrl: "https://www.upwork.com/freelancers/~01d3355c4ac6227baf",
    imageUrl: "/papu.png",
    isManager: false,
    degree: "BSc in Information Science",
    upworkBadge: "Rising Talent",
    badgeIcon: TrendingUp,
    badgeColor: "text-green-500",
    jobSuccess: "100% Job Success",
  },
];

export function TeamSection() {
  const manager = teamMembers.find((member) => member.isManager);
  const otherMembers = teamMembers.filter((member) => !member.isManager);

  return (
    <section
      id="team"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge
            variant="secondary"
            className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 font-semibold rounded-xl"
          >
            Our Team
          </Badge>

          <HeaderWithTitleLine titleLineColor="#2563eb" animationDelay={0.2}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl text-neutral-900 dark:text-white mb-6 leading-tight">
              Meet the <br />
              <span className="text-blue-600">LumenTech Team</span>
            </h2>
          </HeaderWithTitleLine>

          <p className="text-sm sm:text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            We are a verified Upwork agency with a dedicated team of
            professionals committed to delivering exceptional software
            solutions. Our team includes talented developers, UI designers, and AI engineers working together to bring your vision to life.
          </p>
        </div>

        {/* Team Layout - Manager in center, others on sides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start min-h-[600px]">
          {/* Left Team Member */}
          {otherMembers[0] && (
            <div className="flex flex-col items-center text-center order-2 lg:order-1">
              <a
                href={otherMembers[0].upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full"
              >
                <div className="mb-6">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-700 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-all duration-200 mx-auto bg-slate-200 dark:bg-slate-700">
                    <img
                      src={otherMembers[0].imageUrl}
                      alt={otherMembers[0].name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {otherMembers[0].name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-base sm:text-lg flex items-center justify-center gap-2">
                    {otherMembers[0].role}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  {otherMembers[0].degree && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      {otherMembers[0].degree}
                    </p>
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {otherMembers[0].jobSuccess}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const BadgeIcon = otherMembers[0].badgeIcon;
                        return (
                          <BadgeIcon
                            className={`w-4 h-4 ${otherMembers[0].badgeColor}`}
                          />
                        );
                      })()}
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {otherMembers[0].upworkBadge}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Manager in Center */}
          {manager && (
            <div className="flex flex-col items-center text-center order-1 lg:order-2">
              <a
                href={manager.upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full"
              >
                <div className="mb-6 relative">
                  <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-blue-400 dark:border-blue-500 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-300 mx-auto shadow-2xl group-hover:shadow-blue-500/20 bg-slate-200 dark:bg-slate-700">
                    <img
                      src={manager.imageUrl}
                      alt={manager.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Badge className="bg-yellow-500 text-white border-0 shadow-md">
                      Manager
                    </Badge>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {manager.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-base sm:text-lg flex items-center justify-center gap-2">
                    {manager.role}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  {manager.degree && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      {manager.degree}
                    </p>
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {manager.jobSuccess}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const BadgeIcon = manager.badgeIcon;
                        return (
                          <BadgeIcon
                            className={`w-4 h-4 ${manager.badgeColor}`}
                          />
                        );
                      })()}
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {manager.upworkBadge}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Right Team Member */}
          {otherMembers[1] && (
            <div className="flex flex-col items-center text-center order-3">
              <a
                href={otherMembers[1].upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full"
              >
                <div className="mb-6">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-700 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-all duration-200 mx-auto bg-slate-200 dark:bg-slate-700">
                    <img
                      src={otherMembers[1].imageUrl}
                      alt={otherMembers[1].name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {otherMembers[1].name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-base sm:text-lg flex items-center justify-center gap-2">
                    {otherMembers[1].role}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  {otherMembers[1].degree && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      {otherMembers[1].degree}
                    </p>
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {otherMembers[1].jobSuccess}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const BadgeIcon = otherMembers[1].badgeIcon;
                        return (
                          <BadgeIcon
                            className={`w-4 h-4 ${otherMembers[1].badgeColor}`}
                          />
                        );
                      })()}
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {otherMembers[1].upworkBadge}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>

        {/* Upwork Agency Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
            <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Verified Upwork Agency</span> -
              Check out our{" "}
              <a
                href="https://www.upwork.com/agencies/1960387200481392711/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Upwork profile
              </a>{" "}
              to see our work and ratings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
