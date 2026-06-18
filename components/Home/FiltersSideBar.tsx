import PropertyFilters from "@/components/PropertyFilters";

interface Props {
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export default function FiltersSidebar({
  filters,
  onFiltersChange,
}: Props) {
  return (
    <PropertyFilters
      filters={filters}
      onFiltersChange={onFiltersChange}
    />
  );
}