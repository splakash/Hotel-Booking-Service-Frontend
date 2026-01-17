interface BookingSummaryProps {
  propertyName: string
  propertyLocation: string
  roomType: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  rooms: number
  basePrice: number
  taxes: number
  total: number
}

export default function BookingSummary({
  propertyName,
  propertyLocation,
  roomType,
  checkIn,
  checkOut,
  adults,
  children,
  rooms,
  basePrice,
  taxes,
  total,
}: BookingSummaryProps) {
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Summary</h2>
      
      <div className="space-y-4">
        {/* Property Info */}
        <div className="border-b pb-4">
          <h3 className="font-semibold text-gray-800">{propertyName}</h3>
          <p className="text-gray-600 text-sm">{propertyLocation}</p>
          <p className="text-gray-600 text-sm mt-1">Room: {roomType}</p>
        </div>

        {/* Stay Details */}
        <div className="border-b pb-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Check-in:</span>
            <span className="font-medium">{checkInDate.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check-out:</span>
            <span className="font-medium">{checkOutDate.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nights:</span>
            <span className="font-medium">{nights}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Guests:</span>
            <span className="font-medium">
              {adults} Adult{adults !== 1 ? 's' : ''}
              {children > 0 && `, ${children} Child${children !== 1 ? 'ren' : ''}`}
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
            <span className="font-medium">${basePrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes & Fees:</span>
            <span className="font-medium">${taxes.toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary-600">${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

