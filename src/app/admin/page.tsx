'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { AdminListingsQueue } from '@/components/admin/AdminListingsQueue';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { AMENITIES } from '@/lib/constants';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/login');
  }

  // Mock data - replace with actual API calls
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

  const handleApprove = async (id: string) => {
    setIsProcessing(true);
    try {
      // Call API to approve listing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Listing approved!');
    } catch (error) {
      toast.error('Failed to approve listing');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (id: string) => {
    setIsProcessing(true);
    try {
      // Call API to reject listing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Listing rejected');
    } catch (error) {
      toast.error('Failed to reject listing');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsProcessing(true);
    try {
      // Call API to delete listing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Listing deleted');
    } catch (error) {
      toast.error('Failed to delete listing');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Review and manage pending listings
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card bg-white dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Listings</p>
            <p className="text-3xl font-bold text-brand-primary">{pendingListings.length}</p>
          </div>
          <div className="card bg-white dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-brand-secondary">127</p>
          </div>
          <div className="card bg-white dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Listings</p>
            <p className="text-3xl font-bold text-success">342</p>
          </div>
          <div className="card bg-white dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Active Bookings</p>
            <p className="text-3xl font-bold text-info">89</p>
          </div>
        </div>

        {/* Listings Queue */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Listings Pending Approval
          </h2>
          <AdminListingsQueue
            listings={pendingListings}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
            isLoading={isProcessing}
          />
        </div>

        {/* Admin Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="card bg-white dark:bg-gray-800 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Manage Users</h3>
          </button>
          <button className="card bg-white dark:bg-gray-800 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Analytics</h3>
          </button>
          <button className="card bg-white dark:bg-gray-800 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">⚙️</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Settings</h3>
          </button>
          <button className="card bg-white dark:bg-gray-800 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Reports</h3>
          </button>
        </div>
      </div>
    </div>
  );
}
