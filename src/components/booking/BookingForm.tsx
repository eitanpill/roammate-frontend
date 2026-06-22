'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Property } from '@/types';
import { Calendar, Users, CreditCard } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { FormDateInput, FormInput } from '@/components/ui/form';
import { bookingSchema, type BookingFormData } from '@/lib/schemas';

interface BookingFormProps {
  property: Property;
  onSubmit: (data: BookingFormData) => Promise<void>;
  isLoading?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  property,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const checkInDate = watch('checkInDate');
  const checkOutDate = watch('checkOutDate');
  const numberOfGuests = watch('numberOfGuests') || 1;

  // Calculate price
  let numberOfNights = 0;
  let totalPrice = 0;

  if (checkInDate && checkOutDate) {
    numberOfNights = Math.max(
      differenceInDays(new Date(checkOutDate), new Date(checkInDate)),
      0
    );
    totalPrice = numberOfNights * property.pricePerNight;
  }

  const handleFormSubmit = async (data: BookingFormData) => {
    await onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="card space-y-6 sticky top-24 bg-white dark:bg-gray-800"
    >
      <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
        <p className="text-3xl font-bold text-brand-primary">
          ${property.pricePerNight}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">per night</p>
      </div>

      {/* Dates */}
      <div className="space-y-4">
        <FormDateInput
          {...register('checkInDate')}
          label="Check In"
          icon={<Calendar size={16} />}
          error={errors.checkInDate}
        />
        <FormDateInput
          {...register('checkOutDate')}
          label="Check Out"
          icon={<Calendar size={16} />}
          error={errors.checkOutDate}
        />
      </div>

      {/* Guests */}
      <FormInput
        {...register('numberOfGuests', { valueAsNumber: true })}
        label="Number of Guests"
        icon={<Users size={16} />}
        type="number"
        min="1"
        max={property.maxGuests}
        error={errors.numberOfGuests}
        helperText={numberOfGuests > property.maxGuests ? `Maximum ${property.maxGuests} guests allowed` : undefined}
      />

      {/* Price Breakdown */}
      {numberOfNights > 0 && (
        <div className="space-y-2 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>${property.pricePerNight} × {numberOfNights} nights</span>
            <span>${numberOfNights * property.pricePerNight}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Service fee</span>
            <span>${Math.round(totalPrice * 0.1)}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2">
            <span>Total</span>
            <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || numberOfGuests > property.maxGuests}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <CreditCard size={20} />
        {isLoading ? 'Processing...' : 'Reserve Now'}
      </button>

      <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
        You won't be charged yet
      </p>
    </form>
  );
};
