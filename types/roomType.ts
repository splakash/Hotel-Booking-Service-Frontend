export interface RoomType {
  id: string
  name: string
  description?: string | null
  occupancy: {
    adults: number
    children: number
  }
  pricePerNight: number
  available: boolean
  totalRoom?: number | null
}


export interface ApiRoomType {
  id: number;
  name: string;
  description: string | null;
  totalRoom: number | null;
  basePrice: number | null;
  occupancyAdults: number | null;
  occupancyChildren: number | null;
}