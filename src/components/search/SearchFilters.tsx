'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { SearchFilters } from '@/types';
import { Search } from 'lucide-react';
import { FormInput, FormDateInput, FormCheckbox } from '@/components/ui/form';
import { AMENITIES } from '@/lib/constants';

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading?: boolean;
}

export const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const { register, watch, handleSubmit } = useForm<SearchFilters>({
    defaultValues: {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      minPrice: 0,
      maxPrice: 10000,
      amenities: [],
    },
  });

  const selectedAmenities = watch('amenities') || [];

  const onSubmit = (data: SearchFilters) => {
    onSearch(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card space-y-6 bg-white dark:bg-gray-800"
    >
      {/* Location */}
      <FormInput
        {...register('location')}
        label="Location"
        placeholder="City, neighborhood, or address"
      />

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <FormDateInput
          {...register('checkIn')}
          label="Check In"
        />
        <FormDateInput
          {...register('checkOut')}
          label="Check Out"
        />
      </div>

      {/* Guests */}
      <FormInput
        {...register('guests', { valueAsNumber: true })}
        label="Guests"
        type="number"
        min="1"
        max="20"
      />

      {/* Price Range */}
      <fieldset className="space-y-2">
        <legend className="block text-sm font-semibold text-gray-900 dark:text-white">
          Price Range
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            {...register('minPrice', { valueAsNumber: true })}
            type="number"
            min="0"
            placeholder="Min"
          />
          <FormInput
            {...register('maxPrice', { valueAsNumber: true })}
            type="number"
            min="0"
            placeholder="Max"
          />
        </div>
      </fieldset>

      {/* Amenities */}
      <fieldset>
        <legend className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Amenities
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {AMENITIES.map((amenity) => (
            <FormCheckbox
              key={amenity}
              value={amenity}
              label={amenity}
              {...register('amenities')}
            />
          ))}
        </div>
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <Search size={20} />
        Search Properties
      </button>
    </form>
  );
};
