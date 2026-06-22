'use client'

import { Edit, Trash2, Eye } from 'lucide-react'

export default function MyListings() {
  const listings = [
    { id: 1, name: 'Beachside Farm', location: 'Bangalow, NSW', price: 50, bookings: 12, rating: 4.9, status: 'Active' },
    { id: 2, name: 'Mountain Retreat', location: 'Blue Mountains, NSW', price: 45, bookings: 8, rating: 4.8, status: 'Active' },
    { id: 3, name: 'Riverside Cabin', location: 'Snowy River, VIC', price: 40, bookings: 5, rating: 5.0, status: 'Active' },
  ]

  return (
    <div className="space-y-8">
      <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-2xl p-8">
        <h1 className="text-4xl font-black text-brand-primary mb-2">My Properties 🏡</h1>
        <p className="text-brand-earth">Manage and monitor all your listings</p>
      </div>

      <div className="grid gap-6">
        {listings.map(listing => (
          <div key={listing.id} className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl p-6 hover:border-brand-primary/50 transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-brand-primary">{listing.name}</h3>
                <p className="text-brand-earth">{listing.location}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                {listing.status}
              </span>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-brand-primary/10">
              <div>
                <p className="text-xs text-brand-earth">PRICE</p>
                <p className="font-bold text-brand-primary">A${listing.price}/night</p>
              </div>
              <div>
                <p className="text-xs text-brand-earth">BOOKINGS</p>
                <p className="font-bold text-brand-primary">{listing.bookings} confirmed</p>
              </div>
              <div>
                <p className="text-xs text-brand-earth">RATING</p>
                <p className="font-bold text-brand-primary">{listing.rating}⭐</p>
              </div>
              <div>
                <p className="text-xs text-brand-earth">VIEWS</p>
                <p className="font-bold text-brand-primary">342 this month</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-white border border-brand-primary/30 text-brand-primary rounded-lg font-semibold hover:bg-white/70 transition flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button className="flex-1 px-4 py-2 bg-white border border-brand-primary/30 text-brand-primary rounded-lg font-semibold hover:bg-white/70 transition flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
