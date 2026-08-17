'use client';

import React from 'react';
import { motion } from 'framer-motion';

type TCategoryFilterProps = {
  categories: Array<{ id: string; name: string }>;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: TCategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none select-none">
      
      {/* "All" বাটন */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelectCategory('')}
        className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
          selectedCategory === ''
            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
            : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white'
        }`}
      >
        All Rentals
      </motion.button>

      {/* ক্যাটাগরি ট্যাগস */}
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border whitespace-nowrap ${
            selectedCategory === category.id
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
              : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          {category.name}
        </motion.button>
      ))}
      
    </div>
  );
}