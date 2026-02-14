
import React, { useState, useEffect, useCallback } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle Enter key for immediate search
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  // Debounced search for smoother live updates
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const quickTags = ['Streetwear', 'Formal', 'Summer', 'Outerwear'];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-8">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for hoodies, linen shirts, or outerwear..."
          className="w-full pl-12 pr-32 py-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent outline-none shadow-sm transition-all text-zinc-900 placeholder:text-zinc-400"
        />
        <div className="absolute inset-y-1.5 right-1.5">
          <button
            onClick={() => onSearch(query)}
            className="h-full px-6 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all active:scale-95"
          >
            Search
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest self-center mr-1">Quick Search:</span>
        {quickTags.map((tag) => (
          <button
            key={tag}
            onClick={() => { setQuery(tag); onSearch(tag); }}
            className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
