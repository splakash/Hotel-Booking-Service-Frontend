'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from './DatePicker'

export default function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      location: location || 'anywhere',
      checkIn: checkIn || new Date().toISOString().split('T')[0],
      checkOut: checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString(),
    })
    router.push(`/properties?${params.toString()}`)
  }

  

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4">
        {/* Location */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value || "India")}
            placeholder="Where are you going?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Check-in */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-in
          </label>
          <DatePicker
            value={checkIn}
            onChange={setCheckIn}
            placeholder="Check-in date"
          />
        </div>

        {/* Check-out */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <DatePicker
            value={checkOut}
            onChange={setCheckOut}
            placeholder="Check-out date"
            minDate={checkIn || undefined}
          />
        </div>

        {/* Guests & Rooms */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adults
            </label>
            <input
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Children
            </label>
            <input
              type="number"
              min="0"
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rooms
            </label>
            <input
              type="number"
              min="1"
              value={rooms}
              onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-primary-600 text-white px-8 py-2 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

