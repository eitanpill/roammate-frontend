import { z } from 'zod';

// Booking Form Schema
export const bookingSchema = z.object({
  checkInDate: z.string().min(1, 'Check-in date is required'),
  checkOutDate: z.string().min(1, 'Check-out date is required'),
  numberOfGuests: z.number().min(1, 'At least 1 guest is required'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// Search Filters Schema
export const searchFilterSchema = z.object({
  location: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().min(1).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  amenities: z.array(z.string()).optional(),
});

export type SearchFilterData = z.infer<typeof searchFilterSchema>;

// Property/Listing Schema
export const propertySchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.string().min(1, 'Address is required'),
  latitude: z.number(),
  longitude: z.number(),
  pricePerNight: z.number().min(1, 'Price must be greater than 0'),
  bedrooms: z.number().min(1),
  bathrooms: z.number().min(1),
  maxGuests: z.number().min(1),
  amenities: z.array(z.string()),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  hostId: z.string(),
});

export type PropertyData = z.infer<typeof propertySchema>;

// Listing Approval Schema (for admin)
export const listingApprovalSchema = z.object({
  listingId: z.string(),
  status: z.enum(['approved', 'rejected']),
  reason: z.string().optional(),
});

export type ListingApprovalData = z.infer<typeof listingApprovalSchema>;

// User Profile Schema
export const userProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().optional(),
  role: z.enum(['user', 'host', 'admin']).optional(),
});

export type UserProfileData = z.infer<typeof userProfileSchema>;

// Booking Confirmation Schema
export const bookingConfirmationSchema = z.object({
  bookingId: z.string(),
  propertyId: z.string(),
  userId: z.string(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  numberOfGuests: z.number(),
  totalPrice: z.number(),
  status: z.enum(['pending', 'confirmed', 'cancelled']),
});

export type BookingConfirmationData = z.infer<typeof bookingConfirmationSchema>;
