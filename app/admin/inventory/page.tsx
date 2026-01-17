'use client'

import { useEffect, useState } from 'react'

interface InventoryItem {
  date: string
  propertyId: string
  propertyName: string
  totalRooms: number
  reservedRooms: number
  availableRooms: number
}

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true)
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/v1/admin/inventory?date=${selectedDate}`)
        // const data = await response.json()

        // Mock data
        const mockInventory: InventoryItem[] = [
          {
            date: selectedDate,
            propertyId: '1',
            propertyName: 'Grand Hotel Downtown',
            totalRooms: 50,
            reservedRooms: 35,
            availableRooms: 15,
          },
          {
            date: selectedDate,
            propertyId: '2',
            propertyName: 'Beachside Resort',
            totalRooms: 30,
            reservedRooms: 28,
            availableRooms: 2,
          },
          {
            date: selectedDate,
            propertyId: '3',
            propertyName: 'Mountain View Lodge',
            totalRooms: 25,
            reservedRooms: 10,
            availableRooms: 15,
          },
        ]

        await new Promise((resolve) => setTimeout(resolve, 500))
        setInventory(mockInventory)
      } catch (error) {
        console.error('Error fetching inventory:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [selectedDate])

  const getAvailabilityColor = (percentage: number) => {
    if (percentage >= 50) return 'bg-green-500'
    if (percentage >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Room Inventory</h1>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading inventory...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Rooms
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reserved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.map((item) => {
                  const availabilityPercentage =
                    (item.availableRooms / item.totalRooms) * 100
                  return (
                    <tr key={item.propertyId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.propertyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.totalRooms}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.reservedRooms}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.availableRooms}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${getAvailabilityColor(
                                availabilityPercentage
                              )}`}
                              style={{ width: `${availabilityPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {availabilityPercentage.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Total Properties
            </h3>
            <p className="text-3xl font-bold text-primary-600">
              {inventory.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Total Rooms
            </h3>
            <p className="text-3xl font-bold text-primary-600">
              {inventory.reduce((sum, item) => sum + item.totalRooms, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Available Rooms
            </h3>
            <p className="text-3xl font-bold text-primary-600">
              {inventory.reduce((sum, item) => sum + item.availableRooms, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

