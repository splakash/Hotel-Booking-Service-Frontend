interface PriceBadgeProps {
  price: number
  period?: string
}

export default function PriceBadge({ price, period = 'night' }: PriceBadgeProps) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-primary-600">
      ₹{price.toLocaleString()}
      </span>
      <span className="text-sm text-gray-500">per {period}</span>
    </div>
  )
}

