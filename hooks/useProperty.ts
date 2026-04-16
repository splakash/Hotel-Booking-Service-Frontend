import { useState, useEffect } from "react";
import { getPropertyDetails } from "@/lib/services/property.service";
import { Property } from "@/types/property";

export function useProperty(id: string) {
    
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    if (!id) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getPropertyDetails(id)
        setProperty(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  return { property, loading }
}


