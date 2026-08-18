'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building, ClipboardList, DollarSign, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../../store/useAuthStore';
import { PropertyService } from '@/service/property.service';
import { RentalService } from '@/service/rental.service';
import { PaymentService } from '@/service/payment.service';


export default function LandlordDashboardIndex() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeRequests: 0,
    totalEarnings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLandlordStats = async () => {
      try {
        if (!user) return;

        // ১. সব প্রপার্টি লোড করে নিজের প্রপার্টি সংখ্যা ফিল্টার করা
        const propertyRes = await PropertyService.getProperties();
        const myProperties = propertyRes.data.filter((p: any) => p.landlordId === user.userId);

        // ২. নিজের সব রেন্টাল রিকোয়েস্ট লোড করা (RentalService এর মাধ্যমে)
        const rentalRes = await RentalService.getMyRentals();
        const activeRequests = rentalRes.data.filter(
          (r: any) => r.status === 'ACTIVE' || r.status === 'APPROVED'
        );

        // ৩. নিজের পেমেন্ট হিস্ট্রি লোড করে রেভিনিউ হিসাব করা (PaymentService এর মাধ্যমে)
        const paymentRes = await PaymentService.getMyPayments();
        const completedPayments = paymentRes.data.filter(
          (p: any) => p.status === 'COMPLETED' && p.rentalRequest?.property?.landlordId === user.userId
        );
        const totalEarnings = completedPayments.reduce((sum: number, p: any) => sum + p.amount, 0);

        setStats({
          totalProperties: myProperties.length,
          activeRequests: activeRequests.length,
          totalEarnings,
        });
      } catch (error) {
        toast.error('Failed to load dashboard overview stats');
      } {
        setIsLoading(false);
      }
    };

    fetchLandlordStats();
  }, [user]);

  if (isLoading) {
    return <div className="text-zinc-500 text-sm animate-pulse">Loading dashboard overview...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 select-none"
    >
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Landlord Overview</h1>
        <p className="text-zinc-500 text-sm mt-1">Oversee listed properties, track active tenants, and monitor revenue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* কার্ড ১ */}
        <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-900 p-6 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <Building className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Properties</p>
            <h3 className="text-3xl font-black text-white">{stats.totalProperties} Listed</h3>
          </div>
        </div>

        {/* কার্ড ২ */}
        <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-900 p-6 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Active Rentals</p>
            <h3 className="text-3xl font-black text-white">{stats.activeRequests} Active</h3>
          </div>
        </div>

        {/* কার্ড ৩ */}
        <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-900 p-6 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-3xl font-black text-emerald-400">${stats.totalEarnings.toLocaleString()} USD</h3>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl border border-zinc-800/60 bg-gradient-to-r from-indigo-950/20 via-zinc-900/40 to-violet-950/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-1.5"><Sparkles className="h-5 w-5 text-indigo-400" /> Start Listing More Spaces</h3>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-md">Grow your real estate rental business. Upload apartments or pool houses to attract more student and family tenants.</p>
        </div>
      </div>
    </motion.div>
  );
}