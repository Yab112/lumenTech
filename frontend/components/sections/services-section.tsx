"use client";

import { Badge } from "@/components/ui/badge";
import { services } from "@/app/constants/services";
import { HeaderWithTitleLine } from "@/components/ui/header-with-title-line";

export function ServicesSection() {
  // Ensure services array exists and has items
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section
      id="services"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-[#000515] dark:via-[#000515]/95 dark:to-[#000515]/90"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge
            variant="secondary"
            className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 font-semibold rounded-xl"
          >
            Our Services
          </Badge>

          <HeaderWithTitleLine titleLineColor="#2563eb" animationDelay={0.2}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl  text-neutral-900 dark:text-white mb-6 leading-tight">
              Comprehensive
              <br />
              <span className="text-blue-600 dark:text-blue-400">
                Digital Solutions
              </span>
            </h2>
          </HeaderWithTitleLine>

          <p className="text-base  md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We deliver cutting-edge technology solutions that drive innovation,
            efficiency, and growth for businesses of all sizes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={`service-${index}-${service.title}`}
              className="group relative"
            >
              {/* Service Card */}
              <div className="relative h-full min-h-[300px] bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                {/* Background Image with Overlay */}
                {service.image && (
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20">
                      {service.icon && (
                        <service.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>

                    {service.metrics && (
                      <Badge
                        variant="secondary"
                        className="text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700 rounded-xl"
                      >
                        {service.metrics}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
