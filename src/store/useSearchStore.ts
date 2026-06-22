import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchFilters } from '@/types';

interface SearchState {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  updateFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  clearFilters: () => void;
}

const defaultFilters: SearchFilters = {
  location: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  minPrice: 0,
  maxPrice: 10000,
  amenities: [],
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      setFilters: (filters) => set({ filters }),
      updateFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),
      clearFilters: () => set({ filters: defaultFilters }),
    }),
    {
      name: 'roammate-search-filters',
      version: 1,
    }
  )
);
