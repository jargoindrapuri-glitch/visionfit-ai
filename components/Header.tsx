
import React from 'react';

interface HeaderProps {
  currentView: 'shop' | 'how-it-works' | 'brands' | 'about';
  onViewChange: (view: 'shop' | 'how-it-works' | 'brands' | 'about') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { label: 'Shop', id: 'shop' },
    { label: 'How it works', id: 'how-it-works' },
    { label: 'For Brands', id: 'brands' },
    { label: 'About', id: 'about' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onViewChange('shop')}
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-xl italic">V</span>
          </div>
          <span className="text-xl font-bold tracking-tight">VisionFit AI</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`transition-colors py-1 relative ${
                currentView === item.id 
                  ? 'text-black' 
                  : 'text-zinc-500 hover:text-black'
              }`}
            >
              {item.label}
              {currentView === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black rounded-full animate-in fade-in slide-in-from-bottom-1 duration-300"></span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              onViewChange('shop');
              setTimeout(() => {
                document.getElementById('main-search-input')?.focus();
              }, 100);
            }}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">2</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
