"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    name: "Skills",
    href: "#skills",
    description: "Technical skills and expertise",
  },
  {
    name: "Experience",
    href: "#experience",
    description: "Professional work history",
  },
  {
    name: "Projects",
    href: "#projects",
    description: "Portfolio of completed projects",
  },
  {
    name: "Certifications",
    href: "#certifications",
    description: "Professional certifications",
  },
  {
    name: "Achievements",
    href: "#achievements",
    description: "Awards and accomplishments",
  },
  {
    name: "Training & Seminars",
    href: "#training",
    description: "Professional development activities",
  },
];

export default function Showcase() {
  return (
    <section id="showcase" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Showcase</h2>
        <p className="text-gray-400">Explore my professional journey</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={section.href}
              className="block p-6 bg-[#112240] rounded-lg hover:bg-[#1a2f55] transition-colors group"
              onClick={(e) => {
                e.preventDefault();
                const targetId = section.href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth',
                    // Adjust the duration of the scroll animation (in ms)
                    // The browser will handle the actual animation
                  });
                }
              }}
            >
              <div className="relative overflow-hidden flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-blue-500 mb-2 group-hover:text-blue-400">
                    {section.name}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300">
                    {section.description}
                  </p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all">
                  <svg
                    className="w-5 h-5 text-blue-500 transform group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
