'use client';

import React, { useState } from 'react';
import { AdminListingsQueue } from '@/components/admin/AdminListingsQueue';
import toast from 'react-hot-toast';

interface Listing {
  id: string;
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  reviews: unknown[];
  rating: number;
  reviewCount: number;
  hostId: string;
  available: boolean;
  availableDates: unknown[];
  createdAt: string;
  updatedAt: string;
}

interface AdminPageContentProps {
  listings: Listing[];
}

export default function AdminPageContent({ listings }: AdminPageContentProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async (id: string) => {
    setIsProcessing(true);
    try {
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Review and manage pending listings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card bg-white dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Listings</p>
            <p className="text-3xl font-bold text-brand-primary">{listings.length}</p>
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

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Listings Pending Approval
          </h2>
          <AdminListingsQueue
            listings={listings}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
            isLoading={isProcessing}
          />
        </div>

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
