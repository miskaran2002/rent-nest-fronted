import React from 'react';
import Link from 'next/link';
import { Building, Code2, Mail, ShieldAlert } from 'lucide-react'; // Github এর পরিবর্তে Code2 ইম্পোর্ট

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-12 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ব্র্যান্ড সেকশন */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-indigo-500" />
            <span className="text-lg font-bold text-white tracking-tight">RentNest.</span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-500">
            Find and list premium rental properties with maximum ease. Secure transactions, verified owners, and verified reviews.
          </p>
        </div>

        {/* কুইক লিঙ্কস */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
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
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
            Support & Info
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-zinc-500">
              <Mail className="h-4 w-4 text-indigo-500" />
              support@rentnest.com
            </li>
            <li className="flex items-center gap-2 text-zinc-500">
              <ShieldAlert className="h-4 w-4 text-indigo-500" />
              Secure Payments by Stripe
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} RentNest Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400">
            <Code2 className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}