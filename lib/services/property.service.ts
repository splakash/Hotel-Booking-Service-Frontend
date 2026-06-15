import { apiClient } from "../apiClient";
import { Property, Properties ,ApiProperty,SearchApiProperty} from "@/types/property";
import { fetchAllProperties,searchPropertiesApi, fetchProperty } from "@/api/propertiesApi";


export const getPropertyDetails = async (id: string):  Promise<Property> => {
    
  const apiData = await fetchProperty(id)
    
  // 🔥 MOVE YOUR MAPPING HERE
  return {
    propertyId: apiData.propertyId.toString(),
    propertyName: apiData.propertyName,
    address:apiData.address,
    description:
      apiData.roomTypes[0]?.description ||
      "Default description",
    images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200',
            'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200',
        ],
    roomTypes: (apiData.roomTypes || []).map((roomType: any) => ({
      id: roomType.id.toString(),
      name: roomType.name,
      description: roomType.description,
      occupancy: {
        adults: roomType.occupancyAdults ?? 2,
        children: roomType.occupancyChildren ?? 0,
      },
      pricePerNight: roomType.basePrice ?? apiData.lowestPrice,
      available:
        roomType.totalRoom === null ? true : roomType.totalRoom > 0,
      totalRoom: roomType.totalRoom,
    })),
    lowestPrice: apiData.lowestPrice,
    rating: Number(apiData.rating),
    contactEmail: apiData.contactEmail || "contact@hotel.com",
    contactPhone: apiData.contactPhone || "+1 (555) 123-4567",
    status:'active',
  }
}


 {/*get all properties*/}
export const getProperties = async () : Promise<Properties[]> => {
  const apiData = await  apiClient("/api/v1/admin/properties");

  return apiData.map((item: { lowestPrice: any; ratings: any; })=>({
    ...item,
    lowestPrice: Number(item.lowestPrice),
    item: Number(item.ratings),
    image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  }))

};




// GET API mapping
export const getAllProperties = async (): Promise<Properties[]> => {
  const apiProperties = await fetchAllProperties()

  return apiProperties.map((apiProp) => ({
    id: apiProp.id.toString(),
    name: apiProp.name,
    address: apiProp.address,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    lowestPrice: apiProp.lowestPrice,
    rating: apiProp.ratings,
  }))
}

// SEARCH API mapping
export const searchPropertiesService = async (
  checkIn: string,
  checkOut: string,
  location: string
): Promise<Properties[]> => {
  const searchProperties: SearchApiProperty[] =
    await searchPropertiesApi(checkIn, checkOut, location)

  return searchProperties.map((apiProp) => ({
    id: apiProp.id.toString(),
    name: apiProp.name,
    address: apiProp.address,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    lowestPrice:apiProp.lowestPrice,
    rating: 0,
  }))
}