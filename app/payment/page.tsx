"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BookingSummaryCardProps, PaymentMethodId } from "@/types/payment";
import {
  InfoIcon,
  CheckIcon,
  ChevronRight,
  LockIcon,
} from "@/components/ui/icons";
import { paymentMethods } from "@/components/paymentMethods";
import { Bookings } from "@/types/booking";
import {
  fetchBookingDetails,
  confirmPayAtHotelBooking,
} from "@/api/bookingAPI";
import { error } from "console";
import {
  PaymentMethodCard,
  SuccessScreen,
  BookingSummaryCard,
} from "@/components/paymentComponent/paymentMethodCard";

// ─────────────────────────────────────────────
// PAYMENT METHOD
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function PaymentPage(): React.ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("bookingId") || "abcdef";
  const [booking, setBooking] = useState<Bookings>();
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodId>("hotel");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBookingDetails(bookingId);
        setBooking(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleConfirm = async (): Promise<void> => {
    if (!agreed) return;

    try {
      setLoading(true);

      await confirmPayAtHotelBooking(bookingId);

      setConfirmed(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  if (confirmed) {
    return <SuccessScreen booking={booking} paymentMethod={selectedMethod} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F0EA] font-sans">
      {/* ── Header ── */}
      <header className="bg-[#1C1C1E] text-white px-4 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-[#C9A96E] hover:text-white transition-colors text-sm font-medium"
          >
            ← Back
          </button>
          <div className="w-px h-5 bg-white/20" />
          <span className="text-[#C9A96E] font-semibold tracking-wider text-sm uppercase">
            Secure Checkout
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/60">
          <LockIcon />
          <span>256-bit SSL</span>
        </div>
      </header>

      {/* ── Progress bar ── */}
      <div className="bg-[#1C1C1E] px-4 pb-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs">
          {(["Room Selection", "Guest Details", "Payment"] as const).map(
            (step, i) => (
              <div key={step} className="flex items-center gap-2">
                {i > 0 && <div className="w-6 h-px bg-white/20" />}
                <div
                  className={`flex items-center gap-1.5 ${i === 2 ? "text-[#C9A96E]" : "text-white/40"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                  ${
                    i < 2
                      ? "bg-[#C9A96E]/20 text-[#C9A96E]"
                      : i === 2
                        ? "bg-[#C9A96E] text-[#1C1C1E]"
                        : "bg-white/10"
                  }`}
                  >
                    {i < 2 ? <CheckIcon /> : i + 1}
                  </div>
                  <span className="hidden sm:inline font-medium">{step}</span>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* ── Main grid ── */}
      <main className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: payment methods */}
        <section className="lg:col-span-3 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
              Choose Payment Method
            </h1>
            <p className="text-sm text-[#6B6B6B] mt-1">
              Online payments will be available soon. Book now and pay at the
              hotel.
            </p>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                selected={selectedMethod === method.id}
                onSelect={() => {
                  if (!method.disabled) setSelectedMethod(method.id);
                }}
              />
            ))}
          </div>

          {/* Pay-at-hotel info box */}
          {selectedMethod === "hotel" && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2 animate-fadeIn">
              <div className="flex items-start gap-2 text-amber-800">
                <InfoIcon />
                <div className="text-sm">
                  <p className="font-semibold mb-1">
                    Pay at Hotel — How it works
                  </p>
                  <ul className="space-y-1 text-amber-700 text-xs">
                    <li>✓ No payment needed right now</li>
                    <li>✓ Pay the full amount at check-in</li>
                    <li>✓ Accepted: Cash, Card, UPI at front desk</li>
                    <li>✓ Free cancellation up to 24 hrs before check-in</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Terms checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group mt-2">
            <div
              role="checkbox"
              aria-checked={agreed}
              tabIndex={0}
              onClick={() => setAgreed((v) => !v)}
              onKeyDown={(e) => e.key === " " && setAgreed((v) => !v)}
              className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center
                transition-all duration-200 cursor-pointer
                ${
                  agreed
                    ? "bg-[#1C1C1E] border-[#1C1C1E]"
                    : "border-[#BBBBBB] bg-white group-hover:border-[#1C1C1E]"
                }`}
            >
              {agreed && <CheckIcon />}
            </div>
            <span className="text-xs text-[#6B6B6B] leading-relaxed">
              I agree to the{" "}
              <a
                href="#"
                className="text-[#1C1C1E] underline underline-offset-2"
              >
                Terms & Conditions
              </a>
              ,{" "}
              <a
                href="#"
                className="text-[#1C1C1E] underline underline-offset-2"
              >
                Privacy Policy
              </a>
              , and{" "}
              <a
                href="#"
                className="text-[#1C1C1E] underline underline-offset-2"
              >
                Cancellation Policy
              </a>
              .
            </span>
          </label>

          {/* CTA */}
          <button
            onClick={handleConfirm}
            disabled={!agreed || loading}
            className={`w-full py-4 rounded-2xl text-base font-bold tracking-wide
              flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
              ${
                agreed && !loading
                  ? "bg-[#1C1C1E] text-white hover:bg-[#C9A96E] hover:text-[#1C1C1E] active:scale-[0.98]"
                  : "bg-[#D0D0D0] text-[#9B9B9B] cursor-not-allowed"
              }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Confirming Booking…
              </>
            ) : (
              <>
                {selectedMethod === "hotel"
                  ? "Confirm Booking — Pay at Hotel"
                  : "Proceed to Pay"}
                <ChevronRight />
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#AAAAAA] flex items-center justify-center gap-1">
            <LockIcon /> Your booking is secured with end-to-end encryption
          </p>
        </section>

        {/* Right: summary */}
        <aside className="lg:col-span-2">
          <BookingSummaryCard booking={booking} />
        </aside>
      </main>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap");
        body {
          font-family: "DM Sans", sans-serif;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────
