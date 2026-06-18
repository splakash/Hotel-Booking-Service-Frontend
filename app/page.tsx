import HomePageClient from "@/components/Home/HomePageClient";
import { PageProps } from "@/types/pageProp";

export default function Page({ searchParams }: PageProps) {
  return (
    <HomePageClient
      initialLocation={searchParams.location ?? ""}
      initialCheckIn={searchParams.checkIn ?? ""}
      initialCheckOut={searchParams.checkOut ?? ""}
      initialAdults={Number(searchParams.adults ?? 2)}
      initialChildren={Number(searchParams.children ?? 0)}
      initialRooms={Number(searchParams.rooms ?? 1)}
    />
  );
}
