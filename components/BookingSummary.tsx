import { Bookings } from "@/types/booking";

export default function BookingSummary({
  code,
  propertyName,
  roomTypeName,
  city,
  country,
  state,
  checkIn,
  checkOut,
  totalAmount,
  guestAdult,
  guestChildren,
  updatedAt,
}: Bookings) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const propertyLocation = `${city} ${state} ${country}`;
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const BaseAmount = totalAmount;
  const taxes = BaseAmount * 0.12;
  const finalTotalAmount = BaseAmount + taxes;
  const rooms = 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Summary</h2>

      <div className="space-y-4">
        {/* Property Info */}
        <div className="border-b pb-4">
          <h3 className="font-semibold text-gray-800">{propertyName}</h3>
          <p className="text-gray-600 text-sm">{propertyLocation}</p>
          <p className="text-gray-600 text-sm mt-1">Room: {roomTypeName}</p>
        </div>

        {/* Stay Details */}
        <div className="border-b pb-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Check-in:</span>
            <span className="font-medium">
              {checkInDate.toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check-out:</span>
            <span className="font-medium">
              {checkOutDate.toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nights:</span>
            <span className="font-medium">{nights}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Guests:</span>
            <span className="font-medium">
              {guestAdult} Adult{guestAdult !== 1 ? "s" : ""}
              {guestChildren > 0 &&
                `, ${guestChildren} Child${guestChildren !== 1 ? "ren" : ""}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rooms:</span>
            <span className="font-medium">{rooms}</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Base Price ({nights} nights):</span>
            <span className="font-medium">${BaseAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes & Fees:</span>
            <span className="font-medium">${taxes.toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary-600">${finalTotalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
