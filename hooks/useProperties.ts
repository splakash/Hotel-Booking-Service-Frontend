import { useEffect, useState } from "react";
import { getProperties } from "@/lib/services/property.service";
import { Properties } from "@/types/property";

export function useProperties(){
    const [properties, setProperties] = useState<Properties[]>([])
      const [loading, setLoading] = useState(true)

      useEffect(() => {
          const fetchData = async () => {
            setLoading(true)
            try {
              const data = await getProperties()
              setProperties(data)
            } catch (err) {
              console.error(err)
            } finally {
              setLoading(false)
            }
          }
      
          fetchData()
        }, [])
      
        return { properties, loading }
}