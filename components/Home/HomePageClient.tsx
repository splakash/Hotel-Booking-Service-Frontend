"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import HeroSection from "./HeroSection";
import SearchSection from "./SearchSection";
import FiltersSidebar from "./FiltersSideBar";
import PropertyResults from "./PropertyResult";

import FeaturesSection from "@/components/FeaturesSection";
import Chatbot from "@/components/chatbot";

import { usePropertyList } from "@/hooks/usePropertyList";

interface Props {
  initialLocation: string;
  initialCheckIn: string;
  initialCheckOut: string;
  initialAdults: number;
  initialChildren: number;
  initialRooms: number;
}

interface SearchFormState {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

export default function HomePageClient({
  initialLocation,
  initialCheckIn,
  initialCheckOut,
  initialAdults,
  initialChildren,
  initialRooms,
}: Props) {
  const router = useRouter();

  const [searchForm, setSearchForm] = useState<SearchFormState>({
    location: initialLocation,
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    adults: initialAdults,
    children: initialChildren,
    rooms: initialRooms,
  });

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    roomType: "",
    rating: "",
  });

  const {
    properties,
    loading,
    searchProperties,
  } = usePropertyList();

  const updateField = (
    field: keyof SearchFormState,
    value: string | number
  ) => {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();

    if (searchForm.location) {
      params.set("location", searchForm.location);
    }

    if (searchForm.checkIn) {
      params.set("checkIn", searchForm.checkIn);
    }

    if (searchForm.checkOut) {
      params.set("checkOut", searchForm.checkOut);
    }

    params.set("adults", String(searchForm.adults));
    params.set("children", String(searchForm.children));
    params.set("rooms", String(searchForm.rooms));

    router.push(`/?${params.toString()}`);

    await searchProperties(
      searchForm.checkIn,
      searchForm.checkOut,
      searchForm.location
    );
  };

  /**
   * Auto-search when page is opened
   * with existing query params.
   *
   * Example:
   * /?location=Bangalore&checkIn=2026-06-20&checkOut=2026-06-22
   */
  useEffect(() => {
    if (
      searchForm.location &&
      searchForm.checkIn &&
      searchForm.checkOut
    ) {
      searchProperties(
        searchForm.checkIn,
        searchForm.checkOut,
        searchForm.location
      );
    }
  }, []);

  const filteredProperties = properties.filter((property) => {
    if (
      filters.minPrice &&
      property.lowestPrice < Number(filters.minPrice)
    ) {
      return false;
    }

    if (
      filters.maxPrice &&
      property.lowestPrice > Number(filters.maxPrice)
    ) {
      return false;
    }

    if (
      filters.rating &&
      property.rating < Number(filters.rating)
    ) {
      return false;
    }

    return true;
  });

  return (
    <>
      <HeroSection />

      <SearchSection
        searchForm={searchForm}
        updateField={updateField}
        onSearch={handleSearch}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          <FiltersSidebar
            filters={filters}
            onFiltersChange={setFilters}
          />

          <PropertyResults
            loading={loading}
            properties={filteredProperties}
          />

        </div>
      </div>

      <FeaturesSection />
      <Chatbot />
    </>
  );
}