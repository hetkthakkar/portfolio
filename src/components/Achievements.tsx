"use client";

import { motion } from "framer-motion";

const achievements = [
  {
    title: "Research Paper Publication",
    description: "THE ROLE OF DATA ANALYST IN ENHANCING OPERATIONAL EFFICIENCY IN BUSINESS",
    details: "IJPREMS Journal - Volume 05, Issue 03, March 2025",
    category: "Academic"
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Achievements</h2>
        <p className="text-gray-400">Notable accomplishments and recognitions</p>
      </motion.div>

      <div className="space-y-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#112240] p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-300 mb-2">{achievement.description}</p>
                <p className="text-gray-400 text-sm">{achievement.details}</p>
              </div>
              <span className="text-sm text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full mt-2 md:mt-0">
                {achievement.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
