import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="max-w-[450px] w-full p-6 sm:p-10 flex flex-col items-center text-center gap-4 border border-card-border rounded-xl bg-card shadow-sm glass">
        <div className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center mb-1 animate-[spin_20s_linear_infinite]">
          <Compass size={48} />
        </div>
        <h1 className="text-5xl font-extrabold leading-none bg-gradient-to-r from-primary to-[#6366F1] bg-clip-text text-transparent">404</h1>
        <h2 className="text-xl font-bold text-text-main">Page Not Found</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          The path you are looking for does not exist or has been relocated.
        </p>
        <Link to="/" className="btn btn-primary w-full py-3 cursor-pointer">
          <ArrowLeft size={16} /> Return to Portfolio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
