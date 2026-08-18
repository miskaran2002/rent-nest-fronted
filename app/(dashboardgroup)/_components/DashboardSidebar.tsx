'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../../../store/useAuthStore';
import { 
  LayoutDashboard, 
  User, 
  Building, 
  ClipboardList, 
  CreditCard, 
  Users, 
  Layers, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardSidebar() {
  const { user, clearAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  // ১. রোল অনুযায়ী সাইডবার মেনু ডিফাইন করা (অ্যাসাইনমেন্টের ডাইনামিক মেনু রিকোয়ারমেন্ট)
  const getSidebarMenus = () => {
    if (!user) return [];

    if (user.role === 'ADMIN') {
      return [
        { name: 'Overview', path: '/admin-dashboard', icon: LayoutDashboard },
        { name: 'Manage Users', path: '/admin-dashboard/users', icon: Users },
        { name: 'Manage Categories', path: '/admin-dashboard/categories', icon: Layers },
        { name: 'All Rentals', path: '/admin-dashboard/rentals', icon: ClipboardList },
        { name: 'Profile Settings', path: '/admin-dashboard/profile', icon: User },
        
      ];
    }

    if (user.role === 'LANDLORD') {
      return [
        { name: 'Overview', path: '/landlord-dashboard', icon: LayoutDashboard },
        { name: 'My Properties', path: '/landlord-dashboard/my-properties', icon: Building },
        { name: 'Rental Requests', path: '/landlord-dashboard/rental-requests', icon: ClipboardList },
        { name: 'Profile Settings', path: '/landlord-dashboard/profile', icon: User }
      ];
    }

    // Default: TENANT
    return [
      { name: 'Profile Settings', path: '/tenant-dashboard', icon: User },
      { name: 'My Rental Requests', path: '/tenant-dashboard/my-rentals', icon: ClipboardList },
      { name: 'Payment History', path: '/tenant-dashboard/my-payments', icon: CreditCard },
    ];
  };

  const menus = getSidebarMenus();

  return (
    <aside className="w-full lg:w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between p-6 select-none min-h-screen">
      
      <div className="space-y-8">
        {/* সাইডবার লোগো */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Building className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold tracking-tight text-white">
              RentNest<span className="text-indigo-500">.</span>
            </span>
          </Link>
          <div className="mt-1 text-xs text-indigo-400 font-semibold uppercase tracking-wider pl-8">
            {user?.role} Portal
          </div>
        </div>

        {/* ডাইনামিক মেনু তালিকা */}
        <nav className="space-y-1">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = isActive(menu.path);
            return (
              <Link key={menu.path} href={menu.path}>
                <div
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    active 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4.5 w-4.5 ${active ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`} />
                    {menu.name}
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${active ? 'opacity-100 transform translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* নিচের অংশ: ইউজার প্রোফাইল ও লগআউট বাটন */}
      <div className="border-t border-zinc-900 pt-6 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold uppercase text-sm">
            {user?.email[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-zinc-500 truncate">Logged in as</p>
            <p className="text-sm font-semibold text-zinc-200 truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5" />
          Logout Portal
        </button>
      </div>

    </aside>
  );
}