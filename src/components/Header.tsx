'use client';

import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from 'framer-motion';
import Link from "next/link";
import { createPortal } from 'react-dom';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Section extends HTMLElement {
  offsetTop: number;
  offsetHeight: number;
}

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Showcase", href: "#showcase" },
  { name: "Contact", href: "#contact" },
];

const showcaseLinks = [
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Achievements", href: "#achievements" },
  { name: "Training & Seminars", href: "#training" },
];

// Client-side only portal to prevent hydration errors
interface ClientOnlyPortalProps {
  children: React.ReactNode;
  selector: string;
}

const ClientOnlyPortal: React.FC<ClientOnlyPortalProps> = ({ children, selector }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Create portal root if it doesn't exist
    if (!document.getElementById('portal-root')) {
      const portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'portal-root')
      document.body.appendChild(portalRoot)
    }
    setMounted(true)
  }, [])

  // Only create portal after component has mounted in browser environment
  if (mounted) {
    const container = document.querySelector(selector);
    if (container) {
      return createPortal(children, container);
    }
  }
  
  return null;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    let mounted = true;

    const handleScroll = () => {
      if (!mounted) return;

      requestAnimationFrame(() => {
        const winScroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = Math.max(0, Math.min(1, winScroll / height || 0));
        setProgress(scrolled);

        const sections = document.querySelectorAll("section[id]");
        let newSection = "home";

        sections.forEach((section) => {
          const sectionElement = section as Section;
          const sectionTop = sectionElement.offsetTop - 100;
          const sectionBottom = sectionTop + sectionElement.offsetHeight;

          if (winScroll >= sectionTop && winScroll < sectionBottom) {
            newSection = section.id;
          }
        });

        setCurrentSection(newSection);
      });
    };

    if (typeof window !== 'undefined') {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      mounted = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return { progress, currentSection };
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileShowcase, setShowMobileShowcase] = useState(false);
  const { progress, currentSection } = useScrollProgress();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] bg-gray-900/90 backdrop-blur">
      <motion.div
        className="h-1 bg-blue-500 origin-left"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
      <nav
        className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link 
            href="#home" 
            className="-m-1.5 p-1.5 text-2xl font-bold text-blue-500 hover:text-blue-600 transition-colors"
            onClick={(e) => handleNavClick(e, "#home")}
          >
            Het Thakkar
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={classNames(
                item.href === `#${currentSection}`
                  ? "text-blue-500"
                  : "text-gray-200 hover:text-blue-500",
                "text-sm font-semibold leading-6 transition-all"
              )}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="/resume/HetFJ4.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Resume
          </a>
        </div>
      </nav>
      {/* Mobile Menu - Client-side only */}
      <ClientOnlyPortal selector="#portal-root">
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 overflow-hidden" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.target === e.currentTarget && setMobileMenuOpen(false)}
            style={{ zIndex: 9999 }}
          >
          {/* Dark backdrop with blur effect */}
          <motion.div 
            className="fixed inset-0 backdrop-blur-sm" 
            initial={{ opacity: 0 }}
            animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            aria-hidden="true"
          />
          {/* Slide-in Menu Panel - Half Width from Right Side */}
          <div className="fixed inset-y-0 right-0 flex pointer-events-none max-w-full">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: mobileMenuOpen ? '0%' : '100%' }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.4
              }}
              className="w-screen max-w-[50%] sm:max-w-[300px] pointer-events-auto ml-auto"
            >
              <div 
                className="flex h-full flex-col overflow-y-auto bg-gray-900/90 backdrop-blur-md py-6 shadow-xl border-l border-gray-700/30">
                <div className="px-4 sm:px-6 flex items-center justify-between border-b border-gray-700/30 pb-4 mb-2">
                  <motion.h2 
                    className="text-2xl font-bold text-blue-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Menu
                  </motion.h2>
                  <motion.button
                    type="button"
                    className="rounded-full p-2.5 text-gray-200 hover:bg-gray-800/80 transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </motion.button>
                </div>
                
                <div className="px-4 sm:px-6 mt-4 flex-1 overflow-y-auto">
                  <div className="flex flex-col space-y-1">
                    {navigation.map((item, index) => {
                      const isShowcase = item.name === "Showcase";
                      const showSubmenu = isShowcase && showMobileShowcase;
                      
                      return (
                        <div key={item.name}>
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                          >
                            <div 
                              className={classNames(
                                "flex items-center justify-between group",
                                item.href === `#${currentSection}`
                                  ? "text-blue-500 bg-blue-900/20 shadow-md"
                                  : "text-gray-200 hover:bg-gray-800/50",
                                "rounded-lg px-4 py-3 transition-all duration-300 transform hover:shadow-sm"
                              )}
                            >
                              <Link
                                href={item.href}
                                className="block text-base font-semibold flex-grow transition-all duration-300"
                                onClick={(e) => {
                                  handleNavClick(e, item.href);
                                  // If it's showcase, also toggle the submenu
                                  if (isShowcase) {
                                    e.stopPropagation();
                                  }
                                }}
                              >
                                {item.name}
                                
                                {/* Add subtle animation effect on hover */}
                                <span className="block h-0.5 w-0 group-hover:w-full bg-blue-500/60 mt-0.5 transition-all duration-300"></span>
                              </Link>
                              {isShowcase && (
                                <motion.button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowMobileShowcase(!showMobileShowcase);
                                  }}
                                  className="text-gray-400 hover:text-blue-500 transition-colors p-1 ml-2 rounded-full hover:bg-blue-500/10 active:bg-blue-500/20"
                                  aria-expanded={showMobileShowcase}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: showMobileShowcase ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </motion.div>
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                          
                          {/* Showcase sub-sections appear directly below the Showcase item */}
                          <motion.div 
                            className="ml-4 mt-1 mb-2 border-l-2 border-blue-500/30 pl-2 overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ 
                              opacity: showSubmenu ? 1 : 0,
                              height: showSubmenu ? 'auto' : 0 
                            }}
                            transition={{ 
                              duration: 0.4, 
                              ease: [0.25, 0.1, 0.25, 1.0],
                              opacity: { duration: 0.2 }
                            }}
                          >
                              <div className="flex flex-col space-y-1">
                                {showcaseLinks.map((subItem, subIndex) => (
                                  <motion.div
                                    key={subItem.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * subIndex, duration: 0.2 }}
                                  >
                                    <Link
                                      href={subItem.href}
                                      className="block rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 transition-all duration-200"
                                      onClick={(e) => handleNavClick(e, subItem.href)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          </motion.div>
        )}
      </ClientOnlyPortal>
    </header>
  );
}
