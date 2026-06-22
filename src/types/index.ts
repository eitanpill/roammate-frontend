export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'guest' | 'host' | 'admin';
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
  hostId: string;
  host?: User;
  available: boolean;
  availableDates: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  user?: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  property?: Property;
  userId: string;
  user?: User;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  bedrooms?: number;
  bathrooms?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
}

export interface HostStats {
  totalListings: number;
  totalEarnings: number;
  totalBookings: number;
  averageRating: number;
  upcomingBookings: number;
  pendingReviews: number;
}
