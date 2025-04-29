
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-terminal-dark border-t border-terminal-green/20 py-6 mt-12">
      <div className="container mx-auto text-center text-terminal-white/60 text-sm">
        <p>Based on <span className="text-terminal-green">Arun Kharwar</span> Linux Course</p>
        <p className="mt-2">© {new Date().getFullYear()} Linux Arun Guide</p>
      </div>
    </footer>
  );
};

export default Footer;
