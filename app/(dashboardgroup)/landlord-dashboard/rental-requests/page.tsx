'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock, MapPin, Calendar, Mail, User, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../lib/axios';

export default function RentalRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      const response = await axiosInstance.get('/api/rentals');
      // ⚠️ response.success পরিবর্তন করে response.data.success করা হয়েছে
      if (response.data.success) {
        setRequests(response.data.data); // response.data পরিবর্তন করে response.data.data করা হয়েছে
      }
    } catch (error) {
      toast.error('Failed to load rental requests');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

 const handleUpdateStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    setUpdatingId(id);
    const loadingToast = toast.loading(`Processing request: ${status}...`);
    try {
      const response = await axiosInstance.patch(`/api/rentals/${id}/status`, { status });
      // ⚠️ response.success পরিবর্তন করে response.data.success করা হয়েছে
      if (response.data.success) {
        toast.dismiss(loadingToast);
        toast.success(`Rental request successfully ${status}!`);
        fetchRequests(); 
      }
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setUpdatingId(null);
    }
  };

  if (isFetching) {
    return <div className="text-zinc-500 text-sm animate-pulse">Loading tenant rental requests...</div>;
  }

  return (
    <div className="space-y-6 select-none">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Incoming Rental Requests</h1>
        <p className="text-zinc-500 text-sm mt-1">Review tenant applications and approve or reject rental requests</p>
      </div>

      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/30 border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white line-clamp-1">{request.property.title}</h3>
                  <span className={`text-[10px] font-bold border px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                    request.status === 'PENDING'
                      ? 'text-amber-500 bg-amber-500/10 border-amber-500/20'
                      : request.status === 'APPROVED' || request.status === 'ACTIVE'
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                      : 'text-red-400 bg-red-500/10 border-red-500/20'
                  }`}>
                    <Clock className="h-3 w-3" />
                    {request.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                  {request.property.location}
                </div>

                {/* Tenant Info */}
                <div className="p-3 bg-zinc-950/30 border border-zinc-900/60 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                    <User className="h-3.5 w-3.5 text-zinc-500" />
                    {request.tenant.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 pl-5.5">
                    {request.tenant.email}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 py-2 border-t border-zinc-900/60 text-xs text-zinc-400">
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-zinc-500 mb-0.5">Start Date</span>
                    {new Date(request.startDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-zinc-500 mb-0.5">End Date</span>
                    {new Date(request.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* অ্যাকশন বাটনসমূহ (PENDING অবস্থায় থাকলে Approve / Reject বাটন আসবে) */}
              {request.status === 'PENDING' && (
                <div className="flex gap-3 pt-2 border-t border-zinc-900/60">
                  <button
                    disabled={updatingId !== null}
                    onClick={() => handleUpdateStatus(request.id, 'REJECTED')}
                    className="w-1/2 py-2 px-4 border border-red-900/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </button>
                  <button
                    disabled={updatingId !== null}
                    onClick={() => handleUpdateStatus(request.id, 'APPROVED')}
                    className="w-1/2 py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-lg shadow-emerald-600/10"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl border border-dashed border-zinc-900 text-center text-zinc-600 text-sm">
          No rental requests received for your properties yet.
        </div>
      )}
    </div>
  );
}