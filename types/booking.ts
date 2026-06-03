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

export interface BookingPayload  {
        propertyId: string,
        roomTypeId: string,
        checkIn:Date,
        checkOut:Date,
        guestAdult:number,
        guestChildren:number,
        noOfRooms:number
        contactName: string,
        contactEmail: string,
        totalAmount: number,
        contactPhone:number
}

export interface Bookings {
  checkIn: string
  checkOut: string
  code: string
  contactEmail:string
  contactName:string
  contactPhone:string
  propertyName: string
  updatedAt:Date
  guestAdult:number
  guestChildren:number
  status: 'confirmed' | 'pending' | 'cancelled'
  totalAmount: number
  city: string
  country: string
  state:string
  roomTypeName:string  
}
