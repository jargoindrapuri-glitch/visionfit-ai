
import React, { useState } from 'react';
import Header from './components/Header';
import DiscoveryGrid from './components/DiscoveryGrid';
import TryOnModal from './components/TryOnModal';
import Button from './components/Button';
import SearchBar from './components/SearchBar';
import { Product } from './types';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold tracking-widest text-zinc-600 mb-8 border border-zinc-200/50">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            NEXT-GEN AI TRY-ON
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black max-w-5xl mx-auto leading-[0.95] mb-8">
            Experience Fashion, <br /> 
            <span className="text-zinc-400 italic font-serif font-normal">Personally</span> Tailored.
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            VisionFit AI lets you virtually try on clothes with stunning identity-preserving accuracy. Zero returns, 100% confidence.
          </p>
          
          <SearchBar onSearch={setSearchQuery} />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => {
              document.getElementById('discovery-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>Explore Collection</Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Integration for Shopify</Button>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-zinc-400 rounded-full blur-[140px] animate-pulse"></div>
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-zinc-400 rounded-full blur-[140px] animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </section>

      {/* Main Grid Section */}
      <div id="discovery-section" className="scroll-mt-20">
        <DiscoveryGrid 
          onProductClick={setSelectedProduct} 
          searchQuery={searchQuery}
        />
      </div>

      {/* Features/Trust Section */}
      <section className="bg-zinc-50 py-24 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-zinc-100">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21a8.966 8.966 0 01-5.917-2.24L4 12l8-8 8 8-2.083 6.76A8.967 8.967 0 0112 21z"></path></svg>
              </div>
              <h3 className="font-bold text-xl tracking-tight">Identity Preserved</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Our advanced neural networks ensure your facial features and body shape stay exactly as they are.</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-zinc-100">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="font-bold text-xl tracking-tight">Instant Processing</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">From upload to high-fidelity render in under 15 seconds. Experience real-time styling today.</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-zinc-100">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
              </div>
              <h3 className="font-bold text-xl tracking-tight">True-to-Scale Fit</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Provide your height and weight for a dimensionally accurate visualization of how fabric drapes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 px-4 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="space-y-6 max-w-sm">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl italic">V</span>
                    </div>
                    <span className="text-2xl font-black tracking-tighter">VisionFit AI</span>
                </div>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">Revolutionizing the way the world shops for fashion through identity-preserving generative AI.</p>
            </div>
            <div className="flex gap-16 text-sm">
                <div className="space-y-4">
                    <p className="text-black font-black uppercase tracking-widest text-[10px]">Company</p>
                    <div className="space-y-2 text-zinc-500 font-medium">
                        <a href="#" className="block hover:text-black transition-colors">Privacy Policy</a>
                        <a href="#" className="block hover:text-black transition-colors">Terms of Service</a>
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-black font-black uppercase tracking-widest text-[10px]">Support</p>
                    <div className="space-y-2 text-zinc-500 font-medium">
                        <a href="#" className="block hover:text-black transition-colors">Help Center</a>
                        <a href="#" className="block hover:text-black transition-colors">API Docs</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-black">
            <p>&copy; 2024 VisionFit AI. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Built with Gemini 2.5 Flash
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            </p>
        </div>
      </footer>

      {/* Virtual Try-On Modal */}
      {selectedProduct && (
        <TryOnModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default App;
