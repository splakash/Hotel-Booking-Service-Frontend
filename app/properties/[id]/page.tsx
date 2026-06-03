"use client";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useProperty } from "@/hooks/useProperty";
import PriceBadge from "@/components/PriceBadge";
import RoomTypeCard from "@/components/RoomTypeCard";
import { RoomType, ApiRoomType } from "@/types/roomType";
import { Property } from "@/types/property";
import { useAuth } from "@/authContext";

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { property, loading } = useProperty(params.id as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isLoggedIn } = useAuth();
 
  const handleRoomSelect = (roomType: RoomType) => {
    // or wherever you store it
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    handleSelectRoom(roomType);
  };
  const handleSelectRoom = (roomType: RoomType) => {
    const checkIn =
      searchParams.get("checkIn") || new Date().toISOString().split("T")[0];
    const checkOut =
      searchParams.get("checkOut") ||
      new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const adults = searchParams.get("adults") || "2";
    const children = searchParams.get("children") || "0";
    const rooms = searchParams.get("rooms") || "1";

    router.push(
      `/booking?propertyId=${params.id}&roomTypeId=${roomType.id}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&rooms=${rooms}`,
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-gray-600">Loading property details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-gray-600">Property not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Property Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {property.propertyName}
              </h1>
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
                {property.address}
              </p>
              {property.rating > 0 && (
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="text-gray-700 font-medium">
                    {property.rating.toFixed(1)} Rating
                  </span>
                </div>
              )}
            </div>
            <div className="text-right">
              <PriceBadge price={property.lowestPrice} />
            </div>
          </div>
          <p className="text-gray-700 mb-4">{property.description}</p>

          {/* Contact Information */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {property.contactEmail}
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {property.contactPhone}
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 md:row-span-2">
              <img
                src={property.images[selectedImage] || property.images[0]}
                alt={property.propertyName}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {property.images.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => setSelectedImage(index + 1)}
              >
                <img
                  src={image}
                  alt={`${property.propertyName} ${index + 2}`}
                  className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Room Types */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Available Room Types
          </h2>
          {property.roomTypes.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">
                No room types available for this property.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {property.roomTypes.map((roomType: RoomType) => (
                <RoomTypeCard
                  key={roomType.id}
                  id={roomType.id}
                  name={roomType.name}
                  description={roomType.description}
                  occupancy={roomType.occupancy}
                  pricePerNight={roomType.pricePerNight}
                  available={roomType.available}
                  totalRoom={roomType.totalRoom}
                  onSelect={() => handleRoomSelect(roomType)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Policies Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Policies</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Check-in / Check-out
              </h3>
              <p className="text-gray-600">
                Check-in: 3:00 PM | Check-out: 11:00 AM
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Cancellation Policy
              </h3>
              <p className="text-gray-600">
                Free cancellation up to 24 hours before check-in. Cancellations
                made less than 24 hours before check-in will be charged 50% of
                the total booking amount.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Pet Policy</h3>
              <p className="text-gray-600">
                Pets are welcome with an additional fee of $25 per night.
                Maximum 2 pets per room.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Smoking Policy
              </h3>
              <p className="text-gray-600">
                This is a non-smoking property. Smoking is not permitted in any
                area of the hotel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
