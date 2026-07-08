import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScrollToSection = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - 80; // offset navbar height
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-bg border-t border-navbar-border pt-16 text-text-secondary">
      <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-16 pb-16">
        <div className="flex flex-col gap-4">
          <a href="#" className="font-heading text-2xl font-extrabold text-text-main" onClick={handleScrollToTop}>
            Bilal<span className="text-primary">.</span>dev
          </a>
          <p className="max-w-[320px] text-sm text-text-secondary">
            Building high-performance, accessible, and user-centric MERN Stack applications.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-text-main mb-4">Navigation</h4>
          <ul className="list-none flex flex-col gap-2">
            <li><a href="#about" className="text-sm text-text-secondary hover:text-primary transition-colors duration-150" onClick={(e) => handleScrollToSection(e, '#about')}>About</a></li>
            <li><a href="#skills" className="text-sm text-text-secondary hover:text-primary transition-colors duration-150" onClick={(e) => handleScrollToSection(e, '#skills')}>Skills</a></li>
            <li><a href="#services" className="text-sm text-text-secondary hover:text-primary transition-colors duration-150" onClick={(e) => handleScrollToSection(e, '#services')}>Services</a></li>
            <li><a href="#projects" className="text-sm text-text-secondary hover:text-primary transition-colors duration-150" onClick={(e) => handleScrollToSection(e, '#projects')}>Projects</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-text-main mb-4">Connect</h4>
          <div className="flex gap-4">
            <a 
              href="https://github.com/bilaldeveloper56-rgb" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              className="flex items-center justify-center w-10 h-10 rounded-md border border-card-border text-text-secondary bg-card hover:text-[#F8FAFC] hover:bg-primary hover:border-primary hover:-translate-y-0.5 hover:shadow-glow transition-all duration-150 cursor-pointer"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/muhammad-bilal-khan-257a12392" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              className="flex items-center justify-center w-10 h-10 rounded-md border border-card-border text-text-secondary bg-card hover:text-[#F8FAFC] hover:bg-primary hover:border-primary hover:-translate-y-0.5 hover:shadow-glow transition-all duration-150 cursor-pointer"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=bilaldeveloper56@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Send Email"
              className="flex items-center justify-center w-10 h-10 rounded-md border border-card-border text-text-secondary bg-card hover:text-[#F8FAFC] hover:bg-primary hover:border-primary hover:-translate-y-0.5 hover:shadow-glow transition-all duration-150 cursor-pointer"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-navbar-border py-6 bg-sidebar">
        <div className="w-full max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p className="text-xs text-text-muted text-center sm:text-left">
            &copy; {currentYear} Muhammad Bilal Khan. All rights reserved.
          </p>
          <div className="flex">
            <a href="/admin" className="text-xs text-text-muted hover:text-primary transition-colors duration-150">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
