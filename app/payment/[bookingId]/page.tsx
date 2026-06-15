import PaymentClient from "./PaymentClient";

type PaymentPageProps = {
  params: {
    bookingId: string;
  };
};

export default function PaymentPage({ params }: PaymentPageProps) {
  return <PaymentClient bookingId={params.bookingId} />;
}
