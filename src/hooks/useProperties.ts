import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { Property, PaginatedResponse, SearchFilters } from '@/types';

export const useProperties = (filters?: SearchFilters, page = 1, limit = 12) => {
  return useQuery({
    queryKey: ['properties', filters, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.location) params.append('location', filters.location);
      if (filters?.checkIn) params.append('checkIn', filters.checkIn);
      if (filters?.checkOut) params.append('checkOut', filters.checkOut);
      if (filters?.guests) params.append('guests', filters.guests.toString());
      if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters?.amenities?.length) params.append('amenities', filters.amenities.join(','));
      if (filters?.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const { data } = await axiosInstance.get<PaginatedResponse<Property>>(
        `/api/properties?${params.toString()}`
      );
      return data;
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Property>(`/api/properties/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { data } = await axiosInstance.post<Property>('/api/properties', property);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};

export const useUpdateProperty = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (property: Partial<Property>) => {
      const { data } = await axiosInstance.patch<Property>(`/api/properties/${id}`, property);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property', id] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};
