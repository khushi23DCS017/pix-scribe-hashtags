
import React from 'react';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full py-4", className)}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-8 w-8 text-brand-purple" />
          <h1 className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
            PixScribe
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Examples
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
