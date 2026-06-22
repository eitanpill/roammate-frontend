# RoamMate Frontend - API Integration Guide

This document describes the expected API contract between the frontend and backend.

## Base Configuration

```typescript
// API Base URL (from .env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001

// All endpoints are prefixed with /api
// Example: GET http://localhost:3001/api/properties
```

## Authentication

### Login Endpoint

**Request**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success)**
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": "https://...",
      "role": "guest|host|admin",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Response (Error)**
```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "code": "INVALID_CREDENTIALS"
}
```

### Register Endpoint

**Request**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "guest|host"
}
```

**Response (Success)**
```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "guest",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

## Properties

### List Properties with Filters

**Request**
```http
GET /api/properties?
  location=New York
  &checkIn=2024-01-15
  &checkOut=2024-01-20
  &guests=2
  &minPrice=100
  &maxPrice=500
  &bedrooms=2
  &bathrooms=1
  &amenities=WiFi,Kitchen,Parking
  &page=1
  &limit=12

Authorization: Bearer {token}
```

**Response (Success)**
```json
{
  "statusCode": 200,
  "data": {
    "data": [
      {
        "id": "prop-123",
        "title": "Beautiful Downtown Apartment",
        "description": "A modern apartment in the heart of downtown...",
        "address": "123 Main St, New York, NY 10001",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "pricePerNight": 150,
        "maxGuests": 4,
        "bedrooms": 2,
        "bathrooms": 1,
        "amenities": ["WiFi", "Kitchen", "Parking", "AC"],
        "images": [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
        ],
        "reviews": [
          {
            "id": "review-123",
            "userId": "user-456",
            "userName": "Jane Smith",
            "rating": 5,
            "comment": "Amazing place!",
            "createdAt": "2024-01-01T00:00:00Z"
          }
        ],
        "rating": 4.8,
        "reviewCount": 24,
        "hostId": "host-123",
        "host": {
          "id": "host-123",
          "name": "John Host",
          "email": "host@example.com"
        },
        "available": true,
        "availableDates": ["2024-01-15", "2024-01-16"],
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2024-01-10T00:00:00Z"
      }
    ],
    "total": 245,
    "page": 1,
    "limit": 12,
    "totalPages": 21
  }
}
```

### Get Property Details

**Request**
```http
GET /api/properties/{id}
Authorization: Bearer {token}
```

**Response**
```json
{
  "statusCode": 200,
  "data": {
    "id": "prop-123",
    "title": "Beautiful Downtown Apartment",
    "description": "A modern apartment in the heart of downtown with stunning city views...",
    "address": "123 Main St, New York, NY 10001",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "pricePerNight": 150,
    "maxGuests": 4,
    "bedrooms": 2,
    "bathrooms": 1,
    "amenities": ["WiFi", "Kitchen", "Parking", "Air Conditioning", "Washer", "Dryer"],
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    "reviews": [
      {
        "id": "review-123",
        "userId": "user-456",
        "user": {
          "id": "user-456",
          "name": "Jane Smith",
          "email": "jane@example.com"
        },
        "rating": 5,
        "comment": "Amazing place! The view is incredible.",
        "createdAt": "2024-01-01T12:00:00Z"
      }
    ],
    "rating": 4.8,
    "reviewCount": 24,
    "hostId": "host-123",
    "host": {
      "id": "host-123",
      "name": "John Host",
      "email": "host@example.com",
      "avatar": "https://example.com/avatar.jpg"
    },
    "available": true,
    "availableDates": ["2024-01-15", "2024-01-16", "2024-01-17"],
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2024-01-10T00:00:00Z"
  }
}
```

### Create Property

**Request**
```http
POST /api/properties
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "Beautiful Downtown Apartment",
  "description": "A modern apartment...",
  "address": "123 Main St, New York, NY 10001",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "pricePerNight": 150,
  "maxGuests": 4,
  "bedrooms": 2,
  "bathrooms": 1,
  "amenities": ["WiFi", "Kitchen", "Parking"],
  "images": ["https://example.com/image1.jpg"]
}
```

**Response**
```json
{
  "statusCode": 201,
  "data": {
    "id": "prop-new-123",
    "title": "Beautiful Downtown Apartment",
    ...
  }
}
```

### Update Property

**Request**
```http
PATCH /api/properties/{id}
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "Updated Title",
  "pricePerNight": 175
}
```

**Response**
```json
{
  "statusCode": 200,
  "data": { ...updated property... }
}
```

### Delete Property

**Request**
```http
DELETE /api/properties/{id}
Authorization: Bearer {token}
```

**Response**
```json
{
  "statusCode": 200,
  "message": "Property deleted successfully"
}
```

## Bookings

### List Bookings

**Request**
```http
GET /api/bookings?page=1&limit=10
Authorization: Bearer {token}
```

