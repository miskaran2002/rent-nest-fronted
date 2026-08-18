'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { User, Mail, Shield, Save, Loader2 } from 'lucide-react';
import axiosInstance from '../../../../lib/axios';
import { UserService } from '@/service/user.service';


type TUserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
};

export default function LandlordProfileSettings() {
  const [profile, setProfile] = useState<TUserProfile | null>(null);
  const [name, setName] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/me');
        if (response.data.success) {
          setProfile(response.data.data);
          setName(response.data.data.name);
        }
      } catch (error: any) {
        toast.error('Failed to load profile details');
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Name cannot be empty');

    setIsUpdating(true);
    try {
      const response = await UserService.updateMyProfile(name);
      if (response.success) {
        setProfile(response.data);
        toast.success('Profile updated successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isFetching) {
    return (
      <div className="space-y-6 animate-pulse select-none">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
          <div className="h-4 w-80 bg-zinc-900 rounded-lg" />
        </div>
        <div className="max-w-2xl bg-zinc-900/40 border border-zinc-900 p-8 rounded-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-zinc-800" />
            <div className="space-y-2">
              <div className="h-5 w-32 bg-zinc-800 rounded-md" />
              <div className="h-4 w-48 bg-zinc-900 rounded-md" />
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="h-10 bg-zinc-900 rounded-lg" />
            <div className="h-10 bg-zinc-900 rounded-lg" />
            <div className="h-10 bg-zinc-800 rounded-lg w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 select-none"
    >
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Profile Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage your RentNest landlord account profile and security settings
        </p>
      </div>

      <div className="max-w-2xl bg-zinc-900/30 backdrop-blur-md border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-extrabold text-2xl uppercase">
            {profile?.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{profile?.name}</h2>
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-semibold uppercase tracking-wider mt-0.5">
              <Shield className="h-3.5 w-3.5" />
              {profile?.role} ACCOUNT
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-5 pt-6 border-t border-zinc-900">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Email Address (Cannot be changed)
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                disabled
                value={profile?.email}
                className="w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/40 text-zinc-500 text-sm cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isUpdating}
            className="flex items-center justify-center gap-2 px-6 py-2 border border-transparent rounded-lg text-sm font-bold text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-indigo-500 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </motion.button>
        </form>

      </div>
    </motion.div>
  );
}