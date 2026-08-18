'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, CreditCard, MessageSquare, Clock, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import ReviewDialog from '../../_components/ReviewDialog';
import { RentalService } from '@/service/rental.service';
import { PaymentService } from '@/service/payment.service';


export default function MyRentalsPage() {
  const [rentals, setMyRentals] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const fetchRentals = async () => {
    try {
      const response = await RentalService.getMyRentals();
      if (response.success) {
        setMyRentals(response.data);
      }
    } catch (error) {
      toast.error('Failed to load rental requests');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handlePayment = async (rentalRequestId: string) => {
    const loadingToast = toast.loading('Connecting to Stripe secure checkout...');
    try {
      const response = await PaymentService.createPaymentSession(rentalRequestId);
      if (response.success && response.data.checkoutUrl) {
        toast.dismiss(loadingToast);
        window.location.href = response.data.checkoutUrl;
      }
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || 'Payment integration failed');
    }
  };

  // ⚠️ অ্যাসাইনমেন্টের রিকোয়ারমেন্ট অনুযায়ী ডাইনামিক ইউআই ব্যাজ কালার কনফিগারেশন
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        // PENDING ➔ Yellow/Orange Badge
        return <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase"><Clock className="h-3.5 w-3.5" /> PENDING</span>;
      case 'APPROVED':
        // APPROVED ➔ Blue Badge
        return <span className="flex items-center gap-1 text-[11px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full uppercase"><CheckCircle2 className="h-3.5 w-3.5" /> APPROVED</span>;
      case 'REJECTED':
      case 'CANCELLED':
        // REJECTED ➔ Red Badge
        return <span className="flex items-center gap-1 text-[11px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full uppercase"><XCircle className="h-3.5 w-3.5" /> REJECTED</span>;
      case 'ACTIVE':
        // ACTIVE ➔ Green Badge
        return <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase"><CheckCircle2 className="h-3.5 w-3.5" /> ACTIVE</span>;
      case 'COMPLETED':
        // COMPLETED ➔ Gray Badge
        return <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full uppercase"><CheckCircle2 className="h-3.5 w-3.5" /> COMPLETED</span>;
      default:
        return <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded-full uppercase">{status}</span>;
    }
  };

  if (isFetching) {
    return <div className="text-zinc-500 text-sm animate-pulse">Loading rental request history...</div>;
  }

  return (
    <div className="space-y-6 select-none">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">My Rental Requests</h1>
        <p className="text-zinc-500 text-sm mt-1">Track status, process secure payments, and manage active contracts</p>
      </div>

      {rentals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rentals.map((rental) => (
            <motion.div
              key={rental.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/30 backdrop-blur-md border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-bold text-white line-clamp-1">{rental.property.title}</h3>
                  {getStatusBadge(rental.status)}
                </div>

                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                  {rental.property.location}
                </div>

                <div className="grid grid-cols-2 gap-4 py-2 border-y border-zinc-900/60 text-xs text-zinc-400">
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-zinc-500 mb-0.5">Move-in</span>
                    {new Date(rental.startDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-zinc-500 mb-0.5">Move-out</span>
                    {new Date(rental.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center text-sm font-bold text-white">
                  <DollarSign className="h-4 w-4 text-indigo-500" />
                  {rental.property.price.toLocaleString()} / mo
                </div>

                {/* APPROVED স্ট্যাটাস থাকলে "Pay Now" বাটন আসবে */}
                {rental.status === 'APPROVED' && (
                  <button
                    onClick={() => handlePayment(rental.id)}
                    className="flex items-center gap-1.5 py-1.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
                  >
                    <CreditCard className="h-4 w-4" />
                    Pay Now
                  </button>
                )}

                {/* ACTIVE স্ট্যাটাস থাকলে "Leave Review" বাটন আসবে */}
                {rental.status === 'ACTIVE' && (
                  <button
                    onClick={() => setSelectedPropertyId(rental.propertyId)}
                    className="flex items-center gap-1.5 py-1.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Leave Review
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl border border-dashed border-zinc-900 text-center text-zinc-600 text-sm">
          You haven&apos;t submitted any rental requests yet.
        </div>
      )}

      {selectedPropertyId && (
        <ReviewDialog
          isOpen={!!selectedPropertyId}
          onClose={() => {
            setSelectedPropertyId(null);
            fetchRentals();
          }}
          propertyId={selectedPropertyId}
        />
      )}
    </div>
  );
}