"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useId, useEffect } from "react";

const EmailInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const id = useId();
  return (
    <div className="relative">
      <input
        id={id}
        name="email"
        type="email"
        placeholder="Your Email"
        required
        className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 appearance-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck="false"
        data-form-type="other"
        suppressHydrationWarning
      />
    </div>
  );
}

const contactInfo = {
  email: "hetkhakkar853@gmail.com",
  linkedin: "https://www.linkedin.com/in/hetkthakkar853",
  github: "https://github.com/hetkthakkar"
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({
    type: "",
    message: ""
  });
  const [showPopup, setShowPopup] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });
    setShowPopup(true);
    
    // Store form data to use with FormSubmit
    sessionStorage.removeItem('form-submitted');
    
    // Update the redirect URL with the current origin before submission
    const redirectInput = document.querySelector('input[name="_next"]') as HTMLInputElement;
    if (redirectInput && typeof window !== 'undefined') {
      redirectInput.value = `${window.location.origin}/#contact`;
    }
    
    // Get the form element and submit it programmatically
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  // Check for form submission via URL hash
  useEffect(() => {
    // Use a client-side only effect to avoid hydration mismatch
    const handleHashChange = () => {
      // If we're at the contact section and came from a form submission
      if (window.location.hash === '#contact' && sessionStorage.getItem('form-submitted') !== 'true') {
        sessionStorage.setItem('form-submitted', 'true');
        setStatus({ type: "success", message: "Message sent successfully!" });
        setShowPopup(true);
        // Auto-hide popup after 5 seconds
        setTimeout(() => setShowPopup(false), 5000);
      }
    };
    
    // Check on initial load and add listener for future changes
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section id="contact" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Contact</h2>
        <p className="text-gray-400">Let&apos;s get in touch</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#112240] p-8 rounded-lg h-fit"
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <Link
                href={`mailto:${contactInfo.email}`}
                className="text-gray-300 hover:text-blue-500 transition-colors"
              >
                {contactInfo.email}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                />
              </svg>
              <Link
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-colors"
              >
                LinkedIn Profile
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                />
              </svg>
              <Link
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-colors"
              >
                GitHub Profile
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#112240] p-8 rounded-lg"
        >
          <form action="https://formsubmit.co/hetkthakkar853@gmail.com" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            {/* FormSubmit configuration */}
            <input type="hidden" name="_next" value="/#contact" />
            <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_template" value="box" />
            <div>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <EmailInput
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={6}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 resize-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              disabled={status.type === "loading"}
              className="w-full bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.type === "loading" ? "Sending..." : "Send Message"}
            </button>
            {showPopup && (
              <div className="fixed top-20 right-5 bg-[#112240] p-4 rounded-lg shadow-lg border border-gray-700 z-50 max-w-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {status.type === "loading" && (
                      <div className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-blue-500">{status.message}</span>
                      </div>
                    )}
                    {status.type === "success" && (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-500">{status.message}</span>
                      </div>
                    )}
                    {status.type === "error" && (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-red-500">{status.message}</span>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setShowPopup(false)}
                    className="text-gray-400 hover:text-white ml-4"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            <div className="text-center">
              {/* Legacy status display (can be kept as fallback) */}
              {status.type === "loading" && !showPopup && (
                <p className="text-blue-500">{status.message}</p>
              )}
              {status.type === "success" && !showPopup && (
                <p className="text-green-500">{status.message}</p>
              )}
              {status.type === "error" && !showPopup && (
                <p className="text-red-500">{status.message}</p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
