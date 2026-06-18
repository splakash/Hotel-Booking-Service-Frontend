import PropertyCard from "@/components/PropertyCard";

interface Props {
  loading: boolean;
  properties: any[];
}

export default function PropertyResults({
  loading,
  properties,
}: Props) {
  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        Loading properties...
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex-1 bg-white rounded-lg shadow-md p-8 text-center">
        No properties found.
      </div>
    );
  }

  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold mb-6">
        Available Properties
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
          />
        ))}
      </div>
    </div>
  );
}