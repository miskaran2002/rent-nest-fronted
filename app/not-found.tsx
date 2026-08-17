import React from 'react';
import Link from 'next/link';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white overflow-hidden select-none">
      
      {/* গ্লোইং এরর শ্যাডো ইফেক্ট */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[130px]" />
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-md mx-auto">
        
        {/* ৪০৪ লোগো */}
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
          <Compass className="h-8 w-8 animate-spin duration-3000" />
        </div>

        {/* টেক্সট সেকশন */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            404 - Page Not Found
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* হোমপেজে ফিরে যাওয়ার বোতাম */}
        <div className="pt-2">
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-white hover:bg-zinc-200 text-black text-sm font-bold rounded-xl cursor-pointer shadow-lg shadow-white/5 transition-all">
              <Home className="h-4 w-4" />
              Back to Home
            </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
}