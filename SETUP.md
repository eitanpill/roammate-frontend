# RoamMate Frontend - Setup Guide

## Quick Start

### 1. Initial Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Update .env.local with your values
nano .env.local
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Optional: Mapbox token for enhanced maps
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token-here
```

**Important**: Generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 in your browser.

## Project Structure Explanation

```
src/
├── app/                          # Next.js App Router
│   ├── api/auth/[...nextauth]/   # NextAuth.js API route
│   ├── admin/                    # /admin - Admin dashboard
│   ├── auth/                     # /auth - Authentication pages
│   ├── booking/                  # /booking - Booking flow
│   ├── dashboard/                # /dashboard - Host dashboard
│   ├── properties/               # /properties - Property pages
│   ├── search/                   # /search - Search page
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Home page
│
├── components/                   # Reusable components
│   ├── admin/                    # Admin-specific components
│   ├── booking/                  # Booking components
│   ├── common/                   # Shared components
│   ├── dashboard/                # Dashboard components
│   ├── properties/               # Property components
│   └── search/                   # Search components
│
├── hooks/                        # Custom React hooks
│   ├── useBookings.ts            # Booking API hooks
│   ├── useProperties.ts          # Property API hooks
│   └── useTheme.ts               # Theme management
│
├── lib/                          # Utilities and configurations
│   ├── auth.ts                   # NextAuth configuration
│   ├── axios.ts                  # HTTP client setup
│   └── queryClient.ts            # React Query setup
│
├── store/                        # Zustand state stores
│   ├── useAuthStore.ts           # Auth state
│   └── useSearchStore.ts         # Search state
│
├── types/                        # TypeScript definitions
│   └── index.ts                  # All type definitions
│
└── globals.css                   # Global styles
```

## Key Features Setup

### Authentication (NextAuth.js)

1. **Session Configuration**: Edit `src/lib/auth.ts`
2. **Login Page**: Located at `/auth/login`
3. **Protected Routes**: Use `useSession()` hook
4. **Redirect**: Automatically redirects unauthorized users

```typescript
import { useSession } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session } = useSession();
  
  if (!session) {
    // Redirect to login
    redirect('/auth/login');
  }
  
  return <div>Welcome {session.user.name}</div>;
}
```

### Data Fetching (React Query)

Example using custom hooks:

```typescript
import { useProperties } from '@/hooks/useProperties';

export default function SearchPage() {
  const { data, isLoading, error } = useProperties(filters);
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert />;
  
  return <PropertyGrid properties={data.data} />;
}
```

### State Management (Zustand)

```typescript
import { useAuthStore } from '@/store/useAuthStore';
import { useSearchStore } from '@/store/useSearchStore';

// In components
const user = useAuthStore((state) => state.user);
const filters = useSearchStore((state) => state.filters);
```

### Theme Management

Dark mode is built-in:

```typescript
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return <button onClick={toggleTheme}>Toggle Theme</button>;
}
```

## Database & API Integration

### Expected Backend API Structure

The frontend expects the following API endpoints (base URL: `NEXT_PUBLIC_API_URL`):

**Properties**:
- `GET /api/properties` - List properties (with filters and pagination)
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create property (admin/host only)
- `PATCH /api/properties/:id` - Update property (host only)
- `DELETE /api/properties/:id` - Delete property (admin/host only)

**Bookings**:
- `GET /api/bookings` - List user's bookings
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id` - Update booking
- `POST /api/bookings/:id/cancel` - Cancel booking

**Authentication**:
- `POST /api/auth/login` - User login (returns user + token)
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

**Admin**:
- `GET /api/admin/listings` - Get pending listings
- `POST /api/admin/listings/:id/approve` - Approve listing
- `POST /api/admin/listings/:id/reject` - Reject listing

### Expected Response Format

```typescript
// Successful API response
{
  data: T | T[],
  statusCode: 200,
  message?: string
}

// Error response
{
  statusCode: 400 | 401 | 403 | 404 | 500,
  message: string,
  code?: string
}

// Paginated response
{
  data: T[],
  total: number,
  page: number,
  limit: number,
  totalPages: number
}
```

## Customization

### Custom Brand Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#FF6B6B',      // Main color
        secondary: '#4ECDC4',    // Secondary color
        accent: '#FFE66D',       // Accent color
        dark: '#1a1a1a',        // Dark mode background
        light: '#f8f9fa',       // Light mode background
      }
    }
  }
}
```

### Custom API Base URL

Update `NEXT_PUBLIC_API_URL` in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.roammate.com
```

The axios client automatically uses this value.

### Add New Pages

1. Create folder: `src/app/[route-name]/`
2. Add `page.tsx` inside
3. Use existing components and hooks
4. Protect with `useSession()` if needed

Example:

```typescript
// src/app/listings/page.tsx
'use client';

import { useProperties } from '@/hooks/useProperties';

export default function ListingsPage() {
  const { data, isLoading } = useProperties();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">My Listings</h1>
      {/* Your content */}
    </div>
  );
}
```

## Common Development Tasks

### Add a New Component

```typescript
// src/components/[section]/NewComponent.tsx
'use client';

import React from 'react';

interface NewComponentProps {
  title: string;
}

export const NewComponent: React.FC<NewComponentProps> = ({ title }) => {
  return <div>{title}</div>;
};
```

### Add a New API Hook

```typescript
// src/hooks/useNewFeature.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useNewFeature = (id: string) => {
  return useQuery({
    queryKey: ['newFeature', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/new-feature/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
```

### Add a New Store

```typescript
// src/store/useNewStore.ts
import { create } from 'zustand';

interface NewStoreState {
  value: string;
  setValue: (value: string) => void;
}

export const useNewStore = create<NewStoreState>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
}));
```

## Deployment

### Build for Production

```bash
npm run build
```

### Environment Setup for Production

Update `.env.local` for production:

```env
NEXT_PUBLIC_API_URL=https://api.roammate.com
NEXTAUTH_SECRET=your-production-secret-key
NEXTAUTH_URL=https://roammate.com
```

### Deployment Platforms

**Vercel (Recommended)**:
```bash
npm install -g vercel
vercel
```

**Docker**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### Issue: "Cannot find module" errors
**Solution**: Clear node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

### Issue: Port 3000 already in use
**Solution**: Use a different port:
```bash
npm run dev -- -p 3001
```

### Issue: NextAuth session undefined
**Solution**: Ensure `NEXTAUTH_SECRET` is set in `.env.local`

### Issue: API calls failing with 401
**Solution**: Check that backend is running and `NEXT_PUBLIC_API_URL` is correct

### Issue: Dark mode not working
**Solution**: Add `suppressHydrationWarning` to `<html>` tag in `src/app/layout.tsx`

## Performance Tips

1. **Use React.memo()** for expensive components
2. **Implement code splitting** with dynamic imports
3. **Optimize images** using Next.js Image component
4. **Monitor bundle size** with `npm run analyze` (if webpack-bundle-analyzer is installed)
5. **Use React Query for caching** to minimize API calls

## Security Checklist

- [ ] Change `NEXTAUTH_SECRET` in production
- [ ] Use HTTPS for production
- [ ] Set `NEXTAUTH_URL` to production domain
- [ ] Enable CORS on backend
- [ ] Validate all user inputs
- [ ] Use environment variables for sensitive data
- [ ] Enable Content Security Policy (CSP)
- [ ] Implement rate limiting

## Testing

```bash
# Run ESLint
npm run lint

# Type checking
npm run type-check
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Support & Feedback

For questions or issues, please contact the development team or open an issue in the repository.
