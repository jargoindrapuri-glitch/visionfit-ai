
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface DiscoveryGridProps {
  onProductClick: (product: Product) => void;
  searchQuery?: string;
  products?: Product[];
  isLoading?: boolean;
}

const DiscoveryGrid: React.FC<DiscoveryGridProps> = ({ 
  onProductClick, 
  searchQuery = '', 
  products = [], 
  isLoading = false 
}) => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('visionfit_recently_viewed');
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recently viewed items", e);
      }
    }
  }, []);

  const handleProductItemClick = (product: Product) => {
    onProductClick(product);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 5);
      localStorage.setItem('visionfit_recently_viewed', JSON.stringify(updated));
      return updated;
    });
  };

  const filteredProducts = products.filter((product) => {
    const q = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q)
    );
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="masonry">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="masonry-item mb-8">
              <div className="w-full h-64 bg-zinc-100 rounded-[2rem] animate-pulse"></div>
              <div className="mt-4 space-y-2">
                <div className="w-2/3 h-4 bg-zinc-100 rounded animate-pulse"></div>
                <div className="w-1/3 h-3 bg-zinc-50 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Recently Viewed Section */}
      {!searchQuery && recentlyViewed.length > 0 && (
        <div className="mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Recently Viewed</h3>
            <button 
              onClick={() => {
                localStorage.removeItem('visionfit_recently_viewed');
                setRecentlyViewed([]);
              }}
              className="text-[10px] font-bold text-zinc-300 hover:text-black transition-colors uppercase tracking-widest"
            >
              Clear
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {recentlyViewed.map((product) => (
              <div 
                key={`recent-${product.id}`}
                onClick={() => onProductClick(product)}
                className="flex-shrink-0 w-32 group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/50 mb-2">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h4 className="text-[10px] font-bold text-zinc-900 truncate">{product.title}</h4>
                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mt-0.5">{product.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-black text-black tracking-tighter">
            {searchQuery ? `Results for "${searchQuery}"` : 'Curated Selection'}
          </h2>
          <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mt-2">
            {filteredProducts.length} Premium Items Available
          </p>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mr-2">Sort by</span>
            <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-black focus:ring-0 cursor-pointer">
              <option>Newest First</option>
              <option>Category</option>
            </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="masonry animate-in fade-in duration-1000 slide-in-from-bottom-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="masonry-item group cursor-pointer"
              onClick={() => handleProductItemClick(product)}
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-zinc-100 border border-zinc-200/50 min-h-[250px] shadow-sm transition-all group-hover:shadow-2xl group-hover:shadow-black/5">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-auto block transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl scale-90 group-hover:scale-100 transition-all duration-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Instant Try-On</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 px-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-sm font-bold text-zinc-900 group-hover:text-black transition-colors leading-tight">{product.title}</h3>
                  <div className="w-1.5 h-1.5 bg-zinc-200 rounded-full mt-1.5 group-hover:bg-black transition-colors"></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400">{product.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center space-y-8 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-200">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl border border-zinc-100">
            <svg className="w-10 h-10 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-black">Empty Collection</h3>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed font-medium">
              We couldn't find matches for "{searchQuery}". Try a direct image URL or search for materials like "Silk" or "Linen".
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-10 py-3 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all hover:scale-105"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscoveryGrid;
