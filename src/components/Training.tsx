"use client";

import { motion } from "framer-motion";

const trainings = [
  {
    "title": "Impact Training for Interview Preparation",
    "organization": "Bytexl",
    "date": "May 2024 - June 2024",
    "description": "Completed professional development training focused on interview skills and career readiness."
  },
  {
    "title": "GDSC WOW Gujarat",
    "organization": "Google Developer Student Clubs",
    "date": "05 May, 2024",
    "description": "Participated in a technical event focused on knowledge sharing and networking with developers across Gujarat."
  }
];

export default function Training() {
  return (
    <section id="training" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-4">
          Training & Seminars
        </h2>
        <p className="text-gray-400">Professional development activities</p>
      </motion.div>

      <div className="space-y-8">
        {trainings.map((training, index) => (
          <motion.div
            key={training.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#112240] p-6 rounded-lg hover:bg-[#1a2f55] transition-all transform hover:-translate-y-1"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-blue-500">
                {training.title}
              </h3>
              <div className="flex items-center space-x-4 mt-2 md:mt-0">
                <span className="text-gray-400">{training.organization}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">{training.date}</span>
              </div>
            </div>
            <p className="text-gray-300">{training.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
