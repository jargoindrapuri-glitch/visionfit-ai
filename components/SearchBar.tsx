
import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onImportUrl?: (url: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onImportUrl }) => {
  const [query, setQuery] = useState('');
  const [isUrl, setIsUrl] = useState(false);

  useEffect(() => {
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))/i;
    setIsUrl(urlPattern.test(query.trim()));
    
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleAction = () => {
    if (isUrl && onImportUrl) {
      onImportUrl(query.trim());
    } else {
      onSearch(query);
    }
  };

  const quickTags = ['Linen', 'Denim', 'Cashmere', 'Silk'];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-8">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className={`w-5 h-5 transition-colors ${isUrl ? 'text-black' : 'text-zinc-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isUrl ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            )}
          </svg>
        </div>
        <input
          id="main-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search collections or paste an image URL from Myntra..."
          className="w-full pl-12 pr-40 py-5 bg-white border border-zinc-200 rounded-3xl focus:ring-4 focus:ring-black/5 focus:border-black outline-none shadow-xl transition-all text-zinc-900 placeholder:text-zinc-400 font-medium"
        />
        <div className="absolute inset-y-2 right-2 flex gap-2">
          {isUrl ? (
            <button
              onClick={handleAction}
              className="px-6 bg-black text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2"
            >
              <span>Import & Try</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          ) : (
            <button
              onClick={handleAction}
              className="px-8 bg-black text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
            >
              Search
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-5 flex flex-wrap gap-4 justify-center">
        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] self-center mr-2">Quick Filters:</span>
        {quickTags.map((tag) => (
          <button
            key={tag}
            onClick={() => { setQuery(tag); onSearch(tag); }}
            className="px-4 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 text-zinc-600 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
