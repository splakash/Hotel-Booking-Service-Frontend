export interface Booking {
  id: string
  bookingCode: string
  propertyName: string
  propertyLocation: string
  checkIn: string
  checkOut: string
  status: 'confirmed' | 'pending' | 'cancelled'
  totalAmount: number
  guests: number
  rooms: number
}