import { useEffect, useState } from "react"
import { Properties } from "@/types/property"
import { getAllProperties, searchPropertiesService } from "@/lib/services/property.service"

export const usePropertyList = (
  checkIn: string,
  checkOut: string,
  location: string,
  urlDeps: any[]
) => {
  const [properties, setProperties] = useState<Properties[]>([])
  const [loading, setLoading] = useState(true)

  const searchProperties = async () => {
    if (!checkIn || !checkOut || !location) return

    setLoading(true)
    try {
      const result = await searchPropertiesService(
        checkIn,
        checkOut,
        location
      )
      setProperties(result)
    } catch (error) {
      console.error("Error searching properties:", error)
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchProperties = async () => {
      if (checkIn && checkOut && location) {
        await searchProperties()
        return
      }

      setLoading(true)
      try {
        const result = await getAllProperties()
        setProperties(result)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  useEffect(() => {
    if (checkIn && checkOut && location) {
      searchProperties()
    }
  }, urlDeps)

  return { properties, loading, searchProperties }
}