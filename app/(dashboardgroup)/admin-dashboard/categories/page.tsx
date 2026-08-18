'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Plus, Trash2, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../lib/axios';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load categories');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Category name is required');

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/api/categories', { name, description });
      if (response.data.success) {
        toast.success('Category created successfully!');
        setName('');
        setDescription('');
        fetchCategories(); // রি-লোডিং তালিকা সিঙ্ক
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await axiosInstance.delete(`/api/categories/${id}`);
      if (response.data.success) {
        toast.success('Category deleted successfully!');
        fetchCategories();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  if (isFetching) {
    return <div className="text-zinc-500 text-sm animate-pulse">Loading system categories...</div>;
  }

  return (
    <div className="space-y-6 select-none">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Manage Categories</h1>
        <p className="text-zinc-500 text-sm mt-1">Create, view, and manage property marketplace categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* বাম কলাম: নতুন ক্যাটাগরি তৈরির ফর্ম */}
        <div className="lg:col-span-1 p-6 bg-zinc-900/30 backdrop-blur-md border border-zinc-900 rounded-2xl space-y-4 h-fit">
          <h3 className="text-base font-bold text-white flex items-center gap-1.5"><Plus className="h-4.5 w-4.5 text-indigo-400" /> Create Category</h3>
          
          <form onSubmit={handleCreateCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Category Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Penthouse, Resort"
                className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description..."
                rows={3}
                className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/10"
            >
              {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Add Category'}
            </button>
          </form>
        </div>

        {/* ডান কলাম: ক্যাটাগরি তালিকা টেবিল */}
        <div className="lg:col-span-2 space-y-4">
          {categories.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-x-auto rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md shadow-xl"
            >
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-zinc-900 bg-zinc-950/60 text-xs font-bold uppercase tracking-wider text-zinc-500">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Description</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/60">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-zinc-900/10 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">{cat.name}</td>
                      <td className="py-4 px-6 text-zinc-400 text-xs max-w-[200px] truncate" title={cat.description || ''}>
                        {cat.description || 'N/A'}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-1.5 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 text-red-400 hover:text-red-300 rounded-xl transition-all cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <div className="p-8 rounded-2xl border border-dashed border-zinc-900 text-center text-zinc-600 text-sm">
              No categories configured on the platform yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}