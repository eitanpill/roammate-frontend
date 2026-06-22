# RoamMate Frontend Architecture

## Folder Structure

```
src/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout (Server Component)
│   ├── providers.tsx            # Client providers (QueryClient, Zustand)
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── search/
│   │   └── page.tsx            # Search properties page
│   ├── booking/
│   │   └── [id]/page.tsx       # Booking confirmation page
│   ├── dashboard/
│   │   └── page.tsx            # Host dashboard
│   ├── host/
│   │   ├── page.tsx            # Host home
│   │   ├── new-listing/page.tsx # Create new listing
│   │   ├── listings/page.tsx    # View all listings
│   │   ├── earnings/page.tsx    # Earnings page
│   │   └── messages/page.tsx    # Messages page
│   ├── admin/
│   │   └── page.tsx            # Admin listings queue
│   └── auth/
│       └── [auth routes]
│
├── components/                   # Reusable React components
│   ├── ui/                      # Reusable UI components
│   │   ├── StatCard.tsx        # Stats display card
│   │   ├── form/               # Form field components
│   │   │   ├── FormInput.tsx
│   │   │   ├── FormDateInput.tsx
│   │   │   ├── FormCheckbox.tsx
│   │   │   └── index.ts
│   │   └── index.ts            # Barrel export
│   ├── admin/                   # Admin-specific components
│   │   ├── AdminListingsQueue.tsx
│   │   ├── ListingCard.tsx
│   │   └── index.ts
│   ├── booking/                 # Booking-related components
│   │   ├── BookingForm.tsx
│   │   └── index.ts
│   ├── common/                  # Shared components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── LoadingSpinner.tsx
│   ├── dashboard/               # Host dashboard components
│   │   ├── HostDashboard.tsx
│   │   ├── RevenueChart.tsx
│   │   ├── BookingsChart.tsx
│   │   └── OccupancyChart.tsx
│   ├── host/                    # Host-specific features (Ready for expansion)
│   │   └── index.ts            # Placeholder for host components
│   ├── properties/              # Property listing components
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyGallery.tsx
│   │   └── ReviewList.tsx
│   └── search/                  # Search-related components
│       ├── SearchFilters.tsx
│       └── MapSearchComponent.tsx
│
├── lib/                         # Utility functions and helpers
│   ├── env.ts                  # Environment variable validation
│   ├── constants.ts            # Global constants (amenities, regions, etc.)
│   ├── schemas.ts              # Zod validation schemas (centralized)
│   ├── utils.ts                # General utility functions
│   ├── axios.ts                # HTTP client configuration
│   └── auth.ts                 # Authentication logic
│
├── store/                       # Zustand stores
│   ├── useSearchStore.ts       # Search filters (persisted)
│   └── useAuthStore.ts         # Auth state
│
├── types/                       # TypeScript type definitions
│   ├── index.ts                # Core application types
│   └── api.ts                  # API response/request types
│
├── hooks/                       # Custom React hooks
│   └── (hooks directory)
│
└── public/                      # Static assets
```

## Component Architecture

### Reusable UI Components (`src/components/ui/`)
- **Purpose:** Completely reusable, zero-logic components
- **Examples:** StatCard, FormInput, FormDateInput, FormCheckbox
- **Usage:** Import from `@/components/ui` or `@/components/ui/form`
- **Trait:** Accept data/props, no business logic

### Feature Components (admin/, booking/, search/, etc.)
- **Purpose:** Feature-specific components with domain logic
- **Examples:** AdminListingsQueue, BookingForm, SearchFilters
- **Usage:** Import from feature folder directly
- **Trait:** Contain business logic specific to that feature

### Common Components (`src/components/common/`)
- **Purpose:** Shared layout and container components
- **Examples:** Header, Footer, ErrorBoundary, LoadingSpinner
- **Usage:** Import from `@/components/common`
- **Trait:** High-level layout, error handling, global UI

### Dashboard Components (`src/components/dashboard/`)
- **Purpose:** Host dashboard-specific components
- **Examples:** HostDashboard, RevenueChart, BookingsChart, OccupancyChart
- **Usage:** For host analytics and statistics
- **Trait:** Replaces large monolithic components with focused chart/stat components

## Type Safety Architecture

### Validation (src/lib/schemas.ts)
- Centralized Zod schemas for all forms
- Example: `bookingSchema`, `searchFilterSchema`, `propertySchema`
- Automatic type inference: `type BookingFormData = z.infer<typeof bookingSchema>`

### API Types (src/types/api.ts)
- Generic wrappers: `ApiResponse<T>`, `PaginatedResponse<T>`, `ApiError`
- Specific types for each API endpoint
- Example: `BookingConfirmation`, `ListingApprovalRequest`, `HostStats`

### Core Types (src/types/index.ts)
- Domain models: `Property`, `User`, `Booking`, `Review`
- Application-wide types

## State Management

### Search Store (src/store/useSearchStore.ts)
- Zustand store with **persistence** enabled
- Filters persist in localStorage under key `roammate-search-filters`
- Methods: `setFilters`, `updateFilter`, `clearFilters`
- Used in: SearchFilters component, Search results page

### Auth Store (src/store/useAuthStore.ts)
- User authentication state
- Consider consolidating with NextAuth session if using session provider

## Constants & Configuration

### Environment Variables (src/lib/env.ts)
- Zod validation for all required env vars
- Type-safe access via `getEnv()`
- Validates on app startup

### Constants (src/lib/constants.ts)
- AMENITIES array (single source of truth)
- CLEARANCE_HEIGHTS for vehicle specs
- REGIONS for location filtering
- PROPERTY_TYPES for listing classification

## Key Architectural Decisions

### 1. **Server Components for Root Layout**
- Root layout is a Server Component (not `'use client'`)
- Enables static generation, metadata exports, SSR
- Client providers wrapped separately in `src/app/providers.tsx`

### 2. **Centralized Schemas**
- All validation in `src/lib/schemas.ts`
- Single source of truth prevents divergence
- Automatic type inference via Zod

### 3. **Component Splitting**
- **HostDashboard:** 191 LOC → 74 LOC (split into RevenueChart, BookingsChart, OccupancyChart, StatCard)
- **AdminListingsQueue:** 165 LOC → 50 LOC (extracted ListingCard)
- Improves testability, reusability, and maintainability

### 4. **Form Components**
- FormInput, FormDateInput, FormCheckbox in `/components/ui/form/`
- Eliminates ~200 LOC of styling duplication
- Consistent dark mode support

### 5. **Persisted Search Filters**
- Zustand store with `persist` middleware
- Search filters survive page reload
- Improves UX, no need to re-enter filters

## Future Improvements (Phase 4+)

- [ ] Create HostListingForm component
- [ ] Create HostListingCard component  
- [ ] Add loading skeleton components
- [ ] Implement error boundary on page-level routes
- [ ] Add ARIA labels for accessibility
- [ ] Create comprehensive storybook
- [ ] Add E2E tests for critical flows
- [ ] Implement caching strategy for API responses

## Development Guidelines

1. **New components:** Start in `/components/[feature]/`
2. **Reusable components:** Move to `/components/ui/` once used 2+ times
3. **Validation:** Use Zod schemas from `/lib/schemas.ts`
4. **Constants:** Add to `/lib/constants.ts` if used 2+ places
5. **Types:** Add to `/types/` (api.ts for API types, index.ts for domain models)
6. **Store:** Use Zustand with persist middleware for client-side cache
