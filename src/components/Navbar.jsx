import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Monitor, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Monitor scroll for styling navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun size={18} />;
      case 'dark': return <Moon size={18} />;
      default: return <Monitor size={18} />;
    }
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
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
    <nav className={`fixed top-0 left-0 w-full flex items-center z-[1000] transition-all duration-300 border-b ${scrolled ? 'h-16 bg-navbar border-navbar-border backdrop-blur-md shadow-sm' : 'h-20 border-transparent'}`}>
      <div className="w-full max-w-[1200px] mx-auto px-6 flex justify-between items-center h-full">
        <a href="#" className="font-heading text-2xl font-extrabold text-text-main flex items-center" onClick={(e) => handleLinkClick(e, '#')}>
          <span>Bilal</span>
          <span className="text-primary">.</span>
          <span className="text-base font-medium text-text-secondary ml-1">dev</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex list-none gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-sm font-medium text-text-secondary px-2 py-1 relative hover:text-text-main transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center gap-1.5 p-2 rounded-md border border-card-border text-text-secondary hover:text-text-main hover:border-primary bg-card transition-all duration-200 cursor-pointer"
              onClick={() => setThemeOpen(!themeOpen)}
              aria-label="Select theme"
              aria-expanded={themeOpen}
              aria-haspopup="listbox"
            >
              {getThemeIcon()}
              <ChevronDown size={14} className={`transition-transform duration-200 ${themeOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {themeOpen && (
                <motion.ul 
                  className="absolute top-[calc(100%+8px)] right-0 w-32 rounded-md p-1 shadow-md z-[1010] list-none glass"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  role="listbox"
                >
                  <li 
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer transition-colors duration-150 ${theme === 'light' ? 'text-primary font-semibold bg-primary-light' : 'text-text-secondary hover:text-primary hover:bg-primary-light'}`}
                    onClick={() => { setTheme('light'); setThemeOpen(false); }}
                    role="option"
                    aria-selected={theme === 'light'}
                  >
                    <Sun size={14} /> Light
                  </li>
                  <li 
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer transition-colors duration-150 ${theme === 'dark' ? 'text-primary font-semibold bg-primary-light' : 'text-text-secondary hover:text-primary hover:bg-primary-light'}`}
                    onClick={() => { setTheme('dark'); setThemeOpen(false); }}
                    role="option"
                    aria-selected={theme === 'dark'}
                  >
                    <Moon size={14} /> Dark
                  </li>
                  <li 
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer transition-colors duration-150 ${theme === 'system' ? 'text-primary font-semibold bg-primary-light' : 'text-text-secondary hover:text-primary hover:bg-primary-light'}`}
                    onClick={() => { setTheme('system'); setThemeOpen(false); }}
                    role="option"
                    aria-selected={theme === 'system'}
                  >
                    <Monitor size={14} /> System
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle & Theme button */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-md border border-card-border text-text-secondary bg-card hover:text-text-main transition-all duration-200 cursor-pointer" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-md border border-card-border text-text-secondary bg-card hover:text-text-main cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full left-0 w-full border-b border-navbar-border shadow-lg overflow-hidden glass z-[999]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="list-none py-6 flex flex-col items-center gap-4">
              {navLinks.map((link) => (
                <li key={link.name} className="w-full text-center">
                  <a 
                    href={link.href} 
                    className="text-lg font-medium text-text-secondary py-2 px-6 block hover:text-primary transition-colors duration-200"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
