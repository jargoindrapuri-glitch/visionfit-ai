
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
        <div className="space-y-10">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-tight">
              Confidence is <br /> <span className="text-zinc-400 italic font-serif font-normal">Personal</span>.
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium">
              We started VisionFit AI with a simple observation: the digital shopping experience hasn't changed in 20 years. 
              We're changing that by bringing the fitting room to your screen.
            </p>
          </div>
          <div className="space-y-6 text-zinc-600 font-medium leading-relaxed">
            <p>
              Our team consists of fashion veterans and deep-tech engineers who believe that 
              shopping should be about expression, not guesswork. By leveraging Google's 
              cutting-edge Gemini AI, we've solved the "identity-preservation" problem that has 
              plagued virtual try-on tools for a decade.
            </p>
            <p>
              Today, VisionFit AI serves hundreds of brands globally, helping millions of shoppers 
              find their perfect style while significantly reducing the environmental impact of 
              logistics and returns.
            </p>
          </div>
        </div>
        
        <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop" 
            alt="Fashion and Tech" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
            <div className="text-white space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Founded 2024</p>
              <h3 className="text-2xl font-bold">Pioneering Generative Fashion</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-16 md:p-24 bg-zinc-50 rounded-[4rem] text-center space-y-12">
        <h2 className="text-4xl font-black tracking-tight text-black">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h4 className="text-xl font-bold">Human-Centric</h4>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium">Technology should serve people, not replace them. We prioritize realistic body diversity in our models.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold">Privacy-First</h4>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium">Your data and your image are yours. We process previews securely and never store personal biometric data.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold">Sustainable</h4>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium">By reducing returns, we actively lower the carbon footprint of the global fashion industry.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
