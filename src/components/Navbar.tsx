'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Menu, X, Camera, LogOut, UserPlus, LogIn, FilePlus } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const isLoading = status === 'loading';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-amber-600 font-bold text-xl">
            <Camera className="w-6 h-6" />
            <span>[PHOTO]</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-amber-600 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">
              Contact
            </Link>

            {isLoading ? null : session ? (
              <>
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin/images" className="text-gray-700 hover:text-amber-600 transition-colors">
                    Admin
                  </Link>
                )}
                <Link href="/blog/new" className="flex items-center gap-1 text-gray-700 hover:text-amber-600 transition-colors">
                  <FilePlus className="w-4 h-4" />
                  New Post
                </Link>
                <span className="text-gray-500 text-sm">{session.user?.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center gap-1 text-gray-700 hover:text-amber-600 transition-colors">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link href="/register" className="flex items-center gap-1 btn-primary">
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <Link href="/" className="block text-gray-700 hover:text-amber-600 py-1">
              Home
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-amber-600 py-1">
              About
            </Link>
            <Link href="/blog" className="block text-gray-700 hover:text-amber-600 py-1">
              Blog
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-amber-600 py-1">
              Contact
            </Link>

            {session ? (
              <>
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin/images" className="block text-gray-700 hover:text-amber-600 py-1">
                    Admin
                  </Link>
                )}
                <Link href="/blog/new" className="block text-gray-700 hover:text-amber-600 py-1">
                  New Post
                </Link>
                <span className="block text-gray-500 text-sm">{session.user?.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="block text-red-600 hover:text-red-700 py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-700 hover:text-amber-600 py-1">
                  Login
                </Link>
                <Link href="/register" className="block btn-primary text-center">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
