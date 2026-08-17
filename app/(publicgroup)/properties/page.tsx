'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, DollarSign, Filter, SlidersHorizontal, RefreshCw, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

import PropertySkeleton from '../_components/propertySkeleton';
import CategoryFilter from '../_components/categoryFilter';
import axiosInstance from '@/lib/axios';
import PropertyCard from '../_components/propertyCard';

export default function PropertiesBrowsePage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [isFetchingProperties, setIsFetchingProperties] = useState(true);
  const [isFetchingCategories, setIsFetchingCategories] = useState(true);

  // সার্চ ও ফিল্টারিং স্টেটসমূহ
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // ১. মাউন্ট হওয়ার সময় ক্যাটাগরি ডাটা লোড করা
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/categories');
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error: any) {
        toast.error('Failed to load categories');
      } finally {
        setIsFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // ২. ফিল্টার পরিবর্তনের সাথে সাথে ডায়নামিকালি প্রপার্টি লোড করার ফাংশন
  const fetchProperties = async () => {
    setIsFetchingProperties(true);
    try {
      const params: any = {};
      
      if (searchTerm.trim()) params.searchTerm = searchTerm;
      if (location.trim()) params.location = location;
      if (selectedCategory) params.categoryId = selectedCategory;
      if (minPrice.trim()) params.minPrice = minPrice;
      if (maxPrice.trim()) params.maxPrice = maxPrice;

      const response = await axiosInstance.get('/api/properties', { params });
      if (response.data.success) {
        setProperties(response.data.data);
      }
    } catch (error: any) {
      toast.error('Failed to load properties');
    } finally {
      setIsFetchingProperties(false);
    }
  };

  // স্টেট পরিবর্তন হলে এপিআই রি-ট্রিগার করার ইফেক্ট
  useEffect(() => {
    // ডেবোন্স বা ইনস্ট্যান্ট ট্রিগারের জন্য ক্যাটাগরি ও সার্চ ইফেক্ট সেটআপ
    const delayDebounceFn = setTimeout(() => {
      fetchProperties();
    }, 400); // ৩০০ মিলি-সেকেন্ড পর রিকোয়েস্ট পাঠাবে (Axios optimization)

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, location, selectedCategory, minPrice, maxPrice]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setLocation('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    toast.success('Filters reset successfully');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white select-none pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* টাইটেল হেডার */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Browse Rental Properties</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Discover verified luxury apartments, cozy studios, and spaces tailored to your needs.
          </p>
        </div>

        {/* সার্চ এবং মাস্টার ফিল্টার বার */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* সার্চ ইনপুট */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, location or keywords..."
                className="w-full pl-10 pr-4 py-2 border border-zinc-900 rounded-xl bg-zinc-900/30 backdrop-blur-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
              />
            </div>

            {/* অ্যাডভান্সড ফিল্টার বাটন */}
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="w-full sm:w-auto px-4 py-2 border border-zinc-900 rounded-xl bg-zinc-900/30 hover:bg-zinc-900 text-zinc-300 hover:text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
              {isFilterExpanded ? 'Hide Filters' : 'Advanced Filters'}
            </button>
          </div>

          {/* এক্সপ্যান্ডেবল অ্যাডভান্সড ফিল্টারস (বাজেট ও লোকেশন) */}
          <AnimatePresence>
            {isFilterExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md">
                  {/* লোকেশন ফিল্টার */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                      Specific Location
                    </label>
                    <div className="relative flex items-center">
                      <MapPin className="absolute left-3 h-4 w-4 text-zinc-500" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Banani, Gulshan..."
                        className="w-full pl-10 pr-3 py-1.5 border border-zinc-900 rounded-lg bg-zinc-950/40 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* সর্বনিম্ন বাজেট */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                      Min Price ($)
                    </label>
                    <div className="relative flex items-center">
                      <DollarSign className="absolute left-3 h-4 w-4 text-zinc-500" />
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min price"
                        className="w-full pl-10 pr-3 py-1.5 border border-zinc-900 rounded-lg bg-zinc-950/40 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* সর্বোচ্চ বাজেট ও রিসেট বোতাম */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                      Max Price ($)
                    </label>
                    <div className="relative flex items-center">
                      <DollarSign className="absolute left-3 h-4 w-4 text-zinc-500" />
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max price"
                        className="w-full pl-10 pr-3 py-1.5 border border-zinc-900 rounded-lg bg-zinc-950/40 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                
                {/* রিসেট বোতাম */}
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer px-3 py-1 rounded-md hover:bg-red-500/5"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reset All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ক্যাটাগরি ফিল্টার ট্যাগস */}
        {!isFetchingCategories && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {/* প্রপার্টি গ্রিড লিস্টিং */}
        {isFetchingProperties ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <PropertySkeleton key={idx} />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </motion.div>
        ) : (
          /* ডাটা না থাকলে এম্পটি স্টেট (Empty State UX Marks) */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-zinc-900 rounded-3xl bg-zinc-900/10 backdrop-blur-md"
          >
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-zinc-900 text-zinc-500">
              <Filter className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No properties found</h3>
              <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                There are no active rental listings matching your search or filters. Try adjusting them!
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}