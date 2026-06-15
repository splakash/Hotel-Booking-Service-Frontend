"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BookingSummary from "@/components/BookingSummary";
import { useAuth } from "@/authContext";
import { getPropertyDetails } from "@/lib/services/property.service";
import { BookingPayload } from "@/types/booking";
import { saveBookingInfo } from "@/api/bookingAPI";

interface Property {
  id: string;
  name: string;
  location: string;
}

interface RoomType {
  id: string;
  name: string;
  pricePerNight: number;
}

export default function BookingClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: user?.username || "",
    phone: "",
  });

  const propertyId = searchParams.get("propertyId");
  const roomTypeId = searchParams.get("roomTypeId");
  const checkIn =
    searchParams.get("checkIn") || new Date().toISOString().split("T")[0];
  const checkOut =
    searchParams.get("checkOut") ||
    new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const rooms = parseInt(searchParams.get("rooms") || "1");

  useEffect(() => {
    const fetchBookingData = async () => {
      setLoading(true);
      try {
        const propertyResponse = await getPropertyDetails(propertyId ?? "");

        const Property: Property = {
          id: propertyResponse.propertyId || "0",
          name: propertyResponse.propertyName,
          location: propertyResponse.address,
        };
        const RoomType: RoomType = {
          id: "",
          name: "",
          pricePerNight: 0,
        };
        for (let i = 0; i < propertyResponse.roomTypes.length; i++) {
          if (propertyResponse.roomTypes[i].id == roomTypeId) {
            ((RoomType.id = roomTypeId),
              (RoomType.name = propertyResponse.roomTypes[i].name),
              (RoomType.pricePerNight =
                propertyResponse.roomTypes[i].pricePerNight));
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
        setProperty(Property);
        setRoomType(RoomType);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId && roomTypeId) {
      fetchBookingData();
    } else {
      router.push("/properties");
    }
  }, [propertyId, roomTypeId, router]);

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const basePrice = roomType ? roomType.pricePerNight * nights * rooms : 0;
  const taxes = basePrice * 0.12;
  const total_price = basePrice + taxes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload: BookingPayload = {
        propertyId: propertyId || "",
        roomTypeId: roomTypeId || "",
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guestAdult: adults || 2,
        guestChildren: children || 0,
        noOfRooms: rooms,
        contactName: formData.name,
        contactEmail: formData.email,
        contactPhone: Number(formData.phone),
        totalAmount: basePrice,
      };

      const bookingId = await saveBookingInfo(payload);
      router.push(`/payment/${bookingId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-gray-600">Loading booking details...</div>
      </div>
    );
  }

  if (!property || !roomType) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-gray-600">Invalid booking information</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Complete Your Booking
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Guest Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    readOnly
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors ${
                      submitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {submitting
                      ? "Redirect to Payment page..."
                      : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Payment Information
              </h2>
              <p className="text-gray-600 mb-4">
                Payment will be processed upon check-in. No charges will be made
                at this time.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  💳 Accepted payment methods: Credit Card, Debit Card, PayPal
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingSummary
                checkIn={checkIn}
                checkOut={checkOut}
                code="abc"
                propertyName={property.name}
                city={property.location}
                state={property.location}
                country={property.location}
                guestAdult={adults}
                guestChildren={children}
                status="cancelled"
                roomTypeName={roomType.name}
                totalAmount={basePrice}
                contactEmail="abc"
                contactName="abc"
                contactPhone="abc"
                updatedAt={checkOutDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
