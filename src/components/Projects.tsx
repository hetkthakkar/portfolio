"use client";

import { motion } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const projects = [
  {
    "title": "Fully Automated Universal Data Analysis using AI Agents",
    "description": "An AI agent-driven system for fully automated data analysis with zero human interaction.",
    "tech": ["AI", "Data Analysis", "Automation", "Machine Learning"],
    "category": "Automation",
    "link": "https://github.com/hetkhakkar/ai-data-analysis"
  },
  {
    "title": "Simple Weather AI Agent",
    "description": "AI-driven agent for real-time data.",
    "tech": ["AI", "Weather Prediction", "Machine Learning", "Python"],
    "category": "Machine Learning",
    "link": "https://github.com/hetkhakkar/weather-ai-agent"
  },
  {
    "title": "Resume Parser using AI Agent",
    "description": "An AI-based system to automatically extract and analyze information from resumes.",
    "tech": ["AI", "Natural Language Processing", "Python", "Machine Learning"],
    "category": "AI/NLP",
    "link": "https://github.com/hetkhakkar/resume-parser-ai"
  },
  {
      "title": "RAG Chatbot for Document Q&A",
      "description": "Upload documents and ask questions to get context-aware answers using AI.",
      "tech": ["AI", "Natural Language Processing", "Python", "LangChain", "Hugging Face", "FAISS"],
      "category": "AI/NLP",
      "link": "https://github.com/hetkhakkar/rag-chatbot"
  },    
  {
    "title": "Driver Drowsiness and Finger Detection",
    "description": "Python-based system using OpenCV to detect driver drowsiness and finger count.",
    "tech": ["Python", "OpenCV", "Computer Vision", "Machine Learning"],
    "category": "Computer Vision",
    "link": "https://github.com/hetkhakkar/driver-drowsiness-detection"
  },
  {
    title: "Sweet Manufacturer Data Analysis",
    description: "Derive business insights and optimize production strategies",
    tech: ["Python", "Data Analysis", "Business Intelligence"],
    category: "Data Analysis",
    link: "https://github.com/hetkhakkar/sweet-manufacturer-analysis"
  },
  {
    title: "Ola Data Analytics End to End Project",
    description: "Analysed trends, optimize pricing, and improve user experience",
    tech: ["Python", "Data Analysis", "Machine Learning"],
    category: "Data Analytics",
    link: "https://github.com/hetkhakkar/ola-data-analytics"
  },
  {
    title: "IMDB Top Movies Ratings - Web Scrapping",
    description: "Extracted data and analysed movie ratings through web scraping",
    tech: ["Python", "Web Scraping", "Data Analysis"],
    category: "Web Scraping",
    link: "https://github.com/hetkhakkar/imdb-web-scraping"
  },
  {
    "title": "Titanic Survival Prediction",
    "description": "Predicting survival on the Titanic using machine learning algorithms in Python.",
    "tech": ["Python", "Data Analysis", "Machine Learning", "Scikit-learn", "Logistic Regression"],
    "category": "Machine Learning",
    "link": "https://github.com/hetkhakkar/titanic-survival-prediction"
  },
  {
    title: "Amazon Prime Dashboard",
    description: "Interactive dashboard for content analysis",
    tech: ["Power BI", "Data Visualization", "Analytics"],
    category: "Data Visualization",
    link: "https://github.com/hetkhakkar/amazon-prime-dashboard"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Projects</h2>
        <p className="text-gray-400">Some of my recent work</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#112240] p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-110"
              aria-label={`View ${project.title} project`}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
