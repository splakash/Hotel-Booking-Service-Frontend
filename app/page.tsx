import { Suspense } from "react";
import HomeClient from "./HomeClient";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <HomeClient />
    </Suspense>
  );
}
