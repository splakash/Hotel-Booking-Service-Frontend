"use client";

import { useEffect, useState } from "react";
import { Bookings } from "@/types/booking";
import { useAuth } from "@/authContext";
import { BookingDetailsPerCustomer } from "@/api/bookingAPI";
import { useRouter } from "next/navigation";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BookingDetailsPerCustomer();
        setBookings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const redirectToBookingDetails = (code: string) => {
    router.push(`/BookingsDetails/${code}`);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-gray-600">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-600 text-lg mb-2">No bookings found</p>
            <p className="text-gray-500">
              Start exploring our properties to make your first booking!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.code}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {booking.propertyName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          booking.status,
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {booking.city +
                        ", " +
                        booking.state +
                        ", " +
                        booking.country}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>
                        <strong>Booking Code:</strong> {booking.code}
                      </span>
                      <span>
                        <strong>Check-in:</strong>{" "}
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </span>
                      <span>
                        <strong>Check-out:</strong>{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                      <span>
                        <strong>Guests:</strong> {booking.guestAdult}
                      </span>
                      {/* <span>
                        <strong>Rooms:</strong> {booking.rooms}
                      </span> */}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold text-primary-600 mb-2">
                      ${booking.totalAmount.toLocaleString()}
                    </div>
                    <button
                      onClick={() => redirectToBookingDetails(booking.code)}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
