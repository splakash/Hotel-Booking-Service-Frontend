"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DatePicker from "@/components/DatePicker";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import FeaturesSection from "@/components/FeaturesSection";
import { useProperties } from "@/hooks/useProperties";
import { usePropertyList } from "@/hooks/usePropertyList";


export default function Home() {
  const searchParams = useSearchParams();

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    roomType: "",
    rating: "",
  });

  const urlLocation = searchParams?.get("location") || "";
  const urlCheckIn = searchParams?.get("checkIn") || "";
  const urlCheckOut = searchParams?.get("checkOut") || "";
  const urlAdults = searchParams?.get("adults") || "2";
  const urlChildren = searchParams?.get("children") || "0";
  const urlRooms = searchParams?.get("rooms") || "1";

  useEffect(() => {
    setLocation(urlLocation);
    setCheckIn(urlCheckIn);
    setCheckOut(urlCheckOut);
    setAdults(parseInt(urlAdults));
    setChildren(parseInt(urlChildren));
    setRooms(parseInt(urlRooms));
  }, [urlLocation, urlCheckIn, urlCheckOut, urlAdults, urlChildren, urlRooms]);

  const { properties, loading, searchProperties } = usePropertyList(
    checkIn,
    checkOut,
    location,
    [urlLocation, urlCheckIn, urlCheckOut],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
      location: location || "anywhere",
      checkIn: checkIn || new Date().toISOString().split("T")[0],
      checkOut:
        checkOut || new Date(Date.now() + 86400000).toISOString().split("T")[0],
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString(),
    });

    window.history.pushState({}, "", `/?${params.toString()}`);

    if (checkIn && checkOut && location) {
      await searchProperties();
    }
  };

  const filteredProperties = properties.filter((property) => {
    if (filters.minPrice && property.lowestPrice < parseInt(filters.minPrice))
      return false;
    if (filters.maxPrice && property.lowestPrice > parseInt(filters.maxPrice))
      return false;
    if (filters.rating && property.rating < parseFloat(filters.rating))
      return false;
    return true;
  });

  // ✅ UI BELOW REMAINS EXACT SAME
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Discover amazing hotels and book your next adventure
            </p>
          </div>
        </div>
      </div>

      {/* Search Form - Single Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-lg shadow-2xl p-4 md:p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-3 md:gap-2 items-end">
              {/* Location */}
              <div className="flex-1 w-full md:w-auto">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Check-in */}
              <div className="flex-1 w-full md:w-auto">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <DatePicker
                  value={checkIn}
                  onChange={setCheckIn}
                  placeholder="Check-in date"
                />
              </div>

              {/* Check-out */}
              <div className="flex-1 w-full md:w-auto">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <DatePicker
                  value={checkOut}
                  onChange={setCheckOut}
                  placeholder="Check-out date"
                  minDate={checkIn || undefined}
                />
              </div>

              {/* Adults */}
              <div className="w-24">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Adults
                </label>
                <input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Children */}
              <div className="w-24">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Children
                </label>
                <input
                  type="number"
                  min="0"
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Rooms */}
              <div className="w-24">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Rooms
                </label>
                <input
                  type="number"
                  min="1"
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-semibold whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <PropertyFilters filters={filters} onFiltersChange={setFilters} />

          {/* Properties Grid */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Available Properties
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-600">Loading properties...</div>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600 text-lg">
                  No properties found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
}
