import { useEffect, useState } from "react";
import { Properties } from "@/types/property";
import {
  getAllProperties,
  searchPropertiesService,
} from "@/lib/services/property.service";

export function usePropertyList() {
  const [properties, setProperties] = useState<Properties[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAllProperties = async () => {
    setLoading(true);

    try {
      const result = await getAllProperties();
      setProperties(result);
    } catch (error) {
      console.error(error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const searchProperties = async (
    checkIn: string,
    checkOut: string,
    location: string
  ) => {
    if (!checkIn || !checkOut || !location) {
      return;
    }

    setLoading(true);

    try {
      const result = await searchPropertiesService(
        checkIn,
        checkOut,
        location
      );

      setProperties(result);
    } catch (error) {
      console.error(error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllProperties();
  }, []);

  return {
    properties,
    loading,
    searchProperties,
    loadAllProperties,
  };
}