'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Building, Sparkles, ArrowRight } from 'lucide-react';

type TPropertyCardProps = {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
    amenities: string[];
    category: { name: string };
  };
};

export default function PropertyCard({ property }: TPropertyCardProps) {
  const { id, title, location, price, images, amenities, category } = property;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col bg-zinc-900/30 backdrop-blur-md border border-zinc-900 hover:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl"
    >
      {/* প্রপার্টি ইমেজ সেকশন */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
        <img
          src={images[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* ক্যাটাগরি ব্যাজ ওভারলে */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-zinc-800 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
          <Sparkles className="h-3 w-3" />
          {category?.name}
        </div>
        {/* প্রাইস ওভারলে */}
        <div className="absolute bottom-3 right-3 flex items-center gap-0.5 px-2.5 py-1 rounded-lg bg-indigo-600 border border-indigo-500 text-xs font-bold text-white shadow-lg">
          <DollarSign className="h-3.5 w-3.5" />
          {price.toLocaleString()} / mo
        </div>
      </div>

      {/* প্রপার্টি ডেসক্রিপশন সেকশন */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <MapPin className="h-3.5 w-3.5 text-zinc-600 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* এমেনিটিজ ব্যাজেস */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {amenities.slice(0, 3).map((amenity, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium text-zinc-400 bg-zinc-900 border border-zinc-800/60 px-2 py-0.5 rounded-md"
            >
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="text-[10px] font-bold text-zinc-600 bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded-md">
              +{amenities.length - 3} more
            </span>
          )}
        </div>

        {/* অ্যাকশন বাটন */}
        <div className="pt-2 border-t border-zinc-900/60">
          <Link href={`/properties/${id}`} className="block">
            <button className="w-full py-2 px-4 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              View Details
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}