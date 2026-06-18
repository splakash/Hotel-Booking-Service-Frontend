import PaymentPage from "@/api/Clients/PaymentPage";
interface PageProps {
  params: {
    code: string;
  };
}

export default async function payment({ params }: PageProps) {
  const { code } = await params;

  return <PaymentPage bookingId={code} />;
}
