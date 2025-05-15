"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";

type CursorVariant = "default" | "hover" | "text" | "button";

export default function CustomCursor() {
  // Get theme information
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  
  // Use motion values for smoother animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseSpeed = useMotionValue(0);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  
  // Create spring animations for smooth following effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  // Faster spring for the dot cursor
  const dotSpringConfig = { damping: 40, stiffness: 400, mass: 0.2 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);
  
  // Transform mouse speed to scale and opacity
  const cursorScale = useTransform(mouseSpeed, [0, 500], [1, 1.5]);
  const dotScale = useTransform(mouseSpeed, [0, 500], [1, 0.5]);
  const trailOpacity = useTransform(mouseSpeed, [0, 100, 500], [0, 0.5, 0.8]);
  
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [isOnDarkBg, setIsOnDarkBg] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      // Calculate mouse speed for dynamic effects
      const dx = e.clientX - lastMousePosition.current.x;
      const dy = e.clientY - lastMousePosition.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      mouseSpeed.set(speed);
      
      // Update position
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
      
      // Check background color under cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        // Get the computed style of the element
        const computedStyle = getComputedStyle(element);
        let bgColor = computedStyle.backgroundColor;
        
        // If the background is transparent, check parent elements
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
          let parentElement = element.parentElement;
          let maxIterations = 5; // Prevent infinite loops
          
          while (parentElement && maxIterations > 0) {
            const parentBgColor = getComputedStyle(parentElement).backgroundColor;
            if (parentBgColor !== 'rgba(0, 0, 0, 0)' && parentBgColor !== 'transparent') {
              bgColor = parentBgColor;
              break;
            }
            parentElement = parentElement.parentElement;
            maxIterations--;
          }
        }
        
        // Simple check if background is dark
        const isElementOnDarkBg = isDarkColor(bgColor);
        setIsOnDarkBg(isElementOnDarkBg);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Handle hover states for interactive elements
    const handleLinkHoverStart = () => setCursorVariant("hover");
    const handleButtonHoverStart = () => setCursorVariant("button");
    const handleTextHoverStart = () => setCursorVariant("text");
    const handleHoverEnd = () => setCursorVariant("default");
    
    // Add event listeners for cursor position and state
    window.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    // Add event listeners for interactive elements
    const links = document.querySelectorAll("a, .cursor-hover, nav a, header a");
    const buttons = document.querySelectorAll("button, .cursor-button, input[type='submit']");
    const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, .cursor-text, nav span, header span");
    const inputs = document.querySelectorAll("input, textarea");
    
    links.forEach(link => {
      link.addEventListener("mouseenter", handleLinkHoverStart);
      link.addEventListener("mouseleave", handleHoverEnd);
    });
    
    buttons.forEach(button => {
      button.addEventListener("mouseenter", handleButtonHoverStart);
      button.addEventListener("mouseleave", handleHoverEnd);
    });
    
    textElements.forEach(element => {
      element.addEventListener("mouseenter", handleTextHoverStart);
      element.addEventListener("mouseleave", handleHoverEnd);
    });
    
    inputs.forEach(input => {
      input.addEventListener("mouseenter", () => {
        setCursorVariant("text");
        // Add a class to show the default cursor on inputs
        document.body.classList.add("use-default-cursor");
      });
      input.addEventListener("mouseleave", () => {
        handleHoverEnd();
        document.body.classList.remove("use-default-cursor");
      });
    });

    return () => {
      // Remove event listeners
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      
      // Clean up interactive element listeners
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleLinkHoverStart);
        link.removeEventListener("mouseleave", handleHoverEnd);
      });
      
      buttons.forEach(button => {
        button.removeEventListener("mouseenter", handleButtonHoverStart);
        button.removeEventListener("mouseleave", handleHoverEnd);
      });
      
      textElements.forEach(element => {
        element.removeEventListener("mouseenter", handleTextHoverStart);
        element.removeEventListener("mouseleave", handleHoverEnd);
      });
      
      inputs.forEach(input => {
        input.removeEventListener("mouseenter", () => {});
        input.removeEventListener("mouseleave", () => {});
      });
    };
  }, [mouseX, mouseY, mouseSpeed, isDarkMode]);
  
  // Helper function to determine if a color is dark
  const isDarkColor = (color: string) => {
    // Default to dark mode setting if color is transparent or not parseable
    if (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
      // For navbar and similar elements, we'll assume they're dark
      // This ensures the cursor remains visible on elements like the navbar
      return true;
    }
    
    // Parse RGB values
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return true; // Default to dark background assumption
    
    // Calculate perceived brightness
    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    return brightness < 128;
  };

  // Define cursor variants for different states with adaptive colors
  const getCursorColor = () => {
    return isOnDarkBg ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
  };
  
  const getAccentColor = () => {
    return "rgba(59, 130, 246, 0.8)"; // Blue accent color
  };
  
  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: getCursorColor(),
      border: "none",
      scale: isClicking ? 0.9 : 1,
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: "transparent",
      border: `2px solid ${getAccentColor()}`,
      scale: isClicking ? 0.9 : 1,
    },
    button: {
      width: 48,
      height: 48,
      backgroundColor: getAccentColor(),
      borderRadius: "8px",
      scale: isClicking ? 0.9 : 1,
    },
    text: {
      width: 24,
      height: 24,
      backgroundColor: getCursorColor(),
      scale: isClicking ? 0.9 : 1,
    },
  };

  // Define dot cursor variants
  const dotVariants = {
    default: {
      width: 8,
      height: 8,
      opacity: 1,
      backgroundColor: getAccentColor(),
    },
    hover: {
      width: 6,
      height: 6,
      opacity: 1,
      backgroundColor: getAccentColor(),
    },
    button: {
      width: 0,
      height: 0,
      opacity: 0,
    },
    text: {
      width: 4,
      height: 4,
      opacity: 1,
      backgroundColor: getAccentColor(),
    },
  };
  
  // Define trail effect variants
  const trailVariants = {
    default: {
      opacity: 0.3,
      scale: 0.5,
    },
    hover: {
      opacity: 0.5,
      scale: 0.7,
    },
    button: {
      opacity: 0.5,
      scale: 0.7,
    },
    text: {
      opacity: 0.2,
      scale: 0.3,
    },
  };

  // Add a style tag for global cursor styles
  useEffect(() => {
    // Add a style tag to hide the default cursor when our custom one is active
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      body:not(.use-default-cursor) * {
        cursor: none !important;
      }
      .use-default-cursor * {
        cursor: auto !important;
      }
      /* Ensure the cursor is visible on all elements including navbar */
      header, nav, .navbar, [class*="nav"], [class*="header"], [class*="menu"] {
        z-index: 40 !important;
      }
    `;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full"
        style={{
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          scale: cursorScale,
        }}
        animate={cursorVariant}
        variants={cursorVariants}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />

      {/* Trailing dot cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full"
        style={{
          left: 0,
          top: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          scale: dotScale,
        }}
        animate={cursorVariant}
        variants={dotVariants}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 400,
          mass: 0.2,
        }}
      />
      
      {/* Motion trail effect */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-40 rounded-full"
          style={{
            left: 0,
            top: 0,
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: isVisible ? trailOpacity.get() * (1 - i / 5) : 0,
            backgroundColor: getAccentColor(),
            width: 8,
            height: 8,
            scale: 1 - (i * 0.15),
            filter: `blur(${i * 1}px)`,
          }}
          animate={cursorVariant}
          variants={trailVariants}
          transition={{
            type: "spring",
            damping: 30 + (i * 5),
            stiffness: 200,
            mass: 0.5 + (i * 0.1),
            delay: i * 0.02,
          }}
        />
      ))}
    </>
  );
}
