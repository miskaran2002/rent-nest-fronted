import React from 'react';
import Navbar from '../../components/shared/navbar';
import Footer from '../../components/shared/footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
}