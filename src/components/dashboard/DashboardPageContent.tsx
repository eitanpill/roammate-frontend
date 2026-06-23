'use client';

import React from 'react';
import { HostDashboardComponent } from '@/components/dashboard/HostDashboard';

interface DashboardPageContentProps {
  userName?: string;
  stats: {
    totalListings: number;
    totalEarnings: number;
    totalBookings: number;
    averageRating: number;
    upcomingBookings: number;
    pendingReviews: number;
  };
  revenueData: Array<{ date: string; revenue: number }>;
  bookingData: Array<{ month: string; bookings: number }>;
}

export default function DashboardPageContent({
  userName,
  stats,
  revenueData,
  bookingData,
}: DashboardPageContentProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Host Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {userName}!
          </p>
        </div>

        <HostDashboardComponent
          stats={stats}
          revenueData={revenueData}
          bookingData={bookingData}
        />

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
