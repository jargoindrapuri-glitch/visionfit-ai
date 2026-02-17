
import React from 'react';
import { supabase } from '../services/supabaseClient';

interface HeaderProps {
  currentView: 'shop' | 'how-it-works' | 'brands' | 'about';
  onViewChange: (view: 'shop' | 'how-it-works' | 'brands' | 'about') => void;
  user: any;
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, user, onAuthClick }) => {
  const navItems = [
    { label: 'Shop', id: 'shop' },
    { label: 'How it works', id: 'how-it-works' },
    { label: 'For Brands', id: 'brands' },
    { label: 'About', id: 'about' },
  ] as const;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogout}
                className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
              >
                Logout
              </button>
              <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-200 transition-colors">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg shadow-black/10"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
