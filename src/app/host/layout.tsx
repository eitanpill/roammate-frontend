'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Home, Plus, Calendar, DollarSign, MessageSquare, LogOut, Menu, X } from 'lucide-react'

export default function HostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: '/host', label: 'Dashboard', icon: Home },
    { href: '/host/new-listing', label: 'New Listing', icon: Plus },
    { href: '/host/listings', label: 'My Properties', icon: Calendar },
    { href: '/host/earnings', label: 'Earnings', icon: DollarSign },
    { href: '/host/messages', label: 'Messages', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/40 border-b border-brand-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/host" className="text-2xl font-black text-brand-primary">
            🏕️ RoamMate Host
          </Link>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-brand-primary hover:text-brand-accent"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-5 gap-8">
        {/* Sidebar Navigation */}
        <div className={`${menuOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
          <nav className="sticky top-24 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-primary hover:bg-white/70 border border-transparent hover:border-brand-primary/30 transition"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-brand-earth hover:bg-red-50 border border-transparent hover:border-red-300 transition mt-6"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-4">
          {children}
        </div>
      </div>
    </div>
  )
}
