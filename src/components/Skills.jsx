import React, { useState } from 'react';
import { Code2, Server, Database, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Technologies' },
    { id: 'frontend', name: 'Frontend', icon: <Code2 size={14} /> },
    { id: 'backend', name: 'Backend', icon: <Server size={14} /> },
    { id: 'database', name: 'Database & DevOps', icon: <Database size={14} /> }
  ];

  const skillData = [
    // Frontend
    { name: 'React.js / Redux', level: 95, category: 'frontend' },
    { name: 'JavaScript (ES6+) / TypeScript', level: 92, category: 'frontend' },
    { name: 'HTML5 / CSS3 / Vanilla CSS', level: 90, category: 'frontend' },
    { name: 'Framer Motion / CSS Animations', level: 85, category: 'frontend' },
    
    // Backend
    { name: 'Node.js', level: 90, category: 'backend' },
    { name: 'Express.js Framework', level: 94, category: 'backend' },
    { name: 'RESTful API Architecture', level: 95, category: 'backend' },
    { name: 'JWT & Session Security', level: 92, category: 'backend' },

    // Database & DevOps
    { name: 'MongoDB / Mongoose ODM', level: 92, category: 'database' },
    { name: 'MySQL & PostgreSQL', level: 80, category: 'database' },
    { name: 'Git & GitHub Actions CI/CD', level: 88, category: 'database' },
    { name: 'Vercel, Render & Netlify Deployments', level: 90, category: 'database' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillData 
    : skillData.filter(skill => skill.category === activeCategory);

  return (
    <section className="py-16 md:py-24 relative" id="skills">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 max-w-[600px] mx-auto">
          <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-text-main to-primary bg-clip-text text-transparent">Technical Expertise</h2>
          <p className="text-lg text-text-secondary">A comprehensive breakdown of my full-stack MERN capabilities</p>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-16">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium border rounded-full transition-all duration-200 cursor-pointer ${activeCategory === cat.id ? 'bg-primary text-[#F8FAFC] border-primary shadow-glow' : 'text-text-secondary border-card-border bg-card hover:border-primary hover:text-primary'}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon && <span className="flex items-center">{cat.icon}</span>}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills progress grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              className="p-4 sm:p-6 border border-card-border rounded-xl bg-card shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-primary"
              layout
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2 text-base font-semibold text-text-main">
                  <CheckCircle2 size={16} className="text-primary" /> {skill.name}
                </span>
                <span className="text-sm font-bold text-primary">{skill.level}%</span>
              </div>
              <div className="w-full h-1.5 bg-primary-light rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-primary to-[#6366F1]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
