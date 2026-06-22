'use client'

import { BarChart3, TrendingUp, Users, DollarSign, Eye, Star } from 'lucide-react'
import Link from 'next/link'

export default function HostDashboard() {
  const stats = [
    { label: 'Active Listings', value: '3', icon: Eye, color: 'from-brand-primary to-brand-sage' },
    { label: 'Total Earnings', value: 'A$4,250', icon: DollarSign, color: 'from-brand-secondary to-brand-tertiary' },
    { label: 'This Month', value: 'A$1,200', icon: TrendingUp, color: 'from-brand-accent to-brand-earth' },
    { label: 'Avg Rating', value: '4.8⭐', icon: Star, color: 'from-brand-sage to-brand-primary' },
  ]

  const recentBookings = [
    { guest: 'Sarah Mitchell', property: 'Beachside Farm', dates: 'June 21-24', status: 'Active', rating: 5.0 },
    { guest: 'James Cooper', property: 'Mountain Retreat', dates: 'June 15-19', status: 'Completed', rating: 4.9 },
    { guest: 'Emma Johnson', property: 'Riverside Cabin', dates: 'July 1-5', status: 'Upcoming', rating: null },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-2xl p-8">
        <h1 className="text-4xl font-black text-brand-primary mb-2">Welcome Back, Host! 🏡</h1>
        <p className="text-brand-earth">You're doing great! Here's your hosting overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl p-6 hover:border-brand-primary/50 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-brand-earth">{stat.label}</h3>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-black text-brand-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/host/new-listing" className="backdrop-blur-sm bg-gradient-to-r from-brand-primary to-brand-sage text-white rounded-xl p-6 font-bold hover:shadow-lg transition transform hover:scale-105 text-center">
          ➕ List New Property
        </Link>
        <Link href="/host/listings" className="backdrop-blur-sm bg-white/70 border border-brand-primary/30 text-brand-primary rounded-xl p-6 font-bold hover:bg-white/90 transition transform hover:scale-105 text-center">
          📋 Manage Properties
        </Link>
        <Link href="/host/earnings" className="backdrop-blur-sm bg-white/70 border border-brand-secondary/30 text-brand-secondary rounded-xl p-6 font-bold hover:bg-white/90 transition transform hover:scale-105 text-center">
          💰 View Earnings
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-brand-primary/10">
          <h2 className="text-2xl font-black text-brand-primary">Recent Bookings 📚</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-primary/5 border-b border-brand-primary/10">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-brand-primary">Guest</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brand-primary">Property</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brand-primary">Dates</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brand-primary">Status</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brand-primary">Rating</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, i) => (
                <tr key={i} className="border-b border-brand-primary/5 hover:bg-brand-primary/5 transition">
                  <td className="px-6 py-4 text-brand-primary font-semibold">{booking.guest}</td>
                  <td className="px-6 py-4 text-brand-earth">{booking.property}</td>
                  <td className="px-6 py-4 text-brand-earth">{booking.dates}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'Active' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-primary font-semibold">
                    {booking.rating ? `${booking.rating}⭐` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="backdrop-blur-sm bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6">
          <h3 className="font-bold text-brand-primary mb-3">💡 Host Tips</h3>
          <ul className="space-y-2 text-sm text-brand-earth">
            <li>✓ Respond to messages within 2 hours for best results</li>
            <li>✓ Keep your calendar updated to avoid double bookings</li>
            <li>✓ Add more photos to increase booking rates</li>
          </ul>
        </div>
        <div className="backdrop-blur-sm bg-brand-secondary/10 border border-brand-secondary/20 rounded-xl p-6">
          <h3 className="font-bold text-brand-secondary mb-3">📊 Insights</h3>
          <ul className="space-y-2 text-sm text-brand-earth">
            <li>🔥 Your beachside property is trending this week</li>
            <li>📈 Occupancy rate is up 15% from last month</li>
            <li>⭐ Guests love your cleanliness standards</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
