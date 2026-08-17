'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, DollarSign, Calendar, User, Star, CheckCircle, MessageSquare, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';
import axiosInstance from '@/lib/axios';


export default function PropertyDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();

  const [property, setProperty] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsUpdating] = useState(false);

  // বুকিং মডাল স্টেট ও ইনপুটস
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // ১. প্রপার্টি আইডি দিয়ে ডাটা লোড করা (GET /api/properties/:id)
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/properties/${id}`);
        if (response.data.success) {
          setProperty(response.data.data);
        }
      } catch (error: any) {
        toast.error('Failed to load property details');
        router.push('/properties');
      } finally {
        setIsFetching(false);
      }
    };

    fetchPropertyDetails();
  }, [id, router]);

  // ২. বুকিং রিকোয়েস্ট সাবমিট হ্যান্ডলার (POST /api/rentals)
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return toast.error('Both dates are required');

    setIsUpdating(true);
    try {
      const response = await axiosInstance.post('/api/rentals', {
        propertyId: id,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      });

      if (response.data.success) {
        toast.success('Rental request submitted successfully! Wait for Landlord approval.');
        setIsModalOpen(false);
        router.push('/tenant-dashboard/my-rentals');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to submit rental request';
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
          <p className="text-zinc-500 text-sm">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white select-none pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ব্যাক বোতাম */}
        <button
          onClick={() => router.push('/properties')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </button>

        {/* ৩. ইমেজ গ্রিড প্যানেল */}
        <div className="relative h-96 w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-900">
          <img
            src={property?.images[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'}
            alt={property?.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="px-3 py-1 rounded-full bg-indigo-600 border border-indigo-500 text-xs font-bold text-white shadow-lg">
              {property?.category?.name}
            </span>
          </div>
        </div>

        {/* ৪. টাইটেল ও প্রাইস হেডার */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-zinc-900">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{property?.title}</h1>
            <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
              <MapPin className="h-4 w-4 text-indigo-500" />
              {property?.location}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Monthly Rent</span>
            <div className="flex items-center text-2xl font-black text-white">
              <DollarSign className="h-6 w-6 text-indigo-500" />
              {property?.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* ৫. বিবরণ ও সুযোগ-সুবিধাসমূহ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">About this space</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">{property?.description}</p>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">What this place offers</h2>
              <div className="grid grid-cols-2 gap-3">
                {property?.amenities.map((amenity: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-zinc-400 text-sm bg-zinc-900/40 border border-zinc-900 px-4 py-2.5 rounded-xl">
                    <CheckCircle className="h-4 w-4 text-indigo-500" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* বাড়িওয়ালার কার্ড এবং বুকিং বাটন */}
          <div className="space-y-6">
            <div className="p-6 bg-zinc-900/30 backdrop-blur-md border border-zinc-900 rounded-2xl space-y-4">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Listed by Landlord</h3>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold uppercase text-sm">
                  {property?.landlord?.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{property?.landlord?.name}</h4>
                  <p className="text-xs text-zinc-500">{property?.landlord?.email}</p>
                </div>
              </div>
            </div>

            {/* বুকিং রিকোয়েস্ট বাটন (শুধুমাত্র TENANT-দের জন্য কন্ডিশনাল রেন্ডার) */}
            {user?.role === 'TENANT' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-600/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Submit Rental Request
              </motion.button>
            )}
          </div>
        </div>

        {/* ৬. টেন্যান্ট রিভিউ প্যানেল (Reviews Section) */}
        <div className="pt-8 border-t border-zinc-900 space-y-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-white">Tenant Reviews ({property?.reviews?.length || 0})</h2>
          </div>

          {property?.reviews?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.reviews.map((review: any) => (
                <div key={review.id} className="p-5 rounded-2xl bg-zinc-900/20 border border-zinc-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold uppercase text-zinc-400">
                        {review.tenant?.name[0]}
                      </div>
                      <span className="text-sm font-bold text-white">{review.tenant?.name}</span>
                    </div>
                    {/* স্টার রেটিং */}
                    <div className="flex items-center gap-0.5 text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {review.rating}
                    </div>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed italic">&quot;{review.comment}&quot;</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-dashed border-zinc-900 text-center text-zinc-600 text-sm">
              No reviews have been posted for this space yet.
            </div>
          )}
        </div>

      </div>

      {/* ৭. অ্যানিমেটেড রেন্টাল রিকোয়েস্ট মডাল (Framer Motion Popup Modal) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* ব্যাকড্রপ শ্যাডো */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* মডাল কার্ড */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative z-10 w-full max-w-sm bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl space-y-6"
            >
              <div className="text-center space-y-1.5">
                <Sparkles className="h-6 w-6 text-indigo-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Select Rental Period</h3>
                <p className="text-xs text-zinc-500">Choose your start and end dates to submit request</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Start Date (Move-in)
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    End Date (Move-out)
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/2 py-2 px-4 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/10"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      'Request Rent'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}