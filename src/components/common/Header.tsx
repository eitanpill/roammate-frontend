'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RM</span>
            </div>
            <span className="text-xl font-bold text-brand-primary hidden sm:inline">RoamMate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/search" className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition">
              Explore
            </Link>
            <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition">
              Dashboard
            </Link>
            <Link href="/admin" className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition">
              Admin
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Auth Section */}
            {session?.user ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">{session.user.email}</span>
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:bg-opacity-90 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden md:inline-block px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:bg-opacity-90 transition"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-slide-in">
            <Link
              href="/search"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              Explore
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              Admin
            </Link>
            {session?.user ? (
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
                className="w-full text-left px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:bg-opacity-90 transition"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="block px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:bg-opacity-90 transition"
              >
                Sign In
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
