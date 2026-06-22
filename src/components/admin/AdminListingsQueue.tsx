'use client';

import React, { useState } from 'react';
import { Property } from '@/types';
import { ListingCard } from './ListingCard';

interface AdminListingsQueueProps {
  listings: Property[];
  onApprove?: (id: string) => Promise<void>;
  onReject?: (id: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const AdminListingsQueue: React.FC<AdminListingsQueueProps> = ({
  listings,
  onApprove,
  onReject,
  onDelete,
  isLoading = false,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!listings || listings.length === 0) {
    return (
      <div className="card bg-white dark:bg-gray-800 text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">No listings to review</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          isExpanded={expandedId === listing.id}
          onToggleExpand={() =>
            setExpandedId(expandedId === listing.id ? null : listing.id)
          }
          onApprove={onApprove}
          onReject={onReject}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
