import React, { useState } from "react";
import { Github, ExternalLink, Star, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom CSS-based illustrations to avoid heavy image files and increase Lighthouse speed
const ProjectMockup = ({ type }) => {
  switch (type) {
    case "dashboard":
      return (
        <div className="w-[90%] h-[80%] rounded bg-[#1E293B] shadow flex border border-white/5">
          <div className="w-[20%] bg-[#0F172A] border-r border-white/5"></div>
          <div className="flex-grow p-2.5 flex flex-col gap-2">
            <div className="h-3 bg-white/5 rounded w-[50%]"></div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-6 bg-white/3 border border-white/5 rounded"></div>
              <div className="h-6 bg-white/3 border border-white/5 rounded"></div>
            </div>
            <div className="h-10 flex items-end justify-around bg-white/1 rounded p-1">
              <span
                className="w-[14%] bg-primary rounded-t opacity-80 inline-block"
                style={{ height: "30%" }}
              ></span>
              <span
                className="w-[14%] bg-primary rounded-t opacity-80 inline-block"
                style={{ height: "60%" }}
              ></span>
              <span
                className="w-[14%] bg-primary rounded-t opacity-80 inline-block"
                style={{ height: "45%" }}
              ></span>
              <span
                className="w-[14%] bg-primary rounded-t opacity-80 inline-block"
                style={{ height: "80%" }}
              ></span>
            </div>
          </div>
        </div>
      );
    case "auth":
      return (
        <div className="w-[90%] h-[80%] rounded bg-[#0B0F19] shadow flex flex-col p-3">
          <div className="flex gap-1 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
          </div>
          <div className="font-mono text-[0.65rem] leading-relaxed">
            <p className="text-[#10B981]">$ npm run auth:check</p>
            <p className="text-[#94A3B8]">&gt; Session Key verified.</p>
            <p className="text-[#94A3B8]">&gt; Access Token generated.</p>
            <p className="text-[#F59E0B]">&gt; [OK] JWT token issued.</p>
          </div>
        </div>
      );
    case "builder":
      return (
        <div className="w-[90%] h-[80%] rounded bg-[#0F172A] shadow flex flex-col">
          <div className="h-4 bg-white/3 flex items-center px-2 gap-1 border-b border-white/5">
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            <span className="w-10 h-[2px] bg-white/8"></span>
          </div>
          <div className="flex-grow flex">
            <div className="w-[25%] bg-white/2 border-r border-white/5"></div>
            <div className="flex-grow p-2.5 grid grid-cols-2 grid-rows-2 gap-1.5">
              <div className="bg-primary/5 border border-dashed border-primary/30 rounded-[2px]"></div>
              <div className="bg-primary/5 border border-dashed border-primary/30 rounded-[2px]"></div>
              <div className="bg-primary/5 border border-dashed border-primary/30 rounded-[2px]"></div>
              <div className="bg-primary/5 border border-dashed border-primary/30 rounded-[2px]"></div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-[90%] h-[80%] rounded bg-[#1E293B] shadow"></div>
      );
  }
};

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", name: "All Work" },
    { id: "fullstack", name: "Full Stack" },
    { id: "backend", name: "Backend API" },
    { id: "frontend", name: "Frontend UI" },
  ];

  const projects = [
    {
      id: 1,
      title: "ShopSphere — MERN E-Commerce Platform",
      description:
        "A complete e-commerce application with authentication, product management, cart functionality, protected routes, and a responsive shopping experience.",
      category: "fullstack",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      mockup: "dashboard",
      image: "/shopsphere.png",
      github: "https://github.com/bilaldeveloper56-rgb/E_commerce_Frontend",
      githubBackend: "https://github.com/bilaldeveloper56-rgb/E_commerce_Backened",
      demo: "https://e-commerce-frontend-chi-tan.vercel.app/login",
      featured: true,
    },
    {
      id: 2,
      title: "ProFlow — Team Task Management System",
      description:
        "A full-stack productivity platform inspired by Trello and Asana. Features customized workspace analytics, user dashboard controls, and real-time status distribution.",
      category: "fullstack",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT Auth"],
      mockup: "dashboard",
      image: "/proflow.png",
      github: "https://github.com/bilaldeveloper56-rgb/Task_Management_System_Frontend",
      githubBackend: "https://github.com/bilaldeveloper56-rgb/Task_Management_System_Backened-",
      demo: "https://task-management-system-frontend-nu.vercel.app/",
      featured: true,
    },
    {
      id: 3,
      title: "EduManager — School ERP & LMS",
      status: "Client Project — In Development",
      description:
        "Multi-tenant School ERP & LMS platform currently being developed for a client, designed to manage academic sessions, classes, sections, students, teachers, attendance, assignments, administration, authentication, notifications, and role-based workflows.",
      category: "fullstack",
      tech: ["React", "Node.js", "Express", "MongoDB", "RBAC", "Redis", "Socket.io", "Resend"],
      mockup: "dashboard",
      image: "/LMS (2).png",
      github: "https://github.com/bilaldeveloper56-rgb/LMS_Full_Stack_Project_Frontend",
      demo: "https://app.lmsprime.online/login",
      featured: true,
    },
    {
      id: 4,
      title: "KKR Restaurant — Platform Concept",
      status: "Client Demo / Proposal",
      description:
        "Restaurant website prototype developed for client review, demonstrating the proposed design, interactive menu, cart and order management, and full-stack architecture.",
      category: "fullstack",
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Cloudinary"],
      mockup: "dashboard",
      image: "/kkr.png",
      github: "https://github.com/bilaldeveloper56-rgb/KKR-Peshawar",
      demo: "https://kkr-peshawar-frontend.vercel.app/",
    },
    {
      id: 5,
      title: "Expense Tracker Pro",
      description:
        "A clean and interactive expense tracking application with income/expense management, balance calculation, and a responsive user interface.",
      category: "frontend",
      tech: ["React", "JavaScript", "Tailwind CSS"],
      mockup: "dashboard",
      image: "/expensetracker.png",
      github: "https://github.com/bilaldeveloper56-rgb/Expense_Tracker",
      demo: "https://expense-tracker-roan-delta.vercel.app/",
    },
    {
      id: 6,
      title: "Nexcent Business Landing Page",
      description:
        "A professional and modern business landing page designed to showcase services, client testimonials, and product features with sleek styling.",
      category: "frontend",
      tech: ["HTML", "CSS"],
      mockup: "builder",
      image: "/nexcent.png",
      github: "https://github.com/bilaldeveloper56-rgb/LuckyStudentWebsite",
      demo: "https://bilaldeveloper56-rgb.github.io/LuckyStudentWebsite/",
    },
    {
      id: 7,
      title: "Trazler Travel & Tourism Website",
      description:
        "A visually stunning travel and tourism landing page with high-quality layouts, inspiring destinations, and booking integration concepts.",
      category: "frontend",
      tech: ["HTML", "CSS"],
      mockup: "builder",
      image: "/trazler.png",
      github: "https://github.com/bilaldeveloper56-rgb/LuckStudentwebsite_2",
      demo: "https://bilaldeveloper56-rgb.github.io/LuckStudentwebsite_2/",
    },
    {
      id: 8,
      title: "Paws n' Play Pet Store Website",
      description:
        "An engaging pet store frontend website featuring catalog displays, service bookings, and clean typography tailored for pet lovers.",
      category: "frontend",
      tech: ["HTML", "CSS"],
      mockup: "builder",
      image: "/pawsnplay.png",
      github: "https://github.com/bilaldeveloper56-rgb/LuckyStudentwebsite_3",
      demo: "https://bilaldeveloper56-rgb.github.io/LuckyStudentwebsite_3/",
    },
    {
      id: 9,
      title: "Netflix UI Clone",
      description:
        "A Netflix-inspired responsive interface built to practice advanced layouts, media sections, and modern streaming-platform UI design.",
      category: "frontend",
      tech: ["HTML", "CSS"],
      mockup: "builder",
      image: "/Netflix.png",
      github: "https://github.com/bilaldeveloper56-rgb/LuckStudentWebsite_4",
      demo: "https://bilaldeveloper56-rgb.github.io/Netflix_Project_3/",
    },
    {
      id: 10,
      title: "Backend Project 1 — Authentication API",
      description:
        "REST API for user registration, login, JWT authentication, protected routes, and secure password handling.",
      category: "backend",
      tech: ["Node.js", "Express", "MongoDB", "JWT"],
      mockup: "auth",
      github: "https://github.com/bilaldeveloper56-rgb/Backened_Project_1",
      demo: "https://backened-project-1.vercel.app/",
    },
    {
      id: 11,
      title: "Backend Project 2 — Product Management API",
      description:
        "CRUD API for managing products, categories, and inventory with validation and structured routing.",
      category: "backend",
      tech: ["Node.js", "Express", "MongoDB"],
      mockup: "auth",
      github: "https://github.com/bilaldeveloper56-rgb/Backened_Project_2",
      demo: "https://backened-project-2.vercel.app/",
    },
    {
      id: 12,
      title: "Backend Project 3 — Advanced REST API",
      description:
        "A scalable Express API featuring modular architecture, middleware, error handling, and database integration.",
      category: "backend",
      tech: ["Node.js", "Express", "MongoDB"],
      mockup: "auth",
      github: "https://github.com/bilaldeveloper56-rgb/Backened_Project_3",
      demo: "https://backened-project-3.vercel.app/",
    },
    {
      id: 13,
      title: "Digital Clock with Advanced Controls",
      description:
        "A real-time neon-themed digital clock featuring timezone selectors, 12/24 hour toggles, and stopwatch/control functionality.",
      category: "frontend",
      tech: ["HTML", "CSS", "JavaScript"],
      mockup: "builder",
      image: "/digitalclock.png",
      github: "https://github.com/bilaldeveloper56-rgb/Digital-Clock/",
      demo: "https://bilaldeveloper56-rgb.github.io/Digital-Clock/",
    },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="py-16 md:py-24 relative" id="projects">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 max-w-[600px] mx-auto">
          <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-text-main to-primary bg-clip-text text-transparent">
            Selected Projects
          </h2>
          <p className="text-lg text-text-secondary">
            Production-grade engineering work demonstrating architecture and
            quality
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`inline-flex items-center px-5 py-2.5 text-sm font-medium border rounded-full transition-all duration-200 cursor-pointer ${filter === cat.id ? "bg-primary text-[#F8FAFC] border-primary shadow-glow" : "text-text-secondary border-card-border bg-card hover:border-primary hover:text-primary"}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="flex flex-col overflow-hidden border border-card-border rounded-xl bg-card shadow-sm transition-all duration-150 hover:-translate-y-1 hover:border-primary p-0 relative"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* CSS Mockup or Image Container */}
                <div className="h-[180px] bg-[#0F172A] border-b border-card-border overflow-hidden relative flex items-center justify-center">
                  {project.status && (
                    <span className="absolute top-3 left-3 z-10 bg-card/90 backdrop-blur text-text-main text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full shadow flex items-center gap-1.5 border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {project.status}
                    </span>
                  )}
                  {project.featured && (
                    <span className="absolute top-3 right-3 z-10 bg-primary/90 backdrop-blur text-[#F8FAFC] text-[0.65rem] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1 border border-white/10">
                      <Star size={10} className="fill-current text-[#F59E0B]" />{" "}
                      Featured
                    </span>
                  )}
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <ProjectMockup type={project.mockup} />
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow gap-2">
                  <h3 className="text-lg font-bold text-text-main">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-1 mb-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[0.7rem] font-semibold text-primary bg-primary-light px-2.5 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.githubBackend ? (
                      <>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 flex-grow py-2 text-[0.7rem] font-semibold rounded-md border border-card-border bg-card text-text-secondary hover:text-text-main hover:border-primary transition-all duration-150 cursor-pointer min-w-[75px]"
                          aria-label={`View ${project.title} frontend source code on Github`}
                        >
                          <Github size={14} /> Frontend
                        </a>
                        <a
                          href={project.githubBackend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 flex-grow py-2 text-[0.7rem] font-semibold rounded-md border border-card-border bg-card text-text-secondary hover:text-text-main hover:border-primary transition-all duration-150 cursor-pointer min-w-[75px]"
                          aria-label={`View ${project.title} backend source code on Github`}
                        >
                          <Github size={14} /> Backend
                        </a>
                      </>
                    ) : (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 flex-1 py-2 text-xs font-semibold rounded-md border border-card-border bg-card text-text-secondary hover:text-text-main hover:border-primary transition-all duration-150 cursor-pointer"
                        aria-label={`View ${project.title} source code on Github`}
                      >
                        <Github size={16} /> Code
                      </a>
                    )}
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 flex-1 py-2 text-xs font-semibold rounded-md border border-primary bg-primary text-[#F8FAFC] hover:bg-primary-hover hover:shadow-glow transition-all duration-150 cursor-pointer min-w-[80px]"
                      aria-label={`Launch live demo for ${project.title}`}
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
