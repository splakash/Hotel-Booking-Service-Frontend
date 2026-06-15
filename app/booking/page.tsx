import { Suspense } from "react";
import BookingClient from "./BookingClient";

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-gray-600">Loading booking details...</div>
        </div>
      }
    >
      <BookingClient />
    </Suspense>
  );
}
