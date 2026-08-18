'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Loader2, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { ReviewService } from '@/service/review.service';


type TReviewDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
};

export default function ReviewDialog({ isOpen, onClose, propertyId }: TReviewDialogProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error('Comment is required');

    setIsSubmitting(true);
    try {
      const response = await ReviewService.createReview({
        propertyId,
        rating,
        comment,
      });

      if (response.success) {
        toast.success('Review submitted successfully!');
        setComment('');
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-sm bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl space-y-6"
          >
            <div className="text-center space-y-1.5">
              <MessageSquare className="h-6 w-6 text-indigo-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Leave a Review</h3>
              <p className="text-xs text-zinc-500">Share your experience living in this property</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ইন্টারেক্টিভ ৫-স্টার রেটিং */}
              <div className="flex items-center justify-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    className="text-zinc-600 hover:text-amber-500 transition-colors cursor-pointer focus:outline-none"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        star <= (hoveredStar ?? rating) ? 'text-amber-500 fill-current' : 'text-zinc-700'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Your Comment
                </label>
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you liked or disliked about this space..."
                  rows={3}
                  className="w-full px-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950/60 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2 px-4 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/10"
                >
                  {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Submit Review'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}