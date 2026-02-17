
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DiscoveryGrid from './components/DiscoveryGrid';
import TryOnModal from './components/TryOnModal';
import Button from './components/Button';
import SearchBar from './components/SearchBar';
import HowItWorks from './components/HowItWorks';
import ForBrands from './components/ForBrands';
import About from './components/About';
import AuthModal from './components/AuthModal';
import { Product } from './types';
import { MOCK_PRODUCTS } from './constants';
import { supabase } from './services/supabaseClient';

type View = 'shop' | 'how-it-works' | 'brands' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Listen for Auth Changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } catch (err) {
        console.warn("Supabase connection failed, using offline fallback.", err);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleImportUrl = (url: string) => {
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      title: 'Imported Garment',
      price: 'Custom Selection',
      imageUrl: url,
      description: 'Imported via URL. Visualize this garment on your body instantly.',
      category: 'External'
    };
    setSelectedProduct(customProduct);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'how-it-works':
        return <HowItWorks />;
      case 'brands':
        return <ForBrands />;
      case 'about':
        return <About />;
      default:
        return (
          <>
            <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
              <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-black tracking-[0.2em] text-zinc-600 mb-10 border border-zinc-200/50 shadow-sm">
                  <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                  </span>
                  GEN-AI VIRTUAL FITTING ROOM
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black max-w-5xl mx-auto leading-[0.95] mb-10">
                  Style from Any Site, <br /> 
                  <span className="text-zinc-400 italic font-serif font-normal">Visualized</span> on You.
                </h1>
                <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-14 font-medium leading-relaxed">
                  VisionFit AI lets you try on clothes from any store instantly. Just paste an image link or browse our curated collections.
                </p>
                
                <SearchBar onSearch={setSearchQuery} onImportUrl={handleImportUrl} />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">
                  <Button size="lg" className="w-full sm:w-auto shadow-2xl shadow-black/10 group" onClick={() => {
                    document.getElementById('discovery-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <span>Explore Collection</span>
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => setCurrentView('brands')}>Integration for Brands</Button>
                </div>
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-[0.07] pointer-events-none">
                  <div className="absolute top-20 left-1/4 w-[700px] h-[700px] bg-zinc-600 rounded-full blur-[150px] animate-pulse"></div>
                  <div className="absolute bottom-10 right-1/4 w-[700px] h-[700px] bg-zinc-600 rounded-full blur-[150px] animate-pulse" style={{animationDelay: '1.5s'}}></div>
              </div>
            </section>

            <div id="discovery-section" className="scroll-mt-20">
              <DiscoveryGrid 
                onProductClick={setSelectedProduct} 
                searchQuery={searchQuery}
                products={products}
                isLoading={isLoadingProducts}
              />
            </div>

            <section className="bg-zinc-50 py-32 border-y border-zinc-100">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20 space-y-4">
                  <h2 className="text-4xl font-black tracking-tight">Engineered for Precision</h2>
                  <p className="text-zinc-500 font-medium">How VisionFit AI achieves studio-quality virtual try-ons.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="space-y-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-zinc-100">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21a8.966 8.966 0 01-5.917-2.24L4 12l8-8 8 8-2.083 6.76A8.967 8.967 0 0112 21z"></path></svg>
                    </div>
                    <h3 className="font-bold text-xl tracking-tight">Identity Preservation</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Our Gemini 2.5 architecture ensures your facial structure and skin tones remain 100% consistent across every try-on.</p>
                  </div>
                  <div className="space-y-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-zinc-100">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 className="font-bold text-xl tracking-tight">Physics-Based Draping</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">We simulate real-world fabric tension and gravity, showing exactly how linen, silk, or denim folds over your frame.</p>
                  </div>
                  <div className="space-y-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-zinc-100">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
                    </div>
                    <h3 className="font-bold text-xl tracking-tight">Dimensional Accuracy</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">By factoring in your height and weight, the model scales the garment size to provide a realistic fitting visualization.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        user={user} 
        onAuthClick={() => setIsAuthModalOpen(true)} 
      />
      
      <main className="animate-in fade-in duration-700">
        {renderContent()}
      </main>

      <footer className="bg-white py-24 px-4 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
            <div className="space-y-8 max-w-sm">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('shop')}>
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-2xl">
                        <span className="text-white font-bold text-3xl italic">V</span>
                    </div>
                    <span className="text-3xl font-black tracking-tighter">VisionFit AI</span>
                </div>
                <p className="text-base text-zinc-500 font-medium leading-relaxed">Identity-preserving AI rendering synchronized via Supabase Cloud.</p>
            </div>
            <div className="flex gap-20 text-sm">
                <div className="space-y-5">
                    <p className="text-black font-black uppercase tracking-[0.2em] text-[10px]">Company</p>
                    <div className="space-y-3 text-zinc-500 font-bold">
                        <button onClick={() => setCurrentView('how-it-works')} className="block hover:text-black transition-colors">How it works</button>
                        <button onClick={() => setCurrentView('brands')} className="block hover:text-black transition-colors">For Brands</button>
                        <button onClick={() => setCurrentView('about')} className="block hover:text-black transition-colors">About Us</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-zinc-400 uppercase tracking-[0.3em] font-black">
            <p>&copy; 2024 VisionFit AI Platform. All rights reserved.</p>
            <p className="flex items-center gap-3">
              Core: Gemini 2.5 Flash
              <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
            </p>
        </div>
      </footer>

      {selectedProduct && (
        <TryOnModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onSuccess={() => setIsAuthModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
