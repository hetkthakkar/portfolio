"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "SQL"]
  },
  {
    title: "Python Libraries",
    skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-Learn", "TensorFlow", "XGBoost", "Beautiful Soup"]
  },
  {
    title: "Technical Skills",
    skills: ["Data Manipulation", "Machine Learning", "Artificial Intelligence", "Business Intelligence"]
  },
  {
    title: "Analytical Skills",
    skills: ["Statistical Analysis", "Predictive Analytics", "Random Forest", "Time Series Forecasting", "Critical Thinking"]
  },
  {
    title: "Tools",
    skills: ["VS Code", "Power BI", "MySQL", "Google Analytics", "Microsoft Office"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Skills</h2>
        <p className="text-gray-400">My technical expertise</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className="bg-[#112240] p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-4">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: categoryIndex * 0.1 + skillIndex * 0.05
                  }}
                  className="text-sm bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
