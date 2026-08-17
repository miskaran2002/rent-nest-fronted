'use client';

import React from 'react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function LandlordDashboardIndex() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold tracking-tight">Landlord Overview</h1>
      <p className="text-zinc-400">
        Welcome, <span className="text-white font-semibold">{user?.email}</span>. Oversee your listed properties, monitor incoming tenant requests, and review rental histories.
      </p>
    </div>
  );
}