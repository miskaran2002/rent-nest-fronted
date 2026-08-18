'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Plus, Trash2, Edit2, MapPin, DollarSign, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuthStore } from '../../../../store/useAuthStore';
import AddPropertyModal from '../../_components/AddPropertyModal';
import { PropertyService } from '@/service/property.service';

export default function MyPropertiesPage() {
  const { user } = useAuthStore();
  const [properties, setProperties] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // মডাল এবং এডিটিং স্টেটস
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);

  const fetchMyProperties = async () => {
    setIsFetching(true);
    try {
      const response = await PropertyService.getProperties();
      if (response.success && user) {
        // ডাইনামিক ফিল্টারিং: শুধুমাত্র এই ল্যান্ডলর্ডের প্রপার্টিগুলো ফিল্টার করা
        const myProperties = response.data.filter((p: any) => p.landlordId === user.userId);
        setProperties(myProperties);
      }
    } catch (error) {
      toast.error('Failed to load properties');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (user) fetchMyProperties();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property listing?')) return;

    try {
      const response = await PropertyService.deleteProperty(id);
      if (response.success) {
        toast.success('Property deleted successfully!');
        fetchMyProperties();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete property');
    }
  };

  const handleEditClick = (property: any) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  if (isFetching) {
    return <div className="text-zinc-500 text-sm animate-pulse">Loading listed properties...</div>;
  }

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Properties</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage, edit, and remove your rental property listings</p>
        </div>

        <button
          onClick={() => {
            setEditingProperty(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-1.5 py-2 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </button>
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/30 border border-zinc-900 rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-44 bg-zinc-950">
                <img
                  src={property.images[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-indigo-600 border border-indigo-500 text-[10px] font-bold text-white uppercase">
                  {property.category?.name}
                </span>
                
                {/* Availability Badge */}
                <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                  property.status === 'AVAILABLE' 
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                    : 'text-zinc-400 bg-zinc-900 border-zinc-800'
                }`}>
                  {property.status}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white truncate">{property.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <MapPin className="h-4 w-4 text-indigo-500" />
                    {property.location}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-900/60">
                  <div className="flex items-center text-sm font-bold text-white">
                    <DollarSign className="h-4 w-4 text-indigo-500" />
                    {property.price.toLocaleString()} / mo
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(property)}
                      className="p-2 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer"
                      title="Edit Listing"
                    >
                      <Edit2 className="h-4 w-4 text-indigo-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="p-2 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 text-red-400 hover:text-red-300 rounded-xl transition-all cursor-pointer"
                      title="Delete Listing"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl border border-dashed border-zinc-900 text-center text-zinc-600 text-sm">
          You haven&apos;t listed any properties yet.
        </div>
      )}

      {/* পপ-আপ মডাল */}
      <AddPropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchMyProperties}
        editingProperty={editingProperty}
      />
    </div>
  );
}