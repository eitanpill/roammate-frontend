// Generic API Response Wrapper
export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message?: string;
  timestamp?: string;
}

// Paginated Response
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

// Error Response
export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

// Listing-related APIs
export interface ListingApprovalRequest {
  listingId: string;
  status: 'approved' | 'rejected';
  reason?: string;
}

export interface ListingApprovalResponse {
  id: string;
  status: 'approved' | 'rejected';
  approvedAt: string;
  approvedBy: string;
}

// Booking-related APIs
export interface CreateBookingRequest {
  propertyId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
}

export interface BookingConfirmation {
  bookingId: string;
  confirmationNumber: string;
  propertyId: string;
  checkInDate: string;
  checkOutDate: string;
  checkInInstructions?: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

// Search-related APIs
export interface SearchProperties {
  location?: string;
  checkInDate?: string;
  checkOutDate?: string;
  minGuests?: number;
  maxGuests?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  page?: number;
  pageSize?: number;
}

export interface SearchPropertiesResponse extends PaginatedResponse<PropertySearchResult> {}

export interface PropertySearchResult {
  id: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  imageUrl?: string;
  averageRating?: number;
  reviewCount?: number;
}

// Host-related APIs
export interface HostEarnings {
  totalEarnings: number;
  earningsThisMonth: number;
  earningsThisYear: number;
  nextPayoutDate?: string;
  pendingAmount?: number;
}

export interface HostStats {
  totalListings: number;
  totalBookings: number;
  occupancyRate: number;
  averageRating: number;
  totalEarnings: number;
  activeListings: number;
  pendingApprovals: number;
}

// Authentication APIs
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    name?: string;
    role: 'user' | 'host' | 'admin';
    avatar?: string;
  };
  token: AuthToken;
}

// Review-related APIs
export interface CreateReviewRequest {
  propertyId: string;
  bookingId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export interface ReviewResponse {
  id: string;
  propertyId: string;
  userId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  helpful: number;
}

// Notification APIs
export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'review' | 'message' | 'approval';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata?: Record<string, unknown>;
}
