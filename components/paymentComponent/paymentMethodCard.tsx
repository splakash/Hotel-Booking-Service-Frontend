import { PaymentMethodCardProps } from "@/types/payment";
import { SuccessScreenProps, BookingSummaryCardProps } from "@/types/payment";
import { useRouter } from "next/navigation";
export function PaymentMethodCard({
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



export function SuccessScreen({
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
            A confirmation has been sent to{" "}
            {booking.contactEmail || "your email"}
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center">
            <p className="text-xs text-[#999] uppercase tracking-wider">
              Booking Reference
            </p>
            <p className="text-2xl font-mono font-bold text-[#1C1C1E] mt-1 tracking-widest">
              {booking.code}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { label: "Guest", value: booking.contactName },
                { label: "Room", value: booking.roomTypeName },
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
              <strong>₹{booking.totalAmount.toLocaleString("en-IN")}</strong> to
              be paid at check-in
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-700 text-center">
              ✅ Payment of{" "}
              <strong>₹{booking.totalAmount.toLocaleString("en-IN")}</strong>{" "}
              received successfully
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



export function BookingSummaryCard({
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
            {booking.propertyName}
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
              {booking.roomTypeName}
            </p>
          </div>
          <div className="bg-[#F5F0EA] px-2 py-1 rounded-lg text-xs font-medium text-[#555] whitespace-nowrap">
            {booking.guestAdult} Guest{booking.guestAdult !== 1 ? "s" : ""}
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

        {/* <div className="flex items-center justify-center">
          <div className="text-xs text-[#888] bg-[#F5F0EA] px-3 py-1 rounded-full">
            {nights} Night{nights !== 1 ? "s" : ""} stay
          </div>
        </div> */}

        {/* <div className="border-t border-[#EEE8DE] pt-4 space-y-2">
          <div className="flex justify-between text-sm text-[#666]">
            <span>Room rate × {nights} nights</span>
            <span>
              ₹{(booking.roomRate * nights).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between text-sm text-[#666]">
            <span>Taxes & fees (18%)</span>
            <span>₹{booking.taxes.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between font-bold text-base text-[#1C1C1E] border-t border-dashed border-[#DDD] pt-2 mt-1">
            <span>Total Amount</span>
            <span className="text-[#C9A96E]">
              ₹{booking.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div> */}

        <div className="bg-[#F5F0EA] rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-[#888]">Booking Ref.</span>
          <span className="text-xs font-mono font-bold text-[#1C1C1E] tracking-wider">
            {booking.code}
          </span>
        </div>
      </div>
    </div>
  );
}

