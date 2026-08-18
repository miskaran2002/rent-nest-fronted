'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldAlert, ShieldCheck, Users, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminService } from '@/service/admin.service';


export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // ইউজার সার্চ ফিল্টার স্টেট

  const fetchUsers = async () => {
    try {
      const response = await AdminService.getAdminUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBan = async (id: string, currentBanStatus: boolean) => {
    setUpdatingId(id);
    const newBanStatus = !currentBanStatus;
    const loadingToast = toast.loading(newBanStatus ? 'Banning user account...' : 'Unbanning user account...');

    try {
      const response = await AdminService.toggleUserBanStatus(id, newBanStatus);
      if (response.success) {
        toast.dismiss(loadingToast);
        toast.success(newBanStatus ? 'User account banned successfully' : 'User account unbanned successfully');
        fetchUsers();
      }
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || 'Failed to update user status');
    } finally {
      setUpdatingId(null);
    }
  };

  // রিকোয়ারমেন্ট অনুযায়ী ক্লায়েন্ট সাইড সার্চ ফিল্টারিং লজিক (ইমেইল বা নাম দিয়ে সার্চ করা)
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isFetching) {
    return <div className="text-zinc-500 text-sm animate-pulse">Loading platform users...</div>;
  }

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Manage Users</h1>
          <p className="text-zinc-500 text-sm mt-1">Review, ban, or suspend platform landlord and tenant accounts</p>
        </div>

        {/* সার্চ বার ইনপুট */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-zinc-900 rounded-xl bg-zinc-900/30 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
          />
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md shadow-xl"
        >
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-950/60 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60">
              {filteredUsers.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-900/10 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">{item.name}</td>
                  <td className="py-4 px-6 text-zinc-400">{item.email}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                      item.role === 'ADMIN'
                        ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20'
                        : item.role === 'LANDLORD'
                        ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20'
                        : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                    }`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {item.isBanned ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full uppercase">
                        <ShieldAlert className="h-3 w-3" /> Suspended
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase">
                        <ShieldCheck className="h-3 w-3" /> Active
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {item.role !== 'ADMIN' && (
                      <button
                        disabled={updatingId !== null}
                        onClick={() => handleToggleBan(item.id, item.isBanned)}
                        className={`py-1.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          item.isBanned
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/10'
                            : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/10'
                        }`}
                      >
                        {item.isBanned ? 'Unban User' : 'Ban User'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className="p-8 rounded-2xl border border-dashed border-zinc-900 text-center text-zinc-600 text-sm">
          No user accounts found matching your search.
        </div>
      )}
    </div>
  );
}