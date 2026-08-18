'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [countdown, setCountdown] = useState(5);

  // শুধু কাউন্টডাউন কমানোর জন্য (pure state update)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // countdown যখন ০ এ পৌঁছাবে তখন রিডাইরেক্ট করার জন্য (আলাদা effect)
  useEffect(() => {
    if (countdown === 0) {
      router.push('/tenant-dashboard/my-payments');
    }
  }, [countdown, router]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white overflow-hidden select-none">
      
      {/* ব্যাকগ্রাউন্ড গ্লোয়িং মেশ গ্রেডিয়েন্ট */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-emerald-900/10 blur-[130px] animate-pulse duration-5000" />
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-md mx-auto">
        
        {/* সফলতার অ্যানিমেটেড লোগো */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5"
        >
          <CheckCircle2 className="h-8 w-8" />
        </motion.div>

        {/* সাকসেস মেসেজ */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Payment Successful! 🎉
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Thank you for your payment. Your transaction has been processed successfully, and your rental request is now officially **ACTIVE**.
          </p>
        </div>

        {/* সেশন আইডি বক্স (যদি থাকে) */}
        {sessionId && (
          <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-xl text-xs text-zinc-500 font-mono truncate" title={sessionId}>
            Session ID: {sessionId}
          </div>
        )}

        {/* কাউন্টডাউন টাইমার */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
            <Loader2 className="h-4 w-4 animate-spin" />
            Redirecting to your Payment History in {countdown}s...
          </div>

          <button
            onClick={() => router.push('/tenant-dashboard/my-payments')}
            className="mt-2 flex items-center gap-1.5 px-6 py-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-xl cursor-pointer transition-colors"
          >
            Go to Payments History
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        
      </div>
    </div>
  );
}