'use client';

import React from 'react';
import { useProperty } from '@/hooks/useProperties';
import { PropertyGallery } from '@/components/properties/PropertyGallery';
import { ReviewList } from '@/components/properties/ReviewList';
import { BookingForm } from '@/components/booking/BookingForm';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { AlertCircle, MapPin, Users, Bed, Bath, Wifi } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PropertyPage({ params }: { params: { id: string } }) {
  const { data: property, isLoading, error } = useProperty(params.id);
  const router = useRouter();

  const handleBooking = async (data: any) => {
    try {
      toast.success('Booking successful!');
      router.push(`/booking/${params.id}`);
    } catch (err) {
      toast.error('Failed to create booking');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-error/10 border border-error rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="text-error flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                Property Not Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                The property you're looking for doesn't exist or has been removed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Property Title */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {property.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              {property.address}
            </div>
            <div className="text-sm">
              ⭐ {property.rating.toFixed(1)} ({property.reviewCount} reviews)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Property Details */}
            <div className="card bg-white dark:bg-gray-800 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About This Place
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities Grid */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities?.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <Wifi size={18} className="text-brand-primary flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Info Grid */}
              <div className="grid grid-cols-4 gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <Users size={24} className="text-brand-primary mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Guests</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {property.maxGuests}
                  </p>
                </div>
                <div className="text-center">
                  <Bed size={24} className="text-brand-secondary mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {property.bedrooms}
                  </p>
                </div>
                <div className="text-center">
                  <Bath size={24} className="text-brand-accent mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {property.bathrooms}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mx-auto mb-2">💰</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                  <p className="text-lg font-semibold text-brand-primary">
                    ${property.pricePerNight}
                  </p>
                </div>
              </div>

              {/* Host Info */}
              {property.host && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Hosted by
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{property.host.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {property.host.email}
                  </p>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="card bg-white dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Reviews
              </h2>
              <ReviewList reviews={property.reviews} />
            </div>
          </div>

          {/* Sidebar - Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm property={property} onSubmit={handleBooking} />
          </div>
        </div>
      </div>
    </div>
  );
}
