"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);
  const [showMobileShowcase, setShowMobileShowcase] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (path: string) => {
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setShowShowcase(false);
      setShowMobileShowcase(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShowcase(false);
      }
      
      // Close side menu when clicking outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isOpen) {
        // Only close if the click wasn't on the hamburger button
        const hamburgerButton = document.querySelector('[data-hamburger]');
        if (hamburgerButton && !hamburgerButton.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsOpen(false);
        setShowMobileShowcase(false);
      }
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Create overlay when menu is open
  useEffect(() => {
    // Log the menu state change
    console.log('Mobile menu state changed to:', isOpen ? 'OPEN' : 'CLOSED');
    
    if (isOpen) {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden';
      overlay.id = 'mobile-menu-overlay';
      overlay.addEventListener('click', () => setIsOpen(false));
      document.body.appendChild(overlay);
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Remove overlay
      const overlay = document.getElementById('mobile-menu-overlay');
      if (overlay) {
        document.body.removeChild(overlay);
      }
      
      // Restore body scrolling
      document.body.style.overflow = '';
    }
    
    return () => {
      // Cleanup
      const overlay = document.getElementById('mobile-menu-overlay');
      if (overlay) {
        document.body.removeChild(overlay);
      }
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Education", path: "#education" },
    { 
      name: "Showcase",
      path: "#showcase",
      subItems: [
        { name: "Skills", path: "#skills" },
        { name: "Experience", path: "#experience" },
        { name: "Projects", path: "#projects" },
        { name: "Certifications", path: "#certifications" },
        { name: "Achievements", path: "#achievements" }
      ]
    },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0a192f]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-500">
              Het.
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block" ref={menuRef}>
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => {
                      if (item.name === 'Showcase') {
                        setShowShowcase(!showShowcase);
                      } else {
                        scrollToSection(item.path);
                      }
                    }}
                    className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                  {item.subItems && (
                    <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#112240] ring-1 ring-black ring-opacity-5 transition-all duration-200 ${showShowcase && item.name === 'Showcase' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      <div className="py-1">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => scrollToSection(subItem.path)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-blue-500 hover:bg-[#1a365d]"
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              data-hamburger
              onClick={() => {
                console.log('Hamburger clicked, toggling menu');
                setIsOpen(!isOpen);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none z-50"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Menu */}
      <div 
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-screen w-64 bg-[#112240] shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-500">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => {
                  if (item.subItems) {
                    setShowMobileShowcase(prev => item.name === 'Showcase' ? !prev : prev);
                  } else {
                    scrollToSection(item.path);
                  }
                }}
                className="text-gray-300 hover:text-blue-500 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                {item.name}
                {item.subItems && (
                  <span className="float-right">
                    {showMobileShowcase ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                )}
              </button>
              {item.subItems && (
                <div className={`pl-4 space-y-1 transition-all duration-300 ${showMobileShowcase ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => scrollToSection(subItem.path)}
                      className="text-gray-400 hover:text-blue-500 block w-full text-left px-3 py-2 text-sm transition-colors duration-200"
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
