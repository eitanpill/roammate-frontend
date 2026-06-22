'use client'

import { useState } from 'react'
import { Search, MapPin, Filter, X, Star, Zap, Droplet, Trees, Leaf, Wifi } from 'lucide-react'

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false)

  const amenities = [
    { name: 'Water Hookup', icon: Droplet },
    { name: 'Power Supply', icon: Zap },
    { name: 'Dump Station', icon: Trees },
    { name: 'WiFi', icon: Wifi },
    { name: 'Level Ground', icon: Leaf },
    { name: 'Pet Friendly', icon: '🐾' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="relative z-10 sticky top-0 backdrop-blur-md bg-white/40 border-b border-brand-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <a href="/" className="inline-block text-3xl font-black text-brand-primary flex items-center gap-2">
            🏕️ RoamMate <span className="text-xs text-brand-accent">Find Your Spot</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between lg:block mb-6">
                <h2 className="text-xl font-black text-brand-primary flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Refine Search
                </h2>
                <button onClick={() => setShowFilters(false)} className="lg:hidden text-brand-earth hover:text-brand-primary">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Location Filter */}
              <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl p-4 space-y-3">
                <label className="block text-sm font-semibold text-brand-primary">Location / Region</label>
                <input
                  type="text"
                  defaultValue="Sydney, NSW"
                  className="w-full bg-white border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-primary focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition"
                  placeholder="Enter region"
                />
              </div>

              {/* Van Size */}
              <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl p-4 space-y-3">
                <label className="block text-sm font-semibold text-brand-primary">Clearance Height</label>
                <select className="w-full bg-white border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-primary focus:outline-none focus:border-brand-primary transition">
                  <option>Any</option>
                  <option>2.5m+</option>
                  <option>3m+</option>
                  <option>3.5m+</option>
                  <option>4m+</option>
                </select>
              </div>

              {/* Dates */}
              <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl p-4 space-y-3">
                <label className="block text-sm font-semibold text-brand-primary">Dates</label>
                <input type="date" className="w-full bg-white border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-primary focus:outline-none focus:border-brand-primary transition" />
                <input type="date" className="w-full bg-white border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-primary focus:outline-none focus:border-brand-primary transition" />
              </div>

              {/* Price Range */}
              <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl p-4 space-y-3">
                <label className="block text-sm font-semibold text-brand-primary">Price per Night</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="flex-1 bg-white border border-brand-primary/20 rounded-lg px-3 py-2 text-sm text-brand-primary focus:outline-none focus:border-brand-primary transition" />
                  <input type="number" placeholder="Max" className="flex-1 bg-white border border-brand-primary/20 rounded-lg px-3 py-2 text-sm text-brand-primary focus:outline-none focus:border-brand-primary transition" />
                </div>
              </div>

              {/* Amenities */}
              <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl p-4 space-y-3">
                <label className="block text-sm font-semibold text-brand-primary">Amenities</label>
                <div className="space-y-2">
                  {amenities.map(amenity => (
                    <label key={amenity.name} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-brand-primary accent-brand-primary" />
                      <span className="text-sm text-brand-earth">
                        {typeof amenity.icon === 'string' ? amenity.icon : ''}
                        {' '}{amenity.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl p-4 space-y-3">
                <label className="block text-sm font-semibold text-brand-primary">Property Type</label>
                <div className="space-y-2">
                  {['Farm Stay', 'Bushland', 'Beachside', 'Mountain', 'Riverside', 'Private Land'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-brand-primary accent-brand-primary" />
                      <span className="text-sm text-brand-earth">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Property Grid */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-8 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary" />
                  <input
                    type="text"
                    placeholder="Search properties, regions, amenities..."
                    className="w-full pl-12 pr-4 py-3 backdrop-blur-sm bg-white/70 border border-brand-primary/30 rounded-lg text-brand-primary placeholder-brand-earth/50 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition"
                  />
                </div>
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden px-4 py-3 bg-gradient-to-r from-brand-primary to-brand-sage text-white rounded-lg font-semibold hover:shadow-lg transition">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Empty State */}
            <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-2xl p-16 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 flex items-center justify-center">
                  <span className="text-5xl">🌲</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-brand-primary">No Spots Available</h3>
                <p className="text-brand-earth max-w-md mx-auto">
                  Try adjusting your dates, location, or filters to find more available caravan spots.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-sage text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105">
                  Clear Filters
                </button>
                <button className="px-6 py-3 backdrop-blur-sm bg-white/60 border border-brand-primary/30 text-brand-primary rounded-lg font-semibold hover:bg-white/80 transition transform hover:scale-105">
                  Browse All
                </button>
              </div>
            </div>

            {/* Property Grid - Sample */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {[
                { title: "Beachside Paradise Farm", location: "Bangalow, NSW", type: "Beachside Farm", price: 50, rating: 4.9, amenities: ['Water', 'Power', 'Level'] },
                { title: "Mountain Retreat Land", location: "Blue Mountains, NSW", type: "Bushland", price: 45, rating: 4.8, amenities: ['Water', 'Level', 'Pet Friendly'] },
                { title: "Riverside Camping Ground", location: "Snowy River, VIC", type: "Riverside", price: 40, rating: 5.0, amenities: ['Power', 'Dump', 'WiFi'] },
                { title: "Organic Farm Stay", location: "Hunter Valley, NSW", type: "Farm Stay", price: 55, rating: 4.7, amenities: ['Water', 'Power', 'Pet Friendly'] }
              ].map((property, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 h-48 flex items-center justify-center group-hover:border-brand-primary/50 transition">
                    <span className="text-5xl">🏞️</span>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-xl p-4 space-y-3 group-hover:border-brand-primary/50 transition">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-brand-primary group-hover:text-brand-accent transition">{property.title}</h3>
                        <p className="text-sm text-brand-earth flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {property.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-brand-accent/20 border border-brand-accent/50 rounded-lg px-2 py-1">
                        <Star className="w-4 h-4 text-brand-accent fill-brand-accent" />
                        <span className="text-sm font-semibold text-brand-primary">{property.rating}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-brand-earth bg-brand-primary/10 border border-brand-primary/20 rounded-lg px-2 py-1 inline-block">
                      {property.type}
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      {property.amenities.map(am => (
                        <div key={am} className="text-xs text-brand-primary bg-brand-secondary/10 border border-brand-secondary/20 rounded-lg px-2 py-1">
                          {am === 'Water' && <Droplet className="w-3 h-3 inline mr-1" />}
                          {am === 'Power' && <Zap className="w-3 h-3 inline mr-1" />}
                          {am}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-brand-primary/10">
                      <div>
                        <p className="text-xs text-brand-earth">from</p>
                        <p className="text-lg font-bold text-brand-primary">A${property.price}<span className="text-xs font-normal text-brand-earth">/night</span></p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-sage text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
