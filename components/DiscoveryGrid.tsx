
import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface DiscoveryGridProps {
  onProductClick: (product: Product) => void;
  searchQuery?: string;
}

const DiscoveryGrid: React.FC<DiscoveryGridProps> = ({ onProductClick, searchQuery = '' }) => {
  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">
            {searchQuery ? `Results for "${searchQuery}"` : 'Popular Items'}
          </h2>
          {searchQuery && filteredProducts.length > 0 && (
            <p className="text-xs text-zinc-500 mt-1 font-medium italic">Found {filteredProducts.length} items. Try one on yourself 👇</p>
          )}
        </div>
        {!searchQuery && (
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-black text-white rounded-full text-xs font-bold shadow-md">All</button>
            <button className="px-4 py-1.5 bg-zinc-100 text-zinc-600 rounded-full text-xs font-bold hover:bg-zinc-200 transition-colors">New</button>
            <button className="px-4 py-1.5 bg-zinc-100 text-zinc-600 rounded-full text-xs font-bold hover:bg-zinc-200 transition-colors">Trending</button>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="masonry animate-in fade-in slide-in-from-bottom-4 duration-700">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="masonry-item group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-4">
                  <button 
                    className="w-full bg-white text-black py-3 rounded-xl font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                  >
                    Quick Try-On
                  </button>
                </div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg shadow-sm">
                  <span className="text-[10px] font-black tracking-wider text-black">{product.price}</span>
                </div>
              </div>
              <div className="mt-3 px-1">
                <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-black transition-colors">{product.title}</h3>
                <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">{product.category}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-6">
          <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mx-auto border border-zinc-100 shadow-inner">
            <svg className="w-10 h-10 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">No results found</h3>
            <p className="text-zinc-500 text-sm max-w-xs mx-auto">We couldn't find anything matching "{searchQuery}". Try searching for categories like "Outerwear" or "Tops".</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-2.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscoveryGrid;
