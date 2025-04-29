
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, ListCheck, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-terminal-dark border-b border-terminal-green/20 py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="bg-terminal-green rounded-md p-1">
            <BookOpen className="h-6 w-6 text-terminal-dark" />
          </div>
          <span className="text-terminal-green text-xl font-bold">
            Linux<span className="text-terminal-white">ARUN</span>
          </span>
        </Link>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <Button variant="ghost" className="text-terminal-white hover:text-terminal-green" asChild>
            <Link to="/">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Guide</span>
            </Link>
          </Button>
          <Button variant="ghost" className="text-terminal-white hover:text-terminal-green" asChild>
            <Link to="/terminal">
              <Terminal className="mr-2 h-4 w-4" />
              <span>Terminal</span>
            </Link>
          </Button>
          <Button variant="ghost" className="text-terminal-white hover:text-terminal-green" asChild>
            <Link to="/practice">
              <ListCheck className="mr-2 h-4 w-4" />
              <span>Practice</span>
            </Link>
          </Button>
          <Button variant="ghost" className="text-terminal-white hover:text-terminal-green" asChild>
            <Link to="/exam">
              <FileText className="mr-2 h-4 w-4" />
              <span>Exam</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
