import React from 'react';
import Link from 'next/link';
import { Building, Code2, Mail, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900/80 text-zinc-400 py-16 overflow-hidden select-none">
      
      {/* ১. ব্যাকগ্রাউন্ড গ্লোয়িং লাইটস (ব্রাইটনেস বৃদ্ধি করা হয়েছে) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -bottom-20 left-[15%] w-[55%] h-[65%] rounded-full bg-indigo-900/35 blur-[120px]" />
        <div className="absolute -bottom-20 right-[20%] w-[50%] h-[60%] rounded-full bg-purple-950/45 blur-[120px]" />
      </div>

      {/* ২. ⚠️ গ্যারান্টিড ফিউচারিস্টিক ৩ডি সাইবার গ্রিড (পিওর সিএসএস স্টাইল দিয়ে তৈরি) */}
      <div className="absolute inset-x-0 bottom-0 h-56 overflow-hidden pointer-events-none opacity-25 z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.12) 1px, transparent 1px)',
            backgroundSize: '35px 35px',
            transform: 'perspective(400px) rotateX(60deg)',
            transformOrigin: 'bottom',
            maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%)'
          }}
        />
      </div>

      {/* ৩. মূল কন্টেন্ট প্যানেল */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* ব্র্যান্ড সেকশন */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building className="h-5.5 w-5.5 text-indigo-500" />
            <span className="text-xl font-bold text-white tracking-tight">RentNest<span className="text-indigo-500">.</span></span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-500 max-w-sm">
            Find and list premium rental properties with maximum ease. Secure transactions, verified owners, and verified reviews.
          </p>
        </div>

        {/* কুইক লিঙ্কস */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white tracking-wider uppercase">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/properties" className="hover:text-white transition-colors">
                Browse Properties
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-white transition-colors">
                Create Account
              </Link>
            </li>
          </ul>
        </div>

        {/* হেল্প এবং সাপোর্ট */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white tracking-wider uppercase">
            Support & Info
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5 text-zinc-500">
              <Mail className="h-4.5 w-4.5 text-indigo-500" />
              mrayhan21.cse@bu.ac.bd
            </li>
            <li className="flex items-center gap-2.5 text-zinc-500">
              <ShieldAlert className="h-4.5 w-4.5 text-indigo-500" />
              Secure Payments by Stripe
            </li>
          </ul>
        </div>
      </div>

      {/* ফুট নোট ও কপিরাইট */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-zinc-900/60 text-center text-xs text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} RentNest Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://github.com/miskaran2002" target="_blank" rel="noreferrer" className="hover:text-zinc-400">
            <Code2 className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}