import React from 'react';
import DashboardSidebar from './_components/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-950 text-white">
      
      {/* বাম পাশে ডায়নামিক সাইডবার */}
      <DashboardSidebar />

      {/* ডান পাশে মূল কন্টেন্ট প্যানেল যা স্ক্রোল করবে */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-h-screen bg-zinc-950">
        <div className="max-w-5xl mx-auto space-y-6">
          {children}
        </div>
      </main>

    </div>
  );
}