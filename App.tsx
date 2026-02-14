
import React, { useState } from 'react';
import Header from './components/Header';
import DiscoveryGrid from './components/DiscoveryGrid';
import TryOnModal from './components/TryOnModal';
import Button from './components/Button';
import { Product } from './types';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-xs font-bold tracking-wide text-zinc-600 mb-6">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            NEXT-GEN AI TRY-ON
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black max-w-4xl mx-auto leading-[1.1]">
            Experience Fashion, <br /> 
            <span className="text-zinc-400 italic font-serif">Personally</span> Tailored.
          </h1>
          <p className="mt-8 text-xl text-zinc-500 max-w-2xl mx-auto">
            VisionFit AI lets you virtually try on clothes with stunning identity-preserving accuracy. Zero returns, 100% confidence.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg">Explore Collection</Button>
            <Button variant="outline" size="lg">Integration for Shopify</Button>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-5 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-zinc-400 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-zinc-400 rounded-full blur-[120px]"></div>
        </div>
      </section>

      {/* Main Grid Section */}
      <DiscoveryGrid onProductClick={setSelectedProduct} />

      {/* Features/Trust Section */}
      <section className="bg-zinc-50 py-24 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21a8.966 8.966 0 01-5.917-2.24L4 12l8-8 8 8-2.083 6.76A8.967 8.967 0 0112 21z"></path></svg>
              </div>
              <h3 className="font-bold text-xl">Identity Preserved</h3>
              <p className="text-zinc-500">Our advanced neural networks ensure your facial features and body shape stay exactly as they are.</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="font-bold text-xl">Instant Processing</h3>
              <p className="text-zinc-500">From upload to high-fidelity render in under 15 seconds. Experience real-time styling today.</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
              </div>
              <h3 className="font-bold text-xl">True-to-Scale Fit</h3>
              <p className="text-zinc-500">Provide your height and weight for a dimensionally accurate visualization of how fabric drapes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-4 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl italic">V</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">VisionFit AI</span>
                </div>
                <p className="text-sm text-zinc-500">Revolutionizing the way the world shops for fashion through identity-preserving generative AI.</p>
            </div>
            <div className="flex gap-12 text-sm font-medium text-zinc-600">
                <div className="space-y-3">
                    <p className="text-black font-bold uppercase tracking-widest text-[10px]">Company</p>
                    <a href="#" className="block hover:text-black">Privacy Policy</a>
                    <a href="#" className="block hover:text-black">Terms of Service</a>
                </div>
                <div className="space-y-3">
                    <p className="text-black font-bold uppercase tracking-widest text-[10px]">Support</p>
                    <a href="#" className="block hover:text-black">Help Center</a>
                    <a href="#" className="block hover:text-black">API Docs</a>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400 uppercase tracking-widest font-bold">
            <p>&copy; 2024 VisionFit AI. All rights reserved.</p>
            <p>Built with Gemini Pro Vision</p>
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
