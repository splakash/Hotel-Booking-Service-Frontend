import { RoomType } from "./roomType"

export interface Property {
  propertyId: any
  propertyName: string
  address: string
  description: string
  images: string[]
  roomTypes: RoomType[]
  lowestPrice: number
  rating: number
  contactEmail: string
  contactPhone: string
  status: 'active' | 'inactive'
}

export interface Properties{
   id: string
  name: string
  address: string
  lowestPrice: number
  rating: number
  image:string
}

export interface ApiProperty {
  id: number
  name: string
  address: string
  lowestPrice: number
  ratings: number
}

export interface SearchApiProperty {
  id: number
  name: string
  timezone: string
  city: string
  state: string
  country: string
  address: string
  contactEmail: string
  contactPhone: string
  createdAt: string
  updatedAt: string
  inventories: any[]
  reservations: any[]
}