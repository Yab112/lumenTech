"use client";

import {
  FaShopify,
  FaSpotify,
  FaStripe,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaClock,
  FaUser,
  FaMapMarkerAlt,
  FaCheck,
} from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CalendlyEmbed = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  // Generate time slots
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ];

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split("T")[0],
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
      });
    }
    return days;
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show embedded Calendly instead of redirecting
    setStep(5);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetBooking = () => {
    setSelectedDate("");
    setSelectedTime("");
    setStep(1);
    setFormData({ name: "", email: "", company: "", phone: "", message: "" });
  };

  // Add a function to handle direct Calendly access
  const openDirectCalendly = () => {
    setStep(5);
  };

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900" id="book-me">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 text-sm font-semibold rounded-full mb-6 shadow-lg">
            <FaCalendar className="w-4 h-4 mr-2" />
            Free 30-Min Discovery Call
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-semibold text-neutral-900 dark:text-white mb-6 leading-tight">
            Let's Build Something
            <span className="block text-slate-800 dark:text-white mb-8">
              Amazing Together
            </span>
          </h2>
          <p className="text-sm  text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            Schedule a free consultation with our expert team. No pressure, no
            obligations - just a professional chat about your project.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openDirectCalendly}
            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300"
          >
            <FaCalendar className="w-4 h-4 mr-2" />
            Book Directly on Calendly
          </motion.button>
        </motion.div>

        {/* Main Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Background Border */}
          <div className="absolute -inset-1 bg-slate-200 dark:bg-slate-700 rounded-3xl"></div>

          <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-800 dark:bg-slate-700 p-4 sm:p-6 md:p-8 text-white relative overflow-hidden">
              <div className="relative flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/20">
                    <FaCalendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                      LumenTech
                    </h3>
                    <p className="text-slate-200 text-sm sm:text-lg">
                      30 min discovery call
                    </p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-2xl sm:text-3xl font-bold">Free</div>
                  <div className="text-slate-200 text-sm sm:text-base">
                    No cost
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                {[1, 2, 3, 4, 5].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
                        step >= stepNum
                          ? "bg-slate-800 dark:bg-slate-600 text-white scale-110"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {step >= stepNum ? (
                        <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      ) : (
                        stepNum
                      )}
                    </div>
                    {stepNum < 5 && (
                      <div
                        className={`w-8 sm:w-12 h-1 mx-2 sm:mx-3 rounded-full transition-all duration-300 ${
                          step > stepNum
                            ? "bg-slate-800 dark:bg-slate-600"
                            : "bg-slate-200 dark:bg-slate-700"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
                      Select a Date
                    </h4>
                    <div className="grid grid-cols-7 gap-2 sm:gap-3">
                      {getNextDays().map((day) => (
                        <motion.button
                          key={day.date}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDateSelect(day.date)}
                          className="group p-2 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 bg-white dark:bg-slate-800"
                        >
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {day.day}
                          </div>
                          <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                            {day.dayNum}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {day.month}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(1)}
                        className="flex items-center space-x-1 sm:space-x-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-semibold text-sm sm:text-base"
                      >
                        <span>←</span>
                        <span>Back</span>
                      </motion.button>
                      <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Select a Time
                      </h4>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-6 sm:mb-8">
                      <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-semibold">
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 max-h-64 sm:max-h-80 overflow-y-auto scrollbar-hide">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTimeSelect(time)}
                          className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(2)}
                        className="flex items-center space-x-1 sm:space-x-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-semibold text-sm sm:text-base"
                      >
                        <span>←</span>
                        <span>Back</span>
                      </motion.button>
                      <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Enter Details
                      </h4>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-6 sm:mb-8">
                      <div className="flex items-center space-x-2 sm:space-x-3 text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">
                        <FaCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        <span className="font-semibold text-sm sm:text-base">
                          {new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-slate-700 dark:text-slate-300">
                        <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                        <span className="font-semibold text-sm sm:text-base">
                          {selectedTime}
                        </span>
                      </div>
                    </div>

                    <form
                      onSubmit={handleFormSubmit}
                      className="space-y-4 sm:space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 sm:p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-lg transition-all duration-300"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 sm:p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-lg transition-all duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full p-3 sm:p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-lg transition-all duration-300"
                            placeholder="Your company"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-3 sm:p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-lg transition-all duration-300"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          Project Details
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full p-3 sm:p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-lg transition-all duration-300 resize-none"
                          placeholder="Tell us about your project, goals, and timeline..."
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-slate-800 dark:bg-slate-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-300"
                      >
                        Schedule Meeting
                      </motion.button>
                    </form>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <FaCheck className="w-10 h-10 text-white" />
                    </motion.div>

                    <h4 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-semibold text-neutral-900 dark:text-white mb-6 leading-tight">
                      Ready to Schedule!
                    </h4>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-md mx-auto">
                      Great! Now let's schedule your meeting. You can select
                      your preferred time slot below.
                    </p>

                    <div className="bg-slate-50 dark:bg-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 max-w-md mx-auto">
                      <div className="flex items-center space-x-2 sm:space-x-3 text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">
                        <FaCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        <span className="font-semibold text-sm sm:text-base">
                          {new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-slate-700 dark:text-slate-300">
                        <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                        <span className="font-semibold text-sm sm:text-base">
                          {selectedTime}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(5)}
                      className="bg-slate-800 dark:bg-slate-700 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-300"
                    >
                      Continue to Calendar
                    </motion.button>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(3)}
                        className="flex items-center space-x-1 sm:space-x-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-semibold text-sm sm:text-base"
                      >
                        <span>←</span>
                        <span>Back</span>
                      </motion.button>
                      <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Select Your Time
                      </h4>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                      <iframe
                        src="https://calendly.com/edentech4/30min?embed_domain=localhost&embed_type=Inline"
                        width="100%"
                        height="700"
                        frameBorder="0"
                        title="Schedule a meeting"
                        className="w-full"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-500 dark:text-slate-400 mt-8 text-base sm:text-lg"
        >
          No pressure. No obligations. Just a professional consultation about
          your project.
        </motion.p>
      </div>
    </section>
  );
};

export default CalendlyEmbed;
