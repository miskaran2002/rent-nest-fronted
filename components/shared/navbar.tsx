'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import { Menu, X, Home, Building, LogOut, LayoutDashboard, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, clearAuth, initializeAuth, isLoading } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleLogout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    router.push('/');
    setIsOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin-dashboard';
    if (user.role === 'LANDLORD') return '/landlord-dashboard';
    return '/tenant-dashboard';
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/60 backdrop-blur-md border-b border-zinc-900 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* লোগো */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Building className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-bold tracking-tight text-white">
                RentNest<span className="text-indigo-500">.</span>
              </span>
            </Link>
          </div>

          {/* ডেস্কটপ মেনু */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isActive('/') ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/properties"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isActive('/properties') ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Building className="h-4 w-4" />
              Browse Properties
            </Link>

            {/* কন্ডিশনাল অথ বোতাম */}
            {!isLoading && user ? (
              <div className="flex items-center gap-4 border-l border-zinc-800 pl-6">
                <Link
                  href={getDashboardLink()}
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4 text-indigo-500" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-1 text-sm font-medium text-zinc-300">
                  <User className="h-4 w-4 text-zinc-500" />
                  <span className="max-w-[100px] truncate">{user.email.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              !isLoading && (
                <div className="flex items-center gap-4 border-l border-zinc-800 pl-6">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/10"
                  >
                    Register
                  </Link>
                </div>
              )
            )}
          </div>

          {/* মোবাইল হামবার্গার বাটন */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-900 px-4 pt-2 pb-4 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 py-2 text-base font-medium text-zinc-300 hover:text-white"
          >
            <Home className="h-5 w-5" /> Home
          </Link>
          <Link
            href="/properties"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 py-2 text-base font-medium text-zinc-300 hover:text-white"
          >
            <Building className="h-5 w-5" /> Browse Properties
          </Link>

          {!isLoading && user ? (
            <div className="border-t border-zinc-800 pt-3 space-y-3">
              <Link
                href={getDashboardLink()}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 py-2 text-base font-medium text-indigo-400 hover:text-indigo-300"
              >
                <LayoutDashboard className="h-5 w-5" /> Dashboard
              </Link>
              <div className="text-zinc-400 text-sm px-2">
                Logged in as: <span className="text-white font-medium">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 py-2 text-base font-medium text-red-400 hover:text-red-300 cursor-pointer"
              >
                <LogOut className="h-5 w-5" /> Logout
              </button>
            </div>
          ) : (
            !isLoading && (
              <div className="border-t border-zinc-800 pt-3 grid grid-cols-2 gap-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2 border border-zinc-800 rounded-lg text-sm font-medium text-zinc-300 hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium text-white shadow-lg"
                >
                  Register
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </nav>
  );
}