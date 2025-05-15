"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const experiences = [
  {
    title: "Data Analyst Intern",
    company: "Astar Technologies.",
    duration: "December, 2024 - Present",
    description: "Developed an analytics platform for extracting insights and predicting trends from e-commerce datasets using Python. Applied machine learning models for sales forecasting and customer segmentation.",
    skills: ["Python", "Data Analysis","Power BI", "SQL","Excel","Google Analytics","Looker Studio"],
    achievements: [
      "Generated comprehensive business insights through data visualization",
      "Built predictive models to forecast product sales trends"
    ]
  },
  {
    title: "Data Science Intern",
    company: "Main Flow Services and Technologies.",
    duration: "June, 2024 - August, 2024",
    description: "Worked on data science and machine learning tasks, supporting data-driven decision-making through advanced data modeling and visualization techniques.",
    skills: ["Python", "Machine Learning", "Data Analysis"],
    achievements: [
      "Developed machine learning models to predict business trends",
      "Presented data-driven insights for strategic decisions"
    ]
  }
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Experience</h2>
        <p className="text-gray-400">Click on any experience to learn more</p>
      </motion.div>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative pl-8 border-l-2 border-blue-500 cursor-pointer transition-all ${expandedIndex === index ? 'bg-[#1a2f55] p-6 rounded-lg -ml-8 pl-16' : ''}`}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 transition-transform hover:scale-125" />
            <div className="mb-1 text-blue-400">{exp.duration}</div>
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
              {exp.title}
              <motion.svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={false}
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </h3>
            <p className="text-gray-400 mb-2">{exp.company}</p>
            <p className="text-gray-300 mb-4">{exp.description}</p>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: expandedIndex === index ? "auto" : 0,
                opacity: expandedIndex === index ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-700 mt-4">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Skills Used</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Key Achievements</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {exp.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
