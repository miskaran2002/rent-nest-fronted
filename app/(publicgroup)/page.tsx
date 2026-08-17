'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CreditCard, Star, Building, Home, Compass } from 'lucide-react';

export default function HomePage() {
  
  // ১. কন্টেইনার ভ্যারিয়েন্ট (স্ট্যাগার ইফেক্টের জন্য)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // ২. কার্ডের ভ্যারিয়েন্ট (শুধুমাত্র পজিশন ও ফেড হ্যান্ডেল করবে)
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  return (
    <div className="bg-zinc-950 text-white min-h-screen select-none overflow-hidden pb-16">
      
      {/* ১. হিরো সেকশন (Hero Section with Background Image Overlay) */}
      <div 
        className="relative h-[85vh] flex items-center justify-center bg-cover bg-center border-b border-zinc-900"
        style={{ backgroundImage: "url('/auth-bg.png')" }}
      >
        {/* অন্ধকার গ্লাস-মরফিজম ও গ্রেডিয়েন্ট শ্যাডো ওভারলে */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950 z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-400 mb-2"
          >
            <Compass className="h-3.5 w-3.5" />
            Your Premium Property Partner
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white"
          >
            Find Your Next Cozy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Home with Ease
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Explore verified premium properties, connect directly with trusted landlords, and complete secure rentals in seconds.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link 
              href="/properties" 
              className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              Browse Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-6 py-2.5 border border-zinc-800 bg-zinc-900/40 backdrop-blur-md hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg text-sm font-semibold transition-all text-center"
            >
              List Your Property
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ২. ফিচার্ড ক্যাটাগরি সেকশন (Featured Categories - ৩টি কলাম) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">Featured Categories</h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Choose from a wide variety of verified residential spaces tailored to your lifestyle.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* ক্যাটাগরি ১: Apartment */}
          <motion.div variants={itemVariants} className="group bg-zinc-900/40 border border-zinc-900 hover:border-indigo-500/40 rounded-xl p-6 transition-all hover:-translate-y-1">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Apartment</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">Modern, self-contained residential suites designed for comfort and luxury living.</p>
          </motion.div>

          {/* ক্যাটাগরি ২: House */}
          <motion.div variants={itemVariants} className="group bg-zinc-900/40 border border-zinc-900 hover:border-purple-500/40 rounded-xl p-6 transition-all hover:-translate-y-1">
            <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <Home className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">House</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">Spacious, independent single or multi-family standalone homes with yards.</p>
          </motion.div>

          {/* ক্যাটাগরি ৩: Studio */}
          <motion.div variants={itemVariants} className="group bg-zinc-900/40 border border-zinc-900 hover:border-pink-500/40 rounded-xl p-6 transition-all hover:-translate-y-1">
            <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Studio</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">Cozy single-room living spaces with built-in kitchen, ideal for single occupants.</p>
          </motion.div>

          {/* ক্যাটাগরি ৪: Duplex */}
          <motion.div variants={itemVariants} className="group bg-zinc-900/40 border border-zinc-900 hover:border-emerald-500/40 rounded-xl p-6 transition-all hover:-translate-y-1">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Duplex</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">Spacious two-story residential units offering a house-like structure.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* ৩. ট্রাস্ট ও সিকিউরিটি সেকশন (Why Choose Us) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 border-t border-zinc-900/80 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              A Secure and Automated <br />
              Rental Ecosystem
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
              We eliminate traditional rental hassles with modern automation. Experience the easiest landlord-tenant coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3 p-5 rounded-xl bg-zinc-900/30 border border-zinc-900/80">
              <div className="h-9 w-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-white">Verified Users</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">All users, properties, and reviews are audited to ensure maximum security.</p>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-zinc-900/30 border border-zinc-900/80">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-white">Stripe Payments</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">Hassle-free automated credit card payments with instant ledger updates.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}