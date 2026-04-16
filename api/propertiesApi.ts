import { ApiProperty, SearchApiProperty, Property } from "@/types/property"


export const fetchProperty = async (id: string) : Promise<Property> => {
  const response = await fetch(
    `http://localhost:8081/v1/property/${id}/details`
  )
   if (!response.ok) {
    throw new Error(`Failed to fetch properties: ${response.statusText}`)
  }

  return response.json()
}

export const fetchAllProperties = async (): Promise<ApiProperty[]> => {
  const response = await fetch(
    "http://localhost:8081/v1/properties"
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
    "http://localhost:8081/v1/search-details",
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
  console.log(response);
  return response.json()
}