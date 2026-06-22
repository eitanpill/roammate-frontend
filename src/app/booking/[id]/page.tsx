'use client';

import React, { useState } from 'react';
import { useProperty } from '@/hooks/useProperties';
import { useCreateBooking } from '@/hooks/useBookings';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingPage({ params }: { params: { id: string } }) {
  const { data: property, isLoading: propertyLoading } = useProperty(params.id);
  const { data: session } = useSession();
  const { mutate: createBooking, isPending } = useCreateBooking();
  const [bookingData, setBookingData] = useState<any>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  if (propertyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-error/10 border border-error rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="text-error flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                Property Not Found
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-info/10 border border-info rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="text-info flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                Please Sign In
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You need to be signed in to complete a booking.
              </p>
              <Link
                href="/auth/login"
                className="inline-block px-4 py-2 bg-info text-white rounded-lg hover:bg-opacity-90 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleConfirmBooking = () => {
    createBooking(
      {
        propertyId: property.id,
        userId: session.user.id || '',
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        numberOfGuests: bookingData.numberOfGuests,
        totalPrice: 1000, // This should be calculated
      },
      {
        onSuccess: () => {
          toast.success('Booking confirmed!');
          setIsConfirming(false);
        },
        onError: () => {
          toast.error('Failed to confirm booking');
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Confirm Your Booking
        </h1>

        {/* Booking Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          {/* Property Details */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {property.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{property.address}</p>
          </div>

          {/* Guest Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Guest Information
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Name:</strong> {session.user.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> {session.user.email}
              </p>
            </div>
          </div>

          {/* Booking Details Placeholder */}
          {bookingData && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Booking Details
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Check In:</strong> {bookingData.checkInDate}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Check Out:</strong> {bookingData.checkOutDate}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Guests:</strong> {bookingData.numberOfGuests}
                </p>
              </div>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Nightly rate</span>
              <span>${property.pricePerNight}</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Number of nights</span>
              <span>3</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Service fee</span>
              <span>${Math.round(property.pricePerNight * 3 * 0.1)}</span>
            </div>
            <div className="border-t border-brand-primary/30 pt-2 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${property.pricePerNight * 3 + Math.round(property.pricePerNight * 3 * 0.1)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href={`/properties/${property.id}`}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-center"
            >
              Back
            </Link>
            <button
              onClick={handleConfirmBooking}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isPending ? (
                <>
                  <LoadingSpinner size="sm" />
                  Processing...
                </>
              ) : (
                <>
                  <Check size={20} />
                  Confirm Booking
                </>
              )}
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            By confirming, you agree to our Terms & Conditions and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
