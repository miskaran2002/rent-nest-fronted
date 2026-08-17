'use client';

import React from 'react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function AdminDashboardIndex() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold tracking-tight">Admin Overview</h1>
      <p className="text-zinc-400">
        Welcome, <span className="text-white font-semibold">{user?.email}</span>. Manage platform operations, moderate active user accounts, approve categories, and track platform earnings.
      </p>
    </div>
  );
}