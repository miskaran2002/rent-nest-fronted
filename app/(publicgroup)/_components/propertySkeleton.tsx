import React from 'react';

export default function PropertySkeleton() {
  return (
    <div className="flex flex-col bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden shadow-xl animate-pulse select-none">
      {/* ইমেজ কঙ্কাল */}
      <div className="h-48 w-full bg-zinc-900/50" />

      {/* কন্টেন্ট কঙ্কাল */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-5 bg-zinc-900 rounded-md w-3/4" />
          <div className="h-4 bg-zinc-900 rounded-md w-1/2" />
        </div>
        
        <div className="flex gap-2 pt-1">
          <div className="h-4 bg-zinc-900 rounded-md w-12" />
          <div className="h-4 bg-zinc-900 rounded-md w-14" />
          <div className="h-4 bg-zinc-900 rounded-md w-16" />
        </div>

        <div className="pt-4 border-t border-zinc-900">
          <div className="h-8 bg-zinc-900 rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
}