'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building, ClipboardList, DollarSign, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminService } from '@/service/admin.service';


export default function AdminDashboardIndex() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalRentals: 0,
    totalEarnings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminOverview = async () => {
      try {
        const response = await AdminService.getAdminOverview();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        toast.error('Failed to load platform overview statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminOverview();
  }, []);

  if (isLoading) {
    return <div className="text-zinc-500 text-sm animate-pulse">Loading platform statistics...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 select-none"
    >
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Admin Overview</h1>
        <p className="text-zinc-500 text-sm mt-1">Monitor users, oversee property listings, and track platform earnings</p>
      </div>

      {/* ৪-কলাম অ্যাডমিন অ্যানালিটিক্স গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* মোট ইউজার */}
        <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-900 p-6 rounded-2xl space-y-4 hover:border-indigo-500/20 transition-all">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <Users className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Users</p>
            <h3 className="text-3xl font-black text-white">{stats.totalUsers}</h3>
          </div>
        </div>

        {/* মোট প্রপার্টি */}
        <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-900 p-6 rounded-2xl space-y-4 hover:border-purple-500/20 transition-all">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <Building className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Listings</p>
            <h3 className="text-3xl font-black text-white">{stats.totalProperties}</h3>
          </div>
        </div>

        {/* মোট রেন্টাল */}
        <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-900 p-6 rounded-2xl space-y-4 hover:border-amber-500/20 transition-all">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Rentals</p>
            <h3 className="text-3xl font-black text-white">{stats.totalRentals}</h3>
          </div>
        </div>

        {/* মোট পেমেন্ট রেভিনিউ */}
        <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-900 p-6 rounded-2xl space-y-4 hover:border-emerald-500/20 transition-all">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Earnings</p>
            <h3 className="text-3xl font-black text-emerald-400">${stats.totalEarnings.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl border border-zinc-800/60 bg-gradient-to-r from-indigo-950/20 via-zinc-900/40 to-violet-950/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-1.5"><Sparkles className="h-5 w-5 text-indigo-400" /> Administrative Moderation</h3>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-md">Use the sidebar navigation to moderate accounts, add/remove system categories, and review all active rental contracts.</p>
        </div>
      </div>
    </motion.div>
  );
}