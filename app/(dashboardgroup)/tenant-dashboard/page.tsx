'use client';

import React from 'react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function TenantDashboardIndex() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold tracking-tight">Tenant Settings</h1>
      <p className="text-zinc-400">
        Welcome, <span className="text-white font-semibold">{user?.email}</span>. Manage your tenant profile settings, update your name, and track your active rental applications.
      </p>
    </div>
  );
}