
import React, { useState, useEffect } from 'react';
import { PROCESSING_STEPS } from '../constants';

interface TryOnProcessingProps {
  userImage?: string | null;
}

const TryOnProcessing: React.FC<TryOnProcessingProps> = ({ userImage }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % PROCESSING_STEPS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center space-y-8 w-full max-w-md mx-auto">
      {/* Visual Scanning Effect */}
      <div className="relative w-full aspect-[3/4] max-w-[280px] rounded-2xl overflow-hidden bg-zinc-100 shadow-inner border border-zinc-200">
        {userImage ? (
          <img src={userImage} alt="Scanning" className="w-full h-full object-cover opacity-60 grayscale" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-50">
            <svg className="w-20 h-20 text-zinc-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
        
        {/* The Scanning Line */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-black to-transparent shadow-[0_0_15px_rgba(0,0,0,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Neural Network Dots */}
        <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-black rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Status Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20 shadow-sm flex items-center gap-3">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-black uppercase">Live Computation</span>
        </div>
      </div>
      
      <div className="space-y-4 w-full px-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-black tracking-tight">Creating your look</h3>
          <div className="h-6 flex items-center justify-center">
            <p className="text-sm text-zinc-500 italic transition-all duration-700 ease-in-out transform">
              {PROCESSING_STEPS[stepIndex]}
            </p>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="relative w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-black transition-all duration-1000 ease-in-out" 
            style={{ width: `${((stepIndex + 1) / PROCESSING_STEPS.length) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-1">
          <span>Initializing</span>
          <span>{Math.round(((stepIndex + 1) / PROCESSING_STEPS.length) * 100)}%</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(380px); opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default TryOnProcessing;
