'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PropertiesPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page where properties are now shown
    router.push('/')
  }, [router])

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-gray-600">Redirecting to home...</div>
    </div>
  )
}
