import { ApiProperty, SearchApiProperty, Property } from "@/types/property"

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const fetchProperty = async (id: string) : Promise<Property> => {
  const response = await fetch(
    `${API_URL}/v1/property/${id}/details`
  )
   if (!response.ok) {
    throw new Error(`Failed to fetch properties: ${response.statusText}`)
  }

  return response.json()
}

export const fetchAllProperties = async (): Promise<ApiProperty[]> => {
  const response = await fetch(
    `${API_URL}/v1/properties`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch properties: ${response.statusText}`)
  }

  return response.json()
}

export const searchPropertiesApi = async (
  checkIn: string,
  checkOut: string,
  location: string
): Promise<SearchApiProperty[]> => {
  const response = await fetch(
    `${API_URL}/v1/search-details`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkIn, checkOut, location }),
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to search properties: ${response.statusText}`)
  }
  return response.json()
}