**Response**
```json
{
  "statusCode": 200,
  "data": {
    "data": [
      {
        "id": "booking-123",
        "propertyId": "prop-456",
        "property": {
          "id": "prop-456",
          "title": "Beach House",
          "pricePerNight": 200
        },
        "userId": "user-789",
        "user": {
          "id": "user-789",
          "name": "Guest Name",
          "email": "guest@example.com"
        },
        "checkInDate": "2024-02-01",
        "checkOutDate": "2024-02-05",
        "numberOfGuests": 2,
        "totalPrice": 1000,
        "status": "confirmed|pending|cancelled|completed",
        "createdAt": "2024-01-15T10:00:00Z",
        "updatedAt": "2024-01-15T10:00:00Z"
      }
    ],
    "total": 5,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### Get Booking Details

**Request**
```http
GET /api/bookings/{id}
Authorization: Bearer {token}
```

**Response**
```json
{
  "statusCode": 200,
  "data": {
    "id": "booking-123",
    "propertyId": "prop-456",
    "property": { ...property details... },
    "userId": "user-789",
    "user": { ...user details... },
    "checkInDate": "2024-02-01",
    "checkOutDate": "2024-02-05",
    "numberOfGuests": 2,
    "totalPrice": 1000,
    "status": "confirmed",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### Create Booking

**Request**
```http
POST /api/bookings
Content-Type: application/json
Authorization: Bearer {token}

{
  "propertyId": "prop-456",
  "checkInDate": "2024-02-01",
  "checkOutDate": "2024-02-05",
  "numberOfGuests": 2
}
```

**Response**
```json
{
  "statusCode": 201,
  "data": {
    "id": "booking-new-123",
    "propertyId": "prop-456",
    "userId": "user-789",
    "checkInDate": "2024-02-01",
    "checkOutDate": "2024-02-05",
    "numberOfGuests": 2,
    "totalPrice": 1000,
    "status": "pending",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### Cancel Booking

**Request**
```http
POST /api/bookings/{id}/cancel
Authorization: Bearer {token}
```

**Response**
```json
{
  "statusCode": 200,
  "data": {
    "id": "booking-123",
    "status": "cancelled",
    ...
  }
}
```

## Admin

### Get Pending Listings

**Request**
```http
GET /api/admin/listings?status=pending&page=1&limit=10
Authorization: Bearer {admin-token}
```

**Response**
```json
{
  "statusCode": 200,
  "data": {
    "data": [
      {
        "id": "prop-pending-123",
        "title": "New Listing",
        "description": "...",
        "address": "...",
        "hostId": "host-123",
        "status": "pending",
        "createdAt": "2024-01-15T00:00:00Z"
      }
    ],
    "total": 3,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### Approve Listing

**Request**
```http
POST /api/admin/listings/{id}/approve
Authorization: Bearer {admin-token}
```

**Response**
```json
{
  "statusCode": 200,
  "message": "Listing approved successfully",
  "data": {
    "id": "prop-pending-123",
    "status": "approved"
  }
}
```

### Reject Listing

**Request**
```http
POST /api/admin/listings/{id}/reject
Content-Type: application/json
Authorization: Bearer {admin-token}

{
  "reason": "Images are not clear"
}
```

**Response**
```json
{
  "statusCode": 200,
  "message": "Listing rejected successfully"
}
```

## Reviews

### Get Property Reviews

**Request**
```http
GET /api/properties/{id}/reviews?page=1&limit=5
```

**Response**
```json
{
  "statusCode": 200,
  "data": {
    "data": [
      {
        "id": "review-123",
        "propertyId": "prop-456",
        "userId": "user-789",
        "user": {
          "id": "user-789",
          "name": "Jane Doe",
          "email": "jane@example.com"
        },
        "rating": 5,
        "comment": "Amazing place! Highly recommend.",
        "createdAt": "2024-01-10T00:00:00Z"
      }
    ],
    "total": 24,
    "page": 1,
    "limit": 5,
    "totalPages": 5
  }
}
```

### Create Review

**Request**
```http
POST /api/properties/{id}/reviews
Content-Type: application/json
Authorization: Bearer {token}

{
  "rating": 5,
  "comment": "Amazing place! Highly recommend."
}
```

**Response**
```json
{
  "statusCode": 201,
  "data": {
    "id": "review-new-123",
    "propertyId": "prop-456",
    "userId": "user-789",
    "rating": 5,
    "comment": "Amazing place! Highly recommend.",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

## Error Responses

All error responses follow this format:

```json
{
  "statusCode": 400,
  "message": "Error message describing what went wrong",
  "code": "ERROR_CODE",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Headers

All API requests should include:

```
Content-Type: application/json
Authorization: Bearer {token}
```

The `Authorization` header is optional for public endpoints (search, home page).

## Rate Limiting

Recommended rate limiting headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1234567890
```

## Pagination

List endpoints support pagination:

```
GET /api/properties?page=1&limit=12

Response includes:
{
  "data": [...],
  "total": 245,
  "page": 1,
  "limit": 12,
  "totalPages": 21
}
```

## Search Filters

**Supported filters for property search:**

| Filter | Type | Example |
|--------|------|---------|
| location | string | "New York" |
| checkIn | date | "2024-01-15" |
| checkOut | date | "2024-01-20" |
| guests | number | 2 |
| minPrice | number | 100 |
| maxPrice | number | 500 |
| amenities | array | "WiFi,Kitchen" |
| bedrooms | number | 2 |
| bathrooms | number | 1 |

## Integration Checklist

When implementing the backend:

- [ ] Implement authentication endpoints
- [ ] Implement property CRUD operations
- [ ] Implement booking management
- [ ] Implement admin listing management
- [ ] Implement review system
- [ ] Setup pagination
- [ ] Setup error responses
- [ ] Setup CORS
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Add role-based access control
- [ ] Setup logging
- [ ] Add image upload handling
- [ ] Test with frontend
- [ ] Document any deviations

## Testing

To test the frontend-backend integration:

1. Start backend server on `http://localhost:3001`
2. Update `NEXT_PUBLIC_API_URL` in `.env.local`
3. Start frontend: `npm run dev`
4. Test login at `/auth/login`
5. Test search at `/search`
6. Test property details at `/properties/[id]`
7. Test booking at `/booking/[id]`

## CORS Configuration

The backend should allow requests from the frontend:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

For production, replace `http://localhost:3000` with the actual frontend URL.
