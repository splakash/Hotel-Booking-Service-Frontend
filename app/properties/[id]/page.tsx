import { Suspense } from "react";
import PropertyDetailsClient from "./PropertyDetailsClient";

type PropertyDetailsPageProps = {
  params: {
    id: string;
  };
};

export default function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-gray-600">Loading property details...</div>
        </div>
      }
    >
      <PropertyDetailsClient propertyId={params.id} />
    </Suspense>
  );
}
