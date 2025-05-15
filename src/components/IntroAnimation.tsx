"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const IntroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  // Parallax effect for background elements
  const yBg = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(mouseX, springConfig);
  // Create transform for scale effect
  const scaleTransform = useTransform(moveX, [-0.5, 0.5], [0.8, 1.2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x - 0.5);
        mouseY.set(y - 0.5);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background particles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: yBg, opacity }}
      >
        {/* Generate fixed positions for particles */}
          {Array.from({ length: 20 }, (_, i) => {
            // Use deterministic positions based on index
            const row = Math.floor(i / 5);
            const col = i % 5;
            const left = (col * 20) + ((row % 2) * 10) + 5;
            const top = (row * 20) + 10;
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-blue-400/20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  x: [0, (i % 2 ? 20 : -20), 0],
                  y: [0, (i % 3 ? 15 : -15), 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  scale: scaleTransform,
                }}
              />
            );
          })}
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.span
          className="text-blue-400 mb-4 font-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Hi, my name is
        </motion.span>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Het Thakkar.
        </motion.h1>

        <motion.h2
          className="text-3xl md:text-5xl font-semibold text-gray-300 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          I analyze data to drive insights.
        </motion.h2>

        <motion.p
          className="max-w-2xl text-center text-gray-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          From analyzing data and building ML models to creating smart AI systems, 
          turn complex ideas into simple, useful solutions.
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            onClick={() => {
              const showcaseSection = document.getElementById('showcase');
              if (showcaseSection) {
                showcaseSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
          <motion.button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 border-2 border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full p-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;
