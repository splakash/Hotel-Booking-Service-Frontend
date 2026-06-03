"use client";

import { useSearchParams } from "next/navigation";
import { Bookings } from "@/types/booking";
import { useState, useEffect } from "react";
import { fetchBookingDetails } from "@/api/bookingAPI";

export default function BookingDetailsPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("BookingCode") || "xyz";
  const [booking, setBooking] = useState<Bookings>();
  const [loading, setLoading] = useState(true);
  const [isCancel, setCancel] = useState(true);
  const discount = 0;
  const tax = 0;
  function updateCancelOption(status: string, checkinTime: string) {
    if (status === "PENDING PAYMENT") setCancel(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBookingDetails(bookingId);
        setBooking(response);
        updateCancelOption(response.status, response.checkIn);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar already exists */}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-primary-600 text-white px-6 py-5">
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <p className="text-sm opacity-90">Booking Code: {booking?.code}</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Hotel Details */}
            <section>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                Hotel Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Info label="Hotel Name" value={booking?.propertyName} />

                <Info
                  label="Address"
                  value={`${booking?.city}, ${booking?.state}, ${booking?.country}`}
                />
              </div>
            </section>

            {/* Booking Details */}
            <section>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                Booking Information
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <Info label="Booking Code" value={booking?.code} />

                <div>
                  <p className="text-sm text-gray-500">Status</p>

                  <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    {booking?.status}
                  </span>
                </div>

                <Info
                  label="Booking Made On"
                  value={
                    booking?.updatedAt
                      ? new Date(booking.updatedAt).toLocaleString()
                      : ""
                  }
                />
              </div>
            </section>

            {/* Stay Details */}
            <section>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                Stay Details
              </h2>

              <div className="grid md:grid-cols-4 gap-4">
                <Info label="Check In" value={booking?.checkIn} />

                <Info label="Check Out" value={booking?.checkOut} />

                <Info label="Adults" value={booking?.guestAdult} />

                <Info label="Children" value={booking?.guestChildren} />
              </div>
            </section>

            {/* Guest Details */}
            <section>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                Guest Information
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <Info label="Guest Name" value={booking?.contactName} />

                <Info label="Email" value={booking?.contactEmail} />

                <Info label="Contact Number" value={booking?.contactPhone} />
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                Payment Summary
              </h2>

              <div className="bg-gray-50 rounded-lg p-5">
                <div className="flex justify-between mb-2">
                  <span>Room Price</span>
                  <span>₹{booking?.totalAmount}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Tax</span>
                  <span>₹{tax}</span>
                </div>

                <div className="flex justify-between mb-2 text-green-600">
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span>₹{booking?.totalAmount}</span>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="bg-primary-600 text-white px-5 py-2 rounded-lg">
                Download Invoice
              </button>

              <button
                disabled={isCancel}
                className={`bg-red-500 text-white px-5 py-2 rounded-lg 
                ${isCancel ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}
                   `}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>

      <p className="font-medium">{value}</p>
    </div>
  );
}
