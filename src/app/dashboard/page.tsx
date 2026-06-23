import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import DashboardPageContent from '@/components/dashboard/DashboardPageContent';

export default async function DashboardPage() {
  const session = await getServerSession();

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
    <DashboardPageContent
      userName={session.user.name}
      stats={stats}
      revenueData={revenueData}
      bookingData={bookingData}
    />
  );
}
