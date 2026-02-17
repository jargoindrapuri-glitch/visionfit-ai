
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import Button from './Button';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Verification email sent! Please check your inbox.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="text-center space-y-3 mb-10">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span className="text-white font-bold text-3xl italic">V</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
          <p className="text-zinc-500 font-medium text-sm">Access your Digital Body Model and try-on history.</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full py-5 mt-4 shadow-xl shadow-black/10" isLoading={isLoading}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-bold text-zinc-400 hover:text-black transition-colors uppercase tracking-widest"
          >
            {isSignUp ? "Already have an account? Sign In" : "New to VisionFit? Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
