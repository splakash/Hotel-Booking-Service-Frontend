'use client'

import Link from 'next/link'
import PriceBadge from './PriceBadge'

interface PropertyCardProps {
  id: string
  name: string
  location: string
  image: string
  lowestPrice: number
  rating?: number
}

export default function PropertyCard({
  id,
  name,
  location,
  image,
  lowestPrice,
  rating = 0,
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        {/* Image */}
        <div className="relative h-48 bg-gray-200">
          <img
            src={image || '/placeholder-hotel.jpg'}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              ;(e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Hotel'
            }}
          />
          {rating > 0 && (
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg shadow-md">
              <span className="text-sm font-semibold text-yellow-500">
                ⭐ {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
          <p className="text-gray-600 mb-3 flex items-center">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location}
          </p>
          <div className="flex justify-between items-center">
            <PriceBadge price={lowestPrice} />
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

