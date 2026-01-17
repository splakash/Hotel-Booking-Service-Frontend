'use client'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minDate?: string
}

export default function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  minDate,
}: DatePickerProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={minDate}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    />
  )
}

