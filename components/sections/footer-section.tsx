"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  company: [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Solutions", href: "#solutions" },
    { name: "Contact", href: "#contact" },
  ],
  resources: [
    { name: "Portfolio", href: "#portfolio" },
    { name: "Team", href: "#team" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
    ariaLabel: "Visit our GitHub",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
    ariaLabel: "Visit our LinkedIn",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
    ariaLabel: "Visit our Twitter",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@lumentech.com",
    ariaLabel: "Send us an email",
  },
];

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#000515]">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 mb-4"
            >
              <img
                src="/lumen.jpeg"
                alt="LumenTech Logo"
                className="w-10 h-10 rounded-lg"
              />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                LumenTech
              </h3>
            </motion.div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Building innovative software solutions that empower businesses to
              grow and succeed in the digital age.
            </p>
          </motion.div>

          {/* Links Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 grid grid-cols-2 gap-8"
          >
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Social & CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4"
          >
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <button
              onClick={scrollToTop}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
            >
              Back to top
              <ArrowUpRight className="w-3 h-3 ml-1 rotate-[-45deg] group-hover:rotate-0 transition-transform duration-200" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              © {currentYear} LumenTech. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-slate-500 dark:text-slate-500">
              <a
                href="#privacy"
                className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="#terms"
                className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-200"
              >
                Terms
              </a>
              <a
                href="#cookies"
                className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-200"
              >
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
