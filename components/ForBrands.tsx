
import React from 'react';
import Button from './Button';

const ForBrands: React.FC = () => {
  const stats = [
    { label: "Increase in CV", value: "+45%", desc: "Average conversion rate boost for integrated stores." },
    { label: "Return Reduction", value: "-30%", desc: "Significant drop in size-related returns and logistics costs." },
    { label: "User Engagement", value: "4.5x", desc: "Longer average session duration compared to static galleries." }
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-black tracking-[0.2em] text-zinc-600 mb-8 border border-zinc-200/50">
          ENTERPRISE SOLUTION
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black mb-10 leading-tight">
          Drive Confidence, <br /> Reduce Returns.
        </h1>
        <p className="text-xl text-zinc-500 leading-relaxed font-medium">
          VisionFit AI seamlessly integrates with your existing e-commerce stack to eliminate the #1 reason for returns: sizing uncertainty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-10 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow duration-500 text-center space-y-4">
            <div className="text-5xl font-black text-black tracking-tighter">{stat.value}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</div>
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Easy Integration.</h2>
            <p className="text-zinc-500 font-medium leading-relaxed">
              We provide multiple ways to deploy VisionFit AI to your store, from a turn-key Shopify app to a robust Headless API.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-black rounded-xl flex-shrink-0 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-lg">Headless API</h4>
                <p className="text-sm text-zinc-500 font-medium">Full control for custom-built e-commerce platforms using our RESTful endpoints.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-black rounded-xl flex-shrink-0 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-8h2v8zm4 0h-2v-8h2v8z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-lg">Shopify App</h4>
                <p className="text-sm text-zinc-500 font-medium">One-click install for Shopify stores with automated garment catalog synchronization.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <Button size="lg">Contact Sales</Button>
            <Button variant="outline" size="lg">Read API Docs</Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-square bg-zinc-50 rounded-[3rem] border border-zinc-100 flex items-center justify-center p-12 overflow-hidden">
            <div className="w-full aspect-video bg-white rounded-2xl shadow-2xl border border-zinc-100 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-zinc-200 rounded-full"></div>
                  <div className="w-3 h-3 bg-zinc-200 rounded-full"></div>
                  <div className="w-3 h-3 bg-zinc-200 rounded-full"></div>
                </div>
                <div className="px-3 py-1 bg-zinc-50 rounded-lg text-[8px] font-black uppercase tracking-widest text-zinc-400">Dashboard</div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-1/3 bg-zinc-100 rounded-lg"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-zinc-50 rounded-xl border border-zinc-100"></div>
                  <div className="h-24 bg-zinc-50 rounded-xl border border-zinc-100"></div>
                </div>
                <div className="h-32 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-center">
                  <div className="w-1/2 h-2 bg-zinc-200 rounded-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2/3 h-full bg-black"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-black rounded-3xl -z-10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ForBrands;
