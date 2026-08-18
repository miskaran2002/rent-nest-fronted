'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function PaymentCancelPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // ৫ সেকেন্ড পর স্বয়ংক্রিয়ভাবে টেন্যান্ট ড্যাশবোর্ডে রিডাইরেক্ট করবে
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/tenant-dashboard/my-rentals');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white overflow-hidden select-none">
      
      {/* ব্যাকগ্রাউন্ড শ্যাডো ইফেক্ট */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-red-900/10 blur-[130px] animate-pulse duration-5000" />
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-md mx-auto">
        
        {/* ক্যান্সেল অ্যানিমেটেড লোগো */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 shadow-lg shadow-red-500/5"
        >
          <XCircle className="h-8 w-8" />
        </motion.div>

        {/* ক্যান্সেল মেসেজ */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Payment Cancelled! ❌
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            It looks like you canceled the transaction or decided not to complete the payment. No funds were charged from your card.
          </p>
        </div>

        {/* কাউন্টডাউন টাইমার */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="flex items-center gap-2 text-xs text-red-400 font-medium">
            <Loader2 className="h-4 w-4 animate-spin text-red-400" />
            Redirecting to your Rental Requests in {countdown}s...
          </div>

          <button
            onClick={() => router.push('/tenant-dashboard/my-rentals')}
            className="mt-2 flex items-center gap-1.5 px-6 py-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-xl cursor-pointer transition-colors"
          >
            Back to Rental Requests
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        
      </div>
    </div>
  );
}