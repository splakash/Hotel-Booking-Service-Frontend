"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  PaymentMethod,
  PaymentMethodCardProps,
  BookingSummaryCardProps,
  SuccessScreenProps,
  BookingSummary,
  PaymentMethodId,
} from "@/types/payment";
import {
  InfoIcon,
  CheckIcon,
  ChevronRight,
  LockIcon,
} from "@/components/ui/icons";
import { paymentMethods } from "@/components/paymentMethods";
// ─────────────────────────────────────────────
// PAYMENT METHODS CONFIG
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
// HELPERS — parse booking data from URL params
// ─────────────────────────────────────────────

/**
 * Reads URLSearchParams and returns a BookingSummary.
 * Falls back to demo data for any missing field so the page
 * never crashes during local development.
 */
function parseBookingFromParams(params: URLSearchParams): BookingSummary {
  const roomRate = Number(params.get("roomRate") ?? 4500);
  const nights = Number(params.get("nights") ?? 3);
  const taxes = Math.round(roomRate * nights * 0.18);
  const total = roomRate * nights + taxes;

  return {
    hotelName: params.get("hotelName") ?? "The Grand Meridian",
    roomType: params.get("roomType") ?? "Deluxe Sea View Suite",
    checkIn: params.get("checkIn") ?? "28 Apr 2026",
    checkOut: params.get("checkOut") ?? "01 May 2026",
    nights,
    guests: Number(params.get("guests") ?? 2),
    roomRate,
    taxes: Number(params.get("taxes") ?? taxes),
    total: Number(params.get("total") ?? total),
    bookingRef: params.get("bookingRef") ?? "GMH-20264821",
    guestName: params.get("guestName") ?? "Guest",
    guestEmail: params.get("guestEmail") ?? "",
  };
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function PaymentPage(): React.ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Derive booking data from URL query string sent by the booking page
  const booking = parseBookingFromParams(searchParams);

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodId>("hotel");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = (): void => {
    if (!agreed) return;
    setLoading(true);
    // TODO: replace setTimeout with your real booking API call
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 2000);
  };

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

