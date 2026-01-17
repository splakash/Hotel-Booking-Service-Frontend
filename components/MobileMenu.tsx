"use client"

import { useState } from "react"
import Link from "next/link"

export default function MobileMenu({
  isLoggedIn,
}: {
  isLoggedIn: boolean
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 space-y-3">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/bookings" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
          <Link href="/admin/properties" onClick={() => setIsMenuOpen(false)}>Admin</Link>
          <Link href="/docs" onClick={() => setIsMenuOpen(false)}>Docs</Link>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="block bg-primary-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <Link
              href="/"
              className="block bg-primary-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </>
  )
}
