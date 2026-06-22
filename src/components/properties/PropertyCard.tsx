'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types';
import { Star, MapPin, Users, Bed, Bath } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const image = property.images?.[0] || 'https://via.placeholder.com/400x300';

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="card group cursor-pointer overflow-hidden hover:shadow-xl transition-shadow">
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden rounded-lg mb-4 bg-gray-200 dark:bg-gray-700">
          <Image
            src={image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
          />
          {!property.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Not Available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Title and Location */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
              {property.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
              <MapPin size={14} />
              {property.address}
            </p>
          </div>

          {/* Property Features */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Users size={16} />
              {property.maxGuests} guests
            </div>
            <div className="flex items-center gap-1">
              <Bed size={16} />
              {property.bedrooms} beds
            </div>
            <div className="flex items-center gap-1">
              <Bath size={16} />
              {property.bathrooms} baths
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-brand-primary text-brand-primary" />
              <span className="font-semibold text-gray-900 dark:text-white">
                {property.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({property.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between pt-2">
            <div>
              <p className="text-2xl font-bold text-brand-primary">
                ${property.pricePerNight}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">per night</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
