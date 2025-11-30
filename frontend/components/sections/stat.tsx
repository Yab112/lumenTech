import React from "react";

 const stats = [
    {
      number: 500,
      label: "Projects Delivered",
      sublabel: "Enterprise Solutions",
    },
    {
      number: 150,
      label: "Global Clients",
      sublabel: "Fortune 500 Companies",
    },
    {
      number: 99.9,
      label: "Uptime SLA",
      sublabel: "Guaranteed Performance",
    },
    { number: 24, label: "Support", sublabel: "Technical Assistance" },
  ];

const Stat = () => {
  return (
    <div className="w-full mx-auto bg-white/80 dark:bg-blue-950 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 ">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-2 sm:p-3 md:p-4"
          >
            <div className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100">
              <span className="inline-block">
                {typeof stat.number === "number"
                  ? Math.round(stat.number)
                  : stat.number}
                {typeof stat.number === "number" && stat.label === "Uptime SLA"
                  ? "%"
                  : ""}
              </span>
            </div>
            <div className="text-xs sm:text-sm md:text-lg lg:text-2xl text-slate-700 dark:text-slate-200 font-semibold mt-1">
              {stat.label}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {stat.sublabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stat;
