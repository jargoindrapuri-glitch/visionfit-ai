
import React, { useState, useRef } from 'react';
import { Product, TryOnResult } from '../types';
import { geminiService } from '../services/geminiService';
import Button from './Button';
import TryOnProcessing from './TryOnProcessing';

interface TryOnModalProps {
  product: Product;
  onClose: () => void;
}

const TryOnModal: React.FC<TryOnModalProps> = ({ product, onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<TryOnResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    
    setIsProcessing(true);
    setResult(null);

    // Helper to strip data URL prefix for API
    const base64 = image.split(',')[1];

    const res = await geminiService.performTryOn({
      userImageBase64: base64,
      productImageUrl: product.imageUrl,
      height,
      weight,
      garmentType: product.category
    });

    setResult(res);
    setIsProcessing(false);
  };

  const resetTryOn = () => {
    setResult(null);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-full">
        {/* Left Side: Garment Info (Hidden on mobile scroll) */}
        <div className="hidden md:flex md:w-1/3 bg-zinc-50 border-r border-zinc-100 flex-col">
          <img src={product.imageUrl} alt={product.title} className="w-full aspect-[3/4] object-cover" />
          <div className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{product.category}</span>
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="text-lg font-medium text-black">{product.price}</p>
            <p className="text-sm text-zinc-500">{product.description}</p>
          </div>
        </div>

        {/* Right Side: Action Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          {isProcessing ? (
            <div className="flex-1 flex items-center justify-center">
                <TryOnProcessing />
            </div>
          ) : result?.status === 'success' ? (
            <div className="space-y-6 flex-1 flex flex-col items-center">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Your Look is Ready!</h2>
                <p className="text-zinc-500">How do you think it looks?</p>
              </div>
              
              <div className="relative group w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-zinc-100">
                <img src={result.imageUrl} alt="Result" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">AI GENERATED</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <Button className="flex-1" onClick={() => window.alert('Added to cart!')}>Add to Cart</Button>
                <Button variant="secondary" className="flex-1" onClick={resetTryOn}>Try Again</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 flex-1">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Try it on.</h2>
                <p className="text-zinc-500">Upload a photo to see how this fits you perfectly.</p>
              </div>

              <div className="space-y-6">
                {/* Upload Section */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative cursor-pointer border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all
                    ${image ? 'border-zinc-200 bg-zinc-50' : 'border-zinc-300 hover:border-black bg-white'}
                  `}
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                  />
                  
                  {image ? (
                    <div className="relative w-40 aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                      <img src={image} className="w-full h-full object-cover" alt="User" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">Change Photo</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                      <p className="text-zinc-600 font-medium">Click to upload your photo</p>
                      <p className="text-zinc-400 text-xs mt-1">Full body or upper body works best</p>
                    </>
                  )}
                </div>

                {/* Measurements Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase">Height (cm)</label>
                    <input 
                      type="number" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                      placeholder="e.g. 175"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase">Weight (kg)</label>
                    <input 
                      type="number" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                      placeholder="e.g. 70"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    size="lg" 
                    disabled={!image}
                    onClick={handleGenerate}
                  >
                    Magic Try-On
                  </Button>
                  <p className="text-center text-[10px] text-zinc-400 mt-4 leading-relaxed">
                    By clicking "Magic Try-On", you agree to our processing of your image to generate the try-on result. We preserve your identity using advanced AI.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TryOnModal;
