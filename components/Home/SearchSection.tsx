"use client";

import DatePicker from "@/components/DatePicker";

interface SearchForm {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

interface Props {
  searchForm: SearchForm;

  updateField: (
    field: keyof SearchForm,
    value: string | number
  ) => void;

  onSearch: () => void;
}

export default function SearchSection({
  searchForm,
  updateField,
  onSearch,
}: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
      <div className="bg-white rounded-lg shadow-2xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-3 md:gap-2 items-end">

          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Location
            </label>

            <input
              type="text"
              value={searchForm.location}
              onChange={(e) =>
                updateField("location", e.target.value)
              }
              placeholder="Where are you going?"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Check In
            </label>

            <DatePicker
              value={searchForm.checkIn}
              onChange={(value) =>
                updateField("checkIn", value)
              }
            />
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Check Out
            </label>

            <DatePicker
              value={searchForm.checkOut}
              minDate={searchForm.checkIn}
              onChange={(value) =>
                updateField("checkOut", value)
              }
            />
          </div>

          <div className="w-24">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Adults
            </label>

            <input
              type="number"
              min="1"
              value={searchForm.adults}
              onChange={(e) =>
                updateField(
                  "adults",
                  Number(e.target.value)
                )
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div className="w-24">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Children
            </label>

            <input
              type="number"
              min="0"
              value={searchForm.children}
              onChange={(e) =>
                updateField(
                  "children",
                  Number(e.target.value)
                )
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div className="w-24">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Rooms
            </label>

            <input
              type="number"
              min="1"
              value={searchForm.rooms}
              onChange={(e) =>
                updateField(
                  "rooms",
                  Number(e.target.value)
                )
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="button"
            onClick={onSearch}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg"
          >
            Search
          </button>

        </div>
      </div>
    </div>
  );
}