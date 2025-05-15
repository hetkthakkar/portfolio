"use client";

import { motion } from "framer-motion";

const certifications = [
  {
    title: "Badge - Multi AI Agent Systems with crewAI",
    issuer: "CrewAI",
    date: "May 2025"
  },
  {
    title: "Data Visualization with Power BI",
    issuer: "Great Learning",
    date: "August 2024"
  },
  {
    title: "Data Analytics with Python",
    issuer: "NPTEL",
    date: "April 2024"
  },
  {
    title: "Data Science with Python",
    issuer: "Parul University",
    date: "February 2024"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Certifications</h2>
        <p className="text-gray-400">Professional certifications and courses</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#112240] p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                {cert.title}
              </h3>
              <p className="text-gray-300 mb-2">{cert.issuer}</p>
              <p className="text-gray-400 mt-auto text-sm">{cert.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
