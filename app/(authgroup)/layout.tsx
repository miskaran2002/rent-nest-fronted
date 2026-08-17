'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8 overflow-hidden select-none">
      
      {/* global mesh gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-900/25 blur-[130px] animate-pulse duration-10000" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-violet-900/20 blur-[130px] animate-pulse duration-8000" />
      </div>

      {/* master split grid container (responsive grid) */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center justify-center mx-auto">
        
        {/* left side: animated brand image showcase (hidden on mobile, shown on large screens) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hidden lg:flex lg:col-span-7 relative rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl h-[550px] flex-col justify-end p-8"
          style={{
            backgroundImage: "url('/auth-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* brand image gradient overlay (dark shadow effect) */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-0" />
          
          {/* image overlay text */}
          <div className="relative z-10 space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              RentNest Market
            </h1>
            <p className="text-zinc-300 text-sm max-w-sm leading-relaxed">
              Find your dream home or list your properties with ease. Experience premium living at your fingertips.
            </p>
          </div>
        </motion.div>

        {/* right side: animated glass-morphism form card (shown on all devices and responsive) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-5 w-full bg-zinc-900/40 backdrop-blur-xl p-8 rounded-2xl border border-zinc-800/80 shadow-2xl flex flex-col justify-center min-h-[550px]"
        >
          {children}
        </motion.div>

      </div>
    </div>
  );
}