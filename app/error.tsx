'use client'; // Error boundaries অবশ্যই Client Components হতে হবে

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // যেকোনো ব্যাকএন্ড বা রানটাইম ক্র্যাশ এরর লগ করা হচ্ছে
    console.error('App Error Boundary caught an error:', error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white overflow-hidden select-none">
      
      {/* গ্লোইং এরর শ্যাডো ইফেক্ট */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-red-900/10 blur-[130px]" />
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-md mx-auto">
        
        {/* সতর্কবাণী লোগো */}
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 shadow-lg shadow-red-500/5">
          <AlertTriangle className="h-8 w-8" />
        </div>

        {/* এরর মেসেজ টাইটেল */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Something went wrong!
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            An unexpected application error occurred. We have logged this issue and our team is looking into it.
          </p>
        </div>

        {/* শুধুমাত্র ডেভেলপমেন্ট মোডে রিয়েল এরর লগ দেখানোর জন্য কন্ডিশনাল বক্স */}
        {process.env.NODE_ENV === 'development' && (
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-left text-xs font-mono text-red-400 max-h-[150px] overflow-auto select-text">
            <p className="font-bold mb-1">Developer Error Details:</p>
            <p>{error.message || JSON.stringify(error)}</p>
          </div>
        )}

        {/* অ্যাকশন বোতামসমূহ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          
          {/* পুনরায় রেন্ডার চেষ্টা করার বোতাম */}
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/10"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>

          {/* হোমপেজে ফিরে যাওয়ার বোতাম */}
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-xl text-sm font-semibold transition-all cursor-pointer">
              <Home className="h-4 w-4" />
              Go Home
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}