function PaymentMethodCard({
  method,
  selected,
  onSelect,
}: PaymentMethodCardProps): React.ReactElement {
  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl border-2 p-4 flex items-center gap-4 transition-all duration-200
        ${
          method.disabled
            ? "opacity-50 cursor-not-allowed bg-white border-[#E0E0E0]"
            : selected
              ? "bg-white border-[#1C1C1E] shadow-md cursor-pointer"
              : "bg-white border-[#E8E2D9] hover:border-[#C9A96E] cursor-pointer"
        }`}
    >
      {/* Radio dot */}
      <div
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
        ${selected && !method.disabled ? "border-[#1C1C1E]" : "border-[#CCCCCC]"}`}
      >
        {selected && !method.disabled && (
          <div className="w-2.5 h-2.5 rounded-full bg-[#1C1C1E]" />
        )}
      </div>

      {/* Icon */}
      <div className="flex-shrink-0">{method.icon}</div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#1C1C1E] text-sm">{method.label}</p>
        <p className="text-xs text-[#888888] mt-0.5">{method.description}</p>
        {method.subOptions && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {method.subOptions.map((opt) => (
              <span
                key={opt}
                className="text-[10px] bg-[#F0EDE8] text-[#666] px-1.5 py-0.5 rounded-full"
              >
                {opt}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Badge */}
      <span
        className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full
        ${method.disabled ? "bg-[#F0EDE8] text-[#999]" : "bg-emerald-100 text-emerald-700"}`}
      >
        {method.badge}
      </span>

      {method.disabled && (
        <div className="absolute inset-0 rounded-2xl">
          <span className="sr-only">Payment coming soon</span>
        </div>
      )}
    </div>
  );
}

function BookingSummaryCard({
  booking,
}: BookingSummaryCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-sm sticky top-24">
      <div className="h-32 bg-gradient-to-br from-[#1C1C1E] to-[#4A4035] flex items-end p-4">
        <div>
          <p className="text-[#C9A96E] text-xs font-semibold tracking-widest uppercase">
            Your Booking
          </p>
          <p className="text-white font-bold text-lg leading-tight">
            {booking.hotelName}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-[#999] font-medium uppercase tracking-wider">
              Room
            </p>
            <p className="text-sm font-semibold text-[#1C1C1E] mt-0.5">
              {booking.roomType}
            </p>
          </div>
          <div className="bg-[#F5F0EA] px-2 py-1 rounded-lg text-xs font-medium text-[#555] whitespace-nowrap">
            {booking.guests} Guest{booking.guests !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(
            [
              {
                label: "Check-in",
                value: booking.checkIn,
                sub: "From 2:00 PM",
              },
              {
                label: "Check-out",
                value: booking.checkOut,
                sub: "By 11:00 AM",
              },
            ] as const
          ).map(({ label, value, sub }) => (
            <div key={label} className="bg-[#F5F0EA] rounded-xl p-3">
              <p className="text-[10px] text-[#999] uppercase tracking-wider font-medium">
                {label}
              </p>
              <p className="text-sm font-bold text-[#1C1C1E] mt-0.5">{value}</p>
              <p className="text-[10px] text-[#888]">{sub}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <div className="text-xs text-[#888] bg-[#F5F0EA] px-3 py-1 rounded-full">
            {booking.nights} Night{booking.nights !== 1 ? "s" : ""} stay
          </div>
        </div>

        <div className="border-t border-[#EEE8DE] pt-4 space-y-2">
          <div className="flex justify-between text-sm text-[#666]">
            <span>Room rate × {booking.nights} nights</span>
            <span>
              ₹{(booking.roomRate * booking.nights).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between text-sm text-[#666]">
            <span>Taxes & fees (18%)</span>
            <span>₹{booking.taxes.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between font-bold text-base text-[#1C1C1E] border-t border-dashed border-[#DDD] pt-2 mt-1">
            <span>Total Amount</span>
            <span className="text-[#C9A96E]">
              ₹{booking.total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="bg-[#F5F0EA] rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-[#888]">Booking Ref.</span>
          <span className="text-xs font-mono font-bold text-[#1C1C1E] tracking-wider">
            {booking.bookingRef}
          </span>
        </div>
      </div>
    </div>
  );
}

function SuccessScreen({
  booking,
  paymentMethod,
}: SuccessScreenProps): React.ReactElement {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F5F0EA] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-br from-[#1C1C1E] to-[#3A3228] p-8 text-center">
          <div className="w-16 h-16 bg-[#C9A96E] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
          <p className="text-[#C9A96E] text-sm mt-1">
            A confirmation has been sent to {booking.guestEmail || "your email"}
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center">
            <p className="text-xs text-[#999] uppercase tracking-wider">
              Booking Reference
            </p>
            <p className="text-2xl font-mono font-bold text-[#1C1C1E] mt-1 tracking-widest">
              {booking.bookingRef}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { label: "Guest", value: booking.guestName },
                { label: "Room", value: booking.roomType },
                { label: "Check-in", value: booking.checkIn },
                { label: "Check-out", value: booking.checkOut },
              ] as const
            ).map(({ label, value }) => (
              <div key={label} className="bg-[#F5F0EA] rounded-xl p-3">
                <p className="text-[10px] text-[#999] uppercase tracking-wider">
                  {label}
                </p>
                <p className="text-xs font-semibold text-[#1C1C1E] mt-0.5">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {paymentMethod === "hotel" ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 text-center">
              💳 Amount of{" "}
              <strong>₹{booking.total.toLocaleString("en-IN")}</strong> to be
              paid at check-in
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-700 text-center">
              ✅ Payment of{" "}
              <strong>₹{booking.total.toLocaleString("en-IN")}</strong> received
              successfully
            </div>
          )}

          <button
            onClick={() => router.push("/")}
            className="w-full py-3.5 bg-[#1C1C1E] text-white rounded-2xl font-semibold text-sm
              hover:bg-[#C9A96E] hover:text-[#1C1C1E] transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap");
        body {
          font-family: "DM Sans", sans-serif;
        }
      `}</style>
    </div>
  );
}
