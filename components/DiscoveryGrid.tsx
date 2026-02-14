
import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface DiscoveryGridProps {
  onProductClick: (product: Product) => void;
}

const DiscoveryGrid: React.FC<DiscoveryGridProps> = ({ onProductClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-black">Popular Items</h2>
        <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-black text-white rounded-full text-xs font-bold">All</button>
            <button className="px-4 py-1.5 bg-zinc-100 text-zinc-600 rounded-full text-xs font-bold hover:bg-zinc-200">New</button>
            <button className="px-4 py-1.5 bg-zinc-100 text-zinc-600 rounded-full text-xs font-bold hover:bg-zinc-200">Trending</button>
        </div>
      </div>

      <div className="masonry">
        {MOCK_PRODUCTS.map((product) => (
          <div 
            key={product.id} 
            className="masonry-item group cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            <div className="relative overflow-hidden rounded-2xl bg-zinc-100">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-4">
                <button 
                  className="w-full bg-white text-black py-3 rounded-xl font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                >
                  Quick Try-On
                </button>
              </div>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg">
                <span className="text-[10px] font-bold tracking-wider text-black">{product.price}</span>
              </div>
            </div>
            <div className="mt-3 px-1">
              <h3 className="text-sm font-semibold text-zinc-900 group-hover:underline">{product.title}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoveryGrid;
