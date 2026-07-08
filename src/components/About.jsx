import React, { useState, useEffect } from "react";
import { getGitHubData } from "../services/githubService";
import { Star, GitCommit, UserPlus, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const [github, setGithub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHub = async () => {
      const data = await getGitHubData();
      setGithub(data);
      setLoading(false);
    };
    fetchGitHub();
  }, []);

  // Generate a mock GitHub Contribution calendar data grid
  const generateContributions = () => {
    const grid = [];
    // 28 columns * 7 rows = 196 days
    for (let i = 0; i < 7 * 28; i++) {
      const rand = Math.random();
      let level = 0;
      if (rand > 0.85) level = 4;
      else if (rand > 0.7) level = 3;
      else if (rand > 0.5) level = 2;
      else if (rand > 0.2) level = 1;
      grid.push(level);
    }
    return grid;
  };

  const contributionGrid = generateContributions();

  // Helper to format event types
  const formatEvent = (event) => {
    const timeAgo = (dateStr) => {
      const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
      let interval = seconds / 31536000;
      if (interval > 1) return Math.floor(interval) + " years ago";
      interval = seconds / 2592000;
      if (interval > 1) return Math.floor(interval) + " months ago";
      interval = seconds / 86400;
      if (interval > 1) return Math.floor(interval) + " days ago";
      interval = seconds / 3600;
      if (interval > 1) return Math.floor(interval) + " hours ago";
      interval = seconds / 60;
      if (interval > 1) return Math.floor(interval) + " minutes ago";
      return "just now";
    };

    switch (event.type) {
      case "PushEvent":
        return `Pushed commits to ${event.repo.name.split("/").pop()} • ${timeAgo(event.created_at)}`;
      case "CreateEvent":
        return `Created repository ${event.repo.name.split("/").pop()} • ${timeAgo(event.created_at)}`;
      default:
        return `Starred repository ${event.repo.name.split("/").pop()} • ${timeAgo(event.created_at)}`;
    }
  };

  const levelClasses = [
    "bg-[#E2E8F0] dark:bg-[#1E293B]",
    "bg-[#C7D2FE] dark:bg-[#1E1B4B]",
    "bg-[#818CF8] dark:bg-[#312E81]",
    "bg-[#4F46E5] dark:bg-[#4F46E5]",
    "bg-[#312E81] dark:bg-[#818CF8]",
  ];

  return (
    <section className="py-16 md:py-24 relative" id="about">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 max-w-[600px] mx-auto">
          <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-text-main to-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-text-secondary">
            My professional background and GitHub developer metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
          <div className="flex flex-col gap-6">
            <div className="relative rounded-xl overflow-hidden border border-card-border bg-card shadow-sm glass max-w-[480px]"></div>
            <h3 className="text-2xl font-bold text-text-main mt-2">
              Muhammad Bilal Khan
            </h3>
            <p className="text-text-secondary text-base leading-relaxed">
              I am Muhammad Bilal Khan, a passionate MERN Stack Developer with
              hands-on experience in MongoDB, Express.js, React.js, and Node.js.
              Over the past 8 months, I have been learning and building
              real-world projects to strengthen my full-stack development
              skills. I enjoy creating responsive and user-friendly web
              applications while continuously improving my knowledge and
              problem-solving abilities.
            </p>

            <div className="flex gap-10 mt-2 justify-around sm:justify-start">
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-primary leading-none">
                  8+
                </span>
                <span className="text-xs text-text-secondary uppercase tracking-wider mt-1">
                  Months Exp
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-primary leading-none">
                  15+
                </span>
                <span className="text-xs text-text-secondary uppercase tracking-wider mt-1">
                  Deployments
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-primary leading-none">
                  100%
                </span>
                <span className="text-xs text-text-secondary uppercase tracking-wider mt-1">
                  Dedication
                </span>
              </div>
            </div>
          </div>
          <img
            src="/iii.jpeg"
            alt="Muhammad Bilal Khan - MERN Stack Developer"
            className="w-full max-w-[500px] rounded-xl shadow-lg overflow-hidden text-left border border-card-border bg-card z-10 glass"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
