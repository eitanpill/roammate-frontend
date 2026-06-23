'use client';

export const revalidate = 0;

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { HostDashboardComponent } from '@/components/dashboard/HostDashboard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session) {
    redirect('/auth/login');
  }

  if (session.user.role !== 'host' && session.user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Only hosts can access the dashboard
          </p>
        </div>
      </div>
    );
  }

  // Mock data - replace with actual API calls
  const stats = {
    totalListings: 5,
    totalEarnings: 12500,
    totalBookings: 24,
    averageRating: 4.8,
    upcomingBookings: 3,
    pendingReviews: 2,
  };

  const revenueData = [
    { date: 'Jan', revenue: 2400 },
    { date: 'Feb', revenue: 2210 },
    { date: 'Mar', revenue: 2290 },
    { date: 'Apr', revenue: 2000 },
    { date: 'May', revenue: 2181 },
    { date: 'Jun', revenue: 2500 },
  ];

  const bookingData = [
    { month: 'Jan', bookings: 4 },
    { month: 'Feb', bookings: 3 },
    { month: 'Mar', bookings: 5 },
    { month: 'Apr', bookings: 4 },
    { month: 'May', bookings: 6 },
    { month: 'Jun', bookings: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Host Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {session.user.name}!
          </p>
        </div>

        <HostDashboardComponent
          stats={stats}
          revenueData={revenueData}
          bookingData={bookingData}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <button className="card bg-white dark:bg-gray-800 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">🏠</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Add Listing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create a new property</p>
          </button>
          <button className="card bg-white dark:bg-gray-800 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Manage Calendar</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Set availability</p>
          </button>
          <button className="card bg-white dark:bg-gray-800 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Messages</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">View guest messages</p>
          </button>
        </div>
      </div>
    </div>
  );
}
