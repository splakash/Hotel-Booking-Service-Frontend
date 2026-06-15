import BookingDetailsClient from "./BookingDetailsClient";

type BookingDetailsPageProps = {
  params: {
    bookingCode: string;
  };
};

export default function BookingDetailsPage({
  params,
}: BookingDetailsPageProps) {
  return <BookingDetailsClient bookingCode={params.bookingCode} />;
}
