"use client";

import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import { logout } from "@/lib/actions/logout";
import { useAuth } from "@/authContext";

export default function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">
              BookStay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600">
              Home
            </Link>

            {!isLoggedIn ? (
              <Link
                href="/login"
                className="text-gray-700 hover:text-primary-600"
              >
                My Bookings
              </Link>
            ) : (
              <Link
                href="/bookings"
                className="text-gray-700 hover:text-primary-600"
              >
                My Bookings
              </Link>
            )}

            <Link
              href="/error_page"
              className="text-gray-700 hover:text-primary-600"
            >
              Admin
            </Link>

            <Link href="/docs" className="text-gray-700 hover:text-primary-600">
              Docs
            </Link>

            {!isLoggedIn ? (
              <Link
                href="/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>
            ) : (
              <ProfileMenu
                user={{
                  name: "name",
                  email: "email",
                }}
                logout={logout}
              />
            )}
          </div>

          {/* Mobile Menu */}
          <MobileMenu isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </nav>
  );
}
