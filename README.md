# RoamMate Frontend

A production-ready Next.js 14+ frontend application for the RoamMate property rental platform. Built with TypeScript, TailwindCSS, React Query, and NextAuth.js.

## Features

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **TailwindCSS** with custom brand theme
- **React Query** for efficient data fetching and caching
- **NextAuth.js** for authentication
- **Zustand** for lightweight state management
- **Recharts** for data visualization
- **React Leaflet** for map-based property search
- **Dark mode support** with system preferences detection
- **Responsive design** with mobile-first approach
- **Form validation** with React Hook Form and Zod
- **Error boundaries** and loading states
- **Toast notifications** for user feedback

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand + React Context
- **Data Fetching**: React Query (TanStack Query)
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form + Zod
- **Maps**: React Leaflet
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Utilities**: date-fns
- **HTTP Client**: Axios

## Project Structure

```
roammate-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/auth/          # Authentication API routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── auth/              # Authentication pages
│   │   ├── booking/           # Booking flow
│   │   ├── dashboard/         # Host dashboard
│   │   ├── properties/        # Property details
│   │   ├── search/            # Search and discovery
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable React components
│   │   ├── admin/             # Admin components
│   │   ├── booking/           # Booking components
│   │   ├── common/            # Common/shared components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── properties/        # Property components
│   │   └── search/            # Search components
│   ├── hooks/                 # Custom React hooks
│   │   ├── useBookings.ts     # Booking data hooks
│   │   ├── useProperties.ts   # Property data hooks
│   │   └── useTheme.ts        # Theme management hook
│   ├── lib/                   # Utility functions and configurations
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── axios.ts           # Axios client with interceptors
│   │   └── queryClient.ts     # React Query configuration
│   ├── store/                 # Zustand stores
│   │   ├── useAuthStore.ts    # Auth state
│   │   └── useSearchStore.ts  # Search state
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   └── globals.css            # Global styles and utilities
├── public/                    # Static assets
├── .eslintrc.json            # ESLint configuration
├── .gitignore
├── .env.local.example        # Environment variables template
├── next.config.js            # Next.js configuration
├── package.json
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/roammate/frontend.git
cd roammate-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token-here
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Key Pages

### Public Pages
- **`/`** - Home page with hero section and features
- **`/search`** - Property search with map and filters
- **`/properties/[id]`** - Property detail page with reviews
- **`/auth/login`** - User authentication

### Protected Pages
- **`/dashboard`** - Host dashboard with analytics (requires host role)
- **`/admin`** - Admin panel for listing management (requires admin role)
- **`/booking/[id]`** - Booking confirmation page (requires authenticated user)

## Components

### Common Components
- **Header** - Navigation with theme toggle and auth
- **Footer** - Site footer with links and social media
- **LoadingSpinner** - Loading indicator with size variants
- **ErrorBoundary** - Error boundary for error handling

### Property Components
- **PropertyCard** - Compact property display with ratings
- **PropertyGallery** - Full-screen property image gallery
- **ReviewList** - Property reviews with ratings

### Search Components
- **MapSearchComponent** - Interactive map with property markers
- **SearchFiltersComponent** - Advanced filter options

### Booking Components
- **BookingForm** - Interactive booking form with price calculation

### Dashboard Components
- **HostDashboardComponent** - Analytics and charts for hosts

### Admin Components
- **AdminListingsQueue** - Manage pending property listings

## API Integration

All API calls use the configured axios instance in `src/lib/axios.ts`, which:
- Automatically includes JWT token from NextAuth.js session
- Handles 401 unauthorized errors with redirect to login
- Uses React Query for efficient caching and synchronization

### Environment Configuration

The frontend communicates with the backend API via:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

All API endpoints are prefixed with `/api/` (e.g., `/api/properties`, `/api/bookings`).

## State Management

### Zustand Stores
- **useAuthStore** - Manages user authentication state
- **useSearchStore** - Manages search filters and state

### React Query
- Handles server state with automatic caching
- Stale time: 5 minutes
- Garbage collection time: 10 minutes
- Configured in `src/lib/queryClient.ts`

## Dark Mode

The application includes built-in dark mode support:
- Uses system preference as default
- Toggle available in header
- Preference saved to localStorage
- Implemented with TailwindCSS dark mode

## Form Validation

Forms use React Hook Form with Zod schemas for validation:
- Type-safe form data
- Real-time validation
- Custom error messages
- Server-side error handling

## Styling

### Tailwind Configuration
- Custom color palette based on RoamMate brand
- Extended spacing, typography, and animations
- CSS variables for dynamic theming

### Custom Classes
- `.card` - Styled card component
- `.glass` - Glassmorphism effect
- `.gradient-primary` - Primary gradient
- `.text-clamp-*` - Line clamping utilities

## Scripts

```bash
# Development
npm run dev          # Start dev server

# Building
npm run build        # Build for production
npm start           # Start production server

# Testing & Linting
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript type checking
```

## Authentication

The application uses NextAuth.js with:
- Credentials provider (username/password)
- Session management
- Automatic token refresh in axios interceptors
- Role-based access control (guest, host, admin)

### Demo Credentials
- Email: `demo@roammate.com`
- Password: `password123`

## Best Practices

1. **Type Safety**: Always use TypeScript types from `src/types`
2. **Data Fetching**: Use custom hooks from `src/hooks` for API calls
3. **State Management**: Use Zustand for global state, React Query for server state
4. **Components**: Keep components focused and use composition
5. **Error Handling**: Use ErrorBoundary for UI errors
6. **Forms**: Use React Hook Form with Zod validation
7. **Styling**: Prefer TailwindCSS utility classes

## Performance Optimizations

- Code splitting with Next.js dynamic imports
- Image optimization with Next.js Image component
- React Query caching and deduplication
- CSS-in-JS with Tailwind for minimal bundle size
- Lazy loading for routes and components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Proprietary - RoamMate Inc.

## Support

For issues and questions, please contact the development team.
