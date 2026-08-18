'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Sparkles, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../lib/axios';
import { PropertyService } from '@/service/property.service';


type TAddPropertyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingProperty?: any; // এডিট মোডের জন্য অপশনাল প্রপার্টি অবজেক্ট
};

export default function AddPropertyModal({ isOpen, onClose, onSuccess, editingProperty }: TAddPropertyModalProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [isFetchingCategories, setIsFetchingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ফর্ম ইনপুট স্টেটসমূহ
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [images, setImages] = useState('');
  const [amenityInput, setAmenityInput] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // মাউন্টে প্রিজমা ক্যাটাগরি ডাটা লোড করা
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/categories');
        if (response.data.success) {
          setCategories(response.data.data);
          if (response.data.data.length > 0 && !editingProperty) {
            setCategoryId(response.data.data[0].id);
          }
        }
      } catch (error) {
        toast.error('Failed to load categories');
      } finally {
        setIsFetchingCategories(false);
      }
    };

    if (isOpen) fetchCategories();
  }, [isOpen, editingProperty]);

  // এডিটিং ডাটা ফর্মের ভেতর প্রি-ফিলাপ করা
  useEffect(() => {
    if (editingProperty) {
      setTitle(editingProperty.title);
      setDescription(editingProperty.description);
      setLocation(editingProperty.location);
      setPrice(editingProperty.price);
      setImages(editingProperty.images[0] || '');
      setAmenityInput(editingProperty.amenities.join(', '));
      setCategoryId(editingProperty.categoryId);
    } else {
      setTitle('');
      setDescription('');
      setLocation('');
      setPrice(0);
      setImages('');
      setAmenityInput('');
    }
  }, [editingProperty, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location || !price || !categoryId) {
      return toast.error('Please fill in all required fields');
    }

    const payload = {
      title,
      description,
      location,
      price: Number(price),
      images: images ? [images] : [],
      amenities: amenityInput.split(',').map((item) => item.trim()).filter(Boolean),
      categoryId,
    };

    setIsSubmitting(true);
    try {
      let response;
      if (editingProperty) {
        response = await PropertyService.updateProperty(editingProperty.id, payload);
      } else {
        response = await PropertyService.createProperty(payload);
      }

      if (response.success) {
        toast.success(editingProperty ? 'Property updated successfully!' : 'Property listed successfully!');
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to list property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-lg bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
          >
            <div className="text-center space-y-1">
              <Sparkles className="h-6 w-6 text-indigo-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">{editingProperty ? 'Edit Property Details' : 'List New Property'}</h3>
              <p className="text-xs text-zinc-500">Provide details to attract premium tenants</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Property Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Luxury 3BHK Duplex in Gulshan"
                  className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a detailed description of your property space..."
                  rows={3}
                  className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Monthly Rent ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={price || ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Rent price"
                    className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Select Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    {isFetchingCategories ? (
                      <option>Loading categories...</option>
                    ) : (
                      categories.map((category) => (
                        <option key={category.id} value={category.id} className="bg-zinc-900 text-white">
                          {category.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Property Location Address
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Gulshan 2, Dhaka"
                  className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Amenities (Comma separated)
                </label>
                <input
                  type="text"
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  placeholder="e.g. WiFi, AC, Security, Parking"
                  className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
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
                    <>
                      {editingProperty ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      {editingProperty ? 'Save Changes' : 'List Property'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}