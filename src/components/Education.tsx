"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const education = [
  {
    title: "Bachelor's in Computer Science Engineering",
    institution: "Parul University, Vadodara, Gujarat, India",
    duration: "2021 - 2025",
    description: "Gained in-depth knowledge of computer science fundamentals, data analysis, machine learning, and programming languages such as Python, SQL, and Java.",
    courses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Machine Learning",
      "Web Development",
      "Computer Networks"
    ],
    achievements: [
      "Scored 7.31 CGPA",
      "Led the development of a smart parking and car rental system using Flutter, enhancing user convenience and resource management.",
      "Published a research paper on 'The Role of Data Analysts in Enhancing Operational Efficiency in Business' (IJPREMS Journal - Volume 05, Issue 03, March 2025)."
    ]
  },
  {
    title: "Higher Secondary School",
    institution: " Alembic Vidyalaya, Vadodara, Gujarat, India",
    duration: "2020 - 2021",
    description: "Focus on subjects like Mathematics, Physics, and Computer, building a strong foundation for engineering studies.",
    courses: [
      "Mathematics",
      "Physics",
      "Computer",
      "Chemistry",
      "English"
    ],
    achievements: [
      "Scored 79.54% in board examinations"
    ]
  },
  {
    title: "Secondary School",
    institution: " Alembic Vidyalaya, Vadodara, Gujarat, India",
    duration: "2019 - 2020",
    description: "Focused on foundational subjects, establishing a strong academic base for higher secondary education and beyond.",
    courses: [
      "Mathematics",
      "Science",
      "English",
      "Social Studies",
      "Hindi"
    ],
    achievements: [
      "Scored 74.67% in board examinations"
    ]
  }
];

export default function Education() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto" id="education">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Education</h2>
        <p className="text-gray-400">Click on any education to learn more</p>
      </motion.div>

      <div className="space-y-12">
        {education.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative pl-8 border-l-2 border-blue-500 cursor-pointer transition-all ${expandedIndex === index ? 'bg-[#1a2f55] p-6 rounded-lg -ml-8 pl-16' : ''}`}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 transition-transform hover:scale-125" />
            <div className="mb-1 text-blue-400">{item.duration}</div>
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
              {item.title}
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
            <p className="text-gray-400 mb-2">{item.institution}</p>
            <p className="text-gray-300 mb-4">{item.description}</p>
            
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
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Key Courses</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.courses.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Achievements</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {item.achievements.map((achievement) => (
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
