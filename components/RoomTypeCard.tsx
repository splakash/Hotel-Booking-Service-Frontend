'use client'

import PriceBadge from './PriceBadge'

interface RoomTypeCardProps {
  id: string
  name: string
  description?: string | null
  occupancy: {
    adults: number
    children: number
  }
  pricePerNight: number
  available: boolean
  totalRoom?: number | null
  onSelect: () => void
}

export default function RoomTypeCard({
  name,
  description,
  occupancy,
  pricePerNight,
  available,
  totalRoom,
  onSelect,
}: RoomTypeCardProps) {
  const isSoldOut = totalRoom === 0 || totalRoom === null

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:border-primary-500 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
          {description && (
            <p className="text-gray-600 text-sm mb-3">{description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {occupancy.adults} Adults
            </span>
            {occupancy.children > 0 && (
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {occupancy.children} Children
              </span>
            )}
            {totalRoom !== null && totalRoom !== undefined && (
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {totalRoom} Room{totalRoom !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          {!available && (
            <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Not Available
            </span>
          )}
          {available && (
            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Available
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <PriceBadge price={pricePerNight} />
          {isSoldOut ? (
            <span className="px-6 py-2 rounded-lg font-semibold bg-red-100 text-red-700">
              Sold out
            </span>
          ) : (
            <button
              onClick={onSelect}
              disabled={!available}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                available
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

