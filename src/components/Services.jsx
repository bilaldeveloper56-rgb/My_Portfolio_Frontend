import React from 'react';
import { Layout, Cpu, Activity, CloudLightning } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const serviceData = [
    {
      icon: <Layout size={28} />,
      title: 'Full-Stack SaaS Development',
      description: 'Designing and building complete, secure SaaS frameworks from scratch using MongoDB, Express, React, and Node.js.'
    },
    {
      icon: <Cpu size={28} />,
      title: 'Backend REST API Design',
      description: 'Engineering secure RESTful APIs featuring JWT, database indexing, injection preventions, and express rate limiters.'
    },
    {
      icon: <Activity size={28} />,
      title: 'Frontend Performance Tuning',
      description: 'Refactoring React codebases to achieve 95+ Lighthouse audits. Reducing re-renders with memoization and lazy-loaded assets.'
    },
    {
      icon: <CloudLightning size={28} />,
      title: 'Cloud DevOps & Deployments',
      description: 'Setting up automated Git-integrated CI/CD pipelines, MongoDB Atlas cluster backups, and hosting structures on Vercel/Render.'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative" id="services">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 max-w-[600px] mx-auto">
          <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-text-main to-primary bg-clip-text text-transparent">Core Services</h2>
          <p className="text-lg text-text-secondary">High-quality engineering solutions tailored for modern business products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceData.map((service, index) => (
            <motion.div 
              key={service.title}
              className="flex flex-col items-start gap-2 p-8 sm:p-10 border border-card-border rounded-xl bg-card shadow-sm transition-all duration-150 hover:-translate-y-1 hover:border-primary glass"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-light text-primary mb-2">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-text-main">{service.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
