import BookingDetailsClient from "@/api/Clients/BookingDetailsClient";

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function BookingDetails({ params }: PageProps) {
  const { code } = await params;
  return <BookingDetailsClient bookingId={code} />;
}
