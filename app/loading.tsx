import React from 'react';
import { Building, Loader2 } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white overflow-hidden select-none">
      
      {/* ব্যাকগ্রাউন্ড গ্লোয়িং মেশ গ্রেডিয়েন্ট */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[130px] animate-pulse duration-5000" />
        <div className="absolute bottom-[20%] right-[20%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[130px] animate-pulse duration-7000" />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-6">
        
        {/* কাস্টম ব্র্যান্ড লোগো স্পিনার */}
        <div className="relative flex items-center justify-center h-20 w-20">
          
          {/* বাইরে ঘুরতে থাকা মেটালিক রিং */}
          <div className="absolute inset-0 rounded-2xl border-t-2 border-indigo-500 animate-spin" />
          
          {/* ভেতরের রেন্টনেস্ট লোগো */}
          <div className="h-14 w-14 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/5">
            <Building className="h-7 w-7 text-indigo-500" />
          </div>
        </div>

        {/* টেক্সট লোডার প্যানেল */}
        <div className="space-y-1.5 text-center">
          <p className="text-sm font-bold tracking-widest text-zinc-400 uppercase">
            RentNest
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-600 font-medium">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500" />
            Preparing your portal...
          </div>
        </div>
        
      </div>
    </div>
  );
}