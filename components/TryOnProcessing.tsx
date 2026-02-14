
import React, { useState, useEffect } from 'react';
import { PROCESSING_STEPS } from '../constants';

const TryOnProcessing: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % PROCESSING_STEPS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-black rounded-full animate-[spin_3s_linear_infinite] border-t-transparent"></div>
        <div className="absolute inset-4 bg-zinc-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-black animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-black">Creating your look</h3>
        <p className="text-zinc-500 min-h-[1.5rem] italic transition-opacity duration-500">
          "{PROCESSING_STEPS[stepIndex]}"
        </p>
      </div>

      <div className="w-64 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
        <div className="h-full bg-black transition-all duration-300 ease-out" style={{ width: `${(stepIndex + 1) * 20}%` }}></div>
      </div>
    </div>
  );
};

export default TryOnProcessing;
