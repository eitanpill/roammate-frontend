'use client';

import React from 'react';
import { Review } from '@/types';
import { Star, User } from 'lucide-react';

const formatDistanceToNow = (date: string | Date) => {
  const ms = new Date(date).getTime() - Date.now();
  const days = Math.floor(Math.abs(ms) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
};

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
        >
          {/* Review Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white font-semibold">
                <User size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {review.user?.name || 'Anonymous'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < review.rating
                      ? 'fill-brand-primary text-brand-primary'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Review Comment */}
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
};
