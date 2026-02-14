
import React from 'react';

const Header: React.FC = () => {
  const scrollToSearch = () => {
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (searchInput as HTMLInputElement).focus();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl italic">V</span>
          </div>
          <span className="text-xl font-bold tracking-tight">VisionFit AI</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <a href="#" className="hover:text-black transition-colors">Shop</a>
          <a href="#" className="hover:text-black transition-colors">How it works</a>
          <a href="#" className="hover:text-black transition-colors">For Brands</a>
          <a href="#" className="hover:text-black transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={scrollToSearch}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none active:scale-95"
            title="Search collection"
          >
            <svg className="w-6 h-6 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative focus:outline-none active:scale-95">
            <svg className="w-6 h-6 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full shadow-sm">2</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
