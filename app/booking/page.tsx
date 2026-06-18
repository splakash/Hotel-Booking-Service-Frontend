import BookingPageClient from "./BookingPageClient";

interface PageProps {
  searchParams: {
    propertyId?: string;
    roomTypeId?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
    rooms?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  return (
    <BookingPageClient
      propertyId={searchParams.propertyId ?? ""}
      roomTypeId={searchParams.roomTypeId ?? ""}
      checkIn={searchParams.checkIn ?? ""}
      checkOut={searchParams.checkOut ?? ""}
      adults={Number(searchParams.adults ?? 2)}
      children={Number(searchParams.children ?? 0)}
      rooms={Number(searchParams.rooms ?? 1)}
    />
  );
}