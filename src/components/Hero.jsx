import React, { useState, useEffect } from "react";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Typewriter = ({ words, delay = 150, infinite = true }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
      }, delay / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
      }, delay);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay]);

  return (
    <span className="text-primary">
      {currentText}
      <span className="animate-[pulse_1s_infinite] font-light ml-0.5 text-primary">
        |
      </span>
    </span>
  );
};

const words = [
  "MERN Stack Developer",
  "Full Stack Engineer",
  "SaaS Architect",
  "Problem Solver",
];

const Hero = () => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = element.offsetTop - 80;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="min-h-screen flex items-center pt-[100px] bg-bg relative overflow-hidden"
      id="home"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center gap-16">
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-primary border border-primary/20 bg-glass backdrop-blur-md">
            <Sparkles size={14} className="text-primary animate-pulse" />
            <span>Open to exciting opportunities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-text-main">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary to-[#6366F1] bg-clip-text text-transparent">
              Muhammad Bilal Khan
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl font-semibold text-text-secondary h-[40px]">
            Specializing in <Typewriter words={words} />
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-[540px] leading-relaxed">
            I design and build premium, production-ready SaaS products and
            full-stack web applications. Focusing on extreme performance,
            accessibility, and pixel-perfect aesthetics.
          </p>

          <div className="flex gap-4 mt-2">
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => scrollToSection(e, "#projects")}
            >
              Explore Projects <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="btn btn-secondary"
              onClick={(e) => scrollToSection(e, "#contact")}
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Glow IDE Mockup Graphics */}
        <motion.div
          className="relative flex justify-center items-center w-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
      
          <img
            className="w-full max-w-[500px] rounded-xl shadow-lg overflow-hidden text-left border border-card-border bg-card z-10 glass"
            src="/iiirfd.jpeg"
            alt="IDE Mockup"
          />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.15)_0%,rgba(99,102,241,0)_70%)] blur-[40px] z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
