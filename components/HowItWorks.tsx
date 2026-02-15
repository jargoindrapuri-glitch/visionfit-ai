
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Select your Outfit",
      desc: "Browse our curated collection or paste a URL from any store. Our AI works with virtually any garment.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Upload your Photo",
      desc: "Upload a clear photo of yourself. For best results, use good lighting and a simple background.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Neural Mapping",
      desc: "Our Gemini 2.5 Flash model analyzes your body shape, height, and weight to ensure a dimensionally accurate fit.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Instant Results",
      desc: "In under 15 seconds, see yourself in a high-fidelity render. Save, share, or add to your cart.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21a8.966 8.966 0 01-5.917-2.24L4 12l8-8 8 8-2.083 6.76A8.967 8.967 0 0112 21z" />
        </svg>
      )
    }
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4">
      <div className="max-w-3xl mb-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black mb-8">
          How it works.
        </h1>
        <p className="text-xl text-zinc-500 leading-relaxed font-medium">
          VisionFit AI combines identity-preserving generative models with precise body scaling 
          to deliver the world's most accurate virtual try-on experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {steps.map((step, idx) => (
          <div key={idx} className="space-y-6 relative group">
            <div className="text-6xl font-black text-zinc-100 group-hover:text-zinc-200 transition-colors duration-500 absolute -top-8 -left-4 -z-10">
              {step.number}
            </div>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-zinc-100 group-hover:scale-110 transition-transform duration-500">
              {step.icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-black tracking-tight">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 p-12 bg-zinc-900 rounded-[3rem] overflow-hidden relative">
        <div className="max-w-2xl relative z-10">
          <h2 className="text-3xl font-black text-white tracking-tight mb-6">Built on Foundation AI</h2>
          <p className="text-zinc-400 font-medium leading-relaxed mb-8">
            Our platform leverages the Gemini 2.5 Flash architecture to process identity and fabric physics simultaneously. 
            Unlike traditional overlays, we generate a fully integrated image where shadows, folds, and lighting are 
            physically coherent with your specific environment.
          </p>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-full border border-white/10">
              <span className="text-white text-[10px] font-black uppercase tracking-widest">98% Accuracy</span>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full border border-white/10">
              <span className="text-white text-[10px] font-black uppercase tracking-widest">15s Response</span>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 select-none pointer-events-none">
          <span className="text-[20rem] font-black tracking-tighter text-white">TECH</span>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
