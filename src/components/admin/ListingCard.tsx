'use client';

import React from 'react';
import { Property } from '@/types';
import { Check, X, Eye, Trash2 } from 'lucide-react';

interface ListingCardProps {
  listing: Property;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onApprove?: (id: string) => Promise<void>;
  onReject?: (id: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  isExpanded,
  onToggleExpand,
  onApprove,
  onReject,
  onDelete,
  isLoading = false,
}) => {
  return (
    <div className="card bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {listing.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {listing.address}
          </p>
          <div className="flex gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
            <span>${listing.pricePerNight}/night</span>
            <span>{listing.bedrooms} beds • {listing.bathrooms} baths</span>
            <span>Max {listing.maxGuests} guests</span>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100">
            Pending Review
          </div>
        </div>
      </div>

      {/* Description Preview */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
        {listing.description}
      </p>

      {/* Amenities */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
          Amenities
        </p>
        <div className="flex flex-wrap gap-2">
          {listing.amenities?.slice(0, 5).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >
              {amenity}
            </span>
          ))}
          {listing.amenities && listing.amenities.length > 5 && (
            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
              +{listing.amenities.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Images Preview */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
          Images ({listing.images?.length || 0})
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {listing.images?.slice(0, 4).map((img, idx) => (
            <div
              key={idx}
              className="w-full h-20 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden"
            >
              <img
                src={img}
                alt={`Preview ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onApprove?.(listing.id)}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Check size={18} />
          Approve
        </button>
        <button
          onClick={() => onReject?.(listing.id)}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-warning text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <X size={18} />
          Reject
        </button>
        <button
          onClick={() => onDelete?.(listing.id)}
          disabled={isLoading}
          className="px-4 py-2 bg-error text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Trash2 size={18} />
        </button>
        <button
          onClick={onToggleExpand}
          className={`px-4 py-2 rounded-lg hover:bg-opacity-90 transition ${
            isExpanded
              ? 'bg-gray-500 text-white'
              : 'bg-info text-white'
          }`}
        >
          <Eye size={18} />
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2 text-sm">
          <p>
            <strong>Host ID:</strong> {listing.hostId}
          </p>
          <p>
            <strong>Created:</strong> {new Date(listing.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Available:</strong> {listing.available ? 'Yes' : 'No'}
          </p>
          <p className="max-h-20 overflow-y-auto">
            <strong>Full Description:</strong> {listing.description}
          </p>
        </div>
      )}
    </div>
  );
};
