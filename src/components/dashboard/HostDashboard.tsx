'use client';

import React from 'react';
import { HostStats } from '@/types';
import { TrendingUp, Users, DollarSign, Star, Calendar, MessageSquare } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { RevenueChart } from './RevenueChart';
import { BookingsChart } from './BookingsChart';
import { OccupancyChart } from './OccupancyChart';

interface HostDashboardProps {
  stats: HostStats;
  revenueData: Array<{ date: string; revenue: number }>;
  bookingData: Array<{ month: string; bookings: number }>;
}

export const HostDashboardComponent: React.FC<HostDashboardProps> = ({
  stats,
  revenueData,
  bookingData,
}) => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<DollarSign size={24} className="text-brand-primary" />}
          label="Total Earnings"
          value={`$${stats.totalEarnings.toLocaleString()}`}
          color="text-brand-primary"
        />
        <StatCard
          icon={<Users size={24} className="text-success" />}
          label="Total Bookings"
          value={stats.totalBookings}
          color="text-success"
        />
        <StatCard
          icon={<Star size={24} className="text-brand-secondary" />}
          label="Average Rating"
          value={stats.averageRating.toFixed(1)}
          color="text-brand-secondary"
        />
        <StatCard
          icon={<Calendar size={24} className="text-info" />}
          label="Upcoming Bookings"
          value={stats.upcomingBookings}
          color="text-info"
        />
        <StatCard
          icon={<MessageSquare size={24} className="text-warning" />}
          label="Pending Reviews"
          value={stats.pendingReviews}
          color="text-warning"
        />
        <StatCard
          icon={<TrendingUp size={24} className="text-brand-primary" />}
          label="Total Listings"
          value={stats.totalListings}
          color="text-brand-primary"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <BookingsChart data={bookingData} />
      </div>

      {/* Occupancy Rate */}
      <OccupancyChart />
    </div>
  );
};
