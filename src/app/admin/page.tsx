import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import AdminPageContent from '@/components/admin/AdminPageContent';
import { AMENITIES } from '@/lib/constants';
import { authOptions } from '@/lib/auth';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/login');
  }

  const pendingListings = [
    {
      id: '1',
      title: 'Beautiful Apartment in Downtown',
      description: 'A stunning downtown apartment with modern amenities and great views',
      address: '123 Main St, New York, NY',
      latitude: 40.7128,
      longitude: -74.006,
      pricePerNight: 150,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      amenities: AMENITIES.slice(0, 4),
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500',
      ],
      reviews: [],
      rating: 0,
      reviewCount: 0,
      hostId: 'host1',
      available: true,
      availableDates: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Cozy Studio Near Beach',
      description: 'Perfect beachside studio with direct ocean views and beach access',
      address: '456 Ocean Ave, Miami, FL',
      latitude: 25.7617,
      longitude: -80.1918,
      pricePerNight: 120,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ['WiFi', 'Kitchen', 'Air Conditioning'],
      images: [
        'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500',
      ],
      reviews: [],
      rating: 0,
      reviewCount: 0,
      hostId: 'host2',
      available: true,
      availableDates: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return <AdminPageContent listings={pendingListings} />;
}
