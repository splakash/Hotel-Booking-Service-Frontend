import Link from "next/link"
import { cookies } from "next/headers"
import MobileMenu from "./MobileMenu"
import { logout } from "@/lib/actions/logout"

export default function Navbar() {
  const token = cookies().get("token")

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
            {!token ? (<Link href="/login" className="text-gray-700 hover:text-primary-600">
              My Bookings
            </Link>):
            <Link href="/bookings" className="text-gray-700 hover:text-primary-600">
              My Bookings
            </Link>}
            <Link href="/error_page" className="text-gray-700 hover:text-primary-600">
              Admin
            </Link>
            <Link href="/docs" className="text-gray-700 hover:text-primary-600">
              Docs
            </Link>

            {!token ? (
              <Link
                href="/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg rounded"
              >
                Login
              </Link>
            ) : (
              <form action={logout}>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </form>
            )}
          </div>

          {/* Mobile Menu */}
          <MobileMenu isLoggedIn={!!token} />
        </div>
      </div>
    </nav>
  )
}
