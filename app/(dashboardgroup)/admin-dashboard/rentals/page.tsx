'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, MapPin, DollarSign, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { RentalService } from '@/service/rental.service';


export default function AdminAllRentalsPage() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchAllRentals = async () => {
      try {
        // অ্যাডমিন রুল অনুযায়ী এটি প্ল্যাটফর্মের সব রেন্টাল ডাটা নিয়ে আসবে
        const response = await RentalService.getMyRentals();
        if (response.success) {
          setRentals(response.data);
        }
      } catch (error) {
        toast.error('Failed to load all platform rental requests');
      } finally {
        setIsFetching(false);
      }
    };

    fetchAllRentals();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase"><Clock className="h-3 w-3" /> PENDING</span>;
      case 'APPROVED':
        return <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full uppercase"><CheckCircle2 className="h-3 w-3" /> APPROVED</span>;
      case 'ACTIVE':
        return <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase"><CheckCircle2 className="h-3 w-3" /> ACTIVE</span>;
      case 'COMPLETED':
        return <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-full uppercase"><CheckCircle2 className="h-3 w-3" /> COMPLETED</span>;
      default:
        return <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full uppercase"><XCircle className="h-3 w-3" /> REJECTED</span>;
    }
  };

  if (isFetching) {
    return <div className="text-zinc-500 text-sm animate-pulse">Loading all platform rental contracts...</div>;
  }

  return (
    <div className="space-y-6 select-none">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Content Moderation: All Rentals</h1>
        <p className="text-zinc-500 text-sm mt-1">Monitor and inspect all landlord-tenant rental contracts across the platform</p>
      </div>

      {rentals.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md shadow-xl"
        >
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-950/60 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <th className="py-4 px-6">Property Space</th>
                <th className="py-4 px-6">Tenant</th>
                <th className="py-4 px-6">Rental Period</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60">
              {rentals.map((rental) => (
                <tr key={rental.id} className="hover:bg-zinc-900/10 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white truncate max-w-[200px]" title={rental.property?.title}>
                      {rental.property?.title}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-500 mt-0.5">
                      <MapPin className="h-3 w-3 text-indigo-500" />
                      {rental.property?.location}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-zinc-300">{rental.tenant?.name}</div>
                    <div className="text-xs text-zinc-500">{rental.tenant?.email}</div>
                  </td>
                  <td className="py-4 px-6 text-zinc-400 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-zinc-600" />
                      <span>{new Date(rental.startDate).toLocaleDateString()}</span>
                      <span className="text-zinc-600 px-1">-</span>
                      <span>{new Date(rental.endDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-white">
                    ${rental.property?.price.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="inline-block">{getStatusBadge(rental.status)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className="p-8 rounded-2xl border border-dashed border-zinc-900 text-center text-zinc-600 text-sm">
          No rental contracts recorded on the platform yet.
        </div>
      )}
    </div>
  );
}