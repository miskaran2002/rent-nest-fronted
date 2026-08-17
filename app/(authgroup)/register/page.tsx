'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import axiosInstance from '../../../lib/axios';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'TENANT' | 'LANDLORD'>('TENANT');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/api/auth/register', {
        name,
        email,
        password,
        role,
      });

      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        router.push('/login');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Get started with RentNest by setting up your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Full Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.1 }}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
          />
        </div>

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
            placeholder="Minimum 6 characters"
            className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Select Your Role
          </label>
          <motion.select
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.1 }}
            value={role}
            onChange={(e) => setRole(e.target.value as 'TENANT' | 'LANDLORD')}
            className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
          >
            <option value="TENANT" className="bg-zinc-900 text-white">
              Tenant (Looking for property)
            </option>
            <option value="LANDLORD" className="bg-zinc-900 text-white">
              Landlord (I want to rent my property)
            </option>
          </motion.select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-indigo-500 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </motion.button>
      </form>

      <div className="text-center text-sm text-zinc-400 mt-4">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
        >
          Sign In here
        </Link>
      </div>
    </div>
  );
}