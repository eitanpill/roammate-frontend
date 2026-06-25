'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Zap, Trees, Droplet, ArrowRight, Search, Home as HomeIcon, Leaf } from 'lucide-react'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="w-full overflow-hidden bg-gradient-to-br from-amber-50 via-green-50 to-blue-50">
      {/* Nature background with softer elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -top-32 -left-32 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-1000"></div>
        <div className="absolute w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 sticky top-0 backdrop-blur-md bg-white/30 border-b border-brand-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl sm:text-3xl font-black text-brand-primary flex items-center gap-2">
            🏕️ RoamMate
            <span className="hidden md:inline text-sm font-semibold text-brand-accent ml-2">Connect with Nature</span>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <Link href="/search" className="px-3 sm:px-6 py-2 rounded-lg text-brand-primary hover:text-brand-accent transition">
              Find Spots
            </Link>
            <Link href="/auth/login" className="px-3 sm:px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-brand-primary/30 transition transform hover:scale-105">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl w-full">
          <div className="text-center space-y-8 mb-16">
            <div className="relative inline-block">
              <h1 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-brand-primary leading-tight drop-shadow-lg">
                Park Your Caravan<br />
                <span className="text-brand-secondary">
                  in Nature's Embrace
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-brand-earth max-w-2xl mx-auto font-medium">
              Discover private lands, farms, and natural spaces across Australia. Connect with local landowners who welcome caravan travelers. No commercial parks, just authentic hospitality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/search" className="group relative px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-sage text-white font-bold rounded-lg hover:shadow-xl hover:shadow-brand-primary/40 transition transform hover:scale-105 flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Find Your Spot
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
              <Link href="/host" className="px-8 py-4 backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-brand-primary/30 text-brand-primary font-bold rounded-lg transition transform hover:scale-105">
                List Your Land
              </Link>
            </div>
          </div>

          {/* Search Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-2xl blur-xl opacity-40"></div>
            <div className="relative backdrop-blur-md bg-white/70 border border-brand-primary/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition">
              <div className="grid md:grid-cols-4 gap-4">
                <input type="text" placeholder="Region or town..." className="bg-white border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-primary placeholder-brand-earth/50 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition" />
                <input type="date" className="bg-white border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-primary focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition" />
                <input type="date" className="bg-white border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-primary focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition" />
                <button className="bg-gradient-to-r from-brand-primary to-brand-sage text-white font-bold rounded-lg hover:shadow-lg transition transform hover:scale-105">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why RoamMate Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-brand-primary mb-4">
            Why Choose RoamMate?
          </h2>
          <p className="text-xl text-brand-earth">For travelers who love the open road and nature</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { 
              icon: Trees, 
              title: "100% Natural Spaces", 
              desc: "Farms, bushland, coastal properties - no sterile caravan parks", 
              color: 'from-brand-primary to-brand-sage' 
            },
            { 
              icon: Droplet, 
              title: "Water & Power", 
              desc: "Facilities for caravan hookups and off-grid amenities", 
              color: 'from-brand-secondary to-brand-tertiary' 
            },
            { 
              icon: HomeIcon, 
              title: "Verified Hosts", 
              desc: "Meet genuine landowners who understand caravan travelers", 
              color: 'from-brand-accent to-brand-earth' 
            },
            { 
              icon: Leaf, 
              title: "Fair Pricing", 
              desc: "Zero traveler fees. 8% host commission - the lowest in Australia", 
              color: 'from-brand-sage to-brand-primary' 
            }
          ].map((feature, i) => (
            <div key={i} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition duration-500" 
                   style={{background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`}}></div>
              <div className={`relative backdrop-blur-sm bg-white/60 border border-brand-primary/20 hover:border-brand-primary/50 rounded-2xl p-8 transition transform group-hover:scale-105`}>
                <feature.icon className="w-12 h-12 text-brand-primary mb-4 group-hover:text-brand-accent transition" />
                <h3 className="text-xl font-bold text-brand-primary mb-3">{feature.title}</h3>
                <p className="text-brand-earth">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* For Travelers Section */}
      <section className="relative z-10 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 py-24 my-24 border-t border-b border-brand-primary/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-4xl font-black text-brand-primary">For Caravan Travelers</h3>
              <ul className="space-y-4 text-brand-earth">
                <li className="flex gap-3">
                  <Zap className="w-6 h-6 text-brand-accent flex-shrink-0" />
                  <span><strong>Van-friendly spots:</strong> Clearance heights, level ground, parking space noted</span>
                </li>
                <li className="flex gap-3">
                  <Droplet className="w-6 h-6 text-brand-secondary flex-shrink-0" />
                  <span><strong>Full hookups:</strong> Water, electricity, and dump facilities available</span>
                </li>
                <li className="flex gap-3">
                  <Trees className="w-6 h-6 text-brand-primary flex-shrink-0" />
                  <span><strong>Scenic locations:</strong> Beaches, mountains, forests, and rivers</span>
                </li>
                <li className="flex gap-3">
                  <Leaf className="w-6 h-6 text-brand-sage flex-shrink-0" />
                  <span><strong>Pet-friendly:</strong> Most spots welcome your travel companions</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl border border-brand-primary/30 h-64 flex items-center justify-center">
              <div className="text-6xl">🏕️</div>
            </div>
          </div>
        </div>
      </section>

      {/* For Landowners Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-brand-accent/20 to-brand-earth/20 rounded-2xl border border-brand-accent/30 h-64 flex items-center justify-center order-2 md:order-1">
            <div className="text-6xl">🌱</div>
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h3 className="text-4xl font-black text-brand-primary">For Landowners</h3>
            <ul className="space-y-4 text-brand-earth">
              <li className="flex gap-3">
                <Zap className="w-6 h-6 text-brand-accent flex-shrink-0" />
                <span><strong>$20M insurance:</strong> Fully covered for caravan guests automatically</span>
              </li>
              <li className="flex gap-3">
                <HomeIcon className="w-6 h-6 text-brand-secondary flex-shrink-0" />
                <span><strong>Simple setup:</strong> 5-minute listing, no complicated applications</span>
              </li>
              <li className="flex gap-3">
                <Leaf className="w-6 h-6 text-brand-sage flex-shrink-0" />
                <span><strong>Genuine income:</strong> Average $3,200/year with weekly payouts</span>
              </li>
              <li className="flex gap-3">
                <Trees className="w-6 h-6 text-brand-primary flex-shrink-0" />
                <span><strong>Full control:</strong> Set dates, pricing, and house rules your way</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <div className="backdrop-blur-sm bg-white/60 border border-brand-primary/20 rounded-3xl p-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Listed Properties", icon: "🏞️" },
              { number: "2,000+", label: "Happy Travelers", icon: "🧳" },
              { number: "50+", label: "Australian Regions", icon: "🗺️" },
              { number: "98%", label: "Satisfaction Rate", icon: "⭐" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-5xl">{stat.icon}</div>
                <div className="text-3xl font-black text-brand-primary">
                  {stat.number}
                </div>
                <div className="text-brand-earth">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-3xl blur-xl"></div>
          <div className="relative backdrop-blur-sm bg-white/80 border border-brand-primary/30 rounded-3xl p-8 sm:p-16 text-center space-y-8">
            <h2 className="text-3xl sm:text-5xl font-black text-brand-primary">
              Ready to Hit the Open Road?
            </h2>
            <p className="text-xl text-brand-earth max-w-2xl mx-auto">
              Join the RoamMate community. Whether you're traveling or hosting, let's connect people with nature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search" className="px-10 py-4 bg-gradient-to-r from-brand-primary to-brand-sage text-white font-bold rounded-lg hover:shadow-xl transition transform hover:scale-105">
                Find Your Spot
              </Link>
              <Link href="/host" className="px-10 py-4 border-2 border-brand-primary text-brand-primary font-bold rounded-lg hover:bg-brand-primary/10 transition transform hover:scale-105">
                Become a Host
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-brand-primary/20 bg-white/50 backdrop-blur-sm mt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-black text-brand-primary mb-4">
                🏕️ RoamMate
              </div>
              <p className="text-brand-earth">Connecting caravan travelers with nature across Australia</p>
            </div>
            {[
              { title: "For Travelers", links: ["Find Spots", "Browse Map", "Community", "Safety"] },
              { title: "For Hosts", links: ["List Your Land", "Host Guide", "Insurance Info", "Earnings"] },
              { title: "Company", links: ["About Us", "Blog", "Contact", "Careers"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold text-brand-primary mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-brand-earth hover:text-brand-primary transition">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-brand-primary/20 pt-8 text-center text-brand-earth">
            <p>&copy; 2026 RoamMate. Connecting caravan travelers with nature.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
