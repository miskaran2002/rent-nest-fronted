'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import axiosInstance from '../../../lib/axios';
import { useAuthStore } from '../../../store/useAuthStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const { accessToken, user } = response.data.data;
        setAuth(accessToken);

        toast.success(`Welcome back, ${user.name}!`);

        if (user.role === 'ADMIN') {
          router.push('/admin-dashboard');
        } else if (user.role === 'LANDLORD') {
          router.push('/landlord-dashboard');
        } else {
          router.push('/tenant-dashboard');
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Invalid email or password';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Sign In
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Enter your credentials to access your RentNest account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Email Address
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.1 }}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Password
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.1 }}
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-indigo-500 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </motion.button>
      </form>

      <div className="text-center text-sm text-zinc-400 mt-4">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
        >
          Register here
        </Link>
      </div>
    </div>
  );
}